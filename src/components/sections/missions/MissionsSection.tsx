import { useConfetti } from '../../confetti/ConfettiContext'
import { useMissions } from '../../../hooks/useMissions'
import { Section } from '../../common/Section'
import { DrawPlayground } from './DrawPlayground'
import { MissionBadges } from './MissionBadges'
import { MissionPanel } from './MissionPanel'
import { MissionTabs } from './MissionTabs'

export function MissionsSection() {
  const confetti = useConfetti()
  const missions = useMissions((allClear) => confetti.burstAtCenter(allClear ? 60 : 24))

  return (
    <Section
      id="try"
      tone="blue"
      eyebrow="TRY IT"
      title="コードを書き換えてみよう"
      subtitle="自由にいじってOK。壊れないから安心して！"
      subtitleMargin="mb-10"
    >
      <div className="max-w-[760px] mx-auto">
        <MissionBadges cleared={missions.cleared} />
        <MissionTabs current={missions.mission} cleared={missions.cleared} onSelect={missions.setMission} />
        <MissionPanel missions={missions} />
      </div>
      <DrawPlayground />
    </Section>
  )
}
