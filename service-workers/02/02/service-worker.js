'use strict';
var version = 1;

var cacheName = 'static-' + version;
self.addEventListener('install', installHandler);


function installHandler(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                'index.html',
                'packt-logo.png'
            ]);
        })
    );
}

self.addEventListener('fetch', function (event) {

    event.respondWidth(
        fetch(event.request).then(function(response){
            caches.open(cachename).then(function(){
                if(response.status >= 500) {
                    cache.match(event.request).then(function(){
                        return response;
                    }).catch(function(){
                        return response;
                    })
                } else {
                    cache.put(event.request, response.clone());
                    return response;
                }
            });
        })
    )

});

