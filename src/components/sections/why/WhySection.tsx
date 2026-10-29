import { GOOGLE_BGS, pickByIndex } from '../../../constants/theme'
import { REASONS } from '../../../data/why'
import { cn } from '../../../lib/cn'
import { Card } from '../../common/Card'
import { Section } from '../../common/Section'

export function WhySection() {
  return (
    <Section
      id="why"
      tone="red"
      eyebrow="WHY"
      title="なぜ、こんなに面白いのか"
      subtitle="3つの「うわ、楽しい！」"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        {REASONS.map((reason, i) => (
          <Card key={reason.title} className="px-[26px] py-[30px] transition hover:-translate-y-2 hover:-rotate-1">
            <div
              className={cn(
                'w-[54px] h-[54px] rounded-full grid place-items-center font-black text-2xl mb-4',
                pickByIndex(GOOGLE_BGS, i),
              )}
            >
              {i + 1}
            </div>
            <h3 className="text-[21px] mb-2 font-bold">{reason.title}</h3>
            <p className="text-neutral-600 text-[15px]">{reason.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
