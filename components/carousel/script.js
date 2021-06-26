const IMAGE_WIDTH = 400;

customElements.define('image-slider', class extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('image-slider').content;
        this.attachShadow({mode: 'open'}).appendChild(template.cloneNode(true));

        this.curIndx = 0;
    }

    connectedCallback() {
        const $ = this.shadowRoot.querySelector.bind(this.shadowRoot);
        this.screen = $('#screen');
        const elements = this.screen.children;

        this.left = $('#left');
        this.right = $('#right');
        this.size = elements.length;
        this.left.addEventListener('click', this.clickHandler.bind(this));
        this.right.addEventListener('click', this.clickHandler.bind(this));
    }

    clickHandler(e) {
        const origin = e.target.getAttribute('id');

        this.curIndx = origin === 'left' ? this.curIndx - 1 : this.curIndx + 1;
        if(this.curIndx === this.size) {
            this.curIndx = 0;
        }
        if(this.curIndx === -1) {
            this.curIndx = this.size-1;
        }
        
        this.screen.style.transform = `translateX(-${this.curIndx * IMAGE_WIDTH}px)`;
    }

});