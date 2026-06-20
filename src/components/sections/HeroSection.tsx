import { useEffect, useRef } from 'react';
import { content } from '../../data/content';
import { GithubIcon } from '../icons/GithubIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { MailIcon } from '../icons/MailIcon';
import { Button } from '../ui/Button';
import { TagList } from '../ui/TagList';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { BlobCanvas } from "../webgl/BlobCanvas"

export function HeroSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Initialize a timeline
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out", 
        duration: 0.8 
      }
    });

    // 2. Build the sequence using element selectors scoped to our container
    tl.from(".eyebrow", {
      y: 30,
      opacity: 0,
      delay: 0.6 // Small delay before starting
    })
    .from(".hero-heading", {
      y: 40,
      opacity: 0,
    }, "-=0.6") // Starts 0.6s before the previous animation ends
    .from(".lead", {
      y: 30,
      opacity: 0,
    }, "-=0.6")
    // If TagList renders internal elements you want to animate, you can target them, 
    // or just fade the container in like this:
    .from(".hero-taglist-wrapper .hero-tag", { 
      x: -20,
      opacity: 0,
      stagger: 0.06
    }, "-=0.5")
    .from(".hero-actions .button, .hero-actions a", {
      y: 20,
      opacity: 0,
    }, "-=0.5")
    .from(".site-icon-link", {
      x: -20,
      opacity: 0,
      stagger: 0.1
    }, "-=0.4");

  }, { scope: containerRef }); // Scope ensures GSAP only searches inside this component

  return (
    // Attach the ref to your top-level element
    <section className="hero-panel" ref={containerRef}>


      <div className="hero-content">
        <div className="hero-copy">
          <h2 className="eyebrow">Arne Defoor</h2>
          <h1 className="hero-heading">{content.about.headline || content.home.heading}</h1>
          <p className="lead">{content.about.focus || content.home.description}</p>
          
          {/* Wrapped TagList in a div for easier targeting */}
          <div className="hero-taglist-wrapper">
            <TagList items={content.about.tools || []} />
          </div>

          <div className="hero-actions">
            <Button to="/CV.pdf" variant="primary">
              DOWNLOAD CV
            </Button>
            <Link to="/about" className="button button-secondary">
              MORE ABOUT ME
              <ArrowRightIcon size={20} className="button-icon" />
            </Link>
          </div>
        </div>

              <div className="hero-3d-overlay-wrapper">
        <BlobCanvas projects={content?.projects || []} />
      </div>
        
        <div className="hero-social-links" aria-label="Social links">
          <a href="https://github.com/ArneD4" target="_blank" rel="noreferrer" className="site-icon-link" aria-label="GitHub">
            <GithubIcon size={24} />
          </a>
          <a href="https://www.linkedin.com/in/arne-defoor-62088a169/" target="_blank" rel="noreferrer" className="site-icon-link" aria-label="LinkedIn">
            <LinkedInIcon size={24} />
          </a>
          <a href="mailto:hello@arnedefoor.com" className="hero-social-link site-icon-link" aria-label="Email">
            <MailIcon size={24} />
          </a>
        </div>
      </div>

            {/* 3D Visual Canvas - Isolated from the text layout flow 
        Pass your data array safely using optional chaining
      */}

    </section>
  );
}