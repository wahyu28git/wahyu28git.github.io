importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-service-worker.js');
const CACHE_NAME = "bolaku3";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/EPL-Logo512.png",
  "/EPL-Logo192.png",
  "/favicon.ico",
  "/pages/standing.html",
  "/pages/teams.html",
  "/pages/favorit.html",
  "/pages/about.html",
  "/detail.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/req.js"
];

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/req.js', revision: '1' },
]);

 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
