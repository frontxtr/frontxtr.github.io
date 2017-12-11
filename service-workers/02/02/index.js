'use strict';

var scope = {
    scope: './'
};

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register(
        'sw.js', scope
    ).then(function(serviceWorker){
        printStatus('SUCCESSFULL');
    }).catch(function(error){
        printStatus('ERROR' + error);
    });


} else {
    printStatus('unavailable');
}

function printStatus(status) {
    document.getElementById("status").innerHTML = status;
}