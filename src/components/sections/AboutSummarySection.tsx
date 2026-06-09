import { content } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';

export function AboutSummarySection() {
  return (
    <section className="about-summary-section">
      <SectionHeading
        eyebrow="About"
        title={content.about.heading}
        description={content.about.description}
      />

      <div className="about-grid">
        {content.about.points.map((point) => (
          <article key={point.title} className="about-card">
            <h3>{point.title}</h3>
            <p>{point.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
