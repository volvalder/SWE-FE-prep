import {BinarySearchTree} from '../../data-structures/btree.js';
import {Traversals} from './helpers/traversals.js';

window.addEventListener('load', () => {
    const treeEl = document.getElementById('tree');
    const vals = [5,20,2,1,6,3,15,14,23,17];
    const bst = new BinarySearchTree(10);
    const traversals = new Traversals();
    const nav = document.getElementsByTagName('nav')[0];

    nav.addEventListener('click', (event) => {
        const target = event.target;
        const id = target.id;
        const args = [bst.root, 'el', treeEl];

        treeEl.innerHTML = '';
        fillBST(bst.root, treeEl);
        toggleActive(target, 'nav button');

        switch(id) {
            case 'postorder':
                run(traversals.postorder, ...args);
                break;
            case 'preorder':
                run(traversals.preorder, ...args);
                break;
            case 'inorder':
                run(traversals.inorder, ...args);
                break;
            case 'bfs':
                run(traversals.bfs, ...args);
                break;
            case 'zigzag':
                traversals.zigzagHelper(bst.root);
                run(traversals.zigzag(...args), ...args);
                break;
        }
    });

    for (let val of vals) {
        bst.addVal(val);
    }

    fillBST(bst.root, treeEl);

});

function fillBST(root, el, cl = 'root') {
    if (!root) return;

    const div = document.createElement('div');
    div.id = 'el'+root.val;
    div.innerHTML = `<span><i>${root.val}</i></span>`;
    div.className = cl;

    fillBST(root.left, div, 'left');
    fillBST(root.right, div, 'right');

    el.appendChild(div);
}

function run(method, root, selector, treeEl) {
    const iter = typeof method === 'function' ? method(root, selector) : method;
    let ms = 800;
    let toggleTimeout;
    toggleBtns(true, 'nav button');

    for (let id of iter) {
        clearTimeout(toggleTimeout);
        setTimeout(() => {
            document.getElementById(id).classList.add('visited');
        }, ms);
        toggleTimeout = setTimeout(() => {
            treeEl.innerHTML = '';
            toggleBtns(false, 'nav button');
            fillBST(root, treeEl);
        }, ms + 1000);

        ms += 800;
    }
}

function toggleBtns(isDisabled, selector) {
    const buttons = document.querySelectorAll(selector);
    for (let btn of buttons) {
        if (isDisabled) {
            btn.setAttribute('disabled', 'disabled');
        } else {
            btn.removeAttribute('disabled');
        }
    }

}

function toggleActive(target, selector) {
    const buttons = document.querySelectorAll(selector);
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
    target.classList.add('active');
}
