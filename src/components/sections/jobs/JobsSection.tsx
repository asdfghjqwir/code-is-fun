import { useState } from 'react'
import type { MouseEvent } from 'react'
import { JOBS } from '../../../data/jobs'
import { useConfetti } from '../../confetti/ConfettiContext'
import { Section } from '../../common/Section'
import { JobCard } from './JobCard'

export function JobsSection() {
  const [liked, setLiked] = useState<string[]>([])
  const confetti = useConfetti()

  // 「気になる！」を押した職種を覚える(もう一度押すと外す)
  function toggleLike(e: MouseEvent<HTMLButtonElement>, title: string) {
    if (liked.includes(title)) {
      setLiked(liked.filter((t) => t !== title))
    } else {
      setLiked([...liked, title])
      confetti.burstFromElement(e)
    }
  }

  return (
    <Section
      id="jobs"
      tone="inverse"
      eyebrow="JOBS"
      title="エンジニアって、どんな仕事？"
      subtitle="プログラミングを仕事にすると、こんな「作る人」になれる！"
      subtitleMargin="mb-3"
      headingExtra={
        <p className="text-center font-bold mb-12">
          気になる職種: {liked.length} / {JOBS.length}
        </p>
      }
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-5">
        {JOBS.map((job) => (
          <JobCard
            key={job.title}
            job={job}
            liked={liked.includes(job.title)}
            onToggleLike={(e) => toggleLike(e, job.title)}
          />
        ))}
      </div>
    </Section>
  )
}
