//音乐
//做一个单列模式
let instance;
export class Music {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.bgmAudio = wx.createInnerAudioContext();
    this.bgmAudio.loop=true;
    this.bgmAudio.src="audio/bgm.mp3";
    this.playBgm()
  }
  playBgm(){
    this.bgmAudio.play()
    console.log("播放音乐")
  }
}