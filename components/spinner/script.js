const btn = document.getElementById('button');
const spinner = document.getElementById('spinner');

let cycles = 0;

btn.addEventListener('click', () => {
	if(spinner.classList.contains('animating')) {
		cycles ++;
		return;
	}
	action();
});

spinner.addEventListener('animationend', () => {
	spinner.style.animation = '';
	spinner.classList.remove('animating');
	if(cycles > 0) {
		cycles --;
		action();
	}
});

function action() {
	setTimeout(() => {
		spinner.classList.add('animating');
		spinner.style.animation = 'spin 3s linear';
	}, 0);
}
