const element = document.getElementById('container1');
const element2 = document.getElementById('container2');
const element3 = document.getElementById('container3');
const element4 = document.getElementById('container4');

function moveLeft(el, duration, distance) {
    const start = performance.now();

    function move(curTime) {
        const elapsed = curTime - start;
        // this gets an equal parts of total duration
        const progress = elapsed / duration;
        const bitToMove = progress * distance;

        el.style.transform = `translateX(${bitToMove}px)`;
        if (bitToMove < distance) {
            requestAnimationFrame(move);
        }
    }

    requestAnimationFrame(move);
}

function simpleMoveLeft(el, duration, distance) {
    const start = performance.now();

    function move(curTime) {
        const elapsed = curTime - start;
        // this gets an equal parts of total duration
        const progress = elapsed / duration;
        const bitToMove = progress * distance;

        el.style.left = `${bitToMove}px`;
        if (bitToMove < distance) {
            requestAnimationFrame(move);
        }
    }

    requestAnimationFrame(move);
}

function intervalMoveLeft(el, duration, distance) {
    let x = 0;
    const animation = setInterval(() => {
        if(x > distance) clearInterval(animation);
        el.style.left = `${x}px`;
        // why 10 instead of 16 ? cause browser will take 6ms to draw a frame
        x += distance / duration * 10;
    }, 10);

}

moveLeft(element, 10000, 1500);
simpleMoveLeft(element2, 10000, 1500);
//to start css animation
setTimeout(() => {element3.classList.add('go')}, 0);
intervalMoveLeft(element4, 10000, 1500);
