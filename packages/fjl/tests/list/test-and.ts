import {and} from "../../src/list";

describe('#and', () => {
    (<[boolean[], boolean][]>[
        [[], false],
        [[true, true], true],
        [[true, false], false],
        [[false, true], false],
        [[false, false], true],
    ])
        .forEach(([xs, expected]) => {
            it(`and(${JSON.stringify(xs)}) === ${expected}`, () => {
                const rslt = and(xs);
                expect(rslt).toEqual(expected);
            });
        });
});
