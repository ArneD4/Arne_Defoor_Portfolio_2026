import { GithubIcon } from '../icons/GithubIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="site-footer-email" href="mailto:hello@arne.dev">
        <h2>hello@arne.dev</h2>
      </a>

      <div className="site-footer-links" aria-label="Social links">
        <a className="site-footer-icon" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          <LinkedInIcon size={20} />
        </a>
        <a className="site-footer-icon" href="https://github.com" target="_blank" rel="noreferrer">
          <GithubIcon size={20} />
        </a>
      </div>

      <p className="site-footer-copyright">Copyright 2026 — Arne Defoor</p>
    </footer>
  );
}
