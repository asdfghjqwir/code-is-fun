import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
}

/** 白い丸角のカード(影つき) */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-neutral-200 rounded-[22px] shadow-[0_10px_28px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
