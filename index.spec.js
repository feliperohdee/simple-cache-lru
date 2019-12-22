const chai = require('chai');

const Cache = require('./');
const cache = new Cache();

const expect = chai.expect;

describe('libs/cache.js', () => {
    describe('get', () => {
        before(() => {
            cache.set('a', 'b');
        });

        it('should get', () => {
            expect(cache.get('a')).to.equal('b');
        });

        it('should get null', () => {
            expect(cache.get('b')).to.be.null;
        });
    });

    describe('maxMB', () => {
        it('should change max', () => {
            expect(cache.max).to.equal(128 * 1e+6);
            cache.maxMB(0.000003);
            expect(cache.max).to.equal(0.000003 * 1e+6);
        });
    });

    describe('set', () => {
        it('should not accept non string key', () => {
            expect(() => cache.set(1, 'a')).to.throw('key must be string.');
        });

        it('should set and stale', () => {
            cache.set('b', 'c');
            expect(cache.get('a')).to.be.null;
            expect(cache.get('b')).to.equal('c');
            cache.set('c', 'd');
            expect(cache.get('b')).to.be.null;
            expect(cache.get('c')).to.equal('d');
        });
    });
});