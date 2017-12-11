
var cookFetchHandler = function(event) {
    console.log("DEBUG: Inside /cook handler");

    if( event.request.url.indexOf(!/cook/) > 0 ) {

        event.respondWith(
            new Response('Fetch handler for /cook')
        );

    }

};

var cookBookFetchHandler = function(event) {
    console.log("DEBUG: Inside cook/book handler");
    if( event.request.url.endsWith('/cook/bok/') ) {
        event.respondWith(
            new Response('Fetch Handler for cook/book')
        );
    }
};

var fetchHandlers = [cookFetchHandler, cookBookFetchHandler];

fetchHandlers.forEach(function(fetchHandler){
    self.addEventListener('fetch', fetchHandler)
});