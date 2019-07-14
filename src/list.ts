/**
 * ListLike operations module.
 * @module list
 * @todo add tests for 'iterate' and 'repeat'
 */
import {indexOf, slice, includes} from './jsPlatform/list';
import {apply} from './jsPlatform/function';
import {length} from './jsPlatform/object';
import {negateF2} from './function/negate';
import {curry, curry2, curry3} from './function/curry';
import {isTruthy, isFalsy} from './boolean';
import {of} from './object/of';

// List methods
// ----
import {map} from './list/map';
import {append} from './list/append';
import {head} from './list/head';
import {last} from './list/last';
import {tail} from './list/tail';
import {init} from './list/init';
import {uncons} from './list/uncons';
import {unconsr} from './list/unconsr';
import {concat} from './list/concat';
import {concatMap} from './list/concatMap';
import {reverse} from './list/reverse';
import {intersperse} from './list/intersperse';
import {intercalate} from './list/intercalate';
import {transpose} from './list/transpose';
import {take} from './list/take';
import {filter} from './list/filter';
import {maximum} from './list/maximum';
import {sortBy} from './list/sortBy';
import {subsequences} from './list/subsequence';
import {permutations} from './list/permutations';
import {iterate} from './list/iterate';
import {repeat} from './list/repeat';
import {foldl} from './list/foldl';
import {foldl1} from './list/foldl1';
import {foldr} from './list/foldr';
import {foldr1} from './list/foldr1';
import {mapAccumL} from './list/mapAccumL';
import {mapAccumR} from './list/mapAccumR';
import {replicate} from './list/replicate';
import {cycle} from './list/cycle';
import {unfoldr} from './list/unfoldr';
import {findIndex} from './list/findIndex';
import {findIndices} from './list/findIndices';
import {elemIndex} from './list/elemIndex';
import {elemIndices} from './list/elemIndices';
import {drop} from './list/drop';
import {splitAt} from './list/splitAt';
import {takeWhile} from './list/takeWhile';
import {dropWhile} from './list/dropWhile';
import {dropWhileEnd} from './list/dropWhileEnd';
import {push} from './list/push';
import {pushMany} from './list/pushMany';
import {span} from './list/span';
import {breakOnList} from './list/breakOnList';
import {at} from "./list/at";
import {find} from "./list/find";
import {forEach} from "./list/forEach";
import {partition} from "./list/partition";
import {elem} from "./list/elem";

// List method helpers
// ----
import {
    sliceTo, toShortest, reduce, sliceCopy, genericAscOrdering
}
    from './list/utils';

// List method exports
// ----
export {
    append, head, last, tail, init, uncons, unconsr,
    push, pushMany, concat, concatMap, length, map,
    reverse, intersperse, intercalate, transpose, filter,
    maximum, sortBy, take, subsequences, permutations,
    foldl, foldl1, foldr, foldr1, mapAccumL, mapAccumR,
    iterate, repeat, replicate, cycle, unfoldr,
    findIndex, findIndices, elemIndex, elemIndices,
    drop, splitAt, takeWhile, dropWhile, dropWhileEnd, span,
    breakOnList, at, find, forEach, partition, elem,
};

export {slice, includes, indexOf, lastIndexOf} from './jsPlatform';
export * from './list/range';
export * from './list/utils';

export const

    /**
     * The opposite of `elem` - Returns a boolean indicating whether an element exists in given list.
     * @function module:list.notElem
     * @param element {*}
     * @param xs {Array}
     * @returns {Boolean}
     */
    notElem = negateF2(includes),

    /**
     * Checks if list `xs1` is a prefix of list `xs2`
     * @function module:list.isPrefixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    isPrefixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = 0;
        for (; ind < limit1; ind++) {
            if (xs1[ind] !== xs2[ind]) {
                return false;
            }
        }
        return true;
    }),

    /**
     * Checks if list `xs1` is a suffix of list `xs2`
     * @function module:list.isSuffixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    isSuffixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind1 = limit1 - 1,
            ind2 = limit2 - 1;
        for (; ind1 >= 0; ind1--) {
            if (xs1[ind1] !== xs2[ind2]) {
                return false;
            }
            ind2 -= 1;
        }
        return true;
    }),

    /**
     * Checks if list `xs1` is an infix of list `xs2`
     * @function module:list.isInfixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    isInfixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2) {
            return false;
        }
        let ind1,
            foundLen,
            ind = 0;
        for (; ind < limit2; ind += 1) {
            foundLen = 0;
            for (ind1 = 0; ind1 < limit1; ind1 += 1) {
                if (xs2[ind1 + ind] === xs1[ind1]) {
                    foundLen += 1;
                }
                if (foundLen === limit1) {
                    return true;
                }
            }
        }
        return false;
    }),

    /**
     * Checks if list `xs1` is a sub-sequence of list `xs2`
     * @function module:list.isSubsequenceOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    isSubsequenceOf = curry((xs1, xs2) => {
        const len = Math.pow(2, length(xs2)),
            lenXs1 = length(xs1);
        let foundLen,
            i;
        for (i = 0; i < len; i += 1) {
            foundLen = 0;
            for (let j = 0; j < len; j += 1) {
                if (i & (1 << j) && indexOf(xs2[j], xs1) > -1) {
                    foundLen += 1;
                }
                if (foundLen === lenXs1) {
                    return true;
                }
            }
        }
        return false;
    }),

    /**
     * The group function takes a list and returns a list of lists such that
     *  the concatenation of the result is equal to the argument. Moreover, each
     *  sublist in the result contains only equal elements. For example,
     * `group "Mississippi" = ["M","i","ss","i","ss","i","pp","i"]`
     * It is a special case of groupBy, which allows the programmer to supply
     *  their own equality test.
     * @haskellType `group :: Eq a => [a] -> [[a]]`
     * @function module:list.group
     * @param xs {Array|String}
     * @returns {Array<Array|String|*>|*}
     */
    group = xs => groupBy((a, b) => a === b, xs),

    /**
     * Allows you to group items in a list based on your supplied equality check.
     * @note Sames `group` but allows you to specify equality operation.
     * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
     * @function module:list.groupBy
     * @param equalityOp {Function}
     * @param xs {Array}
     * @returns {*}
     */
    groupBy = curry((equalityOp, xs) => {
        const limit = length(xs);
        if (!limit) {
            return sliceCopy(xs);
        }
        let ind = 0,
            prevItem,
            item,
            predOp = x => {
                if (equalityOp(x, prevItem)) {
                    ind++;
                }
                if (equalityOp(x, item)) {
                    prevItem = x;
                    return true;
                }
                return false;
            },
            agg: [any[]] | any[] = [];
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(takeWhile(predOp, slice(ind, limit, xs)));
        }
        return agg;
    }),

    /**
     * The inits function returns all initial segments of the argument, shortest first. For example,
     * ```
     * shallowEquals(inits('abc'), ['','a','ab','abc'])
     * ```
     * @function module:list.inits
     * @haskellType `inits :: [a] -> [[a]]`
     * @param xs {Array}
     * @returns {Array}
     */
    inits = xs => {
        let limit = length(xs),
            ind = 0,
            agg: [any[]] | any[] = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push(sliceTo(ind, xs));
        }
        return agg;
    }, //map(list => init(list), xs),

    /**
     * The inits function returns all initial segments of the argument, shortest first. For example,
     * ```
     * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
     * ```
     * @function module:list.tails
     * @haskellType `tails :: [a] -> [[a]]`
     * @param xs {Array}
     * @returns {Array}
     */
    tails = xs => {
        let limit = length(xs),
            ind = 0,
            agg: [any[]] | any[] = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push(slice(ind, limit, xs));
        }
        return agg;
    }, //map(list => tail(list), xs),

    /**
     * Strips prefix list from given list
     * @function module:list.stripPrefix
     * @param prefix {Array|String|*}
     * @param list {Array|fjl.ts.ts|*}
     * @returns {Array|*}
     */
    stripPrefix = curry((prefix, list) =>
        isPrefixOf(prefix, list) ?
            splitAt(length(prefix), list)[1] :
            sliceCopy(list)),

    /**
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
     * @function module:list.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = curry((arr1, arr2) => {
        if (!length(arr1) || !length(arr2)) {
            return [];
        }
        const [a1, a2] = toShortest(arr1, arr2);
        return reduce((agg, item, ind) => push(agg, [item, a2[ind]]),
            [], a1);
    }),

    /**
     * zipN takes one or more lists and returns a list containing lists of all indices
     * at a given index, index by index.
     * If one input list is short, excess elements of the longer list are discarded.
     * @function module:list.zipN
     * @param lists {Array|String} - One ore more lists of the same type.
     * @returns {Array}
     */
    zipN = curry2((...lists) => {
        const trimmedLists = apply(toShortest, lists);
        return reduce((agg, item, ind) =>
                push(agg, map(xs => xs[ind], trimmedLists)),
            [], trimmedLists[0]);
    }),

    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
     * @function module:list.zip3
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip3 = curry((arr1, arr2, arr3) => zipN(arr1, arr2, arr3)),

    /**
     * @haskellType `zip4 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
     * @function module:list.zip4
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip4 = curry((arr1, arr2, arr3, arr4) => zipN(arr1, arr2, arr3, arr4)),

    /**
     * @haskellType `zip5 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
     * @function module:list.zip5
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @param arr5 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip5 = curry((arr1, arr2, arr3, arr4, arr5) => zipN(arr1, arr2, arr3, arr4, arr5)),

    /**
     * zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
     * zipWith generalises zip by zipping with the function given as the
     * first argument, instead of a function tupling function (function that returns a tuple). For example,
     * zipWith (+) is applied to two lists to produce the list of corresponding sums.
     * @note `_|_` means bottom or perpetual (@see
     *  - https://wiki.haskell.org/Bottom
     *  - https://stackoverflow.com/questions/19794681/what-does-this-syntax-mean-in-haskell-or
     *  )
     * @example
     * ```
     * zipWith f [] _|_ = []
     * ```
     * @haskellType `zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]`
     * @function module:list.zipWith
     * @param op {Function} - Takes two parts of a tuple and returns a tuple.
     *  E.g., ` op :: a -> b -> (a, b)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWith = curry((op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) {
            return [];
        }
        const [a1, a2] = toShortest(xs1, xs2);
        return reduce((agg, item, ind) =>
                push(agg, op(item, a2[ind])),
            [], a1);
    }),

    /**
     * Zips all given lists with tupling function. Note: Haskell types do not have
     *  a way (that I know of) to show one or more for params in a function so `@haskellType` below
     *  is left there for general purpose not for exactness as is told by aforementioned.
     * @haskellType `zipWithN :: (a -> b -> c) -> [a] -> [b] -> [c]` - Where `N` is the number
     *  of lists to zip.
     * @function module:list.zipWithN
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param lists ...{Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWithN = curry3((op, ...lists) => {
        const trimmedLists = apply(toShortest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind) =>
                push(agg, apply(op, map(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    }),

    /**
     * Zips 3 lists with tupling function.
     * @haskellType `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
     * @function module:list.zipWith3
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @param xs3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWith3 = curry((op, xs1, xs2, xs3) => zipWithN(op, xs1, xs2, xs3)),

    /**
     * Zips 4 lists with tupling function.
     * @haskellType `zipWith4 :: (a -> b -> c -> d -> e) -> [a] -> [b] -> [c]  -> [d] -> [e]`
     * @function module:list.zipWith4
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> d -> (a, b, c, d)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @param xs3 {Array}
     * @param xs4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWith4 = curry((op, xs1, xs2, xs3, xs4) => zipWithN(op, xs1, xs2, xs3, xs4)),

    /**
     * Zips 5 lists.
     * @haskellType `zipWith5 :: (a -> b -> c -> d -> e -> f) -> [a] -> [b] -> [c]  -> [d] -> [e] -> [f]`
     * @function module:list.zipWith5
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> d -> e -> (a, b, c, d, e)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @param xs3 {Array}
     * @param xs4 {Array}
     * @param xs5 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWith5 = curry((op, xs1, xs2, xs3, xs4, xs5) => zipWithN(op, xs1, xs2, xs3, xs4, xs5)),

    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
     * @function module:list.unzip
     * @param arr {Array|*}
     * @returns {Array|*}
     */
    unzip = arr => {
        if (!arr) {
            throw new Error(`\`unzip\` expects a value.  Received ${JSON.stringify(arr)}`);
        }
        return foldl((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr);
    },

    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @sudoHaskellType `unzipN :: [(a, b, ...x)] -> ([a], [b], ...[x])`
     * @function module:list.unzipN
     * @param list {Array|*} - ListLike of tuples (lists).
     * @returns {Array|*}
     */
    unzipN = list => {
        if (!list) {
            throw new Error(`\`unzipN\` expects a value.  Received ${JSON.stringify(list)}`);
        }
        if (!length(list)) {
            return [];
        }
        const lenItem0 = length(list[0]);
        let zero = lenItem0 ?
            unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) :
            [];
        return foldl((agg, item) => {
            agg.forEach((outList, ind) => outList.push(item[ind]));
            return agg;
        }, zero, list);
    },

    /**
     * Returns true if any item in container passes predicate `p`.
     * @function module:list.any
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    any = curry((p, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) {
            return false;
        }
        for (; ind < limit; ind += 1) {
            if (p(xs[ind])) {
                return true;
            }
        }
        return false;
    }),

    /**
     * Returns true if all items in container pass predicate `p`.
     * @function module:list.all
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    all = curry((p, xs) => {
        const limit = length(xs);
        let ind = 0;
        if (!limit) {
            return false;
        }
        for (; ind < limit; ind++) {
            if (!p(xs[ind], ind, xs)) {
                return false;
            }
        }
        return true;
    }),

    /**
     * Conjuction of container of bools (or truthy and/or falsy values);  Returns
     * `true` if all in container are 'truthy' else returns `false`
     * @function module:list.and
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    and = xs => all(isTruthy, xs),

    /**
     * Returns a boolean indicating whether any item in container is 'truthy' or not.
     * **Note** The haskell type for this function only takes two items, but here
     * we allow the passing of more than one item (may change later to adhere to the haskell type).
     * @function module:list.or
     * @haskellType `or :: Bool -> Bool -> Bool`
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    or = xs => any(isTruthy, xs),

    /**
     * Returns a boolean indicating whether all items in container are 'falsy' or not.
     * **Note** The haskell type for this function only takes two items, but here
     * we allow the passing of more than one item (may change later to adhere to the haskell type).
     * @function module:list.not
     * @haskellType `not :: Bool -> Bool`
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    not = xs => all(isFalsy, xs),

    /**
     * Computes the sum of the numbers of a structure.
     * @function module:list.sum
     * @haskellType `sum :: (ListLike t, Num a) => t a -> a`
     * @param list {Array|String}
     * @returns {Number}
     */
    sum = list => foldl((agg, x) => agg + x, 0, list),

    /**
     * Computes the product of the numbers of a structure.
     * @function module:list.product
     * @haskellType `product :: (ListLike t, Num a) => t a -> a`
     * @param list {Array|String}
     * @returns {Number}
     */
    product = list => foldl((agg, x) => agg * x, 1, list),

    /**
     * Returns the smallest element in a non-empty structure of elements.
     * @function module:list.minimum
     * @haskellType `minimum :: forall a . Ord a => t a -> a`
     * @param list {Array|String}
     * @returns {*} - Whatever type the array is made of (if any).
     */
    minimum = list => head(sortBy(genericAscOrdering, list)),

    /**
     * scanl is similar to foldl, but returns a list of successive reduced values from the left:
     * ```
     * scanl f z [x1, x2, ...] == [z, z `f` x1, (z `f` x1) `f` x2, ...]
     * ```
     * Also note that:
     * ```
     * last (scanl f z xs) == foldl f z xs.
     * ```
     * @function module:list.scanl
     * @param fn {Function}
     * @param zero {*}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanl = curry((fn, zero, xs) => {
        if (!xs || !length(xs)) {
            return [];
        }
        const limit = length(xs);
        let ind = 0,
            result = zero,
            out: any[] = [];
        while (ind < limit) {
            result = fn(result, xs[ind], ind, xs);
            out.push(result);
            ind++;
        }
        return out;
    }),

    /**
     * `scanl1` is a variant of `scanl` that has no starting value argument:
     * `shallowCompare(scanl1(fn, [x1, x2, ...]), [x1, fn(x1, x2), ...]) // true`
     * @function module:list.scanl1
     * @param fn {Function}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanl1 = curry((fn, xs) => {
        if (!xs || !xs.length) {
            return [];
        }
        return scanl(fn, head(xs), tail(xs));
    }),

    /**
     * Same as `scanl` but from the right (similiar to `foldr`'s relationship to 'foldl').
     * Note also `scanr`'s relationship ot `foldr`:
     * `head (scanr(fn, z, xs)) === foldr(fn, z, xs).
     * @function module:list.scanr
     * @param fn {Function}
     * @param zero {*}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanr = curry((fn, zero, xs) => {
        if (!xs || !length(xs)) {
            return [];
        }
        const limit = length(xs);
        let ind = limit - 1,
            result = xs[0],
            out: any[] = [];
        while (ind > -1) {
            result = fn(result, xs[ind], ind, xs);
            out.push(result);
            ind--;
        }
        return out;
    }),

    /**
     * Same as `scanr` but takes no zero/accumulator value.
     * @function module:list.scanr1
     * @param fn {Function}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanr1 = curry((fn, xs) => {
        if (!xs || !xs.length) {
            return [];
        }
        return scanr(fn, last(xs), init(xs));
    }),

    /**
     * The nub function removes duplicate elements from a list.
     * In particular, it keeps only the first occurrence of each element.
     * (The name nub means `essence'.) It is a special case of nubBy, which
     * allows the programmer to supply their own equality test.
     * ```shallowCompare( nub ([1,2,3,4,3,2,1,2,4,3,5]), [1,2,3,4,5] )```
     * @function module:list.nub
     * @param list {Array|String|*}
     * @returns {Array}
     */
    nub = list => nubBy((a, b) => a === b, list),

    /**
     * `remove(x, xs)` removes the first occurrence of `x` from `xs`.
     * For example, `remove('a', 'banana') === 'bnana';`
     * @function module:list.remove
     * @param x {*}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    remove = curry((x, list) => removeBy((a, b) => a === b, x, list)),

    /**
     * The sort function implements a stable sorting algorithm.
     * It is a special case of sortBy, which allows the programmer
     * to supply their own comparison function.
     * ```shallowCompare(sort ([1,6,4,3,2,5]), [1,2,3,4,5,6]) // true```
     * @function module:list.sort
     * @param xs {Array|String|*}
     * @returns {Array}
     */
    sort = xs => sortBy(genericAscOrdering, xs),

    /**
     * Sort a list by comparing the results of a key function applied to each
     * element. sortOn f is equivalent to sortBy (comparing f), but has the
     * performance advantage of only evaluating f once for each element in the
     * input list. This is called the decorate-sort-undecorate paradigm, or
     * Schwartzian transform.
     *
     * Elements are arranged from from lowest to highest, keeping duplicates
     * in the order they appeared in the input.
     *
     * Ex:
     * ```
     * shallowEquals(
     *  sortOn (head, [[2, "world"], [4, "!"], [1, "Hello"]]),
     *  [[1,"Hello"],[2,"world"],[4,"!"]]
     * ) // true
     * ```
     * @function module:list.sortOn
     * @param valueFn {Function}
     * @param xs {Array|String|*}
     * @returns {Array}
     */
    sortOn = curry((valueFn, xs) =>

        // Un-decorate
        map(decorated => decorated[1],

            // Decorate and sort
            sortBy(
                // Ordering
                ([a0], [b0]) => genericAscOrdering(a0, b0),

                // Decorate
                map(item => [valueFn(item), item], xs)
            )
        )
    ),

    /**
     * The insert function takes an element and a list and inserts the element
     * into the list at the first position where it is less than or equal to the
     * next element. In particular, if the list is sorted before the call, the
     * result will also be sorted. It is a special case of insertBy, which allows
     * the programmer to supply their own comparison function.
     * @function module:list.insert
     * @param x {*}
     * @param xs {Array|*}
     * @returns {Array}
     */
    insert = curry((x, xs) => {
        if (!xs.length) {
            return of(xs, x);
        }
        const foundIndex = findIndex(item => x <= item, xs);
        return foundIndex === -1 ? concat([xs, of(xs, x)]) :
            concat(intersperse(of(xs, x), splitAt(foundIndex, xs)));
    }),

    /**
     * A version of `insert` that allows you to specify the ordering of the inserted
     * item;  Before/at, or after
     * @function module:list.insertBy
     * @haskellType `insertBy :: (a -> a -> Ordering) -> a -> [a] -> [a]`
     * @note `Ordering` means 'something that is order-able'
     *  operated on by this functions logic.
     * @param orderingFn {Function} - A function that returns `-1`, `0`, or 1`.
     * @param x {*} - Value to insert.
     * @param xs {Array} - ListLike to insert into (note new list is returned)
     * @returns {Array} - New list.
     */
    insertBy = curry((orderingFn, x, xs) => {
        const limit = length(xs);
        if (!limit) {
            return [x];
        }
        let ind = 0;
        for (; ind < limit; ind += 1) {
            if (orderingFn(x, xs[ind]) <= 0) {
                const parts = splitAt(ind, xs);
                return concat([parts[0], [x], parts[1]]);
            }
        }
        return push(sliceCopy(xs), x);
    }),

    /**
     * The nubBy function behaves just like nub, except it uses a user-supplied equality predicate.
     * @function module:list.nubBy
     * @param pred {Function}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    nubBy = curry((pred, list) => {
        if (!length(list)) {
            return [];
        }
        const limit = length(list);
        let ind = 0,
            currItem,
            out: any[] = [],
            anyOp = storedItem => pred(currItem, storedItem);
        for (; ind < limit; ind += 1) {
            currItem = list[ind];
            if (any(anyOp, out)) {
                continue;
            }
            out.push(currItem);
        }
        return out;
    }),

    /**
     * Behaves the same as `remove`, but takes a user-supplied equality predicate.
     * @function module:list.removeBy
     * @param pred {Function} - Equality predicate `(a, b) => bool`
     * @param x {*}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    removeBy = curry((pred, x, list) => {
        const foundIndex = findIndex(item => pred(x, item), list);
        if (foundIndex > -1) {
            const parts = splitAt(foundIndex, list);
            return append(parts[0], tail(parts[1]));
        }
        return sliceCopy(list);
    }),

    /**
     * The `removeFirstsBy` function takes a predicate and two lists and returns the first list with the first
     * occurrence of each element of the second list removed.
     * @function module:list.removeFirstBy
     * @param pred {Function}
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {Array}
     */
    removeFirstsBy = curry((pred, xs1, xs2) =>
        foldl((agg, x) => removeBy(pred, x, agg), xs1, xs2)),

    /**
     * Returns the union on elements matching boolean check passed in.
     * @function module:list.unionBy
     * @param pred {Function} - `pred :: a -> a -> Bool`
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    unionBy = curry((pred, arr1, arr2) =>
        foldl((agg, b) => {
                const alreadyAdded = any(a => pred(a, b), agg);
                return !alreadyAdded ? (agg.push(b), agg) : agg;
            }, sliceCopy(arr1), arr2
        )),

    /**
     * Creates a union on matching elements from array1.
     * @function module:list.union
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    union = curry((arr1, arr2) =>
        append(arr1,
            filter(elm => !includes(elm, arr1), arr2))),

    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:list.intersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    intersect = curry((arr1, arr2) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            filter(elm => includes(elm, arr2), arr1)),

    /**
     * Returns an intersection by predicate.
     * @function module:list.intersectBy
     * @param pred {Function} - `pred :: a -> b -> Bool`
     * @param list1 {Array}
     * @param list2 {Array}
     * @return {Array}
     */
    intersectBy = curry((pred, list1, list2) =>
        foldl((agg, a) =>
                any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg
            , [], list1)),

    /**
     * Returns the difference of list 1 from list 2.
     * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
     * @function module:list.difference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    difference = curry((array1, array2) => { // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return sliceCopy(array1);
        }
        else if (!array1 && array2 || (!array1 && !array2)) {
            return [];
        }
        return reduce((agg, elm) =>
                !includes(elm, array2) ? (agg.push(elm), agg) : agg
            , [], array1);
    }),

    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:list.complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    complement = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => append(agg, difference(arr, arr0)), [], arrays));
