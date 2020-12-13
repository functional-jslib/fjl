import {Slice} from "../../src/platform/slice";
import {lastIndexOf} from "../../src/list";
import {vowelsArray, vowelsString} from "../helpers";

describe('#lastIndexOf', () => {
  (<[Slice<any>, any, number][]>[
    [vowelsString, '0', -1],
    [vowelsString, 'z', -1],
  ].concat(
    vowelsArray.flatMap((c, ind) => {
      return [[vowelsString, c, ind], [vowelsArray, c, ind]];
    }) as [Slice<any>, any, number][]
  ))
    .forEach(([subject, needle, expected]) => {
      it(`lastIndexOf(${JSON.stringify(subject)}, ${JSON.stringify(needle)}) === ${expected}`, function () {
        expect(lastIndexOf(subject, needle)).toEqual(expected);
      });
    });
});
