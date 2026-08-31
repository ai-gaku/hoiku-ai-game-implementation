import { scenes, sceneIndex } from './scenes.js';
import { assets } from './assets.js';
import { AudioManager } from './audio.js';

const DEV_MODE = new URLSearchParams(location.search).get('dev') === '1';

const audio = new AudioManager();
const state = {
  index: 0,
  history: {},
  reflect: {},
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

function memoryLayer(scene){
  if(!scene.memoryImage) return '';
  return `<div class="memory-overlay"></div>
    <div class="memory-frame-wrap">
      <div class="memory-frame">
        <img class="memory-image" src="${scene.memoryImage}" alt="">
      </div>
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
    const group = ui.group || 'default';
    state.reflect[group] = state.reflect[group] || [];
    return `<div class="multi-note">※当てはまるものを複数選べます。</div><div class="reflect-grid">${ui.items.map((x,i)=>`<label class="reflect-card"><input type="checkbox" data-reflect="${i}" data-reflect-group="${group}" ${state.reflect[group][i] ? 'checked' : ''}><span>${x}</span></label>`).join('')}</div>`;
  }
  if(ui.type === 'aiTry'){
    return `<section class="ai-try-box">
      <div class="ai-try-note">※生成AIを使うかどうかは任意です。試さなくても次へ進めます。</div>
      <div class="ai-try-section">
        <div class="ai-try-heading">プロンプト</div>
        <div class="ai-try-prompt">${ui.prompt}</div>
        <button class="copy-prompt-btn" type="button" data-copy-prompt="${sceneId}">プロンプトをコピー</button>
        <div class="copy-feedback" data-copy-feedback="${sceneId}" aria-live="polite"></div>
      </div>
      <div class="ai-try-section"><div class="ai-try-heading">プロンプトのポイント</div><ul class="ai-try-points">${ui.points.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div class="ai-try-section"><div class="ai-try-heading">試したら、少し考えてみよう</div><ul class="ai-try-reflection">${ui.reflection.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div class="ai-try-hint">普段使っている生成AIに貼り付けて試してみてください。</div>
    </section>`;
  }
  if(ui.type === 'comment'){
    return `<article class="ending-comment"><h3>コメント</h3><p>${ui.text}</p></article>`;
  }
  if(ui.type === 'otherViews'){
    const configs = [
      {key:'scene02-choice',title:'場面②　Aちゃんの登園',labels:{'scene02-a':'同じ目線になり、「大丈夫だよ」と声をかける','scene02-b':'保護者に、昨夜や今朝の様子をもう少し聞く','scene02-c':'Aちゃんの様子を見ながら、好きな遊びに誘ってみる','scene02-d':'ちずに、Aちゃんへの関わり方を相談する'},alt:{'scene02-a':['scene02-c','Aちゃん自身の様子を少し見ながら好きな遊びへ誘うと、遊びへ目が向くかを手がかりにできます。ただし、まだ保護者から離れる準備ができていない可能性もあります。'],'scene02-b':['scene02-d','ちずに相談すると、家での情報だけでなく「今のAちゃんがどう見えるか」に視点を戻すきっかけになります。'],'scene02-c':['scene02-a','安心してもらおうと直接声をかける方法もあります。反応を見て、声をかけるタイミングが合っていたか考える必要があります。'],'scene02-d':['scene02-c','自分でAちゃんを観察し、好きな遊びへ目が向くか試してみる方法もあります。相談することと、自分で見ることの両方が手がかりになります。']}},
      {key:'scene04-choice',title:'場面④　BちゃんとDちゃんのトラブル',labels:{'scene04-a':'Dちゃんの安全を確保しながら、Bちゃんにも落ち着いて関わる','scene04-b':'Bちゃんにすぐ「叩いちゃだめ」と伝える','scene04-c':'まずBちゃんに「どうしたの？」と理由を聞く','scene04-d':'少し様子を見て、子ども同士で解決できるか待つ'},alt:{'scene04-a':['scene04-b','先に「叩いちゃだめ」と伝えると、してはいけない行動を明確にできます。一方で、泣いているDちゃんの安全確認を同時に忘れないことが必要です。'],'scene04-b':['scene04-a','先にDちゃんの安全を確かめながらBちゃんにも関わると、禁止を伝えるだけでなく、双方の状態を見ながら対応できます。'],'scene04-c':['scene04-a','Bちゃんの理由を聞く前にDちゃんの安全を確認する方法もあります。気持ちの理解と安全確保の優先順位を考える場面です。'],'scene04-d':['scene04-a','叩いた直後で相手が泣いているため、大人がすぐ安全を確保する選択もあります。「待つ」が適切な場面かどうかの判断が重要です。']}},
      {key:'scene06-choice',title:'場面⑥　Bちゃんの保護者への伝達',labels:{'scene06-a':'AIの文章案をもとに、そのまま伝える','scene06-b':'Bちゃんが友だちと関わろうとしていた姿も少し加える','scene06-c':'叩いたという事実が伝わるよう、もっとはっきりした表現に直す','scene06-d':'ちずに、どこまでどう伝えるか相談する'},alt:{'scene06-a':['scene06-b','一日のBちゃんの姿も加えると、「叩いた出来事」だけでなく、友だちと関わろうとしていた過程も伝えられます。'],'scene06-b':['scene06-c','叩いたという事実をより明確にする方法もあります。背景を伝えることと、事実を曖昧にしないことの両方が必要です。'],'scene06-c':['scene06-b','事実を明確にしつつ、Bちゃんが何度も友だちと関わろうとしていた姿も加えると、その日のBちゃんをより立体的に伝えられます。'],'scene06-d':['scene06-b','AI案を土台に、自分でBちゃんの日中の姿を加えることもできます。大切なのは「保護者に今日のBちゃんをどう知って帰ってほしいか」を考えることです。']}}
    ];
    const cards=configs.map(c=>{const chosen=state.history[c.key];if(!chosen)return '';const [altId,comment]=c.alt[chosen];return `<article class="other-view-card"><h3>${c.title}</h3><p><strong>あなたが選んだ関わり</strong><br>${c.labels[chosen]}</p><p><strong>別の選択肢だったら</strong><br>${c.labels[altId]}</p><p><strong>考えてみたいこと</strong><br>${comment}</p></article>`;}).filter(Boolean).join('');
    return cards?`<div class="multi-note">※正解・不正解を決めるためではなく、別の選択をした場合に見えてくることを比べます。</div><div class="other-view-list">${cards}</div>`:`<div class="multi-note">開発用の場面選択からエンディングを直接開いた場合は、途中の選択履歴がないため「もう一つの見方」は表示されません。最初からプレイすると、場面②・④・⑥の選択に応じて表示されます。</div>`;
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


function sceneStartId(sceneNo){
  const prefix = sceneNo === 'ending' ? 'ending-' : `scene${String(sceneNo).padStart(2,'0')}-`;
  const found = scenes.find(s => s.id.startsWith(prefix));
  return found?.id || null;
}

function renderDevSceneSelector(){
  const options = [
    ['title','開始画面'],
    [1,'場面①'],
    [2,'場面②'],
    [3,'場面③'],
    [4,'場面④'],
    [5,'場面⑤'],
    [6,'場面⑥'],
    [7,'場面⑦'],
    ['memory','回想演出'],
    ['ending','エンディング']
  ];

  app.innerHTML = `
    <main class="game-shell dev-start-shell">
      <header class="game-topbar">
        <div><span class="eyebrow">DEVELOPMENT MODE</span><strong>確認開始位置を選択</strong></div>
      </header>
      <section class="story-panel dev-scene-selector">
        <div class="speaker">開発用</div>
        <div class="story-text">確認したい場面を選んでください。通常のURLでは、この画面は表示されません。</div>
        <div class="dev-scene-grid">
          ${options.map(([no,label]) => `<button class="choice-btn dev-scene-btn" data-dev-scene="${no}"><span>${label}から開始</span></button>`).join('')}
        </div>
      </section>
    </main>`;

  document.querySelectorAll('[data-dev-scene]').forEach(btn => {
    btn.onclick = () => {
      const raw = btn.dataset.devScene;
      const no = raw === 'ending' ? 'ending' : (raw === 'memory' ? 'memory' : (raw === 'title' ? 'title' : Number(raw)));
      const id = no === 'memory' ? 'scene07-final4' : (no === 'title' ? 'title-screen' : sceneStartId(no));
      if(!id) return;
      const idx = scenes.findIndex(s => s.id === id);
      if(idx >= 0){
        state.index = idx;
        state.aiBusy = {};
        state.aiDone = {};
        state.history = {};
        render();
      }
    };
  });
}


function renderSpecialScreen(scene){
  const isTitle = scene.specialScreen === 'title';
  const isEnding = scene.specialScreen === 'ending';
  const heading = isTitle ? 'AIと考える、保育の一日' : 'おつかれさまでした';
  const sub = isTitle
    ? '新人保育者・ましろと一緒に、子どもの姿と保育者の役割を考えてみよう'
    : '最後までプレイしていただき、ありがとうございました。';
  const note = isEnding
    ? 'AIと保育者、それぞれにできることを考えながら、今日の場面を振り返ってみてください。'
    : '';
  const button = isTitle ? 'はじめる' : '最初からプレイする';

  app.innerHTML = `
    <main class="special-screen ${isTitle ? 'title-screen' : 'ending-screen'}"
          style="background-image:url('${scene.background}')">
      <div class="special-screen-shade"></div>
      <section class="special-screen-panel">
        <h1>${heading}</h1>
        <p class="special-subtitle">${sub}</p>
        ${note ? `<p class="special-note">${note}</p>` : ''}
        <button class="special-start-btn" id="specialStartBtn">${button}</button>
      </section>
    </main>`;

  const btn = document.querySelector('#specialStartBtn');
  if(btn){
    btn.onclick = () => {
      audio.enable();
      if(isTitle){
        const idx = sceneIndex['scene01-01'];
        state.index = idx ?? 1;
        render();
      }else{
        state.index = sceneIndex['title-screen'] ?? 0;
        state.history = {};
        state.reflect = {};
        state.aiDone = {};
        state.aiBusy = {};
        render();
      }
    };
  }
}

function render(){
  const s = scenes[state.index];
  applyAudioCue(s);
  if(s.specialScreen){
    renderSpecialScreen(s);
    return;
  }

  const stagePositionX = s.sceneImage
    ? (s.sceneImagePositionX ?? 50)
    : (s.bgPositionX ?? 50);
  const stageSize = s.stageSize || 'cover';
  const stageStyle = s.sceneImage
    ? `background-image:url('${s.sceneImage}');background-position:${stagePositionX}% center;background-size:${stageSize};background-repeat:no-repeat`
    : `background-image:url('${s.background}');background-position:${stagePositionX}% center;background-size:${stageSize};background-repeat:no-repeat`;
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
      <section class="visual-stage ${s.memoryImage ? 'has-memory' : ''}" style="${stageStyle}">${cast}<div class="stage-shade"></div>${memoryLayer(s)}</section>
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
    const group = cb.dataset.reflectGroup || 'default';
    state.reflect[group] = state.reflect[group] || [];
    state.reflect[group][n] = cb.checked;
  });

  const aiBtn = document.querySelector('[data-ai-run]');
  if(aiBtn) aiBtn.onclick = () => runAi(s);

  document.querySelectorAll('[data-copy-prompt]').forEach(btn => {
    btn.onclick = async () => {
      const promptText = s.ui?.prompt || '';
      const feedback = document.querySelector(`[data-copy-feedback="${s.id}"]`);
      try{
        if(navigator.clipboard && window.isSecureContext){
          await navigator.clipboard.writeText(promptText);
        }else{
          const ta = document.createElement('textarea');
          ta.value = promptText;
          ta.setAttribute('readonly','');
          ta.style.position='fixed'; ta.style.opacity='0';
          document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
        }
        if(feedback){ feedback.textContent='コピーしました'; window.setTimeout(()=>{feedback.textContent='';},1600); }
      }catch(e){ if(feedback) feedback.textContent='コピーできませんでした。長押しで選択してコピーしてください。'; }
    };
  });

  const nb = document.querySelector('#nextBtn');
  if(nb) nb.onclick = () => {
    if(isLast){
      state.index = 0;
      state.history = {};
      state.reflect = {};
      state.aiDone = {};
      state.aiBusy = {};
      render();
    } else {
      advance();
    }
  };
}

if(DEV_MODE) renderDevSceneSelector();
else render();
