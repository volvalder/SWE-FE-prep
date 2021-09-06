
const GAME_SETUP = {
    'hard': .3,
    'medium': .2,
    'easy': .1,
};

const DIRS = [[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [-1, -1], [-1, 1], [1, -1]];

customElements.define('mine-sweeper', class extends HTMLElement {

    constructor() {
        super();
        const template = document.getElementById('mine-sweeper').content;
        this.attachShadow({mode: 'open'}).appendChild(template.cloneNode(true));

        this.difficulty = 'hard';
        this.bombPos = [];
        this.visited = new Set();
    }

    static get observableAttributes() { return ['dimensions', 'difficulty']; }

    connectedCallback() {
        const field = this.shadowRoot.querySelector('#field');
        const [x, y] = this.getAttribute('dimensions').split('-');
        this.difficulty = this.getAttribute('difficulty');

        this.field = [...Array(+x)].map(_ => [...Array(+y)]);

        this.shadowRoot.querySelector('#field').addEventListener('click', (e) => {
            if(!e.target?.classList.contains('cell')) return;
            const cell = e.target;
            const [row, col] = cell.getAttribute('pos').split('-');

            if(this.field[row][col] === '💣') return this.gameOver();
            if(this.field[row][col] === undefined) this.explore(+row, +col, +x, +y);
            if(this.field[row][col] > 0) {
                cell.textContent = this.field[row][col];
                cell.classList.add('visited');
            }
            
        }, {capture: true});

        this.generateField(+x-1, +y-1, this.difficulty);
        this.render(field, +x-1, +y-1,)
    }

    generateField(row, col, dif = 'hard') {
        const numOfMines = col * row * GAME_SETUP[dif];

        for(let i = -1; ++i <= row;) {
            const randColNum = new Set();
            const bombsPerRow = Math.round(numOfMines / row);

            while(randColNum.size !== bombsPerRow) {
                randColNum.add(Math.round(Math.random() * col));
            }

            for(let j =-1; ++j <= col;) {
                if(randColNum.has(j)) {
                    this.field[i][j] = '💣';
                    this.bombPos.push([i,j]);

                    for(let [x, y] of DIRS) {
                        const xi = x + i;
                        const yj = y + j;

                        if(xi >= 0 && xi <= row && yj >= 0 && yj <= col) {
                            if(this.field[xi][yj] > 0) {
                                this.field[xi][yj]++;
                                continue;
                            }
                            if(this.field[xi][yj] === undefined) {
                                this.field[xi][yj] = 1;
                            }
                        }
                    }
                }
            }
        }
    }

    render(field, row, col) {
        const matrix = document.createDocumentFragment();

        for(let i = -1; ++i <= row;) {
            const tableRow = document.createElement('div');
            tableRow.className = 'row';

            for(let j =-1; ++j <= col;) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.setAttribute('pos', `${i}-${j}`);

                tableRow.appendChild(cell);
            }
            matrix.appendChild(tableRow);
        }
        field.appendChild(matrix);
    }

    explore(x, y, row, col) {
        const current = this.shadowRoot.querySelector(`.cell[pos="${x}-${y}"]`);
        current.classList.add('visited');
        this.visited.add(`${x}${y}`);

        for(let [i, j] of DIRS) {
            const xi = x + i;
            const yj = y + j;

            if(xi >= 0 && xi < row && yj >= 0 && yj < col && !this.visited.has(`${xi}${yj}`)) {
                if(typeof this.field[xi][yj] === 'number') {
                    const cell = this.shadowRoot.querySelector(`.cell[pos="${xi}-${yj}"]`);
                    cell.textContent = this.field[xi][yj];
                    cell.classList.add('visited');
                }
                if(this.field[xi][yj] === undefined) {
                    const cell = this.shadowRoot.querySelector(`.cell[pos="${xi}-${yj}"]`);
                    this.explore.call(this, xi, yj, row, col);
                }
                this.visited.add(`${xi}${yj}`);
            }
        }
    }

    gameOver() {
        while(this.bombPos.length) {
            const [x, y] = this.bombPos.pop();
            const cell = this.shadowRoot.querySelector(`.cell[pos="${x}-${y}"]`);
            cell.textContent = '💣';
            cell.classList.add('visited');
        }
    }
});