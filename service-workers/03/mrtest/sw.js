var cacheName = 'offlineTest';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/',
                new Request('https://www.google.com/logos/doodles/2017/st-andrews-day-2017-5715562192699392-2x.png', {mode:'cors'}),
                'index.html'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(cacheName).then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});