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
    fetch(event.request).catch(() => {
      // If fetch fails (e.g., offline), respond with a custom HTML fallback response
      const offlineFallback = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Offline</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
              background-color: #f8f9fa;
              color: #333;
            }
            .container {
              text-align: center;
            }
            button {
              margin-top: 20px;
              padding: 10px 20px;
              font-size: 16px;
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Offline</h1>
            <img src="./assets/img/offline.svg">
            <p>You are currently offline. Please check your internet connection.</p>
            <button onclick="exitApp()">Exit App</button>
          </div>
          <script>
            function exitApp() {
              if (confirm('Are you sure you want to exit the app?')) {
                window.close();
              }
            }
          </script>
        </body>
        </html>
      `;
      return new Response(offlineFallback, {
        headers: { 'Content-Type': 'text/html' }
      });
    })
  );
});
