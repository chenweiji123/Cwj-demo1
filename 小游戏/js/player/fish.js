//鱼
import {
  Databus
} from "../databus.js"; //导入公共样式
let databus = new Databus()

export class Fish {
  constructor() {
    this.img = wx.createImage();
    this.img.src = "images/fish1.png";
    this.x = databus.canvas.width / 4;
    this.y = databus.canvas.height / 2;
    this.w = 41;
    this.h = 30;
    this.time=0   //下落的时间
    this.newy = databus.canvas.height / 2
  }

  render() {
    //模拟中立加速度
    let g = 0.98 / 2.9;
    //设置回弹的偏移量
    let offsetup = 30;
    //计算出位移值 自由落体的高度
    let offsetY = (g * this.time * (this.time - offsetup)) / 2;
    this.newy = this.y + offsetY;
    this.time++;
    //drawImage() 方法在画布上绘制图像、画布或视频
    // databus.ctx.drawImage(this.img,this.x,this.y,this.w,this.h,(databus.canvas.width-this.w)/3.5,(databus.canvas.height-this.h-27),this.w,this.h),
    databus.ctx.drawImage(this.img, 0, 0, this.w, this.h, this.x, this.newy, this.w, this.h)

  }
}