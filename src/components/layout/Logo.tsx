import { LOGO_COLORS, pickByIndex } from '../../constants/theme'

/** ヘッダーのロゴ(文字が4色で並ぶ) */
export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 no-underline text-[#3c4043]">
      <span className="w-8 h-8 rounded-lg bg-g-blue text-white grid place-items-center font-mono font-black text-sm">
        {'</>'}
      </span>
      <span className="font-extrabold text-lg tracking-tight">
        {'Code is Fun!'.split('').map((ch, i) => (
          <span key={i} style={{ color: pickByIndex(LOGO_COLORS, i) }}>
            {ch}
          </span>
        ))}
      </span>
    </a>
  )
}
