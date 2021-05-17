import {DSU} from '../dsu.js';

customElements.define('dsu-field', class extends HTMLElement {
    constructor() {
        super();

        this.dsu = null;

        const template = document.querySelector('#dsu-visualizer').content;

        this.attachShadow({mode: 'open'}).appendChild(template.cloneNode(true));

        const form = this.shadowRoot.querySelector('#dimensions');
        const controls = this.shadowRoot.querySelector('#controls');
        const field = this.shadowRoot.querySelector('#matrix');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            field.innerHTML = '';
            const x = +e.srcElement[0].value;
            const y = +e.srcElement[1].value;
            this.dsu = new DSU(x*y);
            this.createField(field, x, y);
        });

        controls.addEventListener('submit', (e) => {
            e.preventDefault();
            if (field.children.length) {
                const that = +e.srcElement[0].value;
                const other = +e.srcElement[1].value;
                this.dsu.union(that, other);
                this.renderField(field, this.dsu.nodes);
            } else {
                alert('Please first build a field');
            }
        });
    }

    createField(el, x, y) {
        for (let i = 0; i < x; i++) {
            const row = document.createElement('div');
            row.classList.add(i);
            for (let j = 0; j < y; j++) {
                const cell = document.createElement('span');
                // transforming 2d to 1d
                const num = parseInt(i * y + j);
                const node = this.dsu.root(num);
                cell.id = node;
                cell.textContent = node;
                cell.style.backgroundColor = this.getColor(node);
                row.appendChild(cell);
            }
            el.appendChild(row);
        }
    }

    renderField(el, nodes) {
        for (let i = 0; i < nodes.length; i++) {
            // to update new root for each node
            const node = this.dsu.root(i);
            const nodeEl = this.shadowRoot.getElementById(i);
            nodeEl.textContent = node;
            nodeEl.style.backgroundColor = this.getColor(node);
        }
    }

    getColor(nodeNum) {
        return `rgb(${nodeNum*200**2%255}, ${nodeNum**3%255}, ${nodeNum*200**4%255})`
    }
});
