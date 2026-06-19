import { content } from '../../data/content';
import { GithubIcon } from '../icons/GithubIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { MailIcon } from '../icons/MailIcon';
import { Button } from '../ui/Button';
import { TagList } from '../ui/TagList';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

export function HeroSection() {
  return (
    <section className="hero-panel">
      <div className="hero-content">
        <div className="hero-copy">
          <h2 className="eyebrow">Arne Defoor</h2>
          <h1 className="hero-heading">{content.about.headline || content.home.heading}</h1>
          <p className="lead">{content.about.focus || content.home.description}</p>
          <TagList items={content.about.tools || []} />
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
        <div className="hero-social-links" aria-label="Social links">
          <a href="https://github.com/ArneD4" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
            <GithubIcon size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
            <LinkedInIcon size={24} />
          </a>
          <a href="mailto:hello@arnedefoor.com" className="hero-social-link" aria-label="Email">
            <MailIcon size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
