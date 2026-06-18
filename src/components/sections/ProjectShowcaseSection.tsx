import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { content } from '../../data/content';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { Button } from '../ui/Button';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';

export function ProjectShowcaseSection() {
  const groupedProjects = content.projects.reduce<Record<string, typeof content.projects>>((groups, project) => {
    const category = project.category || 'Projects';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(project);
    return groups;
  }, {});

  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleCategoryClick = (category: string) => {
    const target = categoryRefs.current[category];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const categoryEntries = Object.entries(groupedProjects);

  const openFloatingNav = () => {
    console.log('hi')
    document.querySelector('.project-floating-nav')?.classList.toggle('open');
  };

  return (
    <section className="project-showcase-section">
      <div className="project-floating-nav" role="navigation" aria-label="Project categories" onClick={openFloatingNav}>
        <ChevronRightIcon size={32} className="floating-nav-icon"/>
        {categoryEntries.map(([category]) => (
          <button
            key={category}
            type="button"
            className="button button-secondary"
            onClick={() => handleCategoryClick(category)}
          >
            <span>{category}</span>
            <ArrowRightIcon size={20} />
          </button>
        ))}
      </div>

      <div className="project-category-groups">
        {categoryEntries.map(([category, projects]) => (
          <div
            key={category}
            className="project-category-group"
            ref={(element) => {
              categoryRefs.current[category] = element;
            }}
          >
            <h2>{category}</h2>
            <div className="project-grid">
              {projects.map((project) => {
                const tags = project.tools?.length ? project.tools : [project.category];
                return (
                  <Link key={project.slug} to={`/projects/${project.slug}`} className="project-card">
                    <div className="project-card-image-wrapper">
                      <img className="project-card-image" src={project.cardImage} alt={project.title} loading="lazy"/>
                      <img className="project-card-image-hover" src={project.coverImage} alt={`${project.title} hover`} loading="lazy"/>
                    </div>

                    <div className="project-card-content">
                      <div className="project-card-tags">
                        {tags.slice(0, tags.length).map((tag) => (
                          <span key={tag} className="hero-tag project-card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="project-card-copy">
                        <h3>{project.title}</h3>
                        <p className="project-card-summary">{project.summary}</p>
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
        ))}
      </div>
    </section>
  );
}
