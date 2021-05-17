class DSU {
    constructor(size) {
        this.nodes = [...Array(size).keys()];
        this.rank = Array(size).fill(1);
    }

    root(n) {
        if (n !== this.nodes[n]) {
            // path compression
            this.nodes[n] = this.root(this.nodes[this.nodes[n]]);
        }
        return this.nodes[n];
    }

    isConnected(that, other) {
        return this.root(that) === this.root(other);
    }

    union(that, other) {
        const thatRoot = this.root(that);
        const otherRoot = this.root(other);

        if (this.isConnected(thatRoot, otherRoot)) return;

        if (this.rank[otherRoot] > this.rank[thatRoot]) {
            this.nodes[thatRoot] = otherRoot;
            this.rank[otherRoot] += this.rank[thatRoot];
        } else {
            this.nodes[otherRoot] = thatRoot;
            this.rank[thatRoot] += this.rank[otherRoot];
        }
    }
}

export {DSU};
