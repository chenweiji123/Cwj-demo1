import {
  Databus
} from "./databus.js"; //引入databus公共样式
import {
  seabed
} from "./runtime/seabed.js"; //引入河床的js

import {
  Sealevel
} from "./runtime/sealevel.js"; //引入河床的js

import {
  Button
} from "./runtime/button.js"; //引入按钮的js

import {
  Music
} from "./runtime/music.js"; //引入音乐的js

import {
  Fish
} from "./player/fish.js"; //引入鱼的js

import {
  Score
} from "./player/score.js"; //引入分数的js

import {
  Obstacle
} from "./runtime/obstacle"; //引入障碍物的js

let databus = new Databus(); //创建了一个新的databus对象
let music = new Music()
//初始化画布的对象
//创建的main的对象  暴露出去
export class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext("2d"); //创建canvas对象
    databus.canvas = this.canvas;
    databus.ctx = this.ctx;
    //页面初始化
    this.init()
    this.registerEvent()
  }
  init() {
    this.bg = new seabed() // 创建的河床的对象
    this.level = new Sealevel() // 创建的河床的对象
    this.btn = new Button() //创建按钮的对象
    this.fish = new Fish() //创建鱼的对象
    this.score = new Score() //创建分数的对象
    //调用障碍物的函数
    this.createobstacle()
    this.startgame()
    // setTimeout(() => {
    //   databus.gameover = true;
    // }, 5000)
  }
  //检测鱼是否碰到网子
  //检查是否碰撞到.. (碰到渔网，碰到四周)
  check() {
    //鱼的边框模型，模拟鱼的时时位置
    const fishBorder = {
      top: this.fish.y,
      bottom: this.fish.y + this.fish.h,
      left: this.fish.x,
      right: this.fish.x + this.fish.w
    };
    //循环遍历所有的障碍物
    for (let i = 0; i < databus.obstaclelist.length; i++) {
      //创建障碍物边框模型
      const obstacle = databus.obstaclelist[i];
      const obstacleBorder = {
        top: obstacle.y,
        bottom: obstacle.y + obstacle.h,
        left: obstacle.x,
        right: obstacle.x + obstacle.w
      };

      if (this.isCheck(fishBorder, obstacleBorder)) {
        console.log('抓到鱼');
        databus.gameover = true;
        return;
      }
    }

    //和海平面撞击判断
    if (this.fish.newy + this.fish.h >= databus.canvas.height - this.level.h) {
      console.log('撞击地板啦');
      databus.gameover = true; //设置游戏状态，停止游戏
      return;
    }

    //加分逻辑
    if (this.fish.x > databus.obstaclelist[0].x + databus.obstaclelist[0].img.width &&
      this.score.isScore) {
      wx.vibrateShort({
        success: function () {
          console.log('振动成功');
        }
      });
      this.score.isScore = false;
      this.score.scoreNumber++;
    }
  }
  // 验证是否有碰撞
  isCheck(fish, obstacle) {
    let s = false; //未碰撞状态
    if (fish.top > obstacle.bottom ||
      fish.bottom < obstacle.top ||
      fish.right < obstacle.left ||
      fish.left > obstacle.right
    ) {
      s = true;
    }
    return !s;
  }
  startgame() {
    if (!databus.gameover) {
      this.bg.render() //当游戏没有结束的时候我就渲染
      this.level.render();

      this.fish.render();
      this.score.render();
      //清除障碍物  当第一组障碍物消失屏幕时，清除第一组
      if (databus.obstaclelist[0].x + databus.obstaclelist[0].img.width <= 0 && databus.obstaclelist.length == 4) {
        databus.obstaclelist.shift();
        databus.obstaclelist.shift();
      }
      //当障碍物已经移动到了屏幕中间的左侧  并且当前只有两个障碍物的时候  就额外再增加两个
      if (databus.obstaclelist[0].x <= (databus.canvas.width - databus.obstaclelist[0].img.width) / 2 && databus.obstaclelist.length == 2) {
        this.createobstacle()
      }
      //渲染障碍物
      databus.obstaclelist.forEach(value => {
        value.render()
      })

      let timer = requestAnimationFrame(() => {
        console.log(1)
        this.startgame()
      })
      databus.timer = timer

    } else {
      //游戏结束
      databus.reset();
      this.btn.render();
      cancelAnimationFrame(databus.timer)
      wx.triggerGC()
    }

    //window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，
    //并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
    //该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘

  }
  //创建障碍物的函数
  createobstacle() {
    //控制上下高度的上限
    let mintop = databus.canvas.height / 8 //最低高度为屏幕的八分之一
    let maxtop = databus.canvas.height / 2 //最大你这个渔网是我屏幕的一半
    //计算随机数
    let top = mintop + Math.random() * (maxtop - mintop);
    databus.obstaclelist.push(new Obstacle(top, "images/pi_up.png", "up"))
    databus.obstaclelist.push(new Obstacle(top, "images/pi_down.png", "down"))
  }
  //触摸的方法
  registerEvent() {
    wx.onTouchStart(() => {
      console.log(2)
      if (databus.gameover) {
        console.log("游戏开始了")
        databus.gameover = false
        this.init()
      } else {
        //让鱼跳
        this.fish.y = this.fish.newy;
        //时间清零
        this.fish.time = 0;
      }
    })
  }
}