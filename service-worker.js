const cacheName = 'sbo-v1';
const resourcesToPrecache = [
  '/',
  'index.html',
  'assets/css/style.css',
  'assets/img/favicon.png',
  // add more resources as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(resourcesToPrecache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
  );
});
