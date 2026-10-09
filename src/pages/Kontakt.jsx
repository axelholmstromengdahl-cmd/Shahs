import FormSuccess from '../components/form/FormSuccess.jsx';
import { FormError, FormGrid, SelectField, TextArea, TextField } from '../components/form/Fields.jsx';
import { Mail } from '../components/icons.jsx';
import { RESTAURANTS } from '../data/restaurants.js';
import { CONTACTS } from '../data/site.js';
import { useSubmit } from '../hooks/useSubmit.js';
import { scrollToId } from '../lib/scroll.js';
import './Kontakt.css';

export default function Kontakt() {
  const form = useSubmit('/contact', { onSent: () => scrollToId('form-kontakt') });
  const err = form.fieldErrors;

  return (
    <div className="page-red">
      <section className="kt-head">
        <Mail size={60} strokeWidth={1.5} />
        <h1 className="title-lg">Kontakta oss</h1>
        <p className="kt-head__note">Fält med <span className="required">*</span> är obligatoriska.</p>
      </section>

      <section id="form-kontakt" className="kt-form">
        {form.sent ? (
          <FormSuccess title="Tack för ditt meddelande" text="Vi återkommer så snart vi kan." resetLabel="Skicka ett nytt meddelande" onReset={form.reset} />
        ) : (
          <FormGrid onSubmit={form.submit}>
            <SelectField label="Välj restaurang" name="restaurant" full placeholder="Välj restaurang"
              options={[...RESTAURANTS.map(r => r.name), 'Huvudkontoret']} error={err.restaurant} />
            <TextField label="Namn" name="name" autoComplete="name" error={err.name} />
            <TextField label="Mejl" name="email" type="email" autoComplete="email" error={err.email} />
            <TextArea label="Meddelande" name="message" rows={7} error={err.message} />
            <label className="consent">
              <input required type="checkbox" name="consent" />
              <span><strong>Samtycke <span className="required">*</span></strong><br />Jag godkänner att Shah's Halal Food använder mina uppgifter för att besvara mitt meddelande.</span>
            </label>
            <FormError error={form.error} />
            <div className="form-submit">
              <button type="submit" className="btn btn--white btn--hover-ink btn--xl" disabled={form.sending}>{form.sending ? 'Skickar…' : 'Skicka meddelande'}</button>
            </div>
          </FormGrid>
        )}
      </section>

      <section className="kt-contacts">
        <div className="kt-contacts__grid">
          {CONTACTS.map(c => (
            <div key={c.label} className="kt-contact">
              <span className="eyebrow kt-contact__label">{c.label}</span>
              <span className="kt-contact__name">{c.name}</span>
              <span className="kt-contact__role">{c.role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
