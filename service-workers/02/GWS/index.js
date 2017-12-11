'use strict';

var scope = {
    scope: './'
};

if( 'serviceWorker' in navigator ) {

    navigator.serviceWorker.register(
        'sw.js', scope
    ).then(function(serviceWorker){
        printStatus("Success!");
        log("Service worker registration completed with scope: " + serviceWorker.scope);
    }).catch(function(error){
        printStatus("ERROR! " + error);
        log("an error occurred while registration of service Worker ! " + error);
    });

} else {
    printStatus("UNAVAILABLE");
}


function printStatus(status) {
    document.getElementById("status").innerHTML = status
}

function log(msg) {
    console.log("[Service Worker] " + msg)
}