import {repeat} from "../../src/list/repeat";

describe('#repeat', () => {
  type UnwrappedYield = number;
  type NumIterations = number;

  (<[Parameters<typeof repeat<UnwrappedYield>>[0], UnwrappedYield[], NumIterations][]>[
    [0, [0, 0, 0, 0], 4],
    [1, [1, 1, 1, 1], 4],
    [2, [2, 2, 2, 2], 4],
  ]).forEach(([arg, expected, numIterations]) => {
    it(`repeat(${arg}) === ${JSON.stringify(expected)}`, () => {
      let count = 0;
      for (const result of repeat(arg)) {
        expect(result.slice(0, ++count)).toEqual(expected.slice(0, count));
        if (count === numIterations) break;
      }
    });
  });
});
