import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { content } from '../../data/content';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { Button } from '../ui/Button';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Import ScrollTrigger
import { useGSAP } from "@gsap/react"; 

// 2. Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function ProjectShowcaseSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Nav Animation
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 0.8
      }
    }); 
    
    tl.from(".project-floating-nav", {
      y: 30,
      opacity: 0,
      delay: 0.5 // Reduced delay slightly so users don't wait too long
    });

    // 3. ScrollTrigger Animation for Project Cards
    // We query the category groups within our scoped containerRef
    const groups = gsap.utils.toArray<HTMLElement>('.project-category-group');

    groups.forEach((group) => {
      // Find the specific cards belonging ONLY to this category group
      const cards = group.querySelectorAll('.project-card');
      const heading = group.querySelector('h2');

      if (cards.length === 0) return;

      // Create a timeline per group triggered by scrolling
      gsap.timeline({
        scrollTrigger: {
          trigger: group,
          start: "top 80%", // Triggers when the top of the group hits 80% from the top of the viewport
          toggleActions: "play none none none" // Plays once when entering
        }
      })
      .from(heading, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out"
      })
      .from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15 // Staggers the appearance of each card in the grid
      }, "-=0.4"); // Starts the card animation slightly before the heading completely finishes
    });

  }, { scope: containerRef });

  // ... (Your data structures and onClick handlers remain identical)
  const groupedProjects = content.projects.reduce<Record<string, typeof content.projects>>((groups, project) => {
    const category = project.category || 'Projects';
    if (!groups[category]) groups[category] = [];
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
    document.querySelector('.project-floating-nav')?.classList.toggle('open');
  };

  return (
    <section className="project-showcase-section" ref={containerRef}>
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
                        {tags.map((tag) => (
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
                        <Button variant="tertiary">View project</Button>
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