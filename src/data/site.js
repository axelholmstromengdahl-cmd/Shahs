// BASE_URL is '/' locally and '/<repo>/' on GitHub Pages (see vite.config.js).
export const IMG = import.meta.env.BASE_URL + 'images/';

// Startsidans hero-film (1600px, 30 fps, utan ljud). Bilden som visas innan den laddat: images/hero-poster.jpg.
export const HERO_VIDEO = import.meta.env.BASE_URL + 'videos/hero.mp4';

export const NAV_MAIN = [
  { label: 'Meny', href: '#meny' },
  { label: 'Hitta oss', href: '#hitta-oss' },
  { label: 'Om oss', href: '#om-oss' },
  { label: 'Bli franchisetagare', href: '#franchise' },
  { label: 'Jobba hos oss', href: '#jobba' },
];

export const NAV_SUB = [
  { label: 'Hem', href: '#hem' },
  { label: 'Produktinformation', href: '#produktinformation' },
  { label: 'Kontakta oss', href: '#kontakt' },
  { label: 'FAQ', href: '#faq' },
];

export const FOOTER_COLS = [
  { title: 'Maten', links: [{ label: 'Meny', href: '#meny' }, { label: 'Produktinformation', href: '#produktinformation' }] },
  { title: "Shah's", links: [{ label: 'Hem', href: '#hem' }, { label: 'Om oss', href: '#om-oss' }, { label: 'Hitta oss', href: '#hitta-oss' }] },
  { title: 'Väx med oss', links: [{ label: 'Bli franchisetagare', href: '#franchise' }, { label: 'Jobba hos oss', href: '#jobba' }] },
  { title: 'Kontakt', links: [{ label: 'Kontakta oss', href: '#kontakt' }, { label: 'FAQ', href: '#faq' }] },
];

export const CONTACTS = [
  { label: 'Huvudkontor', name: "Shah's Halal Food EU", role: 'Sverige, Norge, Danmark' },
  { label: 'Marknad och press', name: 'Anton Norrman', role: 'Marknads och kommunikationschef' },
  { label: 'Franchise', name: 'Taher Azizi', role: 'Franchise och etableringschef' },
];
