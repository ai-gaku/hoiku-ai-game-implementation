import { assets } from './assets.js';

const p = (asset, x, y=100, w=36, anchor='bottom') => ({ asset, x, y, w, anchor });

const records = [
  ['Aちゃん', '昨日は登園後、しばらく保育者のそばで過ごしていた。午前中はあまり遊びに入らなかったが、午後は好きなままごとを楽しんでいた。保護者からは、最近、登園時に保護者と離れるのを嫌がることがあると話があった。'],
  ['Bちゃん', 'ブロック遊びで友だちの近くに行く姿が何度かあった。一緒に遊びたそうだったが、うまく声をかけられず、そのまま離れることもあった。外遊びでは友だちと追いかけっこを楽しんでいた。'],
  ['Cちゃん', '好きな制作には長く集中していた。一方、片づけの時間になってもしばらく遊びを続けていた。保育者が急かさず少し待つと、自分から遊びを終えて片づけ始める姿があった。'],
];

export const scenes = [
  {
    id:'scene01-01', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning, bgm:assets.audio.bgmMorning,
    cast:[p(assets.characters.mashiro.checkRecords,50,80,80)], speaker:'ナレーション',
    text:'出勤して、子どもたちが登園してくる前。\nましろは昨日の記録を確認していた。'
  },
  {
    id:'scene01-02', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning, cast:[p(assets.characters.mashiro.checkRecords,50,80,80)],
    speaker:'ましろ（心の声）', thought:true,
    text:'情報が多い……。頭に入らないな。登園まであまり時間がないのに……。',
    ui:{type:'records', items:records, scrollHint:'↓ 記録は下まで続きます'}
  },
  {
    id:'scene01-03', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning, cast:[p(assets.characters.mashiro.reviewRecords,50,80,80)],
    speaker:'ましろ（心の声）', thought:true,
    text:'これ、AIでもう少し分かりやすく整理できるかな……？'
  },
  {
    id:'scene01-04', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning, cast:[p(assets.characters.mashiro.reviewRecords,50,80,80)],
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
    cast:[p(assets.characters.mashiro.talkChizuMorning,30,80,80),p(assets.characters.chizu.talkMorning,70,80,80)],
    speaker:'ナレーション',
    text:'そこへ、先輩保育者のちず先生がやってきました。'
  },
  {
    id:'scene01-06', sceneNo:1, sceneLabel:'場面①　朝・記録整理',
    background:assets.backgrounds.recordMorning,
    cast:[p(assets.characters.mashiro.talkChizuMorning,30,80,80),p(assets.characters.chizu.talkMorning,70,80,80)],
    speaker:'ちず',
    text:'こうやって“今日見るポイント”まで整理してもらえると助かるよね。ただ、昨日と今日が同じとは限らないから、今日の様子をちゃんと見て動いていこう。'
  },
  {
    id:'scene02-01', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園', sceneStart:true, bgm:null,
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,22,100,34),p(assets.characters.a.holdParent,55,100,28),p(assets.characters.parentA.worried,78,100,34)],
    speaker:'ナレーション', text:'登園時間。Aちゃんが保護者と一緒にやってきた。\nAちゃんは保護者の服をつかみ、少し緊張した表情をしている。'
  },
  {
    id:'scene02-02', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,22,100,34),p(assets.characters.a.holdParent,55,100,28),p(assets.characters.parentA.explain,78,100,34)],
    speaker:'Aちゃんの保護者', text:'今朝もなかなか家を出たがらなくて。昨日も寝るのが少し遅かったんです。'
  },
  {
    id:'scene02-choice', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,22,100,34),p(assets.characters.a.holdLooking,55,100,28),p(assets.characters.parentA.worried,78,100,34)],
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
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,22,100,34),p(assets.characters.a.holdParent,55,100,28),p(assets.characters.parentA.worried,78,100,34)],
    speaker:'ましろ（心の声）', thought:true, text:'安心してもらおうと思ったけど、今はまだ声をかけるタイミングじゃなかったのかな……。', next:'scene02-converge'
  },
  {
    id:'scene02-b', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園', branchOf:'scene02-choice',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,22,100,34),p(assets.characters.a.holdParent,55,100,28),p(assets.characters.parentA.explain,78,100,34)],
    speaker:'ましろ（心の声）', thought:true, text:'家での様子は分かった。でも、Aちゃん自身の今の様子もちゃんと見ないとな。', next:'scene02-converge'
  },
  {
    id:'scene02-c', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園', branchOf:'scene02-choice',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,22,100,34),p(assets.characters.a.interestPlay,55,100,28),p(assets.characters.parentA.worried,78,100,34)],
    speaker:'ましろ（心の声）', thought:true, text:'遊びには少し目を向けた。でも、まだおうちの人から離れる準備はできていないのかも。', next:'scene02-converge'
  },
  {
    id:'scene02-d', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園', branchOf:'scene02-choice',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.consultChizu,20,100,32),p(assets.characters.chizu.listenMorning,42,100,32),p(assets.characters.a.holdLooking,65,100,26)],
    speaker:'ちず', text:'今のAちゃん、どんな様子に見える？', next:'scene02-d2'
  },
  {
    id:'scene02-d2', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.consultChizu,20,100,32),p(assets.characters.chizu.talkMorning,42,100,32),p(assets.characters.a.holdLooking,65,100,26)],
    speaker:'ましろ', text:'まだおうちの人から離れたくなさそうです。でも、少し周りを見る余裕はあるようにも見えます。', next:'scene02-d3'
  },
  {
    id:'scene02-d3', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.consultChizu,20,100,32),p(assets.characters.chizu.talkMorning,42,100,32),p(assets.characters.a.holdLooking,65,100,26)],
    speaker:'ちず', text:'そうだね。じゃあ、今は“どう離すか”より、“どうしたら安心してここにいられるか”を考えてみようか。', next:'scene02-converge'
  },
  {
    id:'scene02-converge', sceneNo:2, sceneLabel:'場面②　Aちゃんの登園',
    background:assets.backgrounds.arrival, cast:[p(assets.characters.mashiro.crouchGentleTalk,28,100,34),p(assets.characters.a.releaseParent,58,100,28),p(assets.characters.parentA.relieved,80,100,34)],
    speaker:'ナレーション', text:'しばらく、ましろはAちゃんの近くで、無理に話しかけすぎずに過ごした。\nAちゃんは少しずつ周囲を見るようになり、やがて保護者の服から手を離した。'
  },
  {
    id:'scene03-01', sceneNo:3, sceneLabel:'場面③　自由遊び', sceneStart:true,
    sceneImage:assets.scenes.freeplayOverview, speaker:'ナレーション',
    text:'自由遊びの時間。Aちゃんはままごと、Cちゃんは制作を楽しんでいる。\nBちゃんは、ブロックで遊んでいる子どもたちの近くへ向かった。'
  },
  {
    id:'scene03-02', sceneNo:3, sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom, cast:[p(assets.characters.b.sayJoin,48,100,34)],
    speaker:'Bちゃん', text:'入れて'
  },
  {
    id:'scene03-03', sceneNo:3, sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom, cast:[p(assets.characters.b.waitResponse,48,100,34)],
    speaker:'ナレーション', text:'子どもたちは遊びに夢中で、すぐには反応しない。\nBちゃんはもう一度声をかけるが、うまく輪に入れない。'
  },
  {
    id:'scene03-choice', sceneNo:3, sceneLabel:'場面③　自由遊び',
    background:assets.backgrounds.classroom, cast:[p(assets.characters.b.waitResponse,58,100,32),p(assets.characters.mashiro.consultChizu,22,100,32)],
    speaker:'選択', text:'あなたなら、どう関わりますか？',
    choices:[
      {id:'scene03-a',label:'「もう一回、“入れて”って言ってみようか」と声をかける'},
      {id:'scene03-b',label:'遊んでいる子どもたちに「Bちゃんも入れてあげて」と声をかける'},
      {id:'scene03-c',label:'すぐには介入せず、Bちゃんが次にどうしようとするか見る'},
      {id:'scene03-d',label:'ちずに、今どう関わるか相談する'},
    ]
  },
  {id:'scene03-a',sceneNo:3,sceneLabel:'場面③　自由遊び',branchOf:'scene03-choice',background:assets.backgrounds.classroom,cast:[p(assets.characters.b.waitResponse,55,100,34)],speaker:'ナレーション',text:'ましろが声をかけると、Bちゃんは少し間を置いて子どもたちを見た。',next:'scene03-converge'},
  {id:'scene03-b',sceneNo:3,sceneLabel:'場面③　自由遊び',branchOf:'scene03-choice',background:assets.backgrounds.classroom,cast:[p(assets.characters.b.sitNearGroup,55,100,34)],speaker:'ナレーション',text:'子どもたちは少し場所を空け、Bちゃんはそのそばに座った。',next:'scene03-converge'},
  {id:'scene03-c',sceneNo:3,sceneLabel:'場面③　自由遊び',branchOf:'scene03-choice',background:assets.backgrounds.classroom,cast:[p(assets.characters.b.offerBlock,55,100,34)],speaker:'ナレーション',text:'少し待っていると、Bちゃんは近くのブロックを手に取り、「これ、使う？」と声をかけた。',next:'scene03-converge'},
  {id:'scene03-d',sceneNo:3,sceneLabel:'場面③　自由遊び',branchOf:'scene03-choice',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.consultChizu,25,100,32),p(assets.characters.chizu.talkMorning,50,100,32),p(assets.characters.b.waitResponse,76,100,28)],speaker:'ちず',text:'Bちゃん、もう一回自分で入ろうとしてるみたいだね。今すぐ手伝うのと、もう少し待つのと、どっちがよさそうかな？',next:'scene03-d2'},
  {id:'scene03-d2',sceneNo:3,sceneLabel:'場面③　自由遊び',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.consultChizu,25,100,32),p(assets.characters.b.waitResponse,65,100,30)],speaker:'ましろ（心の声）',thought:true,text:'すぐに手伝うだけじゃなくて、Bちゃんが自分でどうしようとしているかを見るのも大事なのかも。',next:'scene03-converge'},
  {id:'scene03-converge',sceneNo:3,sceneLabel:'場面③　自由遊び',background:assets.backgrounds.classroom,cast:[p(assets.characters.b.sitNearGroup,55,100,34)],speaker:'ましろ（心の声）',thought:true,text:'Bちゃんは、友だちと関わろうと自分なりにいろいろ試しているんだ。すぐに手伝うだけじゃなくて、Bちゃん自身がどう関わろうとしているかを見ることも大事なのかもしれない。'},

  {id:'scene04-01',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',sceneStart:true,sceneImage:assets.scenes.conflictSetup,speaker:'ナレーション',text:'しばらくして。Bちゃんは、Dちゃんが作っているブロックの近くにいた。'},
  {id:'scene04-02',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',sceneImage:assets.scenes.conflictMoment,speaker:'ナレーション',text:'ブロックをめぐるやりとりの中で、BちゃんがDちゃんの腕を叩いた。\nDちゃんが泣き出し、近くにいたCちゃんも手を止めて様子を見ている。'},
  {id:'scene04-choice',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',sceneImage:assets.scenes.conflictMoment,speaker:'選択',text:'あなたなら、まずどうしますか？',choices:[
      {id:'scene04-a',label:'Dちゃんの安全を確保しながら、Bちゃんにも落ち着いて関わる'},
      {id:'scene04-b',label:'Bちゃんにすぐ「叩いちゃだめ」と伝える'},
      {id:'scene04-c',label:'まずBちゃんに「どうしたの？」と理由を聞く'},
      {id:'scene04-d',label:'少し様子を見て、子ども同士で解決できるか待つ'}]},
  {id:'scene04-a',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',branchOf:'scene04-choice',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.checkChildInjury,25,100,36),p(assets.characters.b.afterHit,58,100,28),p(assets.characters.d.afterHit,78,100,28)],speaker:'ナレーション',text:'ましろはすぐにDちゃんの安全を確認しながら、Bちゃんにも落ち着いて関わった。',next:'scene04-converge'},
  {id:'scene04-b',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',branchOf:'scene04-choice',sceneImage:assets.scenes.conflictMoment,speaker:'ましろ',text:'叩いちゃだめだよ。',next:'scene04-b2'},
  {id:'scene04-b2',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.checkChildInjury,25,100,36),p(assets.characters.b.afterHit,58,100,28),p(assets.characters.d.afterHit,78,100,28)],speaker:'ましろ（心の声）',thought:true,text:'叩いちゃいけないことは伝えた。でも、Dちゃんはまだ泣いてる。まず様子を見ないと。',next:'scene04-converge'},
  {id:'scene04-c',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',branchOf:'scene04-choice',sceneImage:assets.scenes.conflictMoment,speaker:'ましろ',text:'どうしたの？',next:'scene04-c2'},
  {id:'scene04-c2',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.checkChildInjury,25,100,36),p(assets.characters.b.afterHit,58,100,28),p(assets.characters.d.afterHit,78,100,28)],speaker:'ましろ（心の声）',thought:true,text:'Bちゃんの気持ちは分かった。でも、Dちゃんはまだ泣いてる。先に安全を確かめないと。',next:'scene04-converge'},
  {id:'scene04-d',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',branchOf:'scene04-choice',sceneImage:assets.scenes.conflictMoment,speaker:'ナレーション',text:'一瞬様子を見るが、Dちゃんは泣き続け、Bちゃんは立ったまま。ましろはすぐに関わった。',next:'scene04-converge'},
  {id:'scene04-converge',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.checkChildInjury,28,100,36),p(assets.characters.d.afterHit,68,100,28)],speaker:'ましろ',text:'痛かったね。',next:'scene04-bshift'},
  {id:'scene04-bshift',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.checkChildInjury,28,100,36),p(assets.characters.b.listenTeacher,67,100,28)],speaker:'ナレーション',text:'Dちゃんの様子を確認してから、ましろはBちゃんの方へ向き直った。',next:'scene04-talkb'},
  {id:'scene04-talkb',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.checkChildInjury,28,100,36),p(assets.characters.b.listenTeacher,67,100,28)],speaker:'ましろ',text:'使いたかったんだね。でも、叩くと痛いよ。叩かないで伝えようね。',next:'scene04-calm'},
  {id:'scene04-calm',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',background:assets.backgrounds.classroom,cast:[p(assets.characters.b.afterHit,44,100,28),p(assets.characters.d.calming,70,100,28)],speaker:'ナレーション',text:'少し時間がたつと、Dちゃんの泣き声は落ち着いてきた。Bちゃんも近くにいる。',next:'scene04-ask'},
  {id:'scene04-ask',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.crouchGentleTalk,28,100,34),p(assets.characters.b.listenTeacher,65,100,28)],speaker:'ましろ',text:'一緒に遊びたかったの？',next:'scene04-chizu'},
  {id:'scene04-chizu',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.consultChizu,22,100,32),p(assets.characters.chizu.talkMorning,47,100,32),p(assets.characters.b.listenTeacher,72,100,27)],speaker:'ちず',text:'Bちゃんの気持ちは見えてきたみたいだけど、Dちゃんはどうだったかな。二人がこのあとまた一緒に過ごすことも考えると、どんな関わりができそう？',next:'scene04-cnote'},
  {id:'scene04-cnote',sceneNo:4,sceneLabel:'場面④　BちゃんとDちゃんのトラブル',background:assets.backgrounds.classroom,cast:[p(assets.characters.chizu.talkMorning,28,100,32),p(assets.characters.c.stopAndLook,68,100,30)],speaker:'ちず',text:'ところで、近くにいたCちゃんも、さっきから様子を見てるね。'},

  {id:'scene05-01',sceneNo:5,sceneLabel:'場面⑤　Cちゃんの片づけ',sceneStart:true,background:assets.backgrounds.classroom,cast:[p(assets.characters.c.notReadyCleanup,58,100,32)],speaker:'ナレーション',text:'それからしばらくして、自由遊びの終わりの時間になった。\n片づけの声がかかったが、Cちゃんはすぐには制作をやめず、手元を整えている。'},
  {id:'scene05-02',sceneNo:5,sceneLabel:'場面⑤　Cちゃんの片づけ',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.observeCCleanup,25,100,34),p(assets.characters.c.pauseBeforeCleanup,65,100,30)],speaker:'ナレーション',text:'ましろは何度も声をかけず、少し離れて様子を見た。'},
  {id:'scene05-03',sceneNo:5,sceneLabel:'場面⑤　Cちゃんの片づけ',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.observeCCleanup,25,100,34),p(assets.characters.c.startCleanup,65,100,30)],speaker:'ナレーション',text:'少しして、Cちゃんは自分から道具を片づけ始めた。'},
  {id:'scene05-04',sceneNo:5,sceneLabel:'場面⑤　Cちゃんの片づけ',background:assets.backgrounds.classroom,cast:[p(assets.characters.mashiro.observeCCleanup,25,100,34),p(assets.characters.c.afterCleanup,65,100,30)],speaker:'ましろ（心の声）',thought:true,text:'すぐには動かなかったけど、自分で終わりにして片づけ始めたんだ。'},

  {id:'scene06-01',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',sceneStart:true,background:assets.backgrounds.pickup,cast:[p(assets.characters.mashiro.talkParentB,36,100,36),p(assets.characters.parentB.listening,72,100,36)],speaker:'ナレーション',text:'降園時間が近づいてきた。ましろは、Bちゃんの保護者に今日の出来事をどう伝えるか考えていた。'},
  {id:'scene06-02',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',background:assets.backgrounds.pickup,cast:[p(assets.characters.mashiro.reflectEvening,50,100,38)],speaker:'ましろ（心の声）',thought:true,text:'叩いたことはちゃんと伝えないと。でも、それだけだと足りない気がする……。\nまずはAIに、伝える内容を整理してもらってみようかな。'},
  {id:'scene06-ai',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',background:assets.backgrounds.pickup,cast:[p(assets.characters.mashiro.reflectEvening,28,100,34)],speaker:'AI',text:'保護者への伝達文を整理します。',ui:{type:'ai',privacy:true,prompt:'4歳児クラスで、友だちと一緒に遊びたかった子どもが、ブロックをめぐるやりとりの中で相手の子の腕を叩いてしまいました。相手の子は泣きましたが、けがはなく、その後は落ち着いています。本人には、叩かずに気持ちを伝えることを話しました。本人の保護者に今日の出来事を伝える文章案を作ってください。',output:[['文章案','今日、遊びの中で友だちとのやりとりがうまくいかず、相手のお子さんの腕を叩いてしまう場面がありました。相手のお子さんは泣いていましたが、けがはなく、その後は落ち着いています。本人は一緒に遊びたい気持ちがあったようです。本人にも、叩かずに気持ちを伝えることについて一緒に話しました。今後も、友だちとの関わり方を一緒に支えていきたいと思います。']] }},
  {id:'scene06-parent',sceneNo:6,sceneLabel:'場面⑥　保護者への伝達',background:assets.backgrounds.pickup,cast:[p(assets.characters.mashiro.listenParentB,32,100,36),p(assets.characters.parentB.talking,70,100,36)],speaker:'Bちゃんの保護者',text:'そうだったんですね……。最近、家でも思いどおりにならないと怒ることがあって……。'},

  {id:'scene07-01',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',sceneStart:true,background:assets.backgrounds.recordEvening,bgm:assets.audio.bgmEvening,cast:[p(assets.characters.mashiro.reviewRecords,50,100,38)],speaker:'ナレーション',text:'子どもたちが帰ったあと。ましろは一日の記録をまとめていた。'},
  {id:'scene07-ai',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reviewRecords,30,100,34)],speaker:'AI',text:'今日の3人の様子を、明日の保育に向けて整理します。',ui:{type:'ai',privacy:true,prompt:'今日の3人の様子を、明日の保育に向けて職員同士で共有しやすいように整理してください。①今日見られた姿 ②明日も見ておきたいこと の2点に分けてください。',output:[['Aちゃん','① 今日見られた姿\n登園時は不安そうだったが、保育者の近くで過ごすうちに周囲へ目を向け、遊びに向かった。\n\n② 明日も見ておきたいこと\n登園時の不安の程度と、安心したあとに自分から遊びへ向かう様子。'],['Bちゃん','① 今日見られた姿\n友だちと関わろうと何度か試みた。やりとりがうまくいかない中で相手を叩く場面があった。\n\n② 明日も見ておきたいこと\n友だちへの入り方や、思いどおりにならないときにどのように気持ちを表すか。'],['Cちゃん','① 今日見られた姿\n好きな制作に集中していた。片づけでは少し時間がかかったが、自分から遊びを終えて片づけ始めた。\n\n② 明日も見ておきたいこと\n切り替えに必要な時間と、自分から動き出せるきっかけ。']] }},
  {id:'scene07-talk',sceneNo:7,sceneLabel:'場面⑦　一日の記録・振り返り',background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reflectEvening,32,100,34),p(assets.characters.chizu.talkEvening,68,100,34)],speaker:'ちず',text:'AIにできることは、これからもっと増えていくと思う。でも、目の前の子どもと実際に関わりながら、その子に合わせて考えるのは、私たちの大事な仕事だと思うよ。'},

  {id:'ending-01',sceneNo:'END',sceneLabel:'エンディング',sceneStart:true,background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reflectEvening,50,100,38)],speaker:'ナレーション',text:'一日おつかれさまでした。\n最後に、今日の体験を少し振り返ってみましょう。'},
  {id:'ending-02',sceneNo:'END',sceneLabel:'エンディング',background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reflectEvening,50,100,38)],speaker:'振り返り',text:'AIが役立った場面と、AIだけでは終わらなかった場面を振り返ってみてください。',ui:{type:'multiReflect',items:['昨日の記録から「今日見るポイント」を整理した','保護者に伝える内容を文章として整理した','一日の記録から「明日見るポイント」を整理した','Aちゃんの様子を見ながら、その場で関わり方を考えた','BちゃんとDちゃんのトラブルに対応した','Bちゃんの保護者と実際に話した']}},
  {id:'ending-03',sceneNo:'END',sceneLabel:'エンディング',bgm:null,background:assets.backgrounds.recordEvening,cast:[p(assets.characters.mashiro.reflectEvening,50,100,38)],speaker:'ゲーム終了',text:'最後までプレイしてくれて、ありがとうございました。\n\nAIにできることが増えるほど、保育者が何を担うのかを考えることも大切になります。'}
];

export const sceneIndex = Object.fromEntries(scenes.map((s,i)=>[s.id,i]));
