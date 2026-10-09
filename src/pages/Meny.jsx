import { useState } from 'react';
import { MENU, ROW_LIMIT, SHOW_NEW_TAGS } from '../data/menu.js';
import { ChevronRight } from '../components/icons.jsx';
import { scrollToId } from '../lib/scroll.js';
import './Meny.css';

function ProductCard({ p }) {
  return (
    <article className="product">
      <div className="product__media">
        {p.img
          ? <img src={p.img} alt={p.n} loading="lazy" style={{ objectFit: p.fit }} />
          : <div className="product__placeholder">{p.n}</div>}
        {p.isNew && SHOW_NEW_TAGS && <span className="product__new">NYHET</span>}
      </div>
      <h3 className="product__name">{p.n}</h3>
      <p className="product__desc">{p.d}</p>
    </article>
  );
}

function Category({ c }) {
  const [open, setOpen] = useState(false);
  const shown = open ? c.items : c.items.slice(0, ROW_LIMIT);
  return (
    <section id={c.id} className="menu-cat">
      <div className="menu-cat__head">
        <div className="menu-cat__titles">
          <h2 className="menu-cat__title">{c.name}</h2>
          <span className="menu-cat__intro">{c.intro}</span>
        </div>
        {c.items.length > ROW_LIMIT && (
          <button type="button" className="menu-cat__toggle" onClick={() => setOpen(o => !o)} aria-expanded={open}>
            {open ? 'Visa färre' : 'Se alla'}<ChevronRight />
          </button>
        )}
      </div>
      <div className="menu-cat__grid">
        {shown.map(p => <ProductCard key={p.n} p={p} />)}
      </div>
    </section>
  );
}

export default function Meny() {
  return (
    <>
      <section className="container menu-intro">
        <h1 className="menu-intro__title">Menyn</h1>
        <p className="lead menu-intro__lead">Allt från grillen, med vår White Sauce.</p>
        <a href="#produktinformation" className="text-link">Allergener och innehåll<ChevronRight size={16} /></a>
      </section>

      <section className="container">
        <div className="menu-covers">
          {MENU.map(c => (
            <button key={c.id} type="button" className="menu-cover" onClick={() => scrollToId(c.id)}>
              <div className="menu-cover__media">
                {c.cover ? <img src={c.cover} alt={c.name} /> : <div className="product__placeholder">{c.name}</div>}
              </div>
              <span className="menu-cover__name">{c.name}<ChevronRight size={22} /></span>
            </button>
          ))}
        </div>
      </section>

      <div className="container menu-cats">
        {MENU.map(c => <Category key={c.id} c={c} />)}
        <div className="menu-allergens">
          <span className="menu-allergens__title">Allergener och innehåll</span>
          <a href="#produktinformation" className="btn btn--outline-red">Produktinformation</a>
        </div>
      </div>
    </>
  );
}
