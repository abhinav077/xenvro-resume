import React,{useState, type FormEvent} from 'react'
import { Header } from '~/components/layout/header'
import { SceneBackground } from '~/components/layout/scene-background'
import FileUploader from '~/components/ui/FileUploader'
import { useMediaQuery } from '~/hooks/use-media-query'


const upload = () => {

    const isMobile = useMediaQuery('(max-width: 768px)')
    const [isProcessing, setisProcessing] = useState(false);
    const [statusText, setstatusText] = useState('')
    const [file, setFile] = useState<File | null>(null)



    const handleFileSelect =(file:File)=>{    
        setFile(file)
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name')
        const jobTitle = formData.get('job-title')
        const jobDescription = formData.get('job-description')

        console.log({
            companyName, jobDescription, jobTitle, file
    })

    }

    

  return (
    <SceneBackground>
        <main>
            <Header isMobile={isMobile}/>
            <section className='main-section'>
                <div className='page-heading py-16'>
                    <h1 className='font-hero'>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className='w-full' />
                        </>
                    ) : (
                        <h2>Drop your resume for ATS score and impovement tips.</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                            <div className='form-div'>
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name='company-name' placeholder='Company Name' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name='job-title' placeholder='Job Title' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name='job-description' placeholder='Job Description' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect}/>
                            </div>
                            <button className='gradient-button w-full py-2 rounded-lg shadow-sm text-white hover:cursor-pointer text-xl'>Analyze Resume</button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    </SceneBackground>
  )
}

export default upload