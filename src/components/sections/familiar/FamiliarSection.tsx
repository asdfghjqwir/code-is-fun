import { GOOGLE_BORDERS, pickByIndex } from '../../../constants/theme'
import { FAMILIAR } from '../../../data/familiar'
import { cn } from '../../../lib/cn'
import { Section } from '../../common/Section'

export function FamiliarSection() {
  return (
    <Section
      id="familiar"
      tone="yellow"
      eyebrow="AROUND YOU"
      title="毎日使ってるアレも、実はプログラム"
      subtitle="プログラミングができると、こういうものを自分で作れるようになる！"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {FAMILIAR.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              'flex gap-4 items-start bg-white border border-neutral-200 border-l-4 rounded-2xl p-5 transition hover:-translate-y-1',
              pickByIndex(GOOGLE_BORDERS, i),
            )}
          >
            <div className="text-3xl w-12 h-12 shrink-0 rounded-xl bg-neutral-100 grid place-items-center">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
