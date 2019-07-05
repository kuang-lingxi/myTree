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
  conductCheck
} from './util';

class TreeNode extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      
    })


  }

  renderTreeNode(child, key){
    return React.cloneElement(child, {
      key,
      Key: key,
      isHalfChecked: false,
      isChecked: false,
      isExpended: true,
      halfCheckedKeys: this.props.halfCheckedKeys,
      checkedKeys: this.props.checkedKeys,
      expandedKeys: this.props.expandedKeys,
      keyEntities: this.props.keyEntities,
      onNodeClick: this.props.onNodeClick
    })
  }

  renderSwitcher() {
    return <Triangle></Triangle>
  }

  onNodeClick() {
    console.log(this);
    const checkStatus = {checkedKeys: this.props.checkedKeys, halfCheckedKeys: this.props.halfCheckedKeys};
    // conductCheck(this.props.Key, checkStatus, this.props.keyEntities);
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

  renderChildren() {
    const { children, Key } = this.props;
    // console.log(this.props.isExpended)
    // console.log(true)
    return (
      <Show
        isExpended = {true}
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