class Dijkstra {
    constructor(data) {
        this.adjList = new Map();
        // to correctly display a size of unordered array of paths.
        let highest = -Infinity;
        for(let [u,v,w] of data) {
            highest = Math.max(u, v, highest);
            this.adjList.set(u,
                this.adjList.has(u)
                ? [...this.adjList.get(u), [w, v]]
                : [[w, v]]);
        }
        this.path = Array(highest+1).fill(Infinity);
        this.pQ = new MinHeap();
    }

    findPath(source, target) {
        this.path[source] = 0;
        this.pQ.add(0, source);
        while(this.pQ.heap.length) {
            const [w, v] = this.pQ.pop();
            for (let nei of this.adjList.get(v) ?? []) {
                this.#relax(v, nei);
            }
        }
        console.log(
            `%cShortest path from ${source} to ${target} is ${this.path[target]}`,
            'color: white; background: green; padding: 3px;'
        );
    }

    #relax(verx, neib) {
        const [w, v] = neib;
        // basically what we are asking here is if
        // discovered vertex plus current distance 
        // is closer than previous distance
        if(this.path[v] > this.path[verx] + w) {
            this.path[v] = this.path[verx] + w;
            this.pQ.add(this.path[v], v);
        }
    }
}

// This is Min Heap imitation that takes O(n log n) time complexity.
// Actual implementation is much longer.
class MinHeap {
    constructor() {
        this.heap = [];
    }
    add(weight, val) {
        this.heap.push([weight,val]);
        this.#sort()
    }
    pop() {
        const result = this.heap.shift();
        this.#sort();
        return result;
    }
    #sort() {
        this.heap.sort((a,b) => a[0] - b[0])
    }
}


const arr = [[0,1,4], [0,2,13], [1,2,5],[2,3,6],[3,7,12]];
const D = new Dijkstra(arr);

D.findPath(0,7);
D.findPath(2,3);
D.findPath(3,7);
