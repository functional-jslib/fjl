/**
 * Created by elyde on 12/29/2016.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {compose} from '../../src/functionOps/compose';
import {__} from '../../src/functionOps/curry';
import {split} from '../../src/stringOps/stringOps';
import {join} from '../../src/listOps/listOpsPrelude';
import {isArray, isString, isEmpty} from '../../src/objectOps/is';

import {
    all, find, findIndex, findIndices,
    map, mapAccumL, mapAccumR,
    elem, notElem, elemIndex, elemIndices, lookup,
    head, last, init, tail, uncons, length,
    take, drop, splitAt, foldl, foldr,
    takeWhile, dropWhile, partition,
    span, breakOnList, stripPrefix,
    arrayComplement, arrayDifference, arrayUnion, arrayIntersect,
    flatten, flattenMulti} from '../../src/listOps/listOps';

import {
    range,
    shallowCompareOnLeft,
    expectEqual,
    expectShallowEquals,
    expectDeepEquals,
    expectLength,
    expectTrue,
    expectFalse,
    expectInstanceOf,
    log
} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('#arrayOps', function () {

    const strToArray = split('');

    describe ('#head', function () {
        it ('should return the first item in an listOps and/or stringOps.', function () {
            expectEqual(head('Hello'), 'H');
            expectEqual(head(split('', 'Hello')), 'H');
        });
        it ('should return `undefined` when an empty listOps and/or stringOps is passed in', function () {
            expectEqual(undefined, head([]));
            expectEqual(undefined, head(''));
        });
        it ('should throw an error when no parameter is passed in', function () {
            assert.throws(head, Error);
        });
    });

    describe ('#last', function () {
        it ('should return the last item in an listOps and/or stringOps.', function () {
            const word = 'Hello';
            compose(expectEqual('o'), last)(word);
            compose(expectEqual('o'), last, strToArray)(word);
        });
        it ('should return `undefined` when an empty listOps is passed in', function () {
            expectEqual(undefined, last([]));
            expectEqual(undefined, last(''));
        });
        it ('should throw an error when no parameters is passed in', function () {
            assert.throws(last, Error);
        });
    });

    describe ('#init', function () {
        it ('should return everything except the last item of an listOps and/or stringOps', function () {
            compose(expectEqual('orange'), join(''), init, strToArray)('oranges');
            compose(expectEqual('orange'), init)('oranges');
        });
        it ('should return an empty listOps when an empty listOps and/or stringOps is passed in', function () {
            compose(expectEqual(0), length, init)([]);
            compose(expectEqual(0), length, init)('');
        });
        it ('should throw an error when no parameter is passed in', function () {
            assert.throws(init, Error);
        });
    });

    describe ('#tail', function () {
        it ('should return everything except the last item of an listOps', function () {
            compose(expectEqual('ello'), join(''), tail, strToArray)('hello');
            compose(expectEqual('ello'), tail)('hello');
        });
        it ('should return an empty listOps when receiving an empty listOps', function () {
            compose(expectEqual(0), length, tail)([]);
            compose(expectEqual(0), length, tail)('');
        });
        it ('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe ('#uncons', function () {
        it ('should return the "head" and "tail" of a list in a two item array.', function () {
            expectShallowEquals(uncons('hello'), ['h', 'ello']);
            expectDeepEquals(uncons(split('', 'hello')), ['h', split('', 'ello')]);
        });
        it ('should return an empty tail when there\'s only one item in list.', function () {
            expectShallowEquals(uncons('a'), ['a', '']);
            expectDeepEquals(uncons([0]), [0, []]);
        });
        it ('should return `undefined` for empty lists.', function () {
            expectEqual(uncons(''), undefined);
            expectEqual(uncons([]), undefined);
        });
        it ('should return `undefined` when no value is passed in or a falsy value is passed in', function () {
            expectEqual(uncons(null), undefined);
            expectEqual(uncons(undefined), undefined);
            expectEqual(uncons(), undefined);
            expectEqual(uncons(0), undefined);
            expectEqual(uncons(false), undefined);
            expectEqual(uncons(''), undefined);
        });
    });

    describe ('#null', function () {
        it ('is defined by `module:is.isEmpty`.');
    });

    describe ('#length', function () {
        it ('is should return the length of any item that has a `length` property', function () {
            expectTrue(
                all(item => length(item[0]) === item[1],
                    [[[], 0], ['abc', 3], [(a, b, c) => {}, 3]])
            );
        });
        it ('should return `undefined` for items that don\'t have a `length` property', function () {
            expectEqual(length({}), undefined);
            expectEqual(length(0), undefined);
            expectEqual(length(false), undefined);
            expectEqual(length(true), undefined);
        });
        it ('should throw an error when `undefined` or `null` is passed in', function () {
            assert.throws(length, Error);
            assert.throws(() => length(null), Error);
        });
    });

    describe ('#map', function () {
        it ('should be able to map a function over a list.', function () {
            const word = 'hello',
                op = char => char + 'a';
            expectEqual(map(op, word), 'haealalaoa');
            expectShallowEquals(
                map(op, split('', word)),
                ['ha', 'ea', 'la', 'la', 'oa'] );
        });
        it ('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(map(x => x, []), []);
            expectShallowEquals(map(x => x, ''), '');
        });
        it ('should throw an error when incoming value is not a type instance', function () {
            assert.throws(() => map(x => x, null), Error);
            assert.throws(() => map(x => x, undefined), Error);
        });
    });

    describe ('#reverse', function () {
        it ('should have more tests.');
    });

    describe ('#intersperse', function () {
        it ('should have more tests.');
    });

    describe ('#intercalate', function () {
        it ('should have more tests.');
    });

    describe ('#transpose', function () {
        it ('should have more tests.');
    });

    describe ('#subsequences', function () {
        it ('should have more tests.');
    });

    describe ('#permutations', function () {
        it ('should have more tests.');
    });

    describe ('#foldl', function () {
        it ('should have more tests.');
    });

    describe ('#foldl1', function () {
        it ('should have more tests.');
    });

    describe ('#foldr', function () {
        it ('should have more tests.');
    });

    describe ('#foldr1', function () {
        it ('should have more tests.');
    });

    describe ('#concat', function () {
        it ('should have more tests.');
    });

    describe ('#concatMap', function () {
        it ('should have more tests.');
    });

    describe ('#and', function () {
        it ('should have more tests.');
    });

    describe ('#or', function () {
        it ('should have more tests.');
    });

    describe ('#any', function () {
        it ('should have more tests.');
    });

    describe ('#all', function () {
        it ('should return true when predicate returns true for all items in list', function () {
            expectTrue(all(item => item, [true, true, true]));
            expectTrue(all(char => char !== 'a', 'bcdefg'));
        });
        it ('should return `false` when predicate returns `false` for an item', function () {
            expectFalse(all(item => item, [true, false, true]));
            expectFalse(all(item => item !== 'a', 'bcdaefg'));
        });
        it ('should return `false` when an empty list is passed in', function () {
            expectFalse(all(item => item, []));
            expectFalse(all(item => item, ''));
        });
        it ('should throw an error when nothing is passed in', function () {
            assert.throws(() => all(item => item, null), Error);
            assert.throws(() => all(item => item, undefined), Error);
        });
    });

    describe ('#sum', function () {
        it ('should have more tests.');
    });

    describe ('#product', function () {
        it ('should have more tests.');
    });

    describe ('#maximum', function () {
        it ('should have more tests.');
    });

    describe ('#minimum', function () {
        it ('should have more tests.');
    });

    describe ('#mapAccumL', function () {
        it ('should map a functionOps/operation on every item of a list and it should return a tuple containing the accumulated value and the an instance of passed in container with mapped items', function () {
            let xs1 = [],
                xs2 = '',
                xs3 = [];

            const

                list0 = [1, 2, 3, 4, 5],
                list1 = 'hello world',
                list2 = list1.split(''),

                stringOp = (agg, item) => String.fromCharCode(item.charCodeAt(0) + 1),
                numberOp = (agg, item) => item * 2,

                result0 = mapAccumL((agg, item) => {
                    let mappedValue = numberOp(agg, item);
                    agg += mappedValue;
                    xs1.push(mappedValue);
                    return [agg, xs1];
                }, 0, list0),

                result1 = mapAccumL((agg, item) => {
                    let mappedValue = stringOp(agg, item);
                    agg += mappedValue;
                    xs2 += mappedValue;
                    return [agg, xs2];
                }, '', list1),

                result2 = mapAccumL((agg, item) => {
                    let mappedValue = stringOp(agg, item);
                    agg.push(mappedValue);
                    xs3.push(mappedValue);
                    return [agg, xs3];
                }, [], list1);

            expectTrue(
                all(tuple => {
                        const reducedForCompare = foldl((agg, item, ind) => {
                                // log(agg, item, tuple[0][1][ind], xs2);
                                if (Array.isArray(agg)) { agg.push(tuple[2](agg, item, ind)); }
                                else { agg += tuple[2](agg, item, ind); }
                                return agg;
                            },
                            tuple[3], tuple[1]);
                        // log(tuple[0][0], reducedForCompare);
                        // Check that mapped have equal length
                        return length(tuple[0][1]) === length(tuple[1]) &&
                            // Check aggregated are equal
                            shallowCompareOnLeft(tuple[0][0], reducedForCompare)
                    },
                    [
                        // Result, list, expected accumulation
                        [result0, list0, numberOp, 0],
                        [result1, list1, stringOp, ''],
                        [result2, list2, stringOp, []]
                    ])
            );
        });
    });

    describe ('#mapAccumR', function () {
        it ('should map a functionOps/operation on every item of a list and it should return a tuple containing the accumulated value and the an instance of passed in container with mapped items', function () {
            let xs1 = [],
                xs2 = '',
                xs3 = [];

            const

                list0 = [1, 2, 3, 4, 5],
                list1 = 'hello world',
                list2 = list1.split(''),

                stringOp = (agg, item) => String.fromCharCode(item.charCodeAt(0) + 1),
                numberOp = (agg, item) => item * 2,

                result0 = mapAccumR((agg, item) => {
                    let mappedValue = numberOp(agg, item);
                    agg += mappedValue;
                    xs1.push(mappedValue);
                    return [agg, xs1];
                }, 0, list0),

                result1 = mapAccumR((agg, item) => {
                    let mappedValue = stringOp(agg, item);
                    agg += mappedValue;
                    xs2 += mappedValue;
                    return [agg, xs2];
                }, '', list1),

                result2 = mapAccumR((agg, item) => {
                    let mappedValue = stringOp(agg, item);
                    agg.push(mappedValue);
                    xs3.push(mappedValue);
                    return [agg, xs3];
                }, [], list1);

            expectTrue(
                all(tuple => {
                        const reducedForCompare = foldr((agg, item, ind) => {
                                // log(agg, item, tuple[0][1][ind], xs2);
                                if (Array.isArray(agg)) { agg.push(tuple[2](agg, item, ind)); }
                                else { agg += tuple[2](agg, item, ind); }
                                return agg;
                            },
                            tuple[3], tuple[1]);
                        // log(tuple[0][0], reducedForCompare);
                        // Check that mapped have equal length
                        return length(tuple[0][1]) === length(tuple[1]) &&
                            // Check aggregated are equal
                            shallowCompareOnLeft(tuple[0][0], reducedForCompare)
                    },
                    [
                        // Result, list, expected accumulation
                        [result0, list0, numberOp, 0],
                        [result1, list1, stringOp, ''],
                        [result2, list2, stringOp, []]
                    ])
            );
        });
    });

    describe ('#unfoldr', function () {
        it ('should have more tests.');
    });

    describe ('#take', function () {
        const hello = 'hello';

        it ('should return taken items from listOps and/or stringOps until limit', function () {
            const word = hello;

            // Test `take` on word parts and word (listOps and stringOps)
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

        it ('should return an empty listOps and/or stringOps when called with `0` as the first argument', function () {
            compose(expectEqual(0), length, take(0))(split('', hello));
            compose(expectEqual(0), length, take(0))(hello);
        });

        it ('should return an empty listOps and/or stringOps when called with with an empty listOps or stringOps', function () {
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

        it ('should return a new listOps/stringOps with dropped items from original until limit', function () {
            const word = hello,
                wordParts = strToArray(word),
                partsLength = wordParts.length - 1;

            // Test `take` on word parts and word (listOps and stringOps)
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

        it ('should return entire listOps and/or stringOps when called with `0` as the first argument', function () {
            compose(expectEqual(length(hello)), length, drop(0))(split('', hello));
            compose(expectEqual(length(hello)), length, drop(0))(hello);
        });

        it ('should return an empty listOps and/or stringOps when called with with an empty listOps or stringOps', function () {
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

        it ('should split an listOps and/or stringOps at given index', function () {
            const result = splitAt(wordLen, phrase),
                result2 = splitAt(wordLen, phrase.split(''));

            // Ensure returned type for stringOps case is correct
            expectTrue(typeof result[0] === 'string');
            expectTrue(typeof result[1] === 'string');

            // Expect returned stringOps parts are equal
            expectEqual(result[0], word);
            expectEqual(result[1], phraseAppendage);

            // Ensure returned type for listOps use case is correct
            expectTrue(Array.isArray(result2[0]));
            expectTrue(Array.isArray(result2[1]));

            // Ensure returned listOps parts are equal
            expectEqual(length(result2[0]), wordLen);
            expectEqual(length(result2[1]), phraseAppendageLen);

            // Check each char/element in returned parts for listOps use case
            [word, phraseAppendage].forEach((str, ind) =>
                expectTrue(str.split('')
                    .every((char, ind2) => result2[ind][ind2] === char)) );
        });

        it ('should return an listOps of empty listOps and/or stringOps when receiving an empty one of either', function () {
            splitAt(3, []).concat(splitAt(2, '')).forEach(expectLength(0));
        });

        it ('should return entirely, passed in, listOps and/or stringOps as second part of ' +
            'split in return when `0` is passed in as the first param', function () {
            const splitPhrase = phrase.split('');
            expectTrue(splitAt(0, phrase)
                .concat(splitAt(0, splitPhrase))
                .every((retVal, ind) =>
                    // Only check even indices (due to concat above empty side of split is an
                    //  `odd` numberOps index)
                    (ind + 1) % 2 === 0 ?

                        // Length of left hand side split result
                        length(retVal) === phraseLen &&

                        // Left hand side split result
                        // Log results and do
                        // "Else is empty right hand side split result" (empty result)
                        splitPhrase.every((char, ind2) => retVal[ind2] === char)/* && !log(ind, retVal) */: true
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
                            // Use cases (one with stringOps other with listOps)
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
                            // Use cases (one with stringOps other with listOps)
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

    describe ('#dropWhileEnd', function () {
        it ('should have more tests.');
    });

    describe ('#span', function () {
        it ('should take elements into first listOps while predicate is fulfilled and elements ' +
            'that didn\'t match into second listOps', function () {
            const word = 'abcdefg',
                expectedResults = [word.substring(0, 4), word.substring(4)],
                predicate = x => x !== 'e';

            // Expect matched length and matched elements
            expectTrue(
                // Ensure cases for each use case
                all(tuple =>
                    length(expectedResults) === length(tuple) &&
                    all((tuplePart, ind) =>
                            // !log(tuple, tuplePart, expectedResults, expectedResults[ind]) &&
                            // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all((x, ind2) => x === expectedResults[ind][ind2], tuplePart),
                        tuple),
                    // Use cases (one with stringOps other with listOps)
                    [span(predicate, word.split('')), span(predicate, word)]
                ));
        });

        it ('should return an listOps of empty arrays and/or strings when an empty list is passed in', function () {
            expectTrue(
                all(tuple =>
                    length(tuple) === 2 &&
                    all((tuplePart, ind) => (isString(tuplePart) || isArray(tuplePart)) &&
                        length(tuplePart) === 0, tuple),
                    [span(a => a, ""), span(x => x, [])]
                ));
        });
    });

    describe ('#breakOnList', function () {
        it ('should take elements into first listOps while !predicate is fulfilled and elements ' +
            'that didn\'t match into second listOps', function () {
            const word = 'abcdefg',
                expectedResults = [word.substring(0, 4), word.substring(4)],
                predicate = x => x === 'e';

            // Expect matched length and matched elements
            expectTrue(
                // Ensure cases for each use case
                all(tuple =>
                    length(expectedResults) === length(tuple) &&
                    all((tuplePart, ind) =>
                            // !log(tuple, tuplePart, expectedResults, expectedResults[ind]) &&
                            // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all((x, ind2) => x === expectedResults[ind][ind2], tuplePart),
                        tuple),
                    // Use cases (one with stringOps other with listOps)
                    [breakOnList(predicate, word.split('')), breakOnList(predicate, word)]
                ));
        });

        it ('should return an listOps of empty arrays and/or strings when an empty list is passed in', function () {
            expectTrue(
                all(tuple =>
                    length(tuple) === 2 &&
                    all((tuplePart, ind) => (isString(tuplePart) || isArray(tuplePart)) &&
                        length(tuplePart) === 0, tuple),
                    [breakOnList(a => a, ""), breakOnList(x => x, [])]
                ));
        });
    });

    describe ('#stripPrefix', function () {
        it ('should...');
        log(stripPrefix('hello', 'hello world'));
    });

    describe ('#group', function () {
        it ('should have more tests');
    });

    describe ('#inits', function () {
        it ('should have more tests');
    });

    describe ('#tails', function () {
        it ('should have more tests');
    });

    describe ('#isPrefixOf', function () {
        it ('should have more tests');
    });

    describe ('#isSuffixOf', function () {
        it ('should have more tests');
    });

    describe ('#isInfixOf', function () {
        it ('should have more tests');
    });

    describe ('#isSubsequenceOf', function () {
        it ('should have more tests');
    });

    describe ('#elem', function () {
        it ('should return `true` when the element is found in given list', function () {
            const word = 'hello world';
            expectTrue(
                all((elm, ind) =>
                        all((elm2, ind2, arr) => !!elem(elm2, arr), word),
                    [word.split(''), word]));
        });
        it ('should return `false` when element is not found in given list', function () {
            const word = 'hello world';
            expectTrue(
                all((elm, ind) =>
                        all((elm2, ind2, arr) => !elem('z', arr), elm),
                    [word.split(''), word]));
        });
    });

    describe ('#notElem', function () {
        it ('should return `false` when the element is found in given list', function () {
            const word = 'hello world';
            expectTrue(
                all((elm, ind) =>
                        all((elm2, ind2, arr) => !notElem(elm2, arr), word),
                    [word.split(''), word]));
        });
        it ('should return `true` when element is not found in given list', function () {
            const word = 'hello world';
            expectTrue(
                all((elm, ind) =>
                        all((elm2, ind2, arr) => notElem('z', arr), elm),
                    [word.split(''), word]));
        });
    });

    describe ('#lookup', function () {
        it ('should return found value when key is set on type instance', function () {
            const word = 'hello world',
                obj = word.split('').reduce((agg, item) => {
                    agg[item] = item + ' value';
                    return agg;
                }, {});
            expectTrue(
                all((elm, ind) =>
                        all((elm2, ind2) => lookup(elm2, obj) === elm2 + ' value', word),
                    [word.split(''), word]));
        });
        it ('should return `undefined` when element is not found in given list', function () {
            const word = 'hello world',
                obj = word.split('').reduce((agg, item) => {
                    agg[item] = item + ' value';
                    return agg;
                }, {});
            expectTrue(
                all((elm, ind) =>
                        all((elm2, ind2, arr) => lookup('z', obj) === undefined, elm),
                    [word.split(''), word]));
        });
    });

    describe ('#find', function () {
        it ('should should find element that matches predicate when element is in given list', function () {
            const word = 'word',
                pred = x => x === 'o';
            expectEqual(find(pred, word), 'o');
            expectEqual(find(pred, word.split('')), 'o');
        });
    });

    describe ('#filter', function () {
        it ('should have more tests.');
    });

    describe ('#partition', function () {
        it ('should take elements into first listOps while predicate is fulfilled and elements ' +
            'that didn\'t match into second listOps', function () {
            const word = 'abcdefg',
                expectedResults = ['abcdfg', 'e'],
                predicate = x => x !== 'e';

            // Expect matched length and matched elements
            expectTrue(
                // Ensure cases for each use case
                all(tuple =>
                    length(expectedResults) === length(tuple) &&
                    all((tuplePart, ind) =>
                            // !log(tuple, tuplePart, expectedResults, expectedResults[ind]) &&
                            // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all((x, ind2) => x === expectedResults[ind][ind2], tuplePart),
                        tuple),
                    // Use cases (one with stringOps other with listOps)
                    [partition(predicate, word.split('')), partition(predicate, word)]
                ));
        });

        it ('should return an listOps of empty arrays and/or strings when an empty list is passed in', function () {
            expectTrue(
                all(tuple =>
                    length(tuple) === 2 &&
                    all((tuplePart, ind) => (isString(tuplePart) || isArray(tuplePart)) &&
                        length(tuplePart) === 0, tuple),
                    [partition(a => a, ""), partition(x => x, [])]
                ));
        });
    });

    describe ('#at', function () {
        it ('should have more tests');
    });

    describe ('#elemIndex', function () {
        it ('should return the index where the element is found', function () {
            const word = 'hello world';
            expectTrue(
                all((elm, ind) =>
                        all((elm2, ind2, arr) => elemIndex(elm2, arr) === word.indexOf(elm2), elm),
                    [word.split(''), word]));
        });
        it ('should return `undefined` when element is not in list', function () {
            const word = 'hello world';
            expectTrue(
                all((elm, ind) =>
                        all((elm2, ind2, arr) => elemIndex('z', arr) === undefined, elm),
                    [word.split(''), word]));
        });
    });

    describe ('#elemIndices', function () {
        it ('should return all found element indices in a list', function () {
            const nums = range(0, 22),
                word = nums.join(''),
                predicate = x => x.indexOf('1') > -1,
                indices = word.split('').reduce((agg, item, ind) => {
                    if (predicate(item)) { agg.push(ind); }
                    return agg;
                }, []);

            expectTrue(
                // Ensure cases for each use case
                all(list => all((item, ind) => list[ind] === item, indices),
                    [elemIndices('1', word), elemIndices('1', word.split(''))]
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

    describe ('#findIndices', function () {
        it ('should', function () {
            const token = 'aecedegefehea',
                tokenParts = token.split(''),
                eIndices = [1, 3, 5, 7, 9, 11],
                notEIndices = [0, 2, 4, 6, 8, 10, 12],
                aIndices = [0, 12],
                noIndices = [],
                indiceTests = [
                    [findIndices(x => x === 'e'), eIndices],
                    [findIndices(x => x !== 'e'), notEIndices],
                    [findIndices(x => x === 'a'), aIndices],
                    [findIndices(x => false), noIndices]
                ];
            // expectTrue(
            //     all(xs =>
            //         all((key, ind2) => key === args[1][ind2], args[0](xs)),
            //         [token, tokenParts])
            // );
        });
    });

    describe ('#zip', function () {
        it ('should have more tests.');
    });

    describe ('#zipN', function () {
        it ('should have more tests.');
    });

    describe ('#zipWith', function () {
        it ('should have more tests.');
    });

    describe ('#unzip', function () {
        it ('should have more tests.');
    });

    describe ('#unzipN', function () {
        it ('should have more tests.');
    });

    describe ('#lines', function () {
        it ('should have more tests.');
    });

    describe ('#words', function () {
        it ('should have more tests.');
    });

    describe ('#unlines', function () {
        it ('should have more tests.');
    });

    describe ('#unwords', function () {
        it ('should have more tests.');
    });

    describe ('#nub', function () {
        it ('should have more tests.');
    });

    describe ('#remove', function () { // same as `delete`
        it ('should have more tests.');
    });

    describe ('#complement', function () {
        it ('should return an empty listOps when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, arrayComplement)();
        });
        it ('should return an empty listOps if only one listOps is passed in', function () {
            compose(expectEqual(__, 0), length, arrayComplement)([1,2,3]);
        });
        it ('should return elements not in first listOps passed to it', function () {
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

    describe ('#difference', function () {
        it ('should return an empty listOps when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, arrayDifference)();
        });
        it ('should return a clone of the passed in listOps if it is only the first listOps that is passed in', function () {
            compose(expectEqual(__, 3), length, arrayDifference([]))([1,2,3]);
        });
        it ('should return an empty listOps when there are no differences between the two arrays passed in', function () {
            compose(expectEqual(__, 0), length, arrayDifference([1, 2, 3]))([1,2,3]);
        });
        it ('should return a clone of the passed in listOps if it is only the first listOps that is passed in', function () {
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

    describe ('#intersect', function () {
        it ('should return an empty listOps when receiving an empty listOps as parameter 1', function () {
            compose(expectEqual(__, 0), length, arrayIntersect)([]);
            compose(expectEqual(__, 0), length, arrayIntersect([]))([1, 2, 3]);
        });
        it ('should return an empty listOps when receiving an empty listOps as parameter 2', function () {
            compose(expectEqual(__, 0), length, arrayIntersect([1, 2, 3]))([]);
        });
        it ('should return an empty listOps when both arrays passed are empty', function () {
            compose(expectEqual(__, 0), length, arrayIntersect([]))([]);
        });
        it ('should return an empty listOps when no arrays are passed in', function () {
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
                    result = arrayUnion(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#sort', function () {
        it ('should have more tests written');
    });

    describe ('#sortOn', function () {
        it ('should have more tests written');
    });

    describe ('#insert', function () {
        it ('should have more tests written');
    });

    describe ('#nubBy', function () {
        it ('should have more tests written');
    });

    describe ('#removeBy', function () {
        it ('should have more tests written');
    });

    describe ('#removeFirstBy', function () {
        it ('should have more tests written');
    });

    describe ('#unionBy', function () {
        it ('should have more tests written');
    });

    describe ('#intersectBy', function () {
        it ('should have more tests written');
    });

    describe ('#groupBy', function () {
        it ('should have more tests written');
    });

    describe ('#sortBy', function () {
        it ('should have more tests written');
    });

    describe ('#insertBy', function () {
        it ('should have more tests written');
    });

    describe ('#maximumBy', function () {
        it ('should have more tests written');
    });

    describe ('#minimumBy', function () {
        it ('should have more tests written');
    });

    describe ('#flatten', function () {
        it ('should return an listOps when receiving an listOps', function () {
            expectInstanceOf(flatten([]), Array);
        });

        it ('should flatten an listOps', function () {
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
        it ('should return an listOps when receiving many arrays', function () {
            const result = flattenMulti([], [[]], [[[]]], [[[[]]]]);
            expectInstanceOf(result, Array);
            expectShallowEquals(result, []);
        });

        it ('should flatten all passed in arrays into one listOps no matter their dimensions', function () {
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
