import { GOOGLE_BGS, pickByIndex } from '../../../constants/theme'
import { START_STEPS } from '../../../data/start'
import { cn } from '../../../lib/cn'
import { LinkButton } from '../../common/LinkButton'
import { Section } from '../../common/Section'

export function StartSection() {
  return (
    <Section
      id="start"
      tone="green"
      eyebrow="GET STARTED"
      title="次は、君の番だ"
      subtitle="最初から上手な人はいない。まずは、小さく始めよう。"
    >
      <div className="grid gap-5 md:grid-cols-3 max-w-[900px] mx-auto">
        {START_STEPS.map((step, i) => (
          <div key={step.title} className="bg-white border border-neutral-200 rounded-2xl p-6">
            <div
              className={cn(
                'w-10 h-10 rounded-full grid place-items-center font-black mb-3',
                pickByIndex(GOOGLE_BGS, i),
              )}
            >
              {i + 1}
            </div>
            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-neutral-600">{step.text}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <LinkButton href="#try">もう一度コードを触る ↑</LinkButton>
      </div>
    </Section>
  )
}
