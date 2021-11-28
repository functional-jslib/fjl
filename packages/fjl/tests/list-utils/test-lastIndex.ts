import {Slice} from "../../src/types/data";
import {lastIndex} from "../../src/list/utils";
import {alphabetArray, vowelsArray, vowelsString} from "../helpers";

describe('#lastIndex', () => {
  (<[Slice, number][]>[
    ['', 0], // Javascript returns `0` for last index of empty slice.
    [[], 0], // ""
    [vowelsString, vowelsString.length - 1],
    [vowelsArray, vowelsArray.length - 1],
    [alphabetArray, alphabetArray.length - 1],
  ])
    .forEach(([subject, expected]) => {
      it(`lastIndex(${JSON.stringify(subject)}) === ${expected}`, function () {
        expect(lastIndex(subject)).toEqual(expected);
      });
    });
});
