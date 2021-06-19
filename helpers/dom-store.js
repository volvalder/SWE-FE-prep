// task is not to use map

class DomStore {
    constructor() {
      this.store = {};
    }
  
    set(node, val) {
        node.__hashKey__ = Symbol;
        this.store[node.__hashKey__] = value;
    }
    
    get(node) {
        return this.store[node.__hashKey__];
    }
    
    has(node) {
        return !!node.__hashKey__;
    }
}
