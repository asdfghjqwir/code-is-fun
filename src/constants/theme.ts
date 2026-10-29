import type { Tone } from '../types'

/** Googleっぽい4色(順番に使う) */
export const GOOGLE_BGS = ['bg-g-blue text-white', 'bg-g-red text-white', 'bg-g-yellow text-neutral-900', 'bg-g-green text-white']
export const GOOGLE_BORDERS = ['border-l-g-blue', 'border-l-g-red', 'border-l-g-yellow', 'border-l-g-green']
export const GOOGLE_BARS = ['bg-g-blue', 'bg-g-red', 'bg-g-yellow', 'bg-g-green']
export const LOGO_COLORS = ['#4285f4', '#ea4335', '#fbbc05', '#34a853']

/** 4色を順番に使うためのヘルパー(i が4を超えても一周して戻る) */
export function pickByIndex<T>(list: readonly T[], index: number): T {
  return list[index % list.length]
}

interface ToneStyle {
  bg: string
  eyebrow: string
  title: string
  subtitle: string
}

/** セクションごとの背景と見出しの色 */
export const TONE_STYLES: Record<Tone, ToneStyle> = {
  blue: { bg: 'bg-g-blue-tint', eyebrow: 'text-g-blue', title: 'text-g-blue', subtitle: 'opacity-70' },
  red: { bg: 'bg-g-red-tint', eyebrow: 'text-g-red', title: 'text-g-red', subtitle: 'opacity-70' },
  yellow: { bg: 'bg-g-yellow-tint', eyebrow: 'text-g-orange', title: 'text-g-orange', subtitle: 'opacity-70' },
  green: { bg: 'bg-g-green-tint', eyebrow: 'text-g-green', title: 'text-g-green', subtitle: 'opacity-70' },
  inverse: { bg: 'bg-g-blue text-white', eyebrow: 'opacity-85', title: '', subtitle: 'opacity-95' },
}

/** 紙吹雪の形 */
export const CONFETTI_SHAPES = ['■', '●', '▲', '✦', '◆']

/** 主ボタンの見た目(青い立体ボタン) */
export const PRIMARY_BUTTON =
  'inline-block px-[34px] py-[15px] rounded-[14px] font-extrabold text-[17px] no-underline text-white bg-g-blue shadow-[0_6px_0_#1557b0] transition hover:translate-y-[3px] hover:shadow-[0_3px_0_#1557b0]'

/** 副ボタンの見た目(白地に青い枠) */
export const SECONDARY_BUTTON =
  'inline-block px-[34px] py-[15px] rounded-[14px] font-extrabold text-[17px] no-underline text-g-blue bg-white border-2 border-g-blue shadow-[0_6px_0_#aecbfa] transition hover:translate-y-[3px]'
