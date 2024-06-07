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
    caches.match(event.request)
      .then(cachedResponse => {
        // If the request is in the cache, respond with the cached version
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch the request from the network
        return fetch(event.request)
          .then(response => {
            // Clone the response for caching
            const clonedResponse = response.clone();
            caches.open(dynamicCacheName)
              .then(cache => {
                // Cache the fetched response
                cache.put(event.request, clonedResponse);
              });
            return response;
          });
      }).catch(() => {
        // If both cache and network fail, respond with a fallback response
        return new Response('Offline fallback response');
      })
  );
});
