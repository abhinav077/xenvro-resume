import React,{useState, type FormEvent} from 'react'
import { useNavigate } from 'react-router'
import { Header } from '~/components/layout/header'
import { SceneBackground } from '~/components/layout/scene-background'
import FileUploader from '~/components/ui/FileUploader'
import { useMediaQuery } from '~/hooks/use-media-query'
import { convertPdfToImage } from '~/lib/pdf2img'
import { usePuterStore } from '~/lib/puter'
import { generateUUID } from '~/lib/utils'
import { prepareInstructions } from '../../constants'


const upload = () => {

    const{auth, isLoading, fs, ai, kv} = usePuterStore();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [isProcessing, setisProcessing] = useState(false);
    const [statusText, setstatusText] = useState('')
    const [file, setFile] = useState<File>()



    const handleFileSelect = (file: File | null) => {    
        setFile(file ?? undefined)
    }

    const handleAnalyze = async({companyName, jobTitle, jobDescription, file}:{companyName: string, jobDescription: string, jobTitle: string, file: File}) => {
        const ownerId = auth.user?.uuid;
        if(!ownerId) {
            setstatusText('Error: Please log in before uploading your resume');
            return;
        }

        setisProcessing(true)
        setstatusText('Uploading the file....')

        const uploadedFile = await fs.upload([file]);

        if(!uploadedFile) return setstatusText('Error: Failed to upload file');
        
        setstatusText('Converting to image...')
        const imageFile = await convertPdfToImage(file)
        if(!imageFile.file) return setstatusText('Error: Failed to covert pdf to image');

        setstatusText('Uploading the image...')

        const uploadedImage = await fs.upload([imageFile.file])
        
        if(!uploadedImage) return setstatusText('Error: Failed to upload image');

        setstatusText('Preparing data...')

        const uuid = generateUUID();
        const data = {
            id:uuid,
            ownerId,
            imagePath: uploadedImage.path,
            resumePath: uploadedFile.path,
            companyName, jobDescription, jobTitle,
            feedback: null,

        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setstatusText("Anayzing...")

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle, jobDescription})

        )

        if(!feedback) return setstatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;
            
        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setstatusText('Analysis complete, redirecting...')    
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name')  as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string; 

        if(!file) return;

        handleAnalyze({companyName, jobTitle, jobDescription, file});

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
