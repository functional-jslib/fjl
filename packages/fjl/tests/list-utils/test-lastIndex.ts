import {SliceOf} from "../../src/platform/slice";
import {lastIndex} from "../../src/list/utils";
import {alphabetArray, vowelsArray, vowelsString} from "../../src/utils/test-utils";
import {alphabetLen, expectEqual, expectError, vowelsLen} from "../helpers";

describe('#lastIndex', () => {
    (<[SliceOf<any>, number][]>[
        ['', -1],
        [[], -1],
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
