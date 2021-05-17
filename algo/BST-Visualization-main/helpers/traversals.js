class Traversals {
    constructor() {
        this.tree = new Map();
    }

    * postorder(root, nodeSelector) {
        const stack = [];
        let lastVisited = null;
        let node = root;

        while (stack.length || node) {
            // Going left as far as possible
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                const peekNode = stack[stack.length - 1];
                // Visiting right whenever is possible
                if (peekNode.right && lastVisited !== peekNode.right) {
                    node = peekNode.right;
                } else {
                    // Otherwise we are showing current node and checking next in stack
                    const id = `${nodeSelector}${peekNode.val}`;
                    yield id;
                    lastVisited = stack.pop();
                }
            }
        }
    }

    * preorder(root, nodeSelector) {
        const stack = [root];
        const visited = new Set();

        while (stack.length) {
            const node = stack.pop();
            visited.add(node);
            yield `${nodeSelector}${node.val}`;

            // We are pushing right node first cause it is a stack
            // and first node will be pushed further towards deep
            if (node.right && !visited.has(node.right)) {
                stack.push(node.right);
            }
            if (node.left && !visited.has(node.left)) {
                stack.push(node.left);
            }
        }
    }

    * inorder(root, nodeSelector) {
        const stack = [];
        let node = root;

        while (stack.length || node) {
            // Going all the way left
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                // Printing current node and lastly going right
                node = stack.pop();
                yield `${nodeSelector}${node.val}`;
                node = node.right;
            }
        }
    }

    * bfs(root, nodeSelector) {
        const q = [root];
        const visited = new Set();
        // Similar logics to the preorder but while using queue
        while (q.length) {
            const node = q.pop();
            visited.add(node);
            yield `${nodeSelector}${node.val}`;

            if (node.left && !visited.has(node.left)) {
                q.unshift(node.left);
            }
            if (node.right && !visited.has(node.right)) {
                q.unshift(node.right);
            }
        }
    }
    zigzag(root, nodeSelector) {
        return Array.from(this.tree.values()).flat().map((val) => `${nodeSelector}${val}`);
    }
    zigzagHelper(root, floor = 0) {
        if (!root) return;
        if (floor % 2 === 0) {
            if (this.tree.has(floor)) {
                const nodes = this.tree.get(floor);
                nodes.unshift(root.val)
                this.tree.set(floor, nodes);
            } else {
                this.tree.set(floor, [root.val]);
            }
        } else {
            if (this.tree.has(floor)) {
                const nodes = this.tree.get(floor);
                nodes.push(root.val)
                this.tree.set(floor, nodes);
            } else {
                this.tree.set(floor, [root.val]);
            }
        }
        this.zigzagHelper(root.left, floor + 1);
        this.zigzagHelper(root.right, floor + 1);
    }
}
export {Traversals}
