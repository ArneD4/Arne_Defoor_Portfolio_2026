type MailIconProps = {
  size?: number;
  className?: string;
};

export function MailIcon({ size = 20, className }: MailIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2px"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  );
}
