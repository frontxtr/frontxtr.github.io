self.addEventListener('install', function(e){
    console.log('Install event: ' + e);
});

self.addEventListener('active', function(e){
    console.log('Activate event: ' + e);
}) ;

