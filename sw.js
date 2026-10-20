// Service worker: rende l'app installabile e la apre anche con rete scarsa. Aumentare VERSION a ogni rilascio.
const VERSION = 'hf-v2';
const FILES = ['./', 'index.html', 'config.js', 'esercizi.js', 'schede.js', 'vendor/supabase.min.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Solo i file dell'app (stessa origine), network-first: online prende sempre l'ultima versione.
// I dati (Supabase) non passano mai dalla cache.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(VERSION).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
