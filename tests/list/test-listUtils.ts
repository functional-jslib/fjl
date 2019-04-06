/**
 * @todo Make sure we've written tests for both strings and arrays (and arrays of each (where required)).
 */

import {
    sliceCopy, sliceFrom, sliceTo, genericAscOrdering, lengths,
    toShortest, reduceUntil, reduceUntilRight, reduce, reduceRight,
    lastIndex, findIndexWhere, findIndexWhereRight, findIndicesWhere, findWhere
}
from '../../src/list/utils';

import {
    expectEqual,
    expectFunction,
    expectError,
    alphabetString,
    alphabetArray,
    alphabetLen,
    vowelsString,
    vowelsArray,
    vowelsLen,
    vowelIndices,
    falsyList
}
from '../helpers';

describe ('#listUtils', () => {
    describe('#sliceFrom', () => {
        it ('should be curried', () => {
            vowelsArray
                .map((_, ind) => sliceFrom(ind))
                .forEach((fn, ind) => {
                    const result = fn(vowelsArray);
                    // Compare slices
                    expect(result).toEqual(vowelsArray.slice(ind, vowelsArray.length)); // deep equal

                    // Compare lengths (calculated)
                    expect(vowelsArray.length - ind).toEqual(result.length);
                });
        });
        it ('should create a slice of an array "from" given index.', () => {
            alphabetArray.forEach((_, ind, list) => {
                const result = sliceFrom(ind, list);

                // Compare slices
                expect(result).toEqual(list.slice(ind, list.length)); // deep equal

                // Compare lengths (calculated)
                expect(alphabetArray.length - ind).toEqual(result.length);
            });
        });
        it ('should return an empty slice when given an empty slice', () => {
           expect(sliceFrom(99, [])).toEqual([]);
        });
        it ('should throw an error when not receiving a `ListLike` (a sliceable, an array, and/or string).', () => {
            [null, undefined, {}, false, 0].forEach(x => {
                expect(() => sliceFrom(99, x)).toThrow(Error);
            });
        });
    });
    describe('#sliceTo', () => {
        it ('should create a slice of an array "from" given index.', () => {
            alphabetArray.forEach((_, ind, list) => {
                const result = sliceTo(alphabetLen - ind, list);

                // Compare slices
                expect(result).toEqual(list.slice(0, alphabetLen - ind)); // deep equal

                // Compare lengths (calculated)
                expect(alphabetLen - ind).toEqual(result.length);
            });
        });
        it ('should be curried', () => {
            vowelsArray
                .map((_, ind) => sliceTo(vowelsLen - ind))
                .forEach((fn, ind) => {
                    const result = fn(vowelsArray);

                    // Compare slices
                    expect(result).toEqual(vowelsArray.slice(0, vowelsLen - ind)); // deep equal

                    // Compare lengths (calculated)
                    expect(vowelsLen - ind).toEqual(result.length);
                });
        });
        it ('should return an empty slice when given an empty slice', () => {
            expect(sliceTo(99, [])).toEqual([]);
        });
        it ('should throw an error when not receiving a `ListLike` (a sliceable, an array, and/or string).', () => {
            [null, undefined, {}, false, 0].forEach(x => {
                expect(() => sliceTo(99, x)).toThrow(Error);
            });
        });
    });
    describe('#sliceCopy', () => {
        it('should return a copy of given slice', () => {
            [[], vowelsArray, alphabetArray]
                .map(x => [x, sliceCopy(x)])
                .forEach(([original, result]) => {
                    expect(result).toEqual(original); // deep equal
                    expect(result !== original).toEqual(true); // strict check
                });

            // String variant
            ['', vowelsString, alphabetString]
                .map(x => [x, sliceCopy(x)])
                .forEach(([original, result]) => {
                    expect(result).toEqual(original);
                });
        });
        it ('should throw an error when receiving non `ListLike` value (non-(string|array|slicable))', () => {
            [null, undefined, {}, () => undefined].forEach(x => {
                expect(() => sliceCopy(x)).toThrow(Error);
            });
        });

    });
    describe('#genericAscOrdering', () => {
        it('should return `-1` when ordering of `a` should be less than ordering of `b`', () => {
            vowelsArray.reduceRight((next, curr) => {
                if (!next) {
                    return curr;
                }
                expect(genericAscOrdering(curr, next)).toEqual(-1);
                return curr;
            });

        });
        it('should return `1` when ordering of `a` should be greater than ordering of `b`', () => {
            vowelsArray.reduce((prev, curr) => {
                if (!prev) {
                    return curr;
                }
                expect(genericAscOrdering(curr, prev)).toEqual(1);
                return curr;
            });
        });
        it('should return `0` when ordering of both `a` and `b` are equal', () => {
            vowelsArray.reduce((out, curr) => {
                out.push([curr, curr]);
                return out;
            }, [])
                .forEach(([a, b]) => {
                    expect(genericAscOrdering(a, b)).toEqual(0);
                });
        });
        it ('should be curried', () => {
            vowelsArray.reduce((prev, curr) => {
                if (!prev) {
                    return curr;
                }
                const fn = genericAscOrdering(curr);
                expectFunction(fn);
                expect(fn(prev)).toEqual(1);
                return curr;
            });
        });
    });
    describe('#lengths', () => {
        const lists = [
                vowelsArray, vowelsString,
                alphabetArray, alphabetString,
                [], '',
            ],
            result = lengths(...lists);
        it('should return an array containing same number of items given', () => {
            expect(result.length).toEqual(lists.length);
        });
        it('should return the lengths of all given lists', () => {
            result.forEach((rslt, index) => {
                expect(rslt).toEqual(lists[index].length);
            });
        });
        it('should return `undefined` for items that do not have a length', () => {
            expect(() => lengths(null, undefined, {}));
        });
    });
    describe('#toShortest', () => {
        it('should return a list of lists trimmed to the smallest', () => {
            [
                [vowelsArray, alphabetArray, vowelsLen],
                [vowelsString, alphabetString, vowelsLen],
                ['', [], 0]
            ]
                .forEach(([xs1, xs2, expectedLen]) => {
                    const lists = [xs1, xs2],
                        result = toShortest(...lists);
                    result.forEach((sliced, ind) => {
                        expect(sliced.length).toEqual(expectedLen);
                        expect(sliced).toEqual(lists[ind].slice(0, sliced.length));
                    });
                });
        });
        it('should be curried up to 2 parameters', () => {
            [
                [vowelsArray, alphabetArray, vowelsLen],
                [vowelsString, alphabetString, vowelsLen],
                ['', [], 0]
            ]
                .forEach(([xs1, xs2, expectedLen]) => {
                    const lists = [xs1, xs2],
                        fn = toShortest(xs1),
                        result = fn(xs2);
                    expectFunction(fn);
                    result.forEach((sliced, ind) => {
                        expect(sliced.length).toEqual(expectedLen);
                        expect(sliced).toEqual(lists[ind].slice(0, sliced.length));
                    });
                });
        });
    });
    describe('#reduceUntil', () => {
        it('should reduce entire list when given predicate holds for all items in list', () => {
            // Example: Get map characters to char codes (effectively `map` operation).
            const
                aggregateCharCode = (agg, item) => {
                    agg.push((item + '').charCodeAt(0));
                    return agg;
                },
                isFalsy = x => !x,
                charCodes = reduceUntil(isFalsy, aggregateCharCode, [], alphabetArray);

            // Result length
            expect(charCodes.length).toEqual(alphabetLen);

            // Check results
            charCodes.forEach((x, ind) => {
                expect(String.fromCharCode(x)).toEqual(alphabetArray[ind]);
            });
        });
        it('should reduce list up until given predicate holds for all items in list', () => {
            const source = 'abc#!@#defg',
                predicate = x => !/^[a-z]$/.test(x),
                operation = (agg, item) => agg + item,
                aggregand = '',
                result = reduceUntil(predicate, operation, aggregand, source),
                result2 = reduceUntil(predicate,
                    (agg, item) => { agg.push(item); return agg; },
                    [], source.split('')
                )
            ;
            expect(result).toEqual('abc');
            expect(result2).toEqual(['a', 'b', 'c']);
        });
        it('should return `aggregand` when predicate holds for first item', () => {
            const source = 'abc#!@#defg',
                predicate = x => /^[a-z]$/.test(x),
                operation = (agg, item) => agg + item,
                aggregand = '',
                result = reduceUntil(predicate, operation, aggregand, source),
                result2 = reduceUntil(predicate,
                    (agg, item) => { agg.push(item); return agg; },
                    [], source.split('')
                )
            ;
            expect(result).toEqual('');
            expect(result2).toEqual([]);
        });
        it('should be curried', () => {
            const source = 'abc#!@#defg',
                predicate = x => !/^[a-z]$/.test(x),
                operation = (agg, item) => agg + item,
                aggregand = '',
                reductionFn = reduceUntil(predicate, operation),
                result = reductionFn(aggregand, source),
                reductionFn2 = reduceUntil(predicate,
                    (agg, item) => { agg.push(item); return agg; }),
                result2 = reductionFn2([], source.split(''))
            ;
            // Ensure funcs are functions
            [reductionFn, reductionFn2].forEach(expectFunction);

            // Test results
            expect(result).toEqual('abc');
            expect(result2).toEqual(['a', 'b', 'c']);
        });
    });
    describe('#reduceUntilRight', () => {
        it('should reduce entire list when given predicate holds for all items in list', () => {
            // Example: Get map characters to char codes (effectively `map` operation).
            const

                // Operation to perform
                aggregateCharCode = (agg, item) => {
                    agg.push((item + '').charCodeAt(0));
                    return agg;
                },

                // Predicate to use (run through entire array (as long as...))
                isFalsy = x => !x,

                // Result
                charCodes = reduceUntilRight(isFalsy, aggregateCharCode, [], alphabetArray);

            // Result length
            expect(charCodes.length).toEqual(alphabetLen);

            // Convert char codes back to array of letters (reversed)
            const backToStringArray = charCodes.map(x => String.fromCharCode(x)).reverse();

            // Check results
            expect(backToStringArray).toEqual(alphabetArray);
        });
        it('should reduce list up until given predicate holds for all items in list', () => {
            const source = 'abc#!@#defg',
                predicate = x => !/^[a-z]$/.test(x),
                operation = (agg, item) => agg + item,
                aggregand = '',
                result = reduceUntilRight(predicate, operation, aggregand, source),
                result2 = reduceUntilRight(predicate,
                    (agg, item) => { agg.push(item); return agg; }, [], source.split(''))
            ;
            expect(result).toEqual('gfed');
            expect(result2).toEqual(['g', 'f', 'e', 'd']);
        });
        it('should return `aggregand` when predicate holds for first item in list', () => {
            const source = 'abc#!@#defg',
                predicate = x => /^[a-z]$/.test(x),
                operation = (agg, item) => agg + item,
                aggregand = '',
                result = reduceUntilRight(predicate, operation, aggregand, source),
                result2 = reduceUntilRight(predicate,
                    (agg, item) => { agg.push(item); return agg; }, [], source.split(''))
            ;
            expect(result).toEqual('');
            expect(result2).toEqual([]);
        });
        it('should be curried', () => {
            const source = 'abc#!@#defg',
                predicate = x => !/^[a-z]$/.test(x),
                operation = (agg, item) => agg + item,
                aggregand = '',
                reductionFn = reduceUntilRight(predicate, operation),
                result = reductionFn(aggregand, source),
                reductionFn2 = reduceUntilRight(predicate,
                    (agg, item) => { agg.push(item); return agg; }),
                result2 = reductionFn2([], source.split(''))
            ;
            // Ensure funcs are functions
            [reductionFn, reductionFn2].forEach(expectFunction);

            // Test results
            expect(result).toEqual('gfed');
            expect(result2).toEqual(['g', 'f', 'e', 'd']);
        });
    });
    describe('#reduce', () => {
        it('should reduce entire list', () => {
            // Example: Get map characters to char codes (effectively `map` operation).
            const

                // Operation to perform
                aggregateCharCode = (agg, item) => {
                    agg.push((item + '').charCodeAt(0));
                    return agg;
                },

                // Result
                charCodes = reduce(aggregateCharCode, [], alphabetArray);

            // Result length
            expect(charCodes.length).toEqual(alphabetLen);

            // Check results
            charCodes.forEach((x, ind) => {
                expect(String.fromCharCode(x)).toEqual(alphabetArray[ind]);
            });
        });
        it('should be able to reduce any kind of list (string, or array, etc.)', () => {
            const source = 'abc#!@#defg',
                predicate = x => !/^[a-z]$/.test(x),
                operation = (agg, item) => predicate(item) ? agg : agg + item,
                aggregand = '',
                expectedArr = source.split('').filter(x => !predicate(x)),
                expectedStr = expectedArr.join(''),
                result = reduce(operation, aggregand, source),
                result2 = reduce((agg, item) => {
                        if (predicate(item)) {
                            return agg;
                        }
                        agg.push(item);
                        return agg;
                    },
                    [], source.split('')
                )
            ;
            expect(result).toEqual(expectedStr);
            expect(result2).toEqual(expectedArr);
        });
        it('should be curried', () => {
            const source = 'abc#!@#defg',
                predicate = x => !/^[a-z]$/.test(x),
                operation = (agg, item) => predicate(item) ? agg : agg + item,
                aggregand = '',
                expectedArr = source.split('').filter(x => !predicate(x)),
                expectedStr = expectedArr.join(''),
                reductionFn1 = reduce(operation),
                result = reductionFn1(aggregand, source),
                reductioFn2 = reduce((agg, item) => {
                        if (predicate(item)) {
                            return agg;
                        }
                        agg.push(item);
                        return agg;
                    }),
                result2 = reductioFn2([], source.split(''))
            ;
            [reductionFn1, reductioFn2].forEach(expectFunction);
            expect(result).toEqual(expectedStr);
            expect(result2).toEqual(expectedArr);
        });
        it('should return the `addend` (aggregand) if given list is empty', () => {
            const op = (agg, item) => agg + item;
            [[], ''].forEach(list => {
                falsyList.forEach(x => {
                    expect(reduce(op, x, list)).toEqual(x);
                });
            });
        });
    });
    describe('#reduceRight', () => {
        it('should reduce entire list when given predicate holds for all items in list', () => {
            // Example: Get map characters to char codes (effectively `map` operation).
            const
                aggregateCharCode = (agg, item) => {
                    agg.push((item + '').charCodeAt(0));
                    return agg;
                },
                charCodes = reduceRight(aggregateCharCode, [], alphabetArray);

            // Result length
            expect(charCodes.length).toEqual(alphabetLen);

            // Convert char codes back to array of letters (reversed)
            const backToStringArray = charCodes.map(x => String.fromCharCode(x)).reverse();

            // Check results
            expect(backToStringArray).toEqual(alphabetArray);
        });
        it('should be able to reduce any kind of list (string, or array, etc.)', () => {
            const source = 'abc#!@#defg',
                predicate = x => !/^[a-z]$/.test(x),
                operation = (agg, item) => predicate(item) ? agg : agg + item,
                aggregand = '',
                expectedArr = source.split('').filter(x => !predicate(x)).reverse(),
                expectedStr = expectedArr.join(''),
                result = reduceRight(operation, aggregand, source),
                result2 = reduceRight((agg, item) => {
                        if (predicate(item)) {
                            return agg;
                        }
                        agg.push(item);
                        return agg;
                    },
                    [], source.split('')
                )
            ;
            expect(result).toEqual(expectedStr);
            expect(result2).toEqual(expectedArr);
        });
        it('should be curried', () => {
            const source = 'abc#!@#defg',
                predicate = x => !/^[a-z]$/.test(x),
                operation = (agg, item) => predicate(item) ? agg : agg + item,
                aggregand = '',
                expectedArr = source.split('').filter(x => !predicate(x)).reverse(),
                expectedStr = expectedArr.join(''),
                reductionFn1 = reduceRight(operation),
                result = reductionFn1(aggregand, source),
                reductioFn2 = reduceRight((agg, item) => {
                    if (predicate(item)) {
                        return agg;
                    }
                    agg.push(item);
                    return agg;
                }),
                result2 = reductioFn2([], source.split(''))
            ;
            [reductionFn1, reductioFn2].forEach(expectFunction);
            expect(result).toEqual(expectedStr);
            expect(result2).toEqual(expectedArr);
        });
        it('should return the `addend` (aggregand) if given list is empty', () => {
            const op = (agg, item) => agg + item;
            [[], ''].forEach(list => {
                falsyList.forEach(x => {
                    expect(reduceRight(op, x, list)).toEqual(x);
                });
            });
        });
    });
    describe('#lastIndex', () => {
        it('should return the last index of an array', () => {
            [
                [alphabetArray, alphabetLen],
                [vowelsArray, vowelsLen]
            ].forEach(([list, len]) => {
                expect(lastIndex(list)).toEqual(len - 1);
            });
        });
        it('should return `0` for empty lists', () => {
            ['', []].forEach(x => expectEqual(lastIndex(x), 0));
        });
        it('should throw an error when item is not a `ListLike`', () => {
            [null, undefined, {}].forEach(x => expectError(() => lastIndex(x)));
        });
    });
    describe('#findIndexWhere', () => {
        it ('should return `-1` when item is not found in populated list', () => {
            const nonAlphaList = '!@#$%^&*()_+'.split('');
            ['a', 'b', 'c'].forEach(char => {
                const result = findIndexWhere(x => x === char, nonAlphaList);
                expectEqual(result, -1);
            });
        });
        it ('should return "found" index when predicate is matched on populated list', () => {
            vowelsArray.map(char => findIndexWhere(x => x === char, alphabetString))
                .forEach((x, ind) => {
                    expectEqual(x, vowelIndices[ind]);
                });
        });
        it('should return `-1` when operating on empty list', () => {
            ['', []].forEach(xs => {
                expectEqual(findIndexWhere(x => !!x, xs), -1);
            });
        });
        it('should throw an error when operating on non-ListLike items.', () => {
            [null, undefined, {}].forEach(xs => {
                expectError(() => findIndexWhere(x => !!x, xs));
            });
        });
    });
    describe('#findIndexWhereRight', () => {
        it ('should return `-1` when item is not found in populated list', () => {
            const nonAlphaList = '!@#$%^&*()_+'.split('');
            ['a', 'b', 'c'].forEach(char => {
                const result = findIndexWhereRight(x => x === char, nonAlphaList);
                expectEqual(result, -1);
            });
        });
        it ('should return "found" index when predicate is matched on populated list', () => {
            expectEqual(
                vowelsArray.map(char => findIndexWhereRight(x => x === char, alphabetString)),
                vowelIndices
            );
        });
        it('should return `-1` when operating on empty list', () => {
            ['', []].forEach(xs => {
                expectEqual(findIndexWhereRight(x => !!x, xs), -1);
            });
        });
        it('should throw an error when operating on non-ListLike items.', () => {
            [null, undefined, {}].forEach(xs => {
                expectError(() => findIndexWhereRight(x => !!x, xs));
            });
        });
    });
    describe('#findIndicesWhere', () => {
        it ('should return `undefined` when predicate is not matched', () => {
            const nonAlphaList = '!@#$%^&*()_+'.split('');
            ['a', 'b', 'c'].forEach(char => {
                const result = findIndicesWhere(x => x === char, nonAlphaList);
                expectEqual(result, undefined);
            });
        });
        it ('should return "found" indices when predicate is matched on populated list', () => {
            const foundIndices = [].concat(
                ...vowelsArray.map(char => findIndicesWhere(x => x === char, alphabetString))
            );
            expectEqual(foundIndices, vowelIndices);
        });
        it('should return `undefined` when operating on empty list', () => {
            ['', []].forEach(xs => {
                expectEqual(findIndicesWhere(x => !!x, xs), undefined);
            });
        });
        it('should throw an error when operating on non-ListLike items.', () => {
            [null, undefined, {}].forEach(xs => {
                expectError(() => findIndicesWhere(x => !!x, xs));
            });
        });
    });
    describe('#findWhere', () => {
        it ('should return `undefined` when predicate is not matched', () => {
            const nonAlphaList = '!@#$%^&*()_+'.split('');
            ['a', 'b', 'c'].forEach(char => {
                const result = findWhere(x => x === char, nonAlphaList);
                expectEqual(result, undefined);
            });
        });
        it ('should return "found" indices when predicate is matched on populated list', () => {
            vowelsArray.map(char => findWhere(x => x === char, alphabetString))
                .forEach((x, ind) => {
                    expectEqual(x, vowelsArray[ind]);
                });
        });
        it('should return `undefined` when operating on empty list', () => {
            ['', []].forEach(xs => {
                expectEqual(findWhere(x => !!x, xs), undefined);
            });
        });
        it('should throw an error when operating on non-ListLike items.', () => {
            [null, undefined, {}].forEach(xs => {
                expectError(() => findWhere(x => !!x, xs));
            });
        });
    });
});
