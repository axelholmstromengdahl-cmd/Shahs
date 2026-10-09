// Small in-memory limiter for form posts. Enough for one server process; use a shared store if you scale out.
export function rateLimit({ windowMs, max }) {
  const hits = new Map();
  return (req, res, next) => {
    if (req.method !== 'POST') return next();
    const now = Date.now();
    const key = req.ip;
    const entry = hits.get(key);
    if (!entry || entry.reset < now) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return next();
    }
    entry.count += 1;
    if (entry.count > max) {
      res.set('Retry-After', String(Math.ceil((entry.reset - now) / 1000)));
      return res.status(429).json({ ok: false, error: 'För många försök. Vänta en stund och försök igen.' });
    }
    next();
  };
}
