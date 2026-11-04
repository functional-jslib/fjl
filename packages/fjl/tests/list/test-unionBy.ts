import {UnionBy, unionBy} from "../../src/list";

const {stringify} = JSON;

describe('#unionBy', () => {
  const eq = (a, b) => a === b,
    gt = (a: number, b: number) => a > b,
    sameRemainder = (a: number, b: number) => a % 3 === b % 3;

  (<[Parameters<UnionBy>, ReturnType<UnionBy>][]>[
    [[eq, [], []], []],
    [[eq, [1], []], [1]],
    [[eq, [1, 2], []], [1, 2]],
    [[eq, [], [1, 2]], [1, 2]],
    [[eq, [], [1, 1, 2]], [1, 2]],
    [[eq, [1, 2], [1]], [1, 2]],
    [[eq, [1, 2], [3, 4, 2, 1]], [1, 2, 3, 4]],
    [[eq, [1, 1], [1, 2]], [1, 1, 2]],
    [[sameRemainder, [1, 2], [4, 5, 6, 9]], [1, 2, 6]],

    // Documented Haskell example
    [[gt, [3, 4, 5], [1, 2, 3, 4, 5, 6]], [3, 4, 5, 4, 5, 6]],

    // Haskell's `unionBy (/=) [Arg () "Saul"] [Arg () "Kim"]`, where `Arg` compares its first field only
    [[(a: any, b: any) => a.key !== b.key, [{key: 0, v: 'Saul'}], [{key: 0, v: 'Kim'}]],
      [{key: 0, v: 'Saul'}, {key: 0, v: 'Kim'}]],
  ])
    .forEach(([args, expected]) => {
      it(`unionBy(${args[0]}, ${args.slice(1).map(x => stringify(x)).join(', ')}) === ${stringify(expected)}`, () => {
        const rslt = unionBy(...args);
        expect(rslt).toEqual(expected);
      });
    });

  it('should give back a string for strings', () => {
    expect(unionBy(eq, 'dog', 'cow')).toEqual('dogcw');
  });
});
