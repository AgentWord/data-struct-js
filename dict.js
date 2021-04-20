/*
 * @Author: cdb 
 * @Date: 2021-04-16 09:02:57 
 * @Last Modified by: cdb
 * @Last Modified time: 2021-04-16 09:19:47
 */
// 字典的数据实现 在 ES6 中已经增加了 Map 类

function Dic() {
  
  this.times = {};

  
  // 添加值
  this.set = function(key,value){
    this.times[key] = value;
  }
  // 判断是否含有某个键
  this.has = function(key){
    return this.times.hasOwnProperty(key);
  }
  // 删除值
  this.remove = function(key) {
    if(!this.has(key)) return false;
    delete this.times[key];
    return true;
  }
  // 通过键查找到某个值
  this.get  = function(key){
    return this.has(key)?this.times[key]:undefined;
  }
  // 清空方法
  this.clear = function(){
    this.times = {}
  }
  // 获取其中的元素个数
  this.size = function(){
    return Object.keys(this.times).length;
  }
  // 获取所有的键
  this.keys = function(){
    return Object.keys(this.times);
  }
  // 获取所有的值
  this.values = function(){
    return Object.values(this.times);
  }
}


// 创建字典对象
var dict = new Dic()

// 在字典中添加元素
dict.set("age", 18)
dict.set("name", "Coderwhy")
dict.set("height", 1.88)
dict.set("address", "广州市")

// 获取字典的信息
console.log(dict.keys()) // age,name,height,address
console.log(dict.values()) // 18,Coderwhy,1.88,广州市
console.log(dict.size()) // 4
console.log(dict.get("name")) // Coderwhy

// 字典的删除方法
dict.remove("height")
console.log(dict.keys())// age,name,address

// 清空字典
dict.clear()