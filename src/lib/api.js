// Static demo builds (e.g. GitHub Pages) have no backend; forms then pretend to send so the site can be shown.
const DEMO = import.meta.env.VITE_DEMO === 'true';

// Posts a form to the Express API. JSON by default; multipart when the form carries a file.
export async function postForm(endpoint, formData, { multipart = false } = {}) {
  if (DEMO) {
    await new Promise(r => setTimeout(r, 600));
    return { ok: true, demo: true };
  }

  const init = multipart
    ? { method: 'POST', body: formData }
    : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(formData)) };

  let res;
  try {
    res = await fetch('/api' + endpoint, init);
  } catch {
    throw new Error('Kunde inte nå servern. Kontrollera anslutningen och försök igen.');
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.ok) {
    throw Object.assign(new Error(body.error || 'Något gick fel. Försök igen.'), { fields: body.fields });
  }
  return body;
}
