import { useState } from 'react';
import { Link } from 'react-router-dom';
import { content } from '../../data/content';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/?page=about' },
    // { label: 'Contact', to: '/?page=about' },
  ];

  return (
    <header className="site-header">
      <Link to="/" className="site-brand">
        Arne Defoor
      </Link>

      <button
        type="button"
        className={`menu-toggle${isMenuOpen ? ' is-open' : ''}`}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <span className="menu-toggle-line" />
        <span className="menu-toggle-line" />
        <span className="menu-toggle-line" />
      </button>

      <nav className={`site-nav${isMenuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link key={link.label} to={link.to} className="site-nav-link" onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
