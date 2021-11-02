const list = document.getElementById('list');
const groupCheckboxes = document.querySelectorAll('.group'); 

list.addEventListener('click', function parse({target}) {
	if(target.tagName !== 'INPUT') return;

	const closestParent = target.parentNode.parentNode;

	if(closestParent.id === 'list' || closestParent.tagName === 'BODY') return; // base case

	const checkValues = new Set(
		Array.from(closestParent.children).map(el => {
			const input = el.querySelector('input');
			return input.indeterminate ? 'indeterminate' : input.checked;
		})
	);
	const isIndeterminate = checkValues.size > 1 ? true : false;

	const commonCheckbox = closestParent.parentNode.querySelector('input');

	commonCheckbox.indeterminate = false;
	commonCheckbox.checked = false;

	if(isIndeterminate) {
		commonCheckbox.indeterminate = true;
	} else {
		commonCheckbox.checked = [...checkValues][0];
	}

	parse({target: commonCheckbox});
});

groupCheckboxes.forEach(checkbox => checkbox.addEventListener('click', function parse({target}) {
		const state = target.checked;
		const list = target.parentNode;

		list.querySelectorAll('li').forEach(li => {
		const input = li.querySelector('input');

		input.indeterminate = false;
		input.checked = state;

		if(input.classList.contains('group')) parse({target: input});
	});
}));
