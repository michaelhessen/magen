const CACHE_NAME = 'magen-cache-v4';
const ASSETS = [
  './',
  './index.html',
  './favicon.png',
  './apple-touch-icon.png',
  './manifest.webmanifest'
];

// Install the service worker and precache the core assets. Calling
// `skipWaiting()` lets the new worker take control immediately without
// requiring a cache name bump.
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Clean up old caches and make the service worker take control of clients
// right away so updates are applied without manual refreshes.
self.addEventListener('activate', event => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

// Use a network-first strategy so that updates to cached assets are fetched
// automatically without needing to change the cache name. Successful network
// responses update the cache; if the network is unavailable, the cached
// response is used as a fallback.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
