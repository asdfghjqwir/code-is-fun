import type { Profile } from '../types'

/** 作った人のプロフィール(すべてフィクション) */
export const PROFILE: Profile = {
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
