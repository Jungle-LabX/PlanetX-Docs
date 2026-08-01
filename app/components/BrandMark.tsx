type BrandMarkProps = {
  className?: string;
  size?: number;
  title?: string;
};

export function BrandMark({ className, size = 36, title }: BrandMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="planetx-mark-core" x1="16" y1="11" x2="48" y2="53" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9AF5FF" />
          <stop offset="0.54" stopColor="#38CBE0" />
          <stop offset="1" stopColor="#7379FF" />
        </linearGradient>
        <linearGradient id="planetx-mark-ring" x1="7" y1="45" x2="57" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7DEAF6" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#7DEAF6" />
          <stop offset="1" stopColor="#A689FF" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="18" fill="url(#planetx-mark-core)" />
      <path d="M22 16.9C26.6 13.3 33.2 12.6 38.5 15L20.2 43.8C16.8 40.6 14 36.8 14 32C14 25.9 17.1 20.5 22 16.9Z" fill="#07131F" fillOpacity="0.72" />
      <path d="M24.2 23.6L39.8 40.4M39.8 23.6L24.2 40.4" stroke="#F7FCFF" strokeWidth="3.4" strokeLinecap="round" />
      <ellipse cx="32" cy="32" rx="28" ry="11.2" transform="rotate(-16 32 32)" stroke="url(#planetx-mark-ring)" strokeWidth="2" />
      <circle cx="56.2" cy="24.2" r="3.2" fill="#FFBE73" />
      <circle cx="56.2" cy="24.2" r="6" stroke="#FFBE73" strokeOpacity="0.28" />
    </svg>
  );
}
