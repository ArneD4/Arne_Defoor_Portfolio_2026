type LinkedInIconProps = {
  size?: number;
  className?: string;
  stroke?: string;
};

export function LinkedInIcon({ size = 20, className }: LinkedInIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm4.94 4.5a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88ZM5.54 9.75h2.8v8.4h-2.8v-8.4Zm4.49 0h2.68v1.14h.04c.37-.7 1.28-1.44 2.63-1.44 2.82 0 3.34 1.85 3.34 4.26v5.44h-2.8v-5.1c0-1.22-.03-2.78-1.7-2.78-1.72 0-1.98 1.34-1.98 2.73v5.15h-2.8v-8.4Z" 
      />
    </svg>
  );
}