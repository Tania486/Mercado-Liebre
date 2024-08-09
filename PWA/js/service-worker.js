self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('static-v1').then((cache) => {
          return cache.addAll([
              '/',
              '/index.html',
              '/css/style.css', 
              '/js/app.js'     
          ]);
      })
  );
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((response) => {
          if (response) {
              return response; 
          }
          return fetch(event.request).catch(() => {
              
              return caches.match('/index.html');
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['static-v1'];
  event.waitUntil(
      caches.keys().then((cacheNames) => {
          return Promise.all(
              cacheNames.map((cacheName) => {
                  if (!cacheWhitelist.includes(cacheName)) {
                      return caches.delete(cacheName);
                  }
              })
          );
      })
  );
});
