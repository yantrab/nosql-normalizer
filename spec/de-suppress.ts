var sizeof = require('object-sizeof');
const { performance } = require('perf_hooks');
import { suppress } from '../src/suppress'
import { deSuppress } from '../src/de-suppress'
import { expect } from 'chai';
const testData = require('./funds.json')
describe('de-suppress', function () {
  it('do nothing with object without suppress data', function () {
    const test = { a: 1 };
    let result = deSuppress(test);
    expect(result).to.deep.equal(test)
  });

  it('desuppress array', function () {
    const duplicate = { _id: 1, content: "content" }
    const test = [
      { a: { b: duplicate } },
      { a: { b: duplicate } },
      { a: { b: duplicate } },
      { a: { b: duplicate } }
    ];
    let suprressData = suppress(test);
    let result = deSuppress(suprressData);
    expect(result).to.deep.equal(test)
  });

  it('suppress object', function () {
    const duplicate = { _id: 1, content: "content" }
    const test = { a: { c: { b: duplicate } }, b: { c: { d: { b: duplicate } } } }

    let suprressData = suppress(test);
    let result = deSuppress(suprressData);
    expect(result).to.deep.equal(test)
  });

  it('performace', function () {
    const duplicate = { _id: 1, content: "content" }
    const test = new Array(100000).fill({ a: { c: { b: duplicate } }, b: { c: { d: { b: duplicate } } } })
    let suprressData = suppress(test);
    const start = performance.now()
    let result = deSuppress(suprressData);
    const time = performance.now() - start
    expect(time).to.be.lt(100);
  });

  it('memory size should be decrease', function () {
    const sizeBefore = sizeof(testData)
    let suprressData = suppress(testData,'id');
    let result = deSuppress(suprressData);
    const sizeAfter = sizeof(result)
    expect(sizeAfter).to.be.lt(sizeBefore);
    expect(result).to.deep.equal(testData)
  });
});