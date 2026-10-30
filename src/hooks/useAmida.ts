import { useEffect, useState } from 'react'
import { arrangeLanguages, getPath, makeLadder } from '../lib/amida'
import type { Language, LadderPath, Rungs } from '../types'

/** 線を 1 点進める間隔(ms) */
const STEP_INTERVAL = 140

export interface AmidaState {
  ladder: Rungs
  picked: number | null
  progress: number
  langs: Language[]
  path: LadderPath | null
  done: boolean
  result: Language | null
  pick: (col: number) => void
  reset: () => void
}

export function useAmida(): AmidaState {
  const [ladder, setLadder] = useState<Rungs>(makeLadder)
  const [picked, setPicked] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  // 線を少しずつ伸ばす
  useEffect(() => {
    if (picked === null) return
    const path = getPath(ladder, picked)
    if (progress >= path.points.length - 1) return
    const timer = setTimeout(() => {
      setProgress(progress + 1)
    }, STEP_INTERVAL)
    return () => clearTimeout(timer)
  }, [picked, progress, ladder])

  // ゴールの言語は、あみだの結果に合わせて並べる
  const langs = arrangeLanguages(ladder)
  const path = picked === null ? null : getPath(ladder, picked)
  const done = path !== null && progress >= path.points.length - 1
  const result = path !== null && done ? langs[path.endCol] : null

  function pick(col: number) {
    setPicked(col)
    setProgress(0)
  }

  function reset() {
    setLadder(makeLadder())
    setPicked(null)
    setProgress(0)
  }

  return { ladder, picked, progress, langs, path, done, result, pick, reset }
}
