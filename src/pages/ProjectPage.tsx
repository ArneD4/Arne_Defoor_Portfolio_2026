import { useParams, Link } from 'react-router-dom';
import { content } from '../data/content';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { Button } from '../components/ui/Button';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = content.projects.find((item) => item.slug === slug);
  const tags = project?.tools?.length ? project.tools : [project?.category || ''];
  const images = project?.images || [];
  const currentCategory = project?.category;
  const currentSlug = project?.slug;


  const relatedProjects = content.projects.filter(project => project.category === currentCategory && project.slug !== currentSlug);

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
        <div className="project-header-content">
            <div className="project-header-content-top">
              <p className="eyebrow">{project.category}</p>
              <div className="project-card-tags">
               {tags.slice(0, tags.length).map((tag) => (
                  <span key={tag} className="hero-tag project-card-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <h1>{project.title}</h1>
              <span className="caption">{project.role} &middot; {project.year}</span>
              <p>{project.summary}</p>
              <Link className="button button-tertiary" to={project.link ?? "/"} target="_blank" rel="noopener noreferrer">
              View Project <ArrowRightIcon size={20} className="button-icon" />
              </Link>
            </div>
            <div className="related-projects-wrapper">
              <h3>Related Projects</h3>
              <div className="related-projects">
              {relatedProjects.map((project) => {
                const tags = project.tools?.length ? project.tools : [project.category];
                return (
                  <Link key={project.slug} to={`/projects/${project.slug}`} className="project-card related-project-card" >
                    <div className="project-card-image-wrapper">
                      <img className="project-card-image" src={project.cardImage} alt={project.title} loading="lazy"/>
                      <img className="project-card-image-hover" src={project.coverImage} alt={`${project.title} hover`} loading="lazy"/>
                    </div>
                    <div className="project-card-content">
                      <div className="project-card-copy">
                        <p>{project.title}</p>
                      </div>
                      <div className="project-card-actions">
                        <Button  variant="tertiary">View project</Button>
                      </div>
                    </div>
                  </Link>
                );
              })}
              </div>
            </div>  
        </div>
        <div className="project-images-wrapper">
            <div className="project-image">
              {images.slice(0, images.length).map((tag) => (
                  <img src={tag} alt={tag} className="project-image" loading="lazy" key={tag} />
              ))}
             </div>
        </div>

        
      </div>
    </section>
  );
}
