import { CALL_CHOICES, FOOD_CHOICES, MAX_CALLS, MAX_FOODS } from '../../../data/missions'
import type { MissionsState } from '../../../hooks/useMissions'
import { PillButton } from '../../common/PillButton'

interface MissionControlsProps {
  missions: MissionsState
}

const SLIDER_CLASS = 'w-full sm:w-72 accent-[#4285f4]'

/** 選んでいるミッションの操作パネル(入力欄・スライダー・ボタン) */
export function MissionControls({ missions }: MissionControlsProps) {
  const { mission, userName, rows, score, foods, calls } = missions

  if (mission === 0) {
    return (
      <label className="block">
        <span className="block font-bold mb-2">① あなたの名前を入れてみて</span>
        <input
          type="text"
          value={userName}
          maxLength={10}
          onChange={missions.handleNameChange}
          className="w-full sm:w-72 px-4 py-2 rounded-lg border-2 border-neutral-300 bg-white font-bold focus:outline-none focus:border-g-blue"
        />
      </label>
    )
  }

  if (mission === 1) {
    return (
      <label className="block">
        <span className="block font-bold mb-2">① 何回くりかえす？ → {rows} 回</span>
        <input type="range" min="1" max="8" value={rows} onChange={missions.handleRowsChange} className={SLIDER_CLASS} />
      </label>
    )
  }

  if (mission === 2) {
    return (
      <label className="block">
        <span className="block font-bold mb-2">① テストの点数は？ → {score} 点</span>
        <input type="range" min="0" max="100" value={score} onChange={missions.handleScoreChange} className={SLIDER_CLASS} />
      </label>
    )
  }

  if (mission === 3) {
    return (
      <div>
        <span className="block font-bold mb-2">
          ① 好きな食べものをリストに入れよう({foods.length} / {MAX_FOODS})
        </span>
        <div className="flex flex-wrap gap-2">
          {FOOD_CHOICES.map((name) => (
            <PillButton key={name} onClick={() => missions.addFood(name)}>
              + {name}
            </PillButton>
          ))}
          <PillButton variant="muted" onClick={missions.clearFoods}>
            空にする
          </PillButton>
        </div>
      </div>
    )
  }

  return (
    <div>
      <span className="block font-bold mb-2">
        ① だれにあいさつする？ 押すたびに関数を呼び出すよ({calls.length} / {MAX_CALLS})
      </span>
      <div className="flex flex-wrap gap-2">
        {CALL_CHOICES.map((name) => (
          <PillButton key={name} onClick={() => missions.addCall(name)}>
            + {name}
          </PillButton>
        ))}
        <PillButton variant="muted" onClick={missions.clearCalls}>
          リセット
        </PillButton>
      </div>
    </div>
  )
}
