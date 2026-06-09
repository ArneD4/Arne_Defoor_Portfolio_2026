import { HeroSection } from '../components/sections/HeroSection';
import { ProjectShowcaseSection } from '../components/sections/ProjectShowcaseSection';

export default function Home() {
  return (
    <section className="page page-home">
      <HeroSection />
      <ProjectShowcaseSection />
    </section>
  );
}
