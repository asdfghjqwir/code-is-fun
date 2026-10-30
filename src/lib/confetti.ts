import { CONFETTI_SHAPES, LOGO_COLORS } from '../constants/theme'
import type { ConfettiPiece } from '../types'

/** (x, y) から四方八方に飛ぶ紙吹雪を amount 個つくる */
export function createConfettiPieces(x: number, y: number, amount: number): ConfettiPiece[] {
  const pieces: ConfettiPiece[] = []
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2
    const distance = 80 + Math.random() * 120
    pieces.push({
      id: Date.now() + '-' + i,
      x,
      y,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance - 40,
      rot: Math.floor(Math.random() * 720 - 360),
      shape: CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
      size: 14 + Math.floor(Math.random() * 14),
      color: LOGO_COLORS[Math.floor(Math.random() * LOGO_COLORS.length)],
    })
  }
  return pieces
}
