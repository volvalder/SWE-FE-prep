class LRUCache {
    constructor(size) {
        this.size = size;
        this.cache = new Map();
    }

    get(key) {
        const item = this.cache.get(key);
        if(item) {
            this.cache.delete(key);
            this.cache.set(key, item);
        }
        return item;
    }

    set(key, val) {
        const item = this.get(key);
        if(!item) {
            this.cache.set(key, val);
            if(this.cache.size > this.size) {
                this.cache.delete(this.cache.keys().next().value);
            }
        }
    }
}

const lru = new LRUCache(3);
lru.set('key1', 10);
lru.set('key2', 10);
lru.set('key3', 10);
lru.set('key4', 10); // key2, key3, key4
lru.get('key2'); //key3, key4, key2
