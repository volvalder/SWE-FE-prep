customElements.define('hit-counter',
    class extends HTMLElement {
        constructor() {
            super();
            this.count = 0;

            const template = document.getElementById('hit-counter').content;
            this.attachShadow({mode: 'open'}).appendChild(template.cloneNode(true));
        }

        connectedCallback() {
            this.count = this.getAttribute('initial-count') || 0;
            const hitBtn = this.shadowRoot.querySelector('#hit-btn');
            const output = this.shadowRoot.querySelector('#output');
            output.textContent = this.count;
            hitBtn.addEventListener('click', this.clickHandler.call(this).bind(this));
        }

        clickHandler() {
            let timeout;

            return function() {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.shadowRoot.querySelector('#output').textContent = ++this.count;
                }, 100);
            }
        }
    });