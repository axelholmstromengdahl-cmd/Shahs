import { useEffect, useRef, useState } from 'react';
import { HERO_VIDEO, IMG } from '../../data/site.js';
import { RESTAURANTS } from '../../data/restaurants.js';
import { ChevronRight, Pause, Play } from '../icons.jsx';
import './HeroVideo.css';

// Looping, muted hero video shown uncropped (16:9), with the headline in a band below it
// because the video carries its own on-screen text.
export default function HeroVideo({ onOrder }) {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Respect "reduce motion": show the poster and let the visitor start the video themselves.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.pause();
    else v.play().catch(() => {});
  }, []);

  const toggle = () => {
    const v = video.current;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section className="hero-video">
      <div className="hero-video__media">
        <video ref={video} muted loop playsInline preload="auto" poster={IMG + 'hero-poster.jpg'}
          aria-label="Film med Shah's rätter: alla dina favoriter, pommes och Spooky Platter"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <button type="button" className="hero-video__toggle" onClick={toggle} aria-label={playing ? 'Pausa filmen' : 'Spela filmen'}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
      <div className="hero-video__band">
        <div className="container hero-video__inner">
          <div className="hero-video__text">
            <h1 className="hero-video__title" data-reveal="0">Originalet från New Yorks gator, sedan 2005</h1>
            <div className="hero-video__cities" data-reveal="1">
              {RESTAURANTS.map((r, i) => (
                <span key={r.name}>{i > 0 && <span aria-hidden="true">·</span>}<span className="hero-video__city">{r.city}</span></span>
              ))}
            </div>
          </div>
          <button type="button" className="btn btn--red hero-video__order" data-reveal="2" onClick={onOrder}>
            Beställ online<ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
