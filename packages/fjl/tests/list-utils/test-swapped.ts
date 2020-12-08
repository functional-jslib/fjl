import {swap} from "../../src/list/utils";

describe(`#swap`, () => {
  (<[[number, number, any[]], any[]][]>[
    [[0, 1, [1, 2]], [2, 1]],
    [[1, 0, [1, 2]], [2, 1]],
    [[0, 0, [1, 2]], [1, 2]],
    [[1, 0, []], [undefined, undefined]],
    [[0, 1, []], [undefined, undefined]]
  ])
    .forEach(([[idx1, idx2, xs], expected]) => {
      it(`swap(${idx1}, ${idx2}, ${JSON.stringify(xs)}) === ` +
        `${JSON.stringify(expected)}`, () => {
        const rslt = swap(idx1, idx2, xs);
        expect(rslt).toEqual(expected);
      });
    });

});

