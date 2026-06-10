/* eslint-disable no-restricted-globals */

/*
 * Custom service worker for Advanced CoverView.
 *
 * Create React App (react-scripts 5) emits content-hashed asset filenames, so a
 * static precache list can't be authored ahead of time without ejecting. Instead
 * this worker precaches the stable app shell and caches hashed build assets at
 * runtime, which makes the app installable and usable offline.
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `coverview-${CACHE_VERSION}`;

// Stable, non-hashed files that make up the minimal offline shell.
const APP_SHELL = [
  ".",
  "index.html",
  "manifest.json",
  "logo.png",
  "robots.txt",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("coverview-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Allow the page to trigger an immediate activation after an update.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests; let the browser deal with everything else.
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // For page navigations, try the network first so users get fresh content,
  // and fall back to the cached app shell when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("index.html", copy));
          return response;
        })
        .catch(() =>
          caches
            .match("index.html")
            .then((cached) => cached || caches.match("."))
        )
    );
    return;
  }

  // Only runtime-cache same-origin assets. Cross-origin requests (fonts, CDNs,
  // analytics, Unsplash, etc.) pass straight through to the network.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Cache-first with background refresh (stale-while-revalidate) for same-origin
  // assets such as the hashed JS/CSS bundles and images.
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
