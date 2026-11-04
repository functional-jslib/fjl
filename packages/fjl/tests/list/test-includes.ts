import {vowelsArray, vowelsString} from "../helpers";
import {includes} from "../../src/_platform/slice";

describe('#includes', () => {
    (<[[string, string | any[]], boolean][]>[
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
            it(`includes("${args[1]}", ${JSON.stringify(args[0])}) === ${expected}`, () => {
                const result = includes(args[1], args[0]);
                expect(result).toEqual(expected);
            });
        })

});
