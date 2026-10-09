import { FOOTER_COLS, IMG } from '../../data/site.js';
import { ChevronRight, Facebook, Instagram, TikTok } from '../icons.jsx';
import './Footer.css';

const SOCIAL = [
  { label: 'Instagram', Icon: Instagram },
  { label: 'Facebook', Icon: Facebook },
  { label: 'TikTok', Icon: TikTok },
];

export default function Footer({ onOrder }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__cols">
            {FOOTER_COLS.map(col => (
              <div key={col.title} className="footer__col">
                <span className="eyebrow footer__col-title">{col.title}</span>
                {col.links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
              </div>
            ))}
          </div>
          <div className="footer__aside">
            <button type="button" className="btn btn--red btn--lg footer__order" onClick={onOrder}>Beställ online<ChevronRight /></button>
            <div className="footer__social">
              {/* TODO: point these at the real profiles */}
              {SOCIAL.map(({ label, Icon }) => (
                <a key={label} href="#hem" aria-label={label}><Icon /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <a href="#hem" className="footer__logo" aria-label="Shah's Halal Food, till startsidan">
            <img src={IMG + 'logo-linear.png'} alt="Shah's Halal Food" />
          </a>
          <p>© 2026 Shah's Halal Food EU. Alla rättigheter förbehållna.<br />Restauranger i Sverige, Norge och Danmark.</p>
        </div>
      </div>
    </footer>
  );
}
