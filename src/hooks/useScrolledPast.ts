import { useEffect, useState } from 'react'

/** ページが threshold(px) より下までスクロールされたら true */
export function useScrolledPast(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
