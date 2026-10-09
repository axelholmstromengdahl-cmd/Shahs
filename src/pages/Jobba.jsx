import { useState } from 'react';
import ImageHero from '../components/sections/ImageHero.jsx';
import SplitSection from '../components/sections/SplitSection.jsx';
import FormSuccess from '../components/form/FormSuccess.jsx';
import { FormError, FormGrid, SelectField, TextArea, TextField } from '../components/form/Fields.jsx';
import { Check, ChevronRight, Upload } from '../components/icons.jsx';
import { JOB_COLLAGE, JOBS } from '../data/careers.js';
import { RESTAURANTS } from '../data/restaurants.js';
import { IMG } from '../data/site.js';
import { useSubmit } from '../hooks/useSubmit.js';
import { scrollToId } from '../lib/scroll.js';
import './Jobba.css';

function ApplicationForm({ job, setJob }) {
  const form = useSubmit('/jobs/apply', { multipart: true, onSent: () => scrollToId('form-jobba') });
  const [cvName, setCvName] = useState('');
  const err = form.fieldErrors;
  const reset = () => { form.reset(); setCvName(''); };

  if (form.sent) {
    return <FormSuccess title="Tack för din ansökan" text="Vi går igenom din ansökan och hör av oss." resetLabel="Skicka en ny ansökan" onReset={reset} />;
  }
  return (
    <FormGrid onSubmit={form.submit}>
      <SelectField label="Tjänst" name="job" full placeholder="Välj tjänst" value={job} onChange={e => setJob(e.target.value)}
        options={JOBS.map(j => ({ value: j.key, label: `${j.role}, ${j.city}` }))} error={err.job} />
      <TextField label="Namn" name="name" full autoComplete="name" placeholder="För och efternamn" error={err.name} />
      <TextField label="Mejl" name="email" type="email" autoComplete="email" error={err.email} />
      <TextField label="Telefon" name="phone" type="tel" autoComplete="tel" error={err.phone} />
      <SelectField label="Önskad ort" name="location" full placeholder="Välj ort" options={[...RESTAURANTS.map(r => r.city), 'Annan ort']} error={err.location} />
      <div className="file">
        <span className="file__label">CV <span className="required">*</span></span>
        <label className="file__drop">
          <Upload size={28} />
          {cvName ? (
            <><span className="file__name">{cvName}</span><span className="file__hint file__pick">Byt fil</span></>
          ) : (
            <><span>Dra och släpp här eller <span className="file__pick">välj fil</span></span><span className="file__hint">PDF eller Word, max 5 MB</span></>
          )}
          <input required type="file" name="cv" accept=".pdf,.doc,.docx" onChange={e => setCvName(e.target.files?.[0]?.name || '')} />
        </label>
        {err.cv && <span className="field__error">{err.cv}</span>}
      </div>
      <TextArea label="Meddelande" name="message" placeholder="Berätta kort om dig själv" error={err.message} />
      <FormError error={form.error} />
      <div className="form-submit">
        <button type="submit" className="btn btn--red btn--hover-ink btn--xl" disabled={form.sending}>{form.sending ? 'Skickar…' : 'Skicka ansökan'}</button>
      </div>
    </FormGrid>
  );
}

function ReferralForm() {
  const [open, setOpen] = useState(false);
  const form = useSubmit('/referrals');
  if (form.sent) return <span className="jb-tips__sent"><Check size={20} strokeWidth={2.4} />Tack för tipset.</span>;
  if (!open) return <button type="button" className="btn btn--outline-red jb-tips__open" onClick={() => setOpen(true)}>Tipsa en vän</button>;
  return (
    <form className="jb-tips__form" onSubmit={form.submit}>
      <input className="input" required type="text" name="name" placeholder="Ditt namn" aria-label="Ditt namn" />
      <input className="input" required type="text" name="friendName" placeholder="Din väns namn" aria-label="Din väns namn" />
      <input className="input" required type="email" name="friendEmail" placeholder="Din väns mejl" aria-label="Din väns mejl" />
      {form.error && <span className="field__error">{form.error}</span>}
      <button type="submit" className="btn btn--red btn--hover-ink" disabled={form.sending}>{form.sending ? 'Skickar…' : 'Skicka tips'}</button>
    </form>
  );
}

export default function Jobba() {
  const [job, setJob] = useState('');
  const apply = key => { setJob(key); scrollToId('form-jobba'); };

  return (
    <>
      <ImageHero image={IMG + 'close1.jpg'}>
        <h1 className="title-xl">Jobba hos oss</h1>
        <p className="lead jb-hero__lead">Shah's växer och söker alltid driftiga medarbetare till restaurangerna.</p>
        <div className="image-hero__actions">
          <button type="button" className="btn btn--red btn--lg jb-hero__primary" onClick={() => scrollToId('tjanster')}>Lediga jobb</button>
          <button type="button" className="btn btn--ghost btn--lg" onClick={() => scrollToId('vi-ar')}>Läs mer</button>
        </div>
      </ImageHero>

      <SplitSection id="vi-ar" image={IMG + 'DSC00781.webp'} imagePos="center 35%" tall>
        <h2 className="title-split">Vi är Shah's</h2>
        <p className="body-text">Originalet från New Yorks gator sedan 2005. Hos oss jobbar du i ett team som gör det snabbt, rent och rätt, varje dag.</p>
        <p className="body-text">Vi rekryterar på personlighet och vilja. Resten lär vi dig på plats.</p>
      </SplitSection>

      <section className="container jb-collage">
        {/* Placeholders until real photos from the restaurants are in place */}
        {JOB_COLLAGE.map(c => (
          <figure key={c.label} className="jb-collage__item">
            <div className="jb-collage__img">{c.label}</div>
            <figcaption>{c.text}</figcaption>
          </figure>
        ))}
      </section>

      <section id="tjanster" className="jb-jobs">
        <h2 className="title-md">Tillgängliga tjänster</h2>
        <div className="jb-jobs__list">
          {JOBS.map(j => (
            <button key={j.key} type="button" className="jb-job" onClick={() => apply(j.key)}>
              <span className="jb-job__text">
                <span className="jb-job__role">{j.role}</span>
                <span className="jb-job__meta">{j.city} · {j.dept}</span>
              </span>
              <span className="jb-job__apply">Ansök<ChevronRight /></span>
            </button>
          ))}
        </div>
      </section>

      <section id="form-jobba" className="jb-form">
        <div className="jb-form__inner">
          <h2 className="jb-form__title">Ansök</h2>
          <p className="jb-form__note">Fält med <span className="required">*</span> är obligatoriska.</p>
          <ApplicationForm job={job} setJob={setJob} />
        </div>
      </section>

      <SplitSection id="form-tips" image={IMG + 'fries.jpg'} mediaLeft tall>
        <h2 className="title-split jb-tips__title">Tipsa en vän</h2>
        <p className="body-text">Jobbar du redan hos Shah's? Känner du någon som skulle passa i teamet, tipsa oss.</p>
        <ReferralForm />
      </SplitSection>
    </>
  );
}
