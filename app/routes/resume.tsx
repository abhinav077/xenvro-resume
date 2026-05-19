import React, { useEffect, useState } from 'react'
import { Header } from '~/components/layout/header';
import { SceneBackground } from '~/components/layout/scene-background';
import { usePuterStore } from '~/lib/puter'
import { useMediaQuery } from '~/hooks/use-media-query'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router'
import Summary from '~/components/layout/Summary';
import ATS from '~/components/layout/ATS';
import Details from '~/components/layout/Details';

export const meta = () => ([
  {title: 'Xenvro | Review'},
  {name: 'description', content: 'Detailed review of your resume'},
])


const resume = () => {

const isMobile = useMediaQuery('(max-width: 768px)')

const {auth, isLoading, fs, kv} = usePuterStore();
const {id} = useParams();
const [imageUrl, setImageUrl] = useState('')
const [resumeUrl, setResumeUrl] = useState('')
const [feedback, setFeedback] = useState<Feedback | null>(null)
const navigate = useNavigate();

useEffect(()=>{
    if(!isLoading && !auth.isAuthenticated) navigate('/auth?next=/resume/${id}')
  }),[isLoading]

useEffect(() => {
    const loadResume = async () => {
        const resume = await kv.get(`resume:${id}`)
         if(!resume) return;
    
        const data = JSON.parse(resume)
        
        const resumeBlob = await fs.read(data.resumePath)
        if(!resumeBlob) return;

        const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'})
        const resuleUrl = URL.createObjectURL(pdfBlob)
        setResumeUrl(resuleUrl);
        
        const imageBlob = await fs.read(data.imagePath)
        if(!imageBlob) return;
        
        const imageUrl = URL.createObjectURL(new Blob([imageBlob], {type: 'image/png'}))
        setImageUrl(imageUrl)
        console.log({resuleUrl, imageUrl, feedback: data.feedback})

        setFeedback(data.feedback)
    }
    loadResume();
}, [id])



  return (
    <SceneBackground>
        <main>
            <Header isMobile={isMobile}/>
            <div className='flex flex-row w-full max-lg:flex-col-reverse'>
                <section className='feedback-section'>
                    {imageUrl && resumeUrl && (
                        <div className='animate-in fade-in duration-000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit'>
                            <a href={resumeUrl} target='_blank' rel='noopener noreferrer'>
                                <img src={imageUrl} className='w-full h-full object-contain rounded-2xl' alt='resume'></img>
                            </a>
                        </div>
                    )}
                </section>
                <section className='feedback-section'>
                    <h2 className='font-hero text-4xl! text-black! font-bold  '>Resume Review</h2>
                    {feedback ? (
                        <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>  
                            <Summary feedback={feedback}/>
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
                            <Details feedback={feedback} />                     
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" className='w-full' />
                    )}
                </section>
            </div>
        </main>
    </SceneBackground>
  )
}

export default resume