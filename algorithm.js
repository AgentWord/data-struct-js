// 100个灯泡 环形 即 arr[100] = arr[0];
// 按住一个灯泡 其两侧灯泡状态改变 arr[i].click -> arr[i-1] = !arr[i-1]; arr[i+1] = !arr[i+1]; 
// 怎么样使所有灯泡都亮
// 定义一个数组 长度为100 内容 随机 1 或者 0
class Light {
  constructor(status) {
    this.status =  status == true;
  }
  changeStatus() {
    this.status = !this.status;
    return this;
  }
  getStatus(){
    return this.status;
  }
  setStatus(status){
    this.status = status;
    return this;
  }
}
const lightArr = [];
const lightCount = 10;

for (let i = 0; i < lightCount ; i++){
  lightArr.push(new Light(Math.round(Math.random())));
}
console.log(lightArr.length) // 此时length为99
// 遍历数组操作
for(let i = 0; i < lightArr.length; i++){
  // 如果元素值为0 则要触发下一个按钮使其更改为1
  if(lightArr[i].status){
    continue;
  }
  // 触发下一个按钮使其更改 实际上是直接更改了三个值的状态
  if (i + 2 < lightCount){
    lightArr[i].changeStatus();
    lightArr[i + 1].changeStatus();
    lightArr[i + 2].changeStatus();
  }
}
// 看看如何处理末尾的数据   98 99
if (lightArr[lightCount - 2].getStatus() && lightArr[lightCount -1].getStatus()) {
  console.log(lightArr, "真棒全亮了"); // 全亮了
  return;
} else if (!lightArr[lightCount - 2].getStatus() && !lightArr[lightCount-1].getStatus()) {
  lightArr[lightCount-2].changeStatus();
  lightArr[lightCount -1 ].changeStatus();
  lightArr[0].changeStatus()
}else{
  // 0 标记为 false
  lightArr[0].setStatus(false);
  lightArr[lightCount -2].setStatus(true);
  lightArr[lightCount -1].setStatus(true);
}
// 第二轮 将剩余部分进行分组 3个一组 并且按中间的灯 这样一圈下来 所有的登都灭了
for (let i = 1; i < lightArr.length; i = i + 3) {
  lightArr[i + 1].changeStatus();
  lightArr[i + 2].changeStatus();
  lightArr[i].changeStatus();
}
//
for (let i = 1; i < lightArr.length; i ++ ) {
  if (i + 1 < lightCount){
    lightArr[i - 1].changeStatus();
    lightArr[i].changeStatus();
    lightArr[i + 1].changeStatus();
  }
  // 第一个和最后一个需要按一下
}
// 按最后一个
lightArr[0].changeStatus();
lightArr[lightCount - 1].changeStatus();
lightArr[lightCount - 2].changeStatus();
// 按第一个

lightArr[0].changeStatus();
lightArr[lightCount - 1 ].changeStatus();
lightArr[1].changeStatus();

console.log(lightArr,"我经过了三次"); // 

