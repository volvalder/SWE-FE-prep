/**
*    <star-widget star-count="7"></star-widget>
*/

customElements.define('star-widget', 
    class extends HTMLElement {
        constructor() {
            super();

            const template = document.getElementById('star-widget').content;
            this.attachShadow({mode: 'open'}).appendChild(template.cloneNode(true));
        }

        connectedCallback() {
            let starNum = +this.getAttribute('star-count') || 5;
            while (starNum-- != 0) {
                const starEl = document.createElement('div');
                starEl.classList.add('star');

                starEl.addEventListener('mouseover', this.eventHandler.bind(this, 'active'));
                starEl.addEventListener('click', this.eventHandler.bind(this, 'selected'));
                starEl.addEventListener('mouseleave', this.eventHandler.bind(this, 'active'));

                this.shadowRoot.appendChild(starEl);
            }
        }

        eventHandler(cl, e) {
            this.shadowRoot.querySelectorAll('.star').forEach((item) => item.classList.remove(cl));
            if (e.type !== 'mouseleave') {
                const el = e.target;
                this.#fillLeft(el, cl);
            }
        }

        #fillLeft(el, cl) {
            el.classList.add(cl);
            if (el.previousSibling && el.previousSibling.classList){
                this.#fillLeft(el.previousSibling, cl);
            }
        }
    });