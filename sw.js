const CACHE_NAME = 'sree-sathya-store-v2';

const FILES_TO_CACHE = [
  '/Sree-sathya-store/',
  '/Sree-sathya-store/sree-sathya-store.html',
  '/Sree-sathya-store/track-order.html',
  '/Sree-sathya-store/manifest.json',
  '/Sree-sathya-store/images/icon-192.png',
  '/Sree-sathya-store/images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
