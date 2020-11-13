import { expectEqual, expectError, vowelsArray, vowelsString } from "../helpers";
import { take } from "../../packages/list/take";
describe('#take', () => {
    it('should return taken items from list and/or string until limit', () => {
        [
            [[0, ''], ''],
            [[0, []], []],
            [[1, ''], ''],
            [[1, []], []],
        ].concat(vowelsArray
            .map((_, ind) => [
            [ind, vowelsArray],
            vowelsArray.slice(0, ind)
        ]), vowelsString.split('')
            .map((_, ind) => [
            [ind, vowelsString],
            vowelsString.slice(0, ind)
        ]))
            .forEach(([args, expected]) => {
            expectEqual(take(...args), expected);
        });
    });
    it('should throw an error when no parameter is passed in', () => {
        [null, undefined, 0, {}].forEach(x => expectError(() => take(3, x)));
    });
});
//# sourceMappingURL=test-take.js.map