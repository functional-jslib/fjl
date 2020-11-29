import {expectEqual, expectError, vowelsArray, vowelsString} from "../helpers";
import {length} from "../../platform/object";
import {Lengthable} from "../../types";

describe('#lengths', () => {
    [
        [null, 0],
        [undefined, 0],
        [[], 0],
        [vowelsString, vowelsString.length],
        [vowelsArray, vowelsArray.length],
        [(a, b, c): number => a + b + c, 3],
        [function (a, b, c): number {
            return a + b + c;
        }, 3],
        [{}, undefined],
        [0, undefined],
        [false, undefined]
    ]
        .forEach(([item, expected]) => {
            it(`length(${JSON.stringify(item)} === ${expected}`, () => {
                expect(length(item as Lengthable)).toEqual(expected);
            });
        });
});
