import type { Profile } from '../../../types'
import { Card } from '../../common/Card'

/** 箱3: 人柄(自己紹介・趣味・目標) */
export function PersonalityCard({ profile }: { profile: Profile }) {
  return (
    <Card className="border-t-4 border-t-g-green px-6 py-8">
      <h3 className="font-bold text-lg mb-3">自己紹介</h3>
      <p className="text-sm text-neutral-600 mb-8">{profile.bio}</p>
      <h3 className="font-bold text-lg mb-3 border-t border-neutral-200 pt-6">趣味</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {profile.hobbies.map((hobby) => (
          <span key={hobby} className="px-3 py-1 rounded-full text-xs font-bold bg-g-tint text-g-blue">
            {hobby}
          </span>
        ))}
      </div>
      <h3 className="font-bold text-lg mb-3 border-t border-neutral-200 pt-6">いまの目標</h3>
      <p className="text-sm text-neutral-600 mb-3">{profile.goal}</p>
      <p className="text-xs font-bold">座右の銘: 「{profile.motto}」</p>
    </Card>
  )
}
