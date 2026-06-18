import { content } from '../../data/content';
import { AboutCard } from '../AboutCard';
import { SectionHeading } from '../ui/SectionHeading';

export function AboutSummarySection() {
  const { about } = content;
  
  console.log(content)
  return (
    <section className="about-summary-section">
      <SectionHeading
        eyebrow="About"
        title={about.heading}
        description={about.description}
        image='https://d4dev.be/Images/Profo.png'
      />

        <div className="about-stack-section">
          <h2>Work Experience</h2>
          <div className="timeline-list">
            {(about.workExperience || []).map((item) => (
              <AboutCard
                key={`${item.company}-${item.years}`}
                item={{
                  title: item.company,
                  subtitle: item.role,
                  focus: item.focus,
                  years: item.years,
                  href: item.companyUrl,
                }}
              />
            ))}
          </div>
        </div>
        
      <div className="about-stack">
        <div className="about-stack-section">
          <h2>Education</h2>
          <div className="timeline-list">
            {(about.education || []).map((item) => (
              <AboutCard
                key={`${item.institution}-${item.years}`}
                item={{
                  title: item.institution,
                  subtitle: item.degree,
                  focus: item.focus,
                  years: item.years,
                  href: item.institutionUrl,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
