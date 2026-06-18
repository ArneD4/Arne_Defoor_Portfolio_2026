type ArrowRightIconProps = {
  size?: number;
  className?: string;
  stroke?: string;
};

export function ArrowRightIcon({ size = 20, className, stroke = 'currentColor' }: ArrowRightIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12H19" stroke={stroke} strokeWidth="2px" strokeLinecap="round" />
      <path d="M13 6L19 12L13 18" stroke={stroke} strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
