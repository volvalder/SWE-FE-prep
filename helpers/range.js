// Generator based
function* range(from, to, step = 1) {
    let count = from;
    while (count < to) {
        yield count;
        count += step;
    }
}

// Iterator based
function rng(from, to, step = 1) {
    let count = from;
    return {
        next: () => {
            if (count >= to) {
                return {
                    value: count,
                    done: true,
                };
            } else {
                return {
                    value: count++,
                    done: false,
                }
            }
        },
        [Symbol.iterator]: function() {
            return this;
        }
    };
}

const smallRange = range(-5, 10, 2);
const vastRange = rng(-10000, 10000, 10);

for (let i of smallRange) {
    for (let j of vastRange) {
        console.log(i, j);
    }
}
