import { AboutSummarySection } from '../components/sections/AboutSummarySection';
import { SiteFooter } from '../components/layout/SiteFooter';

export default function About() {
  return (
    <>
      <section className="page page-about">
        <AboutSummarySection />
      </section>
      <SiteFooter />
    </>
  );
}
