import React from 'react';
import Tree from './Tree';

const { TreeNode } = Tree;

function App() {
  return (
    <div className="App">
      <Tree
        defaultExpandedKeys = {["one", "two", "three"]}
        treeData={
          {
            "0":{title:"0", key:"one", parent:null, children:['0-0', '0-1', '0-2'], isExpanded:true},
            "1":{title:"1", key:"two", parent:null, children:['1-0']},
            "2":{title:"2", key:"2", parent:null, children:[]},
            "0-0":{title:"0-0", key:"one-0", parent:"0", children:[]},
            "0-1":{title:"0-1", key:"one-1", parent:"0", children:['0-1-0', '0-1-1', '0-1-2'], isExpanded:true},
            "0-2":{title:"0-2", key:"one-2", parent:"0", children:[]},
            "0-1-0":{title:"0-1-0", key:"one-1-0", parent:"0-1", children:[]},
            "0-1-1":{title:"0-1-1", key:"one-1-1", parent:"0-1", children:[]},
            "0-1-2":{title:"0-1-2", key:"one-1-2", parent:"0-1", children:[]},
            "1-0":{title:"1-0", key:"two-0", parent:"1", children:["1-0-0"]},
            "1-0-0":{title:"1-0-0", key:"two-0-0", parent:"1-0", children:[]}
          }
        }
      >
        <TreeNode title="0" key="one">
          <TreeNode title="0-0" key="one-0">
          </TreeNode>
          <TreeNode title="0-1" key="one-1">
            <TreeNode title="0-1-0" key="one-1-0"></TreeNode>
            <TreeNode title="0-1-1" key="one-1-1"></TreeNode>
            <TreeNode title="0-1-2" key="one-1-2"></TreeNode>
          </TreeNode>
          <TreeNode title="0-2" key="one-2"></TreeNode>
        </TreeNode>
        <TreeNode title="1" key="two">
          <TreeNode title="1-0" key="two-0">
            <TreeNode title="1-0-0" key="two-0-0"></TreeNode>
          </TreeNode>
        </TreeNode>
        <TreeNode title="2" key="three"></TreeNode>
      </Tree>
    </div>
  );
}

export default App;
