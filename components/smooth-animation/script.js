const element = document.getElementById('container');

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

moveLeft(element, 3000, 1500);