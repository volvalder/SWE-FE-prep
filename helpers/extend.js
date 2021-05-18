function extend(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype._super = parent;
    Object.defineProperty(child.prototype, 'constructor', {
        value: child,
        enumerable: false,
        writable: true,
    });
    return child;
}

function Parent() {
    this.canEat = true;
}
Parent.prototype.race = 'Human';

const Kid = extend(function() {
    this._super();
    this.canPlay = true;
}, Parent);

const bob = new Kid();

console.log('Can eat? - ' + bob.canEat);
console.log('Can play? - ' + bob.canPlay);
console.log('Race: ' + bob.race);
console.log('Is child? - ' + (bob instanceof Parent));
