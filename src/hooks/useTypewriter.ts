import { useEffect, useState } from 'react'

/** text を 1 文字ずつ打つように見せる。いま見せる分の文字列を返す */
export function useTypewriter(text: string, intervalMs: number): string {
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (length >= text.length) return
    const timer = setTimeout(() => {
      setLength(length + 1)
    }, intervalMs)
    return () => clearTimeout(timer)
  }, [length, text, intervalMs])

  return text.slice(0, length)
}
