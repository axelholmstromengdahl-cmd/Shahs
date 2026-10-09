import { useEffect } from 'react';

// Adds .is-in to every [data-reveal] element when it scrolls into view (see base.css).
// A MutationObserver picks up elements that mount later, e.g. after a page switch.
export function useReveal() {
  useEffect(() => {
    const show = el => el.classList.add('is-in');
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(show);
      return undefined;
    }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    const scan = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}
