/*
 * @Author: cdb 
 * @Date: 2021-04-19 15:19:07 
 * @Last Modified by: cdb
 * @Last Modified time: 2021-04-19 16:45:04
 */
// 哈希表的实现

/**
 * 创建哈希表
 */
function HashTable() {
  // 定义属性
  this.storage = [];
  this.count = 0
  this.limit = 8
  
  /**
   * 哈希函数
   * @param {*} str 
   * @param {*} max 
   */
  this.hasFunc = (str, max) => {
    let hasCode = 0
    // 霍纳算法  计算hascode的值
    for (let i = 0; i < str.length; i++) {
      hasCode = 37 * hasCode + str.charCodeAt(i) // charCodeAt 获取字符的ASCII 码
    }
    // 取模运算
    hasCode = hasCode % max
    return hasCode
  }
  /**
   * 哈希表中存入数据
   * @param {*} key 
   * @param {*} value 
   */
  HashTable.prototype.put = (key,value) => {
    // 获取key 对应的index
    let index  = this.hasFunc(key,this.limit)
    // 取出数组
    let bucket = this.storage[index];
    // 3.判断这个数组是否存在
    if(bucket === undefined){
      // 3.1 创建
      bucket = []
      this.storage[index] = bucket
    }
    // 判断是新增还是改变原来的值
    let overwrite =  false;
    for(let i = 0 ; i < bucket.length; i++){
      let tuple = bucket[i];
      if(tuple[0] === key){
        tuple[1] = value;
        overwrite = true;
      }
    }

    // 如果是新增 前一步没有覆盖
    if(!overwrite){
      bucket.push([key,value])
      this.count ++
      // 判断是否需要扩容
      if(this.count >this.limit * 0.75){
        // this.resize(this.limit * 2) 
        // 扩容选择使用质数扩容
        let primeNum = this.getPrime(this.limit * 2)
        this.resize(primeNum);
      }
    }
  }
  /**
   * 获取存放的数据
   * @param {*} key 
   */
  this.get = key => {
    // 1.获取key 对应的索引
    let index = this.hasFunc(key,this.limit)
    // 2. 根据索引拿到 索引位置的数组
    let bucket = this.storage[index]
    // 如果拿到的是空值 那么这个位置是没有值的
    if(bucket == null){
      return null;
    }
    // 4.如果有数据 判断是否有对应的key
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if(tuple[0] === key) return tuple[1]      
    }
    // 5.没有找到 
    return null;
  }
  /**
   * 删除数据
   * @param {*} key 
   */
  this.remove = key => {
    // 1.获取key 对应的索引
    let index = this.hasFunc(key, this.limit)
    // 2. 根据索引拿到 索引位置的数组
    let bucket = this.storage[index]
    // 如果拿到的是空值 那么这个位置是没有值的
    if (bucket == null) {
      return null;
    }
    // 4.如果有数据 判断是否有对应的key
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        bucket.splice(i,1)
        this.count --
        // 不断的删除数据 那么将数组容量减小
        if(this.limit > 8 && this.count < this.limit * 0.25){
          // this.resize(Math.floor(this.limit / 2))
          // 减容采用质数
          let primeNum = this.getPrime(Math.floor(this.limit / 2))
          this.resize(primeNum)
        }
        return tuple[1]
      }
    }
    // 5.没有找到 
    return null;
  }
  /**
   * 判断哈希表是否为空
   */
  this.isEmpty = () => {
    return this.count == 0
  }
  /**
   * 获取哈希表的个数
   */
  this.size = () => {
    return this.count
  }
  
  /**
   * 哈希表扩容
   * @param {新的容量} newLimit 
   */
  this.resize = newLimit => {
    // 1. 保存原有的旧的数组
    let oldStorage = this.storage
    // 重置属性
    this.limit = newLimit
    this.count = 0
    this.storage = [];
    // 遍历旧数据的数据项并重新插入到新的哈希表中
    oldStorage.forEach(bucket => {
      // bucket 为 null 表示没有数据
      if(bucket == null){
        return
      }
      // bucket 中有数据 需要重新哈希化插入
      for(let i = 0; i < bucket.length; i++){
        let tuple = bucket[i]
        this.put(tuple[0],tuple[1])
      }
    })
  }
  /**
   * 判断一个数是否为质数
   * @param {*} num 
   */
  this.isPrime = num => {
    // 改进 其实遍历到平方根即可
    let temp = parseInt(Math.sqrt(num));
    for (let i = 2; i <= temp; i++) {
      if (num % i == 0) {
        return false
      }
    }
    return true;
  }
  /**
   * 获取质数
   * @param {*} num 
   */
  this.getPrime = num => {
    while (!this.isPrime(num)) {
      num ++
    }
    return num
  }
}


//return 
// 测试
const ht = new HashTable();
console.log(ht.limit);

ht.put("abc", "123")
ht.put("abv", "234")
ht.put("abd", "321")
ht.put("a", "321")
ht.put("d", "321")
ht.put("f", "321")
ht.put("fd", "321")
ht.put("fderw", "321")
ht.put("5fe", "321") 
console.log(ht.get("abc"));
console.log(ht.size());
console.log(ht.remove("abc"));
console.log(ht.get("abc"));
console.log(ht.size());
console.log(ht.limit);

