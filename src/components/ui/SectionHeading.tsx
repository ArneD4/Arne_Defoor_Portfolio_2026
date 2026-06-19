import { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
};

export function SectionHeading({ eyebrow, title, description, image }: SectionHeadingProps) {
  // 1. Properly place and type the ref inside the component
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Place the hook inside the component so it has access to the ref and lifecycle
  useGSAP(() => {
    // Initialize a timeline
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out", 
        duration: 0.8 
      }
    });

    // Build the sequence using element selectors scoped to our container
    tl.from(".section-image", {
      y: 30,
      opacity: 0,
      delay: 0.6 
    })
    .from(".section-title", {
      y: 40,
      opacity: 0,
    }, "-=0.6") 
    .from(".section-description", {
      y: 30,
      opacity: 0,
    }, "-=0.6");

  }, { scope: containerRef }); // Scope ensures GSAP only searches inside this component

  return (
    <div className="section-heading" ref={containerRef}>

      {image ? <img src={image} alt={title} className="section-image" /> : null}
      <h1 className="section-title">{title}</h1>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}