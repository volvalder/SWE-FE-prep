/**
    Task is to call this function as it was remote api call
    so you cannot change it in any way. Function accepts page number
    and your function should support only number of entries.
    Tircky part is how to manage number of current page, when you
    only can iteract with function by providing number of results you want to see.
*/
function getPage(pageNumber) {
  return Array(10).fill(1).map(_ => Math.floor(Math.random() * 100));
}

let page = 0;
let overflow = [];

function getEntries(numOfEntries) {
	const result = [];
	let entriesLeft = numOfEntries;

	overflow = getPage(page);
    
    while(entriesLeft > 0) {
  	    if(!overflow.length) {
    	    page++;
            overflow = getPage(page);
        }
    	result.push(overflow.shift());
        entriesLeft--;
    }
  
    return result;
}

console.log(getEntries(2).length, page); // 2, 0
console.log(getEntries(7).length, page); // 7, 0
console.log(getEntries(2).length, page); // 2, 0
console.log(getEntries(12).length, page); // 12, 1

console.log(getEntries(55).length, page); // 55, 6

