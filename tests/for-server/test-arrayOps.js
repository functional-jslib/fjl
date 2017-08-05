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
    all, map,
    head, last, init, tail,
    take, drop, splitAt, findIndex,
    takeWhile, dropWhile, partition,
    complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect,
    flatten, flattenMulti} from '../../src/array/array';
import {
    length,
    range,
    expectEqual,
    expectShallowEquals,
    expectLength,
    expectTrue,
    expectInstanceOf,
    log
} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('arrayOps', function () {

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

    describe ('#drop', function () {
        const hello = 'hello';

        it ('should return a new array/string with dropped items from original until limit', function () {
            const word = hello,
                wordParts = strToArray(word),
                partsLength = wordParts.length - 1;

            // Test `take` on word parts and word (array and string)
            wordParts.forEach((part, ind, wordParts)=> {
                // Get human index (counting from `1`) and preliminaries
                const humanInd = ind + 1,
                    takenFromArray = drop(humanInd, wordParts),
                    takenFromStr = drop(humanInd, word),
                    expectedWordPart = word.substring(humanInd);

                // Ensure expected length was taken
                compose(expectEqual(partsLength - ind), length)(takenFromArray);
                compose(expectEqual(partsLength - ind), length)(takenFromStr);

                // Ensure correct items at said indices were taken
                expectEqual(expectedWordPart, takenFromArray.join(''));
                expectEqual(expectedWordPart, takenFromStr);
            });
        });

        it ('should return entire array and/or string when called with `0` as the first argument', function () {
            compose(expectEqual(length(hello)), length, drop(0))(split('', hello));
            compose(expectEqual(length(hello)), length, drop(0))(hello);
        });

        it ('should return an empty array and/or string when called with with an empty array or string', function () {
            let count = 5;
            while (count) {
                compose(expectEqual(0), length, drop(count))('');
                compose(expectEqual(0), length, drop(count))([]);
                --count;
            }
        });

        it ('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe ('#splitAt', function () {
        const word = 'hello',
            phraseAppendage = ' world',
            phrase = `${word}${phraseAppendage}`,
            phraseLen = length(phrase),
            wordLen = length(word),
            phraseAppendageLen = length(phraseAppendage);

        it ('should split an array and/or string at given index', function () {
            const result = splitAt(wordLen, phrase),
                result2 = splitAt(wordLen, phrase.split(''));

            // Ensure returned type for string case is correct
            expectTrue(typeof result[0] === 'string');
            expectTrue(typeof result[1] === 'string');

            // Expect returned string parts are equal
            expectEqual(result[0], word);
            expectEqual(result[1], phraseAppendage);

            // Ensure returned type for array use case is correct
            expectTrue(Array.isArray(result2[0]));
            expectTrue(Array.isArray(result2[1]));

            // Ensure returned array parts are equal
            expectEqual(length(result2[0]), wordLen);
            expectEqual(length(result2[1]), phraseAppendageLen);

            // Check each char/element in returned parts for array use case
            [word, phraseAppendage].forEach((str, ind) =>
                expectTrue(str.split('')
                    .every((char, ind2) => result2[ind][ind2] === char)) );
        });

        it ('should return an array of empty array and/or string when receiving an empty one of either', function () {
            splitAt(3, []).concat(splitAt(2, '')).forEach(expectLength(0));
        });

        it ('should return entirely, passed in, array and/or string as second part of ' +
            'split in return when `0` is passed in as the first param', function () {
            const splitPhrase = phrase.split('');
            expectTrue(splitAt(0, phrase)
                .concat(splitAt(0, splitPhrase))
                .every((retVal, ind) =>
                    // Only check even indices (due to concat above empty side of split is an
                    //  `odd` number index)
                    (ind + 1) % 2 === 0 ?

                        // Length of left hand side split result
                        length(retVal) === phraseLen &&

                        // Left hand side split result
                        splitPhrase.every((char, ind2) => retVal[ind2] === char) &&

                        // Log results and do
                        // "Else is empty right hand side split result" (empty result)
                        !log(ind, retVal) : true
                ));
        });
    });

    describe ('#findIndex', function () {
        const word = 'abcdefg';
        it ('should find an index where predicate is satisfied', function () {
            expectTrue(
                word.split('')
                    .every((char, ind, arr) =>
                        findIndex((x, ind2) => ind === ind2 && x === word[ind], arr) === ind))
        });
    });

    describe ('#partition', function () {
        it ('should take elements while predicate is fulfilled', function () {
                const word = 'abcdefg',
                    expectedResults = [word.substring(0, 5), word.substring(5)],
                    predicate = x => x !== 'e';

                // Expect matched length and matched elements
                expectTrue(
                    // Ensure cases for each use case
                    all(tuple =>
                        all((tuplePart, ind) =>
                            map(part =>
                                // Ensure correct length of items in returned element
                                // !log(tuple, tuplePart, ind) &&
                                length(expectedResults) === length(tuple) &&
                                length(expectedResults[ind]) === length(part) &&
                                // Ensure elements where matched
                                all((x, ind2) => x === expectedResults[ind][ind2], part),
                                tuplePart), tuple),
                        // Use cases (one with string other with array)
                        [partition(predicate, word.split('')),
                            partition(predicate, word)]
                    ));
            });
    });

    describe ('#takeWhile', function () {
        it ('should take elements while predicate is fulfilled', function () {
            const word = 'abcdefg',
                expectedResult = word.split('e')[0],
                predicate = x => x !== 'e';

                // Expect matched length and matched elements
                expectTrue(
                    // Ensure cases for each use case
                    all(result =>
                        // Ensure correct length of items in returned element
                        /*!log(result) && */
                        length(expectedResult) === length(result) &&
                            // Ensure elements where matched
                            all((x, ind) => x === expectedResult[ind], result),
                            // Use cases (one with string other with array)
                            [takeWhile(predicate, word.split('')),
                                takeWhile(predicate, word)]
                    ));
        });

        it ('should return an empty type instance if predicate is not matched at all', function () {
            const word = 'abcdefg',
                pred = x => x === 'z';

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                    // Ensure no items returned
                    /*!log(result) && */
                    length(result) === 0,
                    [takeWhile(pred, word.split('')), takeWhile(pred, word)]
                ));
        });

        it ('should return a copy of type instance if predicate is matched all the way through', function () {
            const word = 'abcdefg',
                pred = x => x !== 'z';

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                        // Ensure no items returned
                        /*!log(result) && */
                    length(result) === length(word),
                    [takeWhile(pred, word.split('')), takeWhile(pred, word)]
                ));
        });

    });

    describe ('#dropWhile', function () {
        it ('should drop elements while predicate is fulfilled', function () {
            const word = 'abcdefg',
                expectedResult = word.substring(word.indexOf('e'), length(word)),
                predicate = x => x !== 'e';

                // Expect matched length and matched elements
                expectTrue(
                    // Ensure cases for each use case
                    all(result =>
                        // Ensure correct length of items in returned element
                        /*!log(result, expectedResult) &&*/
                        length(expectedResult) === length(result) &&
                            // Ensure elements where matched
                            all((x, ind) => x === expectedResult[ind], result),
                            // Use cases (one with string other with array)
                            [dropWhile(predicate, word.split('')),
                                dropWhile(predicate, word)]
                    ));
        });

        it ('should return an empty type instance if predicate is matched all the way through', function () {
            const word = 'abcdefg',
                pred = x => word.indexOf(x) > -1;

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                    // Ensure no items returned
                    /*!log(result) && */
                    length(result) === 0,
                    [dropWhile(pred, word.split('')), dropWhile(pred, word)]
                ));
        });

        it ('should return an a copy of the passed in type instance if predicate doesn\'t match any elements', function () {
            const word = 'abcdefg',
                pred = x => x === 'z' > -1;

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                    // Ensure correct lengths returned
                    /*!log(result) && */
                    length(result) === length(word) &&
                    // Ensure elements where matched
                    all((x, ind) => x === word[ind], result),
                    // Use cases
                    [dropWhile(pred, word.split('')), dropWhile(pred, word)]
                ));
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
