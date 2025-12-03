function handleInstall() {
  self.skipWaiting();
}

function handleActivate() {
  clients.claim();
}

function handleCaching(e) {
  let { destination, url } = e?.request;

  const fetch = () =>
    e.respondWith(fetch(request).catch(() => caches.match(request)));

  // fetch latest build files from network
  if (destination === "document" || url.includes("_next")) return fetch();

  // Static assets fallback
  fetch();
}

self.addEventListener("install", handleInstall);
self.addEventListener("activate", handleActivate);
self.addEventListener("fetch", handleCaching);
