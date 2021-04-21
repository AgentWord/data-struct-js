/*
 * @Author: cdb 
 * @Date: 2021-04-20 10:23:53 
 * @Last Modified by: cdb
 * @Last Modified time: 2021-04-20 14:40:47
 */
// 树结构  二叉树主要链表存储.
// 代码实现

function BinaryTree() {
  // 节点
  function Node(key) {
    this.key = key
    this.left = null
    this.right = null
  }
  // 根
  this.root = null
  /**
   * 插入非根节点
   * @param {*} node 
   * @param {*} newNode 
   */
  this.insertNode = (node,newNode) => {
    // 新节点比源节点小 插入左子树
    if(newNode.key < node.key) {
      if(node.left === null){
        node.left = newNode
      }else{
        this.insertNode(node.left,newNode)
      }
    }else{ //  插入右子树
      if(node.right === null){
        node.right = newNode
      }else{
        this.insertNode(node.right,newNode)
      }

    }
  }
  /**
   * 向树中插入数据
   * @param {*} key 
   */
  this.insert = key => {
    // 创建节点
    let node = new Node(key)
    // 判断根节点是否存在
    if(this.root === null){
      this.root = node
    }else{
      this.insertNode(this.root,node)
    }
  }
  /**
   * 先序遍历 遍历过程为：①访问根结点；②先序遍历其左子树；③先序遍历其右子树。
   * @param {*} node 
   * @param {*} handler 
   */
  this.preOrderTraversalNode = (node,handler) => {
    if(node != null){
      // 当前经过的节点
      handler(node.key)
      // 遍历左子树
      this.preOrderTraversalNode(node.left,handler)
      // 遍历右子树
      this.preOrderTraversalNode(node.right,handler)
    }
  }
  /**
   * 先序遍历
   * @param {*} handler 
   */
  this.preOrderTraversal = handler => {
    this.preOrderTraversalNode(this.root,handler);
  }

  // 中序遍历
  this.inOrderTraversal = handler => {
    this.inOrderTraversalNode(this.root, handler)
  }
  /**
   * 中序遍历：左子树-根节点-右子树 
   * @param {*} node 
   * @param {*} handler 
   */
  this.inOrderTraversalNode = (node,handler) => {
    if(node !== null){
      // 遍历左子树
      this.inOrderTraversalNode(node.left, handler)
      handler(node.key)
      this.inOrderTraversalNode(node.right, handler)
    }
  }
  // 后序遍历 
  this.postOrderTraversal = handler => {
    this.postOrderTraversalNode(this.root,handler)
  }
  // 后续遍历节点   左子树 右子树 根节点
  this.postOrderTraversalNode = (node,handler) => {
    if(node != null) {
      this.postOrderTraversalNode(node.left, handler)
      this.postOrderTraversalNode(node.right, handler)
      handler(node.key)
    }
  }

  // 获取最大值 最大值在右节点
  this.getMax = () => {
    let node = this.root
    while (node.right !== null) {
      node = node.right
    }
    return node.key
  }
  // 获取最小值 左子树
  this.getMin = () => {
    let node = this.root
    while (node.left !== null) {
      node = node.left
    }
    return node.key
  }

  // 搜索特定的值
  this.searchNode = (node,key) => {
    if(node === null){
      return false
    }
    // node 节点值和 传入的key 进行判断
    if(key > node.key) {
      // 向右查找
      return this.searchNode(node.right,key)
    }else if(key < node.key){
      // 向左查找
      return this.searchNode(node.left,key)
    }else{
      // 两者相同
      return true
    }
  }

  // 搜索
  this.search = key => {
    return this.searchNode(this.root,key)
  }

  // 搜索如果不使用递归 怎么实现
  this.search_ = key => {
    let node  = this.root;
    while (node !== null) {
      if(node.key > key){
        node = node.left
      }else if(node.key < key){
        node = node.right
      }else{
        return true
      }
    }
    return false
  }

  // 子节点的删除操作
  /**
   * 步骤 1. 找到要删除的节点
   * 2. 看看要删除的节点属于什么情况：
   *  2.1 第一种情况：没有子节点 或者自身就是子节点 这样的话删除就将其parent 的左节点或者右节点设置为null即可
   *  2.2 第二种情况：有一个字节点，将其删除后 parent 直接指向 其子节点 无论当前节点的子节点是左还是右 只需要将子节点挂接到 当前被删除的节点所处的位置即可
   *  2.3 第三中情况：就是要删除的节点拥有两个子节点，怎么去删除呢，
   */
  this.delNode = key => {
    // 1.定义临时变量保存
    let current = this.root
    let parent  = this.root
    let isLeftChild = true
    // 2.查找节点
    while (current.key !== key) {
      parent = current
      if(key > current.key){
        // 右
        isLeftChild = false
        current = current.right
      }else{
        // 左
        isLeftChild = true
        current = current.left
      }
      
    }
    // 么有找到
    if(current === null){
      return false
    }
    // 3. 开始删除节点：如果删除的是叶子节点
    if(current.left === null && current.right === null){
      if(current === this.root){
        this.root = null
      }else if(isLeftChild){
        parent.left = null
      }else{
        parent.right = null
      }
    }
    // 4. 如果删除的是单子节点
    else if(current.left === null){
      // 
      if(current == this.root){
        this.root = current.right
      }else if(isLeftChild){
        parent.left = current.right
      }else{
        parent.right = current.right
      }
    }
    else if(current.right === null){
      if(current == this.root){
        this.root = current.left
      }else if(isLeftChild){
        parent.left = current.left
      }else{
        parent.right = current.left
      }
    }
    // 5.删除有两个节点的节点
    else{
      // 获取后继节点
      let successor = this.getSuccessor(current)
      // 是否为根节点
      if(current === this.root){
        this.root = successor
      }else if(isLeftChild){
        parent.left = successor
      }else{
        parent.right = successor
      }
      
      // 将删除节点的 左子树赋值给 successor
      successor.left = current.left
    }
    return true
  }
  /**
   * 后继节点查找
   * @param {要删除的节点} node 
   */
  this.getSuccessor = node => {
    let successorParent = node
    let successor = node
    let current = node.right // 后继节点是 右子树

    // 寻找节点
    while (current !== null) {
      successorParent = successor
      successor = current
      current = current.left
    }

    // 特殊情况处理 如果这个后继 不是要删除的节点的右子树
    if(successor != node.right){
      successorParent.left = successor.right
      successor.right = node.right
    }
    return successor
  }

}


// 测试代码
var bst = new BinaryTree()

// 插入数据
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(6)

bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)

// 测试前序遍历结果
var resultString = ""
bst.preOrderTraversal(function (key) {
  resultString += key + " "
})
console.log(resultString);
resultString = ""
bst.inOrderTraversal(function (key) {
  resultString += key + " "
})
console.log(resultString);
resultString = ""
bst.postOrderTraversal(function (key) {
  resultString += key + " "
})
// 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
console.log(resultString);

console.log(bst.getMax());
console.log(bst.getMin());

// 查找特定的值
console.log(bst.search_(6)) // true
console.log(bst.search_(25)) // 

console.log(bst.delNode(15)) // 
console.log(bst.search_(15)) // 
resultString = ""
bst.postOrderTraversal(function (key) {
  resultString += key + " "
})
console.log(resultString);