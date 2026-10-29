import type { Job } from '../types'

export const JOBS: Job[] = [
  { icon: '🌐', title: 'フロントエンドエンジニア', makes: 'Webサイトやアプリの「見える部分」', example: 'YouTubeの画面、通販サイトのボタンや動き', langs: 'JavaScript / TypeScript', type: '見た目やデザインにこだわりたい人' },
  { icon: '🛠', title: 'バックエンドエンジニア', makes: 'データを守って処理する「裏側」の仕組み', example: 'ログイン機能、ゲームのランキング、買い物のカゴ', langs: 'Go / Python / Java', type: '仕組みを考えるのが好きな人' },
  { icon: '📱', title: 'モバイルアプリエンジニア', makes: 'iPhoneやAndroidのアプリ', example: 'LINE、カメラアプリ、ゲームアプリ', langs: 'Swift / Kotlin', type: '毎日使うアプリを自分で作りたい人' },
  { icon: '🎮', title: 'ゲームエンジニア', makes: 'ゲームのキャラの動きや当たり判定', example: 'スマホゲーム、家庭用ゲーム、VR', langs: 'C# / C++', type: 'ゲームが大好きな人' },
  { icon: '🤖', title: 'AI・データエンジニア', makes: 'データから学んで賢くなるAI', example: 'チャットAI、画像認識、動画のおすすめ機能', langs: 'Python', type: '数字や実験が好きな人' },
  { icon: '🔒', title: 'インフラ・セキュリティエンジニア', makes: 'サービスを止めずに、安全に守る土台', example: 'サーバーの運用、不正アクセスの対策', langs: 'Linux / AWS / Go', type: '守る・見張るのが得意な人' },
]
