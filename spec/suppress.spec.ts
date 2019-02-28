const {  performance } = require('perf_hooks');
import { suppress } from '../src/suppress'
import { expect } from 'chai';

describe('suppress', function () {
  it('do nothing with object without id', function () {
    const test = { a: 1 };
    let result = suppress(test);
    expect(result).to.deep.equal(test)
  });

  it('do nothing with array with object with _id', function () {
    const test = [{ a: 1, _id: 1 }];
    let result = suppress(test);
    expect(result).to.deep.equal(test)
  });

  it('suppress array', function () {
    const duplicate = { _id: 1, content: "content" }
    const test = [
      { a: { b: duplicate } },
      { a: { b: duplicate } },
      { a: { b: duplicate } },
      { a: { b: duplicate } }
    ];
    let result = suppress(test);
    expect(result.data[0].a.b).to.be.equal(1);
    expect(result.suppressData['b'][1]).to.deep.equal({ content: "content" })
  });

  it('suppress object', function () {
    const duplicate = { _id: 1, content: "content" }
    const test = { a: { c: { b: duplicate } }, b: { c: { d: { b: duplicate } } } }

    let result = suppress(test);
    expect(result.data.a.c.b).to.be.equal(1);
    expect(result.suppressData['b'][1]).to.deep.equal({ content: "content" })
  });

  it('performace', function () {
    const duplicate = { _id: 1, content: "content" }
    const test = new Array(100000).fill({ a: { c: { b: duplicate } }, b: { c: { d: { b: duplicate } } } })
    const start = performance.now()
    let result = suppress(test);
    const time = performance.now() -start
    expect(time).to.be.lt(100);
  });
});