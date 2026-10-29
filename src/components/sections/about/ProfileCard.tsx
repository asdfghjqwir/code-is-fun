import { GOOGLE_BGS, pickByIndex } from '../../../constants/theme'
import { cn } from '../../../lib/cn'
import type { Profile } from '../../../types'
import { Card } from '../../common/Card'

/** 箱1: プロフィール */
export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Card className="border-t-4 border-t-g-blue px-6 py-8 text-center">
      <div className="w-[88px] h-[88px] rounded-full grid place-items-center font-black text-4xl mx-auto mb-4 bg-g-blue text-white">
        {profile.name.charAt(0)}
      </div>
      <h3 className="text-2xl font-black">{profile.name}</h3>
      <p className="text-xs text-neutral-600 mb-3">{profile.kana}</p>
      <p className="text-neutral-600 font-bold mb-5">
        {profile.age}歳 / {profile.job}
      </p>
      <dl className="text-sm text-left space-y-2 border-t border-neutral-200 pt-5 mb-5">
        <div className="flex justify-between">
          <dt className="text-neutral-600">出身 / 在住</dt>
          <dd className="font-bold">{profile.place}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-600">プログラミング歴</dt>
          <dd className="font-bold">{profile.years}年</dd>
        </div>
      </dl>
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {profile.favorite.map((name, i) => (
          <span key={name} className={cn('px-3 py-1 rounded-full text-xs font-bold', pickByIndex(GOOGLE_BGS, i))}>
            {name}
          </span>
        ))}
      </div>
      <p className="border-t border-neutral-200 pt-5 text-sm">「{profile.comment}」</p>
    </Card>
  )
}
