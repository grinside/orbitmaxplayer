/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
});

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching:', event.request.url);
});