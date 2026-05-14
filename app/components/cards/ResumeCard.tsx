import { Link } from 'react-router'

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
  const metrics = [
    { label: 'ATS', value: feedback.ATS.score },
    { label: 'Content', value: feedback.content.score },
    { label: 'Skills', value: feedback.skills.score },
  ]

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card group"
      aria-label={`Open resume analysis for ${companyName} ${jobTitle}`}
    >
      <div className="resume-card-header">
        <div className="min-w-0">
          <p className="resume-card-kicker">Analyzed resume</p>
          <h2 className="resume-card-title">{companyName}</h2>
          <h3 className="resume-card-subtitle">{jobTitle}</h3>
        </div>

        <div className="resume-score-badge">
          <span>{feedback.overallScore}</span>
          <small>/100</small>
        </div>
      </div>

      <div className="resume-preview-frame">
        <img
          src={imagePath}
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
