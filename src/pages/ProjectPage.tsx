import { useParams, Link } from 'react-router-dom';
import { content } from '../data/content';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = content.projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="page page-project">
        <h2>Project not found</h2>
        <p>The project you are looking for does not exist.</p>
        <Link to="/">Back to home</Link>
      </section>
    );
  }

  return (
    <section className="page page-project">
      <div className="project-header">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <Link className="button" to="/">Back to all projects</Link>
        </div>
        <img src={project.coverImage} alt={project.title} className="project-cover" />
      </div>

      <div className="project-details">
        {project.sections.map((section) => (
          <article key={section.title} className="project-section">
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
