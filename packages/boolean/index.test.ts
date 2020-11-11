import {alwaysFalse, alwaysTrue, equal} from "./index";

describe("#alwaysFalse", () => {
    it('should return `false`', () => {
        expect(alwaysFalse()).toEqual(false);
    });
});

describe("#alwaysTrue", () => {
    it('should return `false`', () => {
        expect(alwaysTrue()).toEqual(true);
    });
});

describe("#equal", () => {
    (<[any, any, boolean][]>[
        [0, 0, true],
        ["", "", true],
        [0, 1, false],
        ["", "1", false],
    ]).forEach(([a, b, expected]) => {
        it(`equal(${a}, ${b}) === ${expected}`, () => {
            expect(equal(a, b)).toEqual(expected);
        });
    });
});
