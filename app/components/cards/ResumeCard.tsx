import { Link } from 'react-router'
import { usePuterStore } from '~/lib/puter';
import React, { useEffect, useState } from 'react'

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
  if (!feedback || typeof feedback !== 'object') {
    return null;
  }

  const metrics = [
    { label: 'ATS', value: feedback.ATS?.score ?? 0 },
    { label: 'Content', value: feedback.content?.score ?? 0 },
    { label: 'Skills', value: feedback.skills?.score ?? 0 },
  ]

    const [resumeUrl, setResumeUrl] = useState('')

    const { fs } = usePuterStore();
  
    useEffect(() => {
      let objectUrl = '';

      const loadResume = async() => {
        const blob = await fs.read(imagePath);
        if(!blob) return;
        objectUrl = URL.createObjectURL(blob);
        setResumeUrl(objectUrl)
  
      }
      
      loadResume();

      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    }, [fs, imagePath])

  if (!resumeUrl) {
    return null;
  }
  

  return (

    <Link
      to={`/resume/${id}`}
      className="resume-card group"
      aria-label={`Open resume analysis for ${companyName} ${jobTitle}`}
    >
      <div className="resume-card-header">
        <div className="min-w-0">
          <p className="resume-card-kicker">Analyzed resume</p>
          {companyName && <h2 className="resume-card-title">{companyName}</h2>}
          {jobTitle && <h3 className="resume-card-subtitle">{jobTitle}</h3>}
          {!companyName && !jobTitle && <h2 className='text-black! font-bold'>Resume</h2>}
        </div>

        <div className="resume-score-badge">
          <span>{feedback.overallScore}</span>
          <small>/100</small>
        </div>
      </div>

      <div className="resume-preview-frame">
        <img
          src={resumeUrl}
          alt={`${companyName} ${jobTitle} resume preview`}
          className="resume-preview-image"
        />
      </div>


        <div className="resume-card-metrics" aria-label="Resume score breakdown">
        {metrics.map((metric) => (
          <div key={metric.label} className="resume-card-metric">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
    </Link>
  )
}

export default ResumeCard
