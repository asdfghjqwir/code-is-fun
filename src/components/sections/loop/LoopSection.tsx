import { Fragment } from 'react'
import { GOOGLE_BGS, pickByIndex } from '../../../constants/theme'
import { LOOP_STEPS } from '../../../data/why'
import { cn } from '../../../lib/cn'
import { Section } from '../../common/Section'

/** ステップ同士をつなぐ矢印(スマホでは下向き) */
function Arrow() {
  return (
    <span className="w-full sm:w-auto text-center text-2xl text-neutral-400">
      <span className="sm:hidden">▼</span>
      <span className="hidden sm:inline">▶</span>
    </span>
  )
}

export function LoopSection() {
  return (
    <Section
      id="loop"
      tone="green"
      eyebrow="LOOP"
      title="楽しさのループを回そう"
      subtitle="このループが、成長のエンジン"
    >
      <div className="flex flex-wrap justify-center items-center gap-[14px]">
        {LOOP_STEPS.map((step, i) => (
          <Fragment key={step.title}>
            {i > 0 && <Arrow />}
            <div
              className={cn(
                'rounded-[20px] px-[22px] py-[26px] w-[190px] text-center font-bold transition cursor-pointer hover:scale-[1.08] hover:rotate-2',
                pickByIndex(GOOGLE_BGS, i),
              )}
            >
              <b className="block text-[28px] mb-1">{step.title}</b>
              {step.text}
            </div>
          </Fragment>
        ))}
      </div>
      <p className="text-center mt-[30px] font-extrabold text-lg">↻ 何度でも、気がすむまで</p>
    </Section>
  )
}
