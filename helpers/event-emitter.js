class Observer {
    events = new Map();

    subscribe(event, fn) {
        const eventBag = this.events.get(event) || [];

        eventBag.push(fn);
        this.events.set(event, eventBag);
    }

    unsubscribe(event, fn) {
        const eventBag = this.events.get(event) || [];

        this.events.set(event, eventBag.filter((func) => fn != func));
    }

    emmit(event) {
        for (let fn of this.events.get(event)) {
            fn();
        }
    }
}

function sayHello() {
    console.log('Just a dummy function.');
}

const subj = new Observer();
const toUnsub = function() {
    console.log('I am going to be unsubscribed');
};

subj.subscribe(sayHello, function() {
    console.log('Hello');
});
subj.subscribe(sayHello, toUnsub);
subj.unsubscribe(sayHello, toUnsub);
subj.subscribe(sayHello, function() {
    console.log('World!');
});

subj.emmit(sayHello);
