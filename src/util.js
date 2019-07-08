import React from 'react';
import TreeNode from "./TreeNode";

export function convertTreeToEntities(treeNode,key, entities, parentKey) {
  // console.log(key)
  let entity = {
    key,
    childKey: [],
    parentKey: parentKey
  }

  entities[key] = entity;

  const { children } = treeNode.props;
  mapChildren(children, (item, index) => {
    entity['childKey'].push(key + "-" + index);
    return convertTreeToEntities(item, key+"-"+index, entities, key)
  })
}

export function convertDataToTree(treeData) {
  let defaultExpanded = [];
  function dataToTree(treeData, node) {
    if(node.isExpanded) {
      defaultExpanded.push(node.key);
    }
    if(node.children.length === 0) {
      return (
        <TreeNode
          title={node.title}
          key={node.key}
        >

        </TreeNode>
      )
    }else {
      return (
        <TreeNode
          title={node.title}
          key={node.key}
        >
          {node.children.map((key) => {
            return dataToTree(treeData, treeData[key]);
          })}
        </TreeNode>
      )
    }
  }
  let treeNode = Object.keys(treeData).map((key) => {
    let node = treeData[key];
    if(!node.parent) {
      return dataToTree(treeData, node);
    }
  })
  treeNode = treeNode.filter(item => item)
  return {treeNode, defaultExpanded};
}

export function mapChildren(children, f) {
  if(Array.isArray(children)) {
    return children.map((item, index) => f(item, index))
  }else if(children) {
    return f(children, "0");
  }

  return null;
}

export function arrAdd(arr, val) {
  let temp = [...arr];
  temp.push(val);

  return temp;
}

export function arrDel(arr, val) {
  let temp = [...arr];
  let index = temp.indexOf(val);
  
  if(index === -1) {
    return {isSuccess:false, arr:arr};
  }else {
    temp.splice(index, 1);
    return {isSuccess:true, arr:temp};
  }
}

export function conductCheck(clickKey, checkStatus, keyEntities) {
  const checkedKeys = {},
        halfCheckedKeys = {};
  (checkStatus.checkedKeys || []).forEach((key) => {
    checkedKeys[key] = true;
  });
  (checkStatus.halfCheckedKeys || []).forEach((key) => {
    halfCheckedKeys[key] = true;
  });
  let conduct = (parentNode) => {
    let checked = true,
        halfChecked = false;
    let { childKey } = parentNode;
    // console.log(children)
    if(childKey.length > 0) {
      mapChildren(childKey, (key) => {
        if((key in checkedKeys && checkedKeys[key]) || (key in halfCheckedKeys && halfCheckedKeys[key])) {
          halfChecked = true;
        }
        if(!(key in checkedKeys) || !checkedKeys[key]) {
          checked = false;
        }
      })
    }else{
      return ;
    }
    halfCheckedKeys[parentNode.key] = halfChecked;
    checkedKeys[parentNode.key] = checked;
  }
  let conductDown = (currNode) => {
    let { childKey } = currNode;
    conduct(currNode);
    mapChildren(childKey, (key) => conductDown(keyEntities[key]));
  }

  let conductUp = (currNode) => {
    conduct(currNode);
    
    if(currNode.parentKey) {
      conductUp(keyEntities[currNode.parentKey]);
    }
  }

  const currNode = keyEntities[clickKey];
  conductUp(currNode);
  conductDown(currNode);
  
  let temp = {
    halfCheckedKeys: Object.keys(halfCheckedKeys).filter((item) => halfCheckedKeys[item]),
    checkedKeys: Object.keys(checkedKeys).filter((item) => checkedKeys[item])
  };
  return temp;
}