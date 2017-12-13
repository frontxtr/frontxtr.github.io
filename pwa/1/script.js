(()=> {
	
	if('serviceWorker' in navigator) {
		
		window.addEventListener('load', ()=> {
			navigator.serviceWorker.register('service-worker.js')
				.then((registration)=>{
					console.log("Registration completed ! ", registration);
				});
		}, function(error) {
			console.log(error);
		});
		
	}
	
})();
