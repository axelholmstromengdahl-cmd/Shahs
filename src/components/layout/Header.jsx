import { MenuLines } from '../icons.jsx';
import { IMG } from '../../data/site.js';
import './Header.css';

export default function Header({ onOrder, onMenu }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#hem" className="header__logo" aria-label="Shah's Halal Food, till startsidan">
          <img src={IMG + 'logo-linear.png'} alt="Shah's Halal Food" />
        </a>
        <div className="header__actions">
          <button type="button" className="btn btn--red header__order" onClick={onOrder}>Beställ online</button>
          <button type="button" className="header__menu" onClick={onMenu} aria-label="Öppna menyn">
            <span>MENY</span>
            <MenuLines size={34} />
          </button>
        </div>
      </div>
    </header>
  );
}
