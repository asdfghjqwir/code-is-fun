import { useScrolledPast } from '../../hooks/useScrolledPast'
import { cn } from '../../lib/cn'

/** 400px 以上スクロールしたら右下に出る「トップへ戻る」ボタン(4色のリング) */
export function BackToTop() {
  const visible = useScrolledPast(400)

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="ページの先頭へ戻る"
      className={cn(
        'fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full p-[4px] bg-[conic-gradient(#1a73e8,#d93025,#fbbc05,#188038,#1a73e8)] shadow-[0_6px_16px_rgba(0,0,0,0.25)] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:rotate-[360deg]',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      )}
    >
      <span className="w-full h-full rounded-full bg-white grid place-items-center text-g-blue text-xl font-black">
        ↑
      </span>
    </button>
  )
}
