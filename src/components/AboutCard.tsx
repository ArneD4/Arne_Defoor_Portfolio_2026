import { Button } from './ui/Button';

type AboutCardItem = {
  title: string;
  subtitle?: string;
  focus?: string;
  years?: string;
  href?: string;
};

type AboutCardProps = {
  item: AboutCardItem;
};

export function AboutCard({ item }: AboutCardProps) {
  return (
    <article className="about-card about-card--entry">
      <label className="about-card-label">{item.title}</label>
      <h3 className="about-card-subtitle">{item.subtitle}</h3>
      {item.focus ? <p className="about-card-focus">{item.focus}</p> : null}
      {item.years ? <p className="about-card-years">{item.years}</p> : null}
      {item.href ? <Button to={item.href} variant="tertiary">Visit</Button> : null}
    </article>
  );
}
