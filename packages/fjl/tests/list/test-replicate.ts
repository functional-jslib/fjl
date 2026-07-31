import {$replicate, $replicateIter, replicate, replicateIter} from "../../src/list";

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

  it('should be curried via `$replicate`', () => {
    expect($replicate<number>(3)(9)).toEqual([9, 9, 9]);
  });
});

describe('#replicateIter', () => {
  type UnwrappedYield = number;

  (<[Parameters<typeof replicateIter<UnwrappedYield>>, UnwrappedYield[]][]>[
    [[0, 1], []],
    [[2, 3], [3, 3]],
    [[4, 5], [5, 5, 5, 5]],
  ])
    .forEach(([args, expected]) => {
      it(`replicateIter(${stringify(args)}) yields every prefix of ${stringify(expected)}`, () => {
        let count = 0;
        for (const result of replicateIter(...args)) {
          expect(result.slice(0)).toEqual(expected.slice(0, ++count));
        }
        expect(count).toEqual(expected.length);
      });
    });

  it('should yield a last value equal to `replicate`\'s return value', () => {
    let last = [] as number[];
    for (const result of replicateIter(4, 5)) {
      last = result.slice(0);
    }
    expect(last).toEqual(replicate(4, 5));
  });

  it('should be lazy - it should not materialize anything the caller does not pull', () => {
    // `Infinity` proves laziness here;  the eager `replicate` cannot express this
    // (`Array(Infinity)` throws), and a non-lazy implementation would never return.
    const gen = replicateIter(Infinity, 'x');

    expect(gen.next().value).toEqual(['x']);
    expect(gen.next().value).toEqual(['x', 'x']);
    expect(gen.next().value).toEqual(['x', 'x', 'x']);
    expect(gen.next().done).toEqual(false);
  });

  it('should allow the caller to stop early', () => {
    const takeCount = 3,
      out = [] as string[][];

    for (const result of replicateIter(Infinity, 'x')) {
      out.push(result.slice(0));
      if (out.length === takeCount) break;
    }

    expect(out).toEqual([['x'], ['x', 'x'], ['x', 'x', 'x']]);
  });

  it('should be curried via `$replicateIter`', () => {
    expect([...$replicateIter<number>(2)(9)].pop()).toEqual([9, 9]);
  });
});
