import {expectError, vowelsArray} from "../helpers";
import {Slice} from "../../src/types/data";
import {concat} from "../../src";

const {stringify} = JSON;

describe('#concat', () => {
  const
    arg1 = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
    arg2 = ['abc', 'def', 'ghi'],
    arg3 = [vowelsArray, vowelsArray, vowelsArray];

  (<[Parameters<typeof concat>, ReturnType<typeof concat>][]>[
    [[[]], undefined],
    [[['', '', '']], ''],
    [[[[], [], []]], []],
    [[arg1], [].concat(...arg1)],
    [[arg2], ''.concat(...arg2)],
    [[arg3], [].concat(...arg3)]
  ])
    .forEach(([args, expected]) => {
      it(`concat( ${stringify(args)} ) === ${stringify(expected)}`, () => {
        expect(concat(...args)).toEqual(expected);
      });
    });

  it('should throw an error when receiving nothing', () => {
    expectError(concat);
    expectError(() => concat(null));
    expectError(() => concat(undefined));
  });
});
