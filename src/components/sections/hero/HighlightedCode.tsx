interface HighlightedCodeProps {
  text: string
}

/** ターミナルのコードを、1行ずつ色分けして表示する */
export function HighlightedCode({ text }: HighlightedCodeProps) {
  return (
    <>
      {text.split('\n').map((line, i) => {
        if (line.startsWith('#')) {
          return (
            <div key={i} className="text-neutral-600 italic">
              {line}
            </div>
          )
        }
        if (line.startsWith('print')) {
          return (
            <div key={i}>
              <span className="text-g-blue font-bold">print</span>
              <span className="text-g-green">{line.replace('print', '')}</span>
            </div>
          )
        }
        if (line.startsWith('>')) {
          return (
            <div key={i} className="text-g-red font-bold">
              {line}
            </div>
          )
        }
        return <div key={i}>{line || ' '}</div>
      })}
    </>
  )
}
