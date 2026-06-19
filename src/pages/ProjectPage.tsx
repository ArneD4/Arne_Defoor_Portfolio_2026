import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { content } from '../data/content';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { Button } from '../components/ui/Button';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import { useGSAP } from "@gsap/react"; 

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { slug } = useParams();

  // 1. Get current project data before running animations
  const project = content.projects.find((item) => item.slug === slug);
  const tags = project?.tools?.length ? project.tools : [project?.category || ''];
  const images = project?.images || [];
  const currentCategory = project?.category;
  const currentSlug = project?.slug;

  const relatedProjects = content.projects.filter(
    (p) => p.category === currentCategory && p.slug !== currentSlug
  );

  // 2. Add dependencies array [slug] to rerun animations on URL shifts
  useGSAP(() => {
    if (!project) return;

    // Reset scroll back to the top of the page on navigate
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8
      }
    });

    // Header Intro sequence
    tl.from(".eyebrow", {
      y: 30,
      opacity: 0,
      delay: 0.4
    })
    .from(".project-card-tags .project-card-tag", { 
      x: -20,
      opacity: 0,
      stagger: 0.06
    }, "-=0.6")
    .from(".project-header-content-top h1", {
      y: 40,
      opacity: 0,
    }, "-=0.6") 
    .from(".caption", {
      y: 30,
      opacity: 0,
    }, "-=0.6")
    .from(".project-header-content-summary", {
      y: 20,
      opacity: 0,
    }, "-=0.5")
    .from(".project-header-content-button", {
      y: 20,
      opacity: 0,
    }, "-=0.4")
    .from(".project-images-wrapper img", { // Smoothly stagger inside images
      opacity: 0,
      y: 30,
      stagger: 0.1
    }, "-=0.4");

    // Related projects scroll animation (Fixed timeline conflicts)
    const cards = gsap.utils.toArray('.related-project-card');
    const title = '.related-projects-wrapper h3';

    if (cards.length > 0) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".related-projects-wrapper",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        delay: 1.2
      })
      .from(title, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      })
      .from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15
      }, "-=0.4");
    }

  }, { scope: containerRef, dependencies: [slug] }); // 👈 CRITICAL: dependencies tracking

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
    <section className="page page-project" ref={containerRef}>
      <div className="project-header">
        <div className="project-header-content">
          <div className="project-header-content-top">
            <p className="eyebrow">{project.category}</p>
            <div className="project-card-tags">
              {tags.map((tag) => (
                <span key={tag} className="hero-tag project-card-tag">
                  {tag}
                </span>
              ))}
            </div>
            <h1>{project.title}</h1>
            <span className="caption">{project.role} &middot; {project.year}</span>
            <p className="project-header-content-summary">{project.summary}</p>
            <Link className="button button-tertiary project-header-content-button" to={project.link ?? "/"} target="_blank" rel="noopener noreferrer">
              View Project <ArrowRightIcon size={20} className="button-icon" />
            </Link>
          </div>
          
          <div className="related-projects-wrapper">
            <h3>Related Projects</h3>
            <div className="related-projects">
              {relatedProjects.map((proj) => (
                <Link key={proj.slug} to={`/projects/${proj.slug}`} className="project-card related-project-card">
                  <div className="project-card-image-wrapper">
                    <img className="project-card-image" src={proj.cardImage} alt={proj.title} loading="lazy"/>
                    <img className="project-card-image-hover" src={proj.coverImage} alt={`${proj.title} hover`} loading="lazy"/>
                  </div>
                  <div className="project-card-content">
                    <div className="project-card-copy">
                      <p>{proj.title}</p>
                    </div>
                    <div className="project-card-actions">
                      <Button variant="tertiary">View project</Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>  
        </div>

        <div className="project-images-wrapper">
          <div className="project-images">
            {images.map((imgUrl) => (
              <img src={imgUrl} alt="Project context" className="project-image" loading="lazy" key={imgUrl} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}