import {intersect} from "../../src";

const {stringify} = JSON;

describe('#intersect', () => {
  (<[Parameters<typeof intersect>, ReturnType<typeof intersect>][]>[
    [[[], [1, 2, 3]], []],
    [[[1, 2, 3], []], []],
    [[[1, 2], [1, 2]], [1, 2]],
    [[[1, 2], [1, 2, 3, 4]], [1, 2]],
    [[[1, 2, 3, 4], [1, 2]], [1, 2]],
  ])
    .forEach(([args, expected]) => {
      it(`intersect(...${stringify(args)}) === ${stringify(expected)}`, function () {
        const rslt = intersect(...args);
        expect(rslt).toEqual(expected);
      });
    });
});
