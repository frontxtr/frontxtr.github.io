var cacheName = 'dependices-cache';

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll([
                'apple',
                'google',
                'adobe',
                'facebook',
                'amazon'
            ]);
        }).then(function(){
            self.skipWaiting();
        })
    )
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response) {
                    console.log("Fetching from cache, ", event.request.url);
                    return response;
                } else {
                    console.log("Fetching from server, ", event.request.url);
                }
                return fetch(event.request);
            })
    )
});

self.addEventListener('activate', function(event){
    event.waitUntil(self.clients.claim());
});