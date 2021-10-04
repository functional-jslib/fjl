import {vowelsArray, vowelsString} from "../helpers";
import {Slice} from "../../src/types/data";
import {includes} from "../../src/platform/slice";

describe('#includes', () => {
    (<[[string, Slice<string>], boolean][]>[
        [[vowelsArray, ''],  false],
        [[ vowelsArray, 'x'],  false],
        [[ vowelsString, 'y'],  false],
        [[vowelsString, 'y'],  false],
    ].concat(
        vowelsArray.map((x, i, xs) => {
            return [[vowelsString, xs.slice(0, i + 1).join('')], true]
        })
    ))
        .forEach(([args, expected]) => {
            it(`includes("${args.join('", "')}") === ${expected}`, () => {
                const result = includes(...args);
                expect(result).toEqual(expected);
            });
        })

});
