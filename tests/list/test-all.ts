import {all} from "../../packages/list/all";

describe('#all', () => {
    (<[boolean[], boolean][]>[
        [[], false],
        [[true, true], true],
        [[true, false], false],
        [[true, false], false],
        [[false, false], false],
    ])
        .forEach(([xs, expected]) => {
            it(`all(${JSON.stringify(xs)}) === ${expected}`, () => {
                const rslt = all(Boolean, xs);
                expect(rslt).toEqual(expected);
            });
        });
});
