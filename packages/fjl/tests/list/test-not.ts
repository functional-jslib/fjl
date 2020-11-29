import {not} from "../../src/list";

describe('#not', () => {
    (<[boolean[], boolean][]>[
        [[true], false],
        [[true, true], false],
        [[true, true, true], false],
        [[true, false, true], false],
        [[true, false, false], false],
        [[false, false, false], true],
        [[], false],
    ])
        .forEach(([xs, expected]) => {
            it(`not(${JSON.stringify(xs)}) === ${expected}`, () => {
                expect(not(xs)).toEqual(expected);
            });
        });
});