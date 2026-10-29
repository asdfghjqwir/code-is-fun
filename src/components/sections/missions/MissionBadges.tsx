import { cn } from '../../../lib/cn'

interface MissionBadgesProps {
  cleared: boolean[]
}

/** クリアしたミッションの数だけ、バッジが光る */
export function MissionBadges({ cleared }: MissionBadgesProps) {
  const clearedCount = cleared.filter((c) => c).length

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-sm font-bold">バッジ</span>
        {cleared.map((done, i) => (
          <span
            key={i}
            className={cn(
              'w-9 h-9 rounded-full grid place-items-center text-lg border-2 transition',
              done ? 'bg-g-yellow border-g-yellow scale-110' : 'bg-white border-neutral-300 grayscale opacity-60',
            )}
          >
            {done ? '🏅' : '?'}
          </span>
        ))}
        <span className="text-sm font-bold">
          {clearedCount} / {cleared.length}
        </span>
      </div>
      {clearedCount === cleared.length && (
        <p className="text-center font-bold text-g-green mb-4">🎉 全ミッションクリア！もう立派なプログラマーだ！</p>
      )}
    </>
  )
}
