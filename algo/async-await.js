function asyncGen(gen) {
  // standard closure to work with the same generator
  return async(...args) => {
    const generator = gen(args);

    function handleGen(result) {
      if (result.done) return Promise.resolve(result.value);

      return Promise.resolve(result.value).then((res) => {
        // here is a good place to intercept intermediate results
        console.log(res);
        return handleGen(generator.next(res));
      }, (rej) => {
        // we are throwing error but not stoping with next steps
        return handleGen(generator.throw(rej));
      });
    }

    try {
      return handleGen(generator.next());
    } catch(err) {
      return Promise.reject(err);
    }
  }
}

const succProm = function() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('Success!');
    }, 3000);
  });
}

const rejProm = function() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('Failure!');
    }, 3000);
  });
}

function* testGenerator() {
  yield succProm();
  yield succProm();
  yield 'Some synchronous result.';
  yield rejProm();
  return 'Final response.';
}

// async await used just to to see the final result
// you can go without it if you are interested only in intermediate results.
const result = await asyncGen(testGenerator)();
console.log(result);
