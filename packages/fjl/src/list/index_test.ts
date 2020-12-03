import {intersect} from "./intersect";
import {
  __,
  alphabetArray,
  alphabetString, equal,
  expectEqual,
  expectError,
  expectFalse,
  expectLength,
  expectTrue, generalEqualityCheck, genericOrdering, LinkedListNode, linkedListToList, vowelsArray, vowelsString
} from "../../tests/helpers";
import {
  all, and, append, concatMap, drop, findIndex, foldl, groupBy, head,
  init,
  inits, insertBy, intercalate, intersectBy, isInfixOf, isPrefixOf,
  isSubsequenceOf,
  isSuffixOf, minimum, notElem, nub, nubBy, or, product, range, remove,
  removeBy, removeFirstsBy,
  scanl, scanl1,
  scanr, scanr1, sort,
  sortOn, splitAt, stripPrefix, sum, tail, tails, take,
  unfoldr, union, unionBy,
  unzipN,
  zip, zipN, zipWith
} from "./index";
import {SliceOf} from "../platform/slice";
import {camelCase, classCase, lcaseFirst, lines, ucaseFirst, unlines, unwords, words} from "../string";
import {isTruthy} from "../boolean";
import {compose, negateF2} from "../function";

describe('#all', () => {
  // @todo tablelize tests here
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

describe('#and', () => {
  // @todo tabelize tests here
  it('should return `true` when all items of a container are "truthy".', () => {
    expectTrue(and(['a', 1, 99, true, ((): void => undefined), {}, []]));
  });
  it('should return `false` when not all items of a container are "truthy".', () => {
    expectFalse(and(['a', 1, 0, true, ((): void => undefined), {}, []]));
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

describe('#any', () => {
  // @todo tabelize tests here
  const id = (x: any): any => x;
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

describe('#append', () => {
  it('should be a function', () => {
    expect(append).toBeInstanceOf(Function);
  });

  (<Array<[string, SliceOf<string>[], SliceOf<string>]>>[
    [`append [vowelsArray, vowelsArray, vowelsArray] ` +
    `shallowEquals vowelsArray.concat(vowelsArray, vowelsArray)`,
      [vowelsArray, vowelsArray, vowelsArray],
      vowelsArray.concat(vowelsArray, vowelsArray)
    ],
    [`append [vowels, vowels, vowels] === vowels + vowels + vowels)`,
      [vowelsString, vowelsString, vowelsString],
      vowelsString + vowelsString + vowelsString
    ],
    [`append [vowels, vowels] === vowels + vowels)`,
      [vowelsString, vowelsString],
      vowelsString + vowelsString
    ],
    [`append vowelsArray shallowEquals vowelsArray.join('')`,
      vowelsArray, vowelsArray.join('')
    ],
    [`append [[], vowelsArray] shallowEquals vowelsArray`,
      [[], vowelsArray], vowelsArray
    ],
    [`append [vowelsArray, []] shallowEquals vowelsArray`,
      [vowelsArray, []], vowelsArray
    ],
    [`append [vowels, ''] === vowels`,
      [vowelsString, ''], vowelsString
    ],
    [`append ['', vowels] === vowels`,
      ['', vowelsString], vowelsString
    ],
    [`append [[], []] shallowEquals []`,
      [[], []], []
    ],
    [`append ['', ''] === ''`,
      ['', ''], ''
    ]
  ])
    .forEach(([name, args, expected]) => {
      it(name, () => {
        // console.log(args);
        const result = append(...args);
        expect(result).toEqual(expected);
      });
    });

  it('should throw an error when receiving Nothing', () => {
    (<SliceOf<any>[]>[[null, null],
      [undefined, undefined],
      [null, []],
      [null, ''],
      [undefined, []],
      [undefined, ''],
      [[], null],
      ['', null],
      [[], undefined],
      ['', undefined]
    ])
      .forEach(args => {
        expectError(() => {
          append(...args);
        });
      });
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

describe('#intersect', () => {
  it('should return an empty list when either of the first, second ' +
    'or both params passed in are empty arrays, or falsy values', () => {
    (<[any[], any[]][]>[
      [[[], [1, 2, 3]], []],
      [[null, null], []],
      [[undefined, undefined], []],
      [['', ''], []],
      [['abc', ''], []],
      [['abc', null], []],
      [[null, 'abc'], []]
    ])
      .forEach(([args, expected]) => {
        expect(intersect(...args)).toEqual(expected);
      });
  });

  it('should return an intersection of the two arrays passed in', () => {
    (<[number[], number[], number, number[]][]>[
      // subj1, subj2, expectLen, expectedElements
      [[1, 2, 3], [1, 2, 3, 4, 5], 3, [1, 2, 3]],
      [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 3, [1, 2, 3]],
      [[1, 2, 3, 4, 5], [1, 2, 3], 3, [1, 2, 3]]
    ])
      .forEach(testCase => {
        const [subj1, subj2, expectedLen, expectedElms] = testCase,
          result = intersect(subj1, subj2) as any[];
        expect(result.length).toEqual(expectedLen);
        result.forEach((elm, ind) => {
          expect(elm).toEqual(expectedElms[ind]);
        });
      });
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

describe('#tails', () => {
  it('should unfold a list into list of all possible ' +
    'non-omitting sequential sets that start with the last item', () => {
    const limit = length(alphabetString);
    expectTrue(all(
      (item, ind: number) => {
        const headOfLast = head(item);
        return length(item) ? length(item) === limit - ind &&
          headOfLast === alphabetString[ind] : true;
      },
      tails(alphabetString)
    ));
    expectTrue(all(
      (item, ind: number) => {
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

describe('#insertBy', () => {
  const injectValueAtIndex = (x, ind, list) => {
      if (ind <= 0) {
        return [x].concat(list);
      } else if (ind > list.length - 1) {
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
  const unlinkedNodes: Array<{ data: string }> = alphabetArray.map(char => ({data: char}));

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
