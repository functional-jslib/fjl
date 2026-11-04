import {$replicate, $replicateIter, replicate, replicateIter, take} from "../../src/list";

const {stringify} = JSON;

describe('#replicate', () => {
  (<[Parameters<typeof replicate<number>>, ReturnType<typeof replicate<number>>][]>[
    [[0, 1], []],
    [[-1, 1], []],
    [[2, 3], [3, 3]],
    [[4, 5], [5, 5, 5, 5]],
  ])
    .forEach(([args, expected]) => {
      it(`replicate(${stringify(args)}) === ${stringify(expected)}`, () => {
        expect(replicate(...args)).toEqual(expected);
      });
    });

  it('should be curried via `$replicate`', () => {
    expect($replicate<number>(3)(9)).toEqual([9, 9, 9]);
  });
});

describe('#replicateIter', () => {
  (<[[number, number], number[]][]>[
    [[0, 1], []],
    [[-1, 1], []],
    [[2, 3], [3, 3]],
    [[4, 5], [5, 5, 5, 5]],
  ])
    .forEach(([args, expected]) => {
      it(`replicateIter(${stringify(args)}) yields the items of ${stringify(expected)}`, () => {
        expect([...replicateIter(...args)]).toEqual(expected);
        expect([...replicateIter(...args)]).toEqual(replicate(...args));
      });
    });

  it('should be lazy - it should not materialize anything the caller does not pull', () => {
    // `Infinity` proves laziness here;  the eager `replicate` cannot express this
    // (`Array(Infinity)` throws), and a non-lazy implementation would never return.
    expect(take(3, replicateIter(Infinity, 'x'))).toEqual(['x', 'x', 'x']);
  });

  it('should be curried via `$replicateIter`', () => {
    expect([...$replicateIter<number>(2)(9)]).toEqual([9, 9]);
  });
});
