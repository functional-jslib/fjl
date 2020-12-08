import {Slice} from "../../src/platform";
import {slice} from "../../src/list";
import {vowelsArray, vowelsString} from "../helpers";

describe('#slice', () => {
  (<[[number, number, Slice<any>], Slice<any>][]>[
    [[0, 1, ''], ''],
    [[0, 1, []], []],
    ...vowelsArray.flatMap((c, i) =>
      [[[0, i, vowelsString], vowelsString.slice(0, i)],
        [[0, i, vowelsArray], vowelsArray.slice(0, i)]]
    )
  ])
    .forEach(([args, expected]) => {
      it(`slice(${args.map(x => JSON.stringify(x)).join(', ')}) === ${JSON.stringify(expected)}`, () => {
        const rslt = slice(...args);
        expect(rslt).toEqual(expected);
      });
    });
});
