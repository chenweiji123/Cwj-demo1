//开始按钮
import {
  Databus
} from "../databus.js";   //导入公共样式
let databus = new Databus()

export class Button {
  constructor() {
    this.img = wx.createImage();
    this.img.src="images/start_button.png";
    this.x = 0;
    this.y = 0;
    this.w = 64;
    this.h = 64;
  }
  render(){
    //drawImage() 方法在画布上绘制图像、画布或视频
    databus.ctx.drawImage(this.img,this.x,this.y,this.w,this.h,(databus.canvas.width-this.w)/2,(databus.canvas.height-this.h)/2,this.w,this.h)
  }
}