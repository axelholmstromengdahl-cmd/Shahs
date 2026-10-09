import { useEffect, useState } from 'react';
import { RESTAURANTS } from '../../data/restaurants.js';
import { Check, ChevronRight, Close } from '../icons.jsx';
import './OrderModal.css';

export default function OrderModal({ onClose }) {
  const [chosen, setChosen] = useState('');

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="order" role="dialog" aria-modal="true" aria-labelledby="order-title">
      <div className="order__box">
        <div className="order__head">
          <div>
            <div className="eyebrow order__eyebrow">Beställ online</div>
            <h2 id="order-title" className="order__title">Välj restaurang</h2>
          </div>
          <button type="button" className="order__close" onClick={onClose} aria-label="Stäng"><Close size={20} /></button>
        </div>
        <p className="order__intro">Beställ, betala och hämta när maten är klar.</p>
        <div className="order__list">
          {RESTAURANTS.map(r => (
            <button key={r.name} type="button" className="order__item" onClick={() => setChosen(r.name)} aria-pressed={chosen === r.name}>
              <span className="order__item-text">
                <span className="order__item-name">{r.name}</span>
                <span className="order__item-area">{r.area}</span>
              </span>
              {chosen === r.name
                ? <span className="order__chosen"><Check size={18} strokeWidth={2.4} />Vald</span>
                : <ChevronRight size={20} className="order__chev" />}
            </button>
          ))}
        </div>
        {chosen && (
          <button type="button" className="btn btn--red btn--hover-ink btn--block order__go" onClick={onClose}>
            Till beställningen, {chosen}
          </button>
        )}
      </div>
    </div>
  );
}
