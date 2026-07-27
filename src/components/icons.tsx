type IconProps = {
  className?: string;
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function LogoMark({ className, size = 30 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <path
        d="M16 2.5c3.4 3.2 6.8 4.6 10.5 4.6.3 4.4-.5 9.2-2.8 13-2 3.3-4.8 5.6-7.7 7-2.9-1.4-5.7-3.7-7.7-7C5.6 16.3 4.8 11.5 5.1 7.1 8.8 7.1 12.2 5.7 15.6 2.5z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M16 2.5c3.4 3.2 6.8 4.6 10.5 4.6.3 4.4-.5 9.2-2.8 13-2 3.3-4.8 5.6-7.7 7-2.9-1.4-5.7-3.7-7.7-7C5.6 16.3 4.8 11.5 5.1 7.1 8.8 7.1 12.2 5.7 15.6 2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M11 14.5l3.2 3.2L21 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function IconConsult({ size = 38, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4 5h16v11H8l-4 4z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

export function IconDoc({ size = 38, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 16h6" />
    </svg>
  );
}

export function IconAudit({ size = 38, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5M9 11h4" />
    </svg>
  );
}

export function IconCert({ size = 38, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L7.5 21 12 18.5 16.5 21 15 13.5" />
      <path d="M12 6.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2L9 8.6l2-.3z" />
    </svg>
  );
}

export function IconScale({ size = 38, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 3v18M5 7h14M5 7l-3 6h6l-3-6zM19 7l-3 6h6l-3-6zM8 21h8" />
    </svg>
  );
}

export function IconShield({ size = 38, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function Plus({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function WhatsApp({ size = 28, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.22-8.24 8.22z" />
    </svg>
  );
}

export function Arrow({ size = 16, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
