customElements.define('animated-squares', class extends HTMLElement {
    busy = false;

    constructor() {
        super();
        this.stack = [];
    }

    connectedCallback() {
        const [x, y] = this.getAttribute('dimensions').split('-');
        this.size = x*y;
        this.buildField(+x, +y);
        this.addListener();
    }

    buildField(x, y) {
        const wrapper = document.createDocumentFragment();
        const table = document.createElement('div');
        table.classList.add('table');

        for(let i = 0; i < x; i++) {
            const row = document.createElement('div');
            row.classList.add('row');

            for(let j = 0; j < y; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    wrapper.appendChild(table);
    this.appendChild(wrapper);
    }
  
    addListener() {
        const els = this.querySelectorAll('.cell');
        els.forEach((el) => {
            el.addEventListener('click', () => {
                if(this.busy) return;
                this.stack.push(el);
                el.classList.add('hidden');
                if(this.stack.length === this.size) {
                    this.busy = true;
                    this.bringBack();
                }
            });
        });
    }

    bringBack() {
        if(!this.stack.length) {
            this.busy = false;
            return;
        }
        const el = this.stack.pop();
        setTimeout(() => {
            el.classList.remove('hidden');
            this.bringBack();
        }, 1000);
    }
});
