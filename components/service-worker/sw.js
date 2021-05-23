const VER = 1;
const CACHE = 'service-worker-example-cache-v' + VER;

self.addEventListener('install', (event) => {
    console.log('Installed! ', event);
    self.skipWaiting();
    event.waitUntil(
        caches.keys().then(cache => cache.add('./pet.svg'))
    );
});

self.addEventListener('activated', (event) => {
    console.log('Here we clean caches! ', event);

    event.waitUntil(
        caches.keys().then((keyList) => {
            Promise.all(
                keyList.map((key) => {
                    if (key === CACHE) return;
                    caches.delete(key);
            })
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Fetched ' + event.request.url);
    const url = new URL(event.request.url);

    if (url.origin === location.origin && url.pathname.endsWith('/dwnld.svg')) {
        event.respondWith(caches.match('pet.svg'));
    }
});
