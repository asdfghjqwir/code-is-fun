import { useState } from 'react'
import { FAQS } from '../../../data/faqs'
import { Section } from '../../common/Section'

export function FaqSection() {
  // 開いている質問の番号(null ならすべて閉じている)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section
      id="faq"
      tone="red"
      eyebrow="FAQ"
      title="よくある質問"
      subtitle="はじめる前の「ちょっと不安…」に答えるよ"
    >
      <div className="max-w-[720px] mx-auto space-y-3">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div key={faq.q} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-bold cursor-pointer hover:bg-g-red-tint transition"
              >
                <span>
                  <span className="text-g-red mr-2">Q.</span>
                  {faq.q}
                </span>
                <span className="shrink-0 w-7 h-7 rounded-full bg-g-red text-white grid place-items-center">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <p className="px-5 pb-5 text-sm text-neutral-600 leading-7">
                  <span className="text-g-green font-bold mr-2">A.</span>
                  {faq.a}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </Section>
  )
}
