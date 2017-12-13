self.addEventListener('install', function(event){
   if(!('caches' in self)) return;
   event.waitUntil(
       caches.open('version1').then(function(cache){
           return cache.addAll([
               'index.html',
               'images/i-love-pirates.jpg',
               'offline.html'
           ])
       })
   )
});

function setUpPromises(promises) {

    return new Promise((resolve, reject)=>{
        promises.forEach(promise=> promise.then(resolve));
    });

}

self.addEventListener('activate', function(event){
    const CURRENT_CACHE = 'version2';
    event.waitUntil(
        caches.keys().then(function(cacheKeys){
            return Promise.all(
                cacheKeys.map(function(cacheKey){
                    if(cacheKey !== CURRENT_CACHE) {
                        console.log('Deleting cache: ' + cacheKey);
                        return caches.delete(cacheKey);
                    } else {
                        return caches.match(event.request);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        setUpPromises([
            caches.match(event.request),
            fetch(event.request)
        ])
    )
});



/*
self.addEventListener('fetch', function(event){
    const version = "version1";
    event.respondWith(
        caches.open(version).then(function(cache){
            return cache.match(event.request).then(function(response){
                var fetchPromise = fetch(event.request).then(function(networkResponse){
                   cache.put(event.request, networkResponse.clone());
                   return networkResponse;
                });
                event.waitUntil(fetchPromise);
                return response;
            });
        })
    );

});
*/