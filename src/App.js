import React from 'react';
import Tree from './Tree';

const { TreeNode } = Tree;

function App() {
  return (
    <div className="App">
      <Tree>
        <TreeNode title="0" key="0">
          <TreeNode title="0-0"></TreeNode>
          <TreeNode title="0-1"></TreeNode>
          <TreeNode title="0-2"></TreeNode>
        </TreeNode>
        <TreeNode title="1">
          <TreeNode title="1-0">
            <TreeNode title="1-0-0"></TreeNode>
          </TreeNode>
        </TreeNode>
        <TreeNode title="2"></TreeNode>
      </Tree>
    </div>
  );
}

export default App;
