import ImageHero from '../components/sections/ImageHero.jsx';
import Timeline from '../components/sections/Timeline.jsx';
import PromiseBand from '../components/sections/PromiseBand.jsx';
import SplitSection from '../components/sections/SplitSection.jsx';
import { HISTORY } from '../data/history.js';
import { IMG } from '../data/site.js';
import './OmOss.css';

export default function OmOss() {
  return (
    <>
      <ImageHero image={IMG + 'wide.jpg'} gradient>
        <span className="eyebrow" data-reveal="0">Om oss</span>
        <h1 className="title-xl om__title" data-reveal="1">Vår historia</h1>
        <p className="lead om__lead" data-reveal="2">Från en matvagn i New York till restauranger i tre länder. Receptet är detsamma.</p>
      </ImageHero>

      <section className="om__intro">
        <p data-reveal="0">Shah's började på ett gathörn. Det som drev folk tillbaka då är samma sak som driver oss idag: grillat kött, kryddat ris och en sås man inte glömmer.</p>
      </section>

      <section className="om__timeline">
        <Timeline items={HISTORY} />
      </section>

      <PromiseBand />

      <SplitSection image={IMG + 'close1.jpg'} tall>
        <h2 className="title-split" data-reveal="0">Bli en del av Shah's</h2>
        <p className="body-text" data-reveal="1">Vi växer och söker driftiga medarbetare till restaurangerna.</p>
        <a href="#jobba" className="btn btn--red btn--hover-ink" data-reveal="2">Jobba hos oss</a>
      </SplitSection>
    </>
  );
}
