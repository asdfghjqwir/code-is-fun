import type { ReactNode } from 'react'
import { TONE_STYLES } from '../../constants/theme'
import { cn } from '../../lib/cn'
import type { Tone } from '../../types'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface SectionProps {
  id: string
  tone: Tone
  eyebrow: string
  title: string
  subtitle: string
  subtitleMargin?: string
  headingExtra?: ReactNode
  children: ReactNode
}

/** 背景色・余白・見出し・ふわっと表示が付いた、ページの1セクション */
export function Section({
  id,
  tone,
  eyebrow,
  title,
  subtitle,
  subtitleMargin,
  headingExtra,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-20 sm:py-24', TONE_STYLES[tone].bg)}>
      <Reveal className="max-w-[1040px] mx-auto px-5">
        <SectionHeading
          tone={tone}
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          subtitleMargin={subtitleMargin}
          extra={headingExtra}
        />
        {children}
      </Reveal>
    </section>
  )
}
