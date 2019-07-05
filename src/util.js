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
    console.log(parentNode);
    let checked = true,
        halfChecked = false;
    let {children} = parentNode.node.props;

    if(children) {
      mapChildren(children, (item, index) => {
        if(item.key in checkedKeys) {
          halfChecked = true;
        }else {
          checked = false;
        }
      })
    }

    halfCheckedKeys[parentNode.key] = halfChecked;
    checkedKeys[parentNode.key] = checked;
  }
  let conductDown = (currNode) => {
    let { children } = currNode.node.props;
    conduct(currNode);
    // console.log(keyEntities[node.Key])
    mapChildren(children, (node) => conductDown(keyEntities[node.key]));
  }

  let conductUp = (currNode) => {
    conduct(currNode);
    if(currNode.parent) {
      console.log(currNode.parent)
      conductUp(keyEntities[currNode.parent.key]);
    }
  }

  const currNode = keyEntities[clickKey];
  conductUp(currNode);
  conductDown(currNode);

  let temp = {
    halfCheckedKeys: Object.keys(halfCheckedKeys).filter((item) => halfCheckedKeys[item]),
    checkedKeys: Object.keys(checkedKeys).filter((item) => checkedKeys[item])
  };
  console.log(temp);
  return temp;
}