import {expectEqual, expectError, vowelsArray, vowelsString} from "../helpers";
import {append} from "../../src/list";

describe('#list.append', () => {
    (<Array<[string, string | string[], string | string[]]>>[
        [`append [vowelsArray, vowelsArray, vowelsArray] ` +
        `shallowEquals vowelsArray.concat(vowelsArray, vowelsArray)`,
            [vowelsArray, vowelsArray, vowelsArray],
            vowelsArray.concat(vowelsArray, vowelsArray)],
        [`append [vowels, vowels, vowels] === vowels + vowels + vowels)`,
            [vowelsString, vowelsString, vowelsString],
            vowelsString + vowelsString + vowelsString],
        [`append [vowels, vowels] === vowels + vowels)`,
            [vowelsString, vowelsString], vowelsString + vowelsString],
        [`append vowelsArray shallowEquals vowelsArray.join('')`,
            vowelsArray, vowelsArray.join('')],
        [`append [[], vowelsArray] shallowEquals vowelsArray`,
            [[], vowelsArray], vowelsArray],
        [`append [vowelsArray, []] shallowEquals vowelsArray`,
            [vowelsArray, []], vowelsArray],
        [`append [vowels, ''] === vowels`,
            [vowelsString, ''], vowelsString],
        [`append ['', vowels] === vowels`,
            ['', vowelsString], vowelsString],
        [`append [[], []] shallowEquals []`,
            [[], []], []],
        [`append ['', ''] === ''`,
            ['', ''], '']
    ])
        .forEach(([name, args, expected]) => {
            it(name, () => {
                const result = append.apply(null, args);
                expectEqual(result, expected);
            });
        });

    it('should throw an error when receiving Nothing', () => {
        [   [null, null],
            [undefined, undefined],
            [null, []],
            [null, ''],
            [undefined, []],
            [undefined, ''],
            [[], null],
            ['', null],
            [[], undefined],
            ['', undefined]
        ]
            .forEach(args => {
                expectError(() => {
                    append(...args);
                });
            });
    });
});
