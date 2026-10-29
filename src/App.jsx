import { useState, useEffect, useRef } from 'react'

// タイピングするテキスト
const FULL_TEXT = '# はじめの一歩\nprint("Hello, World!")\n\n> Hello, World!\n> 今日も、楽しもう！'

// 作った人のプロフィール(すべてフィクション)
const PROFILE = {
  name: '星野 カナタ',
  kana: 'ほしの かなた',
  age: 24,
  job: 'ジュニアWebエンジニア',
  place: '東京都',
  years: 3,
  comment: 'バグを見つけると、ちょっとだけワクワクしてしまう人です。',
  bio: '大学の授業で書いた最初の「Hello, World!」に感動して、プログラミングの沼にハマりました。今はWeb制作会社で、毎日フロントエンドを書いています。「むずかしそう」と思っている人に、「やってみたら楽しいよ」を伝えたくて、このページを作りました。',
  favorite: ['JavaScript', 'React', 'Tailwind CSS'],
  skills: [
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 70 },
    { name: 'Tailwind CSS', level: 75 },
    { name: 'Python', level: 50 },
    { name: 'Git', level: 60 },
  ],
  history: [
    { year: '2021', text: '大学の授業でプログラミングに出会う' },
    { year: '2023', text: 'Web制作会社でインターンを経験' },
    { year: '2024', text: 'ジュニアエンジニアとして入社' },
    { year: '2026', text: 'このページ「Code is Fun!」を作成' },
  ],
  hobbies: ['ゲーム実況を見る', 'カフェめぐり', 'ボードゲーム', '散歩しながらアイデア出し'],
  goal: 'いつか、中高生向けのプログラミング教室を開くこと。',
  motto: '失敗は、バグ取りの一部。',
}

// Googleっぽい4色(順番に使う)
const GOOGLE_BGS = ['bg-g-blue text-white', 'bg-g-red text-white', 'bg-g-yellow text-neutral-900', 'bg-g-green text-white']
const GOOGLE_BORDERS = ['border-l-g-blue', 'border-l-g-red', 'border-l-g-yellow', 'border-l-g-green']
const GOOGLE_BARS = ['bg-g-blue', 'bg-g-red', 'bg-g-yellow', 'bg-g-green']
const LOGO_COLORS = ['#4285f4', '#ea4335', '#fbbc05', '#34a853']

// ヘッダーのメニュー
const NAV_LINKS = [
  { label: 'ためす', href: '#try' },
  { label: '面白さ', href: '#why' },
  { label: 'あみだ', href: '#amida' },
  { label: 'しごと', href: '#jobs' },
  { label: 'はじめかた', href: '#start' },
  { label: '作った人', href: '#about' },
]

// 身近なプログラム
const FAMILIAR = [
  { icon: '🎮', title: 'ゲーム', text: 'マイクラもフォートナイトも、キャラの動きや当たり判定は全部コード。' },
  { icon: '📱', title: 'SNS・動画', text: '「おすすめ」に好きな動画が出るのは、プログラムが選んでいるから。' },
  { icon: '💬', title: 'LINE', text: 'メッセージが一瞬で友だちに届くのも、プログラムのおかげ。' },
  { icon: '🤖', title: 'AI', text: 'ChatGPTのようなAIも、元をたどればプログラムでできている。' },
  { icon: '🎵', title: '音楽アプリ', text: 'あなたの好みに合わせて、次の曲を選んでくれる。' },
  { icon: '🚃', title: '電車・信号', text: '街のあちこちで、プログラムが毎日ずっと働いている。' },
]

// コードを書き換えて試すミッション
const MISSIONS = [
  { title: 'あいさつ', word: '変数', goal: '名前を「ゆうた」以外に変える', hint: 'name は「名前を入れる箱」。これを変数っていうよ。中身を変えると結果も変わる！' },
  { title: 'くりかえし', word: 'ループ', goal: '回数を8回にする', hint: '同じことを何回もやるのが「ループ」。数を増やしても、書くコードは同じ！' },
  { title: 'もし〜なら', word: '条件分岐', goal: '点数を100点にする', hint: '「もし〇〇なら△△する」を決めるのが「条件分岐」。点数で結果が変わるよ。' },
  { title: 'リスト', word: '配列(リスト)', goal: '食べものを3つ以上入れる', hint: 'たくさんのものを1つにまとめて入れる箱が「リスト」。for を使えば、全部を順番に取り出せるよ。' },
  { title: '関数', word: '関数', goal: 'あいさつを3回呼び出す', hint: 'よく使う処理に名前を付けたものが「関数」。1回書けば、何回でも呼び出せる！' },
]

const FOOD_CHOICES = ['りんご', 'バナナ', 'ぶどう', 'みかん']
const CALL_CHOICES = ['ゆうた', 'さくら', 'ハル']

// コードでお絵かき(使える名前だけを読み取る、安全な小さな言語)
const DRAW_DEFAULT = 'color = "red"\nshape = "circle"\nsize = 120\nmessage = "Hi!"\nrotate = 0'
const DRAW_PRESETS = [
  { label: '⭐ 星にする', code: 'color = "gold"\nshape = "star"\nsize = 170\nmessage = ""\nrotate = 0' },
  { label: '🔺 三角にする', code: 'color = "royalblue"\nshape = "triangle"\nsize = 150\nmessage = "OK"\nrotate = 20' },
  { label: '🟩 四角にする', code: 'color = "seagreen"\nshape = "square"\nsize = 130\nmessage = "Code"\nrotate = 45' },
  { label: '↺ もとにもどす', code: DRAW_DEFAULT },
]
const DRAW_SHAPES = {
  circle: { borderRadius: '50%' },
  square: { borderRadius: '14px' },
  triangle: { clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' },
  star: { clipPath: 'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
}

function parseDrawCode(text) {
  const result = { color: 'red', shape: 'circle', size: 120, message: '', rotate: 0 }
  const errors = []
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line === '' || line.startsWith('#')) continue
    const match = line.match(/^(\w+)\s*=\s*(.+)$/)
    if (!match) {
      errors.push((i + 1) + '行目: 「名前 = 値」の形で書いてね')
      continue
    }
    const key = match[1]
    const raw = match[2].trim()
    const quoted = raw.match(/^["'](.*)["']$/)
    let value = raw
    if (quoted) {
      value = quoted[1]
    } else if (raw !== '' && !isNaN(Number(raw))) {
      value = Number(raw)
    }

    if (key === 'color') {
      if (typeof value === 'string' && CSS.supports('color', value)) {
        result.color = value
      } else {
        errors.push((i + 1) + '行目: color は "red" や "#ff8800" のような色にしてね')
      }
    } else if (key === 'shape') {
      if (typeof value === 'string' && Object.hasOwn(DRAW_SHAPES, value)) {
        result.shape = value
      } else {
        errors.push((i + 1) + '行目: shape は circle / square / triangle / star のどれかだよ')
      }
    } else if (key === 'size') {
      if (typeof value === 'number') {
        result.size = Math.min(200, Math.max(40, value))
      } else {
        errors.push((i + 1) + '行目: size は数字で書いてね(40〜200)')
      }
    } else if (key === 'rotate') {
      if (typeof value === 'number') {
        result.rotate = Math.min(360, Math.max(-360, value))
      } else {
        errors.push((i + 1) + '行目: rotate は数字で書いてね(-360〜360)')
      }
    } else if (key === 'message') {
      result.message = String(value).slice(0, 10)
    } else {
      errors.push((i + 1) + '行目: 「' + key + '」は知らない名前だよ(color / shape / size / message / rotate)')
    }
  }
  return { result: result, errors: errors }
}

// よくある質問
const FAQS = [
  { q: '数学が苦手でもプログラミングはできる？', a: 'できるよ！ゲームやWebサイトを作るだけなら、足し算や引き算くらいで十分。数学が大事になるのは、AIや3Dゲームなど一部だけだよ。' },
  { q: 'パソコンを持っていなくてもできる？', a: 'スマホやタブレットのブラウザで始められるものもあるよ。学校や図書館のパソコンを使う人もたくさんいる。' },
  { q: '英語が苦手でも大丈夫？', a: '大丈夫！最初に使う英単語は print や if など、ほんの数十個。使っているうちに自然と覚えるし、日本語の解説もたくさんあるよ。' },
  { q: '何歳から始められる？', a: '小学生から大人まで、いつからでもOK。中高生で、自分のアプリやゲームを公開している人もいるよ。' },
  { q: 'お金はかかる？', a: '無料で始められるものがたくさん。Scratch も Python も JavaScript も、無料で使えるよ。' },
  { q: 'エラーが出て、くじけそうになったら？', a: 'エラーは「ここが違うよ」と教えてくれるヒント。プロでも毎日エラーに出会うよ。エラーの文をそのまま検索すると、答えが見つかることが多いんだ。' },
]



// はじめかた
const START_STEPS = [
  { title: 'Scratchでブロックを動かす', text: 'ブラウザだけでOK。ブロックを組み合わせて、キャラを動かしてみよう。' },
  { title: '文字のコードを書いてみる', text: 'PythonやJavaScriptで、今日のミッションみたいな短いコードを書こう。' },
  { title: '自分の作品をつくる', text: 'ゲームやアプリを作って、友だちに見せてみよう。それが一番楽しい！' },
]

// あみだくじの設定
const COLS = 4
const ROWS = 8
// 「作りたいもの」と、おすすめの言語
const GOALS = [
  {
    icon: '🌐',
    short: 'Webサイト',
    want: 'Webサイトを作りたい',
    lang: {
      name: 'JavaScript',
      comment: 'ブラウザで動く唯一の言語。このページもこれで動いているよ！',
      makes: 'Webサイト / Webアプリ',
      code: 'console.log("Hello, World!")',
      roadmap: [
        { when: '1週目', text: 'HTMLとCSSで、自己紹介ページを作る' },
        { when: '2週目', text: 'JavaScriptで「ボタンを押したら変わる」を作る' },
        { when: '3週目', text: '電卓やToDoリストなどのミニアプリを作る' },
        { when: '4週目', text: '作ったものを公開して、友だちに見せる' },
      ],
    },
  },
  {
    icon: '🎮',
    short: 'ゲーム',
    want: 'ゲームを作りたい',
    lang: {
      name: 'C#',
      comment: '人気のゲームエンジン「Unity」で使う言語。スマホゲームも作れる！',
      makes: 'ゲーム / VR',
      code: 'Console.WriteLine("Hello, World!");',
      roadmap: [
        { when: '1週目', text: 'Unityをインストールして、ブロックを動かしてみる' },
        { when: '2週目', text: 'C#で、キャラを矢印キーで動かす' },
        { when: '3週目', text: '当たり判定とスコアを付ける' },
        { when: '4週目', text: '1画面のミニゲームを完成させる' },
      ],
    },
  },
  {
    icon: '🤖',
    short: 'AI',
    want: 'AIやデータ分析をやりたい',
    lang: {
      name: 'Python',
      comment: '読みやすくて初心者に大人気。AI・データ分析・自動化に強い！',
      makes: 'AI / データ分析 / 自動化',
      code: 'print("Hello, World!")',
      roadmap: [
        { when: '1週目', text: 'print・変数・if・for をひと通り触る' },
        { when: '2週目', text: '数当てゲームを作ってみる' },
        { when: '3週目', text: '天気などのデータを取り込んで表示する' },
        { when: '4週目', text: '自分の趣味のデータをグラフにする' },
      ],
    },
  },
  {
    icon: '📱',
    short: 'アプリ',
    want: 'iPhoneアプリを作りたい',
    lang: {
      name: 'Swift',
      comment: 'Appleが作った言語。自分のアプリをApp Storeに出せるかも！',
      makes: 'iPhone / iPadアプリ',
      code: 'print("Hello, World!")',
      roadmap: [
        { when: '1週目', text: 'Macに Xcode を入れて、画面に Hello を表示する' },
        { when: '2週目', text: 'ボタンとテキストだけのアプリを作る' },
        { when: '3週目', text: 'ToDoや電卓のアプリを作る' },
        { when: '4週目', text: '実機で動かして、友だちに見せる' },
      ],
    },
  },
]

// 職種の紹介
const JOBS = [
  { icon: '🌐', title: 'フロントエンドエンジニア', makes: 'Webサイトやアプリの「見える部分」', example: 'YouTubeの画面、通販サイトのボタンや動き', langs: 'JavaScript / TypeScript', type: '見た目やデザインにこだわりたい人' },
  { icon: '🛠', title: 'バックエンドエンジニア', makes: 'データを守って処理する「裏側」の仕組み', example: 'ログイン機能、ゲームのランキング、買い物のカゴ', langs: 'Go / Python / Java', type: '仕組みを考えるのが好きな人' },
  { icon: '📱', title: 'モバイルアプリエンジニア', makes: 'iPhoneやAndroidのアプリ', example: 'LINE、カメラアプリ、ゲームアプリ', langs: 'Swift / Kotlin', type: '毎日使うアプリを自分で作りたい人' },
  { icon: '🎮', title: 'ゲームエンジニア', makes: 'ゲームのキャラの動きや当たり判定', example: 'スマホゲーム、家庭用ゲーム、VR', langs: 'C# / C++', type: 'ゲームが大好きな人' },
  { icon: '🤖', title: 'AI・データエンジニア', makes: 'データから学んで賢くなるAI', example: 'チャットAI、画像認識、動画のおすすめ機能', langs: 'Python', type: '数字や実験が好きな人' },
  { icon: '🔒', title: 'インフラ・セキュリティエンジニア', makes: 'サービスを止めずに、安全に守る土台', example: 'サーバーの運用、不正アクセスの対策', langs: 'Linux / AWS / Go', type: '守る・見張るのが得意な人' },
]

// あみだくじの縦線の位置
const LADDER_TOP = 20
const LADDER_BOTTOM = 280

function colX(col) {
  return 50 + col * 100
}

function rowY(row) {
  return LADDER_TOP + ((row + 1) * (LADDER_BOTTOM - LADDER_TOP)) / (ROWS + 1)
}

// ランダムに横線をつくる(rungs[行][列] が true なら、その列と右の列の間に線がある)
function makeLadder() {
  const rungs = []
  for (let r = 0; r < ROWS; r++) {
    const line = []
    for (let c = 0; c < COLS - 1; c++) {
      // となりに線があるときは引かない
      if (c > 0 && line[c - 1]) {
        line.push(false)
      } else {
        line.push(Math.random() < 0.5)
      }
    }
    rungs.push(line)
  }
  return rungs
}

// スタートの列から、あみだを辿った道すじを計算する
function getPath(rungs, start) {
  let col = start
  const points = [{ x: colX(col), y: LADDER_TOP }]
  for (let r = 0; r < ROWS; r++) {
    const y = rowY(r)
    points.push({ x: colX(col), y: y })
    if (col < COLS - 1 && rungs[r][col]) {
      col = col + 1
      points.push({ x: colX(col), y: y })
    } else if (col > 0 && rungs[r][col - 1]) {
      col = col - 1
      points.push({ x: colX(col), y: y })
    }
  }
  points.push({ x: colX(col), y: LADDER_BOTTOM })
  return { points: points, endCol: col }
}

// どのスタートから来ても、おすすめの言語にたどり着くようにゴールの言語を並べる
function arrangeLanguages(rungs) {
  const result = []
  for (let start = 0; start < COLS; start++) {
    const path = getPath(rungs, start)
    result[path.endCol] = GOALS[start].lang
  }
  return result
}

// 紙吹雪の形(白黒なので記号も混ぜる)
const CONFETTI_SHAPES = ['■', '●', '▲', '✦', '◆']

// 1行ずつ色をつける
function highlight(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('#')) {
      return <div key={i} className="text-neutral-600 italic">{line}</div>
    }
    if (line.startsWith('print')) {
      const rest = line.replace('print', '')
      return (
        <div key={i}>
          <span className="text-g-blue font-bold">print</span>
          <span className="text-g-green">{rest}</span>
        </div>
      )
    }
    if (line.startsWith('>')) {
      return <div key={i} className="text-g-red font-bold">{line}</div>
    }
    return <div key={i}>{line || ' '}</div>
  })
}

// スクロールで見えたらふわっと出す入れ物
function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={'transition-all duration-700 ' + (show ? 'opacity-100 translate-y-0 ' : 'opacity-0 translate-y-[30px] ') + className}>
      {children}
    </div>
  )
}

function App() {
  const [typed, setTyped] = useState(0)
  const [liked, setLiked] = useState([])
  const [showTop, setShowTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mission, setMission] = useState(0)
  const [userName, setUserName] = useState('ゆうた')
  const [rows, setRows] = useState(4)
  const [score, setScore] = useState(72)
  const [foods, setFoods] = useState(['りんご'])
  const [calls, setCalls] = useState(['ゆうた'])
  const [cleared, setCleared] = useState([false, false, false, false, false])
  const [drawCode, setDrawCode] = useState(DRAW_DEFAULT)
  const [faqOpen, setFaqOpen] = useState(0)
  const [confetti, setConfetti] = useState([])
  const [ladder, setLadder] = useState(makeLadder())
  const [picked, setPicked] = useState(null)
  const [progress, setProgress] = useState(0)

  // スクロールで表示したい要素を入れておく
  const whyRef = useRef(null)
  const loopRef = useRef(null)
  const amidaRef = useRef(null)
  const [whyShow, setWhyShow] = useState(false)
  const [loopShow, setLoopShow] = useState(false)
  const [amidaShow, setAmidaShow] = useState(false)

  // タイピング演出
  useEffect(() => {
    if (typed >= FULL_TEXT.length) return
    const timer = setTimeout(() => {
      setTyped(typed + 1)
    }, 70)
    return () => clearTimeout(timer)
  }, [typed])

  // スクロールでふわっと表示
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === whyRef.current) setWhyShow(true)
            if (entry.target === loopRef.current) setLoopShow(true)
            if (entry.target === amidaRef.current) setAmidaShow(true)
          }
        })
      },
      { threshold: 0.15 },
    )
    observer.observe(whyRef.current)
    observer.observe(loopRef.current)
    observer.observe(amidaRef.current)
    return () => observer.disconnect()
  }, [])

  // あみだの線を少しずつ伸ばす
  useEffect(() => {
    if (picked === null) return
    const path = getPath(ladder, picked)
    if (progress >= path.points.length - 1) return
    const timer = setTimeout(() => {
      setProgress(progress + 1)
    }, 140)
    return () => clearTimeout(timer)
  }, [picked, progress, ladder])

  // 少し下にスクロールしたら「トップへ戻る」ボタンを出す
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 400) {
        setShowTop(true)
      } else {
        setShowTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handlePick(col) {
    setPicked(col)
    setProgress(0)
  }

  function handleNewLadder() {
    setLadder(makeLadder())
    setPicked(null)
    setProgress(0)
  }

  function handleTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 「気になる！」を押した職種を覚える(もう一度押すと外す)
  function handleLike(e, title) {
    if (liked.includes(title)) {
      setLiked(liked.filter((t) => t !== title))
    } else {
      setLiked([...liked, title])
      burstConfetti(e)
    }
  }

  // ボタンの真ん中から紙吹雪を出す
  function burstConfetti(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 14)
  }

  function burstAt(x, y, amount) {
    const pieces = []
    for (let i = 0; i < amount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 80 + Math.random() * 120
      pieces.push({
        id: Date.now() + '-' + i,
        x: x,
        y: y,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - 40,
        rot: Math.floor(Math.random() * 720 - 360),
        shape: CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
        size: 14 + Math.floor(Math.random() * 14),
        color: LOGO_COLORS[Math.floor(Math.random() * LOGO_COLORS.length)],
      })
    }
    setConfetti((old) => [...old, ...pieces])

    // 1秒たったら消す
    setTimeout(() => {
      setConfetti((old) => old.filter((p) => !pieces.includes(p)))
    }, 1000)
  }

  // 条件を満たしたらミッションクリア(バッジをもらう)
  function markCleared(index, ok) {
    if (!ok || cleared[index]) return
    const next = [...cleared]
    next[index] = true
    setCleared(next)
    const allClear = next.every((c) => c)
    burstAt(window.innerWidth / 2, window.innerHeight / 2, allClear ? 60 : 24)
  }

  function handleNameChange(e) {
    const value = e.target.value
    setUserName(value)
    markCleared(0, value.trim() !== '' && value !== 'ゆうた')
  }

  function handleRowsChange(e) {
    const value = Number(e.target.value)
    setRows(value)
    markCleared(1, value === 8)
  }

  function handleScoreChange(e) {
    const value = Number(e.target.value)
    setScore(value)
    markCleared(2, value === 100)
  }

  function addFood(name) {
    if (foods.length >= 6) return
    const next = [...foods, name]
    setFoods(next)
    markCleared(3, next.length >= 3)
  }

  function addCall(name) {
    if (calls.length >= 5) return
    const next = [...calls, name]
    setCalls(next)
    markCleared(4, next.length >= 3)
  }

  // ミッションの表示用データ(コードと実行結果)
  let codeLines = []
  let outputLines = []
  if (mission === 0) {
    codeLines = ['name = "' + userName + '"', 'print("こんにちは、" + name + "さん！")']
    outputLines = ['こんにちは、' + userName + 'さん！']
  } else if (mission === 1) {
    codeLines = ['for i in range(' + rows + '):', '    print("★" * (i + 1))']
    for (let i = 0; i < rows; i++) {
      outputLines.push('★'.repeat(i + 1))
    }
  } else if (mission === 2) {
    codeLines = [
      'score = ' + score,
      '',
      'if score == 100:',
      '    print("満点！天才！")',
      'elif score >= 80:',
      '    print("合格！すごい！")',
      'else:',
      '    print("あと少し！もう一回！")',
    ]
    if (score === 100) {
      outputLines = ['満点！天才！']
    } else if (score >= 80) {
      outputLines = ['合格！すごい！']
    } else {
      outputLines = ['あと少し！もう一回！']
    }
  } else if (mission === 3) {
    codeLines = [
      'foods = [' + foods.map((f) => '"' + f + '"').join(', ') + ']',
      '',
      'for food in foods:',
      '    print(food + "が好き！")',
    ]
    outputLines = foods.map((f) => f + 'が好き！')
  } else {
    codeLines = ['def hello(name):', '    print("こんにちは、" + name + "！")', '']
    calls.forEach((name) => {
      codeLines.push('hello("' + name + '")')
    })
    outputLines = calls.map((name) => 'こんにちは、' + name + '！')
  }

  // お絵かきコードの読み取り結果
  const draw = parseDrawCode(drawCode)

  // あみだの表示用データ(ゴールの言語は、あみだの結果に合わせて並べる)
  const langs = arrangeLanguages(ladder)
  let amidaPath = null
  let amidaDone = false
  let amidaResult = null
  if (picked !== null) {
    amidaPath = getPath(ladder, picked)
    amidaDone = progress >= amidaPath.points.length - 1
    if (amidaDone) {
      amidaResult = langs[amidaPath.endCol]
    }
  }

  return (
    <div className="bg-white text-[#3c4043] font-sans leading-[1.7] overflow-x-hidden transition-colors duration-300">
      {/* ヘッダー */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <nav className="max-w-[1040px] mx-auto px-5 flex items-center justify-between h-16">
          {/* ロゴ */}
          <a href="#top" className="flex items-center gap-2 no-underline text-[#3c4043]">
            <span className="w-8 h-8 rounded-lg bg-g-blue text-white grid place-items-center font-mono font-black text-sm">{'</>'}</span>
            <span className="font-extrabold text-lg tracking-tight">
              {'Code is Fun!'.split('').map((ch, i) => (
                <span key={i} style={{ color: LOGO_COLORS[i % 4] }}>{ch}</span>
              ))}
            </span>
          </a>

          {/* メニュー(PC) */}
          <ul className="hidden lg:flex items-center gap-1 list-none p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold no-underline text-neutral-600 hover:bg-g-tint hover:text-g-blue transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* 右側のボタン */}
          <div className="flex items-center gap-2">
            <a
              href="#try"
              className="hidden lg:inline-block px-4 py-2 rounded-lg text-sm font-bold no-underline bg-g-blue text-white hover:opacity-80 transition"
            >
              コードを触る
            </a>
            {/* ハンバーガー(スマホ) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニューを開く"
              aria-expanded={menuOpen}
              className="lg:hidden w-10 h-10 rounded-lg border border-neutral-300 text-lg cursor-pointer hover:bg-neutral-100 transition"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>

        {/* メニュー(スマホ) */}
        {menuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white">
            <ul className="max-w-[1040px] mx-auto px-5 py-3 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-semibold no-underline text-neutral-700 border-b border-neutral-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main id="top">
        {/* ヒーロー */}
        <div className="relative pt-[90px] pb-[110px] text-center">
          <div className="absolute w-[260px] h-[260px] rounded-full bg-g-blue opacity-25 blur-[4px] animate-float top-5 -left-[60px]"></div>
          <div className="absolute w-[150px] h-[150px] rounded-full bg-g-red opacity-25 blur-[4px] animate-float top-[240px] right-[4%] [animation-delay:-2s]"></div>
          <div className="absolute w-[90px] h-[90px] rounded-full bg-g-yellow opacity-50 blur-[4px] animate-float bottom-[50px] left-[14%] [animation-delay:-4s]"></div>

          <div className="relative z-[1] max-w-[1040px] mx-auto px-5">
            <span className="inline-block bg-g-yellow text-neutral-900 font-extrabold px-4 py-1 rounded-full text-sm -rotate-3">
              WELCOME, ADVENTURER!
            </span>
            <h1 className="text-[clamp(38px,8vw,84px)] leading-[1.15] my-[22px] font-black">
              プログラミングって、<br />
              <em className="not-italic bg-[linear-gradient(90deg,#4285f4,#ea4335,#fbbc05,#34a853)] bg-clip-text text-transparent">
                めっちゃ面白い！
              </em>
            </h1>
            <p className="text-neutral-600 text-[clamp(16px,2.4vw,20px)] max-w-[560px] mx-auto mb-[34px]">
              書いたら動く。壊したら学べる。解けたら最高。<br />
              むずかしそう？ 大丈夫。このページの下で、いますぐコードを触れるよ。
            </p>
            <a
              href="#try"
              className="inline-block px-[34px] py-[15px] rounded-[14px] font-extrabold text-[17px] no-underline text-white bg-g-blue shadow-[0_6px_0_#1557b0] transition hover:translate-y-[3px] hover:shadow-[0_3px_0_#1557b0]"
            >
              さっそく試す ▶
            </a>
            <a
              href="#jobs"
              className="inline-block px-[34px] py-[15px] rounded-[14px] font-extrabold text-[17px] no-underline text-g-blue bg-white border-2 border-g-blue shadow-[0_6px_0_#aecbfa] transition hover:translate-y-[3px] ml-0 mt-[14px] sm:mt-0 sm:ml-3"
            >
              職種を見る
            </a>

            {/* ターミナル */}
            <div className="max-w-[560px] mt-[60px] mx-auto text-left bg-white text-neutral-800 rounded-2xl shadow-[0_20px_50px_rgba(26,115,232,0.25)] border-2 border-g-blue overflow-hidden">
              <div className="flex gap-2 px-4 py-3 bg-g-tint border-b border-neutral-200">
                <i className="block w-3 h-3 rounded-full bg-g-red"></i>
                <i className="block w-3 h-3 rounded-full bg-g-yellow"></i>
                <i className="block w-3 h-3 rounded-full bg-g-green"></i>
              </div>
              <pre className="px-6 py-[22px] font-mono text-[17px] leading-[1.8] min-h-[190px] whitespace-pre-wrap">
                {highlight(FULL_TEXT.slice(0, typed))}
                <span className="inline-block w-[9px] h-[1.1em] bg-g-blue align-text-bottom animate-blink"></span>
              </pre>
            </div>
          </div>
        </div>

        {/* 身近なプログラム */}
        <section id="familiar" className="py-20 sm:py-24 bg-g-yellow-tint">
          <Reveal className="max-w-[1040px] mx-auto px-5">
            <p className="text-center text-xs font-bold tracking-[0.3em] text-g-orange mb-3">AROUND YOU</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-black text-center mb-3 text-g-orange">毎日使ってるアレも、実はプログラム</h2>
            <p className="text-center opacity-70 mb-12">プログラミングができると、こういうものを自分で作れるようになる！</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              {FAMILIAR.map((item, i) => (
                <div key={item.title} className={'flex gap-4 items-start bg-white border border-neutral-200 border-l-4 rounded-2xl p-5 transition hover:-translate-y-1 ' + GOOGLE_BORDERS[i % 4]}>
                  <div className="text-3xl w-12 h-12 shrink-0 rounded-xl bg-neutral-100 grid place-items-center">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* コードを触るミッション */}
        <section id="try" className="py-20 sm:py-24 bg-g-blue-tint">
          <Reveal className="max-w-[1040px] mx-auto px-5">
            <p className="text-center text-xs font-bold tracking-[0.3em] text-g-blue mb-3">TRY IT</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-black text-center mb-3 text-g-blue">コードを書き換えてみよう</h2>
            <p className="text-center opacity-70 mb-10">自由にいじってOK。壊れないから安心して！</p>

            <div className="max-w-[760px] mx-auto">
              {/* バッジ */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-sm font-bold">バッジ</span>
                {cleared.map((done, i) => (
                  <span key={i} className={'w-9 h-9 rounded-full grid place-items-center text-lg border-2 transition ' + (done ? 'bg-g-yellow border-g-yellow scale-110' : 'bg-white border-neutral-300 grayscale opacity-60')}>
                    {done ? '🏅' : '?'}
                  </span>
                ))}
                <span className="text-sm font-bold">{cleared.filter((c) => c).length} / {MISSIONS.length}</span>
              </div>
              {cleared.every((c) => c) && (
                <p className="text-center font-bold text-g-green mb-4">🎉 全ミッションクリア！もう立派なプログラマーだ！</p>
              )}

              {/* ミッション切り替え */}
              <div className="flex gap-2 mb-5 justify-center flex-wrap">
                {MISSIONS.map((m, i) => (
                  <button
                    key={m.title}
                    type="button"
                    onClick={() => setMission(i)}
                    className={'px-4 py-2 rounded-full text-sm font-bold border-2 border-g-blue cursor-pointer transition ' + (mission === i ? 'bg-g-blue text-white' : 'bg-white text-g-blue hover:bg-g-tint')}
                  >
                    {cleared[i] ? '✓ ' : ''}ミッション{i + 1}: {m.title}
                  </button>
                ))}
              </div>

              <div className="bg-white border border-neutral-200 rounded-[22px] p-5 sm:p-7 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
                <p className={'text-sm font-bold rounded-xl px-4 py-2 mb-5 ' + (cleared[mission] ? 'bg-g-green-tint text-g-green' : 'bg-g-yellow-tint text-g-orange')}>
                  {cleared[mission] ? '🏅 クリア！バッジをゲット！' : '🎯 クリア条件: ' + MISSIONS[mission].goal}
                </p>

                {/* 操作パネル */}
                <div className="mb-5">
                  {mission === 0 && (
                    <label className="block">
                      <span className="block font-bold mb-2">① あなたの名前を入れてみて</span>
                      <input
                        type="text"
                        value={userName}
                        maxLength={10}
                        onChange={handleNameChange}
                        className="w-full sm:w-72 px-4 py-2 rounded-lg border-2 border-neutral-300 bg-white font-bold focus:outline-none focus:border-g-blue"
                      />
                    </label>
                  )}
                  {mission === 1 && (
                    <label className="block">
                      <span className="block font-bold mb-2">① 何回くりかえす？ → {rows} 回</span>
                      <input type="range" min="1" max="8" value={rows} onChange={handleRowsChange} className="w-full sm:w-72 accent-[#4285f4]" />
                    </label>
                  )}
                  {mission === 2 && (
                    <label className="block">
                      <span className="block font-bold mb-2">① テストの点数は？ → {score} 点</span>
                      <input type="range" min="0" max="100" value={score} onChange={handleScoreChange} className="w-full sm:w-72 accent-[#4285f4]" />
                    </label>
                  )}
                  {mission === 3 && (
                    <div>
                      <span className="block font-bold mb-2">① 好きな食べものをリストに入れよう({foods.length} / 6)</span>
                      <div className="flex flex-wrap gap-2">
                        {FOOD_CHOICES.map((name) => (
                          <button key={name} type="button" onClick={() => addFood(name)} className="px-4 py-2 rounded-full text-sm font-bold border-2 border-g-blue text-g-blue bg-white hover:bg-g-blue-tint cursor-pointer transition active:scale-95">
                            + {name}
                          </button>
                        ))}
                        <button type="button" onClick={() => setFoods([])} className="px-4 py-2 rounded-full text-sm font-bold border-2 border-neutral-300 text-neutral-600 bg-white hover:bg-neutral-100 cursor-pointer transition">
                          空にする
                        </button>
                      </div>
                    </div>
                  )}
                  {mission === 4 && (
                    <div>
                      <span className="block font-bold mb-2">① だれにあいさつする？ 押すたびに関数を呼び出すよ({calls.length} / 5)</span>
                      <div className="flex flex-wrap gap-2">
                        {CALL_CHOICES.map((name) => (
                          <button key={name} type="button" onClick={() => addCall(name)} className="px-4 py-2 rounded-full text-sm font-bold border-2 border-g-blue text-g-blue bg-white hover:bg-g-blue-tint cursor-pointer transition active:scale-95">
                            + {name}
                          </button>
                        ))}
                        <button type="button" onClick={() => setCalls([])} className="px-4 py-2 rounded-full text-sm font-bold border-2 border-neutral-300 text-neutral-600 bg-white hover:bg-neutral-100 cursor-pointer transition">
                          リセット
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* コード */}
                <p className="text-xs font-bold text-neutral-600 mb-1">② コードはこうなる</p>
                <pre className="bg-g-tint text-neutral-800 border border-neutral-200 rounded-xl px-4 py-3 font-mono text-sm leading-7 overflow-x-auto mb-4">
                  {codeLines.map((line, i) => (
                    <div key={i}>{line || '\u00a0'}</div>
                  ))}
                </pre>

                {/* 実行結果 */}
                <p className="text-xs font-bold text-neutral-600 mb-1">③ 実行すると…</p>
                <pre className="bg-neutral-100 rounded-xl px-4 py-3 font-mono text-sm sm:text-base font-bold leading-7 min-h-[60px] mb-5 overflow-x-auto">
                  {outputLines.map((line, i) => (
                    <div key={i}>{line || '\u00a0'}</div>
                  ))}
                </pre>

                {/* ひとこと解説 */}
                <p className="text-sm bg-neutral-100 rounded-xl px-4 py-3">
                  <strong>💡 {MISSIONS[mission].word}:</strong> {MISSIONS[mission].hint}
                </p>
              </div>
            </div>

            {/* コードでお絵かき */}
            <div className="max-w-[760px] mx-auto mt-14">
              <p className="text-center text-xs font-bold tracking-[0.3em] text-g-blue mb-3">BONUS</p>
              <h3 className="text-2xl font-black text-center text-g-blue mb-2">コードで絵を描こう</h3>
              <p className="text-center opacity-70 mb-6">左のコードを書き換えると、右の絵が変わるよ。</p>
              <div className="grid gap-5 md:grid-cols-2 bg-white border border-neutral-200 rounded-[22px] p-5 sm:p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
                <div>
                  <label className="block text-xs font-bold text-neutral-600 mb-1" htmlFor="draw-code">コード(ここを書き換える)</label>
                  <textarea
                    id="draw-code"
                    value={drawCode}
                    onChange={(e) => setDrawCode(e.target.value)}
                    rows={6}
                    spellCheck={false}
                    className="w-full bg-g-tint text-neutral-800 border-2 border-neutral-200 rounded-xl px-4 py-3 font-mono text-sm leading-7 focus:outline-none focus:border-g-blue resize-none"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {DRAW_PRESETS.map((preset) => (
                      <button key={preset.label} type="button" onClick={() => setDrawCode(preset.code)} className="px-3 py-1.5 rounded-full text-xs font-bold border-2 border-g-blue text-g-blue bg-white hover:bg-g-blue-tint cursor-pointer transition active:scale-95">
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 mt-3 leading-5">
                    使える名前: color(色) / shape(circle・square・triangle・star) / size(40〜200) / message(文字) / rotate(かたむき)
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-600 mb-1">できあがり</p>
                  <div className="h-[230px] rounded-xl bg-g-tint border border-neutral-200 grid place-items-center overflow-hidden">
                    <div
                      className="grid place-items-center text-white font-black text-xl transition-all duration-300"
                      style={{
                        width: draw.result.size,
                        height: draw.result.size,
                        background: draw.result.color,
                        transform: 'rotate(' + draw.result.rotate + 'deg)',
                        ...DRAW_SHAPES[draw.result.shape],
                      }}
                    >
                      {draw.result.message}
                    </div>
                  </div>
                  {draw.errors.length > 0 && (
                    <ul className="mt-3 text-xs font-bold text-g-red space-y-1 list-none p-0">
                      {draw.errors.map((err) => (
                        <li key={err}>⚠ {err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* なぜ面白いのか */}
        <section id="why" className="py-20 sm:py-24 bg-g-red-tint">
          <div
            ref={whyRef}
            className={'max-w-[1040px] mx-auto px-5 transition-all duration-700 ' + (whyShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]')}
          >
            <p className="text-center text-xs font-bold tracking-[0.3em] text-g-red mb-3">WHY</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-black text-center mb-3 text-g-red">なぜ、こんなに面白いのか</h2>
            <p className="text-center opacity-70 mb-12">3つの「うわ、楽しい！」</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
              <div className="bg-white border border-neutral-200 rounded-[22px] px-[26px] py-[30px] shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-2 hover:-rotate-1">
                <div className="w-[54px] h-[54px] rounded-full grid place-items-center font-black text-2xl mb-4 bg-g-blue text-white">1</div>
                <h3 className="text-[21px] mb-2 font-bold">思い描いたものが作れる</h3>
                <p className="text-neutral-600 text-[15px]">頭の中のアイデアが、画面の上で本当に動き出す。ゲームもアプリも、自分の手で。</p>
              </div>
              <div className="bg-white border border-neutral-200 rounded-[22px] px-[26px] py-[30px] shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-2 hover:-rotate-1">
                <div className="w-[54px] h-[54px] rounded-full grid place-items-center font-black text-2xl mb-4 bg-g-red text-white">2</div>
                <h3 className="text-[21px] mb-2 font-bold">結果がすぐ返ってくる</h3>
                <p className="text-neutral-600 text-[15px]">書いて、動かす。その瞬間にフィードバック。試行錯誤がサクサク回る。</p>
              </div>
              <div className="bg-white border border-neutral-200 rounded-[22px] px-[26px] py-[30px] shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-2 hover:-rotate-1">
                <div className="w-[54px] h-[54px] rounded-full grid place-items-center font-black text-2xl mb-4 bg-g-yellow text-neutral-900">3</div>
                <h3 className="text-[21px] mb-2 font-bold">パズルが解ける快感</h3>
                <p className="text-neutral-600 text-[15px]">詰まったバグが解けたときの「わかった！」は格別。何度でも味わいたくなる。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ループ */}
        <section id="loop" className="py-20 sm:py-24 bg-g-green-tint">
          <div
            ref={loopRef}
            className={'max-w-[1040px] mx-auto px-5 transition-all duration-700 ' + (loopShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]')}
          >
            <p className="text-center text-xs font-bold tracking-[0.3em] text-g-green mb-3">LOOP</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-black text-center mb-3 text-g-green">楽しさのループを回そう</h2>
            <p className="text-center opacity-70 mb-12">このループが、成長のエンジン</p>
            <div className="flex flex-wrap justify-center items-center gap-[14px]">
              <div className="bg-g-blue text-white rounded-[20px] px-[22px] py-[26px] w-[190px] text-center font-bold transition cursor-pointer hover:scale-[1.08] hover:rotate-2">
                <b className="block text-[28px] mb-1">書く</b>アイデアをコードに
              </div>
              <span className="w-full sm:w-auto text-center text-2xl text-neutral-400"><span className="sm:hidden">▼</span><span className="hidden sm:inline">▶</span></span>
              <div className="bg-g-red text-white rounded-[20px] px-[22px] py-[26px] w-[190px] text-center font-bold transition cursor-pointer hover:scale-[1.08] hover:rotate-2">
                <b className="block text-[28px] mb-1">動かす</b>結果を見てワクワク
              </div>
              <span className="w-full sm:w-auto text-center text-2xl text-neutral-400"><span className="sm:hidden">▼</span><span className="hidden sm:inline">▶</span></span>
              <div className="bg-g-yellow text-neutral-900 rounded-[20px] px-[22px] py-[26px] w-[190px] text-center font-bold transition cursor-pointer hover:scale-[1.08] hover:rotate-2">
                <b className="block text-[28px] mb-1">壊す</b>失敗も立派な発見
              </div>
              <span className="w-full sm:w-auto text-center text-2xl text-neutral-400"><span className="sm:hidden">▼</span><span className="hidden sm:inline">▶</span></span>
              <div className="bg-g-green text-white rounded-[20px] px-[22px] py-[26px] w-[190px] text-center font-bold transition cursor-pointer hover:scale-[1.08] hover:rotate-2">
                <b className="block text-[28px] mb-1">直す</b>解けたときの快感
              </div>
            </div>
            <p className="text-center mt-[30px] font-extrabold text-lg">↻ 何度でも、気がすむまで</p>
          </div>
        </section>

        {/* あみだくじ */}
        <section id="amida" className="py-20 sm:py-24 bg-g-yellow-tint">
          <div
            ref={amidaRef}
            className={'max-w-[1040px] mx-auto px-5 transition-all duration-700 ' + (amidaShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]')}
          >
            <p className="text-center text-xs font-bold tracking-[0.3em] text-g-orange mb-3">LANGUAGE LOTTERY</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-black text-center mb-3 text-g-orange">あみだくじで言語えらび</h2>
            <p className="text-center opacity-70 mb-12">作りたいものを選ぶと、あみだくじがおすすめの言語を教えてくれるよ！</p>

            <div className="grid gap-8 md:grid-cols-2 items-start max-w-[900px] mx-auto">
              {/* 左: あみだ */}
              <div className="bg-white border border-neutral-200 rounded-[22px] px-4 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
                <p className="text-center text-sm font-bold text-neutral-600 mb-3">① 作りたいものをえらぶ</p>
                <div className="flex">
                  {GOALS.map((goal, col) => (
                    <div key={goal.short} className="w-1/4 text-center">
                      <button
                        type="button"
                        onClick={() => handlePick(col)}
                        className={'w-12 h-12 rounded-full text-xl border-2 border-g-blue cursor-pointer transition active:scale-90 ' + (picked === col ? 'bg-g-blue/20' : 'bg-white hover:bg-neutral-200')}
                      >
                        {goal.icon}
                      </button>
                      <p className="text-[11px] sm:text-xs font-bold mt-1">{goal.short}</p>
                    </div>
                  ))}
                </div>

                <svg viewBox="0 0 400 300" className="w-full text-neutral-300">
                  {/* 縦線 */}
                  {[0, 1, 2, 3].map((col) => (
                    <line key={col} x1={colX(col)} y1={LADDER_TOP} x2={colX(col)} y2={LADDER_BOTTOM} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  ))}
                  {/* 横線 */}
                  {ladder.map((line, r) =>
                    line.map((has, c) =>
                      has ? (
                        <line key={r + '-' + c} x1={colX(c)} y1={rowY(r)} x2={colX(c + 1)} y2={rowY(r)} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      ) : null,
                    ),
                  )}
                  {/* 辿った道すじ */}
                  {amidaPath !== null && (
                    <polyline
                      points={amidaPath.points.slice(0, progress + 1).map((pt) => pt.x + ',' + pt.y).join(' ')}
                      fill="none"
                      className="stroke-g-red"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>

                {/* ゴールの言語名 */}
                <div className="flex">
                  {langs.map((lang, col) => (
                    <div key={lang.name} className="w-1/4 text-center px-[2px]">
                      <span className={'inline-block px-2 py-1 rounded-full font-extrabold text-[11px] sm:text-xs transition ' + (amidaDone && amidaPath.endCol === col ? 'bg-g-blue text-white scale-110' : 'bg-neutral-200 text-neutral-700')}>
                        {lang.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={handleNewLadder}
                    className="px-6 py-2.5 rounded-[14px] font-extrabold text-sm text-white bg-g-blue shadow-[0_5px_0_#1557b0] transition hover:translate-y-[2px] hover:shadow-[0_3px_0_#1557b0] cursor-pointer"
                  >
                    あみだを作り直す
                  </button>
                </div>
              </div>

              {/* 右: 結果 */}
              <div className="bg-white border border-neutral-200 rounded-[22px] px-6 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)] min-h-[300px] flex flex-col justify-center text-center">
                <p className="text-sm font-bold text-neutral-600 mb-3">② おすすめの言語は…</p>
                {picked === null && <p className="font-bold">まずは作りたいものをえらんでね</p>}
                {picked !== null && !amidaDone && <p className="font-bold">ドキドキ…</p>}
                {amidaResult !== null && (
                  <div>
                    <p className="text-sm font-bold mb-1">「{GOALS[picked].want}」あなたには</p>
                    <p className="text-4xl sm:text-5xl font-black mb-4">{amidaResult.name}</p>
                    <p className="text-neutral-600 mb-4">{amidaResult.comment}</p>
                    <p className="text-sm font-bold mb-4">作れるもの: {amidaResult.makes}</p>
                    <div className="bg-g-tint text-neutral-800 border border-neutral-200 rounded-xl px-4 py-3 font-mono text-sm text-left overflow-x-auto">
                      <span className="text-neutral-600"># はじめの一歩</span>
                      <br />
                      {amidaResult.code}
                    </div>
                    <div className="mt-5 text-left">
                      <p className="text-xs font-bold text-neutral-600 mb-2">🗺 最初の1か月ロードマップ</p>
                      <ol className="space-y-2 list-none p-0">
                        {amidaResult.roadmap.map((step, i) => (
                          <li key={step.when} className="flex gap-3 items-start text-sm">
                            <span className={'shrink-0 w-6 h-6 rounded-full grid place-items-center text-xs font-black ' + GOOGLE_BGS[i % 4]}>{i + 1}</span>
                            <span><b>{step.when}</b> {step.text}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* エンジニアの職種 */}
        <section id="jobs" className="py-20 sm:py-24 bg-g-blue text-white">
          <Reveal className="max-w-[1040px] mx-auto px-5">
            <p className="text-center text-xs font-bold tracking-[0.3em] opacity-85 mb-3">JOBS</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-black text-center mb-3">エンジニアって、どんな仕事？</h2>
            <p className="text-center opacity-95 mb-3">プログラミングを仕事にすると、こんな「作る人」になれる！</p>
            <p className="text-center font-bold mb-12">気になる職種: {liked.length} / {JOBS.length}</p>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-5">
              {JOBS.map((job) => (
                <div key={job.title} className="flex flex-col rounded-2xl p-6 border border-white/30 bg-white/10 transition hover:-translate-y-1">
                  <div className="text-3xl mb-3">{job.icon}</div>
                  <h3 className="font-bold text-lg mb-3">{job.title}</h3>
                  <dl className="text-sm leading-6 mb-5 space-y-2">
                    <div>
                      <dt className="text-xs font-bold opacity-85">作っているもの</dt>
                      <dd>{job.makes}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold opacity-85">たとえば</dt>
                      <dd>{job.example}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold opacity-85">よく使う言語</dt>
                      <dd className="font-mono">{job.langs}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold opacity-85">こんな人に向いてる</dt>
                      <dd>{job.type}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={(e) => handleLike(e, job.title)}
                    className={'mt-auto w-full py-2.5 rounded-xl font-bold text-sm border-2 cursor-pointer transition active:scale-95 ' + (liked.includes(job.title) ? 'bg-white text-g-blue border-white' : 'border-white/70 hover:bg-white/15')}
                  >
                    {liked.includes(job.title) ? '気になる ✓' : '気になる！'}
                  </button>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* はじめかた */}
        <section id="start" className="py-20 sm:py-24 bg-g-green-tint">
          <Reveal className="max-w-[1040px] mx-auto px-5">
            <p className="text-center text-xs font-bold tracking-[0.3em] text-g-green mb-3">GET STARTED</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-black text-center mb-3 text-g-green">次は、君の番だ</h2>
            <p className="text-center opacity-70 mb-12">最初から上手な人はいない。まずは、小さく始めよう。</p>
            <div className="grid gap-5 md:grid-cols-3 max-w-[900px] mx-auto">
              {START_STEPS.map((step, i) => (
                <div key={step.title} className="bg-white border border-neutral-200 rounded-2xl p-6">
                  <div className={'w-10 h-10 rounded-full grid place-items-center font-black mb-3 ' + GOOGLE_BGS[i % 4]}>{i + 1}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href="#try"
                className="inline-block px-[34px] py-[15px] rounded-[14px] font-extrabold text-[17px] no-underline text-white bg-g-blue shadow-[0_6px_0_#1557b0] transition hover:translate-y-[3px] hover:shadow-[0_3px_0_#1557b0]"
              >
                もう一度コードを触る ↑
              </a>
            </div>
          </Reveal>
        </section>

        {/* よくある質問 */}
        <section id="faq" className="py-20 sm:py-24 bg-g-red-tint">
          <Reveal className="max-w-[1040px] mx-auto px-5">
            <p className="text-center text-xs font-bold tracking-[0.3em] text-g-red mb-3">FAQ</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-black text-center mb-3 text-g-red">よくある質問</h2>
            <p className="text-center opacity-70 mb-12">はじめる前の「ちょっと不安…」に答えるよ</p>
            <div className="max-w-[720px] mx-auto space-y-3">
              {FAQS.map((faq, i) => (
                <div key={faq.q} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    aria-expanded={faqOpen === i}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-bold cursor-pointer hover:bg-g-red-tint transition"
                  >
                    <span><span className="text-g-red mr-2">Q.</span>{faq.q}</span>
                    <span className="shrink-0 w-7 h-7 rounded-full bg-g-red text-white grid place-items-center">{faqOpen === i ? '−' : '+'}</span>
                  </button>
                  {faqOpen === i && (
                    <p className="px-5 pb-5 text-sm text-neutral-600 leading-7"><span className="text-g-green font-bold mr-2">A.</span>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 作った人(3つの箱) */}
        <section id="about" className="py-20 sm:py-24 bg-g-blue-tint">
          <Reveal className="max-w-[1040px] mx-auto px-5">
            <p className="text-center text-xs font-bold tracking-[0.3em] text-g-blue mb-3">ABOUT</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-black text-center mb-3 text-g-blue">このページを作った人</h2>
            <p className="text-center opacity-70 mb-12">ちょっとだけ自己紹介</p>

            <div className="grid gap-6 lg:grid-cols-3 items-stretch">
              {/* 箱1: プロフィール */}
              <div className="bg-white border border-neutral-200 border-t-4 border-t-g-blue rounded-[22px] px-6 py-8 shadow-[0_10px_28px_rgba(0,0,0,0.08)] text-center">
                <div className="w-[88px] h-[88px] rounded-full grid place-items-center font-black text-4xl mx-auto mb-4 bg-g-blue text-white">
                  {PROFILE.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-black">{PROFILE.name}</h3>
                <p className="text-xs text-neutral-600 mb-3">{PROFILE.kana}</p>
                <p className="text-neutral-600 font-bold mb-5">
                  {PROFILE.age}歳 / {PROFILE.job}
                </p>
                <dl className="text-sm text-left space-y-2 border-t border-neutral-200 pt-5 mb-5">
                  <div className="flex justify-between"><dt className="text-neutral-600">出身 / 在住</dt><dd className="font-bold">{PROFILE.place}</dd></div>
                  <div className="flex justify-between"><dt className="text-neutral-600">プログラミング歴</dt><dd className="font-bold">{PROFILE.years}年</dd></div>
                </dl>
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {PROFILE.favorite.map((name, i) => (
                    <span key={name} className={'px-3 py-1 rounded-full text-xs font-bold ' + GOOGLE_BGS[i % 4]}>{name}</span>
                  ))}
                </div>
                <p className="border-t border-neutral-200 pt-5 text-sm">「{PROFILE.comment}」</p>
              </div>

              {/* 箱2: スキルとこれまで */}
              <div className="bg-white border border-neutral-200 border-t-4 border-t-g-red rounded-[22px] px-6 py-8 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
                <h3 className="font-bold text-lg mb-4">スキル</h3>
                <div className="space-y-3 mb-8">
                  {PROFILE.skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold">{skill.name}</span>
                        <span className="text-neutral-600">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-neutral-200">
                        <div className={'h-2 rounded-full ' + GOOGLE_BARS[i % 4]} style={{ width: skill.level + '%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <h3 className="font-bold text-lg mb-4 border-t border-neutral-200 pt-6">これまで</h3>
                <ol className="border-l-2 border-neutral-200 ml-2 space-y-4 list-none p-0">
                  {PROFILE.history.map((item) => (
                    <li key={item.year} className="relative pl-6">
                      <span className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-g-red"></span>
                      <p className="text-xs font-bold text-neutral-600">{item.year}</p>
                      <p className="text-sm">{item.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 箱3: 人柄 */}
              <div className="bg-white border border-neutral-200 border-t-4 border-t-g-green rounded-[22px] px-6 py-8 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
                <h3 className="font-bold text-lg mb-3">自己紹介</h3>
                <p className="text-sm text-neutral-600 mb-8">{PROFILE.bio}</p>
                <h3 className="font-bold text-lg mb-3 border-t border-neutral-200 pt-6">趣味</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {PROFILE.hobbies.map((hobby) => (
                    <span key={hobby} className="px-3 py-1 rounded-full text-xs font-bold bg-g-tint text-g-blue">{hobby}</span>
                  ))}
                </div>
                <h3 className="font-bold text-lg mb-3 border-t border-neutral-200 pt-6">いまの目標</h3>
                <p className="text-sm text-neutral-600 mb-3">{PROFILE.goal}</p>
                <p className="text-xs font-bold">座右の銘: 「{PROFILE.motto}」</p>
              </div>
            </div>

            <p className="text-center text-xs opacity-60 mt-8">※この人物は架空の人物です(フィクション)</p>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-neutral-200">
        {/* Googleっぽい4色のライン */}
        <div className="flex h-1">
          <div className="flex-1 bg-g-blue"></div>
          <div className="flex-1 bg-g-red"></div>
          <div className="flex-1 bg-g-yellow"></div>
          <div className="flex-1 bg-g-green"></div>
        </div>
        <p className="py-6 text-center text-sm text-neutral-600">
          &copy; {new Date().getFullYear()} Code is Fun! All rights reserved.
        </p>
      </footer>

      {/* 紙吹雪 */}
      {confetti.map((p) => (
        <span
          key={p.id}
          className="fixed z-50 pointer-events-none animate-pop"
          style={{
            left: p.x,
            top: p.y,
            fontSize: p.size,
            color: p.color,
            '--dx': p.dx + 'px',
            '--dy': p.dy + 'px',
            '--rot': p.rot + 'deg',
          }}
        >
          {p.shape}
        </span>
      ))}

      {/* トップへ戻るボタン(4色のリング) */}
      <button
        type="button"
        onClick={handleTop}
        aria-label="ページの先頭へ戻る"
        className={'fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full p-[4px] bg-[conic-gradient(#1a73e8,#d93025,#fbbc05,#188038,#1a73e8)] shadow-[0_6px_16px_rgba(0,0,0,0.25)] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:rotate-[360deg] ' + (showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none')}
      >
        <span className="w-full h-full rounded-full bg-white grid place-items-center text-g-blue text-xl font-black">↑</span>
      </button>
    </div>
  )
}

export default App
