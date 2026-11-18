const CACHE_PREFIX = 'dso-ui-preview-';
const CACHE = CACHE_PREFIX + 'v106-preview-1';
const CORE = [
  './', './index.html', './styles.css?v=106-preview-1', './app.js?v=106-preview-1', './manifest.webmanifest',
  './app/?v=106-preview-1', './app/', './app/index.html', './app/styles.css?v=106-preview-1', './app/app.js?v=106-preview-1',
  './app/model.js?v=106-preview-1', './app/core.js?v=106-preview-1', './app/screens.js?v=106-preview-1',
  './app/features.js?v=106-preview-1', './app/admin.js?v=106-preview-1', './app/dialogs.js?v=106-preview-1', './app/runtime.js?v=106-preview-1', './assets/app-icon.svg',
  './app/protocol-pdf.js?v=106-preview-1', './app/vendor/pdf-lib.min.js', './app/vendor/fontkit.min.js',
  './assets/photos/entrance-door.webp', './assets/photos/inside-hallway.webp',
  './assets/fonts/Roboto-Regular.ttf', './assets/fonts/Roboto-Medium.ttf', './assets/fonts/Roboto-Bold.ttf',
  './assets/fonts/NotoSerif-Regular.ttf', './assets/fonts/NotoSerif-Bold.ttf',
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const scope = new URL(self.registration.scope);
  if (event.request.method !== 'GET' || url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(event.request);
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(cache.put(event.request, copy).catch(() => {}));
      }
      return response;
    } catch {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      if (event.request.mode === 'navigate') {
        const fallback = await cache.match(url.pathname.includes('/app/') ? './app/?v=106-preview-1' : './');
        if (fallback) return fallback;
      }
      return Response.error();
    }
  })());
});
