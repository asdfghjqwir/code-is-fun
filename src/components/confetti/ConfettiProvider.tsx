import { useMemo, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { createConfettiPieces } from '../../lib/confetti'
import type { ConfettiPiece } from '../../types'
import { ConfettiContext } from './ConfettiContext'
import type { ConfettiApi } from './ConfettiContext'

/** 紙吹雪が消えるまでの時間(ms) */
const LIFETIME = 1000

function pieceStyle(p: ConfettiPiece): CSSProperties {
  return {
    left: p.x,
    top: p.y,
    fontSize: p.size,
    color: p.color,
    '--dx': p.dx + 'px',
    '--dy': p.dy + 'px',
    '--rot': p.rot + 'deg',
  } as CSSProperties
}

export function ConfettiProvider({ children }: { children: ReactNode }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  const api = useMemo<ConfettiApi>(() => {
    function burstAt(x: number, y: number, amount: number) {
      const created = createConfettiPieces(x, y, amount)
      setPieces((old) => [...old, ...created])
      setTimeout(() => {
        setPieces((old) => old.filter((p) => !created.includes(p)))
      }, LIFETIME)
    }

    return {
      burstAt,
      burstAtCenter: (amount) => burstAt(window.innerWidth / 2, window.innerHeight / 2, amount),
      burstFromElement: (e: MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 14)
      },
    }
  }, [])

  return (
    <ConfettiContext.Provider value={api}>
      {children}
      {pieces.map((p) => (
        <span key={p.id} className="fixed z-50 pointer-events-none animate-pop" style={pieceStyle(p)}>
          {p.shape}
        </span>
      ))}
    </ConfettiContext.Provider>
  )
}
