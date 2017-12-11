'use strict';

var scope = {
    scope : './'
};

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register(
        'service-worker.js', scope
    ).then(function(serviceWorker){
        printStatus("Successfull");
    }).catch(function(error){
        printStatus("Error!" + error);
    });

} else {
    printStatus("Not available");
}

navigator.serviceWorker.addEventListener('controllerchange', function(event){
    console.log("EVENT: controllerchange", event);

    navigator.serviceWorker.controller.addEventListener('statechange', function(){

        if( this.state === "activated" ) {
            document.querySelector('#notification').classList.remove('hidden');
        }

    })

});

function printStatus(status) {
    document.querySelector('#status').innerHTML = status;
}

document.querySelector("#resetButton").addEventListener('click',
    function(){
    navigator.serviceWorker.getRegistration.then(function(registration){
        registration.unregister();
        window.location.reload();
    })
    });