import { GOALS } from '../../../data/goals'
import type { AmidaState } from '../../../hooks/useAmida'
import { cn } from '../../../lib/cn'
import { Card } from '../../common/Card'
import { LadderSvg } from './LadderSvg'

interface AmidaBoardProps {
  amida: AmidaState
}

/** 左側: 作りたいものを選ぶボタン・あみだ・ゴールの言語名 */
export function AmidaBoard({ amida }: AmidaBoardProps) {
  const { ladder, picked, progress, langs, path, done, pick, reset } = amida

  return (
    <Card className="px-4 py-6">
      <p className="text-center text-sm font-bold text-neutral-600 mb-3">① 作りたいものをえらぶ</p>
      <div className="flex">
        {GOALS.map((goal, col) => (
          <div key={goal.short} className="w-1/4 text-center">
            <button
              type="button"
              onClick={() => pick(col)}
              className={cn(
                'w-12 h-12 rounded-full text-xl border-2 border-g-blue cursor-pointer transition active:scale-90',
                picked === col ? 'bg-g-blue/20' : 'bg-white hover:bg-neutral-200',
              )}
            >
              {goal.icon}
            </button>
            <p className="text-[11px] sm:text-xs font-bold mt-1">{goal.short}</p>
          </div>
        ))}
      </div>

      <LadderSvg ladder={ladder} path={path} progress={progress} />

      {/* ゴールの言語名 */}
      <div className="flex">
        {langs.map((lang, col) => (
          <div key={lang.name} className="w-1/4 text-center px-[2px]">
            <span
              className={cn(
                'inline-block px-2 py-1 rounded-full font-extrabold text-[11px] sm:text-xs transition',
                done && path !== null && path.endCol === col
                  ? 'bg-g-blue text-white scale-110'
                  : 'bg-neutral-200 text-neutral-700',
              )}
            >
              {lang.name}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={reset}
          className="px-6 py-2.5 rounded-[14px] font-extrabold text-sm text-white bg-g-blue shadow-[0_5px_0_#1557b0] transition hover:translate-y-[2px] hover:shadow-[0_3px_0_#1557b0] cursor-pointer"
        >
          あみだを作り直す
        </button>
      </div>
    </Card>
  )
}
