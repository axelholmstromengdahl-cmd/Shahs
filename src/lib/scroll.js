// Smooth-scrolls to an element id, leaving room for the sticky header.
export function scrollToId(id, offset = 90) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}
