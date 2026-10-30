import { MISSIONS } from '../../../data/missions'
import { cn } from '../../../lib/cn'

interface MissionTabsProps {
  current: number
  cleared: boolean[]
  onSelect: (index: number) => void
}

export function MissionTabs({ current, cleared, onSelect }: MissionTabsProps) {
  return (
    <div className="flex gap-2 mb-5 justify-center flex-wrap">
      {MISSIONS.map((m, i) => (
        <button
          key={m.title}
          type="button"
          onClick={() => onSelect(i)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-bold border-2 border-g-blue cursor-pointer transition',
            current === i ? 'bg-g-blue text-white' : 'bg-white text-g-blue hover:bg-g-tint',
          )}
        >
          {cleared[i] ? '✓ ' : ''}ミッション{i + 1}: {m.title}
        </button>
      ))}
    </div>
  )
}
