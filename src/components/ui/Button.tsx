import { Link } from 'react-router-dom';

type ButtonProps = {
  to?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
};

export function Button({ to, children, variant = 'primary' }: ButtonProps) {
  const className = variant === 'ghost' ? 'button button-ghost' : 'button';

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return <button className={className}>{children}</button>;
}
