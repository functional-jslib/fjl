import {UnionBy, unionBy} from "../../src/list";

const {stringify} = JSON;

describe('#unionBy', () => {
  const notAdded = (out, x) => !out.includes(x),
    notAddedAndEven = (out, x) => !out.includes(x) && x % 2 === 0;

  (<[Parameters<UnionBy>, ReturnType<UnionBy>][]>[
    [[notAdded, [], []], []],
    [[notAdded, [1], []], [1]],
    [[notAdded, [1, 2], []], [1, 2]],
    [[notAdded, [], [1, 2]], [1, 2]],
    [[notAdded, [1, 2], [1]], [1, 2]],
    [[notAdded, [1, 2], [3, 4, 2, 1]], [1, 2, 3, 4]],
    [[notAddedAndEven, [1, 2, 3], [3, 4, 2, 1, 5, 6]], [1, 2, 3, 4, 6]]
  ])
    .forEach(([args, expected]) => {
      it(`unionBy(${args[0]}, ${args.slice(1).map(x => stringify(x)).join(', ')}) === ${stringify(expected)}`, () => {
        const rslt = unionBy(...args);
        expect(rslt).toEqual(expected);
      });
    })
});
