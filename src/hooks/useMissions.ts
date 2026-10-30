import { useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  INITIAL_NAME,
  INITIAL_ROWS,
  INITIAL_SCORE,
  MAX_CALLS,
  MAX_FOODS,
  MISSIONS,
} from '../data/missions'
import { buildMissionView } from '../lib/missionView'
import type { MissionView } from '../lib/missionView'

export interface MissionsState extends MissionView {
  mission: number
  setMission: (index: number) => void
  userName: string
  rows: number
  score: number
  foods: string[]
  calls: string[]
  cleared: boolean[]
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleRowsChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleScoreChange: (e: ChangeEvent<HTMLInputElement>) => void
  addFood: (name: string) => void
  clearFoods: () => void
  addCall: (name: string) => void
  clearCalls: () => void
}

/**
 * ミッション全体の状態。
 * onCleared は、新しくミッションをクリアしたときに呼ばれる(全クリアなら true)。
 */
export function useMissions(onCleared: (allClear: boolean) => void): MissionsState {
  const [mission, setMission] = useState(0)
  const [userName, setUserName] = useState(INITIAL_NAME)
  const [rows, setRows] = useState(INITIAL_ROWS)
  const [score, setScore] = useState(INITIAL_SCORE)
  const [foods, setFoods] = useState<string[]>(['りんご'])
  const [calls, setCalls] = useState<string[]>(['ゆうた'])
  const [cleared, setCleared] = useState<boolean[]>(MISSIONS.map(() => false))

  // 条件を満たしたらミッションクリア(バッジをもらう)
  function markCleared(index: number, ok: boolean) {
    if (!ok || cleared[index]) return
    const next = [...cleared]
    next[index] = true
    setCleared(next)
    onCleared(next.every((c) => c))
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setUserName(value)
    markCleared(0, value.trim() !== '' && value !== INITIAL_NAME)
  }

  function handleRowsChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)
    setRows(value)
    markCleared(1, value === 8)
  }

  function handleScoreChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)
    setScore(value)
    markCleared(2, value === 100)
  }

  function addFood(name: string) {
    if (foods.length >= MAX_FOODS) return
    const next = [...foods, name]
    setFoods(next)
    markCleared(3, next.length >= 3)
  }

  function addCall(name: string) {
    if (calls.length >= MAX_CALLS) return
    const next = [...calls, name]
    setCalls(next)
    markCleared(4, next.length >= 3)
  }

  const view = buildMissionView(mission, { userName, rows, score, foods, calls })

  return {
    mission,
    setMission,
    userName,
    rows,
    score,
    foods,
    calls,
    cleared,
    ...view,
    handleNameChange,
    handleRowsChange,
    handleScoreChange,
    addFood,
    clearFoods: () => setFoods([]),
    addCall,
    clearCalls: () => setCalls([]),
  }
}
