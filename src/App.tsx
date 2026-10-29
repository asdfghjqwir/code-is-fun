import { ConfettiProvider } from './components/confetti/ConfettiProvider'
import { BackToTop } from './components/layout/BackToTop'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { AboutSection } from './components/sections/about/AboutSection'
import { AmidaSection } from './components/sections/amida/AmidaSection'
import { FamiliarSection } from './components/sections/familiar/FamiliarSection'
import { FaqSection } from './components/sections/faq/FaqSection'
import { Hero } from './components/sections/hero/Hero'
import { JobsSection } from './components/sections/jobs/JobsSection'
import { LoopSection } from './components/sections/loop/LoopSection'
import { MissionsSection } from './components/sections/missions/MissionsSection'
import { StartSection } from './components/sections/start/StartSection'
import { WhySection } from './components/sections/why/WhySection'

function App() {
  return (
    <ConfettiProvider>
      <div className="bg-white text-[#3c4043] font-sans leading-[1.7] overflow-x-hidden transition-colors duration-300">
        <Header />
        <main id="top">
          <Hero />
          <FamiliarSection />
          <MissionsSection />
          <WhySection />
          <LoopSection />
          <AmidaSection />
          <JobsSection />
          <StartSection />
          <FaqSection />
          <AboutSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ConfettiProvider>
  )
}

export default App
