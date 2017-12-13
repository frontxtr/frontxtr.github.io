self.addEventListener('install', function(event){
   if(!('caches' in self)) return;
   event.waitUntil(
       caches.open('version1').then(function(cache){
           return cache.addAll([
               'index.html',
               'images/i-love-pirates.jpg'
           ])
       })
   )
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request).then(function(response){
                console.log("fetched from network this time!");
                return caches.open('version1').then(function(cache){
                    cache.put(event.request, response.clone());
                    return response;
                })
            })
        })
    );
});