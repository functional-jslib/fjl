import {union, unionBy} from "../../src/list";

const {stringify} = JSON;

describe('#union', () => {
  (<[Parameters<typeof union>, ReturnType<typeof union>][]>[
    [[[], [1]], [1]],
    [[[1], []], [1]],
    [[[], []], []],
    [[[1, 3], [2, 4]], [1, 3, 2, 4]],
    [[[5, 3], [2, 5]], [5, 3, 2]],
    [[[1, 2, 3], [1, 2, 3, 4]], [1, 2, 3, 4]],
    [[[1, 2, 3, 4], [1, 2, 3]], [1, 2, 3, 4]],
    [[[1, 3, 1, 2, 3], [2, 4, 2, 3, 5]], [1, 3, 1, 2, 3, 4, 5]],
  ])
    .forEach(([args, expected]) => {
      it(`union(${args.map(x => stringify(x)).join(', ')}}) === ${stringify(expected)}`, () => {
        const result = union(...args);
        expect(result).toEqual(expected);
      });
    });

  it('should match the documented Haskell examples', () => {
    expect(union('dog', 'cow')).toEqual('dogcw');
    expect(union('coot', 'duck')).toEqual('cootduk');
    expect(union('duck', 'coot')).toEqual('duckot');
  });

  it('should keep the first list\'s item when items are equal', () => {
    const a = {id: 1}, b = {id: 1}, sameId = (x: {id: number}, y: {id: number}) => x.id === y.id;
    expect(unionBy(sameId, [a], [b])[0]).toBe(a);
    expect(unionBy(sameId, [], [a, b])).toEqual([a]);
  });
});
