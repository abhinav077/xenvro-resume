import React, { useEffect, useState } from 'react'
import { ScrollReveal } from '~/components/ui/scroll-reveal'
import ResumeCard from '../cards/ResumeCard';
import { usePuterStore } from '~/lib/puter';

export const HeroSection = () => {
  const timelineRef = React.useRef<HTMLDivElement>(null)
  const sceneRef = React.useRef<HTMLDivElement>(null);

  const { kv, auth, isLoading } = usePuterStore();

  const [resumes, setResumes] = useState<Resume[]>([])
  const [loadingResume, setLoadingResume] = useState(false)

  const hasCompleteFeedback = (feedback: Resume['feedback']): feedback is Feedback => {
    if (!feedback || typeof feedback !== 'object') return false;

    return Boolean(
      feedback.ATS?.score !== undefined &&
      feedback.content?.score !== undefined &&
      feedback.skills?.score !== undefined &&
      feedback.overallScore !== undefined
    );
  };

  useEffect(() => {
    const loadResumes = async () => {
      if (!auth.isAuthenticated || !auth.user?.uuid) {
        setResumes([]);
        setLoadingResume(false);
        return;
      }

      setLoadingResume(true);
      const resumeEntries = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = (resumeEntries || [])
        .map((resume) => {
          try {
            return JSON.parse(resume.value) as Resume;
          } catch {
            return null;
          }
        })
        .filter((resume): resume is Resume => {
          if (!resume) return false;
          if (resume.ownerId !== auth.user?.uuid) return false;
          return hasCompleteFeedback(resume.feedback);
        });

      setResumes(parsedResumes);
      setLoadingResume(false);
    };

    loadResumes();
  }, [auth.isAuthenticated, auth.user?.uuid, kv])
  

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
          Smarter Resume Insights <br />  for Better Opportunities 
        </ScrollReveal>

        <ScrollReveal
          as="p"
          animationNum={2}
          timelineRef={timelineRef}
          className="text-xl md:text-2xl text-black font-medium max-w-3xl mx-auto leading-relaxed px-4"
        >
          {isLoading ? (
            "Checking your account..."
          ) : !auth.isAuthenticated ? (
            "Sign in to upload your resume and receive AI-powered feedback for your job applications."
          ) : loadingResume ? (
            "Loading your resume submissions..."
          ) : resumes.length === 0 ? (
            "No resume found. Upload your resume to get started and receive AI-powered feedback to optimize your job applications."
          ) : (
            "Review your submissions and check AI-powered feedback."
          )}
          {loadingResume && (
            <div className='flex flex-col items-center justify-center'>
              <img src="/images/resume-scan-2.gif" className='w-[200px]'/>
            </div>
          )}
        </ScrollReveal>

      </div>

      {/*Resumes*/}

      {!loadingResume && auth.isAuthenticated && resumes.length > 0 && (
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
