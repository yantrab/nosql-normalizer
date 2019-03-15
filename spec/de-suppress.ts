var sizeof = require('object-sizeof');
const { performance } = require('perf_hooks');
import { suppress } from '../src/suppress'
import { deSuppress } from '../src/de-suppress'
import { expect } from 'chai';
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

  it('de-suppress', function () {
    const heapSize1 = process.memoryUsage().heapUsed;
    const testData = require('./funds.json')
    const heapSizebefore = process.memoryUsage().heapUsed - heapSize1;
    const cloneTestData =JSON.parse(JSON.stringify(testData));
    let suprressData = suppress(testData);
    
    const heapSize2 = process.memoryUsage().heapUsed;
    let result = deSuppress(suprressData);
    const heapSizeAfter = process.memoryUsage().heapUsed - heapSize2;
    //expect(heapSizeAfter).to.be.lt(heapSizebefore);
    expect(result).to.deep.equal(cloneTestData)
  });
});