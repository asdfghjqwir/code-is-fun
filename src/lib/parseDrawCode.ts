import { DRAW_SHAPES } from '../data/draw'
import type { DrawParseResult, DrawSettings, DrawShapeName } from '../types'

function isDrawShape(value: string): value is DrawShapeName {
  return Object.hasOwn(DRAW_SHAPES, value)
}

/**
 * お絵かきのコードを読み取る。
 * 入力をそのまま実行(eval)せず、決まった名前だけを読み取る安全な小さな言語。
 */
export function parseDrawCode(text: string): DrawParseResult {
  const result: DrawSettings = { color: 'red', shape: 'circle', size: 120, message: '', rotate: 0 }
  const errors: string[] = []
  const lines = text.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const lineNo = i + 1
    const line = lines[i].trim()
    if (line === '' || line.startsWith('#')) continue

    const match = line.match(/^(\w+)\s*=\s*(.+)$/)
    if (!match) {
      errors.push(lineNo + '行目: 「名前 = 値」の形で書いてね')
      continue
    }

    const key = match[1]
    const raw = match[2].trim()
    const quoted = raw.match(/^["'](.*)["']$/)
    let value: string | number = raw
    if (quoted) {
      value = quoted[1]
    } else if (raw !== '' && !isNaN(Number(raw))) {
      value = Number(raw)
    }

    if (key === 'color') {
      if (typeof value === 'string' && CSS.supports('color', value)) {
        result.color = value
      } else {
        errors.push(lineNo + '行目: color は "red" や "#ff8800" のような色にしてね')
      }
    } else if (key === 'shape') {
      if (typeof value === 'string' && isDrawShape(value)) {
        result.shape = value
      } else {
        errors.push(lineNo + '行目: shape は circle / square / triangle / star のどれかだよ')
      }
    } else if (key === 'size') {
      if (typeof value === 'number') {
        result.size = Math.min(200, Math.max(40, value))
      } else {
        errors.push(lineNo + '行目: size は数字で書いてね(40〜200)')
      }
    } else if (key === 'rotate') {
      if (typeof value === 'number') {
        result.rotate = Math.min(360, Math.max(-360, value))
      } else {
        errors.push(lineNo + '行目: rotate は数字で書いてね(-360〜360)')
      }
    } else if (key === 'message') {
      result.message = String(value).slice(0, 10)
    } else {
      errors.push(lineNo + '行目: 「' + key + '」は知らない名前だよ(color / shape / size / message / rotate)')
    }
  }

  return { result, errors }
}
