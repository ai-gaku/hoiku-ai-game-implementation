export class AudioManager {
  constructor(){
    this.bgm = null;
    this.currentBgm = null;
    this.enabled = false;
    this.fadeTimer = null;
  }

  enable(){
    this.enabled = true;
    if(this.bgm) this.bgm.play().catch(()=>{});
  }

  async fadeOut(duration = 650){
    if(!this.bgm) return;
    if(this.fadeTimer) clearInterval(this.fadeTimer);
    const audio = this.bgm;
    const start = audio.volume;
    const steps = 16;
    let i = 0;
    await new Promise(resolve => {
      this.fadeTimer = setInterval(() => {
        i += 1;
        audio.volume = Math.max(0, start * (1 - i / steps));
        if(i >= steps){
          clearInterval(this.fadeTimer);
          this.fadeTimer = null;
          audio.pause();
          audio.currentTime = 0;
          resolve();
        }
      }, duration / steps);
    });
  }

  async setBgm(src){
    if(src === this.currentBgm) return;

    if(!src){
      await this.fadeOut();
      this.bgm = null;
      this.currentBgm = null;
      return;
    }

    if(this.bgm){
      await this.fadeOut(450);
    }

    this.currentBgm = src;
    this.bgm = new Audio(src);
    this.bgm.loop = true;
    this.bgm.volume = .26;
    if(this.enabled) this.bgm.play().catch(()=>{});
  }

  se(src, volume=.48){
    if(!this.enabled || !src) return;
    const a = new Audio(src);
    a.volume = volume;
    a.play().catch(()=>{});
  }
}
