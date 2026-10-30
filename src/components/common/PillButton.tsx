import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface PillButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'> {
  /** accent: 青い枠 / muted: グレーの枠 */
  variant?: 'accent' | 'muted'
  size?: 'md' | 'sm'
}

/** 丸いボタン(ミッションの選択肢などに使う) */
export function PillButton({ variant = 'accent', size = 'md', children, ...rest }: PillButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-full font-bold border-2 bg-white cursor-pointer transition',
        size === 'md' ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs',
        variant === 'accent'
          ? 'border-g-blue text-g-blue hover:bg-g-blue-tint active:scale-95'
          : 'border-neutral-300 text-neutral-600 hover:bg-neutral-100',
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
