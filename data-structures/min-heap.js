class MinHeap {
    constructor() {
        this.heap = [];
    }

    append(val) {
        this.heap.push(val);
        this.swim();
    }

    pop() {
        const size = this.heap.length;
        if(size === 1) {
            return this.heap.pop();
        } else if(size > 1) {
            this.#switch(0, size-1);
            const dropped = this.heap.pop();
            this.sink();
            return dropped;
        }
    }

    swim() {
        let curInd = this.heap.length - 1;
        let parent = this.#calcParent(curInd);

        while(parent >= 0) {
            if (this.heap[parent] > this.heap[curInd]) {
                this.#switch(parent, curInd);
                curInd = parent;
                parent = this.#calcParent(curInd);
                continue;
            }
            break;
        }
    }

    sink() {
        const lastInd = this.heap.length - 1;
        let curInd = 0;
        let lInd = this.#calcLeft(curInd);
        let rInd = this.#calcRight(curInd);

        while(lInd <= lastInd) {
            // Here i take lesser item between left and right only if right exists
            const nextInd = rInd <= lastInd
                            && this.heap[lInd] - this.heap[rInd] >= 0
                            ? rInd
                            : lInd;
            if (this.heap[curInd] > this.heap[nextInd]) {
                this.#switch(curInd, nextInd);
                curInd = nextInd;
                lInd = this.#calcLeft(curInd);
                rInd = this.#calcRight(curInd);
                continue;
            }
            break;
        }

    }

    #switch(a,b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
    #calcLeft(cur) {
        return Math.floor(cur*2+1);
    }
    #calcRight(cur) {
        return Math.floor(cur*2+2);
    }
    #calcParent(cur) {
        return Math.floor((cur - 1) / 2);
    }
}

/*
* Usage notes:
* Copy/paste code below to your environment.

const heap = new MinHeap();

heap.append(77);
heap.append(86);
heap.append(19);
heap.append(12);
heap.append(7);

heap.pop();//7
heap.pop();//12
heap.pop();//19
heap.pop();//77
heap.pop();//86

*/
