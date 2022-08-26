import {expectEqual, vowelsArray} from "../helpers";
import {splitAt} from "../../src/list/splitAt";

describe('#splitAt', () => {
  type TestCase = [Parameters<typeof splitAt>, ReturnType<typeof splitAt>];
  it('should split an list and/or string at given index', () => {
    (<TestCase[]>[
      [[0, []], [[], []]],
      [[0, ''], ['', '']],
      [[1, []], [[], []]],
      [[1, ''], ['', '']]
    ]).concat(
      (<TestCase[]>vowelsArray
        .map((_, ind) => [
          [ind, vowelsArray],
          [vowelsArray.slice(0, ind),
            vowelsArray.slice(ind)]
        ]))
    )
      .forEach(([args, expected]) => {
        expectEqual(splitAt(...args), expected);
      });
  });
  it('should throw an error on error cases (empty as second arg) (non-numeral as first arg), etc.', () => {
    (<Parameters<typeof splitAt>[]>[
      [null, null],
      [undefined, undefined],
      [undefined, null],
      [null, undefined],
      [0, undefined],
      [1, undefined],
      [1, null],
      [1, null],
      // Javascript ignores emptys as indices in `[].slice(...)` method -
      //   No error thrown for these cases:
      // [null, []],
      // [undefined, []],
      // [null, ''],
      // [undefined, ''],
    ])
      .forEach(([ind, list]) => {
        // @note Forcing cast on `list` value here to allow test to run (
        //  since `list` type is actually incorrect in this scenario).
        expect(() => splitAt(ind as number, list)).toThrow();
      });
  });
});
