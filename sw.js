const CACHE = 'sss-v1';
const FILES = [
  '/Sree-sathya-store/sree-sathya-store.html',
  '/Sree-sathya-store/track-order.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request)
    )
  );
});