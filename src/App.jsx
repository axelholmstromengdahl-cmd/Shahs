import { useEffect, useState } from 'react';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import MenuDrawer from './components/layout/MenuDrawer.jsx';
import OrderModal from './components/layout/OrderModal.jsx';
import Home from './pages/Home.jsx';
import OmOss from './pages/OmOss.jsx';
import Meny from './pages/Meny.jsx';
import Produktinfo from './pages/Produktinfo.jsx';
import HittaOss from './pages/HittaOss.jsx';
import Franchise from './pages/Franchise.jsx';
import Jobba from './pages/Jobba.jsx';
import Kontakt from './pages/Kontakt.jsx';
import Faq from './pages/Faq.jsx';
import { useHashRoute } from './hooks/useHashRoute.js';
import { useReveal } from './hooks/useReveal.js';
import { scrollToId } from './lib/scroll.js';

const PAGES = {
  hem: Home,
  'om-oss': OmOss,
  meny: Meny,
  produktinformation: Produktinfo,
  'hitta-oss': HittaOss,
  franchise: Franchise,
  jobba: Jobba,
  kontakt: Kontakt,
  faq: Faq,
};

export default function App() {
  const { page, sub, nonce } = useHashRoute(Object.keys(PAGES), 'hem');
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  useReveal();

  // Every navigation closes overlays and either jumps to #page/section or to the top.
  useEffect(() => {
    setMenuOpen(false);
    setOrderOpen(false);
    if (sub) {
      const t = setTimeout(() => scrollToId(sub), 80);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [page, sub, nonce]);

  const openOrder = () => { setMenuOpen(false); setOrderOpen(true); };
  const Page = PAGES[page];

  return (
    <div className="app">
      <Header onOrder={openOrder} onMenu={() => setMenuOpen(o => !o)} />
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onOrder={openOrder} />
      {orderOpen && <OrderModal onClose={() => setOrderOpen(false)} />}
      <main className="app__main">
        <Page key={page} onOrder={openOrder} />
      </main>
      <Footer onOrder={openOrder} />
    </div>
  );
}
