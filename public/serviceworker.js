const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const swself = this; // refers to the SW itself

// install SW
swself.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME) // opens the cache, returns a promise
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      }) // Dev Tools --> Application --> Storage --> Clear Site Data
  );
});

// listen for requests
swself.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html")); // returns the offline version if error (i.e. no internet connection)
    })
  );
});

// activate SW
swself.addEventListener("activate", (event) => {
  // there are often a lot of versions but you don't want to store everything in a cache, just the newest version
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    // returns promise
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName); // only keeps the specific cache version you need
          }
        })
      )
    )
  );
});
