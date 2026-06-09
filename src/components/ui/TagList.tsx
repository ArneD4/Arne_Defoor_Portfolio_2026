type TagListProps = {
  items: string[];
};

export function TagList({ items }: TagListProps) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="hero-tags">
      {items.map((item) => (
        <span key={item} className="hero-tag">
          {item}
        </span>
      ))}
    </div>
  );
}
