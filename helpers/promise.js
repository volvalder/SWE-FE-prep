class Promi {
    constructor(handler) {
        this.status = 'pending';
        this.value = null;
        this.onFulfilledCbs = [];
        this.onRejectedCbs = [];

        const resolve = value => {
            this.status = 'fulfilled';
            this.value = value;
            this.onFulfilledCbs.forEach(fn => fn(value));
        }
        const reject = value => {
            this.status = 'rejected';
            this.value = value;
            this.onRejectedCbs.forEach(fn => fn(value));
        }

        try {
            handler(resolve, reject);
        } catch(err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        return new Promi((resolve, reject) => {
            if (this.status === 'fulfiled') {
                this.tryToFulfill(onFulfilled, resolve, reject);
            } else if (this.status === 'rejected') {
                this.tryToFulfill(onRejected, resolve, reject);
            } else {
                this.onFulfilledCbs.push(() => {this.tryToFulfill(onFulfilled, resolve, reject)});
                this.onRejectedCbs.push(() => {this.tryToFulfill(onRejected, resolve, reject)});
            }
        });
    }

    tryToFulfill(resolution, resolve, reject) {
        try {
            const res = resolution(this.value);
            if (res instanceof Promi) {
                res.then(resolve, reject);
            } else {
                resolve(res);
            }
        } catch(err) {
            reject(err);
        }
    }
}
