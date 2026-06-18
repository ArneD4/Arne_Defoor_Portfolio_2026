type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
};

export function SectionHeading({ eyebrow, title, description, image }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {image ? <img src={image} alt={title} className="section-image" /> : null}
      <h1>{title}</h1>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
