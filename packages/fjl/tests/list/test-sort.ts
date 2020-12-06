import {sort} from "../../src/list/sort";

describe('#sort', () => {
  (<[any[], any[]][]>[
    [[2, 3, 1], [1, 2 ,3]],
    [[1, 3, 2], [1, 2, 3]],
    [[1, 2, 3], [1, 2, 3]],
    [[3, 2, 1], [1, 2, 3]],
    [[], []],
  ])
    .forEach(([xs, expected]) => {
      it(`sort(${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
        const rslt = sort(xs);
        expect(rslt).toEqual(expected);
      });
    });
});
