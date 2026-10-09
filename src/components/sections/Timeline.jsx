import { ChevronRight } from '../icons.jsx';
import './Timeline.css';

// Om oss history: a red center line with image and text alternating sides (stacked on mobile).
export default function Timeline({ items }) {
  return (
    <div className="tl">
      {items.map((t, i) => (
        <article key={t.year + t.title} className={i % 2 ? 'tl__item tl__item--flip' : 'tl__item'}>
          <div className="tl__media" style={{ justifyContent: t.justify, '--pad-top': t.padTop || '0px', paddingBottom: t.img2 ? '64px' : 0 }}>
            <img className="tl__img" data-reveal="0" src={t.img} alt={t.alt} loading="lazy"
              style={{ '--w': t.w, '--w-narrow': t.img2 ? '88%' : '100%', aspectRatio: t.ar, objectPosition: t.pos || 'center' }} />
            {t.img2 && (
              <img className={`tl__img2 tl__img2--${t.side2}`} data-reveal="2" src={t.img2} alt={t.alt2} loading="lazy" style={{ width: t.w2 }} />
            )}
          </div>
          <div className="tl__dot" aria-hidden="true" />
          <div className="tl__body">
            <span className="tl__year" data-reveal="0">{t.year}</span>
            <h2 className="tl__title" data-reveal="1">{t.title}</h2>
            {t.paras.map(p => <p key={p} className="tl__para" data-reveal="2">{p}</p>)}
            {t.cta && (
              <a href={t.cta.href} className="btn btn--red btn--sm" data-reveal="2">{t.cta.label}<ChevronRight /></a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
