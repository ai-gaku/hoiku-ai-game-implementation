import { assets } from './assets.js';

const p = (asset, x, y=100, w=36, anchor='bottom') => ({ asset, x, y, w, anchor });

const records = [
  ['Aちゃん', '昨日は登園後、しばらく保育者のそばで過ごしていた。午前中はあまり遊びに入らなかったが、午後は好きなままごとを楽しんでいた。保護者からは、最近、登園時に保護者と離れるのを嫌がることがあると話があった。'],
  ['Bちゃん', 'ブロック遊びで友だちの近くに行く姿が何度かあった。一緒に遊びたそうだったが、うまく声をかけられず、そのまま離れることもあった。外遊びでは友だちと追いかけっこを楽しんでいた。'],
  ['Cちゃん', '好きな制作には長く集中していた。一方、片づけの時間になってもしばらく遊びを続けていた。保育者が急かさず少し待つと、自分から遊びを終えて片づけ始める姿があった。'],
];

export const scenes = [
  {
    id:'title-screen',
    sceneNo:'TITLE',
    sceneLabel:'',
    background:assets.backgrounds.exteriorMorning,
    specialScreen:'title'
  },
  {
    id:'scene01-01', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning, bgm:assets.audio.bgmMorning,
    cast:[p(assets.characters.mashiro.checkRecords,50,70,80)], speaker:'ナレーション',
    text:'出勤して、子どもたちが登園してくる前。\nましろは昨日の記録を確認していた。'
  },
  {
    id:'scene01-02', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning, cast:[p(assets.characters.mashiro.checkRecords,50,70,80)],
    speaker:'ましろ（心の声）', thought:true,
    text:'情報が多い……。頭に入らないな。登園まであまり時間がないのに……。',
    ui:{type:'records', items:records, scrollHint:'↓ 記録は下まで続きます'}
  },
  {
    id:'scene01-03', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning, cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）', thought:true,
    text:'これ、AIでもう少し分かりやすく整理できるかな……？'
  },
  {
    id:'scene01-04', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning, cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'AI利用前の確認',
    text:'AIを使う前に、入力する情報の扱いを確認します。',
    ui:{type:'notice',
      title:'生成AIを実際に使うときの注意',
      body:'実際の利用では、名前を置き換えるだけでは不十分な場合があります。所属園のルールやAIサービスの情報管理方法を確認し、個人が特定できる情報や機微な情報を安易に入力しないようにしましょう。'}
  },
  {
    id:'scene01-04b', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning, cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'AI', text:'昨日の記録から、今日の保育で見ておきたいことを整理します。',
    ui:{type:'ai', prompt:'昨日の3人の記録をもとに、今日の保育で見ておきたいポイントを整理してください。',
      output:[
        ['Aちゃん','登園時の不安の強さと、安心してからどのように遊びへ向かっていくかを見る。'],
        ['Bちゃん','友だちの遊びにどう入ろうとするか、うまくいかないときにどのような方法を試すかを見る。'],
        ['Cちゃん','活動の切り替えにどのくらい時間が必要か、急かさずに待ったときに自分から動き出す場面があるかを見る。'],
      ]}
  },
  {
    id:'scene01-05', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning,
    cast:[p(assets.characters.mashiro.talkChizuMorning,30,70,80),p(assets.characters.chizu.talkMorning,70,70,80)],
    speaker:'ナレーション',
    text:'そこへ、先輩保育者のちず先生がやってきました。'
  },
  {
    id:'scene01-06', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning,
    cast:[p(assets.characters.mashiro.talkChizuMorning,30,70,80),p(assets.characters.chizu.talkMorning,70,70,80)],
    speaker:'ちず',
    text:'こうやって“今日見るポイント”まで整理してもらえると助かるよね。ただ、昨日と今日が同じとは限らないから、今日の様子をちゃんと見て動いていこう。'
  },
  {
    id:'scene02-01', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園', sceneStart:true, bgm:null,
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.listenParentB,30,70,80),p(assets.characters.a.holdParent,60,70,80),p(assets.characters.parentA.worried,70,70,80)],
    speaker:'ナレーション', text:'登園時間。Aちゃんが保護者と一緒にやってきた。\nAちゃんは保護者の服をつかみ、少し緊張した表情をしている。'
  },
  {
    id:'scene02-02', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.listenParentB,30,70,80),p(assets.characters.a.holdParent,60,70,80),p(assets.characters.parentA.explain,70,70,80)],
    speaker:'Aちゃんの保護者', text:'今朝もなかなか家を出たがらなくて。昨日も寝るのが少し遅かったんです。'
  },
  {
    id:'scene02-choice', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.listenParentB,30,70,80),p(assets.characters.a.holdLooking,60,70,80),p(assets.characters.parentA.worried,70,70,80)],
    speaker:'選択', text:'あなたなら、まずどう関わりますか？',
    choices:[
      {id:'scene02-a',label:'同じ目線になり、頭をなでながら「大丈夫だよ」と声をかける'},
      {id:'scene02-b',label:'保護者に、昨夜や今朝の様子をもう少し聞く'},
      {id:'scene02-c',label:'Aちゃんの様子を見ながら、好きな遊びに誘ってみる'},
      {id:'scene02-d',label:'ちずに、Aちゃんへの関わり方を相談する'},
    ]
  },
  {
    id:'scene02-a', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園', branchOf:'scene02-choice',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.holdLooking,60,70,80),p(assets.characters.parentA.worried,70,70,80)],
    speaker:'ナレーション',
    text:'ましろはAちゃんと同じ目線になり、頭をなでながら「大丈夫だよ」と声をかけた。\nAちゃんは、少し身体を保護者の方へ寄せた。',
    next:'scene02-a2'
  },
  {
    id:'scene02-a2', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.holdLooking,60,70,80),p(assets.characters.parentA.worried,70,70,80)],
    speaker:'ましろ（心の声）', thought:true,
    text:'安心してもらおうと思ったけど、今はまだ声をかけるタイミングじゃなかったのかな……。',
    next:'scene02-converge'
  },
  {
    id:'scene02-b', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園', branchOf:'scene02-choice',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.holdParent,60,70,80),p(assets.characters.parentA.explain,70,70,80)],
    speaker:'ナレーション',
    text:'ましろは、昨夜や今朝の様子をもう少し保護者に聞いた。\n家での様子を聞くことができたが、Aちゃんはまだ保護者の服をつかんでいる。',
    next:'scene02-b2'
  },
  {
    id:'scene02-b2', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.holdParent,60,70,80),p(assets.characters.parentA.explain,70,70,80)],
    speaker:'ましろ（心の声）', thought:true,
    text:'家での様子は分かった。でも、Aちゃん自身の今の様子もちゃんと見ないとな。',
    next:'scene02-converge'
  },
  {
    id:'scene02-c', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園', branchOf:'scene02-choice',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.holdLooking,60,70,80),p(assets.characters.parentA.worried,70,70,80)],
    speaker:'ナレーション',
    text:'ましろはAちゃんの様子を見ながら、好きなままごとに誘ってみた。\nAちゃんはままごとコーナーの方をちらっと見たが、まだ保護者からは離れない。',
    next:'scene02-c2'
  },
  {
    id:'scene02-c2', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.holdLooking,60,70,80),p(assets.characters.parentA.worried,70,70,80)],
    speaker:'ましろ（心の声）', thought:true,
    text:'遊びには少し目を向けた。でも、まだおうちの人から離れる準備はできていないのかも。',
    next:'scene02-converge'
  },
  {
    id:'scene02-d', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園', branchOf:'scene02-choice',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.consultChizu,30,70,80),p(assets.characters.chizu.listenMorning,70,70,80)],
    speaker:'ちず', text:'今のAちゃん、どんな様子に見える？', next:'scene02-d2'
  },
  {
    id:'scene02-d2', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.consultChizu,30,70,80),p(assets.characters.chizu.talkMorning,70,70,80)],
    speaker:'ましろ', text:'まだおうちの人から離れたくなさそうです。でも、少し周りを見る余裕はあるようにも見えます。', next:'scene02-d3'
  },
  {
    id:'scene02-d3', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.consultChizu,30,70,80),p(assets.characters.chizu.talkMorning,70,70,80)],
    speaker:'ちず', text:'そうだね。じゃあ、今は“どう離すか”より、“どうしたら安心してここにいられるか”を考えてみようか。', next:'scene02-converge'
  },
  {
    id:'scene02-converge', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.holdLooking,60,70,80),p(assets.characters.parentA.relieved,70,70,80)],
    speaker:'ナレーション',
    text:'しばらく、ましろはAちゃんの近くで、無理に話しかけすぎずに過ごした。\n必要な範囲で保護者から今朝の様子も聞いた。',
    next:'scene02-converge2'
  },
  {
    id:'scene02-converge2', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.holdLooking,60,70,80),p(assets.characters.parentA.relieved,70,70,80)],
    speaker:'ナレーション',
    text:'Aちゃんは、少しずつ周囲を見るようになった。\n保護者の服をつかむ手も、少しゆるんできた。',
    next:'scene02-converge3'
  },
  {
    id:'scene02-converge3', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.releaseParent,60,70,80),p(assets.characters.parentA.relieved,70,70,80)],
    speaker:'ナレーション',
    text:'やがてAちゃんは保護者の服から手を離し、ましろの近くで、ままごとコーナーの方を見た。',
    next:'scene02-converge4'
  },
  {
    id:'scene02-converge4', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.a.releaseParent,60,70,80),p(assets.characters.parentA.relieved,70,70,80)],
    speaker:'Aちゃんの保護者',
    text:'お願いします。',
    next:'scene02-converge5'
  },
  {
    id:'scene02-converge5', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.observeCCleanup,40,70,80),p(assets.characters.a.interestPlay,70,70,80)],
    speaker:'ましろ（心の声）', thought:true,
    text:'すぐに遊び始めたわけじゃない。でも、少しずつ周りを見る余裕が出てきたのかも。'
  },

  {
    id:'scene03-01', sceneNo:3, sceneLabel:'場面③　自由遊び', sceneStart:true,
    sceneImage:assets.scenes.freeplayOverview, sceneImagePositionX:100, speaker:'ナレーション',
    text:'自由遊びの時間。\nAちゃんは奥でままごとを始め、Cちゃんは制作に集中している。Bちゃんはブロックで遊んでいる子どもたちの近くへ向かった。'
  },
  {
    id:'scene03-02', sceneNo:3, sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom, bgPositionX:100,
    cast:[p(assets.characters.b.sayJoin,50,70,80)], speaker:'Bちゃん', text:'入れて'
  },
  {
    id:'scene03-03', sceneNo:3, sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom, bgPositionX:100,
    cast:[p(assets.characters.b.waitResponse,50,70,80)], speaker:'ナレーション',
    text:'子どもたちは遊びに夢中で、すぐには反応しない。\nBちゃんはもう一度「ねえ、入れて」と声をかけた。ひとりがBちゃんを見るが、そのまま遊びに戻る。'
  },
  {
    id:'scene03-04', sceneNo:3, sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom, bgPositionX:100,
    cast:[p(assets.characters.mashiro.observeCCleanup,30,70,80),p(assets.characters.b.waitResponse,70,70,80)],
    speaker:'ましろ（心の声）', thought:true, text:'Bちゃん、入りたいみたいだけど……。'
  },
  {
    id:'scene03-choice', sceneNo:3, sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom, bgPositionX:100,
    cast:[p(assets.characters.mashiro.observeCCleanup,30,70,80),p(assets.characters.b.waitResponse,70,70,80)],
    speaker:'選択', text:'あなたなら、どう関わりますか？',
    choices:[
      {id:'scene03-a',label:'Bちゃんに「もう一回、“入れて”って言ってみようか」と声をかける'},
      {id:'scene03-b',label:'遊んでいる子どもたちに「Bちゃんも入れてあげて」と声をかける'},
      {id:'scene03-c',label:'すぐには介入せず、Bちゃんが次にどうしようとするか少し様子を見る'},
      {id:'scene03-d',label:'ちずに、今どう関わるか相談する'},
    ]
  },
  {
    id:'scene03-a',sceneNo:3,sceneLabel:'場面③　自由遊び',branchOf:'scene03-choice',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.crouchGentleTalk,30,70,80),p(assets.characters.b.waitResponse,70,70,80)],
    speaker:'ナレーション',
    text:'ましろは「もう一回、“入れて”って言ってみようか」と声をかけた。\nBちゃんは少し間を置き、子どもたちを見る。すぐには声を出さない。',
    next:'scene03-join'
  },
  {
    id:'scene03-b',sceneNo:3,sceneLabel:'場面③　自由遊び',branchOf:'scene03-choice',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.b.waitResponse,50,70,80)],
    speaker:'ナレーション',
    text:'ましろが「Bちゃんも入れてあげて」と声をかけると、子どもたちは少し場所を空けた。\nBちゃんはそこに座った。',
    next:'scene03-join'
  },
  {
    id:'scene03-c',sceneNo:3,sceneLabel:'場面③　自由遊び',branchOf:'scene03-choice',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.b.offerBlock,50,70,80)],
    speaker:'ナレーション',
    text:'ましろが少し様子を見ていると、Bちゃんは近くにあった使われていないブロックを手に取った。\nBちゃん「これ、使う？」\n子ども「うん」',
    next:'scene03-join'
  },
  {
    id:'scene03-d',sceneNo:3,sceneLabel:'場面③　自由遊び',branchOf:'scene03-choice',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.consultChizu,30,70,80),p(assets.characters.chizu.talkMorning,70,70,80)],
    speaker:'ちず',
    text:'Bちゃん、もう一回自分で入ろうとしてるみたいだね。今すぐ手伝うのと、もう少し待つのと、どっちがよさそうかな？',
    next:'scene03-d2'
  },
  {
    id:'scene03-d2',sceneNo:3,sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.consultChizu,30,70,80),p(assets.characters.b.waitResponse,70,70,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'すぐに手伝うだけじゃなくて、Bちゃんが自分でどうしようとしているかを見るのも大事なのかも。',
    next:'scene03-join'
  },
  {
    id:'scene03-join',sceneNo:3,sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.b.sitNearGroup,50,50,80)],
    speaker:'ナレーション',
    text:'Bちゃんはブロックを持って子どもたちのそばに座った。短いやりとりが生まれるが、完全に輪の中心に入ったわけではない。'
  },
  {
    id:'scene03-converge',sceneNo:3,sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.observeCCleanup,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'Bちゃんは、友だちと関わろうと自分なりにいろいろ試しているんだ。すぐに手伝うだけじゃなくて、Bちゃん自身がどう関わろうとしているかを見ることも大事なのかもしれない。'
  },

  {
    id:'scene04-01',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',sceneStart:true,
    sceneImage:assets.scenes.conflictSetup,stageSize:'96% auto',speaker:'ナレーション',
    text:'しばらくして。\nBちゃんは、Dちゃんが作っているブロックの近くにいた。'
  },
  {
    id:'scene04-01b',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    sceneImage:assets.scenes.conflictSetup,stageSize:'96% auto',speaker:'Bちゃん',text:'入れて'
  },
  {
    id:'scene04-01c',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    sceneImage:assets.scenes.conflictSetup,stageSize:'96% auto',speaker:'Dちゃん',text:'いま作ってるから'
  },
  {
    id:'scene04-01d',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    sceneImage:assets.scenes.conflictSetup,stageSize:'96% auto',speaker:'ナレーション',
    text:'Bちゃんはその場を離れず、近くのブロックを一つ手に取った。'
  },
  {
    id:'scene04-01e',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    sceneImage:assets.scenes.conflictSetup,stageSize:'96% auto',speaker:'Dちゃん',text:'それ使う！'
  },
  {
    id:'scene04-02',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    sceneImage:assets.scenes.conflictMoment,stageSize:'96% auto',speaker:'ナレーション',
    text:'Bちゃん「ぼくも使いたい！」\nDちゃん「だめ！」\n\n次の瞬間、BちゃんがDちゃんの腕を叩いた。Dちゃんが泣き出す。少し離れた制作コーナーでは、Cちゃんも手を止めてこちらを見ている。'
  },
  {
    id:'scene04-choice',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    sceneImage:assets.scenes.conflictMoment,stageSize:'96% auto',speaker:'選択',
    text:'あなたなら、まずどうしますか？',
    choices:[
      {id:'scene04-a',label:'Dちゃんの安全を確保しながら、Bちゃんにも落ち着いて関わる'},
      {id:'scene04-b',label:'Bちゃんにすぐ「叩いちゃだめ」と伝える'},
      {id:'scene04-c',label:'まずBちゃんに「どうしたの？」と理由を聞く'},
      {id:'scene04-d',label:'少し様子を見て、子ども同士で解決できるか待つ'}
    ]
  },
  {
    id:'scene04-a',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',branchOf:'scene04-choice',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.checkChildInjury,30,60,80),p(assets.characters.d.afterHit,45,60,80),p(assets.characters.b.afterHit,70,60,80)],
    speaker:'ナレーション',
    text:'ましろはすぐにDちゃんの安全を確認しながら、Bちゃんにも落ち着いて関わった。',
    next:'scene04-converge'
  },
  {
    id:'scene04-b',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',branchOf:'scene04-choice',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.checkChildInjury,40,60,80),p(assets.characters.b.afterHit,60,60,80)],
    speaker:'ましろ',text:'叩いちゃだめだよ。',next:'scene04-b2'
  },
  {
    id:'scene04-b2',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.d.afterHit,50,60,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'叩いちゃいけないことは伝えた。でも、Dちゃんはまだ泣いてる。まず様子を見ないと。',
    next:'scene04-converge'
  },
  {
    id:'scene04-c',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',branchOf:'scene04-choice',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.checkChildInjury,40,60,80),p(assets.characters.b.afterHit,60,60,80)],
    speaker:'ましろ',text:'どうしたの？',next:'scene04-c2'
  },
  {
    id:'scene04-c2',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.d.afterHit,50,60,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'あ、Dちゃんが泣いてる。Bちゃんの気持ちを理解することも大切だけど、先に安全を確かめないと…。',
    next:'scene04-converge'
  },
  {
    id:'scene04-d',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',branchOf:'scene04-choice',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.b.afterHit,30,60,80),p(assets.characters.d.afterHit,70,60,80)],
    speaker:'ナレーション',
    text:'ましろは一瞬様子を見る。\nDちゃんは泣き続け、Bちゃんは立ったまま。ましろはすぐに二人へ関わった。',
    next:'scene04-converge'
  },
  {
    id:'scene04-converge',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.checkChildInjury,40,60,80),p(assets.characters.d.afterHit,60,60,80)],
    speaker:'ましろ',text:'痛かったね。',next:'scene04-bshift'
  },
  {
    id:'scene04-bshift',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.checkChildInjury,40,60,80),p(assets.characters.b.afterHit,60,60,80)],
    speaker:'ナレーション',text:'Dちゃんの様子を確認してから、ましろはBちゃんの方へ向き直った。',next:'scene04-talkb'
  },
  {
    id:'scene04-talkb',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.checkChildInjury,40,60,80),p(assets.characters.b.afterHit,60,60,80)],
    speaker:'ましろ',text:'使いたかったんだね。でも、叩くと痛いよ。叩かないで伝えようね。',next:'scene04-calm'
  },
  {
    id:'scene04-calm',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.b.afterHit,30,60,80),p(assets.characters.d.calming,70,60,80)],
    speaker:'ナレーション',
    text:'少し時間がたつと、Dちゃんの泣き声は落ち着いてきた。Bちゃんも近くにいる。\nすぐに謝らせたり、無理に仲直りさせたりはしなかった。',
    next:'scene04-ask'
  },
  {
    id:'scene04-ask',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.crouchGentleTalk,40,60,80),p(assets.characters.b.afterHit,60,60,80)],
    speaker:'ましろ',text:'一緒に遊びたかったの？',next:'scene04-chizu'
  },
  {
    id:'scene04-chizu',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.consultChizu,30,70,80),p(assets.characters.chizu.talkMorning,70,70,80)],
    speaker:'ちず',
    text:'Bちゃんの気持ちは見えてきたみたいだけど、Dちゃんはどうだったかな。二人がこのあとまた一緒に過ごすことも考えると、どんな関わりができそう？',
    next:'scene04-cnote'
  },
  {
    id:'scene04-cnote',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.c.stopAndLook,20,30,50),p(assets.characters.chizu.talkMorning,70,70,80)],
    speaker:'ちず',text:'ところで、近くにいたCちゃんも、さっきから様子を見てるね。'
  },

  {
    id:'scene05-01',sceneNo:5,sceneLabel:'場面⑤　Cちゃんの片づけ',sceneStart:true,
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.c.notReadyCleanup,50,50,80)],
    speaker:'ナレーション',
    text:'それからしばらくして、自由遊びの終わりの時間になった。\n片づけの声がかかったが、Cちゃんはすぐには制作をやめず、遊びを続けている。'
  },
  {
    id:'scene05-02',sceneNo:5,sceneLabel:'場面⑤　Cちゃんの片づけ',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.observeCCleanup,30,70,80),p(assets.characters.c.pauseBeforeCleanup,70,50,80)],
    speaker:'ナレーション',text:'ましろは何度も声をかけたりはせず、少し離れて様子を見た。'
  },
  {
    id:'scene05-03',sceneNo:5,sceneLabel:'場面⑤　Cちゃんの片づけ',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.observeCCleanup,30,70,80),p(assets.characters.c.startCleanup,70,50,80)],
    speaker:'ナレーション',text:'少しして、Cちゃんは自分から道具を片づけ始めた。'
  },
  {
    id:'scene05-04',sceneNo:5,sceneLabel:'場面⑤　Cちゃんの片づけ',
    background:assets.backgrounds.classroom,bgPositionX:100,
    cast:[p(assets.characters.mashiro.observeCCleanup,30,70,80),p(assets.characters.c.afterCleanup,70,70,80)],
    speaker:'ましろ（心の声）',thought:true,text:'すぐには動かなかったけど、自分で終わりにして片づけ始めたんだ。'
  },

  {
    id:'scene06-01',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',sceneStart:true,
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ナレーション',
    text:'降園時間が近づいてきた。\nましろは、Bちゃんの保護者に今日の出来事をどう伝えるか考えていた。'
  },
  {
    id:'scene06-02',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'叩いたことはちゃんと伝えないと。でも、それだけだと足りない気がする……。'
  },
  {
    id:'scene06-03',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'まずはAIに、伝える内容を整理してもらってみようかな。'
  },
  {
    id:'scene06-privacy',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'AI入力前の確認',
    text:'AIに入力する前に、子どもが特定されにくい表現へ置き換えます。',
    ui:{type:'notice',title:'入力前の置き換え',body:'個人が特定されにくい形にするため、名前をそのまま使わず表現を置き換えます。<br><br>Bちゃん → 本人<br><br>Dちゃん → 相手の子<br><br>※実際の利用では、名前を置き換えるだけでは不十分な場合があります。<br>所属園のルールやAIサービスの情報管理方法を確認し、個人が特定できる情報や機微な情報を安易に入力しないようにしましょう。'}
  },
  {
    id:'scene06-ai',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'AI',text:'保護者への伝達文を整理します。',
    ui:{type:'ai',prompt:'4歳児クラスで、友だちと一緒に遊びたかった子どもが、ブロックをめぐるやりとりの中で相手の子の腕を叩いてしまいました。相手の子は泣きましたが、けがはなく、その後は落ち着いています。本人には、叩かずに気持ちを伝えることを話しました。本人の保護者に今日の出来事を伝える文章案を作ってください。',
      output:[['文章案','今日、遊びの中で友だちとのやりとりがうまくいかず、相手のお子さんの腕を叩いてしまう場面がありました。相手のお子さんは泣いていましたが、けがはなく、その後は落ち着いています。本人は一緒に遊びたい気持ちがあったようです。本人にも、叩かずに気持ちを伝えることについて一緒に話しました。今後も、友だちとの関わり方を一緒に支えていきたいと思います。']]}
  },
  {
    id:'scene06-after-ai',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'状況も、その後のことも整理されていて、かなり分かりやすい。'
  },
  {
    id:'scene06-choice',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'選択',text:'この文章を、このままBちゃんの保護者に伝えますか？',
    choices:[
      {id:'scene06-a',label:'この内容をもとに、そのまま伝える'},
      {id:'scene06-b',label:'今日のBちゃんの普段の姿や、友だちと関わろうとしていた様子も少し加える'},
      {id:'scene06-c',label:'叩いたという事実が伝わるよう、もっとはっきりした表現に直す'},
      {id:'scene06-d',label:'ちずに、どこまでどう伝えるか相談する'}
    ]
  },
  {
    id:'scene06-a',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',branchOf:'scene06-choice',
    background:assets.backgrounds.pickup,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,text:'このままでも、必要なことは伝わりそう。',next:'scene06-parent'
  },
  {
    id:'scene06-b',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',branchOf:'scene06-choice',
    background:assets.backgrounds.pickup,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,text:'今日、友だちと関わろうとしていた姿も少し加えよう。ただ、言い訳みたいにならないようにしたいな。',next:'scene06-parent'
  },
  {
    id:'scene06-c',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',branchOf:'scene06-choice',
    background:assets.backgrounds.pickup,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,text:'「腕を叩いてしまった」という事実は曖昧にしない方がいい。でも、それだけでも足りないか……。',next:'scene06-parent'
  },
  {
    id:'scene06-d',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',branchOf:'scene06-choice',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.consultChizu,30,70,80),p(assets.characters.chizu.talkMorning,70,70,80)],
    speaker:'ちず',text:'内容はよく整理されてるね。じゃあ、Bちゃんのおうちの人に、今日のBちゃんをどんなふうに知って帰ってもらいたい？',next:'scene06-d2'
  },
  {
    id:'scene06-d2',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.consultChizu,30,70,80),p(assets.characters.chizu.listenMorning,70,70,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'叩いたことはきちんと伝えつつ、今日Bちゃんが友だちと関わろうとしていたことも伝えたい。',
    next:'scene06-parent'
  },
  {
    id:'scene06-parent',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.listenParentB,30,70,80),p(assets.characters.parentB.listening,70,70,80)],
    speaker:'ナレーション',text:'Bちゃんの保護者が迎えに来た。'
  },
  {
    id:'scene06-parent2',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.talkParentB,30,70,80),p(assets.characters.parentB.listening,70,70,80)],
    speaker:'ましろ',text:'今日、ブロック遊びの中で、Bちゃんが相手の子の腕を叩いてしまう場面がありました。'
  },
  {
    id:'scene06-parent3',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.talkParentB,30,70,80),p(assets.characters.parentB.listening,70,70,80)],
    speaker:'ましろ',text:'相手の子は泣きましたが、けがはなく、その後は落ち着いています。'
  },
  {
    id:'scene06-parent4',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.talkParentB,30,70,80),p(assets.characters.parentB.listening,70,70,80)],
    speaker:'ましろ',text:'Bちゃんは今日、友だちと一緒に遊ぼうと何度か関わろうとしていました。その中でうまくいかず、叩いてしまったようでした。'
  },
  {
    id:'scene06-parent5',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.talkParentB,30,70,80),p(assets.characters.parentB.listening,70,70,80)],
    speaker:'ましろ',text:'Bちゃんとは、叩かずに気持ちを伝えることについて一緒に話しました。'
  },
  {
    id:'scene06-parent6',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.listenParentB,30,70,80),p(assets.characters.parentB.talking,70,70,80)],
    speaker:'Bちゃんの保護者',text:'そうだったんですね……。最近、家でも思いどおりにならないと怒ることがあって……。'
  },
  {
    id:'scene06-parent7',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.listenParentB,30,70,80),p(assets.characters.parentB.thinking,70,70,80)],
    speaker:'ナレーション',text:'ましろは、すぐに助言を始めず、保護者の話を聞いた。'
  },
  {
    id:'scene06-reflect',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'家ではそうなんだ……。AIで伝えることは整理できたけど、実際に話してみないと分からないこともあるんだな。'
  },
  {
    id:'scene06-chizu',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,
    cast:[p(assets.characters.mashiro.consultChizu,30,70,80),p(assets.characters.chizu.talkMorning,70,70,80)],
    speaker:'ちず',text:'Dちゃんのおうちにも、今日のことは私から伝えておくね。Bちゃんのおうちと同じ説明をすればいいわけではないから。'
  },
  {
    id:'scene06-end',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',
    background:assets.backgrounds.pickup,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,text:'同じ出来事でも、相手によって伝えることや伝え方が変わるんだ。'
  },

  {
    id:'scene07-01',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',sceneStart:true,
    background:assets.backgrounds.recordEvening,bgm:assets.audio.bgmEvening,
    cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ナレーション',text:'子どもたちが帰ったあと。\nましろは一日の記録をまとめていた。'
  },
  {
    id:'scene07-records',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'今日の記録',text:'Aちゃん・Bちゃん・Cちゃんの今日の様子を確認します。',
    ui:{type:'records',scrollHint:'↓ 記録は下まで続きます',items:[
      ['Aちゃん・今日の記録','• 登園時は保護者の服をつかみ、不安そうな様子があった。\n• ましろの近くで過ごすうちに周囲へ目を向け、ままごとに入り始めた。\n• 午後は保育者から少し離れた場所でも遊んでいた。'],
      ['Bちゃん・今日の記録','• 友だちと関わろうとして、何度か自分から近づいた。\n• ブロックをめぐるやりとりの中でDちゃんの腕を叩いた。\n• その後、叩かずに気持ちを伝えることについて話した。\n• 保護者から、家でも思いどおりにならないと怒ることがあると聞いた。'],
      ['Cちゃん・今日の記録','• 好きな制作に長く集中していた。\n• BちゃんとDちゃんのやりとりのとき、一度手を止めて様子を見ていた。\n• 片づけの時間にはすぐには動かなかったが、少し待つと自分から区切りをつけて片づけ始めた。']
    ]}
  },
  {
    id:'scene07-02',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'今日もいろいろあったな……。明日に向けて見ておきたいことも、AIで整理しておこう。'
  },
  {
    id:'scene07-privacy',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'AI入力前の確認',text:'AIに入力する前に、子どもが特定されにくい表現へ置き換えます。',
    ui:{type:'notice',title:'入力前の置き換え',body:'個人が特定されにくい形にするため、名前をそのまま使わず表現を置き換えます。<br><br>Aちゃん → 子どもA<br><br>Bちゃん → 子どもB<br><br>Cちゃん → 子どもC<br><br>Dちゃん → 相手の子<br><br>※実際の利用では、名前を置き換えるだけでは不十分な場合があります。<br>所属園のルールやAIサービスの情報管理方法を確認し、個人が特定できる情報や機微な情報を安易に入力しないようにしましょう。'}
  },
  {
    id:'scene07-ai',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'AI',text:'明日の保育に向けて整理します。',
    ui:{type:'ai',prompt:'今日の3人の様子を、明日の保育に向けて職員同士で共有しやすいように整理してください。①今日見られた姿 ②明日も見ておきたいこと の2点に分けてください。',
      output:[
        ['Aちゃん','① 今日見られた姿\n登園時は不安そうだったが、保育者の近くで過ごすうちに周囲へ目を向け、遊びに向かった。\n\n② 明日も見ておきたいこと\n登園時の不安の程度と、安心したあとに自分から遊びへ向かう様子。'],
        ['Bちゃん','① 今日見られた姿\n友だちと関わろうと何度か試みた。やりとりがうまくいかない中で相手を叩く場面があった。\n\n② 明日も見ておきたいこと\n友だちへの入り方や、思いどおりにならないときにどのように気持ちを表すか。'],
        ['Cちゃん','① 今日見られた姿\n好きな制作に集中していた。片づけでは少し時間がかかったが、自分から遊びを終えて片づけ始めた。\n\n② 明日も見ておきたいこと\n切り替えに必要な時間と、自分から動き出せるきっかけ。']
      ]}
  },
  {
    id:'scene07-after-ai',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reviewRecords,50,70,80)],
    speaker:'ましろ（心の声）',thought:true,
    text:'今日あったことを並べるだけじゃなくて、明日どこを見ればいいかまで整理してくれてる。朝と同じで、これはかなり助かるな。'
  },
  {
    id:'scene07-talk01',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'まとまった？'
  },
  {
    id:'scene07-talk02',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ましろ',text:'はい。AIにも整理してもらって、明日見ることまでまとめました。'
  },
  {
    id:'scene07-a1',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'Aちゃん、朝はかなり不安そうだったけど、午後は保育者から離れて遊べてたね。'
  },
  {
    id:'scene07-a2',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ましろ',text:'朝、近くで少し一緒に過ごしたのがよかったのかなと思います。'
  },
  {
    id:'scene07-a3',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'そうかもしれないね。ただ、明日はまた違うかもしれない。今日うまくいった関わりを覚えておきながら、明日のAちゃんを見たいね。'
  },
  {
    id:'scene07-b1',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'Bちゃんは、今日どの場面が一番印象に残った？'
  },
  {
    id:'scene07-b2',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ましろ',text:'Dちゃんを叩いてしまった場面です。'
  },
  {
    id:'scene07-b3',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'そうだよね。でも、その前の自由遊びではどうだった？'
  },
  {
    id:'scene07-b4',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ましろ',text:'何度も友だちと関わろうとしていました。'
  },
  {
    id:'scene07-b5',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'そう。叩いた場面だけを見るのと、一日を通して見るのでは、Bちゃんの見え方も少し変わるよね。'
  },
  {
    id:'scene07-c1',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'Cちゃん、今日は自分から片づけ始めた瞬間があったね。'
  },
  {
    id:'scene07-c2',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ましろ',text:'すぐには切り替わらなかったけど、少し待ったら自分で片づけ始めていました。'
  },
  {
    id:'scene07-c3',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'「片づけに時間がかかった」だけで終わると、Cちゃんが自分で切り替えたところが見えなくなるね。'
  },
  {
    id:'scene07-c4',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ましろ',text:'自分で切り替えられたところまで見ることが大事なんですね。'
  },
  {
    id:'scene07-final1',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'今日はAIにもけっこう助けてもらったね。'
  },
  {
    id:'scene07-final2',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ましろ',text:'はい。記録の整理も、文章を考えるのもかなり便利でした。'
  },
  {
    id:'scene07-final3',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'じゃあ、今日一日で、ましろ自身は保育者として何をしてたと思う？'
  },
  {
    id:'scene07-final4',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ナレーション',text:'Aちゃんのそばにいた場面。',
    memoryImage:assets.scenes.memory01,next:'scene07-memory2'
  },
  {
    id:'scene07-memory2',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ナレーション',text:'Bちゃんが友だちに入ろうとする姿を見ていた場面。',
    memoryImage:assets.scenes.memory02,next:'scene07-memory3'
  },
  {
    id:'scene07-memory3',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ナレーション',text:'BちゃんとDちゃんの間に入った場面。',
    memoryImage:assets.scenes.memory03,next:'scene07-memory4'
  },
  {
    id:'scene07-memory4',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ナレーション',text:'Cちゃんが自分から片づけ始めるまで待った場面。',
    memoryImage:assets.scenes.memory04,next:'scene07-memory5'
  },
  {
    id:'scene07-memory5',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ナレーション',text:'Bちゃんの保護者と話した場面。',
    memoryImage:assets.scenes.memory05,next:'scene07-final5'
  },
  {
    id:'scene07-final5',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.listenEvening,70,70,80)],
    speaker:'ましろ',text:'……ずっと、子どもたちを見て、関わってたんだと思います。'
  },
  {
    id:'scene07-final6',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',
    background:assets.backgrounds.recordEvening,
    cast:[p(assets.characters.mashiro.reflectEvening,30,70,80),p(assets.characters.chizu.talkEvening,70,70,80)],
    speaker:'ちず',text:'AIにできることは、これからもっと増えていくと思う。でも、目の前の子どもと実際に関わりながら、その子に合わせて考えるのは、私たちの大事な仕事だと思うよ。'
  },

  {
    id:'ending-01',sceneNo:'END',sceneLabel:'エンディング',sceneStart:true,
    background:assets.backgrounds.endingClassroomSoft,
    cast:[p(assets.characters.mashiro.endingFront,50,72,52)],
    speaker:'ナレーション',
    text:'一日おつかれさまでした。\n最後に、今日の体験を少し振り返ってみましょう。'
  },
  {
    id:'ending-02',sceneNo:'END',sceneLabel:'エンディング',
    background:assets.backgrounds.endingClassroomSoft,
    cast:[p(assets.characters.mashiro.endingFront,50,72,52)],
    speaker:'振り返り',
    text:'今日、AIはどんな場面で役立っていましたか？',
    ui:{type:'multiReflect',group:'aiUseful',items:[
      '朝、昨日の記録から「今日見るポイント」を整理した',
      '保護者に伝える内容を文章として整理した',
      '一日の記録から「明日見るポイント」を整理した'
    ]}
  },
  {
    id:'ending-03',sceneNo:'END',sceneLabel:'エンディング',
    background:assets.backgrounds.endingClassroomSoft,
    cast:[p(assets.characters.mashiro.endingFront,50,72,52)],
    speaker:'振り返り',
    text:'一方で、AIで整理するだけでは終わらなかったのは、どんな場面だったでしょうか。',
    ui:{type:'multiReflect',group:'humanWork',items:[
      '不安そうなAちゃんに、その場でどう関わるか考えたとき',
      'Bちゃんが友だちの遊びに入ろうとしている姿を見守ったとき',
      'BちゃんとDちゃんのトラブルに対応したとき',
      'Cちゃんが自分から片づけ始めるまで様子を見たとき',
      'Bちゃんの保護者と実際に話したとき',
      'ちずと一日の様子を振り返ったとき'
    ]}
  },
  {
    id:'ending-04',sceneNo:'END',sceneLabel:'エンディング　もう一つの見方',
    background:assets.backgrounds.endingClassroomSoft,
    cast:[p(assets.characters.mashiro.endingFront,50,72,52)],
    speaker:'もし、別の関わり方をしていたら？',
    text:'今日あなたが選んだ場面から、別の見方をいくつか振り返ります。',
    ui:{type:'otherViews'}
  },
  {
    id:'ending-choice',sceneNo:'END',sceneLabel:'エンディング　最後の選択',
    background:assets.backgrounds.endingClassroomSoft,
    cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'最後の選択',
    text:'今日の体験を終えて、保育者として大切にしたいと思ったものを一つ選んでください。',
    choices:[
      {id:'ending-observe',label:'子どもをよく見ること'},
      {id:'ending-direct',label:'子どもと直接関わること'},
      {id:'ending-wait',label:'すぐに助けるか、少し待つかを考えること'},
      {id:'ending-perspectives',label:'複数の立場から考えること'},
      {id:'ending-talk',label:'周囲の保育者や保護者と話すこと'},
      {id:'ending-ai',label:'AIに任せることと、自分たちで担うことを考えること'}
    ]
  },
  {
    id:'ending-observe',sceneNo:'END',sceneLabel:'エンディング',branchOf:'ending-choice',
    background:assets.backgrounds.endingClassroomSoft,cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'今日の振り返り',
    text:'あなたが選んだこと：子どもをよく見ること',
    ui:{type:'comment',text:'Aちゃんが少しずつ周囲を見るようになったこと。Bちゃんが何度も友だちに関わろうとしていたこと。Cちゃんが自分から片づけ始めたこと。今日の一日は、「見ること」で初めて分かったことがたくさんありました。'},
    next:'ending-ai-try-intro'
  },
  {
    id:'ending-direct',sceneNo:'END',sceneLabel:'エンディング',branchOf:'ending-choice',
    background:assets.backgrounds.endingClassroomSoft,cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'今日の振り返り',
    text:'あなたが選んだこと：子どもと直接関わること',
    ui:{type:'comment',text:'ましろは、Aちゃんのそばにいて、BちゃんとDちゃんの間に入り、保護者とも直接話しました。実際に関わったからこそ見えた反応や言葉がありました。'},
    next:'ending-ai-try-intro'
  },
  {
    id:'ending-wait',sceneNo:'END',sceneLabel:'エンディング',branchOf:'ending-choice',
    background:assets.backgrounds.endingClassroomSoft,cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'今日の振り返り',
    text:'あなたが選んだこと：すぐに助けるか、少し待つかを考えること',
    ui:{type:'comment',text:'すぐに助けることが必要な場面もあれば、Cちゃんのように少し待つことで本人の力が見える場面もありました。「いつ動くか」も保育の大切な判断です。'},
    next:'ending-ai-try-intro'
  },
  {
    id:'ending-perspectives',sceneNo:'END',sceneLabel:'エンディング',branchOf:'ending-choice',
    background:assets.backgrounds.endingClassroomSoft,cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'今日の振り返り',
    text:'あなたが選んだこと：複数の立場から考えること',
    ui:{type:'comment',text:'Bちゃんの気持ちだけでなく、Dちゃんの痛み、その様子を見ていたCちゃん、保護者の受け止め方もありました。一つの出来事にも、いくつもの立場があります。'},
    next:'ending-ai-try-intro'
  },
  {
    id:'ending-talk',sceneNo:'END',sceneLabel:'エンディング',branchOf:'ending-choice',
    background:assets.backgrounds.endingClassroomSoft,cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'今日の振り返り',
    text:'あなたが選んだこと：周囲の保育者や保護者と話すこと',
    ui:{type:'comment',text:'ちずとのやりとりや保護者との会話から、記録だけでは見えなかったことが広がりました。保育は、一人だけで完結する仕事ではありません。'},
    next:'ending-ai-try-intro'
  },
  {
    id:'ending-ai',sceneNo:'END',sceneLabel:'エンディング',branchOf:'ending-choice',
    background:assets.backgrounds.endingClassroomSoft,cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'今日の振り返り',
    text:'あなたが選んだこと：AIに任せることと、自分たちで担うことを考えること',
    ui:{type:'comment',text:'AIは記録や文章の整理を助けてくれました。一方で、子どもの反応を見て動くことや、相手とのやりとりの中で考えることは、その場で続いていきます。'},
    next:'ending-ai-try-intro'
  },
    {
    id:'ending-ai-try-intro',sceneNo:'END',sceneLabel:'発展体験',
    background:assets.backgrounds.endingClassroomSoft,
    cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'ましろ',
    text:'ここからは任意です。\nゲーム内では固定されたAI回答を使ってきましたが、実際の生成AIでは回答が変わります。\n興味があれば、あなたが普段使っている生成AIで試してみてください。\n試さなくても、そのまま「次へ」で進めます。',
    next:'ending-ai-try-01'
  },
  {
    id:'ending-ai-try-01',sceneNo:'END',sceneLabel:'発展体験①　子どもの見方を広げる',
    background:assets.backgrounds.endingClassroomSoft,
    cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'生成AIを試してみる',
    text:'用途：子どもの行動を、一つの見方に決めつけずに考える',
    ui:{type:'aiTry',prompt:'4歳児が友だちの遊びに入りたい様子を見せていますが、うまく入れず、同じような場面が何度かあります。この子の行動について、性格だけで決めつけず、考えられる背景を3つ挙げてください。また、保育者が観察するとよいポイントも挙げてください。',points:['「性格」で決めつけず、複数の可能性を出してもらう','原因を断定するのではなく、「観察するとよいポイント」まで求める'],reflection:['ゲーム内のAI回答と違うところはありましたか？','その回答を、そのまま保育で使えそうですか？']},
    next:'ending-ai-try-02'
  },
  {
    id:'ending-ai-try-02',sceneNo:'END',sceneLabel:'発展体験②　保護者への伝え方を考える',
    background:assets.backgrounds.endingClassroomSoft,
    cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'生成AIを試してみる',
    text:'用途：出来事の事実と、その子の一日の姿の両方が伝わる話し方を考える',
    ui:{type:'aiTry',prompt:'4歳児クラスで、友だちと一緒に遊びたかった子どもが、やりとりの中で相手の子の腕を叩いてしまいました。相手の子にけがはなく、その後は落ち着いています。本人は、その前から友だちと関わろうとしていました。本人の保護者に、事実を曖昧にせず、本人の一日の姿も伝わるような話し方の例を作ってください。',points:['「叩いた」という事実を曖昧にしない','同時に、その子が友だちと関わろうとしていた姿も条件に入れる'],reflection:['どんな情報が加わると、より伝えやすくなりそうですか？','AIの文章をそのまま使うより、自分で直したい部分はありますか？']},
    next:'ending-ai-try-03'
  },
  {
    id:'ending-ai-try-03',sceneNo:'END',sceneLabel:'発展体験③　明日の保育につなげる',
    background:assets.backgrounds.endingClassroomSoft,
    cast:[p(assets.characters.mashiro.endingSoftSmile,50,72,52)],
    speaker:'生成AIを試してみる',
    text:'用途：今日の記録を、明日の観察や関わりにつなげる',
    ui:{type:'aiTry',prompt:'今日、ある子どもについて次の姿がありました。友だちと関わろうと何度か試していた。うまくいかない場面では相手を叩いてしまった。その後、保育者と一緒に気持ちの伝え方を確認した。この情報から、①今日見られた姿 ②明日観察したいこと ③保育者が試せそうな関わり をそれぞれ整理してください。',points:['今日の要約だけで終わらず、「明日観察したいこと」まで求める','具体的に試せそうな関わりも出してもらい、現場で使えるか自分で判断する'],reflection:['AIが出した「明日観察したいこと」は、実際に見てみたい内容でしたか？','提案された関わりの中で、そのまま使わず考え直したいものはありましたか？']},
    next:'ending-end'
  },
{
    id:'ending-end',
    sceneNo:'END',
    sceneLabel:'',
    bgm:null,
    background:assets.backgrounds.exteriorEvening,
    specialScreen:'ending'
  }
];

export const sceneIndex = Object.fromEntries(scenes.map((s,i)=>[s.id,i]));
