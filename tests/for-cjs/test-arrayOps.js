/**
 * Created by elyde on 12/29/2016.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
let {assert, expect}  = require('chai');
let {compose}  = require('../../dist/cjs/compose');
let {__}  = require('../../dist/cjs/curry');
let {complement, difference, union, intersect, flatten, flattenMulti, concat, join, equals}  = require('../../dist/cjs/arrayOps');
let {length, range, expectEqual, expectShallowEquals, expectInstanceOf}  = require('./helpers');
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('Array Combinators', function () {

    describe ('#complement', function () {
        it ('should return an empty list when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, complement)();
        });
        it ('should return an empty list if only one list is passed in', function () {
            compose(expectEqual(__, 0), length, complement)([1,2,3]);
        });
        it ('should return elements not in first list passed to it', function () {
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

    describe ('#difference', function () {
        it ('should return an empty list when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, difference)();
        });
        it ('should return a clone of the passed in list if it is only the first list that is passed in', function () {
            compose(expectEqual(__, 3), length, difference([]))([1,2,3]);
        });
        it ('should return an empty list when there are no differences between the two arrays passed in', function () {
            compose(expectEqual(__, 0), length, difference([1, 2, 3]))([1,2,3]);
        });
        it ('should return a clone of the passed in list if it is only the first list that is passed in', function () {
            compose(expectEqual(__, 3), length, difference([]))([1,2,3]);
        });
        it ('should return the difference between two arrays passed in', function () {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 2, [4, 5]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 5, [4, 5, 6, 7, 8]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 2, [4, 5]]
            ];
            testCases.forEach(testCase => {
                let [subj1, subj2, expectedLen, expectedElms] = testCase,
                    result = difference(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#intersect', function () {
        it ('should return an empty list when receiving an empty list as parameter 1', function () {
            compose(expectEqual(__, 0), length, intersect)([]);
            compose(expectEqual(__, 0), length, intersect([]))([1, 2, 3]);
        });
        it ('should return an empty list when receiving an empty list as parameter 2', function () {
            compose(expectEqual(__, 0), length, intersect([1, 2, 3]))([]);
        });
        it ('should return an empty list when both arrays passed are empty', function () {
            compose(expectEqual(__, 0), length, intersect([]))([]);
        });
        it ('should return an empty list when no arrays are passed in', function () {
            compose(expectEqual(__, 0), length, intersect)();
        });
        it ('should return an intersection of the two arrays passed in', function () {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 3, [1, 2, 3]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 3, [1, 2, 3]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 3, [1, 2, 3]]
            ];
            testCases.forEach(testCase => {
                let [subj1, subj2, expectedLen, expectedElms] = testCase,
                    result = intersect(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#union', function () {
        it ('should return an union of the two arrays', function () {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4 ,5]]
            ];
            testCases.forEach(testCase => {
                let [subj1, subj2, expectedLen, expectedElms] = testCase,
                    result = union(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#flatten', function () {
        it ('should return an list when receiving an list', function () {
            expectInstanceOf(flatten([]), Array);
        });

        it ('should flatten an list', function () {
            const expected = [1, 2, 3],
                subject = [[1], [[2]], [[[3]]]],
                testData = [
                    [subject, expected],
                    [[[[[1]]], [[2]], [3]], expected],
                    [[1, [2, 3, [4, 5, 6, [7, 8, 9, 10, [11, 12, 13, 14, 15]]]]], range(1, 15)],
                ];
            testData.forEach(args => expectShallowEquals(flatten(...args)));
        });
    });

    describe ('#flattenMulti', function () {
        it ('should return an list when receiving many arrays', function () {
            const result = flattenMulti([], [[]], [[[]]], [[[[]]]]);
            expectInstanceOf(result, Array);
            expectShallowEquals(result, []);
        });

        it ('should flatten all passed in arrays into one list no matter their dimensions', function () {
            // [[ args ], expected] - args is the args to spread on the call of `flattenMulti`
            [
                [[[[1], [2, [3], range(4, 9)]], range(10, 21)], range(1, 21)],
                [[[[[1]]], [[2]], [3]], [1, 2, 3]],
                [[[1, [2, 3, [4, 5, 6, [7, 8, 9, 10, [11, 12, 13, 14, 15]]]], range(16, 34)]], range(1, 34)],
            ]
                .map(args => expectShallowEquals(flattenMulti(...args[0]), args[1]));
        });
    });

});
