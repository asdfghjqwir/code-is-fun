import { useAmida } from '../../../hooks/useAmida'
import { Section } from '../../common/Section'
import { AmidaBoard } from './AmidaBoard'
import { AmidaResult } from './AmidaResult'

export function AmidaSection() {
  const amida = useAmida()

  return (
    <Section
      id="amida"
      tone="yellow"
      eyebrow="LANGUAGE LOTTERY"
      title="あみだくじで言語えらび"
      subtitle="作りたいものを選ぶと、あみだくじがおすすめの言語を教えてくれるよ！"
    >
      <div className="grid gap-8 md:grid-cols-2 items-start max-w-[900px] mx-auto">
        <AmidaBoard amida={amida} />
        <AmidaResult amida={amida} />
      </div>
    </Section>
  )
}
