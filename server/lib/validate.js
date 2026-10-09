const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHECKED = new Set(['on', 'true', '1', 'yes']);

// Validates a request body against a schema of { field: rules }.
// Every value is trimmed, so a field with only spaces counts as empty.
// Returns { data, errors } where errors maps field -> message (Swedish, shown to the visitor).
export function validate(schema, body = {}) {
  const data = {};
  const errors = {};
  for (const [field, rules] of Object.entries(schema)) {
    const raw = body[field];
    if (rules.checkbox) {
      const on = raw === true || CHECKED.has(String(raw ?? '').toLowerCase());
      if (rules.required && !on) errors[field] = 'Du behöver godkänna för att skicka.';
      data[field] = on;
      continue;
    }
    const value = typeof raw === 'string' ? raw.trim() : raw == null ? '' : String(raw).trim();
    if (!value) {
      if (rules.required) errors[field] = 'Fältet är obligatoriskt.';
      data[field] = '';
      continue;
    }
    if (rules.max && value.length > rules.max) errors[field] = `Max ${rules.max} tecken.`;
    else if (rules.email && !EMAIL.test(value)) errors[field] = 'Ange en giltig mejladress.';
    else if (rules.oneOf && !rules.oneOf.includes(value)) errors[field] = 'Välj ett av alternativen.';
    else if (rules.int) {
      const n = Number(value);
      if (!Number.isInteger(n)) errors[field] = 'Ange ett heltal.';
      else if (rules.min != null && n < rules.min) errors[field] = `Minst ${rules.min}.`;
      else if (rules.maxValue != null && n > rules.maxValue) errors[field] = `Högst ${rules.maxValue}.`;
    }
    data[field] = rules.int ? Number(value) : value;
  }
  return { data, errors };
}
