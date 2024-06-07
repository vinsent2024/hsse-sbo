const cacheName = 'sbo-v1'; // Update cache name for new version
const staticCacheName = 'static-cache-v1'; // Cache for static assets
const dynamicCacheName = 'dynamic-cache-v1'; // Cache for dynamic content

const urlsToCache = [
  '/',
  'index.html',
  'assets/css/style.css',
  'assets/img/favicon.png',
  // Add more resources as needed
];

self.addEventListener('install', event => {
  // Cache static assets when installing the service worker
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Delete outdated caches when activating the service worker
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== staticCacheName && cacheName !== dynamicCacheName)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // If fetch fails (e.g., offline), respond with a fallback response
        return new Response('Offline fallback response');
      })
  );
});
