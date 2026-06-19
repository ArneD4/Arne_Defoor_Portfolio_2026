import { useEffect, useRef } from 'react';
import { GithubIcon } from '../icons/GithubIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function SiteFooter() {
  const containerRef = useRef(null);

 useGSAP(() => {
    // 1. Initialize a timeline
    const tl = gsap.timeline({
      scrollTrigger: {
       trigger: ".site-footer-email", // The element that triggers the animation when scrolled into view
       start: "top 100%",              // Triggers when the top of the element hits 90% from the top of  the viewport
       toggleActions: "play none none none" // Plays the animation once when entering
    },
    defaults: { 
      ease: "power3.out", 
      duration: 0.8 
    } 
    });

    // 2. Build the sequence using element selectors scoped to our container
    tl.from(".site-footer-email", {
      y: 30,
      opacity: 0,
      delay: 0.6 // Small delay before starting
    })
    .from(".site-footer-copyright", {
      y: 40,
      opacity: 0,
    }, "-=0.6") // Starts 0.6s before the previous animation ends
    .from(".site-footer-links .site-footer-icon", { 
      x: -20,
      opacity: 0,
      stagger: 0.06
    }, "-=0.5");

  }, { scope: containerRef });

  return (
    <footer className="site-footer" ref={containerRef}>
      <a className="site-footer-email" href="mailto:hello@arne.dev">
        <h2>hello@arne.dev</h2>
      </a>

      <div className="site-footer-links" aria-label="Social links">
        <a className="site-footer-icon" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          <LinkedInIcon size={24} />
        </a>
        <a className="site-footer-icon" href="https://github.com" target="_blank" rel="noreferrer">
          <GithubIcon size={24} />
        </a>
      </div>

      <p className="site-footer-copyright">Copyright 2026 — Arne Defoor</p>
    </footer>
  );
}
