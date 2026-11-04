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

  it('should match the documented Haskell examples', () => {
    expect(intersect([1, 2, 3, 4], [2, 4, 6, 8])).toEqual([2, 4]);
    expect(intersect('coot', 'heron')).toEqual('oo');
    expect(intersect('heron', 'coot')).toEqual('o');
    expect(intersect('', 'abc')).toEqual('');
  });
});
