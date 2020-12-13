import {group} from "../../src/list/group";
import {vowelsArray, vowelsString} from "../helpers";
import {Slice} from "../../src/platform/slice";

describe(`#group`, () => {
    (<[Slice<any>, Slice<any>[]][]>[
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

