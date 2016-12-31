/**
 * Created by elyde on 12/29/2016.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import compose from './../src/compose';
import {length} from '../src/combinators';
import {__} from './../src/curry';
import {complement, difference, union, intersect, flatten, flattenMulti, concat, join, equals} from '../src/arrayCombinators';
import {expectFalse, expectTrue, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('Array Combinators', function () {

    describe ('#complement', function () {
        it ('should return an empty array when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, complement)();
        });
        it ('should return an empty array if only one array is passed in', function () {
            compose(expectEqual(__, 0), length, complement)([1,2,3]);
        });
        it ('should return elements not in first array passed to it', function () {
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
        it ('should return an empty array when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, difference)();
        });
        it ('should return a clone of the passed in array if it is only the first array that is passed in', function () {
            compose(expectEqual(__, 3), length, difference(__, []))([1,2,3]);
        });
        it ('should return an empty array when there are no differences between the two arrays passed in', function () {
            compose(expectEqual(__, 0), length, difference(__, [1, 2, 3]))([1,2,3]);
        });
        it ('should return a clone of the passed in array if it is only the first array that is passed in', function () {
            compose(expectEqual(__, 3), length, difference(__, []))([1,2,3]);
        });
        it ('should return the difference between two arrays passed in', function () {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 0, []],
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
        it ('should return an empty array when receiving an empty array as parameter 1', function () {
            compose(expectEqual(__, 0), length, intersect)([]);
            compose(expectEqual(__, 0), length, intersect([]))([1, 2, 3]);
        });
        it ('should return an empty array when receiving an empty array as parameter 2', function () {
            compose(expectEqual(__, 0), length, intersect([1, 2, 3]))([]);
        });
        it ('should return an empty array when both arrays passed are empty', function () {
            compose(expectEqual(__, 0), length, intersect([]))([]);
        });
        it ('should return an empty array when no arrays are passed in', function () {
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

});
