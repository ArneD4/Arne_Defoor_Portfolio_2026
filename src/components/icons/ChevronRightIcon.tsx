type ChevronRightIconProps = {
  size?: number;
  className?: string;
  stroke?: string;
};

export function ChevronRightIcon({ size = 20, className, stroke = 'currentColor' }: ChevronRightIconProps) {
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
      <path d="M9 6L15 12L9 18" stroke={stroke} strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
