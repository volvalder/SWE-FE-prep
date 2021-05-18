function promisify(fn) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            function callback(result) {
                resolve(result);
            }
            /**
            * if you are wondering what kind of magic is happening here:
            * since we are passing callback's function body
            * instead of it's execution it will just wrap that last argument
            * and use callback(a + b) as 'result' value, so when it is going
            * to be resolved it will also be evaluated with arguments 'a' and 'b'
            * present thankfully to 'apply'
            */
            fn.apply(this, [...args, callback]);
        });
    }
}

const sumWithCallback = function (a, b, callback) {
    callback(a + b);
}
const promisified = promisify(sumWithCallback);
promisified(5, 15).then(res => console.log(res));
