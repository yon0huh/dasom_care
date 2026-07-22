/* Bump this version string every time you deploy new app.js/styles.css/index.html.
   Changing it forces old phones to drop their stale cache instead of getting stuck
   showing an older, possibly-broken version of the app forever. */
const CACHE = "dasom-care-v4";
const ASSETS = [
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Network-first for the core app files so a new deploy is picked up on the very next
   launch (falls back to cache only when offline). Other requests (fonts, etc.) stay
   cache-first for speed. */
const CORE = new Set(["./index.html", "./styles.css", "./app.js", "./manifest.json", "/index.html", "/styles.css", "/app.js", "/manifest.json", "/"]);

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const isCore = url.origin === self.location.origin && (CORE.has(url.pathname) || url.pathname.endsWith("/"));

  if (isCore) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, copy));
          return res;
        })
        .catch(() => cached);
    })
  );
});
