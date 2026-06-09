import { content } from '../../data/content';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>{content.brand.copy}</p>
      <p>© 2026 Arne Defoor</p>
    </footer>
  );
}
