import { LinkButton } from '../../common/LinkButton'
import { Terminal } from './Terminal'

export function Hero() {
  return (
    <div className="relative pt-[90px] pb-[110px] text-center">
      {/* ふわふわ浮かぶ丸 */}
      <div className="absolute w-[260px] h-[260px] rounded-full bg-g-blue opacity-25 blur-[4px] animate-float top-5 -left-[60px]"></div>
      <div className="absolute w-[150px] h-[150px] rounded-full bg-g-red opacity-25 blur-[4px] animate-float top-[240px] right-[4%] [animation-delay:-2s]"></div>
      <div className="absolute w-[90px] h-[90px] rounded-full bg-g-yellow opacity-50 blur-[4px] animate-float bottom-[50px] left-[14%] [animation-delay:-4s]"></div>

      <div className="relative z-[1] max-w-[1040px] mx-auto px-5">
        <span className="inline-block bg-g-yellow text-neutral-900 font-extrabold px-4 py-1 rounded-full text-sm -rotate-3">
          WELCOME, ADVENTURER!
        </span>
        <h1 className="text-[clamp(38px,8vw,84px)] leading-[1.15] my-[22px] font-black">
          プログラミングって、<br />
          <em className="not-italic bg-[linear-gradient(90deg,#4285f4,#ea4335,#fbbc05,#34a853)] bg-clip-text text-transparent">
            めっちゃ面白い！
          </em>
        </h1>
        <p className="text-neutral-600 text-[clamp(16px,2.4vw,20px)] max-w-[560px] mx-auto mb-[34px]">
          書いたら動く。壊したら学べる。解けたら最高。<br />
          むずかしそう？ 大丈夫。このページの下で、いますぐコードを触れるよ。
        </p>
        <LinkButton href="#try">さっそく試す ▶</LinkButton>
        <LinkButton href="#jobs" variant="secondary" className="ml-0 mt-[14px] sm:mt-0 sm:ml-3">
          職種を見る
        </LinkButton>

        <Terminal />
      </div>
    </div>
  )
}
