import { useEffect } from 'react';
import { NAV_MAIN, NAV_SUB } from '../../data/site.js';
import { RESTAURANTS } from '../../data/restaurants.js';
import { ArrowRight, Close, Pin } from '../icons.jsx';
import './MenuDrawer.css';

export default function MenuDrawer({ open, onClose, onOrder }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label="Meny">
      <div className="drawer__backdrop" onClick={onClose} />
      <aside className="drawer__panel">
        <div className="drawer__top">
          <button type="button" className="btn btn--red btn--hover-ink" onClick={onOrder}>Beställ online</button>
          <button type="button" className="drawer__close" onClick={onClose} aria-label="Stäng menyn"><Close size={22} /></button>
        </div>
        <nav className="drawer__main">
          {NAV_MAIN.map(n => (
            <a key={n.href} href={n.href} className="drawer__main-link"><span>{n.label}</span><ArrowRight size={26} /></a>
          ))}
        </nav>
        <div className="drawer__sub">
          {NAV_SUB.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
        </div>
        <div className="drawer__places">
          <div className="eyebrow drawer__places-title">Hitta oss</div>
          <div className="drawer__places-grid">
            {RESTAURANTS.map(r => (
              <a key={r.name} href="#hitta-oss"><span>{r.city}</span><Pin size={18} /></a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
