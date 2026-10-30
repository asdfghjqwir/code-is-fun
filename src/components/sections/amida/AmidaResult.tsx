import { GOALS } from '../../../data/goals'
import { GOOGLE_BGS, pickByIndex } from '../../../constants/theme'
import type { AmidaState } from '../../../hooks/useAmida'
import { cn } from '../../../lib/cn'
import { Card } from '../../common/Card'

interface AmidaResultProps {
  amida: AmidaState
}

/** 右側: おすすめの言語・コード例・最初の1か月ロードマップ */
export function AmidaResult({ amida }: AmidaResultProps) {
  const { picked, done, result } = amida

  return (
    <Card className="px-6 py-6 min-h-[300px] flex flex-col justify-center text-center">
      <p className="text-sm font-bold text-neutral-600 mb-3">② おすすめの言語は…</p>
      {picked === null && <p className="font-bold">まずは作りたいものをえらんでね</p>}
      {picked !== null && !done && <p className="font-bold">ドキドキ…</p>}
      {picked !== null && result !== null && (
        <div>
          <p className="text-sm font-bold mb-1">「{GOALS[picked].want}」あなたには</p>
          <p className="text-4xl sm:text-5xl font-black mb-4">{result.name}</p>
          <p className="text-neutral-600 mb-4">{result.comment}</p>
          <p className="text-sm font-bold mb-4">作れるもの: {result.makes}</p>
          <div className="bg-g-tint text-neutral-800 border border-neutral-200 rounded-xl px-4 py-3 font-mono text-sm text-left overflow-x-auto">
            <span className="text-neutral-600"># はじめの一歩</span>
            <br />
            {result.code}
          </div>
          <div className="mt-5 text-left">
            <p className="text-xs font-bold text-neutral-600 mb-2">🗺 最初の1か月ロードマップ</p>
            <ol className="space-y-2 list-none p-0">
              {result.roadmap.map((step, i) => (
                <li key={step.when} className="flex gap-3 items-start text-sm">
                  <span
                    className={cn(
                      'shrink-0 w-6 h-6 rounded-full grid place-items-center text-xs font-black',
                      pickByIndex(GOOGLE_BGS, i),
                    )}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <b>{step.when}</b> {step.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </Card>
  )
}
