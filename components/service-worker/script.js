if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js', {scope: './'}).then(() => {
		if (navigator.serviceWorker.controller) {
			console.info('this page is being controlled by ' + navigator.serviceWorker.controller);
			const img = document.createElement('img');
			img.setAttribute('src', 'dwnld.svg');
			document.body.appendChild(img);
		}
	});
}