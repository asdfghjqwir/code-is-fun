import { COLS, LADDER_BOTTOM, LADDER_TOP, colX, rowY } from '../../../lib/amida'
import type { LadderPath, Rungs } from '../../../types'

interface LadderSvgProps {
  ladder: Rungs
  path: LadderPath | null
  /** 道すじを何点目まで描くか */
  progress: number
}

/** あみだの縦線・横線と、辿った道すじ */
export function LadderSvg({ ladder, path, progress }: LadderSvgProps) {
  const columns = Array.from({ length: COLS }, (_, col) => col)

  return (
    <svg viewBox="0 0 400 300" className="w-full text-neutral-300">
      {/* 縦線 */}
      {columns.map((col) => (
        <line
          key={col}
          x1={colX(col)}
          y1={LADDER_TOP}
          x2={colX(col)}
          y2={LADDER_BOTTOM}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      {/* 横線 */}
      {ladder.map((line, r) =>
        line.map((has, c) =>
          has ? (
            <line
              key={r + '-' + c}
              x1={colX(c)}
              y1={rowY(r)}
              x2={colX(c + 1)}
              y2={rowY(r)}
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ) : null,
        ),
      )}
      {/* 辿った道すじ */}
      {path !== null && (
        <polyline
          points={path.points
            .slice(0, progress + 1)
            .map((pt) => pt.x + ',' + pt.y)
            .join(' ')}
          fill="none"
          className="stroke-g-red"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}
