import {expectEqual, expectError, vowelsArray, vowelsString} from "../helpers";
import {length} from "../../src/jsPlatform/object";
import {Lengthable} from "../../src/types";

describe('#length', () => {
    it('is should return the length of any item that has a `length` property', () => {
        [
            [[], 0],
            [vowelsString, vowelsString.length],
            [vowelsArray, vowelsArray.length],
            [(a, b, c) => a + b + c, 3],
            [function (a, b, c) { return a + b + c; }, 3],
            [{}, undefined],
            [0, undefined],
            [false, undefined]
        ]
            .forEach(([item, expected]) =>
                expectEqual(length(item as Lengthable), expected)
            );
    });
    it('should throw an error when `undefined` or `null` is passed in', () => {
        expectError(length);
        expectError(() => length(undefined));
        expectError(() => length(null));
    });
});
