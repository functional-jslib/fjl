import {cycle} from "../../src/list/cycle";
import {Slice} from "../../src/types";

const {stringify} = JSON;

describe('#cycle', () => {
  (<[Parameters<typeof cycle>[0], number, Slice][]>[
    ['x', 5, 'xxxxx'],
    [['x'], 5, 'xxxxx'.split('')],
    ['', 5, ''],
    [[], 5, []],
  ])
    .forEach(([arg, takeCount, expected]) => {
      it(`cycle(${stringify(arg)}) === ${stringify(expected)}`, () => {
        let count = 0;
        for (const result of cycle(arg)) {
          expect(result.slice(0, ++count)).toEqual(expected.slice(0, count));
          if (count === takeCount) break;
        }
      });
    });
});
