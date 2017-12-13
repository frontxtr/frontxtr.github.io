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

self.addEventListener('fetch', function(event){
    if(!navigator.onLine && event.request.url.indexOf('index.html') !== -1) {
        event.respondWith(showOfflineLanding(event));
    } else {
        event.respondWith(pullFromCache(event))
    }
});

function showOfflineLanding(event) {
    return caches.match(new Request('offline.html'));
}

function pullFromCache(event) {

    return caches.match(event.request).then(function(response){
        return response || fetch(event.request).then(function(response){
            return caches.open('version1').then(function(cache){
                cache.put(event.request, response.clone());
                return response;
            })
        })
    })

}