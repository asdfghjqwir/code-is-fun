import { FULL_TEXT, TYPING_INTERVAL } from '../../../data/hero'
import { useTypewriter } from '../../../hooks/useTypewriter'
import { HighlightedCode } from './HighlightedCode'

/** コードがタイピングされる、ターミナル風の枠 */
export function Terminal() {
  const typed = useTypewriter(FULL_TEXT, TYPING_INTERVAL)

  return (
    <div className="max-w-[560px] mt-[60px] mx-auto text-left bg-white text-neutral-800 rounded-2xl shadow-[0_20px_50px_rgba(26,115,232,0.25)] border-2 border-g-blue overflow-hidden">
      <div className="flex gap-2 px-4 py-3 bg-g-tint border-b border-neutral-200">
        <i className="block w-3 h-3 rounded-full bg-g-red"></i>
        <i className="block w-3 h-3 rounded-full bg-g-yellow"></i>
        <i className="block w-3 h-3 rounded-full bg-g-green"></i>
      </div>
      <pre className="px-6 py-[22px] font-mono text-[17px] leading-[1.8] min-h-[190px] whitespace-pre-wrap">
        <HighlightedCode text={typed} />
        <span className="inline-block w-[9px] h-[1.1em] bg-g-blue align-text-bottom animate-blink"></span>
      </pre>
    </div>
  )
}
