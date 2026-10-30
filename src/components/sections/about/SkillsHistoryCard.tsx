import { GOOGLE_BARS, pickByIndex } from '../../../constants/theme'
import { cn } from '../../../lib/cn'
import type { Profile } from '../../../types'
import { Card } from '../../common/Card'

/** 箱2: スキルとこれまで */
export function SkillsHistoryCard({ profile }: { profile: Profile }) {
  return (
    <Card className="border-t-4 border-t-g-red px-6 py-8">
      <h3 className="font-bold text-lg mb-4">スキル</h3>
      <div className="space-y-3 mb-8">
        {profile.skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-bold">{skill.name}</span>
              <span className="text-neutral-600">{skill.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-200">
              <div
                className={cn('h-2 rounded-full', pickByIndex(GOOGLE_BARS, i))}
                style={{ width: skill.level + '%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <h3 className="font-bold text-lg mb-4 border-t border-neutral-200 pt-6">これまで</h3>
      <ol className="border-l-2 border-neutral-200 ml-2 space-y-4 list-none p-0">
        {profile.history.map((item) => (
          <li key={item.year} className="relative pl-6">
            <span className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-g-red"></span>
            <p className="text-xs font-bold text-neutral-600">{item.year}</p>
            <p className="text-sm">{item.text}</p>
          </li>
        ))}
      </ol>
    </Card>
  )
}
