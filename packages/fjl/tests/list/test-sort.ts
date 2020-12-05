import {__, alphabetArray, expectEqual} from "../helpers";
import {range, reverse, sort, take} from "../../src/list";
import {compose} from "../../src/function";

describe('#sort', () => {
  (<[any[], any[]][]>[
    [[2, 3, 1], [3, 2, 1]],
    [[1, 3, 2], [3, 2, 1]],
    [[1, 2, 3], [3, 2, 1]],
    [[3, 2, 1], [3, 2, 1]],
    [[], []],
  ])
    .forEach(([xs, expected]) => {
      it(`sort(${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
        const rslt = sort(xs);
        expect(rslt).toEqual(expected);
      });
    });
});
