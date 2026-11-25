export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="15" fill="#D9452B" />
      <path
        d="M15 13c-1.5 3 1.5 4 0 7M24 11c-1.7 3.4 1.7 4.6 0 8M33 13c-1.5 3 1.5 4 0 7"
        stroke="#FFD8A8"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity=".9"
      />
      <path
        d="M9 25h30c-.7 9-7.1 15-15 15S9.7 34 9 25Z"
        fill="#FFF8EC"
      />
      <path d="M7 24.5h34" stroke="#2B1A12" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M18 29.5c1.6 2.2 3.9 3.3 6 3.3s4.4-1.1 6-3.3"
        stroke="#D9452B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
