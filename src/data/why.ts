import type { LoopStep, Reason } from '../types'

export const REASONS: Reason[] = [
  { title: '思い描いたものが作れる', text: '頭の中のアイデアが、画面の上で本当に動き出す。ゲームもアプリも、自分の手で。' },
  { title: '結果がすぐ返ってくる', text: '書いて、動かす。その瞬間にフィードバック。試行錯誤がサクサク回る。' },
  { title: 'パズルが解ける快感', text: '詰まったバグが解けたときの「わかった！」は格別。何度でも味わいたくなる。' },
]

export const LOOP_STEPS: LoopStep[] = [
  { title: '書く', text: 'アイデアをコードに' },
  { title: '動かす', text: '結果を見てワクワク' },
  { title: '壊す', text: '失敗も立派な発見' },
  { title: '直す', text: '解けたときの快感' },
]
