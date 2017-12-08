var version = -1;

var cachename  = "stale-" + version;

self.addEventListener('install', function(event){
    self.skipWaiting();
});

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