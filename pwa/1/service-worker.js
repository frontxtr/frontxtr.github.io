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
    event.respondWith(fetch(event.request));
});