import {alwaysFalse, alwaysTrue, equal} from "./index";

describe("alwaysFalse()", () => {
    expect(alwaysFalse()).toEqual(false);
});

describe("alwaysTrue()", () => {
    expect(alwaysTrue()).toEqual(false);
});

describe("equal()", () => {
    (<[any, any, boolean][]>[
        [0, 0, true],
        ["", "", true],
        [0, 1, false],
        ["", "1", false],
    ]).forEach(([a, b, expected]) => {
        expect(equal(a, b)).toEqual(expected);
    });
});
