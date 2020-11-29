import {expectError, vowelsArray, vowelsString} from '../helpers';
import {append} from '../../list/append';
import {SliceOf} from "../../platform/slice";

describe('#append', () => {
    it('should be a function', () => {
        expect(append).toBeInstanceOf(Function);
    });

    (<Array<[string, SliceOf<string>[], SliceOf<string>]>>[
        [`append [vowelsArray, vowelsArray, vowelsArray] ` +
        `shallowEquals vowelsArray.concat(vowelsArray, vowelsArray)`,
            [vowelsArray, vowelsArray, vowelsArray],
            vowelsArray.concat(vowelsArray, vowelsArray)
        ],
        [`append [vowels, vowels, vowels] === vowels + vowels + vowels)`,
            [vowelsString, vowelsString, vowelsString],
            vowelsString + vowelsString + vowelsString
        ],
        [`append [vowels, vowels] === vowels + vowels)`,
            [vowelsString, vowelsString],
            vowelsString + vowelsString
        ],
        [`append vowelsArray shallowEquals vowelsArray.join('')`,
            vowelsArray, vowelsArray.join('')
        ],
        [`append [[], vowelsArray] shallowEquals vowelsArray`,
            [[], vowelsArray], vowelsArray
        ],
        [`append [vowelsArray, []] shallowEquals vowelsArray`,
            [vowelsArray, []], vowelsArray
        ],
        [`append [vowels, ''] === vowels`,
            [vowelsString, ''], vowelsString
        ],
        [`append ['', vowels] === vowels`,
            ['', vowelsString], vowelsString
        ],
        [`append [[], []] shallowEquals []`,
            [[], []], []
        ],
        [`append ['', ''] === ''`,
            ['', ''], ''
        ]
    ])
        .forEach(([name, args, expected]) => {
            it(name, () => {
                // console.log(args);
                const result = append(...args);
                expect(result).toEqual(expected);
            });
        });

    it('should throw an error when receiving Nothing', () => {
        (<SliceOf<any>[]>[[null, null],
            [undefined, undefined],
            [null, []],
            [null, ''],
            [undefined, []],
            [undefined, ''],
            [[], null],
            ['', null],
            [[], undefined],
            ['', undefined]
        ])
            .forEach(args => {
                expectError(() => {
                    append(...args);
                });
            });
    });
});
