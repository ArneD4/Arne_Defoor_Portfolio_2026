import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

type ButtonProps = {
  to?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  icon?: boolean;
  className?: string;
};

export function Button({ to, children, variant = 'primary', icon = true, className }: ButtonProps) {
  const classNameList = ['button', `button-${variant}`, className].filter(Boolean).join(' ');

  const content = (
    <>
      <span>{children}</span>
      {icon ? <ArrowRightIcon size={20} className="button-icon" /> : null}
    </>
  );

  if (to) {
    return (
      <Link className={classNameList} to={to} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return <button className={classNameList}>{content}</button>;
}
