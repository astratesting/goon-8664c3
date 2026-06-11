import type { SVGAttributes } from "react";

interface AtmarkProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

export default function Atmark({ size = 32, className, ...props }: AtmarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Goon logo"
      {...props}
    >
      {/* Outer circle — atlas globe */}
      <circle cx="16" cy="16" r="13" stroke="#1A1A2E" strokeWidth="1.5" />
      {/* G letterform inside */}
      <path
        d="M20 11.5C18.8 10.5 17.2 10 15.5 10C12.5 10 10 12.5 10 15.5C10 18.5 12.5 21 15.5 21C17.8 21 19.8 19.7 20.7 17.8H16"
        stroke="#1A1A2E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Meridian line */}
      <line x1="16" y1="3" x2="16" y2="29" stroke="#1A1A2E" strokeWidth="0.75" opacity="0.3" />
    </svg>
  );
}
