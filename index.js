const _ = require('lodash');
const LRU = require('lru-cache');

module.exports = class Cache extends LRU {
    constructor(maxSizeInMB = 128) {
        super({
            max: maxSizeInMB * 1e+6,
            length: n => Buffer.byteLength(n, 'utf8')
        });
    }

    get(key) {
        const result = super.get(key);
        
        return result ? JSON.parse(result) : null;
    }

    maxMB(MB) {
        this.max = MB * 1e+6;
    }

    set(key, value, maxAge) {
        if (!_.isString(key)) {
            throw new Error('key must be string.');
        }
        
        if(super.set(key, JSON.stringify(value), maxAge)) {
            return value;
        }

        return null;
    }
};