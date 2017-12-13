if( 'serviceWorker' in navigator ) {
	window.addEventListener('load', function(){
		navigator.serviceWorker.register('service-worker')
			.then(function(reg){
				console.log("ServiceWorker Registration completed", reg);
			})
	});
}