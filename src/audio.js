export class AudioManager {
  constructor(){ this.bgm=null; this.currentBgm=null; this.enabled=false; }
  enable(){ this.enabled=true; if(this.bgm) this.bgm.play().catch(()=>{}); }
  async setBgm(src){
    if(!src || src===this.currentBgm) return;
    this.currentBgm=src;
    if(this.bgm){ this.bgm.pause(); }
    this.bgm=new Audio(src); this.bgm.loop=true; this.bgm.volume=.26;
    if(this.enabled) this.bgm.play().catch(()=>{});
  }
  se(src){ if(!this.enabled || !src) return; const a=new Audio(src); a.volume=.48; a.play().catch(()=>{}); }
}
