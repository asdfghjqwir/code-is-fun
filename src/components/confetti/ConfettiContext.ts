import { createContext, useContext } from 'react'
import type { MouseEvent } from 'react'

export interface ConfettiApi {
  /** 画面の座標 (x, y) から紙吹雪を出す */
  burstAt: (x: number, y: number, amount: number) => void
  /** 画面の真ん中から出す */
  burstAtCenter: (amount: number) => void
  /** 押したボタンの真ん中から出す */
  burstFromElement: (e: MouseEvent<HTMLElement>) => void
}

export const ConfettiContext = createContext<ConfettiApi | null>(null)

export function useConfetti(): ConfettiApi {
  const api = useContext(ConfettiContext)
  if (api === null) {
    throw new Error('useConfetti は ConfettiProvider の中で使ってください')
  }
  return api
}
