class Store {
  constructor(reducer, state) {
    this.listeners = [];
    this.state = state;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => this.listeners.filter((fn) => fn !== listener);
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener());
  }
}

customElements.define(
  "moving-square",
  class extends HTMLElement {
    actions = {
      gotop: (state) => ({ ...state, y: state.y - 15 }),
      goright: (state) => ({ ...state, x: state.x + 15 }),
      gobot: (state) => ({ ...state, y: state.y + 15 }),
      goleft: (state) => ({ ...state, x: state.x - 15 }),
    };

    constructor() {
      super();

      const template = document.getElementById("template").content;
      this.appendChild(template.cloneNode(true));

      this.state = { x: 0, y: 0 };

      const reducer = (state = this.state, action) => {
        return this.actions[action](state);
      };

      this.store = new Store(reducer, this.state);
      this.store.subscribe(this.render.bind(this));
    }

    connectedCallback() {
      const field = this.querySelector(".field");
      const self = this;

      field.addEventListener("click", (e) => {
        const target = e.target;
        const square = self.querySelector(".square");

        if (!target.classList.contains("control")) return;
        if (this.isIntersecting(target, square)) return;

        const modifier = target.className.split(" ")[1];
        self.store.dispatch(`go${modifier}`);
      });
    }

    render() {
      const state = this.store.getState();
      const square = this.querySelector(".square");

      square.style.top = state.y + "px";
      square.style.left = state.x + "px";
    }

    isIntersecting(target, square) {
      const { top, left, bottom, right } = square.getBoundingClientRect();
      const rect = target.getBoundingClientRect();

      return (
        top === rect.bottom ||
        left === rect.right ||
        right === rect.left ||
        bottom === rect.top
      );
    }
  }
);
