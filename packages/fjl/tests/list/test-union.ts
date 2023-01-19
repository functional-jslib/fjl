import {union} from "../../src/list";

const {stringify} = JSON;

describe('#union', () => {
  (<[Parameters<typeof union>, ReturnType<typeof union>][]>[
    [[[], [1]], [1]],
    [[[1], []], [1]],
    [[[], []], []],
    [[[1, 3], [2, 4]], [1, 2, 3, 4]],
    [[[5, 3], [2, 5]], [5, 2, 3]],
    [[[1, 2, 3], [1, 2, 3, 4]], [1, 2, 3, 4]],
    [[[1, 2, 3, 4], [1, 2, 3]], [1, 2, 3, 4]],
    [[[1, 3, 1, 2, 3], [2, 4, 5]], [1, 2, 3, 4, 5]],
  ])
    .forEach(([args, expected]) => {
      it(`union(${stringify(args)}}) === ${stringify(expected)}`, () => {
        const result = union(...args);
        expect(result).toEqual(expected);
      });
    });
});
