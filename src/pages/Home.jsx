import HeroVideo from '../components/sections/HeroVideo.jsx';
import SplitSection from '../components/sections/SplitSection.jsx';
import { ChevronRight } from '../components/icons.jsx';
import { IMG } from '../data/site.js';

const SECTIONS = [
  { tone: 'red', image: IMG + 'shahs.png', imagePos: 'center 45%', title: "Vi är Shah's",
    text: "Shah's föddes 2005 vid en matvagn på New Yorks gator. Kyckling och lamm från grillen, ris och en sås som folk kom tillbaka för. Idag finns vi i Sverige, Norge och Danmark, med samma recept och 100 procent halal. Alltid.",
    cta: { label: 'Om oss', href: '#om-oss' } },
  { tone: 'white', mediaLeft: true, image: IMG + 'combo.jpg', title: 'Våra tallrikar',
    text: 'Tallriken är hjärtat. Grillat kött på kryddat ris, färsk sallad, hummus och vår White Sauce hälld generöst över. Gjort snabbt. Gjort rent. Gjort rätt.',
    cta: { label: 'Meny', href: '#meny' } },
  { tone: 'red', image: IMG + 'DSC00781.webp', imagePos: 'center 35%', title: 'Vårt koncept',
    text: 'Samma meny och samma standard i varje restaurang, från storstadens gator till köpcentret. Vi växer i Sverige, Norge, Danmark och fler marknader i Europa, och bjuder in entreprenörer att växa med oss.',
    cta: { label: 'Bli franchisetagare', href: '#franchise' } },
];

export default function Home({ onOrder }) {
  return (
    <>
      <HeroVideo onOrder={onOrder} />
      {SECTIONS.map(s => (
        <SplitSection key={s.title} tone={s.tone} image={s.image} imagePos={s.imagePos} mediaLeft={s.mediaLeft}>
          <h2 className="split__title" data-reveal="0">{s.title}</h2>
          <p className="split__text" data-reveal="1">{s.text}</p>
          <a href={s.cta.href} className={`btn btn--sm ${s.tone === 'red' ? 'btn--white' : 'btn--red'}`} data-reveal="2">
            {s.cta.label}<ChevronRight />
          </a>
        </SplitSection>
      ))}
    </>
  );
}
