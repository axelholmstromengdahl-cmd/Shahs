import { useState } from 'react';
import { postForm } from '../lib/api.js';

// Wraps a form's onSubmit: sends it to the API and tracks idle -> sending -> sent, with server errors per field.
export function useSubmit(endpoint, { multipart = false, onSent } = {}) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const submit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setError('');
    setFieldErrors({});
    try {
      await postForm(endpoint, new FormData(form), { multipart });
      setStatus('sent');
      if (onSent) onSent();
    } catch (err) {
      setError(err.message);
      setFieldErrors(err.fields || {});
      setStatus('idle');
    }
  };

  const reset = () => { setStatus('idle'); setError(''); setFieldErrors({}); };

  return { status, sending: status === 'sending', sent: status === 'sent', error, fieldErrors, submit, reset };
}
