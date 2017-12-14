importScripts('sw-toolbox.js');

self.addEventListener('install', (event) => {

});

toolbox.router.get('*.html', toolbox.cacheFirst, {
    cache: {
        name : 'sw-toolbox-version2',
        maxEntries : 20,
        maxAgeSeconds : 60 * 60 * 24 * 7
    }
});

toolbox.router.get('/*', toolbox.networkFirst, {
    origin: 'openlibrary.org',
    cache : {
        name : 'sw-toolbox-version2',
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 12
    }
});