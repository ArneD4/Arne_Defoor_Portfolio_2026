import { Link } from 'react-router-dom';
import { content } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';

export function ProjectShowcaseSection() {
  return (
    <section className="project-showcase-section">
      <SectionHeading
        eyebrow="Selected work"
        title="Recent projects"
        description="A flexible project grid for all your portfolio entries."
      />

      <div className="project-grid">
        {content.projects.map((project) => (
          <Link key={project.slug} to={`/projects/${project.slug}`} className="project-card">
            <img src={project.cardImage} alt={project.title} />
            <div className="project-card-copy">
              <p className="eyebrow">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
