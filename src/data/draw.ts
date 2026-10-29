import type { DrawPreset, DrawShapes } from '../types'

export const DRAW_DEFAULT = 'color = "red"\nshape = "circle"\nsize = 120\nmessage = "Hi!"\nrotate = 0'

export const DRAW_PRESETS: DrawPreset[] = [
  { label: '⭐ 星にする', code: 'color = "gold"\nshape = "star"\nsize = 170\nmessage = ""\nrotate = 0' },
  { label: '🔺 三角にする', code: 'color = "royalblue"\nshape = "triangle"\nsize = 150\nmessage = "OK"\nrotate = 20' },
  { label: '🟩 四角にする', code: 'color = "seagreen"\nshape = "square"\nsize = 130\nmessage = "Code"\nrotate = 45' },
  { label: '↺ もとにもどす', code: DRAW_DEFAULT },
]

export const DRAW_SHAPES: DrawShapes = {
  circle: { borderRadius: '50%' },
  square: { borderRadius: '14px' },
  triangle: { clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' },
  star: { clipPath: 'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
}
