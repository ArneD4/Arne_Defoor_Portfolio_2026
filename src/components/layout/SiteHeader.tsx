import { Link } from 'react-router-dom';
import { content } from '../../data/content';

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="logo">
        {content.brand.name}
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects/project-1">Project</Link>
      </nav>
    </header>
  );
}
