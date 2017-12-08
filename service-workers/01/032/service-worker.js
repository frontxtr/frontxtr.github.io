function log(msg) {

    console.log(msg);

}

self.addEventListener('fetch', function(event){

    log('serviceWorker is currently handling fetch event for ' + event.request.url);

    if( requestUrl.pathname === '/urlshortener/v1/url' && event.request.headers.has('X-Mock-Response') ) {

        var response = {
            body : {
                kind : 'urlshortener#url',
                id : 'http://goo.gl/IKyjuU',
                longUrl : 'https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html'
            },
            init : {
                status : 200,
                statusText : 'OK',
                headers : {
                    'Content-Type': 'application/json',
                    'X-Mock-Response' : 'yes'
                }
            }
        };

        var mockResponse = new Response(JSON.stringify(response.body), response.init);

        log("Responding with a mock response body: " + response.body);

        event.respondWith(mockResponse);

    }

});