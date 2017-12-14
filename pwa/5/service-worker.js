importScripts('sw-toolbox/sw-toolbox.js');

self.addEventListener('install', function(event){
    // nothing to do here
});

toolbox.router.get('/images/*', toolbox.fastest, {
    cache : {
        name: 'sw-toolbox-version1',
        maxEntries : 20,
        maxAgeSeconds : 60 * 30
    }
});