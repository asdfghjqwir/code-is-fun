import { GOALS } from '../data/goals'
import type { Language, LadderPath, Rungs } from '../types'

export const COLS = 4
export const ROWS = 8

/** あみだの縦線の上端と下端(SVGの座標) */
export const LADDER_TOP = 20
export const LADDER_BOTTOM = 280

export function colX(col: number): number {
  return 50 + col * 100
}

export function rowY(row: number): number {
  return LADDER_TOP + ((row + 1) * (LADDER_BOTTOM - LADDER_TOP)) / (ROWS + 1)
}

/** ランダムに横線をつくる。となり同士に線は引かない */
export function makeLadder(): Rungs {
  const rungs: Rungs = []
  for (let r = 0; r < ROWS; r++) {
    const line: boolean[] = []
    for (let c = 0; c < COLS - 1; c++) {
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

/** スタートの列から、あみだを辿った道すじとゴールの列を計算する */
export function getPath(rungs: Rungs, start: number): LadderPath {
  let col = start
  const points = [{ x: colX(col), y: LADDER_TOP }]
  for (let r = 0; r < ROWS; r++) {
    const y = rowY(r)
    points.push({ x: colX(col), y })
    if (col < COLS - 1 && rungs[r][col]) {
      col = col + 1
      points.push({ x: colX(col), y })
    } else if (col > 0 && rungs[r][col - 1]) {
      col = col - 1
      points.push({ x: colX(col), y })
    }
  }
  points.push({ x: colX(col), y: LADDER_BOTTOM })
  return { points, endCol: col }
}

/** どのスタートから来ても、おすすめの言語にたどり着くようにゴールの言語を並べる */
export function arrangeLanguages(rungs: Rungs): Language[] {
  const result: Language[] = []
  for (let start = 0; start < COLS; start++) {
    const path = getPath(rungs, start)
    result[path.endCol] = GOALS[start].lang
  }
  return result
}
