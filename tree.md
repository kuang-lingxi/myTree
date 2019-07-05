1. 进入 tree 的 constructor
2. 进入生命周期函数 getDerivedStateFromProps , 初始化 state 中的数据, 比较重要的几个属性:
	- treeNode: 存储 TreeNode 的jsx对象
	- halfCheckedKeys: 半选项的 key 值
	- checkedKeys: 选中项的 key 值
	- expandedKeys: 展开项的 key 值
	- keyEntities: 一个对象, key值为node的key值, value为key值对应的node节点
	keyEntities相当于把TreeNode打平, 避免树层数过多导致递归太深.每次改变某个节点的状态后, 会通过遍历keyEntities去改变数组中存储的 key 值, 实现状态的改变
3. 进入tree的render函数
4. 使用函数 renderTreeNode 渲染最外层的 treeNode , 通过存储在state中的数据传递对应参数给子节点, 来判断子节点是 展开/全选/半选 , 同时每个 treeNode 自己渲染自己的子节点, 仍然调用 tree 上的 renderTreeNode . 子组件通过 react 的 context 取得父组件的方法
5. renderTreeNode 函数是调用了 React.cloneElement 函数, 将 Tree 上的属性加到了 TreeNode 的 jsx 对象上, 所以所有子类可以获取到父类上的方法/属性