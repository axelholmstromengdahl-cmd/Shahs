import { Check } from '../icons.jsx';
import './FormSuccess.css';

export default function FormSuccess({ title, text, resetLabel, onReset }) {
  return (
    <div className="form-success" role="status">
      <span className="form-success__icon"><Check size={26} strokeWidth={3} /></span>
      <span className="form-success__title">{title}</span>
      <span className="form-success__text">{text}</span>
      <button type="button" className="link-btn form-success__reset" onClick={onReset}>{resetLabel}</button>
    </div>
  );
}
