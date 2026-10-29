import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { cn } from '../../lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
}

/** スクロールで画面に入ったら、ふわっと現れる入れ物 */
export function Reveal({ children, className }: RevealProps) {
  const [ref, shown] = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
