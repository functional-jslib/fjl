import {expectEqual, expectFunction} from "../helpers";
import {complement} from "../../src";

describe('#complement', () => {
    it('should be a function', () => {
        expectFunction(complement);
    });
    it('should be curriable', () => {
        const awaitingRest = complement([1, 2, 3]);
        expectFunction(awaitingRest);
        expectEqual(awaitingRest([3, 4, 5]), [4, 5]);
    });
    it('should return an empty list when receiving 2 or more values consisting of ' +
        '`null`, `undefined` and/or empty list (`\'\'`, `[]`).', () => {
        [
            [undefined, undefined],
            [null, null, '', null],
            [[], null, undefined],
            [undefined, null, []],
            [[], [], []],
            [[], []],
            ['', ''],
            ['', undefined, ''],
            [undefined, '', [], null]
        ]
            .forEach(args => expectEqual(complement(...args), []));
    });
    it('should return elements not in first list passed to it', () => {
        let testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[[1, 2, 3], [1, 2, 3, 4, 5]], 2, [4, 5]],
            [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7, 8]], 7, [4, 5, 4, 5, 6, 7, 8]],
            [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 1, 2, 3]], 4, [4, 5, 4, 5]]
        ];
        testCases.forEach(testCase => {
            let [subjects, expectedLen, expectedElms] = testCase,
                result = complement.apply(null, subjects);
            expectEqual(result.length, expectedLen);
            result.forEach((elm, ind) => {
                expectEqual(elm, expectedElms[ind]);
            });
        });
    });
});
