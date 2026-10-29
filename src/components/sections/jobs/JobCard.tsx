import type { MouseEvent } from 'react'
import { cn } from '../../../lib/cn'
import type { Job } from '../../../types'

interface JobCardProps {
  job: Job
  liked: boolean
  onToggleLike: (e: MouseEvent<HTMLButtonElement>) => void
}

/** 職種ごとのラベルと説明の行 */
function Row({ label, children, mono }: { label: string; children: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-bold opacity-85">{label}</dt>
      <dd className={mono ? 'font-mono' : undefined}>{children}</dd>
    </div>
  )
}

export function JobCard({ job, liked, onToggleLike }: JobCardProps) {
  return (
    <div className="flex flex-col rounded-2xl p-6 border border-white/30 bg-white/10 transition hover:-translate-y-1">
      <div className="text-3xl mb-3">{job.icon}</div>
      <h3 className="font-bold text-lg mb-3">{job.title}</h3>
      <dl className="text-sm leading-6 mb-5 space-y-2">
        <Row label="作っているもの">{job.makes}</Row>
        <Row label="たとえば">{job.example}</Row>
        <Row label="よく使う言語" mono>
          {job.langs}
        </Row>
        <Row label="こんな人に向いてる">{job.type}</Row>
      </dl>
      <button
        type="button"
        onClick={onToggleLike}
        className={cn(
          'mt-auto w-full py-2.5 rounded-xl font-bold text-sm border-2 cursor-pointer transition active:scale-95',
          liked ? 'bg-white text-g-blue border-white' : 'border-white/70 hover:bg-white/15',
        )}
      >
        {liked ? '気になる ✓' : '気になる！'}
      </button>
    </div>
  )
}
