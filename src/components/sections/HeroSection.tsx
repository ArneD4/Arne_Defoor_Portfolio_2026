import { content } from '../../data/content';
import { Button } from '../ui/Button';
import { TagList } from '../ui/TagList';

export function HeroSection() {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">Arne Defoor</p>
        <h1>{content.about.headline || content.home.heading}</h1>
        <p className="lead">{content.about.focus || content.home.description}</p>
        <TagList items={content.about.tools || []} />
        <Button to="/about">Learn more</Button>
      </div>
      <img src={content.home.heroImage} alt="Hero" className="hero-image" />
    </section>
  );
}
