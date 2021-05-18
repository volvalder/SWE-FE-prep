/**
* Usage notes:
* window.addEventListener('resize', debounce(someFunc, 2000));
*/

function debounce(func, ms) {
    let timeout;

    return (...args) => {
        const deferred = () => {func(args)};
        clearTimeout(timeout);
        timeout = setTimeout(deferred, ms);
    };
}
