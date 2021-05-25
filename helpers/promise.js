class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = null;
        this.waitline = [];

        const resolve = (val) => {
            this.state = 'fulfilled';
            this.value = val;
            this.waitline.forEach((fn) => queueMicrotask(() => fn(val)));
        };
        const reject = (val) => {
            this.state = 'rejected';
            this.value = val;
            this.waitline.forEach((fn) => queueMicrotask(() => fn(val)));
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onReject) {
        return new MyPromise((res, rej) => {
            if (this.status === 'fulfilled') return this.process(onFulfilled, res, rej);
            if (this.status === 'rejected') return this.process(onReject, res, rej);
            this.waitline.push(() => { this.process(onFulfilled, res, rej) });
        });
    }

    process(fn, resolve, reject) {
        try {
            const resolution = fn(this.value);
            if (resolution instanceof MyPromise) {
                resolution.then(resolve, reject);
            } else {
                resolve(resolution);
            }
        } catch (err) {
            reject(err);
        }
    }
}

const defer = new MyPromise((res, rej) => {
    setTimeout(() => res('Success!'), 2000);
});

defer.then((result) => {
    console.log(result);
    return new MyPromise((res, rej) => {
        setTimeout(() => res('Another Success!'), 2000);
    });
}).then((finalResult) => {
    console.log(finalResult);
});
