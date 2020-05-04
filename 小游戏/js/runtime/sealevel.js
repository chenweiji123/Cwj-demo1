//海平面
import {
  Databus
} from "../databus.js"; //导入公共样式

let databus = new Databus()

export class Sealevel {
  constructor() {
    this.img = wx.createImage();
    this.img.src = "images/sealevel.png";
    this.x = 0;
    this.y = 0;
    this.w = 800;
    this.h = 27;
    //定义变化的坐标
    this.newx = 0;
    //速度每次移动2个像素
    this.speed = 2
  }
  render() {
    //水平坐标
    this.newx = this.newx + this.speed;
    //判断不要让河床跑出去了
    if (this.newx > (this.w - databus.canvas.width)) {
      this.newx = 0
    }

    //drawImage() 方法在画布上绘制图像、画布或视频
    databus.ctx.drawImage(this.img, this.x, this.y, this.w, this.h, -this.newx, databus.canvas.height - this.h, this.w, this.h)
  }
}