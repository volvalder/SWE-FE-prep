/**
* Usage notes:
* Start with your functions that you will compose later:
* const a = (x) => (z) => x+z;
* const b = (x) => (z) => x*z;
* const c = (x) => (z) => x-z;
* Assign your compose or pipe function in order to use it's closure
* with all of those functions.
* const calc = compose(a(10), b(5), c(7));
* Now call it with something:
* calc(100);
* arg is going to equal 100 and will be used as a default value,
* now this value will be passed to each function from right to left
* resulting in (7 - 100) * 5 + 10
*/

function compose(...fns) {
    return (arg) => {
        return fns.reduceRight((agrVal, curFunc) => curFunc(agrVal), arg);
    }
}

function pipe(...fns) {
    return (arg) => {
        return fns.reduce((agrVal, curFunc) => curFunc(agrVal), arg);
    }
}
