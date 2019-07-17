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
import {at} from './list/at';
import {find} from './list/find';
import {forEach} from './list/forEach';
import {partition} from './list/partition';
import {elem} from './list/elem';
import {notElem} from './list/notElem';
import {isPrefixOf} from './list/isPrefixOf';
import {isSuffixOf} from './list/isSuffixOf';
import {isInfixOf} from './list/isInfixOf';
import {isSubsequenceOf} from './list/isSubsequenceOf';
import {group} from './list/group';
import {groupBy} from './list/groupBy';
import {inits} from './list/inits';
import {tails} from './list/tails';
import {stripPrefix} from './list/stripPrefix';
import {zip} from './list/zip';
import {zipN} from './list/zipN';
import {zip3} from "./list/zip3";
import {zip4} from "./list/zip4";
import {zip5} from "./list/zip5";
import {zipWith} from "./list/zipWith";
import {zipWithN} from "./list/zipWithN";
import {zipWith3} from "./list/zipWith3";
import {zipWith4} from "./list/zipWith4";
import {zipWith5} from "./list/zipWith5";

// List method helpers
// ----
import {
    reduce, sliceCopy, genericAscOrdering
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
    breakOnList, at, find, forEach, partition, elem, notElem,
    isPrefixOf, isSuffixOf, isInfixOf, isSubsequenceOf, group,
    groupBy, inits, tails, stripPrefix, zip, zipN, zip3, zip4,
    zip5, zipWith, zipWithN, zipWith3, zipWith4, zipWith5,

};

export {slice, includes, indexOf, lastIndexOf} from './jsPlatform';
export * from './list/range';
export * from './list/utils';

export const

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
