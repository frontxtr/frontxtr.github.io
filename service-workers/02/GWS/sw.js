'use strict';

var CACHE_NAME = "offline-cache";

var filesToCache = [
    '/',
    'index.html',
    'index.js',
    'packt-logo.png'
];

self.addEventListener('install', function(){
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened! " + cache);
                return cache.addAll(filesToCache);
            })
    )
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if( response ) {
                    return response;
                }
                return fetch(event.request)
            })
    )
});