/**
* Usage notes:
* window.addEventListener('resize', throttle(someFunc, 2000));
*/

function throttle(func, ms) {
    let busy = false;

    return (...args) => {
        if(!busy) {
          func(args);
          busy = true;
          setTimeout(() => {busy = false}, ms);
        }
    };
}
