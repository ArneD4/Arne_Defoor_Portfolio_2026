import { content } from '../../data/content';
import { AboutCard } from '../AboutCard';
import { SectionHeading } from '../ui/SectionHeading';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Import ScrollTrigger

// 2. Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function AboutSummarySection() {
  const containerRef = useRef(null);
  const { about } = content;

   useGSAP(() => {
    // Nav Animation
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 0.8
      }
    }); 

    // ScrollTrigger Animation for Project Cards
    // We query the category groups within our scoped containerRef
    const groups = gsap.utils.toArray<HTMLElement>('.about-stack-section');

    groups.forEach((group, index) => {
      // Find the specific cards belonging ONLY to this category group
      const cards = group.querySelectorAll('.about-card');
      const heading = group.querySelector('h2');

      if (cards.length === 0) return;

      const firstGroupDelay = index === 0 ? 1.6 : 0;

      // Create a timeline per group triggered by scrolling
      gsap.timeline({
        scrollTrigger: {
          trigger: group,
          start: "top 90%", // Triggers when the top of the group hits 80% from the top of the viewport
          toggleActions: "play none none none", // Plays once when entering
        },
        delay: firstGroupDelay
      })
      .from(heading, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
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
  
 

  return (
    <section className="about-summary-section" ref={containerRef}>
      <SectionHeading
        eyebrow="About"
        title={about.heading}
        description={about.description}
        image='https://d4dev.be/Images/Profo.png'
      />
    <div className="about-stack">
        <div className="about-stack-section">
          <h2>Work Experience</h2>
          <div className="timeline-list">
            {(about.workExperience || []).map((item) => (
              <AboutCard
                key={`${item.company}-${item.years}`}
                item={{
                  title: item.company,
                  subtitle: item.role,
                  focus: item.focus,
                  years: item.years,
                  href: item.companyUrl,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="about-stack-section">
          <h2>Education</h2>
          <div className="timeline-list">
            {(about.education || []).map((item) => (
              <AboutCard
                key={`${item.institution}-${item.years}`}
                item={{
                  title: item.institution,
                  subtitle: item.degree,
                  focus: item.focus,
                  years: item.years,
                  href: item.institutionUrl,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
