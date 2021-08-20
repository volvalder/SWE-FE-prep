const filters = [
    {k: 'color', v: 'red'},
    {k: 'type', v: 'metal'},
    {k: 'color', v: 'blue'},
    {k: 'type', v: 'sand'},
    {k: 'color', v: 'red'},
    {k: 'type', v: 'plastic'},
    {k: 'color', v: 'yellow'},
    {k: 'type', v: 'metal'},
    {k: 'color', v: 'red'},
    {k: 'type', v: 'metal'},
];

const products = [
    {type: 'wood', color: 'red', name: 'phone'},
    {type: 'metal', color: 'white', name: 'phone'},
    {type: 'wood', color: 'white', name: 'phone'},
    {type: 'plastic', color: 'red', name: 'phone'},
    {type: 'wood', color: 'blue', name: 'phone'},
    {type: 'wood', color: 'gray', name: 'phone'},
    {type: 'wood', color: 'red', name: 'phone'},
    {type: 'wood', color: 'red', name: 'phone'},
    {type: 'wood', color: 'red', name: 'phone'},
    {type: 'wood', color: 'red', name: 'phone'},
];

const excludes = new Map();

for(let {k, v} of filters) {
    if(!excludes.has(k)) excludes.set(k, new Set());
    excludes.get(k).add(v);
}

const result = products.filter((p) => {
	return Object.keys(p).every((key) => {
  	return !excludes.has(key) || !excludes.get(key).has(p[key]);
  });
});

console.log(result);
