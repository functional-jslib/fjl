import {Unary} from "../../src/types";
import {genIterator, iterate} from "../../src/list/iterate";

type Num = number;

describe('#iterate', () => {
  it('should have expected results for given argument sets', () => {
    (<[Num, Unary<Num, Num>, Num, Num[]][]>[
      [5, (a): Num => a + 1, 5, [5, 6, 7, 8, 9]],
      [5, (a): Num => a * 2, 5, [5, 10, 20, 40, 80]],
    ])
      .forEach(([numRepeat, op, startValue, expectedResult]) => {
        const result = iterate(numRepeat, op, startValue);
        expect(result[0]).toEqual(startValue); // startValue should be inserted first
        expect(result).toEqual(expectedResult);
      });
  });
});

describe('#genIterate', () => {
  type Zero = number;
  type Expected = number; // `Expected` after `n` iterations
  type NumIterations = number;
  (<[string, Unary, Zero, Expected, NumIterations][]>[
    // @note Remember that on it's first iteration the function isn't called due to there being no last value,
    //   instead what happens is first value yielded is the first one going in.
    ['genIterate(x => x * 2, 1) after 5 iterations === 32', x => x * 2, 1, 16, 5],
    ['genIterate(x => x / 2, 32) after 5 iterations === 1', x => x / 2, 32, 2, 5],
  ])
    .forEach(([testName, op, zero, expected, iterations]) => {
      it(testName, () => {
        const generator = genIterator(op, zero);
        let i = 0,
          result;

        for (const x of generator()) {
          result = x;
          i += 1;
          if (i >= iterations) break;
        }

        expect(result).toEqual(expected);
      });
    });
});
