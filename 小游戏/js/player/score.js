//分数
import {
  Databus
} from "../databus.js"; //导入公共样式
let databus = new Databus()

export class Score {
  constructor() {
    this.text = "COUNT:0";
  }

  render() {
    //drawImage() 方法在画布上绘制图像、画布或视频
    databus.ctx.font = "30px 华文彩云"
    databus.ctx.strokeStyle = "#fff"
    databus.ctx.lineWidth = 2
    databus.ctx.strokeText(this.text, 10, 100)
  }
}