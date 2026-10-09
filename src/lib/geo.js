// Great-circle distance in km between [lat, lng] pairs.
export function distKm(a, b) {
  const r = Math.PI / 180;
  const dLat = (b[0] - a[0]) * r;
  const dLng = (b[1] - a[1]) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}

export function formatKm(km) {
  return (km < 10 ? km.toFixed(1).replace('.', ',') : Math.round(km)) + ' km bort';
}
