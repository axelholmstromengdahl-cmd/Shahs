import { useEffect, useState } from 'react';

// Hash routing: "#meny/gyros" -> { page: 'meny', sub: 'gyros' }. Unknown pages fall back to `fallback`.
// `nonce` changes on every hash change so the same route can be re-triggered (e.g. clicking a link twice).
function read(pages, fallback) {
  const raw = decodeURIComponent((window.location.hash || '#' + fallback).slice(1));
  const [p, sub = ''] = raw.split('/');
  return { page: pages.includes(p) ? p : fallback, sub };
}

export function useHashRoute(pages, fallback) {
  const [route, setRoute] = useState(() => ({ ...read(pages, fallback), nonce: 0 }));
  useEffect(() => {
    const onHash = () => setRoute(r => ({ ...read(pages, fallback), nonce: r.nonce + 1 }));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [pages.join(','), fallback]);
  return route;
}
