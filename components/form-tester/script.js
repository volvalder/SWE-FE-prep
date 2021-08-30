const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
	const formData = new FormData(form);	
	console.log([...formData.entries()]);
	e.preventDefault();
});
