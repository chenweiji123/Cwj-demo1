//公共状态
//因为不管你画什么内容都是在同一个画布上面画的   所以我创建一个公共的js
//我只想让我的databus  new一次
//如果instance有 我就返回第一次的instance   如果没有我就让instance等于当前的 这个this对象
let instance; //定义一个全局变量
//创建了Databus对象 并且暴露出去
export class Databus {
  constructor() {
    if (instance) {
      return instance;
    } else {
      instance = this;
      this.gameover = false; //游戏状态
      this.canvas; //画布
      this.ctx; //画布上下文状态
      this.obstaclelist = []; //障碍物的列表
      this.timer = null; //游戏状态
      console.log(this.obstaclelist)
    }
  }
  //重置的函数
  reset() {
    this.gameover = false;
    this.obstaclelist = [];
    this.timer = null;

  }
}