import type { ReactNode } from 'react'
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from '../../constants/theme'
import { cn } from '../../lib/cn'

interface LinkButtonProps {
  href: string
  variant?: 'primary' | 'secondary'
  className?: string
  children: ReactNode
}

/** 立体的な大きいリンクボタン */
export function LinkButton({ href, variant = 'primary', className, children }: LinkButtonProps) {
  return (
    <a href={href} className={cn(variant === 'primary' ? PRIMARY_BUTTON : SECONDARY_BUTTON, className)}>
      {children}
    </a>
  )
}
