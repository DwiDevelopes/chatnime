self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('chat-app-cache').then((cache) => {
        return cache.addAll([
          '/',
          'index.html',
          'app.js',
          'ico.png',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });
  