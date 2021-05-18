/**
* Usage notes:
* For example, we need to calc fibonacci number:
* const fib = memo((n)=>n<2?1:fib(n-2)+fib(n-1));
* fib(10) - first call will add all new keys to a cache O(n)
* fib(9) - this call will take it's value directly from cache O(1)
*/

const memo = function(func) {
    const cache = {};

    return (...args) => {
        const key = JSON.stringify(args);
        if (!(key in cache)) {
            const val = func(args);
            cache[key] = val;
        }
        return cache[key];
    };
};
