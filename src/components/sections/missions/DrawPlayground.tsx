import { useState } from 'react'
import { DRAW_DEFAULT, DRAW_PRESETS, DRAW_SHAPES } from '../../../data/draw'
import { parseDrawCode } from '../../../lib/parseDrawCode'
import { Card } from '../../common/Card'
import { PillButton } from '../../common/PillButton'

/** コードを書き換えると、右の図形が変わる「お絵かき」 */
export function DrawPlayground() {
  const [code, setCode] = useState(DRAW_DEFAULT)
  const { result, errors } = parseDrawCode(code)

  return (
    <div className="max-w-[760px] mx-auto mt-14">
      <p className="text-center text-xs font-bold tracking-[0.3em] text-g-blue mb-3">BONUS</p>
      <h3 className="text-2xl font-black text-center text-g-blue mb-2">コードで絵を描こう</h3>
      <p className="text-center opacity-70 mb-6">左のコードを書き換えると、右の絵が変わるよ。</p>
      <Card className="grid gap-5 md:grid-cols-2 p-5 sm:p-6">
        <div>
          <label className="block text-xs font-bold text-neutral-600 mb-1" htmlFor="draw-code">
            コード(ここを書き換える)
          </label>
          <textarea
            id="draw-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={6}
            spellCheck={false}
            className="w-full bg-g-tint text-neutral-800 border-2 border-neutral-200 rounded-xl px-4 py-3 font-mono text-sm leading-7 focus:outline-none focus:border-g-blue resize-none"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {DRAW_PRESETS.map((preset) => (
              <PillButton key={preset.label} size="sm" onClick={() => setCode(preset.code)}>
                {preset.label}
              </PillButton>
            ))}
          </div>
          <p className="text-xs text-neutral-600 mt-3 leading-5">
            使える名前: color(色) / shape(circle・square・triangle・star) / size(40〜200) / message(文字) / rotate(かたむき)
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-neutral-600 mb-1">できあがり</p>
          <div className="h-[230px] rounded-xl bg-g-tint border border-neutral-200 grid place-items-center overflow-hidden">
            <div
              className="grid place-items-center text-white font-black text-xl transition-all duration-300"
              style={{
                width: result.size,
                height: result.size,
                background: result.color,
                transform: 'rotate(' + result.rotate + 'deg)',
                ...DRAW_SHAPES[result.shape],
              }}
            >
              {result.message}
            </div>
          </div>
          {errors.length > 0 && (
            <ul className="mt-3 text-xs font-bold text-g-red space-y-1 list-none p-0">
              {errors.map((err) => (
                <li key={err}>⚠ {err}</li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  )
}
