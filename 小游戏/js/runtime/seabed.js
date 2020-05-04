//海底世界
import {
  Databus
} from "../databus.js";   //导入公共样式
let databus = new Databus()
//创建seabed对象
export class seabed {
  constructor() {
    this.img = wx.createImage();
    this.img.src = "images/background.png";
    this.x = 0;
    this.y = 0;
    this.w = 800;
    this.h = 600;
  }
  render(){
    //drawImage() 方法在画布上绘制图像、画布或视频
    databus.ctx.drawImage(this.img,this.x,this.y,this.w,this.h,0,0,databus.canvas.width,databus.canvas.height)
  }
}