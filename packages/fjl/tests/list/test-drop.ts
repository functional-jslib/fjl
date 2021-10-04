import {Slice} from "../../src/types/data";
import {expectEqual, expectError, vowelsArray, vowelsString} from "../helpers";
import {drop} from "../../src";

describe('#drop', () => {
  it('should return a new list/string with dropped items from original until limit', () => {
    type DropTest = [[number, Slice<any>], Slice<any>];
    type DropTestCases = Array<DropTest>;
    (<DropTestCases>[
      [[0, ''], ''],
      [[0, []], []],
      [[1, ''], ''],
      [[1, []], []],
    ].concat(
      vowelsArray
        .map((_, ind) => [
          [ind, vowelsArray],
          vowelsArray.slice(ind)
        ]),
      vowelsString.split('')
        .map((_, ind) => [
          [ind, vowelsString],
          vowelsString.slice(ind)
        ])
    ))
      .forEach(([args, expected]) => {
        expectEqual(drop(...args), expected);
      });
  });
  it('should throw an error when no parameter is passed in', () => {
    (<Slice<any>[]>[null, undefined, 0, {}]).forEach(xs =>
      expectError(() => drop(3, xs))
    );
  });
});
