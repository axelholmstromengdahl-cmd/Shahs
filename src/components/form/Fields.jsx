import { ChevronDown } from '../icons.jsx';
import './Fields.css';

// Labelled inputs used by every form. All fields are required by default; pass required={false} to opt out.
// `error` shows a server-side message under the field.

function Label({ label, required }) {
  return <span>{label}{required && <> <span className="required">*</span></>}</span>;
}

function FieldError({ error }) {
  return error ? <span className="field__error" role="alert">{error}</span> : null;
}

export function TextField({ label, name, type = 'text', required = true, full = false, error, ...rest }) {
  return (
    <label className={full ? 'field field--full' : 'field'}>
      <Label label={label} required={required} />
      <input className="input" type={type} name={name} required={required} aria-invalid={!!error} {...rest} />
      <FieldError error={error} />
    </label>
  );
}

export function TextArea({ label, name, rows = 5, required = true, error, ...rest }) {
  return (
    <label className="field field--full">
      <Label label={label} required={required} />
      <textarea className="input input--area" name={name} rows={rows} required={required} aria-invalid={!!error} {...rest} />
      <FieldError error={error} />
    </label>
  );
}

export function SelectField({ label, name, placeholder = 'Välj', options, required = true, full = false, error, ...rest }) {
  return (
    <label className={full ? 'field field--full' : 'field'}>
      <Label label={label} required={required} />
      <span className="select">
        <select className="input input--select" name={name} required={required} aria-invalid={!!error} {...rest}>
          <option value="">{placeholder}</option>
          {options.map(o => typeof o === 'string'
            ? <option key={o} value={o}>{o}</option>
            : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="select__chev" />
      </span>
      <FieldError error={error} />
    </label>
  );
}

export function FormGrid({ onSubmit, children, className = '' }) {
  return <form className={`form-grid ${className}`} onSubmit={onSubmit}>{children}</form>;
}

export function FormError({ error }) {
  return error ? <p className="form-error field--full" role="alert">{error}</p> : null;
}
