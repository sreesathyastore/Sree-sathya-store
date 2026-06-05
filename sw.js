const CACHE_NAME = 'sss-cache-v1';
const FILES_TO_CACHE = [
  '/Sree-sathya-store/sree-sathya-store.html',
  '/Sree-sathya-store/track-order.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request))
  );
});