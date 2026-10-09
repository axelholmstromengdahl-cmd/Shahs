import { lazy, Suspense } from 'react';
import { RESTAURANTS } from '../../data/restaurants.js';
import './ListView.css';

// Leaflet is loaded separately so the rest of the page renders before the map.
const LeafletMap = lazy(() => import('./LeafletMap.jsx'));

// Default Hitta oss view: red intro with the restaurant grid, then a real map with every restaurant.
export default function ListView({ onOrder }) {
  return (
    <>
      <div className="hl-red">
        <section className="container hl-head">
          <div className="hl-head__text">
            <h1 className="title-lg">Våra restauranger</h1>
            <p className="lead">I Sverige, Norge och Danmark. Hitta närmaste Shah's.</p>
          </div>
          <button type="button" className="btn btn--white btn--lg" onClick={onOrder}>Beställ online</button>
        </section>
        <section className="container hl-grid-wrap">
          <div className="hl-grid">
            {RESTAURANTS.map(r => (
              <div key={r.name} className="hl-card">
                <h2>{r.name}</h2>
                <span>Öppettider läggs in senare</span>
                <span>{r.area}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="hl-map" aria-label="Karta över våra restauranger">
        <Suspense fallback={<div className="hl-map__loading">Laddar kartan…</div>}>
          <LeafletMap className="hl-map__leaflet" hits={RESTAURANTS} scrollZoom={false} />
        </Suspense>
      </section>
    </>
  );
}
