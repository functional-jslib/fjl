import { expectEqual, expectError, vowelsArray, vowelsString } from "../helpers";
import { splitAt } from "../../packages/list/splitAt";
describe('#splitAt', () => {
    it('should split an list and/or string at given index', () => {
        [
            [[0, []], [[], []]],
            [[0, ''], ['', '']],
            [[1, []], [[], []]],
            [[1, ''], ['', '']]
        ].concat(vowelsArray
            .map((_, ind) => [
            [ind, vowelsArray],
            [vowelsArray.slice(0, ind),
                vowelsArray.slice(ind)]
        ]), vowelsString.split('')
            .map((_, ind) => [
            [ind, vowelsString],
            [vowelsString.slice(0, ind),
                vowelsString.slice(ind)]
        ]))
            .forEach(([args, expected]) => {
            expectEqual(splitAt(...args), expected);
        });
    });
    it('should throw an error on error cases (empty as second arg) (non-numeral as first arg), etc.', () => {
        [
            [null, null],
            [undefined, undefined],
            [undefined, null],
            [null, undefined],
            [0, undefined],
            [1, undefined],
            [1, null],
            [1, null],
            [null, []],
            [undefined, []],
            [null, ''],
            [undefined, ''],
        ]
            .forEach(([ind, list]) => {
            expectError(() => splitAt(ind, list));
        });
    });
});
//# sourceMappingURL=test-splitAt.js.map