/**
 * Created by elyde on 12/29/2016.
 * @todo ensure we are checking lengths in our operation results (to ensure accuracy of our tests).
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {compose} from '../../src/functionOps/compose';
import {negateP} from '../../src/functionOps/negateP';
import {__} from '../../src/functionOps/curry';
import {split} from '../../src/stringOps/stringOps';
import {isArray, isString} from '../../src/objectOps/is';
import {isTruthy} from '../../src/booleanOps/is';
import {bEqual as equal} from '../../src/booleanOps/booleanOps';
import {lines, unlines, words, unwords} from '../../src/stringOps/stringOps';
import {
    all, and, or, any, find, findIndex, findIndices,
    zip, zipN, zipWith, unzip, unzipN,
    map, mapAccumL, mapAccumR,
    elem, notElem, elemIndex, elemIndices, lookup,
    head, last, init, tail, uncons, length,
    reverse, intersperse, intercalate, transpose, subsequences, permutations,
    isEmpty as isEmptyList, iterate, repeat, replicate, cycle,
    take, drop, splitAt, foldl, foldl1, foldr, foldr1, unfoldr,
    concat, concatMap, takeWhile, dropWhile, dropWhileEnd, partition,
    at, span, breakOnList, stripPrefix, group, inits, tails,
    isPrefixOf, isSuffixOf, isInfixOf, isSubsequenceOf,
    filter, sum, product, maximum, minimum, nub, remove, insert,
    nubBy, removeBy, removeFirstsBy, sort,
    complement, difference, union, intersect
} from '../../src/listOps/listOps';

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
    alphabetArray,
    alphabetCharCodeRange,
    log, alphabetString
} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('#listOps', function () {

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
            compose(expectEqual('orange'), intercalate(''), init, strToArray)('oranges');
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
            compose(expectEqual('ello'), intercalate(''), tail, strToArray)('hello');
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

    describe ('#isEmpty (a.k.a. #`null`)', function () {
        it ('should return `true` when a list is empty.', function () {
            expectTrue(isEmptyList([]));
            expectTrue(isEmptyList(''));
        });
        it ('should return `false` when a list is not empty.', function () {
            expectFalse(isEmptyList(['a', 'b', 'c']));
            expectFalse(isEmptyList('abc'));
        });
        it ('should throw an error when receiving something that is list like (doesn\'t have a `length` prop', function () {
            assert.throws(() => isEmptyList(null), Error);
            assert.throws(() => isEmptyList(undefined), Error);
            assert.throws(() => isEmptyList(), Error);
        });
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
        it ('should reverse a list passed in.', function () {
            const word = 'hello';
            expectEqual(reverse(word), 'olleh');
            expectShallowEquals(reverse(split('', word)), split('', 'olleh'));
        });
        it ('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(reverse([]), []);
            expectEqual(reverse(''), '');
        });
        it ('should throw an error when receiving no value', function () {
            assert.throws(reverse, Error);
            assert.throws(() => reverse(undefined), Error);
            assert.throws(() => reverse(null), Error);
        });
    });

    describe ('#intersperse', function () {
        it ('should be able to inject a list (string or array) in-between the items of a list of the same type.', function () {
            const result1 = intersperse(', ', alphabetArray).join(''),
                result2 = intersperse(', ', alphabetString);
            expectEqual(result1, alphabetArray.join(', '));
            expectEqual(result2, alphabetArray.join(', '));
        });
        it ('should return a list with the same item when the list has a length of `1`', function () {
            expectEqual(intersperse(', ', 'a'), 'a');
            expectShallowEquals(intersperse(', ', ['a']), ['a']);
            log()
        });
        it ('should return an empty list when receiving an empty list', function () {
            expectEqual(intersperse('', ''), '');
            expectShallowEquals(intersperse('', []), []);
        });
    });

    describe ('#intercalate', function () {
        it ('should intercalate a list within another list and then perform concat on the result', function () {
            const result1 = intercalate(', ', alphabetArray),
                result2 = intercalate(', ', alphabetString);
            expectEqual(result1, alphabetArray.join(', '));
            expectEqual(result2, alphabetArray.join(', '));
        });
        it ('should return a list with the same item when the list has a length of `1`', function () {
            expectEqual(intercalate(', ', 'a'), 'a');
            expectShallowEquals(intercalate(', ', ['a']), 'a');
            expectShallowEquals(intercalate(', ', [['a']]), ['a']); // Ensure list is flattened one level
        });
        it ('should return an empty list when receiving an empty list', function () {
            expectEqual(intercalate('', ''), '');
            expectShallowEquals(intercalate('', []), []);
            expectShallowEquals(intercalate('', [[]]), []); // Ensures list is flattened one level
        });
    });

    describe ('#transpose', function () {
        const result1 = transpose([[1,2,3],[4,5,6]]),
            result2 = transpose([[10,11],[20],[],[30,31,32]]);
        it ('should transpose a list of lists into a rotated list of lists (from columns and rows to rows and' +
            ' columns and vice versa).', function () {
            expectTrue(all(
                tuple =>
                    all((list, ind) => all((x, ind2) => x === tuple[1][ind][ind2], list),
                        tuple[0]),
                [
                    [ result1, ([[1, 4], [2, 5], [3, 6]]) ],
                    [ result2, ([[10, 20, 30], [11, 31], [32]]) ]
                ]
            ));
        });
        it ('should ignore empty lists in the transposition process and not add them to the resulting list.', function () {
            expectTrue(all(length, result1));
            expectTrue(all(length, result2));
        });
        it ('should return an empty list when receiving one or when items contained are empty', function () {
            expectShallowEquals(transpose([[], [], []]), []);
            expectShallowEquals(transpose([]), []);
        });
    });

    describe ('#subsequences', function () {
        it ('should have more tests.');
    });

    describe ('#permutations', function () {
        it ('should have more tests.');
    });

    describe ('#foldl', function () {
        it ('should fold a `Foldable` (list, etc.) into some value', function () {
            const phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = ind => parseInt(ind, 10) !== phraseIndCount ? '|' : '',
                expectedTransform = map((x, ind) => x + getAppendage(ind), split('', phrase));
            expectEqual(
                foldl((agg, item, ind) => {
                    agg += item + getAppendage(ind);
                    return agg;
                }, '', phrase),
                expectedTransform.join('')
            );
            expectEqual(
                foldl((agg, item) => agg + item, 0, [1, 2, 3, 4, 5]),
                15
            );
            expectEqual(
                foldl((agg, item) => agg * item, 1, [1, 2, 3, 4, 5]),
                120
            );
            expectShallowEquals(
                foldl((agg, item, ind) => {
                    agg.push(item + getAppendage(ind));
                    return agg;
                }, [], split('', phrase)),
                expectedTransform
            );
        });

        it ('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldl((agg, item) => agg + item, 'a', ''), 'a');
            expectShallowEquals(foldl((agg, item) => agg + item, [], []), []);
        });

        it ('should throw an error when `null` or `undefined` are passed in as the list', function () {
            assert.throws(() => foldl((agg, item) => agg + item, 'a', null), Error);
            assert.throws(() => foldl((agg, item) => agg + item, 'a', undefined), Error);
        });
    });

    describe ('#foldl1', function () {
        it ('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', function () {
            const phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = ind => parseInt(ind, 10) < phraseIndCount ? '|' : '',
                expectedTransform = map((x, ind) => x + getAppendage(ind), split('', phrase));
            expectEqual(
                foldl1((agg, item, ind) => {
                    agg += getAppendage(ind) + item;
                    return agg;
                }, phrase),
                expectedTransform.join('')
            );
            expectEqual(
                foldl1((agg, item) => agg + item, [1, 2, 3, 4, 5]),
                15
            );
            expectEqual(
                foldl1((agg, item) => agg * item, [1, 2, 3, 4, 5]),
                120
            );
            expectShallowEquals(
                foldl1((agg, item, ind) => {
                    agg += getAppendage(ind) + item;
                    return agg;
                }, split('', phrase)),
                expectedTransform.join('')
            );
        });
        it ('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldl1((agg, item) => agg + item, ''), '');
            expectShallowEquals(foldl1((agg, item) => agg + item, []), []);
        });
        it ('should return `undefined` when receiving nothing (`null` or `undefined`)', function () {
            expectEqual(foldl1((agg, item) => agg + item, null), undefined);
            expectEqual(foldl1((agg, item) => agg + item, undefined), undefined);
        });
    });

    describe ('#foldr', function () {
        it ('should fold a `Foldable` (list, etc.) into some value', function () {
            const phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = ind => parseInt(ind, 10) !== phraseIndCount ? '|' : '',
                expectedTransform = reverse(map((x, ind) => x + getAppendage(ind), split('', phrase)));
            expectEqual(
                foldr((agg, item, ind) => {
                    agg += item + getAppendage(ind);
                    return agg;
                }, '', phrase),
                expectedTransform.join('')
            );
            expectEqual(
                foldr((agg, item) => agg + item, 0, [1, 2, 3, 4, 5]),
                15
            );
            expectEqual(
                foldr((agg, item) => agg * item, 1, [1, 2, 3, 4, 5]),
                120
            );
            expectShallowEquals(
                foldr((agg, item, ind) => {
                    agg.push(item + getAppendage(ind));
                    return agg;
                }, [], split('', phrase)),
                expectedTransform
            );
        });

        it ('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldr((agg, item) => agg + item, 'a', ''), 'a');
            expectShallowEquals(foldr((agg, item) => agg + item, [], []), []);
        });

        it ('should throw an error when `null` or `undefined` are passed in as the list', function () {
            assert.throws(() => foldr((agg, item) => agg + item, 'a', null), Error);
            assert.throws(() => foldr((agg, item) => agg + item, 'a', undefined), Error);
        });
    });

    describe ('#foldr1', function () {
        it ('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', function () {
            const phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = ind => ind <= phraseIndCount ? '|' : '',
                expectedTransform = reverse(map((x, ind, arr) => x + (ind !== 0 ? getAppendage(ind) : ''), split('', phrase)));
            expectEqual(
                foldr1((agg, item, ind) => {
                    agg += getAppendage(ind) + item;
                    return agg;
                }, phrase),
                expectedTransform.join('')
            );
            expectEqual(
                foldr1((agg, item) => agg + item, [1, 2, 3, 4, 5]),
                15
            );
            expectEqual(
                foldr1((agg, item) => agg * item, [1, 2, 3, 4, 5]),
                120
            );
            expectShallowEquals(
                foldr1((agg, item, ind) => {
                    agg += getAppendage(ind) + item;
                    return agg;
                }, split('', phrase)),
                expectedTransform.join('')
            );
        });
        it ('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldr1((agg, item) => agg + item, ''), '');
            expectShallowEquals(foldr1((agg, item) => agg + item, []), []);
        });
        it ('should return `undefined` when receiving nothing (`null` or `undefined`)', function () {
            expectEqual(foldr1((agg, item) => agg + item, null), undefined);
            expectEqual(foldr1((agg, item) => agg + item, undefined), undefined);
        });
    });

    describe ('#concat', function () {
        it ('should concatenate a list of lists into a list.', function () {
            const  listOfLists = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
                altListOfLists = ['abc', 'def', 'ghi'];
            expectShallowEquals(concat(listOfLists), listOfLists.reduce((agg, item) => agg.concat(item)));
            expectShallowEquals(concat(altListOfLists), altListOfLists.reduce((agg, item) => agg + item));
        });
        it ('should return an empty list when receiving an empty list or a list of empty lists', function () {
            expectShallowEquals(concat([]), []);
            expectShallowEquals(concat([[], [], []]), []);
        });
        it ('should throw an error when receiving nothing', function () {
            assert.throws(concat, Error);
            assert.throws(() => concat(null), Error);
            assert.throws(() => concat(undefined), Error);
        });
    });

    describe ('#concatMap', function () {
        const id = x => x;
        it ('should map a function on a list and concatenate lists in resulting list into a list.', function () {
            const charCodeToCharOp = charCode => String.fromCharCode(charCode),
                charCodeRange = alphabetCharCodeRange;
            // @investigate is babel shimming String.fromCharCode;
            //  When passing this function direct to `[].map` it returns a weird result (seems like it's returning
            //  an instance of `String` using `new` and it's constructor)?
            // log (alphabetArray);
            expectShallowEquals(concatMap(charCodeToCharOp, charCodeRange), alphabetArray.join(''));
            expectShallowEquals(concatMap(charCode => [String.fromCharCode(charCode)], charCodeRange), alphabetArray);
        });
        it ('should return an empty list when receiving an empty list or a list of empty lists', function () {
            expectShallowEquals(concatMap(id, []), []);
            expectShallowEquals(concatMap(id, [[], [], []]), []);
        });
        it ('should throw an error when receiving `undefined` or `null` in it\'s list position', function () {
            assert.throws(() => concatMap(id, null), Error);
            assert.throws(() => concatMap(id, undefined), Error);
        });
    });

    describe ('#and', function () {
        it ('should return `true` when all items of a container are "truthy".', function () {
            expectTrue(and(['a', 1, 99, true, (() => null), {}, []]));
        });
        it ('should return `false` when not all items of a container are "truthy".', function () {
            expectFalse(and(['a', 1, 0, true, (() => null), {}, []]));
        });
        it ('should return `false` when receiving an empty list or nothing.', function () {
            expectFalse(and(''));
            expectFalse(and(['']));
            expectFalse(and([null]));
            expectFalse(and([undefined]));
            expectFalse(and([false]));
        });
        it ('should an error when receiving nothing', function () {
            assert.throws(() => and(undefined), Error);
            assert.throws(() => and(null), Error);
        })
    });

    describe ('#or', function () {
        it ('should return `true` when, at least, one of the items is "truthy".', function () {
            expectTrue(or([0, false, null, 1, undefined]));
        });
        it ('should return `false` when all of the items are "falsy".', function () {
            expectFalse(or([0, false, null, undefined, '']));
        });
        it ('should return `false` when an empty list is received.', function () {
            expectFalse(or([]));
        });
        it ('should throw an error when receiving nothing (`null` or `undefined`).', function () {
            assert.throws(() => or(null), Error);
            assert.throws(() => or(undefined), Error);
        });
    });

    describe ('#any', function () {
        const id = x => x;
        it ('should return `true` when any item matches predicate.', function () {
            expectTrue(any(isTruthy, [0, false, null, 1, undefined]));
            expectTrue(any(isTruthy, ['hello']));
            expectTrue(any(x => x === 'e', 'hello'));
        });

        it ('should return `false` when no item in received items matches predicate.', function () {
            expectFalse(any(isTruthy, [0, false, null, undefined, '']));
            expectFalse(any(isTruthy, [0]));
            expectFalse(any(x => x === 'e', 'avalon'));
        });
        it ('should return `false` when an empty list is received.', function () {
            expectFalse(any(id, []));
        });
        it ('should throw an error when receiving nothing (`null` or `undefined`).', function () {
            assert.throws(() => any(id, null), Error);
            assert.throws(() => any(id, undefined), Error);
        });
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
        it ('should be able sum up any given list of numbers list of numbers', function () {
            expectEqual(sum(range(1, 5)), 15);
            expectEqual(sum(range(-5, -1)), -15);
        });
        it ('should return `0` when receiving an empty list', function () {
            expectEqual(sum(range()), 0);
        });
        it ('should throw an error when receiving nothing (`null` or `undefined`)', function () {
            assert.throws(() => sum(null), Error);
            assert.throws(() => sum(undefined), Error);
            assert.throws(() => sum(), Error);
        });
    });

    describe ('#product', function () {
        it ('should be able return the product of a given list', function () {
            expectEqual(product(range(1, 5)), 120);
            expectEqual(product(range(-5, -1)), -120);
        });
        it ('should return `0` when receiving an empty list', function () {
            expectEqual(product(range()), 1);
        });
        it ('should throw an error when receiving nothing (`null` or `undefined`)', function () {
            assert.throws(() => product(null), Error);
            assert.throws(() => product(undefined), Error);
            assert.throws(() => product(), Error);
        });
    });

    describe ('#maximum', function () {
        it ('should be able return the maximum of a given list', function () {
            expectEqual(maximum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 5);
            expectEqual(maximum(range(-5, -1).concat([-3, -5, -7])), -1);
        });
        it ('should return `-Infinity` when no value is received (empty list, `null`, or `undefined`)', function () {
            expectEqual(maximum(null), -Infinity);
            expectEqual(maximum(undefined), -Infinity);
            expectEqual(maximum([]), -Infinity);
            expectEqual(maximum(), -Infinity);
        });
    });

    describe ('#minimum', function () {
        it ('should be able return the minimum of a given list', function () {
            expectEqual(minimum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 1);
            expectEqual(minimum(range(-5, -1).concat([-3, -5, -7])), -7);
        });
        it ('should return `Infinity` when no value is received (empty list, `null`, or `undefined`)', function () {
            expectEqual(minimum(null), Infinity);
            expectEqual(minimum(undefined), Infinity);
            expectEqual(minimum([]), Infinity);
            expectEqual(minimum(), Infinity);
        });
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
        it ('should be able to unfold any value from right to left.', function () {
            expectShallowEquals(
                unfoldr(minuend => {
                    let diff = minuend - 1;
                    return diff >= 0 ? [minuend, diff] : undefined;
                }, 10),
                reverse(range(1, 10))
            );
        });
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
        it ('should drop elements while predicate is fulfilled', function () {
            const word = 'abcdefg',
                expectedResult = word.substring(0, word.indexOf('e')),
                predicate = x => x !== 'e';

            // Expect matched length and matched elements
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                        // Ensure correct length of items in returned element
                        // !log(result, expectedResult) &&
                    length(expectedResult) === length(result) &&
                    // Ensure elements where matched
                    all((x, ind) => x === expectedResult[ind], result),
                    // Use cases (one with stringOps other with listOps)
                    [dropWhileEnd(predicate, word.split('')),
                        dropWhileEnd(predicate, word)]
                ));
        });
        it ('should return an empty type instance if predicate is matched all the way through', function () {
            const word = 'abcdefg',
                pred = x => word.indexOf(x) > -1,
                lenWord = length(word);

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                    // Ensure all items returned
                    // !log(result) &&
                    length(result) === lenWord,
                    [dropWhileEnd(pred, word.split('')), dropWhileEnd(pred, word)]
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
                        // /!*!log(result) && *!/
                    length(result) === length(word) &&
                    // Ensure elements where matched
                    all((x, ind) => x === word[ind], result),
                    // Use cases
                    [dropWhileEnd(pred, word.split('')), dropWhileEnd(pred, word)]
                ));
        });
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
        it ('should be able to strip a prefix from a list', function () {
            expectShallowEquals(
                stripPrefix('abc', alphabetArray.slice(0, 10)),
                alphabetArray.slice(3, 10));

            expectShallowEquals(
                stripPrefix('abc', alphabetString.substring(0, 10)),
                alphabetString.substring(3, 10));
        });
        it ('should return a copy of the passed in list when prefix is not found', function () {
            expectShallowEquals(stripPrefix('!*&', alphabetArray), alphabetArray);
            expectEqual(stripPrefix('!*&', alphabetString), alphabetString);
            expectEqual(stripPrefix('!*&', ''), '');
            expectShallowEquals(stripPrefix('!*&', []), []);
        });
        it ('should throw an error when receiving nothing in either position', function () {
            assert.throws(() => stripPrefix(null, 'abc'), Error);
            assert.throws(() => stripPrefix(null, null), Error);
            assert.throws(() => stripPrefix('abc', null), Error);
        });
    });

    describe ('#group', function () {
        it ('should return a list of lists which contain the (sequential) matches', function () {
            const expectedResultFlattened = ['M', 'i', 'ss', 'i', 'ss', 'i', 'pp', 'i'];
            expectShallowEquals(group('Mississippi'), expectedResultFlattened);
            expectShallowEquals(
                // Flatten results first
                group('Mississippi'.split('')).map(item => item.join('')),
                expectedResultFlattened
            );
        });
        it ('should return a list of lists containing individual ungrouped items', function () {
            expectShallowEquals(group(alphabetString), alphabetArray);
            expectShallowEquals(
                // Flatten result first
                group(alphabetArray).map(item => item.join('')),
                alphabetArray);
        });
    });

    describe ('#inits', function () {
        it ('should unfold a list into list of all possible ' +
            'non-omitting sequential sets that start with initial item', function () {
            expectTrue(all(
                    (item, ind, original) => length(item) === ind,
                    inits(alphabetString)
            ));
            expectTrue(all(
                    (item, ind, original) => length(item) === ind,
                    inits(alphabetArray)
                ));
        });
    });

    describe ('#tails', function () {
        it ('should unfold a list into list of all possible ' +
            'non-omitting sequential sets that start with the last item', function () {
            const limit = length(alphabetString);
            expectTrue(all(
                (item, ind) => {
                    const headOfLast = head(item);
                    // log (headOfLast, alphabetString[ind]);//, resultList);
                    return length(item) ? length(item) === limit - ind &&
                       headOfLast === alphabetString[ind] : true
                },
                tails(alphabetString)
            ));
            expectTrue(all(
                (item, ind) => {
                    const headOfLast = head(item);
                    //log (headOfLast, alphabetString[ind]);
                    return length(item) ? length(item) === limit - ind &&
                       headOfLast === alphabetArray[ind] : true
                },
                tails(alphabetArray)
            ));
        });
    });

    describe ('#isPrefixOf', function () {
        it ('should return `true` when a list is a prefix of another', function () {
            expectTrue(all(
                isPrefixOf('abc'),
                splitAt(3, inits(alphabetString))[1]
            ));
            expectTrue(all(
                isPrefixOf('abc'.split('')),
                splitAt(3, inits(alphabetArray))[1]
            ));
        });
        it ('should return `false` when a list is not prefix of second list', function () {
            expectTrue(all(
                negateP(isPrefixOf('!@#')),
                splitAt(3, inits(alphabetString))[1]
            ));
            expectTrue(all(
                negateP(isPrefixOf('!@#'.split(''))),
                splitAt(3, inits(alphabetArray))[1]
            ));
        });
    });

    describe ('#isSuffixOf', function () {
        it ('should return `true` when a list is a suffix of another', function () {
            const candidateString = splitAt(length(alphabetString) - 2, tails(alphabetString))[0];
            // log (candidateString);
            expectTrue(all(
                isSuffixOf('xyz'),
                candidateString
            ));
            expectTrue(all(
                isSuffixOf('xyz'.split('')),
                splitAt(length(alphabetArray) - 2, tails(alphabetArray))[0]
            ));
        });
        it ('should return `false` when a list is not suffix of second list', function () {
            expectTrue(all(
                negateP(isSuffixOf('!@#')),
                splitAt(length(alphabetString) - 2, tails(alphabetString))[0]
            ));
            expectTrue(all(
                negateP(isSuffixOf('!@#'.split(''))),
                splitAt(length(alphabetString) - 2, tails(alphabetArray))[0]
            ));
        });
    });

    describe ('#isInfixOf', function () {
        it ('should return `true` when a list is infixed with another', function () {
            const results = concatMap(candidate => [
                isInfixOf(candidate, alphabetString),
                isInfixOf(candidate, alphabetArray)
            ], ['abc', 'efg', 'xyz']);
            //log(results);
            expectTrue(and(results));
        });
        it ('should return `false` when a list is not infix of second list', function () {
            expectTrue(and([
                negateP(isInfixOf('!@#'))(alphabetString),
                negateP(isInfixOf('!@#'.split(''))(alphabetArray))
            ]));
        });
    });

    describe ('#isSubsequenceOf', function () {
        it ('should return true a list is sub-sequence of another.', function () {
            const listToSearchIn = take(6, alphabetString);
            expectTrue(all(
                listToSearchFor => isSubsequenceOf(listToSearchFor, listToSearchIn),
                ['bdf', 'ace', 'abc', 'def']
            ));
        });
        it ('should return false a list is not sub-sequence of another.', function () {
            const listToSearchIn = take(6, drop(6, alphabetString));
            expectTrue(all(
                listToSearchFor => !isSubsequenceOf(listToSearchFor, listToSearchIn),
                ['bdf', 'ace', 'abc', 'def']
            ));
        });
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
        it ('should be able to filter a list by a predicate.', function () {
            const pred = (_, ind) => ind % 2 === 0;
            expectShallowEquals(
                filter(pred, alphabetString),
                alphabetString.split('').filter(pred)
            );
            expectShallowEquals(
                filter(pred, alphabetArray),
                alphabetString.split('').filter(pred)
            );
        });
        it ('should return an empty list when no items match predicate', function () {
            const pred = char => char === '#';
            expectShallowEquals(filter(pred, alphabetString), '');
            expectShallowEquals(filter(pred, alphabetArray), []);
        });
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
        it ('should return an item at a given key/index.', function () {
            [alphabetString, alphabetArray].forEach(subject => {
                const subjectLastInd = length(subject) - 1;
                expectEqual(at(0, subject), subject[0]);
                expectEqual(at(5, subject), subject[5]);
                expectEqual(at(subjectLastInd, subject), subject[subjectLastInd]);
            });
        });
        it ('should return `undefined` when list has no length.', function () {
            expectEqual(at(0, ''), undefined);
            expectEqual(at(0, []), undefined);
        });
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
        it ('should be able to zip two lists into a list of tuples (list of two items).', function () {
            const [list1, list2] = splitAt(length(alphabetArray) / 2, alphabetArray),
                result = zip(list1, list2),
                expectedResult = foldl((agg, item, ind) => {
                        agg.push([item, list2[ind]]);
                        return agg;
                    }, [], list1);
            // log (list1, list2); // two halves of alphabet array
            expectTrue(all(x => 13, [length(list1), length(list2)]));
            expectEqual(length(result), length(expectedResult));
            expectTrue(all((tuple, ind) => tuple[0] === expectedResult[ind][0] &&
                tuple[1] === expectedResult[ind][1]
                , result));
        });
        it ('should return an empty list when empty lists are passed', function () {
            expectShallowEquals(zip([], []), []);
        });
        it ('should return a copy of the passed in populated list when one of them is not populated.', function () {
            expectShallowEquals(zip([], alphabetArray), alphabetArray);
            expectShallowEquals(zip(alphabetArray, []), alphabetArray);
        });
    });

    describe ('#zipN', function () {
        it ('should be able to zip the given number of lists.', function () {
            // Unfold alphabet array into an array with arrays of 5 items (as our initial subject).
            const subj = unfoldr (remainder => {
                        return !length(remainder) ?
                            undefined : splitAt(5, remainder);
                    }, take(25, alphabetArray)),

                subj2 = [
                    range(1, 5),
                    range(8, 13),
                    [],
                    range(13, 21),
                    []
                ],

                subj3 = [
                    [],
                    range(21, 34),
                    range(34, 55)
                ],

                zipNResult = zipN.apply(null, subj),

                zipNResult2 = zipN.apply(null, subj2);

                // log(zipNResult, zipNResult2);

                expectTrue(
                    all( tuple =>
                        all( (list, ind) =>
                            all( (item, ind2) =>
                                // !log(item, tuple[1][ind2][ind]) &&
                                item === tuple[1][ind2][ind], list
                            ),
                            tuple[0]
                        ),
                        [[zipNResult, filter(length, subj)],
                            [zipNResult2, filter(length, subj2)]]
                    )
                );
        });
        it ('should return an empty list when empty lists are passed in', function () {
            expectShallowEquals(zipN([], []), []);
        });
        it ('should return a copy of the left or right populated list when the other(s) is/are empty.', function () {
            expectShallowEquals(zipN([], alphabetArray), alphabetArray);
            expectShallowEquals(zipN(alphabetArray, []), alphabetArray);
        });
    });

    describe ('#zipWith', function () {
        const tuplize = (a, b) => [a, b];
        it ('should be able to zip the given number of lists.', function () {
            // Unfold alphabet array into an array with arrays of 5 items (as our initial subject).
            const subj = unfoldr (remainder => {
                    return !length(remainder) ?
                        undefined : splitAt(5, remainder);
                }, take(25, alphabetArray)),

                subj2 = [
                    range(1, 5),
                    range(8, 13),
                    [],
                    range(13, 21),
                    []
                ],

                subj3 = [
                    [],
                    range(21, 34),
                    range(34, 55)
                ],

                zipWithResult = zipWith(tuplize, ...subj),

                zipWithResult2 = zipWith(tuplize, ...subj2);

                // log(zipWithResult, zipWithResult2);

            expectTrue(
                all( tuple =>
                        all( (list, ind) =>
                                all( (item, ind2) =>
                                    // !log(item, tuple[1][ind2][ind]) &&
                                    item === tuple[1][ind2][ind], list
                                ),
                            tuple[0]
                        ),
                    [[zipWithResult, filter(length, subj)],
                        [zipWithResult2, filter(length, subj2)]]
                )
            );
        });
        it ('should return an empty list when empty lists are passed', function () {
            expectShallowEquals(zipWith(tuplize, [], []), []);
        });
        it ('should return a copy of the passed in populated list when one of them is not populated.', function () {
            expectShallowEquals(zipWith(tuplize, [], alphabetArray), alphabetArray);
            expectShallowEquals(zipWith(tuplize, alphabetArray, []), alphabetArray);
        });
    });

    describe ('#unzip', function () {
        it ('should be able to unzip a list of tuples of two.', function () {
            const subj = unfoldr (remainder => {
                return !length(remainder) ?
                    undefined : splitAt(2, remainder);
            }, alphabetArray),

            lenAlphaArray = length(alphabetArray),

            result = unzip(subj);

            // First ensure our subject is valid
            // --------------------------------------
            // Check that we have tuples of two (list of two in javascript's/our case)
            expectTrue(all(tuple => length(tuple) === 2, subj));

            // Ensure subject has expected length of items (tuples)
            expectEqual(length(subj), lenAlphaArray / 2);

            // Test result
            // ----------------
            // Ensure we have two lists (one for each part of tuple in `subj`).
            expectEqual(length(result), 2);

            // Ensure both lists in result have the expected length
            expectTrue(all(list => length(list) === lenAlphaArray / 2, result));

            // log (subj, result);

            // Ensure resulting lists contain expected items
            expectTrue(all(
                (list, i) =>
                    all((item, j) => item === subj[j][i], list),
                result
            ));

        });
    });

    describe ('#unzipN', function () {
        it ('should be able to unzip a list of tuples of any number.', function () {
            const subj = unfoldr (remainder => {
                    return !length(remainder) ?
                        undefined : splitAt(2, remainder);
                }, alphabetArray),
                lenAlphaArray = length(alphabetArray),
                result = unzipN(subj);

            log (subj, result);

            // First ensure our subject is valid
            // --------------------------------------
            // Check that we have tuples of two (list of two in javascript's/our case)
            expectTrue(all(tuple => length(tuple) === 2, subj));

            // Ensure subject has expected length of items (tuples)
            expectEqual(length(subj), lenAlphaArray / 2);

            // Test result
            // ----------------
            // Ensure we have two lists (one for each part of tuple in `subj`).
            expectEqual(length(result), 2);

            // Ensure both lists in result have the expected length
            expectTrue(all(list => length(list) === lenAlphaArray / 2, result));

            // Ensure resulting lists contain expected items
            expectTrue(all(
                (list, i) =>
                    all((item, j) => item === subj[j][i], list),
                result
            ));

        });
    });

    describe ('#lines', function () {
        it ('should split a string on all new line characters.', function () {
            const subj = intercalate('\n', alphabetArray),
                result = lines(subj);

            // log(length(subj), subj, result);

            // Ensure subject is valid first:
            // ------------------------------------
            // Expect new line char before every char except the first
            expectLength(length(alphabetArray) * 2 - 1, subj);

            // Check split string
            expectShallowEquals(alphabetArray, result);
        });
        it ('should return original string when no new lines are found in string', function () {
            expectShallowEquals(lines('hello world'), ['hello world']);
            expectShallowEquals(lines(''), ['']);
        });
        it ('should throw Errors when receiving nothing', function () {
            assert.throws(() => lines(null), Error);
            assert.throws(() => lines(undefined), Error);
        });
    });

    describe ('#words', function () {
        it ('should split a string on all whitespace characters.', function () {
            // subject | expectedLength | shallowEqualsTo
            const subjectsAndExpLens = [
                [intercalate(' ', alphabetArray), length(alphabetArray), alphabetArray],
                ['hello world', 2, ['hello', 'world']]
            ];

            subjectsAndExpLens.forEach(tuple => {
                const [subj, expectedLen, shallowEqualsTo] = tuple,
                    result = words(subj);

                // log(expectedLen, subj, result);

                // Check length of result
                expectLength(expectedLen, result);

                // Check split string
                expectShallowEquals(shallowEqualsTo, result);
            });
        });
        it ('should return a copy of original list when no whitespace characters are found.', function () {
            // subject | expectedLength | shallowEqualsTo
            const subjectsAndExpLens = [
                [alphabetString, 1, [alphabetString]],
                ['helloworld', 1, ['helloworld']]
            ];

            subjectsAndExpLens.forEach(tuple => {
                const [subj, expectedLen, shallowEqualsTo] = tuple,
                    result = words(subj);

                // log(expectedLen, subj, result);

                // Check length of result
                expectLength(expectedLen, result);

                // Check split string
                expectShallowEquals(shallowEqualsTo, result);
            });
        });
        it ('should throw Errors when receiving nothing', function () {
            assert.throws(() => words(null), Error);
            assert.throws(() => words(undefined), Error);
        });
    });

    describe ('#unlines', function () {
        it ('should join a list with new lines.', function () {
            ['hello world', alphabetString, alphabetArray].forEach(subj => {
                const result = unlines(subj);

                // check expected length
                expectLength(subj.length * 2 - 1, result);

                // Check items in resulted list
                expectShallowEquals(intersperse('\n', subj), result);
            });
        });
        it ('should return empty lists when receiving empty lists', function () {
            expectEqual(unlines(''), '');
            expectShallowEquals(unlines([]), []);
        });
        it ('should throw Errors when receiving nothing', function () {
            assert.throws(() => unlines(null), Error);
            assert.throws(() => unlines(undefined), Error);
        });
    });

    describe ('#unwords', function () {
        it ('should join a list of words with spaces.', function () {
            ['hello world', alphabetString, alphabetArray].forEach(subj => {
                const result = unwords(subj);

                // console.log('unwords', result);

                // check expected length
                expectLength(subj.length * 2 - 1, result);

                // Check items in resulted list
                expectShallowEquals(intersperse(' ', subj), result);
            });
        });
        it ('should return empty lists when receiving empty lists', function () {
            expectEqual(unwords(''), '');
            expectShallowEquals(unwords([]), []);
        });
        it ('should throw Errors when receiving nothing', function () {
            assert.throws(() => unwords(null), Error);
            assert.throws(() => unwords(undefined), Error);
        });
    });

    describe ('#nub', function () {
        it ('should remove all but first occurrences of repeat items in a list.', function () {
            expectEqual(nub('conundrum'), 'conudrm');
            expectEqual(nub(map(char => char + char, alphabetString)), alphabetString);
            expectShallowEquals(
                nub(concatMap(char => char + char, alphabetString).split('')),
                alphabetArray
            );
        });
        it ('should return a copy of the passed in list with items intact if there ' +
            'aren\'t any repeat items', function () {
            expectEqual(nub(alphabetString), alphabetString);
            expectShallowEquals(nub(alphabetArray), alphabetArray);
        });
        it ('should return empty lists when receiving empty lists', function () {
            expectEqual(nub(''), '');
            expectShallowEquals(nub([]), []);
        });
        it ('should throw Errors when receiving nothing', function () {
            assert.throws(() => nub(null), Error);
            assert.throws(() => nub(undefined), Error);
        });
    });

    describe ('#remove', function () { // same as `delete` (in haskell)
        it ('should remove the first occurrence of an item in a list.', function () {
            expectEqual(remove('l', 'hello world'), 'helo world');
            expectEqual(remove('l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(remove('a', alphabetString), tail(alphabetString));
            expectEqual(remove('z', alphabetString), init(alphabetString));
            expectShallowEquals(remove('a', alphabetArray), tail(alphabetArray));
            expectShallowEquals(remove('z', alphabetArray), init(alphabetArray));
            // log(remove('d', alphabetString));
        });
        it ('should return an empty list when receiving an empty list', function () {
            expectEqual(remove('a', ''), '');
            expectShallowEquals(remove('a', []), []);
        });
        it ('should throw Errors when receiving nothing in the list position', function () {
            assert.throws(() => remove(null, null), Error);
            assert.throws(() => remove(undefined, undefined), Error);
            assert.throws(() => remove(null, null), Error);
            assert.throws(() => remove(undefined, undefined), Error);
        });
    });

    describe ('#complement', function () {
        it ('should return an empty listOps when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, complement)();
        });
        it ('should return an empty listOps if only one listOps is passed in', function () {
            compose(expectEqual(__, 0), length, complement)([1,2,3]);
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
                    result = complement.apply(null, subjects);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#difference', function () {
        it ('should return an empty listOps when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, difference)();
        });
        it ('should return a clone of the passed in listOps if it is only the first listOps that is passed in', function () {
            compose(expectEqual(__, 3), length, difference([]))([1,2,3]);
        });
        it ('should return an empty listOps when there are no differences between the two arrays passed in', function () {
            compose(expectEqual(__, 0), length, difference([1, 2, 3]))([1,2,3]);
        });
        it ('should return a clone of the passed in listOps if it is only the first listOps that is passed in', function () {
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
        it ('should return an empty listOps when receiving an empty listOps as parameter 1', function () {
            compose(expectEqual(__, 0), length, intersect)([]);
            compose(expectEqual(__, 0), length, intersect([]))([1, 2, 3]);
        });
        it ('should return an empty listOps when receiving an empty listOps as parameter 2', function () {
            compose(expectEqual(__, 0), length, intersect([1, 2, 3]))([]);
        });
        it ('should return an empty listOps when both arrays passed are empty', function () {
            compose(expectEqual(__, 0), length, intersect([]))([]);
        });
        it ('should return an empty listOps when no arrays are passed in', function () {
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

    describe ('#sort', function () {
        it ('should sort a list in ascending order', function () {
            log(range(99, 0, -1));

        });
    });

    describe ('#sortOn', function () {
        it ('should have more tests written');
    });

    describe ('#insert', function () {
        it ('should have more tests written', function () {
            log(insert(99, range(0, 80, 5)));
            log(insert(99, range(0, 144, 5)));
            log(insert(99, reverse(range(0, 80, 5))));
        });
    });

    describe ('#nubBy', function () {
        it ('should remove all but first occurrences of repeat items in a list.', function () {
            expectEqual(nubBy(equal, 'conundrum'), 'conudrm');
            expectEqual(nubBy(equal, map(char => char + char, alphabetString)), alphabetString);
            expectShallowEquals(
                nubBy(equal, concatMap(char => char + char, alphabetString).split('')),
                alphabetArray
            );
        });
        it ('should return a copy of the passed in list with items intact if there ' +
            'aren\'t any repeat items', function () {
            expectEqual(nubBy(equal, alphabetString), alphabetString);
            expectShallowEquals(nubBy(equal, alphabetArray), alphabetArray);
        });
        it ('should return empty lists when receiving empty lists', function () {
            expectEqual(nubBy(equal, ''), '');
            expectShallowEquals(nubBy(equal, []), []);
        });
        it ('should throw Errors when receiving nothing', function () {
            assert.throws(() => nubBy(equal, null), Error);
            assert.throws(() => nubBy(equal, undefined), Error);
        });
    });

    describe ('#removeBy', function () {
        it ('should remove the first occurrence of an item in a list.', function () {
            expectEqual(removeBy(equal, 'l', 'hello world'), 'helo world');
            expectEqual(removeBy(equal, 'l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(removeBy(equal, 'a', alphabetString), tail(alphabetString));
            expectEqual(removeBy(equal, 'z', alphabetString), init(alphabetString));
            expectShallowEquals(removeBy(equal, 'a', alphabetArray), tail(alphabetArray));
            expectShallowEquals(removeBy(equal, 'z', alphabetArray), init(alphabetArray));
            // log(removeBy('d', alphabetString));
        });
        it ('should return an empty list when receiving an empty list', function () {
            expectEqual(removeBy(equal, 'a', ''), '');
            expectShallowEquals(removeBy(equal, 'a', []), []);
        });
        it ('should throw Errors when receiving nothing in the list position', function () {
            assert.throws(() => removeBy(equal, null, null), Error);
            assert.throws(() => removeBy(equal, undefined, undefined), Error);
            assert.throws(() => removeBy(equal, null, null), Error);
            assert.throws(() => removeBy(equal, undefined, undefined), Error);
        });
    });

    describe ('#removeFirstsBy', function () {
        const vowels = 'aeiou',
            vowelsArray = vowels.split(''),
            consonants = removeFirstsBy(equal, alphabetString, vowels),
            consonantsArray = consonants.split('');
        it ('should remove all first occurrences of all items in second list by passed in ' +
            'equality operation.', function () {
            // Remove first occurrences of `vowels` in `alphabet * 3`
            const subj1 = iterate(length(vowels), (value, ind) => {
                    const foundInd = value.indexOf(vowels[ind]);
                    if (foundInd > -1) {
                        const parts = splitAt(foundInd, value);
                        return concat([parts[0], tail(parts[1])]);
                    }
                    return value;
                }, concat([alphabetArray, alphabetArray, alphabetArray]));

            // Expect vowels removed from the same places in both lists
            expectTrue(all(tuple => !log(tuple) && tuple[0] === tuple[1], [[
                removeFirstsBy(equal, cycle(3, alphabetString), vowels),
                concat(subj1)
            ]]));

            // Expect vowels removed from the same places in both lists
            expectShallowEquals(
                removeFirstsBy(equal, cycle(3, alphabetArray), vowelsArray),
                subj1
            );

            // log(removeFirstsBy(equal, cycle(3, alphabetArray), 'aeiou'.split('')));
            // log(removeFirstsBy(equal, cycle(3, alphabetString), 'aeiou'));
        });
        it ('should return copy of original list when no items from second list are found in it.', function () {
            expectEqual(removeFirstsBy(equal, consonants, vowels), consonants);
            expectShallowEquals(
                removeFirstsBy(equal, consonantsArray, vowelsArray),
                consonantsArray
            );
        });
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

});
