import { useState } from 'react'
import { NAV_LINKS } from '../../data/nav'
import { Logo } from './Logo'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <nav className="max-w-[1040px] mx-auto px-5 flex items-center justify-between h-16">
        <Logo />

        {/* メニュー(PC) */}
        <ul className="hidden lg:flex items-center gap-1 list-none p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block px-3 py-2 rounded-lg text-sm font-semibold no-underline text-neutral-600 hover:bg-g-tint hover:text-g-blue transition"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 右側のボタン */}
        <div className="flex items-center gap-2">
          <a
            href="#try"
            className="hidden lg:inline-block px-4 py-2 rounded-lg text-sm font-bold no-underline bg-g-blue text-white hover:opacity-80 transition"
          >
            コードを触る
          </a>
          {/* ハンバーガー(スマホ) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
            className="lg:hidden w-10 h-10 rounded-lg border border-neutral-300 text-lg cursor-pointer hover:bg-neutral-100 transition"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* メニュー(スマホ) */}
      {menuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white">
          <ul className="max-w-[1040px] mx-auto px-5 py-3 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 font-semibold no-underline text-neutral-700 border-b border-neutral-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
