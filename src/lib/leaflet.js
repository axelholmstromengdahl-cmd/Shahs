// Loads Leaflet + markercluster on demand (only when Kartvy is switched on).
// markercluster is a UMD script that extends a global `L`, so it must see a mutable window.L first.
let loading = null;

export function loadLeaflet() {
  if (!loading) {
    loading = (async () => {
      const mod = await import('leaflet');
      window.L = Object.assign({}, mod.default || mod);
      await import('leaflet.markercluster');
      return window.L;
    })();
    loading.catch(() => { loading = null; });
  }
  return loading;
}
