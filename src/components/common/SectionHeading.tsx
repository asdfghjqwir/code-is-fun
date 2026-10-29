import type { ReactNode } from 'react'
import { TONE_STYLES } from '../../constants/theme'
import { cn } from '../../lib/cn'
import type { Tone } from '../../types'

interface SectionHeadingProps {
  tone: Tone
  eyebrow: string
  title: string
  subtitle: string
  /** サブタイトルの下の余白(Tailwindのクラス)。初期値は mb-12 */
  subtitleMargin?: string
  /** サブタイトルの下に足したいもの */
  extra?: ReactNode
}

/** セクションの見出し(英字ラベル・タイトル・サブタイトル) */
export function SectionHeading({
  tone,
  eyebrow,
  title,
  subtitle,
  subtitleMargin = 'mb-12',
  extra,
}: SectionHeadingProps) {
  const style = TONE_STYLES[tone]

  return (
    <>
      <p className={cn('text-center text-xs font-bold tracking-[0.3em] mb-3', style.eyebrow)}>{eyebrow}</p>
      <h2 className={cn('text-[clamp(28px,5vw,44px)] font-black text-center mb-3', style.title)}>{title}</h2>
      <p className={cn('text-center', style.subtitle, subtitleMargin)}>{subtitle}</p>
      {extra}
    </>
  )
}
