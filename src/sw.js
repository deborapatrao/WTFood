// self.addEventListener("fetch", (event) => {
//   // console.log(`Fetching ${event.request.url}`);
//   // normally this is where the service worker checks to see
//   // if the requested resource is in the local cache or not.
//   // Here for the time being it just goes to get the requested resource from the network,
//   event.respondWith(fetch(event.request));
// });

'use strict';

const cacheName = 'offline-mode-cache-v1';
const contentToCache = ['./images/icon-512x512.png'];

self.addEventListener('fetch', function (e) {
  //console.log(`Fetching ${event.request.url}`);

  e.respondWith(
    (async () => {
      try {
        const r = await caches.match(e.request);
        // console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) {
          return r;
        }
        const response = await fetch(e.request);
        return response;
      } catch (e) {
        console.log('You are not connected to the Internet. Connect and try again.');
        const cache = await caches.open(cacheName);
        const response = await cache.match(contentToCache[0]);
        return response;
      }
    })()
  );
});

self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
    })()
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});
