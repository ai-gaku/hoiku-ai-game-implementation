import { scenes, sceneIndex } from './scenes.js';
import { assets } from './assets.js';
import { AudioManager } from './audio.js';

const audio = new AudioManager();
const state = {
  index: 0,
  history: {},
  reflect: [],
  aiDone: {},
  aiBusy: {},
};
const app = document.querySelector('#app');

function nextIndex(scene){
  if(scene.next) return sceneIndex[scene.next];
  return Math.min(state.index + 1, scenes.length - 1);
}

function applyAudioCue(scene){
  // bgm プロパティが存在する画面だけBGM状態を変更する。
  // 未指定画面では直前のBGM状態を維持する。
  if(Object.prototype.hasOwnProperty.call(scene, 'bgm')){
    audio.setBgm(scene.bgm || null);
  }
}

function goTo(id, isChoice=false, choiceGroup=null){
  if(isChoice && choiceGroup){
    state.history[choiceGroup] = id;
    audio.se(assets.audio.seSelect);
  }
  const target = sceneIndex[id];
  if(target == null) return;
  const before = scenes[state.index];
  const after = scenes[target];
  if(after.sceneNo !== before.sceneNo) audio.se(assets.audio.seSceneChange);
  state.index = target;
  render();
}

function advance(){
  audio.enable();
  const s = scenes[state.index];
  const ni = nextIndex(s);
  if(ni !== state.index){
    if(scenes[ni].sceneNo !== s.sceneNo) audio.se(assets.audio.seSceneChange);
    state.index = ni;
    render();
  }
}

function characterLayer(c){
  const style = `left:${c.x}%;top:${c.y}%;width:${c.w}%`;
  const debug = new URLSearchParams(location.search).get('debug') === '1';
  return `<div class="character-wrap" style="${style}">
    <img class="character" src="${c.asset}" alt="" draggable="false">
    ${debug ? `<span class="character-debug">x=${c.x} / y=${c.y} / w=${c.w}</span>` : ''}
  </div>`;
}

function aiBlock(ui, sceneId){
  const done = !!state.aiDone[sceneId];
  const busy = !!state.aiBusy[sceneId];
  const output = done
    ? `<div class="ai-label">AI RESPONSE</div>
       <div class="ai-results">${ui.output.map(([h,b])=>`<article><h3>${h}</h3><p>${b}</p></article>`).join('')}</div>`
    : '';
  const process = busy
    ? `<div class="ai-processing" role="status" aria-live="polite">
         <span class="ai-spinner" aria-hidden="true"><i></i><i></i><i></i></span>
         <strong>AIが整理しています…</strong>
       </div>`
    : '';
  const start = (!done && !busy)
    ? `<button class="ai-run-btn" data-ai-run="${sceneId}">AIで整理する</button>`
    : '';

  return `<section class="ai-box">
    ${ui.privacy ? `<div class="privacy-note"><strong>AIに入力する前に</strong><span>実際の利用では、所属園のルールやAIサービスの情報管理方法を確認し、個人が特定できる情報や機微な情報を安易に入力しないようにします。</span></div>` : ''}
    <div class="ai-label">PROMPT</div>
    <div class="prompt-box">${ui.prompt}</div>
    ${start}${process}${output}
  </section>`;
}

function uiBlock(ui, sceneId){
  if(!ui) return '';
  if(ui.type === 'records'){
    return `<div class="scroll-hint">${ui.scrollHint}</div><div class="card-list">${ui.items.map(([h,b])=>`<article class="info-card"><h3>${h}</h3><p>${b}</p></article>`).join('')}</div>`;
  }
  if(ui.type === 'notice'){
    return `<div class="privacy-note standalone"><strong>${ui.title || '注意'}</strong><span>${ui.body || ''}</span></div>`;
  }
  if(ui.type === 'ai') return aiBlock(ui, sceneId);
  if(ui.type === 'multiReflect'){
    return `<div class="multi-note">※当てはまるものを複数選べます。</div><div class="reflect-grid">${ui.items.map((x,i)=>`<label class="reflect-card"><input type="checkbox" data-reflect="${i}" ${state.reflect[i] ? 'checked' : ''}><span>${x}</span></label>`).join('')}</div>`;
  }
  return '';
}

function runAi(scene){
  if(!scene.ui || scene.ui.type !== 'ai' || state.aiBusy[scene.id] || state.aiDone[scene.id]) return;
  audio.enable();
  audio.se(assets.audio.seAiStart, .50);
  state.aiBusy[scene.id] = true;
  render();

  window.setTimeout(() => {
    state.aiBusy[scene.id] = false;
    state.aiDone[scene.id] = true;
    audio.se(assets.audio.seAiComplete, .52);
    render();
  }, scene.ui.delayMs || 1250);
}

function render(){
  const s = scenes[state.index];
  applyAudioCue(s);

  const stageStyle = s.sceneImage
    ? `background-image:url('${s.sceneImage}')`
    : `background-image:url('${s.background}')`;
  const cast = s.sceneImage ? '' : (s.cast || []).map(characterLayer).join('');
  const choices = (s.choices || []).map((c,i)=>`<button class="choice-btn" data-choice="${c.id}"><span class="choice-no">${i+1}</span><span>${c.label}</span></button>`).join('');
  const isLast = state.index === scenes.length - 1;
  const aiPending = s.ui?.type === 'ai' && !state.aiDone[s.id];

  app.innerHTML = `
    <main class="game-shell">
      <header class="game-topbar">
        <div><span class="eyebrow">HOIKU × AI</span><strong>${s.sceneLabel}</strong></div>
        <button id="soundBtn" class="icon-btn" aria-label="音を有効にする">♪</button>
      </header>
      <section class="visual-stage" style="${stageStyle}">${cast}<div class="stage-shade"></div></section>
      <section class="story-panel ${s.thought ? 'thought' : ''}">
        <div class="speaker">${s.speaker || ''}</div>
        <div class="story-text">${s.text}</div>
        ${uiBlock(s.ui, s.id)}
        <div class="controls ${choices ? 'has-choices' : ''}">
          ${choices || (aiPending ? '' : `<button id="nextBtn" class="next-btn">${isLast ? '最初から' : '次へ'}</button>`)}
        </div>
        <div class="progress"><span style="width:${((state.index+1)/scenes.length)*100}%"></span></div>
      </section>
    </main>`;

  document.querySelector('#soundBtn').onclick = () => audio.enable();
  document.querySelectorAll('[data-choice]').forEach(btn => btn.onclick = () => goTo(btn.dataset.choice, true, s.id));
  document.querySelectorAll('[data-reflect]').forEach(cb => cb.onchange = () => {
    const n = Number(cb.dataset.reflect);
    state.reflect[n] = cb.checked;
  });

  const aiBtn = document.querySelector('[data-ai-run]');
  if(aiBtn) aiBtn.onclick = () => runAi(s);

  const nb = document.querySelector('#nextBtn');
  if(nb) nb.onclick = () => {
    if(isLast){
      state.index = 0;
      state.history = {};
      state.reflect = [];
      state.aiDone = {};
      state.aiBusy = {};
      render();
    } else {
      advance();
    }
  };
}

render();
