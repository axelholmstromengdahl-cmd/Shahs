// Line icons drawn with currentColor so they follow the surrounding text color.
function Icon({ size = 18, strokeWidth = 2, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  );
}

export const ChevronRight = p => <Icon {...p}><path d="m9 18 6-6-6-6" /></Icon>;
export const ChevronDown = p => <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>;
export const ArrowRight = p => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
export const Close = p => <Icon {...p}><path d="M18 6 6 18M6 6l12 12" /></Icon>;
export const MenuLines = p => <Icon {...p}><path d="M3 6h18M3 12h18M3 18h18" /></Icon>;
export const Check = p => <Icon {...p}><path d="M20 6 9 17l-5-5" /></Icon>;
export const Plus = p => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>;
export const Minus = p => <Icon {...p}><path d="M5 12h14" /></Icon>;
export const Search = p => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>;
export const Pin = p => <Icon {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Icon>;
export const Mail = p => <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Icon>;
export const Upload = p => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></Icon>;
export const Crosshair = p => <Icon {...p}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2.5" fill="currentColor" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></Icon>;
export const Truck = p => <Icon {...p}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></Icon>;
export const Bag = p => <Icon {...p}><path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /></Icon>;
export const Instagram = p => <Icon {...p}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></Icon>;
export const Facebook = p => <Icon {...p}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Icon>;
export const TikTok = p => <Icon {...p}><path d="M15 3c.4 2.6 2.2 4.4 5 4.6M15 3v11.5a4 4 0 1 1-4-4" /></Icon>;
export const Pause = p => <Icon {...p}><path d="M8 5v14M16 5v14" /></Icon>;
export const Play = p => <Icon {...p}><path d="M7 4.5v15l12-7.5-12-7.5Z" fill="currentColor" /></Icon>;
