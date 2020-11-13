import { expectEqual, expectError, vowelsArray, vowelsString } from "../helpers";
import { drop } from "../../packages/list/drop";
describe('#drop', () => {
    it('should return a new list/string with dropped items from original until limit', () => {
        [
            [[0, ''], ''],
            [[0, []], []],
            [[1, ''], ''],
            [[1, []], []],
        ].concat(vowelsArray
            .map((_, ind) => [
            [ind, vowelsArray],
            vowelsArray.slice(ind)
        ]), vowelsString.split('')
            .map((_, ind) => [
            [ind, vowelsString],
            vowelsString.slice(ind)
        ]))
            .forEach(([args, expected]) => {
            expectEqual(drop(...args), expected);
        });
    });
    it('should throw an error when no parameter is passed in', () => {
        [null, undefined, 0, {}].forEach(xs => expectError(() => drop(3, xs)));
    });
});
//# sourceMappingURL=test-drop.js.map