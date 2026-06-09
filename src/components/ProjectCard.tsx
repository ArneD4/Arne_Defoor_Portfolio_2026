import { Link } from 'react-router-dom';
import type { Project } from '../data/content';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <img src={project.cardImage} alt={project.title} />
      <div className="project-card-copy">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
    </Link>
  );
}
