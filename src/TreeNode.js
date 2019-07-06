import React from 'react';
import {
  Node,
  CheckBox,
  Item,
  Triangle,
  Show
} from './style'
import {
  mapChildren,
  conductCheck,
  arrAdd,
  arrDel
} from './util';

class TreeNode extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      nodeHeight:0,
    })

    this.onNodeClick = this.onNodeClick.bind(this);
    this.onSwitcherClick = this.onSwitcherClick.bind(this);
    this.calculateHeight = this.calculateHeight.bind(this);
  }

  renderTreeNode(child, key){
    return React.cloneElement(child, {
      Key: key,
      initKey: child.key,
      isHalfChecked: this.props.halfCheckedKeys.includes(key),
      isChecked: this.props.checkedKeys.includes(key),
      isExpanded: this.props.expandedKeys.includes(child.key),
      halfCheckedKeys: this.props.halfCheckedKeys,
      checkedKeys: this.props.checkedKeys,
      expandedKeys: this.props.expandedKeys,
      keyEntities: this.props.keyEntities,
      onNodeClick: this.props.onNodeClick,
      updateExpanded: this.props.updateExpanded,
      isSingle: !('children' in child.props)
    })
  }

  renderSwitcher() {
    return (
      <Triangle
        onClick = {this.onSwitcherClick}
        isSingle = {this.props.isSingle}
        isExpanded = {this.props.isExpanded}
      ></Triangle>
    )
  }

  onNodeClick() {
    let halfCheckedKeys =  arrDel(this.props.halfCheckedKeys, this.props.Key).arr,
          checkedKeys = [...(this.props.checkedKeys)];

    let addNodeChild = (parentNode) => {
      checkedKeys = arrAdd(checkedKeys, parentNode.key);
      parentNode.childKey.forEach((key) => {
        checkedKeys = arrAdd(checkedKeys, key);
        addNodeChild(this.props.keyEntities[key]);
      })
    }
    let delNodeChild = (parentNode) => {
      checkedKeys = arrDel(checkedKeys, parentNode.key).arr;
      parentNode.childKey.forEach((key) => {
        checkedKeys = arrDel(checkedKeys, key).arr;
        delNodeChild(this.props.keyEntities[key]);
      })
    } 

    

    if(checkedKeys.includes(this.props.Key)) {
      delNodeChild(this.props.keyEntities[this.props.Key]);
    }else {
      addNodeChild(this.props.keyEntities[this.props.Key]);
    }
    
    

    const checkStatus = {checkedKeys, halfCheckedKeys};
    const checkedStatus = conductCheck(this.props.Key, checkStatus, this.props.keyEntities);
    this.props.onNodeClick(checkedStatus.halfCheckedKeys, checkedStatus.checkedKeys);
  }

  onSwitcherClick() {
    let expandedKeys;
    if(this.props.expandedKeys.includes(this.props.initKey)) {
      expandedKeys = arrDel(this.props.expandedKeys, this.props.initKey).arr;
    }else {
      expandedKeys = arrAdd(this.props.expandedKeys, this.props.initKey);
    }
    this.props.updateExpanded(expandedKeys);
  }

  renderCheckbox() {
    return (
      <CheckBox
        isChecked = {this.props.isChecked}
        isHalfChecked = {this.props.isHalfChecked}
        onChange = {() => this.onNodeClick(this)}
      ></CheckBox>
    )
  }

  renderItem() {
    return (
      // {this.props.title}
      <Item>
        {this.props.title}
      </Item>
    );
  }

  calculateHeight(element) {
    // console.log(element.clientHeight);
    this.setState({
      nodeHeight:element.clientHeight
    })
  }

  renderChildren() {
    const { children, Key } = this.props;
    const height = this.state.nodeHeight;
    return (
      <Show
        isExpanded = {this.props.isExpanded}
        ref={this.calculateHeight}
        nodeHeight = '80px'
      >
        {mapChildren(children,(item, index) => this.renderTreeNode(item, Key+"-"+index))}
      </Show>      
    );
  }

  render() {
    // console.log(this.props)
    return (
      <Node>
        {this.renderSwitcher()}
        {this.renderCheckbox()}
        {this.renderItem()}
        {this.renderChildren()}
      </Node>
    )
  }
}

export default TreeNode;