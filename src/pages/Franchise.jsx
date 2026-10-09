import ImageHero from '../components/sections/ImageHero.jsx';
import FormSuccess from '../components/form/FormSuccess.jsx';
import { FormError, FormGrid, SelectField, TextArea, TextField } from '../components/form/Fields.jsx';
import { Check } from '../components/icons.jsx';
import { FINANCING, FRANCHISE_GIVES, FRANCHISE_REQS, FRANCHISE_STEPS } from '../data/careers.js';
import { IMG } from '../data/site.js';
import { useSubmit } from '../hooks/useSubmit.js';
import { scrollToId } from '../lib/scroll.js';
import './Franchise.css';

function CheckList({ items, inverted }) {
  return (
    <div className="fr-list">
      {items.map(q => (
        <div key={q.t} className="fr-list__item">
          <span className={inverted ? 'fr-list__check fr-list__check--inv' : 'fr-list__check'}><Check size={16} strokeWidth={3} /></span>
          <div><span className="fr-list__title">{q.t}</span><span className="fr-list__text">{q.d}</span></div>
        </div>
      ))}
    </div>
  );
}

export default function Franchise() {
  const form = useSubmit('/franchise', { onSent: () => scrollToId('form-franchise') });
  const err = form.fieldErrors;

  return (
    <>
      <ImageHero image={IMG + 'wide.jpg'}>
        <h1 className="title-xl fr-hero__title">Bli franchisetagare hos Shah's</h1>
        <div className="image-hero__actions">
          <button type="button" className="btn btn--red btn--lg fr-hero__primary" onClick={() => scrollToId('form-franchise')}>Skicka intresseanmälan</button>
          <button type="button" className="btn btn--ghost btn--lg" onClick={() => scrollToId('steg')}>Så går det till</button>
        </div>
      </ImageHero>

      <section className="fr-intro">
        <p>Shah's växer i Sverige, Norge, Danmark och fler europeiska marknader. Vi söker driftiga entreprenörer som vill driva en egen restaurang.</p>
      </section>

      <section className="fr-half">
        <div className="fr-half__body">
          <h2 className="title-md">Vad krävs av dig</h2>
          <CheckList items={FRANCHISE_REQS} />
        </div>
        <div className="fr-half__media" style={{ backgroundImage: `url('${IMG}group.jpg')` }} />
      </section>
      <section className="fr-half fr-half--red">
        <div className="fr-half__media" style={{ backgroundImage: `url('${IMG}DSC00781.webp')`, backgroundPosition: 'center 35%' }} />
        <div className="fr-half__body">
          <h2 className="title-md">Vad ger Shah's dig</h2>
          <CheckList items={FRANCHISE_GIVES} inverted />
        </div>
      </section>

      <section id="steg" className="container fr-steps">
        <h2 className="title-md">Så går det till</h2>
        <div className="fr-steps__grid">
          {FRANCHISE_STEPS.map(s => (
            <div key={s.num} className="fr-step">
              <span className="fr-step__num">{s.num}</span>
              <span className="fr-step__title">{s.t}</span>
              <span className="fr-step__text">{s.d}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="form-franchise" className="fr-form">
        <div className="fr-form__inner">
          <h2 className="title-md">Intresseanmälan</h2>
          <p className="fr-form__note">Fält med <span className="required">*</span> är obligatoriska.</p>
          {form.sent ? (
            <FormSuccess title="Tack för din intresseanmälan" text="Vi har tagit emot dina uppgifter och hör av oss när vi har gått igenom ansökan."
              resetLabel="Skicka en ny anmälan" onReset={form.reset} />
          ) : (
            <FormGrid onSubmit={form.submit}>
              <TextField label="Namn" name="name" autoComplete="name" placeholder="För och efternamn" error={err.name} />
              <TextField label="Telefon" name="phone" type="tel" autoComplete="tel" error={err.phone} />
              <TextField label="Mejl" name="email" type="email" autoComplete="email" error={err.email} />
              <TextField label="Ålder" name="age" type="number" min="18" error={err.age} />
              <TextField label="Önskad stad" name="city" full placeholder="I vilken stad vill du öppna?" error={err.city} />
              <SelectField label="Finansieringsplan" name="financing" options={FINANCING} error={err.financing} />
              <TextField label="Tillgängligt kapital" name="capital" placeholder="Eget beskattat kapital" error={err.capital} />
              <fieldset className="choices">
                <legend>Ensam eller med partner <span className="required">*</span></legend>
                <div className="choices__row">
                  <label className="choice"><input required type="radio" name="partner" value="ensam" />Ensam</label>
                  <label className="choice"><input required type="radio" name="partner" value="partner" />Med partner</label>
                </div>
                {err.partner && <span className="field__error">{err.partner}</span>}
              </fieldset>
              <TextArea label="Varför passar du som franchisetagare hos Shah's?" name="motivation" rows={6} error={err.motivation} />
              <FormError error={form.error} />
              <div className="form-submit">
                <button type="submit" className="btn btn--red btn--hover-ink btn--xl" disabled={form.sending}>
                  {form.sending ? 'Skickar…' : 'Skicka intresseanmälan'}
                </button>
              </div>
            </FormGrid>
          )}
        </div>
      </section>
    </>
  );
}
