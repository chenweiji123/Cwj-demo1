//障碍物
import {
  Databus
} from "../databus.js"; //导入公共样式
let databus = new Databus()

export class Obstacle {
  //type是障碍物的方向   src是障碍物的图片的路径    imgtype  是up的 还是down的 ？
  constructor(top, src, imgtype) {
    this.x = databus.canvas.width;
    this.y = 0;
    this.w = 86;
    this.h = 406;
    this.img = wx.createImage();
    this.img.src = src;
    this.top = top;
    this.imgtype = imgtype;
    this.speed = 2
  }
  render() {
    if (this.imgtype == "up") {
      this.y = this.top - this.h; //随机距离减去自身的高度
    } else {
      let height = databus.canvas.height / 5;
      this.y = this.top + height
    }
    this.x = this.x - this.speed;
    //在绘制的时候从0 0点的坐标开始算
    databus.ctx.drawImage(this.img, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h)
  }
}