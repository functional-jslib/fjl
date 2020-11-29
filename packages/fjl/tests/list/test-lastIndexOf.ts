import {SliceOf} from "../../src/platform/slice";
import {lastIndexOf} from "../../src/list";
import {vowelsArray, vowelsString} from "../../src/utils/test-utils";

describe('#lastIndexOf', () => {
    (<[SliceOf<any>, any, number][]>[
        [vowelsString, '', -1],
        [vowelsString, '0', -1],
        [vowelsString, 'z', -1],
    ].concat(
        vowelsArray.flatMap((c, ind) => {
            return [[vowelsString, c, ind], [vowelsArray, c, ind]];
        }) as [SliceOf<any>, any, number][]
    ))
        .forEach(([subject, expected]) => {
            it(`lastIndexOf(${JSON.stringify(subject)}) === ${expected}`, function () {
                expect(lastIndexOf(subject)).toEqual(expected);
            });
        });
});
