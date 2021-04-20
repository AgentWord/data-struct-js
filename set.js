/*
 * @Author: cdb 
 * @Date: 2021-04-16 08:29:53 
 * @Last Modified by: cdb
 * @Last Modified time: 2021-04-20 09:43:21
 */
// 集合数据结构 在 ES6 中已经增加了 Set 类
// 集合的特性就是 没有重复项 
// 参考 https://www.jianshu.com/p/2b9b5871313d
class SetClass{
  constructor(){
    this.times = {}
  }
  // 集合中是否含有某元素
  has(value){
    return this.times.hasOwnProperty(value);
  }
  // 集合中添加元素
  add(value){
    if(this.has(value)){
      return false;
    }
    this.times[value] = value;
    return true;
  }
  // 移除几个集合中某值
  remove(value){
    if(!this.has(value)) return false;
    delete this.times[value];
    return true;
  }
  // 清除集合中所有元素
  clear() {
    this.times = {};
  }
  // 数组形式返回集合中所有元素
  values(){
    return Object.keys(this.times);
  }
  // 获取集合大小
  size(){
    return this.values().length;
  }
}

const set = new SetClass();
set.add(1);
set.add(1);
set.add(100)
set.add(200)
console.log(set.values());
console.log(set.has(2));
set.remove(100)
console.log(set.values());
console.log(set.size());
