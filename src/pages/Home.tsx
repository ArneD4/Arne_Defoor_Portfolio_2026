import { HeroSection } from '../components/sections/HeroSection';
import { ProjectShowcaseSection } from '../components/sections/ProjectShowcaseSection';
import { SiteFooter } from '../components/layout/SiteFooter';

export default function Home() {
  return (
    <>
    <section className="page page-home">
      <HeroSection />
      <ProjectShowcaseSection />
    </section>    
          <SiteFooter />
    </>
  );
}
