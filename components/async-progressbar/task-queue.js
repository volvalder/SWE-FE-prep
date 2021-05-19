customElements.define('task-queue', 
    class extends HTMLElement {
        constructor() {
            super();
            this.taskQueue = [];

            const template = document.getElementById('task-queue').content;

            this.attachShadow({mode: 'open'}).appendChild(template.cloneNode(true));
            const $ = this.shadowRoot.querySelector.bind(this.shadowRoot);

            this.loadStrip = $('#loading-strip');
            this.logBlock = $('#task-log');

            const progBar = $('#progress-bar');
            const startBtn = $('#start');
            const tasks = [
                'Constructing https request.',
                'Request is being encripted.',
                'DNS server has resolved ip address.',
                'Request is recieved on the server.',
                'Request is being decripted.',
                'HTTPS request is being deconstructed.',
                'Response sent...'
            ];

            for (let [i, task] of tasks.entries()) {
                this.taskQueue.unshift(this.createTask(i*500, task));
            }
            const clickHandler = this.processQueue.bind(this);
            startBtn.addEventListener('click', clickHandler);
        }

        createTask(ms, text) {
            return () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(text);
                    }, ms);
                });
            }
        }

        processQueue() {
            this.renderProgressStrip(0);
            const stackSize = this.taskQueue.length;
            const chunk = 100 / stackSize;

            function cycle() {
                const len = this.taskQueue.length;
                if (len) {
                    const task = this.taskQueue.pop();
                    task().then((res) => {
                        const percent = Math.round((stackSize - len) * chunk);
                        this.renderProgressStrip(percent);
                        this.addLog(res);
                        cycle.call(this);
                    });
                } else {
                    this.renderProgressStrip(100);
                    done = true;
                }
            }
            cycle.call(this);
        }

        renderProgressStrip(percent) {
            this.loadStrip.style.width = percent+'%';
        }

        addLog(text) {
            const el = document.createElement('p');
            el.textContent = text;
            this.logBlock.appendChild(el);
        }
    }
) 