import type { CSSProperties } from 'react'

/** セクションの色の系統(Googleの4色 + 青地の反転) */
export type Tone = 'blue' | 'red' | 'yellow' | 'green' | 'inverse'

export interface NavLink {
  label: string
  href: string
}

export interface FamiliarItem {
  icon: string
  title: string
  text: string
}

export interface Reason {
  title: string
  text: string
}

export interface LoopStep {
  title: string
  text: string
}

export interface Mission {
  title: string
  word: string
  goal: string
  hint: string
}

export interface DrawPreset {
  label: string
  code: string
}

export type DrawShapeName = 'circle' | 'square' | 'triangle' | 'star'
export type DrawShapes = Record<DrawShapeName, CSSProperties>

export interface DrawSettings {
  color: string
  shape: DrawShapeName
  size: number
  message: string
  rotate: number
}

export interface DrawParseResult {
  result: DrawSettings
  errors: string[]
}

export interface RoadmapStep {
  when: string
  text: string
}

export interface Language {
  name: string
  comment: string
  makes: string
  code: string
  roadmap: RoadmapStep[]
}

export interface Goal {
  icon: string
  short: string
  want: string
  lang: Language
}

/** あみだの横線。rungs[行][列] が true なら、その列と右の列の間に線がある */
export type Rungs = boolean[][]

export interface Point {
  x: number
  y: number
}

export interface LadderPath {
  points: Point[]
  endCol: number
}

export interface Job {
  icon: string
  title: string
  makes: string
  example: string
  langs: string
  type: string
}

export interface StartStep {
  title: string
  text: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface Skill {
  name: string
  level: number
}

export interface HistoryItem {
  year: string
  text: string
}

export interface Profile {
  name: string
  kana: string
  age: number
  job: string
  place: string
  years: number
  comment: string
  bio: string
  favorite: string[]
  skills: Skill[]
  history: HistoryItem[]
  hobbies: string[]
  goal: string
  motto: string
}

export interface ConfettiPiece {
  id: string
  x: number
  y: number
  dx: number
  dy: number
  rot: number
  shape: string
  size: number
  color: string
}
