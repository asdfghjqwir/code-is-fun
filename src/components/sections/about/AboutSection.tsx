import { PROFILE } from '../../../data/profile'
import { Section } from '../../common/Section'
import { PersonalityCard } from './PersonalityCard'
import { ProfileCard } from './ProfileCard'
import { SkillsHistoryCard } from './SkillsHistoryCard'

export function AboutSection() {
  return (
    <Section id="about" tone="blue" eyebrow="ABOUT" title="このページを作った人" subtitle="ちょっとだけ自己紹介">
      <div className="grid gap-6 lg:grid-cols-3 items-stretch">
        <ProfileCard profile={PROFILE} />
        <SkillsHistoryCard profile={PROFILE} />
        <PersonalityCard profile={PROFILE} />
      </div>
      <p className="text-center text-xs opacity-60 mt-8">※この人物は架空の人物です(フィクション)</p>
    </Section>
  )
}
