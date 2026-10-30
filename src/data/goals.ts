import type { Goal } from '../types'

/** 「作りたいもの」と、おすすめの言語(あみだの上の選択肢と、辿り着く先) */
export const GOALS: Goal[] = [
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
