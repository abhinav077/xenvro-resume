import React from 'react'
import { Header } from '~/components/layout/header'
import { ScrollReveal } from '~/components/ui/scroll-reveal'
// import { EcommerceDash } from '../../assets/index'
import { useMediaQuery } from '~/hooks/use-media-query'

export const HeroSection = () => {
  const timelineRef = React.useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section
      ref={timelineRef}
      className="min-h-screen bg-[#f7f9fc] text-[#1e293b] relative overflow-hidden flex flex-col items-center"
    >
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-50" />

      <svg
        width="358"
        height="483"
        viewBox="0 0 358 483"
        className="absolute top-0 z-1 left-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_0_1)">
          <rect
            x="-86.9961"
            y="-33.114"
            width="72"
            height="541"
            rx="36"
            transform="rotate(-30.8182 -86.9961 -33.114)"
            fill="url(#paint0_linear_0_1)"
          />
        </g>
        <g filter="url(#filter1_f_0_1)">
          <rect
            x="-17"
            y="-135.113"
            width="50.0937"
            height="541"
            rx="25.0469"
            transform="rotate(-30.8182 -17 -135.113)"
            fill="url(#paint1_linear_0_1)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_0_1"
            x="-137.641"
            y="-120.646"
            width="440.285"
            height="602.787"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="32"
              result="effect1_foregroundBlur_0_1"
            />
          </filter>
          <filter
            id="filter1_f_0_1"
            x="-71.707"
            y="-215.486"
            width="429.598"
            height="599.69"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="32"
              result="effect1_foregroundBlur_0_1"
            />
          </filter>
          <linearGradient
            id="paint0_linear_0_1"
            x1="-50.9961"
            y1="-33.114"
            x2="-50.9961"
            y2="507.886"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#91bbfb" />
            <stop offset="1" stopColor="#E6F1FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_0_1"
            x1="8.04686"
            y1="-135.113"
            x2="8.04686"
            y2="405.887"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8dbafd" />
            <stop offset="1" stopColor="#c1d9f8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Soft Background Gradients */}
      <ScrollReveal
        timelineRef={timelineRef}
        animationNum={5}
        className="absolute top-0 left-0 w-full h-[600px] bg-linear-to-b from-blue-50 via-blue-100 to-transparent opacity-100"
      />
      <Header isMobile={isMobile} timelineRef={timelineRef} />
      {/* Hero Content */}
      <div className="relative z-10 text-center pt-24 pb-16 px-4 flex flex-col gap-6">
        <ScrollReveal
          animationNum={2}
          timelineRef={timelineRef}
          className="bg-white w-fit mx-auto text-black px-0.5 py-0.5 rounded-full inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 border-2 border-white"
        >
          <span className="bg-linear-to-br from-blue-500 to-blue-200 text-white px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-widest">
            Smart Resume Analysis
          </span>
        </ScrollReveal>

        <ScrollReveal
          as="h1"
          animationNum={2}
          timelineRef={timelineRef}
          className="sm:text-6xl text-5xl md:text-8xl font-medium tracking-tight text-neutral-900 max-w-6xl font-hero font "
        >
          Track Your Applications <br />  & Resume Ratings
        </ScrollReveal>

        <ScrollReveal
          as="p"
          animationNum={3}
          timelineRef={timelineRef}
          className="text-xl md:text-1.5xl text-black font-medium max-w-3xl mx-auto leading-relaxed px-4 font-"
        >
          Review your submissons and check AI-powered feedback.
        </ScrollReveal>

        <div className="flex gap-4 justify-center">
          <ScrollReveal
            as="button"
            animationNum={4}
            timelineRef={timelineRef}
            className="px-4 gradient-button text-white text-xl rounded-lg shadow-sm py-2.5  hover:cursor-pointer "
          >
            Get Started
          </ScrollReveal>

        </div>
      </div>

      {/* Dashboard UI Frame */}
      <div className="w-full max-w-7xl mx-auto rounded-xl relative mt-10">
        <ScrollReveal
          animationNum={6}
          timelineRef={timelineRef}
          className="rounded-2xl bg-white/50 backdrop-blur-lg p-4"
        >
          <ScrollReveal
            animationNum={7}
            as="img"
            timelineRef={timelineRef}
            // @ts-ignore
            // src={EcommerceDash?.src}
            alt="phoneMockUP"
            className="w-full relative z-4 rounded-2xl"
          />
        </ScrollReveal>
      </div>
    </section>
  )
}
