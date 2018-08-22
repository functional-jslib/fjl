/**
 * Created by elyde on 12/29/2016.
 * @note ensure we are checking lengths in our operation results (to ensure accuracy of our tests).
 * @note ensure expected types (either explicitly or implicitly) are being returned where necessary.
 */

import {compose, negateF2} from '../src/function';
import {split} from '../src/jsPlatform';
import {isEmptyList, isArray, isString, length, peek} from '../src/object';
import {isTruthy} from '../src/boolean';
import {lines, unlines, words, unwords, lcaseFirst, ucaseFirst, camelCase, classCase}
    from '../src/string';
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
    shallowCompareOnLeft,
    expectEqual,
    expectError,
    expectLength,
    expectTrue,
    expectFalse,
    alphabetArray,
    alphabetCharCodeRange,
    alphabetString
} from './helpers';

describe ('#list', () => {

    const strToArray = split(''),
        generalEqualityCheck = (a, b) => a === b,
        genericOrdering = (a, b) => {
            if (a > b) { return 1; }
            else if (a < b) { return -1; }
            return 0;
        },
        equal = (a, b) => a === b,
        // const listToLinkedList = list => {
        //     const unlinkedNodes = list.map(char => ({data: char})),
        //         lastNode = unlinkedNodes.pop();
        //         return unlinkedNodes.reduceRight((agg, item) => {
        //             item.next = agg;
        //             return item;
        //         }, (lastNode.next = null, lastNode));
        // },
        linkedListToList = linkedList => {
            const out = [];
            let node = linkedList;
            while (node.next) {
                out.push({data: node.data});
                node = node.next;
            }
            return out;
        };

    describe ('#append', () => {
        const unfoldRBy4 = list => unfoldr(remainder =>
                remainder.length ? [take(4, remainder), drop(4, remainder)] : undefined
            , list),
            arrayParts= unfoldRBy4(alphabetArray),
            stringParts = unfoldRBy4(alphabetString);

        it ('should be able to append two lists.', () => {
            expectEqual(append.apply(null, arrayParts), alphabetArray);
            expectEqual(append.apply(null, stringParts), alphabetString);
            expectEqual(append(take(13, alphabetArray), drop(13, alphabetArray)), alphabetArray);
            expectEqual(append(take(13, alphabetString), drop(13, alphabetString)), alphabetString);
        });
        it ('should return the copy of the original list when appending to an empty list', () => {
            expectEqual(append(alphabetArray, []), alphabetArray);
            expectEqual(append(alphabetString, ''), alphabetString);
        });
        it ('should return an empty list when appending empty lists', () => {
            expectEqual(append('', '', ''), '');
            expectEqual(append('', ''), '');
            expectEqual(append([], [], []), []);
            expectEqual(append([], []), []);
        });
        it ('should throw an error when receiving Nothing', () => {
            // expectError(append);
            expectError(() => append(null, null));
            expectError(() => append(undefined, undefined));
            expectError(() => append(null, []));
            expectError(() => append(undefined, []));
        });
    });

    describe ('#head', () => {
        it ('should return the first item in an list and/or string.', () => {
            expectEqual(head('Hello'), 'H');
            expectEqual(head(split('', 'Hello')), 'H');
        });
        it ('should return `undefined` when an empty list and/or string is passed in', () => {
            expectEqual(undefined, head([]));
            expectEqual(undefined, head(''));
        });
        it ('should throw an error when no parameter is passed in', () => {
            expectError(head);
        });
    });

    describe ('#last', () => {
        it ('should return the last item in an list and/or string.', () => {
            const word = 'Hello';
            compose(expectEqual('o'), last)(word);
            compose(expectEqual('o'), last, strToArray)(word);
        });
        it ('should return `undefined` when an empty list is passed in', () => {
            expectEqual(undefined, last([]));
            expectEqual(undefined, last(''));
        });
        it ('should throw an error when no parameters is passed in', () => {
            expectError(last);
        });
    });

    describe ('#init', () => {
        it ('should return everything except the last item of an list and/or string', () => {
            compose(expectEqual('orange'), intercalate(''), init, strToArray)('oranges');
            compose(expectEqual('orange'), init)('oranges');
        });
        it ('should return an empty list when an empty list and/or string is passed in', () => {
            expectEqual(init([]), []);
            expectEqual(init(''), '');
        });
        it ('should throw an error when no parameter is passed in', () => {
            expectError(init);
        });
    });

    describe ('#tail', () => {
        it ('should return everything except the last item of an list', () => {
            compose(expectEqual('ello'), intercalate(''), tail, strToArray)('hello');
            compose(expectEqual('ello'), tail)('hello');
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(tail([]).length, 0);
            expectEqual(tail('').length, 0);
        });
        it ('should throw an error when no parameter is passed in', () => {
            expectError(tail);
        });
    });

    describe ('#uncons', () => {
        it ('should return the "head" and "tail" of a list in a two item array.', () => {
            expectEqual(uncons('hello'), ['h', 'ello']);
            expectEqual(uncons(split('', 'hello')), ['h', split('', 'ello')]);
        });
        it ('should return an empty tail when there\'s only one item in list.', () => {
            expectEqual(uncons('a'), ['a', '']);
            expectEqual(uncons([0]), [0, []]);
        });
        it ('should return `undefined` for empty lists.', () => {
            expectEqual(uncons(''), undefined);
            expectEqual(uncons([]), undefined);
        });
        it ('should return `undefined` when no value is passed in or a falsy value is passed in', () => {
            [null, undefined, 0, false, '']
                .forEach(x => expect(uncons(x)).toEqual(undefined));
        });
    });

    describe ('#isEmpty (a.k.a. #`null`)', () => {
        it ('should return `true` when a list is empty.', () => {
            expectTrue(isEmptyList([]));
            expectTrue(isEmptyList(''));
        });
        it ('should return `false` when a list is not empty.', () => {
            expectFalse(isEmptyList(['a', 'b', 'c']));
            expectFalse(isEmptyList('abc'));
        });
        it ('should throw an error when receiving something that is list like (doesn\'t have a `length` prop', () => {
            expectError(() => isEmptyList(null));
            expectError(() => isEmptyList(undefined));
            expectError(isEmptyList);
        });
    });

    describe ('#length', () => {
        it ('is should return the length of any item that has a `length` property', () => {
            expectTrue(
                all(item => length(item[0]) === item[1],
                    [[[], 0], ['abc', 3], [(a, b, c) => a + b + c, 3]])
            );
        });
        it ('should return `undefined` for items that don\'t have a `length` property', () => {
            expectEqual(length({}), undefined);
            expectEqual(length(0), undefined);
            expectEqual(length(false), undefined);
            expectEqual(length(true), undefined);
        });
        it ('should throw an error when `undefined` or `null` is passed in', () => {
            expectError(length);
            expectError(() => length(null));
        });
    });

    describe ('#map', () => {
        it ('should be able to map a function over a list.', () => {
            const word = 'hello',
                op = char => char + 'a';
            expectEqual(
                map(op, split('', word)),
                ['ha', 'ea', 'la', 'la', 'oa'] );
        });
        it ('should be able to map a function over a object.', () => {
            const word = 'hello',
                op = char => char + 'a',
                objReductionOp = (agg, x, ind) => {
                    agg[ind] = `${ind} bottles of beer on the wall`;
                    return agg;
                },
                obj = word.split(' ').reduce(objReductionOp, {}),
                result = map(op, obj);

            // Ensure values in result end with 'aa' (as dictated by `op`);
            expectTrue(Object.keys(result).every(key => /walla$/.test(result[key])));
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(map(x => x, []), []);
        });
        it ('should throw an error when incoming value is not a type instance', () => {
            expectError(() => map(x => x, null));
            expectError(() => map(x => x, undefined));
        });
    });

    describe ('#reverse', () => {
        it ('should reverse a list passed in.', () => {
            const word = 'hello';
            expectEqual(reverse(split('', word)), split('', 'olleh'));
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(reverse([]), []);
        });
        it ('should throw an error when receiving no value', () => {
            expectError(reverse);
            expectError(() => reverse(undefined));
            expectError(() => reverse(null));
        });
    });

    describe ('#intersperse', () => {
        it ('should be able to inject a list (string or array) in-between the items of a list of the same type.', () => {
            const result1 = intersperse(', ', alphabetArray).join('');
            expectEqual(result1, alphabetArray.join(', '));
        });
        it ('should return a list with the same item when the list has a length of `1`', () => {
            expectEqual(intersperse(', ', ['a']), ['a']);
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(intersperse('', []), []);
        });
    });

    describe ('#intercalate', () => {
        it ('should intercalate a list within another list and then perform concat on the result', () => {
            const result1 = intercalate(', ', alphabetArray);
            expectEqual(result1, alphabetArray.join(', '));
        });
        it ('should return a list with the same item when the list has a length of `1`', () => {
            expect(intercalate(', ', [['a']])).toEqual(['a']); // Ensure list is flattened one level
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(intercalate('', []), []);
            expectEqual(intercalate('', [[]]), []); // Ensures list is flattened one level
        });
    });

    describe ('#transpose', () => {
        const result1 = transpose([[1,2,3],[4,5,6]]),
            result2 = transpose([[10,11],[20],[],[30,31,32]]);
        it ('should transpose a list of lists into a rotated list of lists (from columns and rows to rows and' +
            ' columns and vice versa).', () => {
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
        it ('should ignore empty lists in the transposition process and not add them to the resulting list.', () => {
            expectTrue(all(length, result1));
            expectTrue(all(length, result2));
        });
        it ('should return an empty list when receiving one or when items contained are empty', () => {
            expectEqual(transpose([[], [], []]), []);
            expectEqual(transpose([]), []);
        });
    });

    describe ('#subsequences', () => {
        it ('should return all sub-sequences of a sequence', () => {
            const candidates = ['abc', 'abc'.split('')],
                results = candidates.map(subsequences),
                expectedLen = Math.pow(2, candidates[0].length);
            expectTrue(results.every(result => result.length === expectedLen));
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
        it ('should return a list with an empty list when receiving an empty list', () => {
        });
    });

    describe ('#permutations', () => {

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

        it ('Should return unique permutations for a given set of items', () => {
            const lists = 'abcd'.split('').reduceRight((agg, item, ind, list) =>
                agg.concat([list.slice(ind)]), []); // I know laziness lol
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

    describe ('#foldl', () => {
        it ('should fold a `Foldable` (list, etc.) into some value', () => {
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
            expectEqual(
                foldl((agg, item, ind) => {
                    agg.push(item + getAppendage(ind));
                    return agg;
                }, [], split('', phrase)),
                expectedTransform
            );
        });

        it ('should return the zero value when an empty list is passed in', () => {
            expectEqual(foldl((agg, item) => agg + item, 'a', ''), 'a');
            expectEqual(foldl((agg, item) => agg + item, [], []), []);
        });

        it ('should throw an error when `null` or `undefined` are passed in as the list', () => {
            expectError(() => foldl((agg, item) => agg + item, 'a', null));
            expectError(() => foldl((agg, item) => agg + item, 'a', undefined));
        });
    });

    describe ('#foldl1', () => {
        it ('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', () => {
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
            expectEqual(
                foldl1((agg, item, ind) => {
                    agg += getAppendage(ind) + item;
                    return agg;
                }, split('', phrase)),
                expectedTransform.join('')
            );
        });
        it ('should return the zero value when an empty list is passed in', () => {
            expectEqual(foldl1((agg, item) => agg + item, []), []);
        });
    });

    describe ('#foldr', () => {
        it ('should fold a `Foldable` (list, etc.) into some value', () => {
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
            expectEqual(
                foldr((agg, item, ind) => {
                    agg.push(item + getAppendage(ind));
                    return agg;
                }, [], split('', phrase)),
                expectedTransform
            );
        });
        it ('should return the zero value when an empty list is passed in', () => {
            expectEqual(foldr((agg, item) => agg + item, 'a', ''), 'a');
            expectEqual(foldr((agg, item) => agg + item, [], []), []);
        });
        it ('should throw an error when `null` or `undefined` are passed in as the list', () => {
            expectError(() => foldr((agg, item) => agg + item, 'a', null));
            expectError(() => foldr((agg, item) => agg + item, 'a', undefined));
        });
    });

    describe ('#foldr1', () => {
        it ('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', () => {
            const phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = ind => ind <= phraseIndCount ? '|' : '',
                expectedTransform = reverse(map((x, ind) => x + (ind !== 0 ? getAppendage(ind) : ''), split('', phrase)));
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
            expectEqual(
                foldr1((agg, item, ind) => {
                    agg += getAppendage(ind) + item;
                    return agg;
                }, split('', phrase)),
                expectedTransform.join('')
            );
        });
        it ('should return the zero value when an empty list is passed in', () => {
            expectEqual(foldr1((agg, item) => agg + item, []), []);
        });
    });

    describe ('#concat', () => {
        it ('should concatenate a list of lists into a list.', () => {
            const  listOfLists = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
                altListOfLists = ['abc', 'def', 'ghi'];
            expectEqual(concat(listOfLists), listOfLists.reduce((agg, item) => agg.concat(item)));
            expectEqual(concat(altListOfLists), altListOfLists.reduce((agg, item) => agg + item));
        });
        it ('should return an empty list when receiving an empty list or a list of empty lists', () => {
            expectEqual(concat([]), []);
            expectEqual(concat([[], [], []]), []);
        });
        it ('should throw an error when receiving nothing', () => {
            expectError(concat);
            expectError(() => concat(null));
            expectError(() => concat(undefined));
        });
    });

    describe ('#concatMap', () => {
        const id = x => x;
        it ('should map a function on a list and concatenate lists in resulting list into a list.', () => {
            const charCodeToCharOp = charCode => String.fromCharCode(charCode),
                charCodeRange = alphabetCharCodeRange;
            // @investigate is babel shimming String.fromCharCode;
            //  When passing this function direct to `[].map` it returns a weird result (seems like it's returning
            //  an instance of `String` using `new` and it's constructor)?
            expectEqual(concatMap(charCodeToCharOp, charCodeRange), alphabetArray.join(''));
            expectEqual(concatMap(charCode => [String.fromCharCode(charCode)], charCodeRange), alphabetArray);
        });
        it ('should return an empty list when receiving an empty list or a list of empty lists', () => {
            expectEqual(concatMap(id, []), []);
            expectEqual(concatMap(id, [[], [], []]), []);
        });
        it ('should throw an error when receiving `undefined` or `null` in it\'s list position', () => {
            expectError(() => concatMap(id, null));
            expectError(() => concatMap(id, undefined));
        });
    });

    describe ('#and', () => {
        it ('should return `true` when all items of a container are "truthy".', () => {
            expectTrue(and(['a', 1, 99, true, (() => null), {}, []]));
        });
        it ('should return `false` when not all items of a container are "truthy".', () => {
            expectFalse(and(['a', 1, 0, true, (() => null), {}, []]));
        });
        it ('should return `false` when receiving an empty list or nothing.', () => {
            expectFalse(and(''));
            expectFalse(and(['']));
            expectFalse(and([null]));
            expectFalse(and([undefined]));
            expectFalse(and([false]));
        });
        it ('should an error when receiving nothing', () => {
            expectError(() => and(undefined));
            expectError(() => and(null));
        });
    });

    describe ('#or', () => {
        it ('should return `true` when, at least, one of the items is "truthy".', () => {
            expectTrue(or([0, false, null, 1, undefined]));
        });
        it ('should return `false` when all of the items are "falsy".', () => {
            expectFalse(or([0, false, null, undefined, '']));
        });
        it ('should return `false` when an empty list is received.', () => {
            expectFalse(or([]));
        });
        it ('should throw an error when receiving nothing (`null` or `undefined`).', () => {
            expectError(() => or(null));
            expectError(() => or(undefined));
        });
    });

    describe ('#any', () => {
        const id = x => x;
        it ('should return `true` when any item matches predicate.', () => {
            expectTrue(any(isTruthy, [0, false, null, 1, undefined]));
            expectTrue(any(isTruthy, ['hello']));
            expectTrue(any(x => x === 'e', 'hello'));
        });
        it ('should return `false` when no item in received items matches predicate.', () => {
            expectFalse(any(isTruthy, [0, false, null, undefined, '']));
            expectFalse(any(isTruthy, [0]));
            expectFalse(any(x => x === 'e', 'avalon'));
        });
        it ('should return `false` when an empty list is received.', () => {
            expectFalse(any(id, []));
        });
        it ('should throw an error when receiving nothing (`null` or `undefined`).', () => {
            expectError(() => any(id, null));
            expectError(() => any(id, undefined));
        });
    });

    describe ('#all', () => {
        it ('should return true when predicate returns true for all items in list', () => {
            expectTrue(all(item => item, [true, true, true]));
            expectTrue(all(char => char !== 'a', 'bcdefg'));
        });
        it ('should return `false` when predicate returns `false` for an item', () => {
            expectFalse(all(item => item, [true, false, true]));
            expectFalse(all(item => item !== 'a', 'bcdaefg'));
        });
        it ('should return `false` when an empty list is passed in', () => {
            expectFalse(all(item => item, []));
            expectFalse(all(item => item, ''));
        });
        it ('should throw an error when nothing is passed in', () => {
            expectError(() => all(item => item, null));
            expectError(() => all(item => item, undefined));
        });
    });

    describe ('#sum', () => {
        it ('should be able sum up any given list of numbers list of numbers', () => {
            expectEqual(sum(range(1, 5)), 15);
            expectEqual(sum(range(-5, -1)), -15);
        });
        it ('should return `0` when receiving an empty list', () => {
            expectEqual(sum(range()), 0);
        });
        it ('should throw an error when receiving nothing (`null` or `undefined`)', () => {
            expectError(() => sum(null));
            expectError(() => sum(undefined));
            expectError(sum);
        });
    });

    describe ('#product', () => {
        it ('should be able return the product of a given list', () => {
            expectEqual(product(range(1, 5)), 120);
            expectEqual(product(range(-5, -1)), -120);
        });
        it ('should return `0` when receiving an empty list', () => {
            expectEqual(product(range()), 1);
        });
        it ('should throw an error when receiving nothing (`null` or `undefined`)', () => {
            expectError(() => product(null));
            expectError(() => product(undefined));
        });
    });

    describe ('#maximum', () => {
        it ('should be able return the maximum of a given list', () => {
            expectEqual(maximum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 5);
            expectEqual(maximum(range(-5, -1).concat([-3, -5, -7])), -1);
        });
        it ('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', () => {
            expectError(() => maximum(null));
            expectError(() => maximum(undefined));
            // expectEqual(minimum([]), Infinity);
            expectError(maximum);
        });
    });

    describe ('#minimum', () => {
        it ('should be able return the minimum of a given list', () => {
            expectEqual(minimum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 1);
            expectEqual(minimum(range(-5, -1).concat([-3, -5, -7])), -7);
        });
        it ('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', () => {
            expectError(() => minimum(null));
            expectError(() => minimum(undefined));
        });
    });

    describe ('#mapAccumL', () => {
        it ('should map a function/operation on every item of a list and it should return a tuple containing the ' +
            'accumulated value and the an instance of passed in container with mapped items', () => {
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
                                if (Array.isArray(agg)) { agg.push(tuple[2](agg, item, ind)); }
                                else { agg += tuple[2](agg, item, ind); }
                                return agg;
                            },
                            tuple[3], tuple[1]);
                        // Check that mapped have equal length
                        return length(tuple[0][1]) === length(tuple[1]) &&
                            // Check aggregated are equal
                            shallowCompareOnLeft(tuple[0][0], reducedForCompare);
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

    describe ('#mapAccumR', () => {
        it ('should map a function/operation on every item of a list and it should return a tuple containing the ' +
            'accumulated value and the an instance of passed in container with mapped items', () => {
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
                                if (Array.isArray(agg)) { agg.push(tuple[2](agg, item, ind)); }
                                else { agg += tuple[2](agg, item, ind); }
                                return agg;
                            },
                            tuple[3], tuple[1]);
                        // Check that mapped have equal length
                        return length(tuple[0][1]) === length(tuple[1]) &&
                            // Check aggregated are equal
                            shallowCompareOnLeft(tuple[0][0], reducedForCompare);
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

    describe ('#unfoldr', () => {
        it ('should be able to unfold any value from right to left.', () => {
            expectEqual(
                unfoldr(minuend => {
                    let diff = minuend - 1;
                    return diff >= 0 ? [minuend, diff] : undefined;
                }, 10),
                reverse(range(1, 10))
            );
        });
    });

    describe ('#take', () => {
        const hello = 'hello';
        it ('should return taken items from list and/or string until limit', () => {
            const word = hello;

            // Test `take` on word parts and word (list and string)
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
        it ('should return an empty list and/or string when called with `0` as the first argument', () => {
            expectEqual(take(0, alphabetString), '');
            expectEqual(take(0, alphabetArray), []);

        });
        it ('should return an empty list and/or string when called with with an empty list or string', () => {
            let count = 5;
            while (count) {
                expectEqual(take(count, ''), '');
                expectEqual(take(count, []), []);
                --count;
            }
        });
        it ('should throw an error when no parameter is passed in', () => {
            expectError(tail);
        });
    });

    describe ('#drop', () => {
        const hello = 'hello';
        it ('should return a new list/string with dropped items from original until limit', () => {
            const word = hello,
                wordParts = strToArray(word),
                partsLength = wordParts.length - 1;

            // Test `take` on word parts and word (list and string)
            wordParts.forEach((part, ind, parts)=> {
                // Get human index (counting from `1`) and preliminaries
                const humanInd = ind + 1,
                    takenFromArray = drop(humanInd, parts),
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
        it ('should return entire list and/or string when called with `0` as the first argument', () => {
            compose(expectEqual(length(hello)), length, drop(0))(split('', hello));
            compose(expectEqual(length(hello)), length, drop(0))(hello);
        });
        it ('should return an empty list and/or string when called with with an empty list or string', () => {
            let count = 5;
            while (count) {
                compose(expectEqual(0), length, drop(count))('');
                compose(expectEqual(0), length, drop(count))([]);
                --count;
            }
        });
        it ('should throw an error when no parameter is passed in', () => {
            expectError(tail);
        });
    });

    describe ('#splitAt', () => {
        const word = 'hello',
            phraseAppendage = ' world',
            phrase = `${word}${phraseAppendage}`,
            phraseLen = length(phrase),
            wordLen = length(word),
            phraseAppendageLen = length(phraseAppendage);

        it ('should split an list and/or string at given index', () => {
            const result = splitAt(wordLen, phrase),
                result2 = splitAt(wordLen, phrase.split(''));

            // Ensure returned type for string case is correct
            expectTrue(typeof result[0] === 'string');
            expectTrue(typeof result[1] === 'string');

            // Expect returned string parts are equal
            expectEqual(result[0], word);
            expectEqual(result[1], phraseAppendage);

            // Ensure returned type for list use case is correct
            expectTrue(Array.isArray(result2[0]));
            expectTrue(Array.isArray(result2[1]));

            // Ensure returned list parts are equal
            expectEqual(length(result2[0]), wordLen);
            expectEqual(length(result2[1]), phraseAppendageLen);

            // Check each char/element in returned parts for list use case
            [word, phraseAppendage].forEach((str, ind) =>
                expectTrue(str.split('')
                    .every((char, ind2) => result2[ind][ind2] === char)) );
        });
        it ('should return an list of empty list and/or string when receiving an empty one of either', () => {
            splitAt(3, []).concat(splitAt(2, '')).forEach(expectLength(0));
        });
        it ('should return entirely, passed in, list and/or string as second part of ' +
            'split in return when `0` is passed in as the first param', () => {
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

    describe ('#takeWhile', () => {
        it ('should take elements while predicate is fulfilled', () => {
            const word = 'abcdefg',
                expectedResult = word.split('e')[0],
                predicate = x => x !== 'e';

                // Expect matched length and matched elements
                expectTrue(
                    // Ensure cases for each use case
                    all(result =>
                        // Ensure correct length of items in returned element
                        length(expectedResult) === length(result) &&
                            // Ensure elements where matched
                            all((x, ind) => x === expectedResult[ind], result),
                            // Use cases (one with string other with list)
                            [takeWhile(predicate, word.split('')),
                                takeWhile(predicate, word)]
                    ));
        });
        it ('should return an empty type instance if predicate is not matched at all', () => {
            const word = 'abcdefg',
                pred = x => x === 'z';

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                    // Ensure no items returned
                    length(result) === 0,
                    [takeWhile(pred, word.split('')), takeWhile(pred, word)]
                ));
        });
        it ('should return a copy of type instance if predicate is matched all the way through', () => {
            const word = 'abcdefg',
                pred = x => x !== 'z';

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                        // Ensure no items returned
                    length(result) === length(word),
                    [takeWhile(pred, word.split('')), takeWhile(pred, word)]
                ));
        });

    });

    describe ('#dropWhile', () => {
        it ('should drop elements while predicate is fulfilled', () => {
            const word = 'abcdefg',
                expectedResult = word.substring(word.indexOf('e'), length(word)),
                predicate = x => x !== 'e';

                // Expect matched length and matched elements
                expectTrue(
                    // Ensure cases for each use case
                    all(result =>
                        // Ensure correct length of items in returned element
                        length(expectedResult) === length(result) &&
                            // Ensure elements where matched
                            all((x, ind) => x === expectedResult[ind], result),
                            // Use cases (one with string other with list)
                            [dropWhile(predicate, word.split('')),
                                dropWhile(predicate, word)]
                    ));
        });
        it ('should return an empty type instance if predicate is matched all the way through', () => {
            const word = 'abcdefg',
                pred = x => word.indexOf(x) > -1;

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                    // Ensure no items returned
                    length(result) === 0,
                    [dropWhile(pred, word.split('')), dropWhile(pred, word)]
                ));
        });
        it ('should return an a copy of the passed in type instance if predicate doesn\'t match any elements', () => {
            const word = 'abcdefg',
                pred = x => x === 'z' > -1;

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                    // Ensure correct lengths returned
                    length(result) === length(word) &&
                    // Ensure elements where matched
                    all((x, ind) => x === word[ind], result),
                    // Use cases
                    [dropWhile(pred, word.split('')), dropWhile(pred, word)]
                ));
        });
    });

    describe ('#dropWhileEnd', () => {
        it ('should drop elements while predicate is fulfilled', () => {
            const word = 'abcdefg',
                expectedResult = word.substring(0, word.indexOf('e')),
                predicate = x => x !== 'e';

            // Expect matched length and matched elements
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                        // Ensure correct length of items in returned element
                    length(expectedResult) === length(result) &&
                    // Ensure elements where matched
                    all((x, ind) => x === expectedResult[ind], result),
                    // Use cases (one with string other with list)
                    [dropWhileEnd(predicate, word.split('')),
                        dropWhileEnd(predicate, word)]
                ));
        });
        it ('should return an empty type instance if predicate is matched all the way through', () => {
            const word = 'abcdefg',
                pred = x => word.indexOf(x) > -1,
                lenWord = length(word);

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                    // Ensure all items returned
                    length(result) === lenWord,
                    [dropWhileEnd(pred, word.split('')), dropWhileEnd(pred, word)]
                ));
        });
        it ('should return an a copy of the passed in type instance if predicate doesn\'t match any elements', () => {
            const word = 'abcdefg',
                pred = x => x === 'z' > -1;

            // Expect empty type instance
            expectTrue(
                // Ensure cases for each use case
                all(result =>
                        // Ensure correct lengths returned
                    length(result) === length(word) &&
                    // Ensure elements where matched
                    all((x, ind) => x === word[ind], result),
                    // Use cases
                    [dropWhileEnd(pred, word.split('')), dropWhileEnd(pred, word)]
                ));
        });
    });

    describe ('#span', () => {
        it ('should take elements into first list while predicate is fulfilled and elements ' +
            'that didn\'t match into second list', () => {
            const word = 'abcdefg',
                expectedResults = [word.substring(0, 4), word.substring(4)],
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
                    [span(predicate, word.split('')), span(predicate, word)]
                ));
        });
        it ('should return an list of empty arrays and/or strings when an empty list is passed in', () => {
            expectEqual(span(a => !!a, ''), ['', '']);
            expectEqual(span(a => !!a, []), [[], []]);
        });
    });

    describe ('#breakOnList', () => {
        it ('should take elements into first list while !predicate is fulfilled and elements ' +
            'that didn\'t match into second list', () => {
            const word = 'abcdefg',
                expectedResults = [word.substring(0, 4), word.substring(4)],
                predicate = x => x === 'e';

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
                    [breakOnList(predicate, word.split('')), breakOnList(predicate, word)]
                ));
        });
        it ('should return an list of empty arrays and/or strings when an empty list is passed in', () => {
            expectTrue(
                all(tuple =>
                    length(tuple) === 2 &&
                    all(tuplePart => (isString(tuplePart) || isArray(tuplePart)) &&
                        length(tuplePart) === 0, tuple),
                    [breakOnList(a => a, ''), breakOnList(x => x, [])]
                ));
        });
    });

    describe ('#stripPrefix', () => {
        it ('should be able to strip a prefix from a list', () => {
            expectEqual(
                stripPrefix('abc', alphabetArray.slice(0, 10)),
                alphabetArray.slice(3, 10));

            expectEqual(
                stripPrefix('abc', alphabetString.substring(0, 10)),
                alphabetString.substring(3, 10));
        });
        it ('should return a copy of the passed in list when prefix is not found', () => {
            expectEqual(stripPrefix('!*&', alphabetArray), alphabetArray);
            expectEqual(stripPrefix('!*&', alphabetString), alphabetString);
            expectEqual(stripPrefix('!*&', ''), '');
            expectEqual(stripPrefix('!*&', []), []);
        });
        it ('should throw an error when receiving nothing in either position', () => {
            expectError(() => stripPrefix(null, 'abc'));
            expectError(() => stripPrefix(null, null));
            expectError(() => stripPrefix('abc', null));
        });
    });

    describe ('#group', () => {
        it ('should return a list of lists which contain the (sequential) matches', () => {
            const expectedResultFlattened = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];
            expectEqual(group('Mississippi'), expectedResultFlattened);
            expectEqual(group('Mississippi'.split('')), expectedResultFlattened);
        });
        it ('should return a list of lists containing individual ungrouped items', () => {
            expectEqual(group(alphabetArray), alphabetArray.map(char => [char]));
        });
    });

    describe ('#inits', () => {
        it ('should unfold a list into list of all possible ' +
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

    describe ('#tails', () => {
        it ('should unfold a list into list of all possible ' +
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

    describe ('#isPrefixOf', () => {
        it ('should return `true` when a list is a prefix of another', () => {
            expectTrue(all(
                isPrefixOf('abc'),
                splitAt(3, inits(alphabetString))[1]
            ));
            expectTrue(all(
                isPrefixOf('abc'.split('')),
                splitAt(3, inits(alphabetArray))[1]
            ));
        });
        it ('should return `false` when a list is not prefix of second list', () => {
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

    describe ('#isSuffixOf', () => {
        it ('should return `true` when a list is a suffix of another', () => {
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
        it ('should return `false` when a list is not suffix of second list', () => {
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

    describe ('#isInfixOf', () => {
        it ('should return `true` when a list is infixed with another', () => {
            const results = concatMap(candidate => [
                isInfixOf(candidate, alphabetString),
                isInfixOf(candidate, alphabetArray)
            ], ['abc', 'efg', 'xyz']);
            expectTrue(and(results));
        });
        it ('should return `false` when a list is not infix of second list', () => {
            expectTrue(and([
                negateF2(isInfixOf('!@#'))(alphabetString),
                negateF2(isInfixOf('!@#'.split(''))(alphabetArray))
            ]));
        });
    });

    describe ('#isSubsequenceOf', () => {
        it ('should return true a list is sub-sequence of another.', () => {
            const listToSearchIn = take(6, alphabetString);
            expectTrue(all(
                listToSearchFor => isSubsequenceOf(listToSearchFor, listToSearchIn),
                ['bdf', 'ace', 'abc', 'def']
            ));
        });
        it ('should return false a list is not sub-sequence of another.', () => {
            const listToSearchIn = take(6, drop(6, alphabetString));
            expectTrue(all(
                listToSearchFor => !isSubsequenceOf(listToSearchFor, listToSearchIn),
                ['bdf', 'ace', 'abc', 'def']
            ));
        });
    });

    describe ('#elem', () => {
        it ('should return `true` when the element is found in given list', () => {
            const word = 'hello world';
            expectTrue(
                all(() => all((elm2, ind2, arr) => !!elem(elm2, arr), word), [word.split(''), word]));
        });
        it ('should return `false` when element is not found in given list', () => {
            const word = 'hello world';
            expectTrue(
                all(elm =>
                        all((elm2, ind2, arr) => !elem('z', arr), elm),
                    [word.split(''), word]));
        });
    });

    describe ('#notElem', () => {
        it ('should return `false` when the element is found in given list', () => {
            const word = 'hello world';
            expectTrue(
                all(() => all((elm2, ind2, arr) => !notElem(elm2, arr), word),
                    [word.split(''), word]));
        });
        it ('should return `true` when element is not found in given list', () => {
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

    describe ('#find', () => {
        it ('should should find element that matches predicate when element is in given list', () => {
            const word = 'word',
                pred = x => x === 'o';
            expectEqual(find(pred, word), 'o');
            expectEqual(find(pred, word.split('')), 'o');
        });
        // @todo add more tests
    });

    describe ('#filter', () => {
        it ('should be able to filter a list by a predicate.', () => {
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
        it ('should return an empty list when no items match predicate', () => {
            const pred = char => char === '#';
            expectEqual(filter(pred, alphabetArray), []);
        });
    });

    describe ('#partition', () => {
        it ('should take elements into first list while predicate is fulfilled and elements ' +
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
        it ('should return an list of empty arrays and/or strings when an empty list is passed in', () => {
            expectTrue(
                all(tuple =>
                    length(tuple) === 2 &&
                    all(tuplePart => (isString(tuplePart) || isArray(tuplePart)) &&
                        length(tuplePart) === 0, tuple),
                    [partition(a => a, ''), partition(x => x, [])]
                ));
        });
    });

    describe ('#at', () => {
        it ('should return an item at a given key/index.', () => {
            [alphabetString, alphabetArray].forEach(subject => {
                const subjectLastInd = length(subject) - 1;
                expectEqual(at(0, subject), subject[0]);
                expectEqual(at(5, subject), subject[5]);
                expectEqual(at(subjectLastInd, subject), subject[subjectLastInd]);
            });
        });
        it ('should return `undefined` when list has no length.', () => {
            expectEqual(at(0, ''), undefined);
            expectEqual(at(0, []), undefined);
        });
    });

    describe ('#elemIndex', () => {
        it ('should return the index where the element is found', () => {
            const word = 'hello world';
            expectTrue(
                all(elm =>
                        all((elm2, ind2, arr) => elemIndex(elm2, arr) === word.indexOf(elm2), elm),
                    [word.split(''), word]));
        });
        it ('should return `undefined` when element is not in list', () => {
            const word = 'hello world';
            expectTrue(
                all(elm =>
                        all((elm2, ind2, arr) => elemIndex('z', arr) === undefined, elm),
                    [word.split(''), word]));
        });
    });

    describe ('#elemIndices', () => {
        it ('should return all found element indices in a list', () => {
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
        // @todo add more tests
    });

    describe ('#findIndex', () => {
        const word = 'abcdefg';
        it ('should find an index where predicate is satisfied', () => {
            expectTrue(
                word.split('')
                    .every((char, ind, arr) =>
                        findIndex((x, ind2) => ind === ind2 && x === word[ind], arr) === ind));
        });
    });

    describe ('#findIndices', () => {
        it ('should return indices for all items that match passed in predicate', () => {
            const tokenInits = inits(intersperse('e', alphabetArray)),
                indicePred = x => x === 'e',
                expectedResults = tokenInits.map(xs =>
                    xs.map((x, ind) => [ind, x])
                        .filter(([ind, x]) => indicePred(x, ind))
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

        it ('should return `undefined` when doesn\'t find element at indice', () => {
            expectEqual(findIndices(x => !!x, undefined), undefined);
            expectEqual(findIndices(x => !!x, null), undefined);
            expectEqual(findIndices(x => !!x, []), undefined);
        });
    });

    describe ('#zip', () => {
        it ('should be able to zip two lists into a list of tuples (list of two items).', () => {
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
        it ('should return an empty list when empty lists are passed', () => {
            expectEqual(zip([], []), []);
        });
        it ('should return a copy of the passed in populated list when one of them is not populated.', () => {
            expectEqual(zip([], alphabetArray), []);
            expectEqual(zip(alphabetArray, []), []);
        });
    });

    describe ('#zipN', () => {
        it ('should be able to zip the given number of lists.', () => {
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
        it ('should return an empty list when empty lists are passed in', () => {
            expectEqual(zipN([], []), []);
        });
        it ('should return a copy of the left or right populated list when the other(s) is/are empty.', () => {
            expectEqual(zipN([], alphabetArray), []);
            expectEqual(zipN(alphabetArray, []), []);
        });
    });

    describe ('#zipWith', () => {
        const tuplize = (a, b) => [a, b];
        it ('should be able to zip the given number of lists.', () => {
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

                zipWithResult = zipWith(tuplize, ...subj),

                zipWithResult2 = zipWith(tuplize, ...subj2);

            expectTrue(
                all( tuple =>
                        all( (list, ind) =>
                                all( (item, ind2) =>
                                    item === tuple[1][ind2][ind], list
                                ),
                            tuple[0]
                        ),
                    [[zipWithResult, filter(length, subj)],
                        [zipWithResult2, filter(length, subj2)]]
                )
            );
        });
        it ('should return an empty list when empty lists are passed', () => {
            expectEqual(zipWith(tuplize, [], []), []);
        });
        it ('should return a copy of the passed in populated list when one of them is not populated.', () => {
            expectEqual(zipWith(tuplize, [], alphabetArray), []);
            expectEqual(zipWith(tuplize, alphabetArray, []), []);
        });
    });

    describe ('#unzip', () => {
        it ('should be able to unzip a list of tuples of two.', () => {
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

            // Ensure resulting lists contain expected items
            expectTrue(all(
                (list, i) =>
                    all((item, j) => item === subj[j][i], list),
                result
            ));

        });
        // @todo Add more tests
    });

    describe ('#unzipN', () => {
        it ('should be able to unzip a list of tuples of any number.', () => {
            const subj = unfoldr (remainder => {
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
        // @todo Add more tests
    });

    describe ('#lines', () => {
        it ('should split a string on all new line characters.', () => {
            const subj = intercalate('\n', alphabetArray),
                result = lines(subj);

            // Ensure subject is valid first:
            // ------------------------------------
            // Expect new line char before every char except the first
            expectLength(length(alphabetArray) * 2 - 1, subj);

            // Check split string
            expectEqual(alphabetArray, result);
        });
        it ('should return original string when no new lines are found in string', () => {
            expectEqual(lines('hello world'), ['hello world']);
            expectEqual(lines(''), ['']);
        });
        it ('should throw Errors when receiving nothing', () => {
            expectError(() => lines(null));
            expectError(() => lines(undefined));
        });
    });

    describe ('#words', () => {
        it ('should split a string on all whitespace characters.', () => {
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
        it ('should return a copy of original list when no whitespace characters are found.', () => {
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
        it ('should throw Errors when receiving nothing', () => {
            expectError(() => words(null));
            expectError(() => words(undefined));
        });
    });

    describe ('#unlines', () => {
        it ('should join a list with new lines.', () => {
            ['hello world', alphabetString, alphabetArray].forEach(subj => {
                const result = unlines(subj);

                // Check items in resulted list
                expectEqual(intersperse('\n', subj).join(''), Array.isArray(result) ? result.join('') : result);
            });
        });
        it ('should return empty lists when receiving empty lists', () => {
            expectEqual(unlines([]), []);
        });
        it ('should throw Errors when receiving nothing', () => {
            expectError(() => unlines(null));
            expectError(() => unlines(undefined));
        });
    });

    describe ('#unwords', () => {
        it ('should join a list of words with spaces.', () => {
            ['hello world', alphabetString, alphabetArray].forEach(subj => {
                const result = unwords(subj);
                expectEqual(intersperse(' ', subj).join(''), result);
            });
        });
        it ('should return empty lists when receiving empty lists', () => {
            expectEqual(unwords([]), []);
        });
        it ('should throw Errors when receiving nothing', () => {
            expectError(() => unwords(null));
            expectError(() => unwords(undefined));
        });
    });

    describe ('#nub', () => {
        it ('should remove all but first occurrences of repeat items in a list.', () => {
            expectEqual(nub('conundrum'.split('')), 'conudrm'.split(''));
            expectEqual(nub(map(char => char + char, alphabetArray).join('').split('')), alphabetArray);
        });
        it ('should return a copy of the passed in list with items intact if there ' +
            'aren\'t any repeat items', () => {
            expectEqual(nub(alphabetArray), alphabetArray);
        });
        it ('should return empty lists when receiving empty lists', () => {
            expectEqual(nub([]), []);
        });
        it ('should throw Errors when receiving nothing', () => {
            expectError(() => nub(null));
            expectError(() => nub(undefined));
        });
    });

    describe ('#remove', () => { // same as `delete` (in haskell)
        it ('should remove the first occurrence of an item in a list.', () => {
            expectEqual(remove('l', 'hello world'), 'helo world');
            expectEqual(remove('l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(remove('a', alphabetString), tail(alphabetString));
            expectEqual(remove('z', alphabetString), init(alphabetString));
            expectEqual(remove('a', alphabetArray), tail(alphabetArray));
            expectEqual(remove('z', alphabetArray), init(alphabetArray));
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(remove('a', ''), '');
            expectEqual(remove('a', []), []);
        });
        it ('should throw Errors when receiving nothing in the list position', () => {
            expectError(() => remove(null, null));
            expectError(() => remove(undefined, undefined));
            expectError(() => remove(null, null));
            expectError(() => remove(undefined, undefined));
        });
    });

    describe ('#complement', () => {
        it ('should return an empty list when no parameters are passed in', () => {
            compose(expectEqual(__, 0), length, complement)();
        });
        it ('should return an empty list if only one list is passed in', () => {
            compose(expectEqual(__, 0), length, complement)([1,2,3]);
        });
        it ('should return elements not in first list passed to it', () => {
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

    describe ('#difference', () => {
        it ('should return an empty list when no parameters are passed in', () => {
            compose(expectEqual(__, 0), length, difference)();
        });
        it ('should return an empty list when first list passed in is empty', () => {
            compose(expectEqual(__, 0), length)(difference([], alphabetArray));
            compose(expectEqual(__, 0), length)(difference('', alphabetString));
        });
        it ('should return an empty list when there are no differences between the lists passed in', () => {
            compose(expectEqual(__, 0), length)(difference(alphabetArray, alphabetArray));
            compose(expectEqual(__, 0), length)(difference(alphabetString, alphabetString));
        });
        it ('should return the difference between two arrays passed in', () => {
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

    describe ('#intersect', () => {
        it ('should return an empty list when receiving an empty list as parameter 1', () => {
            compose(expectEqual(__, 0), length, intersect)([]);
            compose(expectEqual(__, 0), length, intersect([]))([1, 2, 3]);
        });
        it ('should return an empty list when receiving an empty list as parameter 2', () => {
            compose(expectEqual(__, 0), length, intersect([1, 2, 3]))([]);
        });
        it ('should return an empty list when both arrays passed are empty', () => {
            compose(expectEqual(__, 0), length, intersect([]))([]);
        });
        it ('should return an empty list when no arrays are passed in', () => {
            compose(expectEqual(__, 0), length, intersect)();
        });
        it ('should return an intersection of the two arrays passed in', () => {
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

    describe ('#union', () => {
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
        it ('should return a union on list 1 with list two', () => {
            [// subj1, subj2, expectResultLen, expectedResultElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4 ,5]],
                [mixedMatchRange, range(18, 21), 13, mixedMatchRange.concat(range(18, 21))]
            ]
                .forEach(testCase => {
                    let [subj1, subj2, expectedLen, expectedElms] = testCase,
                        result = union(subj1, subj2);
                    expectEqual(result.length, expectedLen);
                    expectEqual(result, expectedElms);
                });
        });
        it ('should return a copy of left-most array when right-most list is empty', () => {
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
        it ('should return a copy of right-most list when left-most list is empty', () => {
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
        it ('should return an empty list when receiving empty lists', () => {
            expectEqual(union('', ''), '');
            expectEqual(union([], []), []);
        });
    });

    describe ('#sort', () => {
        it ('should sort a list in ascending order', () => {
            expectEqual(sort(range(10, 0, -1)), range(0, 10, 1));
            expectEqual(sort(range(0, 10)), range(0, 10));
            compose(expectEqual(__, alphabetArray), sort, reverse)(alphabetArray);
            compose(/*log,*/ sort, reverse)(alphabetArray);
        });
        it ('should return a copy of original list when said list is already sorted', () => {
            compose(expectEqual(__, ['a', 'b', 'c']), sort, take(3))(alphabetArray);
            compose(expectEqual(__, ['a', 'b', 'c']), sort, take(3))(alphabetArray);
            compose(expectEqual(__, alphabetArray), sort)(alphabetArray);
            compose(expectEqual(__, range(0, 10)), sort)(range(0, 10));
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(sort([]), []);
        });
    });

    describe ('#sortOn', () => {
        const identity = x => x,
            sortOnIdentity = sortOn(identity),
            range0To10 = range(0, 10),
            range10To0 = range(10, 0, -1);
        it ('should sort a list in ascending order', () => {
            expectEqual(sortOnIdentity(range10To0), range0To10);
            expectEqual(sortOnIdentity(range0To10), range0To10);
            compose(expectEqual(__, alphabetArray), sortOnIdentity, reverse)(alphabetArray);
            compose(/*log,*/ sortOnIdentity, reverse)(alphabetArray);
        });
        it ('should return a copy of original list when said list is already sorted', () => {
            compose(expectEqual(__, ['a', 'b', 'c']), sortOnIdentity, take(3))(alphabetArray);
            compose(expectEqual(__, alphabetArray), sortOnIdentity)(alphabetArray);
            compose(expectEqual(__, range0To10), sortOnIdentity)(range0To10);
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(sortOnIdentity([]), []);
        });
    });

    describe ('#insert', () => {
        const injectValueAtIndex = (x, ind, list) => {
            if (ind <= 0) { return [x].concat(list); }
            else if (ind > list.length - 1) { return list.concat([x]); }
            return list.slice(0, ind).concat([x], list.slice(ind));
        };
        it ('Should insert a value directly before the first value that is less than or equal to it', () => {
            // expectEqual(insert(99, range(0, 144, 5))
            const range0To145 = range(0, 145, 5),
                expectedResult = injectValueAtIndex(99, 20, range0To145),
                result = insert(99, range0To145),
                result1 = insert(99, reverse(range0To145)),
                result2 = insert('x', alphabetArray),
                result3 = insert('x', reverse(alphabetArray));
            expectEqual(result, expectedResult);
            expectEqual(result1, [99].concat(reverse(range0To145)));
            expectEqual(result2, injectValueAtIndex('x', 24, alphabetArray));
            expectEqual(result3, ['x'].concat(reverse(alphabetArray)));
        });
        it ('should insert value even if passed in list is empty', () => {
            expectEqual(insert(99, []), [99]);
            expectEqual(insert('a', []), ['a']);
        });
    });

    describe ('#nubBy', () => {
        it ('should remove all but first occurrences of repeat items in a list.', () => {
            expectEqual(nubBy(equal, 'conundrum'.split('')), 'conudrm'.split(''));
            expectEqual(nubBy(equal, map(char => char + char, alphabetArray).join('').split('')), alphabetArray);
        });
        it ('should return a copy of the passed in list with items intact if there ' +
            'aren\'t any repeat items', () => {
            expectEqual(nubBy(equal, alphabetArray), alphabetArray);
        });
        it ('should return empty lists when receiving empty lists', () => {
            expectEqual(nubBy(equal, []), []);
        });
        it ('should throw Errors when receiving nothing', () => {
            expectError(() => nubBy(equal, null));
            expectError(() => nubBy(equal, undefined));
        });
    });

    describe ('#removeBy', () => {
        it ('should remove the first occurrence of an item in a list.', () => {
            expectEqual(removeBy(equal, 'l', 'hello world'), 'helo world');
            expectEqual(removeBy(equal, 'l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(removeBy(equal, 'a', alphabetString), tail(alphabetString));
            expectEqual(removeBy(equal, 'z', alphabetString), init(alphabetString));
            expectEqual(removeBy(equal, 'a', alphabetArray), tail(alphabetArray));
            expectEqual(removeBy(equal, 'z', alphabetArray), init(alphabetArray));
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(removeBy(equal, 'a', ''), '');
            expectEqual(removeBy(equal, 'a', []), []);
        });
        it ('should throw Errors when receiving nothing in the list position', () => {
            expectError(() => removeBy(equal, null, null));
            expectError(() => removeBy(equal, undefined, undefined));
            expectError(() => removeBy(equal, null, null));
            expectError(() => removeBy(equal, undefined, undefined));
        });
    });

    describe ('#removeFirstsBy', () => {
        const vowels = 'aeiou',
            vowelsArray = vowels.split(''),
            consonants = removeFirstsBy(equal, alphabetString, vowels),
            consonantsArray = consonants.split('');
        it ('should remove all first occurrences of all items in second list by passed in ' +
            'equality operation.', () => {
            // Remove from first entry on both
            const fiveArrays = map(() => alphabetArray, vowelsArray),
                catedArrays = concat(fiveArrays),
                expected = foldl((agg, vowel) => {
                        const parts = splitAt(agg.indexOf(vowel), agg);
                        return concat([parts[0], tail(parts[1])]);
                    }, catedArrays, vowelsArray),
                rslt = removeFirstsBy(equal, concat(fiveArrays), vowelsArray);

            // Expect vowels removed from the same places in both lists
            expect(rslt.join('')).toEqual(expected.join(''));
        });
        it ('should return copy of original list when no items from second list are found in it.', () => {
            expectEqual(removeFirstsBy(equal, consonants, vowels), consonants);
            expectEqual(
                removeFirstsBy(equal, consonantsArray, vowelsArray),
                consonantsArray
            );
        });
    });

    describe ('#unionBy', () => {
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
        it ('should return a union on list 1 with list two', () => {
            [// subj1, subj2, expectResultLen, expectedResultElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4 ,5]],
                [mixedMatchRange, range(18, 21), 13, mixedMatchRange.concat(range(18, 21))]
            ]
                .forEach(testCase => {
                    let [subj1, subj2, expectedLen, expectedElms] = testCase,
                        result = unionBy(equalityCheck, subj1, subj2);
                    expectEqual(result.length, expectedLen);
                    expectEqual(result, expectedElms);
                });
        });
        it ('should return a copy of left-most array when right-most list is empty', () => {
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
        it ('should return a copy of right-most list when left-most list is empty', () => {
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
        it ('should return an empty list when receiving empty lists', () => {
            expectEqual(unionBy(equalityCheck, '', ''), '');
            expectEqual(unionBy(equalityCheck, [], []), []);
        });
    });

    describe ('#intersectBy', () => {
        const equality = (a, b) => a === b;
        // it ('should have more tests written');
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(length(intersectBy(equality, [], [1, 2, 3])), 0);
        });
        it ('should return an empty list when receiving an empty list as parameter 2', () => {
            expectEqual(length(intersectBy(equality, [1, 2, 3], [])), 0);
        });
        it ('should return an empty list when both arrays passed are empty', () => {
            expectEqual(length(intersectBy(equality, [], [])), 0);
        });
        it ('should return an intersection of the two arrays on equality function', () => {
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

    describe ('#groupBy', () => {
        it ('should return a list of lists which contain the (sequential) matches on equality function', () => {
            const expectedResult = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];
            expectEqual(groupBy(generalEqualityCheck, 'Mississippi'), expectedResult);
            expectEqual(
                groupBy(generalEqualityCheck, 'Mississippi'.split('')),
                expectedResult
            );
        });
        it ('should return a list of lists containing individual un-grouped items or items that do not match equality function', () => {
            expectEqual(
                groupBy(generalEqualityCheck, alphabetArray),
                alphabetArray.map(char => [char]));
        });
    });

    describe ('#sortBy', () => {
        it ('should sort a list by ordering function', () => {
            expectEqual(sortBy(genericOrdering, range(10, 0, -1)), range(0, 10, 1));
            expectEqual(sortBy(genericOrdering, range(0, 10)), range(0, 10));
            compose(expectEqual(__, alphabetArray),
                value => sortBy(genericOrdering, value), reverse)(alphabetArray);
            compose(/*log,*/ value => sortBy(genericOrdering, value), reverse)(alphabetArray);
        });
        it ('should return a copy of original list when said list is already sorted', () => {
            compose(expectEqual(__, ['a', 'b', 'c']), xs => sortBy(genericOrdering, xs))(take(3, alphabetArray));
            compose(expectEqual(__, ['a', 'b', 'c']), xs => sortBy(genericOrdering, xs))(take(3, alphabetArray));
            compose(expectEqual(__, alphabetArray), xs => sortBy(genericOrdering, xs))(alphabetArray);
            compose(expectEqual(__, range(0, 10)), xs => sortBy(genericOrdering, xs))(range(0, 10));
        });
        it ('should return an empty list when receiving an empty list', () => {
            expectEqual(sortBy(genericOrdering, []), []);
        });
    });

    describe ('#insertBy', () => {
        const injectValueAtIndex = (x, ind, list) => {
                if (ind <= 0) { return [x].concat(list); }
                else if (ind > list.length - 1) { return list.concat([x]); }
                return list.slice(0, ind).concat([x], list.slice(ind));
            },
            genericInsert = (x, xs) => insertBy(genericOrdering, x, xs);
        it ('Should insert a value before value that matches equality check', () => {
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
        it ('should insert value even if passed in list is empty', () => {
            expectEqual(genericInsert(99, []), [99]);
            expectEqual(genericInsert('a', []), ['a']);
        });
    });

    describe ('#scanl', () => {
        const unlinkedNodes = alphabetArray.map(char => ({data: char}));

        it ('should return a list of successively reduced values from left to right', () => {
            // Generate linked-list structure
            const result = scanl((agg, item) => {
                agg.next = item;
                item.next = null;
                return item;
            }, {}, unlinkedNodes);

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

        it ('should return an empty list when receiving an empty one', () => {
            expectEqual(scanl(x => x * 2, 99, []), []);
            expectEqual(scanl(x => x + 2, '99', ''), []);
        });
    });

    describe ('#scanl1', () => {
        const unlinkedNodes = alphabetArray.map(char => ({data: char}));

        it ('should return a list of successively reduced values from left to right', () => {
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

        it ('should return an empty list when receiving an empty one', () => {
            expectEqual(scanl1(x => x * 2, []), []);
            expectEqual(scanl1(x => x + 2, ''), []);
        });
    });

    describe ('#scanr', () => {
        const unlinkedNodes = alphabetArray.map(char => ({data: char}));

        it ('should return a list of successively reduced values from left to right', () => {
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

        it ('should return an empty list when receiving an empty one', () => {
            expectEqual(scanr(x => x * 2, 99, []), []);
            expectEqual(scanr(x => x + 2, '99', ''), []);
        });
    });

    describe ('#scanr1', () => {
        const unlinkedNodes = alphabetArray.map(char => ({data: char}));

        it ('should return a list of successively reduced values from left to right', () => {
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

        it ('should return an empty list when receiving an empty one', () => {
            expectEqual(scanr1(x => x * 2, []), []);
            expectEqual(scanr1(x => x + 2, ''), []);
        });
    });

    describe ('#lcaseFirst', () => {
        it ('should return passed in non-empty string with first alpha char toUpperCase', () => {
           expect(lcaseFirst('ABC')).toEqual('aBC');
        });
        it ('should return given non-empty string if it cannot be operated on;  Non-alpha char at index `0` or "empty string"', () => {
            expect(lcaseFirst('$$ABC')).toEqual('$$ABC');
        });
        it ('should throw an error when receiving an empty-string or any value that is not a string', () => {
            [null, undefined, [], {}]
                .forEach(xs =>
                    expectError(() => lcaseFirst(xs))
                );
        });
    });

    describe ('#ucaseFirst', () => {
        it ('should return passed in non-empty string with first alpha char toUpperCase', () => {
           expect(ucaseFirst('abc')).toEqual('Abc');
        });
        it ('should return given non-empty string if it cannot be operated on;  Non-alpha char at index `0` or "empty string"', () => {
            expect(ucaseFirst('$$abc')).toEqual('$$abc');
        });
        it ('should throw an error when receiving an empty-string or any value that is not a string', () => {
            [null, undefined, [], {}]
                .forEach(xs =>
                    expectError(() => ucaseFirst(xs))
                );
        });
    });

    describe ('#camelCase', () => {
        it ('should return a "camel-cased" version of passed in non-empty string', () => {
            [
                ['all-your-base', 'AllYourBase'],
                ['ALL-YOUR-BASE', 'AllYourBase'],
                ['$$abc', 'Abc']
            ]
                .forEach(([given, expected]) => {
                    expect(camelCase(given)).toEqual(expected);
                });
        });
        it ('should throw an error when receiving an empty-string or any value that is not a string', () => {
            [null, undefined, [], {}]
                .forEach(xs =>
                    expectError(() => camelCase(xs))
                );
        });
    });
    
    describe ('#classCase', () => {
        it ('should return a "camel-cased" version of passed in non-empty string', () => {
            [
                ['all-your-base', 'AllYourBase'],
                ['ALL-YOUR-BASE', 'AllYourBase'],
                ['$$abc', 'Abc']
            ]
                .forEach(([given, expected]) => {
                    expect(classCase(given)).toEqual(expected);
                });
        });
        it ('should throw an error when receiving an empty-string or any value that is not a string', () => {
            [null, undefined, [], {}]
                .forEach(xs =>
                    expectError(() => classCase(xs))
                );
        });
    });

    describe ('#range', () => {
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

        it ('should be able to return a forward range (with and without `step`)', () => {
            checkRanges([
                [range(0, 9), zeroToNine],
                [range(-9, 0), negativeNineToZero],
                [range(0, 9, 1), zeroToNine],
                [range(-9, 0, 1), negativeNineToZero]
            ]);
        });
        it ('should be able to return a negative (with and without `step`', () => {
            checkRanges([
                [range(9, 0), nineToZero],
                [range(0, -9), zeroToNegativeNine],
                [range(9, 0, -1), nineToZero],
                [range(0, -9, -1), zeroToNegativeNine]
            ]);
        });
        it ('should still return a valid range even when range is unreachable given `step` (step gets normalized)', () => {
            checkRanges([
                [range(9, 0, 1), nineToZero],
                [range(0, -9, 1), zeroToNegativeNine],
                [range(-9, 0, -1), negativeNineToZero]
            ]);
        });
    });

    describe ('#forEach', () => {
        it ('requires more tests');
    });
});
