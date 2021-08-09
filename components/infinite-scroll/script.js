const root = document.querySelector('.root');
let pLast = root.children[root.children.length - 1];
const pCopy = pLast.cloneNode(true);
pCopy.classList.add('new');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      observer.unobserve(pLast);

      const copy = pCopy.cloneNode(true);
      root.appendChild(copy);

      pLast = root.children[root.children.length - 1];

      // without timeout js is acting way too fast
      // cancelling animation by setting both classes instantly
      setTimeout(() => {
        pLast.classList.add('visible');
        observer.observe(pLast);
      }, 50);
    }
  });
}, {root});

observer.observe(pLast);