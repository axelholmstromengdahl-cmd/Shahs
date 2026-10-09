import { lazy, Suspense, useState } from 'react';
import ListView from '../components/hitta/ListView.jsx';
import './HittaOss.css';

// The map view pulls in Leaflet, so it is only downloaded when Kartvy is switched on.
const MapView = lazy(() => import('../components/hitta/MapView.jsx'));

export default function HittaOss({ onOrder }) {
  const [mapOn, setMapOn] = useState(false);
  return (
    <div className="hitta">
      <button type="button" role="switch" aria-checked={mapOn} className="hitta__switch" onClick={() => setMapOn(on => !on)}>
        <span>Kartvy</span>
        <span className="hitta__switch-track"><span className="hitta__switch-knob" /></span>
      </button>
      {mapOn
        ? <Suspense fallback={<div className="hitta__loading">Laddar kartan…</div>}><MapView onOrder={onOrder} /></Suspense>
        : <ListView onOrder={onOrder} />}
    </div>
  );
}
