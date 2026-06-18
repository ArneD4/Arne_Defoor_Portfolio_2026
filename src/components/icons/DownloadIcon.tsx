type DownloadIconProps = {
  size?: number;
  className?: string;
  stroke?: string;
};

export function DownloadIcon({ size = 20, className, stroke = 'currentColor' }: DownloadIconProps) {
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
      <path d="M12 4V16" stroke={stroke} strokeWidth="2px" strokeLinecap="round" />
      <path d="M7 11L12 16L17 11" stroke={stroke} strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20H19" stroke={stroke} strokeWidth="2px" strokeLinecap="round" />
    </svg>
  );
}
