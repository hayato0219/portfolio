import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const Stroke = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Stroke>
);

export const ArrowUp = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Stroke>
);

export const ChevronLeft = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m15 18-6-6 6-6" />
  </Stroke>
);

export const ChevronRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m9 18 6-6-6-6" />
  </Stroke>
);

export const Close = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Stroke>
);

export const Reset = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </Stroke>
);

export const Chat = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
  </Stroke>
);

export const Send = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Stroke>
);

export const Play = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M8 5v14l11-7z" />
  </svg>
);
