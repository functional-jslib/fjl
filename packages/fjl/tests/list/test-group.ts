import {group} from "../../src/list/group";
import {vowelsArray, vowelsString} from "../helpers";
import {SliceOf} from "../../src/platform/slice";

describe(`#group`, () => {
    (<[SliceOf<any>, SliceOf<any>[]][]>[
        [vowelsArray, vowelsArray.map(x => [x])],
        [vowelsString, vowelsArray],
        ['Mississippi', ['M', 'i', 'ss', 'i', 'ss', 'i', 'pp', 'i']],
        ['Mississippi'.split(''), [
          ['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']]
        ]
    ]).forEach(([xs, expected]) => {
        it(`group(${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
            expect(group(xs)).toEqual(expected);
        });
    });
});

