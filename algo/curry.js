function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...rest) {
                return curried.apply(this, args.concat(...rest));
            }
        }
    }
}

function sum(a,b,c) {
    return a + b + c;
}

const curriedSum = curry(sum);
const firstTwo = curriedSum(3)(4);
const finalSum = firstTwo(2); //9
