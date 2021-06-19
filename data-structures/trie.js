class Node {
    constructor() {
        this.children = Array(26);
        this.wordEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    addWord(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const w = word[i];
            const chCode = this.#getCode(w);
            if (!node.children[chCode]) {
                node.children[chCode] = (i === word.length - 1)
                    ? new Node(true)
                    : new Node();
            }
            node = node.children[chCode];
        }
        node.wordEnd = true;
    }

    isWordIn(word) {
        let node = this.root;
        for (let w of word) {
            const chCode = this.#getCode(w);
            if (!node.children[chCode]) return false;
            node = node.children[chCode];
        }
        return node.wordEnd ? true : false;
    }

    findAll(word) {
        let node = this.root;
        let text = '';
        const result = [];
        for (let w of word) {
            const chCode = this.#getCode(w);
            if (!node.children[chCode]) return result;
            text += w;
            if (node.children[chCode].wordEnd) {
                result.push(text);
            }
            node = node.children[chCode];
        }
        return result;
    }

    #getCode(ltr) {
        return ltr.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}

/** Usage example:
    const dict = new Trie();

    dict.addWord('pro');
    dict.addWord('proto');
    dict.addWord('protos');
    dict.addWord('promise');
    dict.addWord('protocol');

    console.log(dict.isWordIn('protos'));
    console.log(dict.isWordIn('zerg'));
    console.log(dict.isWordIn('prot'));
    console.log(dict.findAll('protocol'));
*/
