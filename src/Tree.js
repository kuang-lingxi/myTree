import React from 'react';
import TreeNode from './TreeNode';
import {
  convertTreeToEntities,
} from './util'


class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({

    })

    this.rendertreeNode = this.renderTreeNode.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const treeNodes = props.children;
    const entities = {};
    for(let i = 0, len = treeNodes.length; i < len; i++) {
      const node = treeNodes[i];
      convertTreeToEntities(node, i+"", entities, null);
    }
    const newState = {
      halfCheckedKeys: [],
      checkedKeys: [],
      expandedKeys: [],
      keyEntities: entities,
      treeNodes: treeNodes
    }
    return newState;
  }


  renderTreeNode(child, key){
    return React.cloneElement(child, {
      key,
      Key: key,
      isHalfChecked: false,
      isChecked: false,
      isExpanded: true,
      halfCheckedKeys: this.state.halfCheckedKeys,
      checkedKeys: this.state.checkedKeys,
      expandedKeys: this.state.expandedKeys,
      keyEntities: this.state.keyEntities,
      onNodeClick: this.state.onNodeClick
    })
  }

  onNodeClick(halfCheckedKeys, checkedKeys, expandedKeys, keyEntities) {
    this.setState({
      halfCheckedKeys,
      checkedKeys,
      expandedKeys,
      keyEntities
    })
  }

  render() {
    const { treeNodes } = this.state;
    console.log(this.state.keyEntities)
    return (
      <div>
          {treeNodes.map((item, index) => this.renderTreeNode(item, index+""))}
      </div>
    )
  }
}

Tree.TreeNode = TreeNode;

export default Tree;