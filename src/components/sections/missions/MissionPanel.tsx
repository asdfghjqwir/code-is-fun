import { MISSIONS } from '../../../data/missions'
import type { MissionsState } from '../../../hooks/useMissions'
import { cn } from '../../../lib/cn'
import { Card } from '../../common/Card'
import { MissionControls } from './MissionControls'

interface MissionPanelProps {
  missions: MissionsState
}

/** 選んでいるミッションの本体(クリア条件・操作・コード・実行結果・解説) */
export function MissionPanel({ missions }: MissionPanelProps) {
  const { mission, cleared, codeLines, outputLines } = missions
  const current = MISSIONS[mission]
  const isCleared = cleared[mission]

  return (
    <Card className="p-5 sm:p-7">
      <p
        className={cn(
          'text-sm font-bold rounded-xl px-4 py-2 mb-5',
          isCleared ? 'bg-g-green-tint text-g-green' : 'bg-g-yellow-tint text-g-orange',
        )}
      >
        {isCleared ? '🏅 クリア！バッジをゲット！' : '🎯 クリア条件: ' + current.goal}
      </p>

      <div className="mb-5">
        <MissionControls missions={missions} />
      </div>

      <p className="text-xs font-bold text-neutral-600 mb-1">② コードはこうなる</p>
      <pre className="bg-g-tint text-neutral-800 border border-neutral-200 rounded-xl px-4 py-3 font-mono text-sm leading-7 overflow-x-auto mb-4">
        {codeLines.map((line, i) => (
          <div key={i}>{line || ' '}</div>
        ))}
      </pre>

      <p className="text-xs font-bold text-neutral-600 mb-1">③ 実行すると…</p>
      <pre className="bg-neutral-100 rounded-xl px-4 py-3 font-mono text-sm sm:text-base font-bold leading-7 min-h-[60px] mb-5 overflow-x-auto">
        {outputLines.map((line, i) => (
          <div key={i}>{line || ' '}</div>
        ))}
      </pre>

      <p className="text-sm bg-neutral-100 rounded-xl px-4 py-3">
        <strong>💡 {current.word}:</strong> {current.hint}
      </p>
    </Card>
  )
}
