const CACHE_NAME = 'wedding-invitation-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './images/kbach-pattern.jpg',
  './images/kbach-corner.png',
  './images/kbach-seal.png',
  './images/kbach-flame.png',
  './images/hero-bg.jpg',
  './images/khqr.png'
];

// ១. Cache ឯកសារទាំងអស់ទុកពេល Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('PWA: Caching all assets for offline mode');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ២. ដំណើរការពេលគ្មានអ៊ីនធឺណិត (Offline Support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // បើមានក្នុង Cache យកចេញមកប្រើ បើគ្មានចាំទាញយកពី Internet
      return response || fetch(event.request);
    }).catch(() => {
      // បើគ្មាន Internet ទាំងស្រុង យក index.html ពី Cache មកបង្ហាញ
      return caches.match('./index.html');
    })
  );
});

// ៣. ទទួល និងបង្ហាញ Notification រំលឹកភ្ញៀវ
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./index.html')
  );
});