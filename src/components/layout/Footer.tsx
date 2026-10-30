import { GOOGLE_BARS } from '../../constants/theme'

/** コピーライトの年(読み込み時に1回だけ決める) */
const COPYRIGHT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      {/* Googleっぽい4色のライン */}
      <div className="flex h-1">
        {GOOGLE_BARS.map((color) => (
          <div key={color} className={'flex-1 ' + color}></div>
        ))}
      </div>
      <p className="py-6 text-center text-sm text-neutral-600">
        &copy; {COPYRIGHT_YEAR} Code is Fun! All rights reserved.
      </p>
    </footer>
  )
}
