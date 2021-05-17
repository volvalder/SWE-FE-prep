class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addLeft(item) {
        if (this.size === 0) {
            this.tail = this.head = new Node(item);
        } else {
            this.head.prev = new Node(item);
            this.head.prev.next = this.head;
            this.head =  this.head.prev;
        }
        this.size++;
    }

    pop() {
        let result;
        if (this.size === 0) {
            return false;
        } else if (this.size === 1) {
            result = this.head.val;
            this.head = null;
            this.tail = null;
            this.size = 0;
        } else {
            result = this.tail.val;
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.size--;
        }
        return result;
    }
}

const q = new Queue();
q.addLeft(1);
q.addLeft(2);
console.log(q.size);
console.log(q.pop());
console.log(q.pop());
console.log(q.pop()); // should return false
