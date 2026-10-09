import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { loadLeaflet } from '../../lib/leaflet.js';
import { IMG } from '../../data/site.js';
import './LeafletMap.css';

// Tile provider is set in .env (see .env.example); defaults to CARTO Voyager on OpenStreetMap data.
const TILES = import.meta.env.VITE_MAP_TILES || 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = import.meta.env.VITE_MAP_ATTRIBUTION || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Leaflet map with Shah's flame pins, red count clusters and an optional "you are here" dot.
// Parent can call ref.focus(name) to zoom to a restaurant and open its popup.
// panelOffset leaves room on the left for the floating Kartvy panel; scrollZoom=false keeps page scrolling
// intact when the map is embedded in the page.
const LeafletMap = forwardRef(function LeafletMap({ hits, userPos, onSelect, onError, className = '', panelOffset = false, scrollZoom = true }, ref) {
  const el = useRef(null);
  const map = useRef(null);
  const cluster = useRef(null);
  const markers = useRef({});
  const me = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then(L => {
      if (cancelled || !el.current) return;
      map.current = L.map(el.current, { zoomControl: false, scrollWheelZoom: scrollZoom, zoomSnap: 0.25 }).setView([58, 15], 5);
      L.control.zoom({ position: 'bottomright' }).addTo(map.current);
      L.tileLayer(TILES, { subdomains: 'abcd', maxZoom: 19, attribution: ATTRIBUTION }).addTo(map.current);
      cluster.current = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 60,
        iconCreateFunction: c => {
          const n = c.getChildCount();
          const s = 40 + Math.min(n * 4, 28);
          return L.divIcon({ className: 'shahs-cluster', html: `<div>${n}</div>`, iconSize: [s, s] });
        },
      }).addTo(map.current);
      setReady(true);
    }).catch(() => onError?.('Kartan kunde inte laddas. Kontrollera anslutningen.'));
    return () => {
      cancelled = true;
      // Stop running zoom/pan animations first; removing mid-animation throws inside Leaflet.
      if (map.current) { map.current.stop(); map.current.off(); map.current.remove(); map.current = null; }
    };
  }, []);

  // Rebuild markers whenever the visible restaurants or the visitor's position change.
  useEffect(() => {
    if (!ready) return;
    const L = window.L;
    cluster.current.clearLayers();
    if (me.current) { me.current.remove(); me.current = null; }
    markers.current = {};
    const pin = L.icon({ iconUrl: IMG + 'logo-flame.png', iconSize: [44, 44], iconAnchor: [22, 40], popupAnchor: [0, -36], className: 'shahs-pin' });
    hits.forEach(r => {
      const dest = `https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`;
      const m = L.marker([r.lat, r.lng], { icon: pin, title: r.name, alt: r.name }).bindPopup(
        `<div class="shahs-pop"><strong>${escapeHtml(r.name)}</strong><span>${escapeHtml(r.area)}</span>` +
        `<a href="${dest}" target="_blank" rel="noopener">Vägbeskrivning</a></div>`,
      );
      m.on('click', () => onSelect?.(r.name));
      markers.current[r.name] = m;
      cluster.current.addLayer(m);
    });

    // Frame all visible restaurants, or the visitor plus the nearest one.
    let pts = hits.map(r => [r.lat, r.lng]);
    if (userPos) {
      me.current = L.marker(userPos, { icon: L.divIcon({ className: 'shahs-me', html: '<span></span>', iconSize: [16, 16] }), title: 'Du är här' }).addTo(map.current);
      pts = hits.length ? [pts[0], userPos] : [userPos];
    }
    const wide = window.matchMedia('(min-width: 960px)').matches;
    // No animation for the automatic framing: the map can unmount mid-zoom, which throws inside Leaflet.
    if (pts.length === 1) map.current.setView(pts[0], 12, { animate: false });
    else if (pts.length) map.current.fitBounds(pts, { paddingTopLeft: [panelOffset && wide ? 470 : 40, 60], paddingBottomRight: [60, 60], animate: false });
  }, [ready, hits, userPos, panelOffset]);

  useImperativeHandle(ref, () => ({
    focus(name) {
      const m = markers.current[name];
      if (!m || !cluster.current) return;
      if (!window.matchMedia('(min-width: 960px)').matches) el.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      cluster.current.zoomToShowLayer(m, () => {
        map.current.setView(m.getLatLng(), Math.max(map.current.getZoom(), 13));
        m.openPopup();
      });
    },
  }), []);

  return <div ref={el} className={`shahs-map ${className}`} />;
});

export default LeafletMap;
