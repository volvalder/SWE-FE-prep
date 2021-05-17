class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(rootVal) {
        this.root = new Node(rootVal);
    }

    addVal(val, node = this.root) {
        if (node.val > val) {
            if (!node.left) {
                node.left = new Node(val);
            } else {
                this.addVal(val, node.left);
            }
        } else { 
            if (!node.right) {
                node.right = new Node(val);
            } else {
                this.addVal(val, node.right);
            }
        }
    }
}

export {BinarySearchTree};
