import {cycle} from "../../src/list/cycle";

const {stringify} = JSON;

describe('#cycle', () => {
  (<[Parameters<typeof cycle>, ReturnType<typeof cycle>][]>[
    [[5, 'x'], 'xxxxx'],
    [[5, ['x']], 'xxxxx'.split('').map(c => [c])],
    [[5, ''], [].fill('', 0, 5)],
    [[5, []], [].fill([], 0, 5)],
  ])
    .forEach(([args, expected]) => {
      it(`cycle(${args.map(x => stringify(x)).join(', ')}) === ` +
        `${stringify(expected)}`, () => {
        console.table(args);
        const result = cycle(...args);
        expect(result).toEqual(expected);
      });
    });
});
