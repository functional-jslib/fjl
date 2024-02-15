import {replicate} from "../../src/list";

const {stringify} = JSON;

describe('#replicate', () => {
  (<[Parameters<typeof replicate<number>>, ReturnType<typeof replicate<number>>][]>[
    [[0, 1], []],
    [[2, 3], [3, 3]],
    [[4, 5], [5, 5, 5, 5]],
  ])
    .forEach(([args, expected]) => {
      it(`replicate(${stringify(args)}) === ${stringify(expected)}`, () => {
        expect(replicate(...args)).toEqual(expected);
      });
    });
});
