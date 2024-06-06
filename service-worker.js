const cacheName = 'sbo-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        '/',
        'index.html',
        'assets/css/style.css',
        'assets/img/favicon.png',
        // add more resources as needed
      ]))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request))
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then(response => {
            // Cache responses with Cache-Control: max-age or Cache-Control: immutable
            if (response && (response.headers.get('Cache-Control').includes('max-age=') || response.headers.get('Cache-Control').includes('immutable'))) {
              caches.open(cacheName)
                .then(cache => {
                  cache.put(event.request, response.clone());
                });
            }
            return response;
          });
      })
  );
});

