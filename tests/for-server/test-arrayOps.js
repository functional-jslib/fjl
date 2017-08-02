/**
 * Created by elyde on 12/29/2016.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {compose} from '../../src/function/compose';
import {__} from '../../src/function/curry';
import {split} from '../../src/string/string';
import {join} from '../../src/array/arrayPrelude';
import {
    head, last, init, tail,
    take,
    complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect,
    flatten,
    flattenMulti} from '../../src/array/array';
import {length, range, expectEqual, expectShallowEquals, expectInstanceOf} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('Array Operators', function () {

    const strToArray = split('');

    describe ('#head', function () {
        it ('should return the first item in an array and/or string.', function () {
            expectEqual(head('Hello'), 'H');
            expectEqual(head(split('', 'Hello')), 'H');
        });
        it ('should return `undefined` when an empty array and/or string is passed in', function () {
            expectEqual(undefined, head([]));
            expectEqual(undefined, head(''));
        });
        it ('should throw an error when no parameter is passed in', function () {
            assert.throws(head, Error);
        });
    });

    describe ('#last', function () {
        it ('should return the last item in an array and/or string.', function () {
            const word = 'Hello';
            compose(expectEqual('o'), last)(word);
            compose(expectEqual('o'), last, strToArray)(word);
        });
        it ('should return `undefined` when an empty array is passed in', function () {
            expectEqual(undefined, last([]));
            expectEqual(undefined, last(''));
        });
        it ('should throw an error when no parameters is passed in', function () {
            assert.throws(last, Error);
        });
    });

    describe ('#init', function () {
        it ('should return everything except the last item of an array and/or string', function () {
            compose(expectEqual('orange'), join(''), init, strToArray)('oranges');
            compose(expectEqual('orange'), init)('oranges');
        });
        it ('should return an empty array when an empty array and/or string is passed in', function () {
            compose(expectEqual(0), length, init)([]);
            compose(expectEqual(0), length, init)('');
        });
        it ('should throw an error when no parameter is passed in', function () {
            assert.throws(init, Error);
        });
    });

    describe ('#tail', function () {
        it ('should return everything except the last item of an array', function () {
            compose(expectEqual('ello'), join(''), tail, strToArray)('hello');
            compose(expectEqual('ello'), tail)('hello');
        });
        it ('should return an empty array when receiving an empty array', function () {
            compose(expectEqual(0), length, tail)([]);
            compose(expectEqual(0), length, tail)('');
        });
        it ('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe ('#take', function () {
        const hello = 'hello';

        it ('should return taken items from array and/or string until limit', function () {
            const word = hello;

            // Test `take` on word parts and word (array and string)
            strToArray(word).forEach((part, ind, wordParts)=> {
                // Get human index (counting from `1`) and preliminaries
                const humanInd = ind + 1,
                    takenFromArray = take(humanInd, wordParts),
                    takenFromStr = take(humanInd, word),
                    expectedWordPart = word.substring(0, humanInd);

                // Ensure expected length was taken
                compose(expectEqual(humanInd), length)(takenFromArray);
                compose(expectEqual(humanInd), length)(takenFromStr);

                // Ensure correct items at said indices were taken
                expectEqual(expectedWordPart, takenFromArray.join(''));
                expectEqual(expectedWordPart, takenFromStr);
            });
        });

        it ('should return an empty array and/or string when called with `0` as the first argument', function () {
            compose(expectEqual(0), length, take(0))(split('', hello));
            compose(expectEqual(0), length, take(0))(hello);
        });

        it ('should return an empty array and/or string when called with with an empty array or string', function () {
            let count = 5;
            while (count) {
                compose(expectEqual(0), length, take(count))('');
                compose(expectEqual(0), length, take(count))([]);
                --count;
            }
        });

        it ('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe ('#arrayComplement', function () {
        it ('should return an empty array when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, arrayComplement)();
        });
        it ('should return an empty array if only one array is passed in', function () {
            compose(expectEqual(__, 0), length, arrayComplement)([1,2,3]);
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
                    result = arrayComplement.apply(null, subjects);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#arrayDifference', function () {
        it ('should return an empty array when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, arrayDifference)();
        });
        it ('should return a clone of the passed in array if it is only the first array that is passed in', function () {
            compose(expectEqual(__, 3), length, arrayDifference([]))([1,2,3]);
        });
        it ('should return an empty array when there are no differences between the two arrays passed in', function () {
            compose(expectEqual(__, 0), length, arrayDifference([1, 2, 3]))([1,2,3]);
        });
        it ('should return a clone of the passed in array if it is only the first array that is passed in', function () {
            compose(expectEqual(__, 3), length, arrayDifference([]))([1,2,3]);
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
                    result = arrayDifference(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#arrayIntersect', function () {
        it ('should return an empty array when receiving an empty array as parameter 1', function () {
            compose(expectEqual(__, 0), length, arrayIntersect)([]);
            compose(expectEqual(__, 0), length, arrayIntersect([]))([1, 2, 3]);
        });
        it ('should return an empty array when receiving an empty array as parameter 2', function () {
            compose(expectEqual(__, 0), length, arrayIntersect([1, 2, 3]))([]);
        });
        it ('should return an empty array when both arrays passed are empty', function () {
            compose(expectEqual(__, 0), length, arrayIntersect([]))([]);
        });
        it ('should return an empty array when no arrays are passed in', function () {
            compose(expectEqual(__, 0), length, arrayIntersect)();
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
                    result = arrayIntersect(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#arrayUnion', function () {
        it ('should return an union of the two arrays', function () {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4 ,5]]
            ];
            testCases.forEach(testCase => {
                let [subj1, subj2, expectedLen, expectedElms] = testCase,
                    result = arrayUnion(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#flatten', function () {
        it ('should return an array when receiving an array', function () {
            expectInstanceOf(flatten([]), Array);
        });

        it ('should flatten an array', function () {
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
        it ('should return an array when receiving many arrays', function () {
            const result = flattenMulti([], [[]], [[[]]], [[[[]]]]);
            expectInstanceOf(result, Array);
            expectShallowEquals(result, []);
        });

        it ('should flatten all passed in arrays into one array no matter their dimensions', function () {
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
