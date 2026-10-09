import { useMemo, useState } from 'react';
import { ALLERGENS, ALLERGEN_CELLS, ALLERGEN_GROUPS } from '../data/allergens.js';
import { ChevronDown, Close, Search } from '../components/icons.jsx';
import './Produktinfo.css';

const LEGEND = [
  { mark: <span className="mark mark--x" />, label: 'Innehåller' },
  { mark: <span className="mark mark--k" />, label: 'Kan innehålla' },
  { mark: <span className="mark mark--t" />, label: 'Kan tas bort' },
  { mark: <span className="mark-text">F</span>, label: 'Färgämne' },
  { mark: <span className="mark-text mark-text--gmo">GMO</span>, label: 'Genetiskt modifierad' },
];

function Cell({ code }) {
  if (code === 'X') return <span className="mark mark--x" title="Innehåller" />;
  if (code === 'K') return <span className="mark mark--k" title="Kan innehålla" />;
  if (code === 'T') return <span className="mark mark--t" title="Kan tas bort" />;
  if (code === 'F') return <span className="mark-text">F</span>;
  if (code === 'G') return <span className="mark-text mark-text--gmo">GMO</span>;
  return null;
}

export default function Produktinfo() {
  const [cat, setCat] = useState('');
  const [without, setWithout] = useState('');
  const [q, setQ] = useState('');

  // Filters: category, products free from an allergen (neither X nor K), and free-text search.
  const groups = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return ALLERGEN_GROUPS
      .filter(g => !cat || g.name === cat)
      .map(g => ({
        name: g.name,
        rows: g.rows.filter(n => {
          if (ql && !n.toLowerCase().includes(ql)) return false;
          const code = (ALLERGEN_CELLS[g.name + '|' + n] || {})[without];
          return !(without && (code === 'X' || code === 'K'));
        }),
      }))
      .filter(g => g.rows.length);
  }, [cat, without, q]);

  const hasFilter = !!(cat || without || q);
  const clearAll = () => { setCat(''); setWithout(''); setQ(''); };

  return (
    <>
      <section className="container info-head">
        <div className="info-head__bar">
          <div className="halal">
            <div className="halal__stamp"><span>HALAL</span><span>CERTIFIERAD</span></div>
            <span className="halal__text">100 procent halal. Alltid.</span>
          </div>
        </div>
        <h1 className="info-head__title">Produktinformation</h1>
        <p className="info-head__lead">Allergener för hela menyn. Berätta alltid om din allergi när du beställer.</p>

        <div className="info-filters">
          <label className="info-filter">
            <span>Kategori</span>
            <span className="info-filter__control">
              <select value={cat} onChange={e => setCat(e.target.value)}>
                <option value="">Alla kategorier</option>
                {ALLERGEN_GROUPS.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
              </select>
              <ChevronDown className="info-filter__chev" />
            </span>
          </label>
          <label className="info-filter">
            <span>Allergen</span>
            <span className="info-filter__control">
              <select value={without} onChange={e => setWithout(e.target.value)}>
                <option value="">Alla allergener</option>
                {ALLERGENS.map(a => <option key={a} value={a}>Utan {a}</option>)}
              </select>
              <ChevronDown className="info-filter__chev" />
            </span>
          </label>
          <label className="info-filter">
            <span>Sök</span>
            <span className="info-filter__control">
              <Search className="info-filter__search" />
              <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Sök produkt" />
              {q && <button type="button" className="info-filter__clear" onClick={() => setQ('')} aria-label="Rensa sökningen"><Close size={14} strokeWidth={2.6} /></button>}
            </span>
          </label>
          {hasFilter && <button type="button" className="link-btn info-filters__reset" onClick={clearAll}>Rensa filter</button>}
        </div>

        <div className="info-legend">
          {LEGEND.map(l => <span key={l.label} className="info-legend__item">{l.mark}{l.label}</span>)}
        </div>
      </section>

      <section className="container info-table-wrap">
        <div className="info-swipe">Svep i sidled för att se alla allergener.</div>
        {groups.length === 0 ? (
          <div className="info-empty">
            <span>Inga produkter matchar</span>
            <button type="button" className="btn btn--red btn--hover-ink" onClick={clearAll}>Rensa filter</button>
          </div>
        ) : (
          <div className="info-table">
            <div className="info-table__inner">
              {groups.map(g => (
                <div key={g.name}>
                  <div className="info-table__group"><span>{g.name}</span></div>
                  <div className="info-table__row info-table__row--head">
                    <div className="info-table__product">Produkt</div>
                    {ALLERGENS.map(a => (
                      <div key={a} className={a === without ? 'info-table__allergen is-active' : 'info-table__allergen'}><span>{a}</span></div>
                    ))}
                  </div>
                  {g.rows.map(n => {
                    const cells = ALLERGEN_CELLS[g.name + '|' + n] || {};
                    return (
                      <div key={n} className="info-table__row">
                        <div className="info-table__product">{n}</div>
                        {ALLERGENS.map(a => (
                          <div key={a} className={a === without ? 'info-table__cell is-active' : 'info-table__cell'}><Cell code={cells[a]} /></div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
        <p className="info-note">Recept och leverantörer kan ändras. Vid allergi, fråga alltid personalen i restaurangen innan du beställer.</p>
      </section>
    </>
  );
}
