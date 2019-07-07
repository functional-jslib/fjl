/**
 * Created by elyde on 12/29/2016.
 * @note ensure we are checking lengths in our operation results (to ensure accuracy of our tests).
 * @note ensure expected types (either explicitly or implicitly) are being returned where necessary.
 * @todo Remove extreme functional programming style (in favor of better readability and testabilty).
 * @todo Remove library functions from tests where they are not being tested (use native functions).
 */
import {compose, negateF2} from '../src/function';
import {isEmptyList, isArray, isString, length} from '../src/object';
import {isTruthy} from '../src/boolean';
import {lines, unlines, words, unwords, lcaseFirst, ucaseFirst, camelCase, classCase} from '../src/string';
import Functor from '../src/data/Functor';

import {
    append, all, and, or, any, find, findIndex, findIndices,
    zip, zipN, zipWith, unzip, unzipN,
    map, mapAccumL, mapAccumR,
    elem, notElem, elemIndex, elemIndices,
    head, last, init, tail, uncons,
    reverse, intersperse, intercalate, transpose, subsequences, permutations,
    // iterate, repeat, replicate, cycle,
    take, drop, splitAt, foldl, foldl1, foldr, foldr1, unfoldr,
    concat, concatMap, takeWhile, dropWhile, dropWhileEnd, partition,
    at, span, breakOnList, stripPrefix, group, inits, tails,
    isPrefixOf, isSuffixOf, isInfixOf, isSubsequenceOf,
    forEach,
    filter, sum, product, maximum, minimum, nub, remove, insert, insertBy,
    nubBy, removeBy, removeFirstsBy, unionBy, sort, sortOn, sortBy,
    complement, difference, union, intersect, intersectBy, groupBy,
    scanl, scanl1, scanr, scanr1, range
} from '../src/list';

import {
    __,
    expectEqual,
    expectError,
    expectLength,
    expectTrue,
    expectFalse,
    expectFunction,
    alphabetArray,
    alphabetCharCodeRange,
    alphabetString,
    vowelsArray,
    vowelsString,
    isVowel,
    expectInstanceOf,
    vowelsLen,
    nonAlphaNums,
    nonAlphaNumsArray,
} from './helpers';

interface LinkedListNode {data: string, next?: LinkedListNode}

describe('#list', () => {

    const generalEqualityCheck = (a, b) => a === b,
        genericOrdering = (a, b) => {
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }
            return 0;
        },
        equal = (a, b) => a === b,
        linkedListToList = linkedList => {
            const out: LinkedListNode[] = [];
            let node = linkedList;
            while (node.next) {
                out.push({data: node.data});
                node = node.next;
            }
            return out;
        };


    describe('#init', () => {
        it('should return everything except the last item of an list and/or string', () => {
            [
                [vowelsString, vowelsString.slice(0, vowelsString.length - 1)],
                [vowelsArray, vowelsArray.slice(0, vowelsString.length - 1)],
                [[], []],
                ['', ''],
            ]
                .forEach(([given, expected]) => {
                    expectEqual(init(given), expected);
                });
        });
        it('should throw an error when no parameter is passed in', () => {
            [undefined, null, 0, {}]
                .forEach(x =>
                    expect((xs => () => init(xs))(x)).toThrow(Error)
                );
            expectError(init);
        });
    });

    describe('#uncons', () => {
        it('should return a list containing the "head" and "tail" of a given list else `undefined`.', () => {
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

    describe('#isEmpty (a.k.a. #`null`)', () => {
        it ('should return a boolean indicating whether given list is empty or not', () => {
            [[vowelsString, false],[vowelsArray, false], ['', true, [], true]]
                .forEach(([subj, expected]) => {
                    expectEqual(isEmptyList(subj), expected);
                });
        });
        it('should throw an error when receiving non list-like (doesn\'t have a `length` prop)', () => {
            [{}, null, undefined, false]
                .forEach(x => expectError((_x => () => isEmptyList(_x))(x)));
            expectError(isEmptyList);
        });
    });

    describe('#length', () => {
        it('is should return the length of any item that has a `length` property', () => {
            [
                [[], 0],
                [vowelsString, vowelsString.length],
                [vowelsArray, vowelsArray.length],
                [(a, b, c) => a + b + c, 3],
                [function (a, b, c) { return a + b + c; }, 3],
                [{}, undefined],
                [0, undefined],
                [false, undefined]
            ]
                .forEach(([item, expected]) =>
                    expectEqual(length(item), expected)
                );
        });
        it('should throw an error when `undefined` or `null` is passed in', () => {
            expectError(length);
            expectError(() => length(undefined));
            expectError(() => length(null));
        });
    });

    describe('#map', () => {
        const addCharA = char => char + 'a';
        it('should be able to map a function over a list.', () => {
            const vowelsObj = vowelsArray.reduce((agg, x, ind) => {
                    agg[ind] = x;
                    return agg;
                }, {}),
                augmentedVowelsObj = vowelsArray.reduce((agg, x, ind) => {
                    agg[ind] = x + 'a';
                    return agg;
                }, {})
            ;
            [
                [addCharA, vowelsArray, vowelsArray.map(addCharA)],
                [addCharA, vowelsString, vowelsString.split('').map(addCharA).join('')],
                [addCharA, vowelsObj, augmentedVowelsObj],
                [x => x, [], []],
                [x => x, '', ''],
                [x => x, {}, {}],
                [x => x, new Functor(undefined), new Functor(undefined)]
            ]
                .forEach(([fn, list, expected]) => {
                    expect(map(fn, list)).toEqual(expected);
                });
        });
        it('should work on custom functors', () => {
            const
                newSomeFunctor = x => new Functor(x),
                rslt = map(addCharA, newSomeFunctor('a')),
                expectedFunctor = newSomeFunctor(addCharA('a'))
            ;
            expectInstanceOf(Functor, rslt);
            expectEqual(rslt.value, expectedFunctor.valueOf());
        });
        it('should throw an error when incoming value is not a functor instance', () => {
            expectError(() => map(x => x, null));
            expectError(() => map(x => x, undefined)); // curried so requires second parameter (even if undefined).
        });
    });

    describe('#reverse', () => {
        it('should reverse a list passed in.', () => {
            expectEqual(reverse(vowelsString), vowelsString.split('').reverse().join(''));
            expectEqual(reverse(vowelsArray), vowelsArray.slice(0).reverse());
        });
        it('should return an empty list when receiving an empty list', () => {
            expectEqual(reverse([]), []);
            expectEqual(reverse(''), '');
        });
        it('should throw an error when receiving no value', () => {
            expectError(reverse);
            expectError(() => reverse(undefined));
            expectError(() => reverse(null));
        });
    });

    describe('#intersperse', () => {
        it('should be able to inject a list (string or array) in-between the items of a list of the same type.', () => {
            expectEqual(intersperse(',', alphabetString), alphabetArray.join(','));
            expectEqual(intersperse(',', alphabetArray), alphabetArray.join(',').split(''));
        });
        it('should return a list with the same item when the list has a length of `1`', () => {
            expectEqual(intersperse(', ', ['a']), ['a']);
            expectEqual(intersperse(', ', 'a'), 'a');
        });
        it('should return an empty list when receiving an empty list', () => {
            expectEqual(intersperse('', []), []);
            expectEqual(intersperse('', ''), '');
        });
    });

    describe('#intercalate', () => {
        it('should intercalate a list within another list and then perform concat on the result', () => {
            const result1 = intercalate(', ', alphabetArray);
            expectEqual(result1, alphabetArray.join(', '));
        });
        it('should return a list with the same item when the list has a length of `1`', () => {
            expect(intercalate(', ', [['a']])).toEqual(['a']); // Ensure list is flattened one level
        });
        it('should return an empty list when receiving an empty list', () => {
            expectEqual(intercalate('', []), []);
            expectEqual(intercalate('', [[]]), []); // Ensures list is flattened one level
        });
    });

    describe('#transpose', () => {
        it('should transpose a list of lists into a rotated list of lists (from columns and rows to rows and' +
            ' columns and vice versa).', () => {
            // [subj, expected]
            // @todo add test cases for strings
            [
                [
                    [[1, 2, 3], [4, 5, 6]],
                    [[1, 4], [2, 5], [3, 6]]
                ],
                [
                    [[10, 11], [20], [], [30, 31, 32]],
                    [[10, 20, 30], [11, 31], [32]]
                ],
                [
                    [[], [], []], []
                ],
                [
                    [], []
                ]
            ]
                .forEach(([subj, expected]) => {
                    const result = transpose(subj);
                    expectEqual(result, expected);

                    // Ensure empty lists are not generated in `result`
                    if (result.length) {
                        expectTrue(result.every(xs => xs.length > 0));
                    }
                });
        });
    });

    describe('#subsequences', () => {
        it('should return all sub-sequences of a sequence', () => {
            const candidates = ['abc', 'abc'.split('')],
                results = candidates.map(subsequences),
                expectedLen = Math.pow(2, candidates[0].length);

            // Check expected result lengths
            expectTrue(results.every(result => result.length === expectedLen));

            // Ensure generated subsequences are unique in their sets
            expectTrue(results.every(result =>
                    !result.filter((subSeq, ind) =>
                        result.indexOf(subSeq) !== ind ||
                        result.lastIndexOf(subSeq) !== ind
                    ).length
                )
            );
            // @see quick reference on subsequence algorithms
            // https://discuss.codechef.com/questions/17235/print-all-possible-subsequences-of-string-using-dynamic-programming
        });
        it('should return a list with an empty list when receiving an empty list', () => {
            expectEqual(subsequences([]), [[]]);
            expectEqual(subsequences(''), [[]]);
        });
    });

    describe('#permutations', () => {
        const areAllPermutesUnique = permutes => {
                const xs = permutes,
                    limit = xs.length;
                for (let i = 0; i < limit; i += 1) {
                    let str = xs[i].join('');
                    for (let j = 0; j < limit; j += 1) {
                        if (j !== i && xs[j].join('') === str) {
                            return false;
                        }
                    }
                }
                return true;
            },

            howManyPermutes = n => {
                if (n <= 0) {
                    return 0;
                }
                let lastPermutes = 1,
                    i = 1;
                while (i <= n) {
                    lastPermutes = i * lastPermutes;
                    i += 1;
                }
                return lastPermutes;
            };

        it('Should return unique permutations for a given set of items', () => {
            const lists: string[] =
                'abcd'.split('').reduceRight((agg, item, ind, list) =>
                        agg.concat([list.slice(ind)]),
                    (<any[]>[])
                ); // I know laziness lol
            expectLength(4, lists);
            expectTrue(lists.every(
                (xs, ind) => xs.length === ind + 1
            ));
            expectTrue(
                lists.every(xs => {
                    const result = permutations(xs);
                    return areAllPermutesUnique(result) &&
                        howManyPermutes(xs.length) === result.length;
                })
            );
        });
    });

    describe('#foldl', () => {
        it('should fold a `Foldable` (list, etc.) into some value', () => {
            const phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = ind => parseInt(ind, 10) !== phraseIndCount ? '|' : '',
                expectedTransform = phrase.split('').map((x, ind) => x + getAppendage(ind));
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
            expectEqual(
                foldl((agg, item, ind) => {
                    agg.push(item + getAppendage(ind));
                    return agg;
                }, [], phrase.split('')),
                expectedTransform
            );
        });

        it('should return the zero value when an empty list is passed in', () => {
            expectEqual(foldl((agg, item) => agg + item, 'a', ''), 'a');
            expectEqual(foldl((agg, item) => agg + item, [], []), []);
        });

        it('should throw an error when `null` or `undefined` are passed in as the list', () => {
            expectError(() => foldl((agg, item) => agg + item, 'a', null));
            expectError(() => foldl((agg, item) => agg + item, 'a', undefined));
        });
    });

    describe('#foldl1', () => {
        it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', () => {
            const phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = ind => parseInt(ind, 10) < phraseIndCount ? '|' : '',
                expectedTransform = phrase.split('').map((x, ind) => x + getAppendage(ind));
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
            expectEqual(
                foldl1((agg, item, ind) => {
                    agg += getAppendage(ind) + item;
                    return agg;
                }, phrase.split('')),
                expectedTransform.join('')
            );
        });
        it('should return the zero value when an empty list is passed in', () => {
            expectEqual(foldl1((agg, item) => agg + item, []), []);
        });
    });

    describe('#foldr', () => {
        it('should fold a `Foldable` (list, etc.) into some value', () => {
            const vowelsStringIndCount = vowelsLen - 1,
                getAppendage = ind => parseInt(ind, 10) !== vowelsStringIndCount ? '|' : '',
                expectedTransform = reverse(vowelsArray.map((x, ind) => x + getAppendage(ind)));
            expectEqual(
                foldr((agg, item, ind) => {
                    agg += item + getAppendage(ind);
                    return agg;
                }, '', vowelsString),
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
            expectEqual(
                foldr((agg, item, ind) => {
                    agg.push(item + getAppendage(ind));
                    return agg;
                }, [], vowelsArray),
                expectedTransform
            );
        });
        it('should return the zero value when an empty list is passed in', () => {
            expectEqual(foldr((agg, item) => agg + item, 'a', ''), 'a');
            expectEqual(foldr((agg, item) => agg + item, [], []), []);
        });
        it('should throw an error when `null` or `undefined` are passed in as the list', () => {
            expectError(() => foldr((agg, item) => agg + item, 'a', null));
            expectError(() => foldr((agg, item) => agg + item, 'a', undefined));
        });
    });

    describe('#foldr1', () => {
        it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', () => {
            const vowelsStringIndCount = vowelsLen - 1,
                getAppendage = ind => parseInt(ind, 10) !== vowelsStringIndCount ? '|' : '',
                expectedTransform = reverse(vowelsArray.map((x, ind) => x + getAppendage(ind)));
            expectEqual(
                foldr1((agg, item, ind) => {
                    agg += item + getAppendage(ind);
                    return agg;
                }, vowelsString),
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
            expectEqual(
                foldr1((agg, item, ind) => (
                        agg.push(item + getAppendage(ind)),
                        agg
                    ), vowelsArray.concat((<any[]>[[]]))
                ),
                expectedTransform
            );
        });
        it('should return the zero value when an empty list is passed in', () => {
            expectEqual(foldr1((agg, item) => agg + item, []), []);
        });
    });

    describe('#concat', () => {
        it('should concatenate a list of lists into a list.', () => {
            const
                arg1 = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
                arg2 = ['abc', 'def', 'ghi'],
                arg3 = [vowelsArray, vowelsArray, vowelsArray];
            [
                [[], []],
                [[[], [], []], []],
                [arg1, [].concat.apply([], arg1)],
                [arg2, ''.concat.apply('', arg2)],
                [arg3, [].concat.apply([], arg3)]
            ]
                .forEach(([arg, expected]) => {
                    expectEqual(concat(arg), expected);
                });
        });
        it('should throw an error when receiving nothing', () => {
            expectError(concat);
            expectError(() => concat(null));
            expectError(() => concat(undefined));
        });
    });

    describe('#concatMap', () => {
        const id = x => x;
        it('should map a function on a list and concatenate lists in resulting list into a list.', () => {
            const charCodeToCharOp = charCode => String.fromCharCode(charCode),
                charCodeRange = alphabetCharCodeRange;
            // @investigate is babel shimming String.fromCharCode;
            //  When passing this function direct to `[].map` it returns a weird result (seems like it's returning
            //  an instance of `String` using `new` and it's constructor)?
            expectEqual(concatMap(charCodeToCharOp, charCodeRange), alphabetString);
            expectEqual(concatMap(charCode => [String.fromCharCode(charCode)], charCodeRange), alphabetArray);
        });
        it('should return an empty list when receiving an empty list or a list of empty lists', () => {
            expectEqual(concatMap(id, []), []);
            expectEqual(concatMap(id, [[], [], []]), []);
        });
        it('should throw an error when receiving `undefined` or `null` in it\'s list position', () => {
            expectError(() => concatMap(id, null));
            expectError(() => concatMap(id, undefined));
        });
    });

    describe('#and', () => {
        it('should return `true` when all items of a container are "truthy".', () => {
            expectTrue(and(['a', 1, 99, true, (() => null), {}, []]));
        });
        it('should return `false` when not all items of a container are "truthy".', () => {
            expectFalse(and(['a', 1, 0, true, (() => null), {}, []]));
        });
        it('should return `false` when receiving an empty list or nothing.', () => {
            expectFalse(and(''));
            expectFalse(and([]));
            expectFalse(and(['']));
            expectFalse(and([null]));
            expectFalse(and([undefined]));
            expectFalse(and([false]));
        });
        it('should an error when receiving nothing', () => {
            expectError(() => and(undefined));
            expectError(() => and(null));
        });
    });

    describe('#or', () => {
        it('should return `true` when, at least, one of the items is "truthy".', () => {
            expectTrue(or([0, false, null, 1, undefined]));
        });
        it('should return `false` when all of the items are "falsy".', () => {
            expectFalse(or([0, false, null, undefined, '']));
        });
        it('should return `false` when an empty list is received.', () => {
            expectFalse(or([]));
        });
        it('should throw an error when receiving nothing (`null` or `undefined`).', () => {
            expectError(() => or(null));
            expectError(() => or(undefined));
        });
    });

    describe('#any', () => {
        const id = x => x;
        it('should return `true` when any item matches predicate.', () => {
            expectTrue(any(isTruthy, [0, false, null, 1, undefined]));
            expectTrue(any(isTruthy, ['hello']));
            expectTrue(any(x => x === 'e', 'hello'));
        });
        it('should return `false` when no item in received items matches predicate.', () => {
            expectFalse(any(isTruthy, [0, false, null, undefined, '']));
            expectFalse(any(isTruthy, [0]));
            expectFalse(any(x => x === 'e', 'avalon'));
        });
        it('should return `false` when an empty list is received.', () => {
            expectFalse(any(id, []));
            expectFalse(any(id, ''));
        });
        it('should throw an error when receiving nothing (`null` or `undefined`).', () => {
            expectError(() => any(id, null));
            expectError(() => any(id, undefined));
        });
    });

    describe('#all', () => {
        it('should return true when predicate returns true for all items in list', () => {
            expectTrue(all(item => item, [true, true, true]));
            expectTrue(all(char => char !== 'a', 'bcdefg'));
        });
        it('should return `false` when predicate returns `false` for an item', () => {
            expectFalse(all(item => item, [true, false, true]));
            expectFalse(all(item => item !== 'a', 'bcdaefg'));
        });
        it('should return `false` when an empty list is passed in', () => {
            expectFalse(all(item => item, []));
            expectFalse(all(item => item, ''));
        });
        it('should throw an error when nothing is passed in', () => {
            expectError(() => all(item => item, null));
            expectError(() => all(item => item, undefined));
        });
    });

    describe('#sum', () => {
        it('should be able sum up any given list of numbers list of numbers', () => {
            expectEqual(sum(range(1, 5)), 15);
            expectEqual(sum(range(-5, -1)), -15);
        });
        it('should return `0` when receiving an empty list', () => {
            expectEqual(sum([]), 0);
        });
        it('should throw an error when receiving nothing (`null` or `undefined`)', () => {
            expectError(() => sum(null));
            expectError(() => sum(undefined));
            expectError(sum);
        });
    });

    describe('#product', () => {
        it('should be able return the product of a given list', () => {
            expectEqual(product(range(1, 5)), 120);
            expectEqual(product(range(-5, -1)), -120);
        });
        it('should return `0` when receiving an empty list', () => {
            expectEqual(product([]), 1);
        });
        it('should throw an error when receiving nothing (`null` or `undefined`)', () => {
            expectError(() => product(null));
            expectError(() => product(undefined));
        });
    });

    describe('#maximum', () => {
        it('should be able return the maximum of a given list', () => {
            expectEqual(maximum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 5);
            expectEqual(maximum(range(-5, -1).concat([-3, -5, -7])), -1);
        });
        it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', () => {
            expectError(() => maximum(null));
            expectError(() => maximum(undefined));
            // expectEqual(minimum([]), Infinity);
            expectError(maximum);
        });
    });

    describe('#minimum', () => {
        it('should be able return the minimum of a given list', () => {
            expectEqual(minimum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 1);
            expectEqual(minimum(range(-5, -1).concat([-3, -5, -7])), -7);
        });
        it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', () => {
            expectError(() => minimum(null));
            expectError(() => minimum(undefined));
        });
    });

    describe('#mapAccumL', () => {
        it('should map a function/operation on every item of a list and it should return a tuple containing the ' +
            'accumulated value and the an instance of passed in container with mapped items', () => {
            let xs1: any[] = [],
                xs2 = '',
                xs3: any[] = [];

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

            [
                // Result, list, expected accumulation
                [result0, list0, numberOp, 0],
                [result1, list1, stringOp, ''],
                [result2, list2, stringOp, []]
            ]
                .forEach(tuple => {
                    const reducedForCompare = (
                        typeof tuple[1] === 'string' ?
                            tuple[1].split('') :
                            tuple[1]
                    )
                        .reduce((agg, item, ind) => {
                            if (Array.isArray(agg)) {
                                agg.push(tuple[2](agg, item, ind));
                            }
                            else {
                                agg += tuple[2](agg, item, ind);
                            }
                            return agg;
                        }, tuple[3]);

                    // Check that mapped results have equal length
                    expectEqual(tuple[0][1].length, tuple[1].length);

                    // Check aggregated results are equal
                    expectEqual(tuple[0][0], reducedForCompare);
                });
        });
    });

    describe('#mapAccumR', () => {
        it('should map a function/operation on every item of a list and it should return a tuple containing the ' +
            'accumulated value and the an instance of passed in container with mapped items', () => {
            let xs1: any[] = [],
                xs2 = '',
                xs3: any[] = [];

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

            [
                // Result, list, expected accumulation
                [result0, list0, numberOp, 0],
                [result1, list1, stringOp, ''],
                [result2, list2, stringOp, []]
            ]
                .forEach(tuple => {
                    const reducedForCompare = (
                        typeof tuple[1] === 'string' ?
                            tuple[1].split('') :
                            tuple[1]
                    )
                        .reduceRight((agg, item, ind) => {
                            if (Array.isArray(agg)) {
                                agg.push(tuple[2](agg, item, ind));
                            }
                            else {
                                agg += tuple[2](agg, item, ind);
                            }
                            return agg;
                        },
                        tuple[3]);

                    // Check that mapped results have equal length
                    expectEqual(tuple[0][1].length, tuple[1].length);

                    // Check aggregated results are equal
                    expectEqual(tuple[0][0], reducedForCompare);
                });
        });
    });

    describe('#unfoldr', () => {
        it('should be able to unfold any value from right to left.', () => {
            expectEqual(
                unfoldr(minuend => {
                    let diff = minuend - 1;
                    return diff >= 0 ? [minuend, diff] : undefined;
                }, 10),
                range(1, 10).reverse()
            );
        });
    });

    describe('#take', () => {
        it('should return taken items from list and/or string until limit', () => {
            type TakeTest = [[number, string | any[]], string | any[]];
            type TakeTestCases = Array<TakeTest>;
            (<TakeTestCases>[
                [[0, ''], ''],
                [[0, []], []],
                [[1, ''], ''],
                [[1, []], []],
            ]).concat(
                (<TakeTestCases>vowelsArray
                    .map((_, ind) => [
                        [ind, vowelsArray],
                        vowelsArray.slice(0, ind)
                    ])),
                (<TakeTestCases>vowelsString.split('')
                    .map((_, ind) => [
                        [ind, vowelsString],
                        vowelsString.slice(0, ind)
                    ]))
            )
                .forEach(([args, expected]) => {
                    expectEqual(take(...args), expected);
                });
        });
        it('should throw an error when no parameter is passed in', () => {
            [null, undefined, 0, {}].forEach(x =>
                expectError(() => take(3, x))
            );
        });
    });

    describe('#drop', () => {
        it('should return a new list/string with dropped items from original until limit', () => {
            type DropTest = [[number, string | any[]], string | any[]];
            type DropTestCases = Array<DropTest>;
            (<Array<[[number, string | any[]], string | any[]]>>[
                [[0, ''], ''],
                [[0, []], []],
                [[1, ''], ''],
                [[1, []], []],
            ]).concat(
                (<DropTestCases>vowelsArray
                    .map((_, ind) => [
                        [ind, vowelsArray],
                        vowelsArray.slice(ind)
                    ])),
                (<DropTestCases>vowelsString.split('')
                    .map((_, ind) => [
                        [ind, vowelsString],
                        vowelsString.slice(ind)
                    ]))
            )
                .forEach(([args, expected]) => {
                    expectEqual(drop(...args), expected);
                });
        });
        it('should throw an error when no parameter is passed in', () => {
            [null, undefined, 0, {}].forEach(x =>
                expectError(() => drop(3, x))
            );
        });
    });

    describe('#splitAt', () => {
        it('should split an list and/or string at given index', () => {
            (<Array<[[number, string | any[]], [string | any[], string | any[]]]>>[
                [[0, []], [[], []]],
                [[0, ''], ['', '']],
                [[1, []], [[], []]],
                [[1, ''], ['', '']]
            ]).concat(
                (<[[number, string | any[]], [string | any[], string | any[]]]>vowelsArray
                    .map((_, ind) => [
                        [ind, vowelsArray],
                        [vowelsArray.slice(0, ind),
                            vowelsArray.slice(ind)]
                    ])),
                (<[[number, string | any[]], [string | any[], string | any[]]]>vowelsString.split('')
                    .map((_, ind) => [
                        [ind, vowelsString],
                        [vowelsString.slice(0, ind),
                            vowelsString.slice(ind)]
                    ]))
            )
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

    describe('#takeWhile', () => {
        it('should take elements while predicate is fulfilled and vice-versa', () => {
            [
                [[isVowel, vowelsString], vowelsString],
                [[isVowel, vowelsArray], vowelsArray],
                [[isVowel, alphabetString], 'a'],
                [[isVowel, alphabetArray], ['a']],
                [[isVowel, range(0, 5)], []],
                [[isVowel, nonAlphaNums], ''],
                [[isVowel, nonAlphaNumsArray], []],
                [[isVowel, ''], ''],
                [[isVowel, []], []],
            ]
                .forEach(([args, expected]) => {
                    expectEqual(takeWhile(args[0], args[1]), expected);
                });
        });
        // @todo add failing case(s) here
    });

    describe('#dropWhile', () => {
        it('should drop elements while predicate is fulfilled and vice-versa', () => {
            const alnumRegex = /^[a-z]$/i,
                alnumPred = x => alnumRegex.test(x),
                nonAlnumPred = x => !alnumPred(x),
                getCharCodeLessThan = lessThanCharCode => x => (x + '').charCodeAt(0) < lessThanCharCode
            ;
            [
                [vowelsArray, alnumPred, []],
                [vowelsString, alnumPred, ''],
                [vowelsArray, nonAlnumPred, vowelsArray],
                [vowelsString, nonAlnumPred, vowelsString],
            ]
                .concat(
                    vowelsArray.map((c, ind) =>
                        [vowelsArray, getCharCodeLessThan(c.charCodeAt(0)), vowelsArray.slice(ind)]
                    ),
                    vowelsString.split('').map((c, ind) =>
                        [vowelsString, getCharCodeLessThan(c.charCodeAt(0)), vowelsString.slice(ind)]
                    )
                )
                .forEach(([subj, pred, expected]) => {
                    const result = dropWhile(pred, subj);
                    expectEqual(result, expected);
                });
        });
    });

    describe('#dropWhileEnd', () => {
        it('should drop elements while predicate is fulfilled', () => {
            const alnumRegex = /^[a-z]$/i,
                alnumPred = x => alnumRegex.test(x),
                nonAlnumPred = x => !alnumPred(x),
                getCharCodeGreaterThan = greaterThanCharCode => x => x.charCodeAt(0) > greaterThanCharCode,
                nonAlnumsAndVowelsArray = nonAlphaNumsArray.concat(vowelsArray),
                nonAlnumsAndVowels = nonAlnumsAndVowelsArray.join(''),
                vowelsAndNonAlnumsArray = vowelsArray.concat(nonAlphaNumsArray),
                vowelsAndNonAlnums = vowelsAndNonAlnumsArray.slice(0).join('')
            ;
            [
                [[x => x, []], []],
                [[x => x, ''], ''],
                [[alnumPred, vowelsArray], []],
                [[alnumPred, vowelsString], ''],
                [[nonAlnumPred, vowelsArray], vowelsArray],
                [[nonAlnumPred, vowelsString], vowelsString],
                [[nonAlnumPred, nonAlnumsAndVowels], nonAlnumsAndVowels],
                [[nonAlnumPred, nonAlnumsAndVowelsArray], nonAlnumsAndVowelsArray],
                [[nonAlnumPred, vowelsAndNonAlnumsArray], vowelsArray],
                [[nonAlnumPred, vowelsAndNonAlnums], vowelsString],
            ]
                .concat(
                    vowelsArray.map((c, ind) =>
                        [[getCharCodeGreaterThan(c.charCodeAt(0)), vowelsArray], vowelsArray.slice(0, ind + 1)]
                    ),
                    vowelsString.split('').map((c, ind) =>
                        [[getCharCodeGreaterThan(c.charCodeAt(0)), vowelsString], vowelsString.slice(0, ind + 1)]
                    )
                )
                .forEach(([args, expected]) => {
                    const result = dropWhileEnd(args[0], args[1]);
                    expectEqual(result, expected);
                });
        });
    });

    describe('#span', () => {
        it('should give the span of elements matching predicate and elements not matching predicate.', () => {
            [
                [[isVowel, ''], ['', '']],
                [[isVowel, []], [[], []]],
                [[isVowel, nonAlphaNums], ['', nonAlphaNums]],
                [[isVowel, nonAlphaNumsArray], [[], nonAlphaNumsArray]],
                [[x => !isVowel(x), nonAlphaNums], [nonAlphaNums, '']],
                [[x => !isVowel(x), nonAlphaNumsArray], [nonAlphaNumsArray, []]],
                [[isVowel, alphabetString], ['a', alphabetString.slice(1)]],
                [[isVowel, alphabetArray], [['a'], alphabetArray.slice(1)]],
            ].forEach(([args, expected]) => {
                expectEqual(span(...args), expected);
            });
        });
    });

    describe('#breakOnList', () => {
        it('should take elements into first list while !predicate is fulfilled and elements ' +
            'that didn\'t match into second list', () => {
            const notIsVowel = x => !isVowel(x);
            [
                [[isVowel, ''], ['', '']],
                [[isVowel, []], [[], []]],
                [[isVowel, nonAlphaNums], [nonAlphaNums, '']],
                [[isVowel, nonAlphaNumsArray], [nonAlphaNumsArray, []]],
                [[notIsVowel, nonAlphaNums], ['', nonAlphaNums]],
                [[notIsVowel, nonAlphaNumsArray], [[], nonAlphaNumsArray]],
                [[isVowel, alphabetString], [alphabetString.slice(1), 'a']],
                [[isVowel, alphabetArray], [alphabetArray.slice(1), ['a']]],
            ].forEach(([args, expected]) => {
                expectEqual(breakOnList(...args), expected);
            });
        });
    });

    describe('#stripPrefix', () => {
        it('should be able to strip a prefix from a list', () => {
            expectEqual(
                stripPrefix('abc', alphabetArray.slice(0, 10)),
                alphabetArray.slice(3, 10));

            expectEqual(
                stripPrefix('abc', alphabetString.substring(0, 10)),
                alphabetString.substring(3, 10));
        });
        it('should return a copy of the passed in list when prefix is not found', () => {
            expectEqual(stripPrefix('!*&', alphabetArray), alphabetArray);
            expectEqual(stripPrefix('!*&', alphabetString), alphabetString);
            expectEqual(stripPrefix('!*&', ''), '');
            expectEqual(stripPrefix('!*&', []), []);
        });
        it('should throw an error when receiving nothing in either position', () => {
            expectError(() => stripPrefix(null, 'abc'));
            expectError(() => stripPrefix(null, null));
            expectError(() => stripPrefix('abc', null));
        });
    });

    describe('#group', () => {
        it('should return a list of lists which contain the (sequential) matches', () => {
            const expectedResultFlattened = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];
            expectEqual(group('Mississippi'), expectedResultFlattened.map(xs => xs.join('')));
            expectEqual(group('Mississippi'.split('')), expectedResultFlattened);
        });
        it('should return a list of lists containing individual ungrouped items', () => {
            expectEqual(group(alphabetArray), alphabetArray.map(char => [char]));
        });
    });

    describe('#inits', () => {
        it('should unfold a list into list of all possible ' +
            'non-omitting sequential sets that start with initial item', () => {
            expectTrue(all(
                (item, ind) => length(item) === ind,
                inits(alphabetString)
            ));
            expectTrue(all(
                (item, ind) => length(item) === ind,
                inits(alphabetArray)
            ));
        });
    });

    describe('#tails', () => {
        it('should unfold a list into list of all possible ' +
            'non-omitting sequential sets that start with the last item', () => {
            const limit = length(alphabetString);
            expectTrue(all(
                (item, ind) => {
                    const headOfLast = head(item);
                    return length(item) ? length(item) === limit - ind &&
                        headOfLast === alphabetString[ind] : true;
                },
                tails(alphabetString)
            ));
            expectTrue(all(
                (item, ind) => {
                    const headOfLast = head(item);
                    return length(item) ? length(item) === limit - ind &&
                        headOfLast === alphabetArray[ind] : true;
                },
                tails(alphabetArray)
            ));
        });
    });

    describe('#isPrefixOf', () => {
        it('should return `true` when a list is a prefix of another', () => {
            expectTrue(all(
                isPrefixOf('abc'),
                splitAt(3, inits(alphabetString))[1]
            ));
            expectTrue(all(
                isPrefixOf('abc'.split('')),
                splitAt(3, inits(alphabetArray))[1]
            ));
        });
        it('should return `false` when a list is not prefix of second list', () => {
            expectTrue(all(
                negateF2(isPrefixOf('!@#')),
                splitAt(3, inits(alphabetString))[1]
            ));
            expectTrue(all(
                negateF2(isPrefixOf('!@#'.split(''))),
                splitAt(3, inits(alphabetArray))[1]
            ));
        });
    });

    describe('#isSuffixOf', () => {
        it('should return `true` when a list is a suffix of another', () => {
            const candidateString = splitAt(length(alphabetString) - 2, tails(alphabetString))[0];
            expectTrue(all(
                isSuffixOf('xyz'),
                candidateString
            ));
            expectTrue(all(
                isSuffixOf('xyz'.split('')),
                splitAt(length(alphabetArray) - 2, tails(alphabetArray))[0]
            ));
        });
        it('should return `false` when a list is not suffix of second list', () => {
            expectTrue(all(
                negateF2(isSuffixOf('!@#')),
                splitAt(length(alphabetString) - 2, tails(alphabetString))[0]
            ));
            expectTrue(all(
                negateF2(isSuffixOf('!@#'.split(''))),
                splitAt(length(alphabetString) - 2, tails(alphabetArray))[0]
            ));
        });
    });

    describe('#isInfixOf', () => {
        it('should return `true` when a list is infixed with another', () => {
            const results = concatMap(candidate => [
                isInfixOf(candidate, alphabetString),
                isInfixOf(candidate, alphabetArray)
            ], ['abc', 'efg', 'xyz']);
            expectTrue(and(results));
        });
        it('should return `false` when a list is not infix of second list', () => {
            expectTrue(and([
                negateF2(isInfixOf('!@#'))(alphabetString),
                negateF2(isInfixOf('!@#'.split(''))(alphabetArray))
            ]));
        });
    });

    describe('#isSubsequenceOf', () => {
        it('should return true a list is sub-sequence of another.', () => {
            const listToSearchIn = take(6, alphabetString);
            expectTrue(all(
                listToSearchFor => isSubsequenceOf(listToSearchFor, listToSearchIn),
                ['bdf', 'ace', 'abc', 'def']
            ));
        });
        it('should return false a list is not sub-sequence of another.', () => {
            const listToSearchIn = take(6, drop(6, alphabetString));
            expectTrue(all(
                listToSearchFor => !isSubsequenceOf(listToSearchFor, listToSearchIn),
                ['bdf', 'ace', 'abc', 'def']
            ));
        });
    });

    describe('#elem', () => {
        it('should return `true` when the element is found in given list', () => {
            const word = 'hello world';
            expectTrue(
                all(() => all((elm2, ind2, arr) => !!elem(elm2, arr), word), [word.split(''), word]));
        });
        it('should return `false` when element is not found in given list', () => {
            const word = 'hello world';
            expectTrue(
                all(elm =>
                        all((elm2, ind2, arr) => !elem('z', arr), elm),
                    [word.split(''), word]));
        });
    });

    describe('#notElem', () => {
        it('should return `false` when the element is found in given list', () => {
            const word = 'hello world';
            expectTrue(
                all(() => all((elm2, ind2, arr) => !notElem(elm2, arr), word),
                    [word.split(''), word]));
        });
        it('should return `true` when element is not found in given list', () => {
            const word = 'hello world';
            expect(
                all(elm =>
                        all(
                            (elm2, ind2, arr) => notElem('z', arr), elm
                        ),
                    [word.split(''), word]
                )
            )
                .toEqual(true);
        });
    });

    describe('#find', () => {
        it('should should find element that matches predicate when element is in given list', () => {
            const word = 'word',
                pred = x => x === 'o';
            expectEqual(find(pred, word), 'o');
            expectEqual(find(pred, word.split('')), 'o');
        });
        it('should return `undefined` when predicate doesn\'t match any elements.', () => {
            const word = 'word',
                pred = x => x === 'a';
            expectEqual(find(pred, word), undefined);
            expectEqual(find(pred, word.split('')), undefined);
        });
    });

    describe('#filter', () => {
        it('should be able to filter a list by a predicate.', () => {
            const pred = (_, ind) => ind % 2 === 0;
            expectEqual(
                filter(pred, alphabetString),
                alphabetString.split('').filter(pred)
            );
            expectEqual(
                filter(pred, alphabetArray),
                alphabetString.split('').filter(pred)
            );
        });
        it('should return an empty list when no items match predicate', () => {
            const pred = char => char === '#';
            expectEqual(filter(pred, alphabetArray), []);
        });
    });

    describe('#partition', () => {
        it('should take elements into first list while predicate is fulfilled and elements ' +
            'that didn\'t match into second list', () => {
            const word = 'abcdefg',
                expectedResults = ['abcdfg', 'e'],
                predicate = x => x !== 'e';

            // Expect matched length and matched elements
            expectTrue(
                // Ensure cases for each use case
                all(tuple =>
                    length(expectedResults) === length(tuple) &&
                    all((tuplePart, ind) =>
                            // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all((x, ind2) => x === expectedResults[ind][ind2], tuplePart),
                        tuple),
                    // Use cases (one with string other with list)
                    [partition(predicate, word.split('')), partition(predicate, word)]
                ));
        });
        it('should return an list of empty arrays and/or strings when an empty list is passed in', () => {
            expectTrue(
                all(tuple =>
                    length(tuple) === 2 &&
                    all(tuplePart => (isString(tuplePart) || isArray(tuplePart)) &&
                        length(tuplePart) === 0, tuple),
                    [partition(a => a, ''), partition(x => x, [])]
                ));
        });
    });

    describe('#at', () => {
        it('should return an item at a given key/index.', () => {
            [alphabetString, alphabetArray].forEach(subject => {
                const subjectLastInd = length(subject) - 1;
                expectEqual(at(0, subject), subject[0]);
                expectEqual(at(5, subject), subject[5]);
                expectEqual(at(subjectLastInd, subject), subject[subjectLastInd]);
            });
        });
        it('should return `undefined` when list has no length.', () => {
            expectEqual(at(0, ''), undefined);
            expectEqual(at(0, []), undefined);
        });
    });

    describe('#elemIndex', () => {
        it('should return the index where the element is found', () => {
            const word = 'hello world';
            expectTrue(
                all(elm =>
                        all((elm2, ind2, arr) => elemIndex(elm2, arr) === word.indexOf(elm2), elm),
                    [word.split(''), word]));
        });
        it('should return `undefined` when element is not in list', () => {
            const word = 'hello world';
            expectTrue(
                all(elm =>
                        all((elm2, ind2, arr) => elemIndex('z', arr) === undefined, elm),
                    [word.split(''), word]));
        });
    });

    describe('#elemIndices', () => {
        it('should return all found element indices in a list', () => {
            [
                [vowelsString, 'i', [2]],
                [alphabetArray, 'b', [1]],
                [
                    alphabetArray.concat(alphabetArray, alphabetArray, alphabetArray), 'b', [1, 27, 53, 79]
                ],
            ]
                .forEach(([subj, search, expected]) => {
                    const result = elemIndices(search, subj);
                    expectEqual(result, expected);
                });
        });
        it('should return `undefined` when element is not found in list', () => {
            expectEqual(elemIndices(99, range(0, 10)), undefined);
        });
        it('should throw an error when second arg is not a list.', () => {
            [undefined, null, {}].forEach(x => expectError(() => elemIndices(99, x)));
        });
    });

    describe('#findIndex', () => {
        const word = 'abcdefg';
        it('should find an index where predicate is satisfied', () => {
            expectTrue(
                word.split('')
                    .every((char, ind, arr) =>
                        findIndex((x, ind2) => ind === ind2 && x === word[ind], arr) === ind));
        });
        it('should return `-1` when item is not found in populated list', () => {
            const nonAlphaList = '!@#$%^&*()_+'.split(''),
                vowels = 'aeiou'.split('');
            vowels.forEach(char => {
                const result = findIndex(x => x === char, nonAlphaList);
                expect(result).toEqual(-1);
            });
        });
    });

    describe('#findIndices', () => {
        it('should return indices for all items that match passed in predicate', () => {
            const tokenInits = inits(intersperse('e', alphabetArray)),
                indicePred = (x: string) => x === 'e',
                expectedResults = tokenInits.map(xs =>
                    xs.map((x, ind) => [ind, x])
                        .filter(([ind, x]) => indicePred(x))
                )
                    .map(xs => !xs.length ? undefined : xs.map(([x]) => x)),
                results = map(xs => findIndices(indicePred, xs), tokenInits);

            expectTrue(
                results.every((xs, ind) => {
                    const expected = expectedResults[ind];
                    return xs === expected || ( // match undefined
                        xs.every((x, ind2) => x === expected[ind2]) &&
                        xs.length === expected.length
                    );
                })
            );
        });

        it('should return `undefined` when doesn\'t find element at indice', () => {
            [undefined, null, {}].forEach(x => expectError(() => findIndices(99, x)));
        });
    });

    describe('#zip', () => {
        it('should be able to zip two lists into a list of tuples (list of two items).', () => {
            const [list1, list2] = splitAt(length(alphabetArray) / 2, alphabetArray),
                result = zip(list1, list2),
                expectedResult = foldl((agg, item, ind) => {
                    agg.push([item, list2[ind]]);
                    return agg;
                }, [], list1);
            expectTrue(all(() => 13, [length(list1), length(list2)]));
            expectEqual(length(result), length(expectedResult));
            expectTrue(all((tuple, ind) => tuple[0] === expectedResult[ind][0] &&
                tuple[1] === expectedResult[ind][1]
                , result));
        });
        it('should return an empty list when empty lists are passed', () => {
            expectEqual(zip([], []), []);
        });
        it('should return a copy of the passed in populated list when one of them is not populated.', () => {
            expectEqual(zip([], alphabetArray), []);
            expectEqual(zip(alphabetArray, []), []);
        });
    });

    describe('#zipN', () => {
        it('should be able to zip the given number of lists.', () => {
            // Unfold alphabet array into an array with arrays of 5 items (as our initial subject).
            const subj = unfoldr(remainder => {
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

                subj3 = filter(length, subj),

                subj4 = filter(length, subj2),

                testCases = [subj, subj2, subj3, subj4].map(s => [zipN.apply(null, s), s])
            ;

            testCases.forEach(([results, subjects]) => {
                results.forEach((list, ind) => {
                    list.forEach((char, ind2) => {
                        expectEqual(char, subjects[ind2][ind]);
                    });
                });
            });
        });
        it('should return an empty list when empty lists are passed in', () => {
            expectEqual(zipN([], []), []);
        });
        it('should return a copy of the left or right populated list when the other(s) is/are empty.', () => {
            expectEqual(zipN([], alphabetArray), []);
            expectEqual(zipN(alphabetArray, []), []);
        });
    });

    describe('#zipWith', () => {
        const tuplize = (a, b) => [a, b];
        it('should be able to zip the given number of lists.', () => {
            // Unfold alphabet array into an array with arrays of 5 items (as our initial subject).
            const subj = unfoldr(remainder => {
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

                zipWithResult = zipWith(tuplize, ...subj),

                zipWithResult2 = zipWith(tuplize, ...subj2);

            expectTrue(
                all(tuple =>
                        all((list, ind) =>
                                all((item, ind2) =>
                                    item === tuple[1][ind2][ind], list
                                ),
                            tuple[0]
                        ),
                    [[zipWithResult, filter(length, subj)],
                        [zipWithResult2, filter(length, subj2)]]
                )
            );
        });
        it('should return an empty list when empty lists are passed', () => {
            expectEqual(zipWith(tuplize, [], []), []);
        });
        it('should return a copy of the passed in populated list when one of them is not populated.', () => {
            expectEqual(zipWith(tuplize, [], alphabetArray), []);
            expectEqual(zipWith(tuplize, alphabetArray, []), []);
        });
    });

    describe('#unzip', () => {
        it('should be able to unzip a list of tuples of two.', () => {
            const subj = unfoldr(remainder => {
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

            // Ensure resulting lists contain expected items
            expectTrue(all(
                (list, i) =>
                    all((item, j) => item === subj[j][i], list),
                result
            ));

        });
        it('should throw an error when passed in arg is `null` or `undefined`', () => {
            expect(() => unzip(undefined)).toThrow(Error);
            expect(() => unzip(null)).toThrow(Error);
        });
    });

    describe('#unzipN', () => {
        it('should be able to unzip a list of tuples of any number.', () => {
            const subj = unfoldr(remainder => {
                    return !length(remainder) ?
                        undefined : splitAt(2, remainder);
                }, alphabetArray),
                lenAlphaArray = length(alphabetArray),
                result = unzipN(subj);

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
        it('should throw an error when passed in arg is `null` or `undefined`', () => {
            expect(() => unzipN(undefined)).toThrow(Error);
            expect(() => unzipN(null)).toThrow(Error);
        });
    });

    describe('#lines', () => {
        it('should split a string on all new line characters.', () => {
            const subj = intercalate('\n', alphabetArray),
                result = lines(subj);

            // Ensure subject is valid first:
            // ------------------------------------
            // Expect new line char before every char except the first
            expectLength(length(alphabetArray) * 2 - 1, subj);

            // Check split string
            expectEqual(alphabetArray, result);
        });
        it('should return original string when no new lines are found in string', () => {
            expectEqual(lines('hello world'), ['hello world']);
            expectEqual(lines(''), ['']);
        });
        it('should throw Errors when receiving nothing', () => {
            expectError(() => lines(null));
            expectError(() => lines(undefined));
        });
    });

    describe('#words', () => {
        it('should split a string on all whitespace characters.', () => {
            // subject | expectedLength | shallowEqualsTo
            const subjectsAndExpLens = [
                [intercalate(' ', alphabetArray), length(alphabetArray), alphabetArray],
                ['hello world', 2, ['hello', 'world']]
            ];

            subjectsAndExpLens.forEach(tuple => {
                const [subj, expectedLen, shallowEqualsTo] = tuple,
                    result = words(subj);

                // Check length of result
                expectLength(expectedLen, result);

                // Check split string
                expectEqual(shallowEqualsTo, result);
            });
        });
        it('should return a copy of original list when no whitespace characters are found.', () => {
            // subject | expectedLength | shallowEqualsTo
            const subjectsAndExpLens = [
                [alphabetString, 1, [alphabetString]],
                ['helloworld', 1, ['helloworld']]
            ];

            subjectsAndExpLens.forEach(tuple => {
                const [subj, expectedLen, shallowEqualsTo] = tuple,
                    result = words(subj);

                // Check length of result
                expectLength(expectedLen, result);

                // Check split string
                expectEqual(shallowEqualsTo, result);
            });
        });
        it('should throw Errors when receiving nothing', () => {
            expectError(() => words(null));
            expectError(() => words(undefined));
        });
    });

    describe('#unlines', () => {
        it('should join a list with new lines.', () => {
            [
                [vowelsArray, vowelsArray.join('\n')],
                [vowelsString, vowelsString.split('').join('\n')],
            ]
                .forEach(([subj, expected]) => {
                    const r = unlines(subj);
                    expectEqual(r, expected);
                });
        });
        it('should return empty lists when receiving empty lists', () => {
            expectEqual(unlines([]), []);
        });
        it('should throw Errors when receiving nothing', () => {
            expectError(() => unlines(null));
            expectError(() => unlines(undefined));
        });
    });

    describe('#unwords', () => {
        it('should join a list of words with spaces.', () => {
            [
                [vowelsArray, vowelsArray.join(' ')],
                [vowelsString, vowelsString.split('').join(' ')],
            ]
                .forEach(([subj, expected]) => {
                    const r = unwords(subj);
                    expectEqual(r, expected);
                });
        });
        it('should return empty lists when receiving empty lists', () => {
            expectEqual(unwords([]), []);
        });
        it('should throw Errors when receiving nothing', () => {
            expectError(() => unwords(null));
            expectError(() => unwords(undefined));
        });
    });

    describe('#nub', () => {
        it('should remove all but first occurrences of repeat items in a list.', () => {
            expectEqual(nub('conundrum'.split('')), 'conudrm'.split(''));
            expectEqual(nub(map(char => char + char, alphabetArray).join('').split('')), alphabetArray);
        });
        it('should return a copy of the passed in list with items intact if there ' +
            'aren\'t any repeat items', () => {
            expectEqual(nub(alphabetArray), alphabetArray);
        });
        it('should return empty lists when receiving empty lists', () => {
            expectEqual(nub([]), []);
        });
        it('should throw Errors when receiving nothing', () => {
            expectError(() => nub(null));
            expectError(() => nub(undefined));
        });
    });

    describe('#remove', () => { // same as `delete` (in haskell)
        it('should remove the first occurrence of an item in a list.', () => {
            expectEqual(remove('l', 'hello world'), 'helo world');
            expectEqual(remove('l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(remove('a', alphabetString), tail(alphabetString));
            expectEqual(remove('z', alphabetString), init(alphabetString));
            expectEqual(remove('a', alphabetArray), tail(alphabetArray));
            expectEqual(remove('z', alphabetArray), init(alphabetArray));
        });
        it('should return an empty list when receiving an empty list', () => {
            expectEqual(remove('a', ''), '');
            expectEqual(remove('a', []), []);
        });
        it('should throw Errors when receiving nothing in the list position', () => {
            expectError(() => remove(null, null));
            expectError(() => remove(undefined, undefined));
            expectError(() => remove(null, null));
            expectError(() => remove(undefined, undefined));
        });
    });

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

    describe('#difference', () => {
        it('should return an empty list when first list passed in is empty, ' +
            ' there are no differences between passed in lists, ', () => {
            [
                [[[], []], []],
                [['', ''], []],
                [[null, undefined], []]
            ]
                .forEach(([args, expected]) => {
                    expectEqual(difference(...args), expected);
                });
        });
        it('should return the difference between two arrays passed in', () => {
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

    describe('#intersect', () => {
        it('should return an empty list when either of the first, second ' +
            'or both params passed in are empty arrays, or falsy values', () => {
            [
                [[[], [1, 2, 3]], []],
                [[null, null], []],
                [[undefined, undefined], []],
                [['', ''], []],
                [['abc', ''], []],
                [['abc', null], []],
                [[null, 'abc'], []]
            ]
                .forEach(([args, expected]) => {
                    expectEqual(intersect(...args), expected);
                });
        });

        it('should return an intersection of the two arrays passed in', () => {
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

    describe('#union', () => {
        const mixedMatchRange = append(range(13, 8, -1), range(1, 3));
        // ascRangeArgs = [[1, 2], [3, 5], [8, 13], [21, 24]],
        // descRangeArgs = reverse(map(tuple => append(reverse(tuple), [-1]), ascRangeArgs)),
        // [ascRanges, descRanges] =
        //     map(argsSet =>
        //         map(rangeArgs => apply(range, rangeArgs), argsSet),
        //         [ascRangeArgs, descRangeArgs]
        //     ),
        // [rl1, rl2, rl3, rl4] = ascRanges,
        // [lr1, lr2, lr3, lr4] = descRanges;
        it('should return a union on list 1 with list two', () => {
            [// subj1, subj2, expectResultLen, expectedResultElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4, 5]],
                [mixedMatchRange, range(18, 21), 13, mixedMatchRange.concat(range(18, 21))]
            ]
                .forEach(testCase => {
                    let [subj1, subj2, expectedLen, expectedElms] = testCase,
                        result = union(subj1, subj2);
                    expectEqual(result.length, expectedLen);
                    expectEqual(result, expectedElms);
                });
        });
        it('should return a copy of left-most array when right-most list is empty', () => {
            [// subj1, subj2, expectResultLen, expectedResultElements
                [range(1, 5), [], 5, range(1, 5)],
                [range(1, 8), [], 8, range(1, 8)],
                [range(1, 13), [], 13, range(1, 13)],
                [mixedMatchRange, [], 9, mixedMatchRange]
            ]
                .forEach(testCase => {
                    let [subj1, subj2, expectedLen, expectedElms] = testCase,
                        result = union(subj1, subj2);
                    expectEqual(result.length, expectedLen);
                    expectEqual(result, expectedElms);
                });
        });
        it('should return a copy of right-most list when left-most list is empty', () => {
            [// subj1, subj2, expectResultLen, expectedResultElements
                [range(1, 5), [], 5, range(1, 5)],
                [range(1, 8), [], 8, range(1, 8)],
                [range(1, 13), [], 13, range(1, 13)],
                [mixedMatchRange, [], 9, mixedMatchRange]
            ]
                .forEach(testCase => {
                    let [subj1, subj2, expectedLen, expectedElms] = testCase,
                        result = union(subj1, subj2);
                    expectEqual(result.length, expectedLen);
                    expectEqual(result, expectedElms);
                });
        });
        it('should return an empty list when receiving empty lists', () => {
            expectEqual(union('', ''), '');
            expectEqual(union([], []), []);
        });
    });

    describe('#sort', () => {
        it('should sort a list in ascending order', () => {
            expectEqual(sort(range(10, 0, -1)), range(0, 10, 1));
            expectEqual(sort(range(0, 10)), range(0, 10));
            compose(expectEqual(__, alphabetArray), sort, reverse)(alphabetArray);
            compose(/*log,*/ sort, reverse)(alphabetArray);
        });
        it('should return a copy of original list when said list is already sorted', () => {
            compose(expectEqual(__, ['a', 'b', 'c']), sort, take(3))(alphabetArray);
            compose(expectEqual(__, ['a', 'b', 'c']), sort, take(3))(alphabetArray);
            compose(expectEqual(__, alphabetArray), sort)(alphabetArray);
            compose(expectEqual(__, range(0, 10)), sort)(range(0, 10));
        });
        it('should return an empty list when receiving an empty list', () => {
            expectEqual(sort([]), []);
        });
    });

    describe('#sortOn', () => {
        const identity = x => x,
            sortOnIdentity = sortOn(identity),
            range0To10 = range(0, 10),
            range10To0 = range(10, 0, -1);
        it('should sort a list in ascending order', () => {
            expectEqual(sortOnIdentity(range10To0), range0To10);
            expectEqual(sortOnIdentity(range0To10), range0To10);
            compose(expectEqual(__, alphabetArray), sortOnIdentity, reverse)(alphabetArray);
            compose(/*log,*/ sortOnIdentity, reverse)(alphabetArray);
        });
        it('should return a copy of original list when said list is already sorted', () => {
            compose(expectEqual(__, ['a', 'b', 'c']), sortOnIdentity, take(3))(alphabetArray);
            compose(expectEqual(__, alphabetArray), sortOnIdentity)(alphabetArray);
            compose(expectEqual(__, range0To10), sortOnIdentity)(range0To10);
        });
        it('should return an empty list when receiving an empty list', () => {
            expectEqual(sortOnIdentity([]), []);
        });
    });

    describe('#insert', () => {
        const injectValueAtIndex = (x, ind, list) => {
            if (ind <= 0) {
                return [x].concat(list);
            }
            else if (ind > list.length - 1) {
                return list.concat([x]);
            }
            return list.slice(0, ind).concat([x], list.slice(ind));
        },
        indexWhere = (where, list) => {
            let i = 0;
            const limit = list.length;
            for (; i < limit; i += 1) {
                if (where(list[i], i, list)) {
                    return i;
                }
            }
            return -1;
        };
        it('Should insert a value directly before the first value that is less than or equal to it', () => {
            // expectEqual(insert(99, range(0, 144, 5))
            const range0To145By5 = range(0, 145, 5),
                range145To0By5 = range0To145By5.slice(0).reverse(),
                range0To145By5With99 = injectValueAtIndex(99,
                    indexWhere(x => x > 99, range0To145By5), range0To145By5
                ),
                range145To0By5With99Rev = injectValueAtIndex(99,
                    indexWhere(x => x > 99, range145To0By5), range145To0By5
                );
            [
                [[99, range0To145By5], range0To145By5With99],
                [[99, range145To0By5], range145To0By5With99Rev],
            ]
                .forEach(([args, expected]) => {
                    expectEqual(insert(...args), expected);
                });
        });
        it('should insert value even if passed in list is empty', () => {
            expectEqual(insert(99, []), [99]);
            expectEqual(insert('a', []), ['a']);
        });
    });

    describe('#nubBy', () => {
        it('should remove all but first occurrences of repeat items in a list.', () => {
            expectEqual(nubBy(equal, 'conundrum'.split('')), 'conudrm'.split(''));
            expectEqual(nubBy(equal, map(char => char + char, alphabetArray).join('').split('')), alphabetArray);
        });
        it('should return a copy of the passed in list with items intact if there ' +
            'aren\'t any repeat items', () => {
            expectEqual(nubBy(equal, alphabetArray), alphabetArray);
        });
        it('should return empty lists when receiving empty lists', () => {
            expectEqual(nubBy(equal, []), []);
        });
        it('should throw Errors when receiving nothing', () => {
            expectError(() => nubBy(equal, null));
            expectError(() => nubBy(equal, undefined));
        });
    });

    describe('#removeBy', () => {
        it('should remove the first occurrence of an item in a list.', () => {
            expectEqual(removeBy(equal, 'l', 'hello world'), 'helo world');
            expectEqual(removeBy(equal, 'l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(removeBy(equal, 'a', alphabetString), tail(alphabetString));
            expectEqual(removeBy(equal, 'z', alphabetString), init(alphabetString));
            expectEqual(removeBy(equal, 'a', alphabetArray), tail(alphabetArray));
            expectEqual(removeBy(equal, 'z', alphabetArray), init(alphabetArray));
        });
        it('should return an empty list when receiving an empty list', () => {
            expectEqual(removeBy(equal, 'a', ''), '');
            expectEqual(removeBy(equal, 'a', []), []);
        });
        it('should throw Errors when receiving nothing in the list position', () => {
            expectError(() => removeBy(equal, null, null));
            expectError(() => removeBy(equal, undefined, undefined));
            expectError(() => removeBy(equal, null, null));
            expectError(() => removeBy(equal, undefined, undefined));
        });
    });

    describe('#removeFirstsBy', () => {
        const
            consonants = removeFirstsBy(equal, alphabetString, vowelsString),
            consonantsArray = consonants.split('')
        ;
        it('should remove all first occurrences of items in second list matching predicate.', () => {
            // Remove from first entry on both
            const
                fiveArrays = vowelsArray.map(() => alphabetArray),
                catedArrays: string[] = [].concat(...fiveArrays),

                // Expected concated arrays
                expected = vowelsArray.reduce((agg, vowel) => {
                    // Pluck item out of array
                    // ----
                    // Split at concated array at `vowel` index
                    const parts = splitAt(agg.indexOf(vowel), agg);

                    // Put split parts back together again
                    return [].concat(parts[0], parts[1].slice(1));

                }, catedArrays),

                // Remove all first occurrences of `vowels`
                rslt = removeFirstsBy(equal, concat(fiveArrays), vowelsArray);

            // Check results
            expectEqual(rslt, expected);
        });
        it('should return copy of original list when no items from second list are found in it.', () => {
            expectEqual(removeFirstsBy(equal, consonants, vowelsString), consonants);
            expectEqual(removeFirstsBy(equal, consonantsArray, vowelsArray), consonantsArray);
        });
    });

    describe('#unionBy', () => {
        const mixedMatchRange = append(range(13, 8, -1), range(1, 3)),
            // ascRangeArgs = [[1, 2], [3, 5], [8, 13], [21, 24]],
            // descRangeArgs = reverse(map(tuple => append(reverse(tuple), [-1]), ascRangeArgs)),
            equalityCheck = (a, b) => a === b;
        // [ascRanges, descRanges] =
        //     map(argsSet =>
        //         map(rangeArgs => apply(range, rangeArgs), argsSet),
        //         [ascRangeArgs, descRangeArgs]
        //     ),
        // [rl1, rl2, rl3, rl4] = ascRanges,
        // [lr1, lr2, lr3, lr4] = descRanges;
        it('should return a union on list 1 with list two', () => {
            [// subj1, subj2, expectResultLen, expectedResultElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4, 5]],
                [mixedMatchRange, range(18, 21), 13, mixedMatchRange.concat(range(18, 21))]
            ]
                .forEach(testCase => {
                    let [subj1, subj2, expectedLen, expectedElms] = testCase,
                        result = unionBy(equalityCheck, subj1, subj2);
                    expectEqual(result.length, expectedLen);
                    expectEqual(result, expectedElms);
                });
        });
        it('should return a copy of left-most array when right-most list is empty', () => {
            [// subj1, subj2, expectResultLen, expectedResultElements
                [range(1, 5), [], 5, range(1, 5)],
                [range(1, 8), [], 8, range(1, 8)],
                [range(1, 13), [], 13, range(1, 13)],
                [mixedMatchRange, [], 9, mixedMatchRange]
            ]
                .forEach(testCase => {
                    let [subj1, subj2, expectedLen, expectedElms] = testCase,
                        result = unionBy(equalityCheck, subj1, subj2);
                    expectEqual(result.length, expectedLen);
                    expectEqual(result, expectedElms);
                });
        });
        it('should return a copy of right-most list when left-most list is empty', () => {
            [// subj1, subj2, expectResultLen, expectedResultElements
                [range(1, 5), [], 5, range(1, 5)],
                [range(1, 8), [], 8, range(1, 8)],
                [range(1, 13), [], 13, range(1, 13)],
                [mixedMatchRange, [], 9, mixedMatchRange]
            ]
                .forEach(testCase => {
                    let [subj1, subj2, expectedLen, expectedElms] = testCase,
                        result = unionBy(equalityCheck, subj1, subj2);
                    expectEqual(result.length, expectedLen);
                    expectEqual(result, expectedElms);
                });
        });
        it('should return an empty list when receiving empty lists', () => {
            expectEqual(unionBy(equalityCheck, '', ''), '');
            expectEqual(unionBy(equalityCheck, [], []), []);
        });
    });

    describe('#intersectBy', () => {
        const equality = (a, b) => a === b;
        // it ('should have more tests written');
        it('should return an empty list when receiving an empty list', () => {
            expectEqual(length(intersectBy(equality, [], [1, 2, 3])), 0);
        });
        it('should return an empty list when receiving an empty list as parameter 2', () => {
            expectEqual(length(intersectBy(equality, [1, 2, 3], [])), 0);
        });
        it('should return an empty list when both arrays passed are empty', () => {
            expectEqual(length(intersectBy(equality, [], [])), 0);
        });
        it('should return an intersection of the two arrays on equality function', () => {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 3, [1, 2, 3]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 3, [1, 2, 3]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 3, [1, 2, 3]]
            ];
            testCases.forEach(testCase => {
                let [subj1, subj2, expectedLen, expectedElms] = testCase,
                    result = intersectBy(equality, subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe('#groupBy', () => {
        it('should return a list of lists which contain the (sequential) matches on equality function', () => {
            const expectedResult = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];
            expectEqual(groupBy(generalEqualityCheck, 'Mississippi'), expectedResult.map(xs => xs.join('')));
            expectEqual(
                groupBy(generalEqualityCheck, 'Mississippi'.split('')),
                expectedResult
            );
        });
        it('should return a list of lists containing individual un-grouped items or items that do not match equality function', () => {
            expectEqual(
                groupBy(generalEqualityCheck, alphabetArray),
                alphabetArray.map(char => [char]));
        });
    });

    describe('#sortBy', () => {
        it('should sort a list by ordering function', () => {
            expectEqual(sortBy(genericOrdering, range(10, 0, -1)), range(0, 10, 1));
            expectEqual(sortBy(genericOrdering, range(0, 10)), range(0, 10));
            compose(expectEqual(__, alphabetArray),
                value => sortBy(genericOrdering, value), reverse)(alphabetArray);
            compose(/*log,*/ value => sortBy(genericOrdering, value), reverse)(alphabetArray);
        });
        it('should return a copy of original list when said list is already sorted', () => {
            compose(expectEqual(__, ['a', 'b', 'c']), xs => sortBy(genericOrdering, xs))(take(3, alphabetArray));
            compose(expectEqual(__, ['a', 'b', 'c']), xs => sortBy(genericOrdering, xs))(take(3, alphabetArray));
            compose(expectEqual(__, alphabetArray), xs => sortBy(genericOrdering, xs))(alphabetArray);
            compose(expectEqual(__, range(0, 10)), xs => sortBy(genericOrdering, xs))(range(0, 10));
        });
        it('should return an empty list when receiving an empty list', () => {
            expectEqual(sortBy(genericOrdering, []), []);
        });
    });

    describe('#insertBy', () => {
        const injectValueAtIndex = (x, ind, list) => {
                if (ind <= 0) {
                    return [x].concat(list);
                }
                else if (ind > list.length - 1) {
                    return list.concat([x]);
                }
                return list.slice(0, ind).concat([x], list.slice(ind));
            },
            genericInsert = (x, xs) => insertBy(genericOrdering, x, xs);
        it('Should insert a value before value that matches equality check', () => {
            // expectEqual(genericInsert(99, range(0, 144, 5))
            const range0To145 = range(0, 145, 5),
                expectedResult = injectValueAtIndex(99, 20, range0To145),
                result = genericInsert(99, range0To145),
                result1 = genericInsert(99, reverse(range0To145)),
                result2 = genericInsert('x', alphabetArray),
                result3 = genericInsert('x', reverse(alphabetArray));
            expectEqual(result, expectedResult);
            expectEqual(result1, [99].concat(reverse(range0To145)));
            expectEqual(result2, injectValueAtIndex('x', 24, alphabetArray));
            expectEqual(result3, ['x'].concat(reverse(alphabetArray)));
        });
        it('should insert value even if passed in list is empty', () => {
            expectEqual(genericInsert(99, []), [99]);
            expectEqual(genericInsert('a', []), ['a']);
        });
    });

    describe('#scanl', () => {
        const unlinkedNodes: Array<{data: string}> = alphabetArray.map(char => ({data: char}));

        it('should return a list of successively reduced values from left to right', () => {
            // Generate linked-list structure
            const result: LinkedListNode[] = scanl((agg, item) => {
                agg.next = item;
                item.next = null;
                return item;
            }, {data: '', next: null}, unlinkedNodes);

            // Expect every item in result to be a linked list with remaining items linked to said item
            expect(
                result.every(node => {
                    const nodesList: LinkedListNode[] = linkedListToList(node);
                    return alphabetArray.slice(alphabetArray.indexOf(node.data)).every((char, ind1) => {
                        const charCodeToTest = char.charCodeAt(0);
                        return nodesList.slice(ind1).every((data, ind2) =>
                            data.data.charCodeAt(0) - ind2 === charCodeToTest
                        );
                    });
                })
            )
                .toEqual(true);
        });

        it('should return an empty list when receiving an empty one', () => {
            expectEqual(scanl(x => x * 2, 99, []), []);
            expectEqual(scanl(x => x + 2, '99', ''), []);
        });
    });

    describe('#scanl1', () => {
        const unlinkedNodes = alphabetArray.map(char => ({data: char}));

        it('should return a list of successively reduced values from left to right', () => {
            // Generate linked-list structure
            const result = scanl1((agg, item) => {
                agg.next = item;
                item.next = null;
                return item;
            }, [{}].concat(unlinkedNodes));

            // Expect every item in result to be a linked list with remaining items linked to said item
            expect(
                result.every(node => {
                    const nodesList = linkedListToList(node);
                    return alphabetArray.slice(alphabetArray.indexOf(node.data)).every((char, ind1) => {
                        const charCodeToTest = char.charCodeAt(0);
                        return nodesList.slice(ind1).every((data, ind2) =>
                            data.data.charCodeAt(0) - ind2 === charCodeToTest
                        );
                    });
                })
            )
                .toEqual(true);
        });

        it('should return an empty list when receiving an empty one', () => {
            expectEqual(scanl1(x => x * 2, []), []);
            expectEqual(scanl1(x => x + 2, ''), []);
        });
    });

    describe('#scanr', () => {
        const unlinkedNodes = alphabetArray.map(char => ({data: char}));

        it('should return a list of successively reduced values from left to right', () => {
            // Generate linked-list structure
            const result = scanr((agg, item) => {
                agg.next = item;
                item.next = null;
                return item;
            }, {}, unlinkedNodes);

            // Expect every item in result to be a linked list with remaining items linked to said item
            expect(
                result.every(node => {
                    const nodesList = linkedListToList(node);
                    return alphabetArray.slice(0, alphabetArray.indexOf(node.data) + 1)
                        .reverse()
                        .every((char, ind1) => {
                            const charCodeToTest = char.charCodeAt(0);
                            return nodesList.slice(ind1).every((data, ind2) =>
                                data.data.charCodeAt(0) + ind2 === charCodeToTest
                            );
                        });
                })
            )
                .toEqual(true);
        });

        it('should return an empty list when receiving an empty one', () => {
            expectEqual(scanr(x => x * 2, 99, []), []);
            expectEqual(scanr(x => x + 2, '99', ''), []);
        });
    });

    describe('#scanr1', () => {
        const unlinkedNodes = alphabetArray.map(char => ({data: char}));

        it('should return a list of successively reduced values from left to right', () => {
            // Generate linked-list structure
            const result = scanr1((agg, item) => {
                agg.next = item;
                item.next = null;
                return item;
            }, [{}].concat(unlinkedNodes));

            // Expect every item in result to be a linked list with remaining items linked to said item
            expect(
                result.every(node => {
                    const nodesList = linkedListToList(node);
                    return alphabetArray
                        .slice(0, alphabetArray.indexOf(node.data) + 1)
                        .reverse()
                        .every((char, ind1) => {
                            const charCodeToTest = char.charCodeAt(0);
                            return nodesList.slice(ind1).every((data, ind2) =>
                                data.data.charCodeAt(0) + ind2 === charCodeToTest
                            );
                        });
                })
            )
                .toEqual(true);
        });

        it('should return an empty list when receiving an empty one', () => {
            expectEqual(scanr1(x => x * 2, []), []);
            expectEqual(scanr1(x => x + 2, ''), []);
        });
    });

    describe('#lcaseFirst', () => {
        it('should return passed in non-empty string with first alpha char toUpperCase', () => {
            expect(lcaseFirst('ABC')).toEqual('aBC');
        });
        it('should return given non-empty string if it cannot be operated on;  Non-alpha char at index `0` or "empty string"', () => {
            expect(lcaseFirst('$$ABC')).toEqual('$$ABC');
        });
        it('should throw an error when receiving an empty-string or any value that is not a string', () => {
            [null, undefined, [], {}]
                .forEach(xs =>
                    expectError(() => lcaseFirst(xs))
                );
        });
    });

    describe('#ucaseFirst', () => {
        it('should return passed in non-empty string with first alpha char toUpperCase', () => {
            expect(ucaseFirst('abc')).toEqual('Abc');
        });
        it('should return given non-empty string if it cannot be operated on;  Non-alpha char at index `0` or "empty string"', () => {
            expect(ucaseFirst('$$abc')).toEqual('$$abc');
        });
        it('should throw an error when receiving an empty-string or any value that is not a string', () => {
            [null, undefined, [], {}]
                .forEach(xs =>
                    expectError(() => ucaseFirst(xs))
                );
        });
    });

    describe('#camelCase', () => {
        it('should return a "camel-cased" version of passed in non-empty string', () => {
            [
                ['all-your-base', 'AllYourBase'],
                ['ALL-YOUR-BASE', 'AllYourBase'],
                ['$$abc', 'Abc']
            ]
                .forEach(([given, expected]) => {
                    expect(camelCase(given)).toEqual(expected);
                });
        });
        it('should throw an error when receiving an empty-string or any value that is not a string', () => {
            [null, undefined, [], {}]
                .forEach(xs =>
                    expectError(() => camelCase(xs))
                );
        });
    });

    describe('#classCase', () => {
        it('should return a "camel-cased" version of passed in non-empty string', () => {
            [
                ['all-your-base', 'AllYourBase'],
                ['ALL-YOUR-BASE', 'AllYourBase'],
                ['$$abc', 'Abc']
            ]
                .forEach(([given, expected]) => {
                    expect(classCase(given)).toEqual(expected);
                });
        });
        it('should throw an error when receiving an empty-string or any value that is not a string', () => {
            [null, undefined, [], {}]
                .forEach(xs =>
                    expectError(() => classCase(xs))
                );
        });
    });

    describe('#range', () => {
        const zeroToNine = '0123456789'.split('').map(x => parseInt(x, 10)),
            zeroToNegativeNine = '0,-1,-2,-3,-4,-5,-6,-7,-8,-9'
                .split(',')
                .map(x => parseInt(x, 10)),
            negativeNineToZero = reverse(zeroToNegativeNine),
            nineToZero = reverse(zeroToNine),
            checkRanges = rangeSets => rangeSets.forEach(([result, expected]) => {
                expect(result.length).toEqual(expected.length);
                expect(result).toEqual(expected);
            })
        ;

        it('should be able to return a forward range (with and without `step`)', () => {
            checkRanges([
                [range(0, 9), zeroToNine],
                [range(-9, 0), negativeNineToZero],
                [range(0, 9, 1), zeroToNine],
                [range(-9, 0, 1), negativeNineToZero]
            ]);
        });
        it('should be able to return a negative (with and without `step`', () => {
            checkRanges([
                [range(9, 0), nineToZero],
                [range(0, -9), zeroToNegativeNine],
                [range(9, 0, -1), nineToZero],
                [range(0, -9, -1), zeroToNegativeNine]
            ]);
        });
        it('should still return a valid range even when range is unreachable given `step` (step gets normalized)', () => {
            checkRanges([
                [range(9, 0, 1), nineToZero],
                [range(0, -9, 1), zeroToNegativeNine],
                [range(-9, 0, -1), negativeNineToZero]
            ]);
        });
    });

    describe('#forEach', () => {
        it('should execute passed in function for every item in passed in list (array)\n ' +
            '(all incoming params should validate also;  I.e., `(element, index, array) => ...`', () => {
            forEach((x, index, list) => {
                expect(list).toEqual(alphabetArray);
                expect(x).toEqual(alphabetArray[index]);
            }, alphabetArray);
        });
        it('should throw an error when receiving a non-function value as first param and a non-empty list', () => {
            expect(() => forEach(null, [1])).toThrow(Error);
        });
        // it('should throw an error when receiving a non-lengthable value as second param', () => {
        //     expect(() => forEach(() => undefined, null)).toThrow(Error);
        // });
    });
});
