import { useMemo, useRef, useState } from 'react';
import LeafletMap from './LeafletMap.jsx';
import { RESTAURANTS } from '../../data/restaurants.js';
import { distKm, formatKm } from '../../lib/geo.js';
import { Bag, Close, Crosshair, Pin, Search, Truck } from '../icons.jsx';
import './MapView.css';

// Kartvy: full-screen map with a floating restaurant panel (stacked under the map on mobile).
export default function MapView({ onOrder }) {
  const [q, setQ] = useState('');
  const [onlyTruck, setOnlyTruck] = useState(false);
  const [userPos, setUserPos] = useState(null);
  const [msg, setMsg] = useState('');
  const [active, setActive] = useState('');
  const mapRef = useRef(null);

  const hits = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const list = RESTAURANTS
      .filter(r => (!ql || `${r.name} ${r.area} ${r.city}`.toLowerCase().includes(ql)) && (!onlyTruck || r.truck))
      .map(r => ({ ...r, dist: userPos ? distKm(userPos, [r.lat, r.lng]) : null }));
    if (userPos) list.sort((a, b) => a.dist - b.dist);
    return list;
  }, [q, onlyTruck, userPos]);

  const toggleNear = () => {
    if (userPos) { setUserPos(null); setMsg(''); return; }
    if (!navigator.geolocation) { setMsg('Din webbläsare kan inte dela position.'); return; }
    setMsg('Hämtar din position…');
    navigator.geolocation.getCurrentPosition(
      p => { setUserPos([p.coords.latitude, p.coords.longitude]); setMsg(''); },
      () => setMsg('Kunde inte hämta din position. Tillåt plats i webbläsaren.'),
      { enableHighAccuracy: false, timeout: 10000 },
    );
  };

  const focus = name => {
    setActive(name);
    mapRef.current?.focus(name);
  };

  const total = RESTAURANTS.length;
  const count = hits.length === total ? `Visar alla ${total} restauranger` : `Visar ${hits.length} av ${total} restauranger`;

  return (
    <section className="hm">
      <LeafletMap ref={mapRef} className="hm__map" panelOffset hits={hits} userPos={userPos} onSelect={setActive} onError={setMsg} />
      <aside className="hm__panel">
        <div className="hm__panel-head">
          <h1 className="hm__title">Restauranger</h1>
          <div className="hm__chips">
            <button type="button" className="hm__chip" aria-pressed={!!userPos} onClick={toggleNear}><Crosshair />Visa nära mig</button>
            <button type="button" className="hm__chip" aria-pressed={onlyTruck} onClick={() => setOnlyTruck(t => !t)}><Truck />Foodtruck</button>
            <button type="button" className="hm__chip hm__chip--order" onClick={onOrder}><Bag />Beställ online</button>
          </div>
          <div className="hm__search">
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Skriv in stad eller restaurang" aria-label="Sök restaurang" />
            {q && <button type="button" className="hm__search-clear" onClick={() => setQ('')} aria-label="Rensa sökningen"><Close size={16} strokeWidth={2.4} /></button>}
            <span className="hm__search-icon" aria-hidden="true"><Search /></span>
          </div>
          {msg && <span className="hm__msg" role="status">{msg}</span>}
          <span className="hm__count">{count}</span>
        </div>
        <div className="hm__list">
          {hits.map(r => (
            <button key={r.name} type="button" className={r.name === active ? 'hm__item is-active' : 'hm__item'} onClick={() => focus(r.name)}>
              <span className="hm__item-main">
                <span className="hm__item-name">{r.name}</span>
                <span className="hm__item-area">{r.area}</span>
                <span className="hm__item-tags">
                  <span><Pin size={16} />{r.truck ? 'Foodtruck' : 'Restaurang'}</span>
                  {r.dist != null && <span>{formatKm(r.dist)}</span>}
                </span>
              </span>
              <span className="hm__item-hours">
                <span>Öppettider</span>
                <span className="hm__item-hours-value">Läggs in senare</span>
              </span>
            </button>
          ))}
          {hits.length === 0 && (
            <div className="hm__empty">
              <span>Inga restauranger matchar</span>
              <button type="button" className="btn btn--red btn--hover-ink" onClick={() => { setQ(''); setOnlyTruck(false); }}>Rensa filter</button>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
