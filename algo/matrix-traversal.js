// I was curious about how exactly BFS and DFS traverse through 2D plane
// Each step can be tracked just by counting 1,2,3 ... n

class Traversal {
    constructor(start, size) {
        this.field = Array(size).fill(0).map(arr=>Array(size).fill(0));
        this.len = size;
        [this.row, this.col] = start;
        this.dirs = [[-1, 0], [0, 1], [0, -1], [1, 0]]; //top, right, left, bottom
    }

    bfs() {
        const visited = new Set([this.row, this.col].toString());
        const queue = [[this.row, this.col]];
        let step = 0;

        while(queue.length) {
            const [posY, posX] = queue.pop();
            this.field[posY][posX] = step++;
            for(let [row, col] of this.dirs) {
                const [y, x] = [row+posY, col+posX];
                if (0 <= x && x < this.len && 0 <= y && y < this.len && !visited.has([y, x].toString())) {
                    visited.add([y, x].toString());
                    queue.unshift([y, x]);
                }
            }
        }
    }

    dfs() {
        const visited = new Set([this.row, this.col].toString());
        const stack = [[this.row, this.col]];
        let step = 0;

        while(stack.length) {
            const [posY, posX] = stack.pop();
            this.field[posY][posX] = step++;
            for(let [row, col] of this.dirs) {
                const [y, x] = [row+posY, col+posX];
                if (0 <= x && x < this.len && 0 <= y && y < this.len && !visited.has([y, x].toString())) {
                    visited.add([y, x].toString());
                    stack.push([y, x]);
                }
            }
        }
    }
}
const T1 = new Traversal([0, 0], 7);
T1.bfs();
console.log('All way BFS');
console.table(T1.field);

const T2 = new Traversal([0, 0], 7);
T2.dfs();
console.log('All way DFS');
console.table(T2.field);

const T3 = new Traversal([0, 0], 7);
T3.dirs = [[0, 1], [1, 0]];
T3.bfs();
console.log('Only Bottom and Right BFS');
console.table(T3.field);

const T4 = new Traversal([0, 0], 7);
console.log('Only Bottom and Right DFS');
T4.dirs = [[0, 1], [1, 0]];
T4.dfs();
console.table(T4.field);
