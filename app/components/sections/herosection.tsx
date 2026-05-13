import React from 'react'
import { ScrollReveal } from '~/components/ui/scroll-reveal'
import { resumes } from "../../../constants";
import ResumeCard from '../cards/ResumeCard';
export const HeroSection = () => {
  const timelineRef = React.useRef<HTMLDivElement>(null)
  const sceneRef = React.useRef<HTMLDivElement>(null);

  return (
    
    <section
      ref={timelineRef}
      className="relative flex min-h-screen flex-col items-center text-[#1e293b]"
    >
       <ScrollReveal
                timelineRef={sceneRef}
                animationNum={4}
                className="absolute top-0 left-0 z-0 h-[600px] w-full bg-linear-to-b from-blue-50 via-blue-100 to-transparent opacity-100"
              />

      {/* Hero Content */}

      <div className="relative z-10 text-center pt-24 pb-16 px-4 flex flex-col gap-6">
        <ScrollReveal
          animationNum={2}
          timelineRef={timelineRef}
          className="bg-white w-fit mx-auto text-black px-0.5 py-0.5 rounded-full inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 border-2 border-white"
        >
          <span className="px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-widest text-gradient">
            Smart Resume Analysis
          </span>
        </ScrollReveal>

        <ScrollReveal
          as="h1"
          animationNum={2}
          timelineRef={timelineRef}
          className="sm:text-6xl text-5xl md:text-8xl font-medium tracking-tight text-neutral-900 max-w-6xl font-hero"
        >
          Track Your Applications <br />  & Resume Ratings
        </ScrollReveal>

        <ScrollReveal
          as="p"
          animationNum={2}
          timelineRef={timelineRef}
          className="text-xl md:text-1.5xl text-black font-medium max-w-3xl mx-auto leading-relaxed px-4"
        >
          Review your submissons and check AI-powered feedback.
        </ScrollReveal>

        <div className="flex gap-4 justify-center">
          <ScrollReveal
            as="button"
            animationNum={2}
            timelineRef={timelineRef}
            className="px-4 gradient-button text-white text-xl rounded-lg shadow-sm py-2.5  hover:cursor-pointer "
          >
            Get Started
          </ScrollReveal>

        </div>
      </div>

      {/*Resumes*/}

      {resumes.length>0 &&(
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ScrollReveal
              animationNum={3}
              timelineRef={timelineRef}
            >
              <div>
                <ResumeCard key={resume.id} resume={resume} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

     
    </section>
  )
}
