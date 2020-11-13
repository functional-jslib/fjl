import { expectEqual, vowelsArray, vowelsString } from "../helpers";
import { uncons } from "../../packages/list/uncons";
describe('#uncons', () => {
    it('should return a list containing the "head" and "tail" of given list, else should return `undefined`.', () => {
        [
            [[], undefined],
            [null, undefined],
            [undefined, undefined],
            [false, undefined],
            [0, undefined],
            ['', undefined],
            ['a', ['a', '']],
            [['a'], ['a', []]],
            [vowelsString, [vowelsString[0], vowelsString.slice(1)]],
            [vowelsArray, [vowelsArray[0], vowelsArray.slice(1)]],
        ]
            .forEach(([arg, expected]) => {
            expectEqual(uncons(arg), expected);
        });
    });
});
//# sourceMappingURL=test-uncons.js.map