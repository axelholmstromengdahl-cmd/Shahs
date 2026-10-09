import { useState } from 'react';
import { FAQ } from '../data/faq.js';
import { Minus, Plus } from '../components/icons.jsx';
import './Faq.css';

export default function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <div className="page-red">
      <section className="faq">
        <h1 className="title-lg faq__title">Vanliga frågor</h1>
        {FAQ.map((g, gi) => (
          <div key={g.name} className="faq__group">
            <h2 className="faq__group-title">{g.name}</h2>
            {g.items.map((f, i) => {
              const key = `${gi}-${i}`;
              const isOpen = open === key;
              return (
                <div key={key} className="faq__item">
                  <button type="button" className="faq__q" aria-expanded={isOpen} aria-controls={`faq-${key}`} onClick={() => setOpen(isOpen ? null : key)}>
                    <span>{f.q}</span>
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                  </button>
                  {isOpen && (
                    <div id={`faq-${key}`} className="faq__a">
                      <p>{f.a}</p>
                      {f.link && <a href={f.href}>{f.link}</a>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div className="faq__more">
          <span>Hittar du inte svaret?</span>
          <a href="#kontakt" className="btn btn--white btn--hover-ink">Kontakta oss</a>
        </div>
      </section>
    </div>
  );
}
