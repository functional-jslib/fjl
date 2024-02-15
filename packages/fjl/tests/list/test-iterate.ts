import {iterate} from "../../src/list/iterate";

const {stringify} = JSON;

describe('#iterate', () => {
  type UnwrappedYield = number;
  type NumIterations = number;
  (<[Parameters<typeof iterate<UnwrappedYield>>, UnwrappedYield[], NumIterations][]>[
    [[(x: number) => x * 2, 0], [0, 0, 0, 0], 4],
    [[(x: number) => x * 2, 1], [0, 2, 4, 8], 4],
    [[(x: number) => x / 2, 8], [8, 4, 2, 0], 4],
  ])
    .forEach(([args, expected, iterations]) => {
      const [op, zero] = args;
      it(`iterate(${op.toString()}, ${stringify(zero)}) === ${stringify(expected)}`, () => {
        let count = 0;
        for (const result of iterate(op, zero)) {
          expect(result.slice(0, ++count)).toEqual(expected.slice(0, count));
          if (count === iterations) break;
        }
      });
    });
});
