import type { Mission } from '../types'

export const MISSIONS: Mission[] = [
  { title: 'あいさつ', word: '変数', goal: '名前を「ゆうた」以外に変える', hint: 'name は「名前を入れる箱」。これを変数っていうよ。中身を変えると結果も変わる！' },
  { title: 'くりかえし', word: 'ループ', goal: '回数を8回にする', hint: '同じことを何回もやるのが「ループ」。数を増やしても、書くコードは同じ！' },
  { title: 'もし〜なら', word: '条件分岐', goal: '点数を100点にする', hint: '「もし〇〇なら△△する」を決めるのが「条件分岐」。点数で結果が変わるよ。' },
  { title: 'リスト', word: '配列(リスト)', goal: '食べものを3つ以上入れる', hint: 'たくさんのものを1つにまとめて入れる箱が「リスト」。for を使えば、全部を順番に取り出せるよ。' },
  { title: '関数', word: '関数', goal: 'あいさつを3回呼び出す', hint: 'よく使う処理に名前を付けたものが「関数」。1回書けば、何回でも呼び出せる！' },
]

export const FOOD_CHOICES = ['りんご', 'バナナ', 'ぶどう', 'みかん']
export const CALL_CHOICES = ['ゆうた', 'さくら', 'ハル']

/** リスト・関数ミッションで追加できる数の上限 */
export const MAX_FOODS = 6
export const MAX_CALLS = 5

/** ミッションの初期値 */
export const INITIAL_NAME = 'ゆうた'
export const INITIAL_ROWS = 4
export const INITIAL_SCORE = 72
