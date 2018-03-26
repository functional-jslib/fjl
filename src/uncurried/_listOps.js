/**
 * List operations module.
 * @module _listOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @private
 */
import {
    concat as listAppend,
    indexOf, slice, includes
}
    from './_jsPlatform/_list';

import {apply} from './_jsPlatform/_function';
import {negateP, negateF} from './_functionOps/_negate';
import {isTruthy, isFalsy} from '../booleanOps';
import {prop, length} from './_objectOps';
import _map from './_listOps/_map';

import {
    sliceFrom, sliceTo, lengths,
    lengthsToSmallest, aggregateArr,
    reduceUntil, reduce, reduceRight, lastIndex,
    findIndexWhere, findIndexWhereRight, findIndicesWhere,
    findWhere, copy, genericAscOrdering
}
    from './_listOps/_utils';

// Exported imports
export {_map};

// Exported internals
export const

    /**
     * Append two lists, i.e.,
     * ```
     * append([x1, ..., xm], [y1, ..., yn]) // outputs: [x1, ..., xm, y1, ..., yn]
     * append([x1, ..., xm], [y1, ...]) // outputs: [x1, ..., xm, y1, ...]
     * ```
     * If the first list is not finite, the result is the first list.
     * @haskellType `append :: List a => a -> a -> a`
     * @function module:_listOps._append
     * @param xs1 {Array} - list or list like.
     * @param xs2 {Array} - list or list like.
     * @returns {Array} - Same type as list like passed in.
     */
    _append = listAppend,

    /**
     * Append two or more lists, i.e., same as `_append` but for two ore more lists.
     * @haskellType `appendMany :: List a => a -> [a] -> a
     * @note In `@haskellType` we wrote `[a]` only to keep the haskell type valid though note in javascript
     *  this is actually different since the function converts the zero ore more parameters into an array containing such for us.
     * @function module:_listOps._appendMany
     * @param args ...{Array} - Lists or lists likes.
     * @returns {Array} - Same type as first list or list like passed in.
     */
    _appendMany = (...args) => {
        if (length(args)) { return apply(listAppend, args); }
        throw new Error('`_appendMany` requires at least one arg.');
    },

    /**
     * Returns head of list (first item of list).
     * @haskellType `head :: [a] -> a`
     * @function module:_listOps._head
     * @param x {Array|String}
     * @returns {*} - First item from list
     */
    _head = x => x[0],

    /**
     * Returns last item of list.
     * @haskellType `last :: [a] -> a`
     * @function module:_listOps._last
     * @param xs {Array|String}
     * @returns {*}
     */
    _last = xs => xs[lastIndex(xs)],

    /**
     * Returns tail part of list (everything after the first item as new list).
     * @haskelType `tail :: [a] -> [a]`
     * @function module:_listOps._tail
     * @param xs {Array}
     * @returns {Array}
     */
    _tail = xs => sliceFrom(1, xs),

    /**
     * Returns everything except last item of list as new list.
     * @haskellType `init :: [a] -> [a]`
     * @function module:_listOps._init
     * @param xs {Array|String}
     * @returns {Array|String}
     */
    _init = xs => sliceTo(lastIndex(xs), xs),

    /**
     * Returns `head` and `tail` of passed in list/string in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @function module:_listOps.uncons
     * @param xs {Array|String}
     * @returns {Array|undefined}
     */
    uncons = xs =>
        !xs || length(xs) === 0 ? undefined : [_head(xs), _tail(xs)],

    /**
     * Returns `tail` and `head` of passed in list/string in a tuple.
     * @haskellType `unconsr :: [a] -> Maybe ([a], a)`
     * @function module:_listOps.unconsr
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    unconsr = xs => !xs || length(xs) === 0 ? undefined : [_init(xs), _last(xs)],
    
    /**
     * Concatenates all the elements of a container of lists.
     * @haskellType `concat :: Foldable t => t [a] -> [a]`
     * @function module:_listOps.concat
     * @param xs {Array}
     * @returns {Array}
     */
    concat = xs => !length(xs) ? copy(xs) : apply(_appendMany, xs),

    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:_listOps.concatMap
     * @param fn {Function}
     * @param foldableOfA {Array}
     * @returns {Array}
     */
    concatMap = (fn, foldableOfA) => concat(_map(fn, foldableOfA)),

    /**
     * Returns a copy of the passed in list reverses.
     * @haskellType `reverse :: [a] -> [a]`
     * @function module:_listOps.reverse
     * @param x {Array}
     * @returns {Array}
     */
    reverse = x => foldr((agg, item) => (agg.push(item), agg), [], x),

    /**
     * Takes an element and a list and `intersperses' that element between the elements of the list. For example
     * @function module:_listOps.intersperse
     * @note In our version of the function javascript is loosely typed so, so is our function (to much overhead to make
     *  it typed) so `between` can be any value.
     * @param between {*} - Should be of the same type of elements contained in list.
     * @param arr {Array} - List.
     * @returns {Array}
     */
    intersperse = (between, arr) => {
        const limit = length(arr),
            lastInd = limit - 1,
            out = [];
        if (!limit) {
            return out;
        }
        return foldl((agg, item, ind) => (
                ind === lastInd ?
                    agg.push(item) :
                    agg.push(item, between),
                agg
            ), out, arr);
    },

    /**
     * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
     * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
     * @function module:_listOps.intercalate
     * @param xs {Array}
     * @param xss {Array}
     * @returns {Array}
     */
    intercalate = (xs, xss) => concat(intersperse(xs, xss)),

    /**
     * Transposes rows and columns into lists by index;  E.g.,
     * Haskell example:
     * ```
     *  transpose [[1,2,3],[4,5,6]] == [[1,4],[2,5],[3,6]]
     *
     *  -- Notice the shorter arrays are ignored after their last index is copied over:
     *  transpose [[10,11],[20],[],[30,31,32]] == [[10,20,30],[11,31],[32]]
     * ```
     * @note from columns to rows.
     * @note Empty lists are ignored.
     * @todo upgrade this function to support lists of strings.
     * @haskellType `transpose :: [[a]] -> [[a]]`
     * @function module:_listOps.transpose
     * @param xss {Array}
     * @returns {Array}
     */
    transpose = xss => {
        let numLists = length(xss),
            ind = 0, ind2;
        if (!numLists) {
            return [];
        }
        const listLengths = apply(lengths, xss),
            longestListLen = maximum(listLengths),
            outLists = [];
        for (; ind < longestListLen; ind += 1) {
            const outList = [];
            for (ind2 = 0; ind2 < numLists; ind2 += 1) {
                if (listLengths[ind2] < ind + 1) {
                    continue;
                }
                outList.push(xss[ind2][ind]);
            }
            outLists.push(outList);
        }
        return filter(x => length(x), outLists);
    },

    /**
     * Generates 2^n sub-sequences for passed in sequence (string/list) (`n` is
     * the length of the passed in sequence so: 2^length(xs)).
     * Note: The return value doubles per index/character passed in so use with caution!
     *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
     *  will generate 65536 sub-sequences!  So caution should be taken to not
     *  use this with sequences above a certain length on certain platform (the browser thread in specific).
     * @function module:_listOps.subsequences
     * @jsperftest https://jsperf.com/subsequences
     * @param xs {Array|String}
     * @returns {Array.<Array>}
     */
    subsequences = xs => {
        const listLen = length(xs),
            len = Math.pow(2, listLen),
            out = [];
        for (let i = 0; i < len; i += 1) {
            let entry = [];
            for (let j = 0; j < listLen; j += 1) {
                if (i & (1 << j)) {
                    entry.push(xs[j]);
                }
            }
            out.push(entry);
        }
        return out;
    },

    /**
     * Same as `subsequences` but returns an `Array.<Type>` instead
     *  of an array of arrays.  **Note:** `Type` here means
     *  a string, an instance of array, or some indexable-like type.
     * @function module:_listOps.subsequences1
     * @jsperftest https://jsperf.com/subsequences
     * @param xs {Array|String}
     * @returns {Array.<(Array|String|*)>}
     */
    subsequences1 = xs => {
        const listLen = length(xs),
            len = Math.pow(2, listLen),
            out = [];
        for (let i = 0; i < len; i += 1) {
            let entry = [];
            for (let j = 0; j < listLen; j += 1) {
                if (i & (1 << j)) {
                    entry.push(xs[j]);
                }
            }
            out.push(entry);
        }
        return out;
    },

    swapped = (ind1, ind2, list) => {
        const out = copy(list),
            tmp = out[ind1];
        out[ind1] = out[ind2];
        out[ind2] = tmp;
        return out;
    },

    /**
     * Returns a list of permutations for passed in list.
     *  Use caution with lists above a length of 15 (will take long due to nature of
     *  algorithm).
     * @function module:_listOps.permutations
     * @param xs {Array} - List.
     * @returns {Array<Array|String|*>} - Array of permutations.
     */
    permutations = xs => {
        const limit = length(xs);

        if (!limit || limit === 1) {
            return [xs];
        }

        let list = copy(xs),
            c = repeat(limit, 0),
            i = 0;

        const out = [list];

        for (; i < limit; i++) {
            if (c[i] < i) {
                list = swapped(i % 2 === 0 ? 0 : c[i], i, list);
                out.push(list);
                c[i] += 1;
                i = 0;
                continue;
            }
            c[i] = 0;
        }

        return out;
    },

    /**
     * Left associative fold.  Reduces a container of elements down by the given operation (same as [].reduce).
     * @function module:_listOps.foldl
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array}
     * @returns {*} - Whatever type is lastly returned from `fn`.
     */
    foldl = reduce,

    /**
     * Right associative fold.  Reduces a container of elements down by the given operation (same as [].reduceRight).
     * @function module:_listOps.foldr
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array}
     * @returns {*} - Whatever type is lastly returned from `fn`.
     */
    foldr = reduceRight,

    /**
     * A variant of `foldl` except that this one doesn't require the starting point.  The starting point/value will be pulled
     * out from a copy of the container.
     * @function module:_listOps.foldl1
     * @param op {Function}
     * @param xs {Array}
     * @returns {*} - Whatever type is lastly returned from `op`.
     */
    foldl1 = (op, xs) => {
        const parts = uncons(xs);
        return !parts ? [] : reduce(op, parts[0], parts[1]);
    },

    /**
     * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting point/value will be pulled
     * out from a copy of the container.
     * @function module:_listOps.foldr1
     * @param op {Function}
     * @param xs {Array}
     * @returns {*} - Whatever type is lastly returned from `op`.
     */
    foldr1 = (op, xs) => {
        const parts = unconsr(xs);
        return !parts ? [] : reduceRight(op, parts[1], parts[0]);
    },

    /**
     * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
     * containing the aggregated value and the result of mapping the passed in function on passed in list.
     * @function module:_listOps.mapAccumL
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumL = (op, zero, xs) => {
        const list = copy(xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = 0,
            agg = zero,
            mapped = [],
            tuple;
        for (; ind < limit; ind++) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    },

    /**
     * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
     * containing the aggregated value and the result of mapping the passed in function on passed in list.
     * @function module:_listOps.mapAccumR
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumR = (op, zero, xs) => {
        const list = copy(xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = limit - 1,
            agg = zero,
            mapped = [],
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    },

    /**
     * iterate f x returns an infinite list of repeated applications of f to x.
     * @function module:_listOps.iterate
     * @example `iterate(5, f, x) == [x, f(x), f(f(x)), ...]`
     * @param limit {Number}
     * @param op {Function} - Operation.
     * @param x {*} - Starting point.
     * @returns {*}
     */
    iterate = (limit, op, x) => {
        let ind = 0,
            out = [],
            lastX = x;
        for (; ind < limit; ind += 1) {
            out.push(lastX);
            lastX = op(lastX);
        }
        return out;
    },

    /**
     * Repeats `x` `limit` number of times.
     * @function module:_listOps.repeat
     * @param limit {Number}
     * @param x {*}
     * @return {Array}
     */
    repeat = (limit, x) => iterate(limit, a => a, x),

    /**
     * Same as `repeat` due to the nature of javascript (see haskell version for usage).
     * @function module:_listOps.replicate
     * @param limit {Number}
     * @param x {*}
     * @return {Array}
     */
    replicate = repeat,

    /**
     * Replicates a list `limit` number of times and appends the results (concat)
     * @function module:_listOps.cycle
     * @param limit {Number}
     * @param xs {Array}
     * @returns {Array}
     */
    cycle = (limit, xs) => concat(replicate(limit, xs)),

    /**
     * Unfolds a value into a list of somethings.
     * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
     * @function module:_listOps.unfoldr
     * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
     * @param x {*} - Starting parameter to unfold from.
     * @returns {Array} - An array of whatever you return from `op` yielded.
     */
    unfoldr = (op, x) => {
        let ind = 0,
            out = [],
            resultTuple = op(x, ind, out);
        while (resultTuple) {
            out.push(resultTuple[0]);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    },

    /**
     * Finds index in string or list (alias for `findIndex`).
     * @function module:_listOps.findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndex = findIndexWhere,

    /**
     * @function module:_listOps.findIndices
     * @param pred {Function}
     * @param xs {Array} - list or list like.
     * @returns {Array|undefined}
     */
    findIndices = findIndicesWhere,

    /**
     * @function module:_listOps.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array} - list or list like.
     * @returns {*}
     */
    elemIndex = (x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    },

    /**
     * @function module:_listOps.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array} - list or list like.
     * @returns {*}
     */
    elemIndices = (value, xs) => findIndices(x => x === value, xs),

    /**
     * Takes `n` items from start of list to `limit` (exclusive).
     * @function module:_listOps.take
     * @param list {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = (limit, list) => sliceTo(limit, list),

    /**
     * Drops `n` items from start of list to `count` (exclusive).
     * @function module:_listOps.take
     * @param list {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = (count, list) => sliceFrom(count, list),

    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:_listOps.splitAt
     * @param ind {Number} - Index to split at.
     * @param list {Array} - functor (list or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = (ind, list) => [ sliceTo(ind, list), sliceFrom(ind, list) ],

    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:_listOps.takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @returns {Array}
     */
    takeWhile = (pred, list) =>
        reduceUntil(
            negateP(pred),  // predicate
            aggregateArr,   // operation
            [],             // aggregator
            list
        ),

    /**
     * Returns an list without elements that match predicate.
     * @function module:_listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhere((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            slice(splitPoint, limit, list);
    },

    /**
     * @function module:_listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhereRight((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            sliceTo(splitPoint + 1, list);
    },

    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @function module:_listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array} - Predicate<item, index, originalArrayOrString>
     * @returns {Array} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    span = (pred, list) => {
        const splitPoint = findIndexWhere(negateP(pred), list);
        return splitPoint === -1 ?
            splitAt(0, list) : splitAt(splitPoint, list);
    },

    breakOnList = (pred, list) => {
        const splitPoint = findIndexWhere(pred, list);
        return splitPoint === -1 ?
            splitAt(0, list) : splitAt(splitPoint, list);
    },

    /**
     * Gets item at index.
     * @function module:_listOps.at
     * @param ind {Number} - Index.
     * @param xs {Array} - list or list like.
     * @returns {*|undefined} - Item or `undefined`.
     */
    at = prop,

    /**
     * Find an item in structure of elements based on given predicate (`pred`).
     * @function module:_listOps.find
     * @param pred {Function}
     * @param xs {Array} - list or list like.
     * @returns {*} - Found item.
     */
    find = findWhere,

    /**
     * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
     * @function module:_listOps.filter
     * @param pred {Function}
     * @param xs {Array} - list or list like.
     * @returns {Array} - Structure of filtered elements.
     */
    filter = (pred, xs) => {
        let ind = 0,
            limit = length(xs),
            out = [];
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out.push(xs[ind]);
            }
        }
        return out;
    },

    /**
     * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
     * do not match the tuple are in second list in the returned tuple.
     *  Essentially `[filter(p, xs), filter(negateP(p), xs)]`.
     * @function module:_listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array}
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    partition = (pred, list) =>
        !length(list) ?
            [[], []] :
                [filter(pred, list), filter(negateP(pred), list)],

    /**
     * Returns a boolean indicating whether an element exists in given structure of elements.
     * @function module:_listOps.elem
     * @param element {*}
     * @param xs {Array}
     * @returns {Boolean}
     */
    elem = includes,

    /**
     * The opposite of `elem` - Returns a boolean indicating whether an element exists in given list.
     * @function module:_listOps.elem
     * @param element {*}
     * @param xs {Array}
     * @returns {Boolean}
     */
    notElem = negateF(includes),

    lookup = at,

    isPrefixOf = (xs1, xs2) => {
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
    },

    isSuffixOf = (xs1, xs2) => {
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
    },

    isInfixOf = (xs1, xs2) => {
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
    },

    isSubsequenceOf = (xs1, xs2) => {
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
    },

    /**
     * The group function takes a list and returns a list of lists such that
     *  the concatenation of the result is equal to the argument. Moreover, each
     *  sublist in the result contains only equal elements. For example,
     * `group "Mississippi" = ["M","i","ss","i","ss","i","pp","i"]`
     * It is a special case of groupBy, which allows the programmer to supply
     *  their own equality test.
     * @haskellType `group :: Eq a => [a] -> [[a]]`
     * @function module:_listOps.group
     * @param xs {Array}
     * @returns {Array<Array|String|*>|*}
     */
    group = xs => groupBy((a, b) => a === b, xs),

    /**
     * Allows you to group items in a list based on your supplied equality check.
     * @note Sames `group` but allows you to specify equality operation.
     * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
     * @function module:_listOps.groupBy
     * @param equalityOp {Function}
     * @param xs {Array}
     * @returns {*}
     */
    groupBy = (equalityOp, xs) => {
        const limit = length(xs);
        if (!limit) {
            return copy(xs);
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
            agg = [];
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(takeWhile(predOp, slice(ind, limit, xs)));
        }
        return agg;
    },

    /**
     * The inits function returns all initial segments of the argument, shortest first. For example,
     * ```
     * shallowEquals(inits('abc'), ['','a','ab','abc'])
     * ```
     * @function module:_listOps._inits
     * @haskellType `inits :: [a] -> [[a]]`
     * @param xs {Array}
     * @returns {Array}
     */
    _inits = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push(sliceTo(ind, xs));
        }
        return agg;
    }, //_map(list => _init(list), xs),

    /**
     * The inits function returns all initial segments of the argument, shortest first. For example,
     * ```
     * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
     * ```
     * @function module:_listOps.tails
     * @haskellType `tails :: [a] -> [[a]]`
     * @param xs {Array}
     * @returns {Array}
     */
    tails = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push(slice(ind, limit, xs));
        }
        return agg;
    }, //_map(list => tail(list), xs),

    stripPrefix = (prefix, list) =>
        isPrefixOf(prefix, list) ?
            splitAt(length(prefix), list)[1] :
            copy(list),

    /**
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
     * @function module:_listOps.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = (arr1, arr2) => {
        if (!length(arr1) || !length(arr2)) {
            return [];
        }
        const [a1, a2] = lengthsToSmallest(arr1, arr2);
        return reduce((agg, item, ind) =>
                aggregateArr(agg, [item, a2[ind]]),
            [], a1);
    },

    /**
     * zipN takes one or more lists and returns a list containing lists of all indices
     * at a given index, index by index.
     * If one input list is short, excess elements of the longer list are discarded.
     * @function module:_listOps.zipN
     * @param lists {Array|String} - One ore more lists of the same type.
     * @returns {Array}
     */
    zipN = (...lists) => {
        const trimmedLists = apply(lengthsToSmallest, filter(length, lists)),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind) =>
                aggregateArr(agg, _map(xs => xs[ind], trimmedLists)),
            [], trimmedLists[0]);
    },

    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
     * @function module:_listOps.zip3
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip3 = (arr1, arr2, arr3) => zipN(arr1, arr2, arr3),

    /**
     * @haskellType `zip4 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
     * @function module:_listOps.zip4
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip4 = (arr1, arr2, arr3, arr4) => zipN(arr1, arr2, arr3, arr4),

    /**
     * @haskellType `zip5 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
     * @function module:_listOps.zip5
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @param arr5 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip5 = (arr1, arr2, arr3, arr4, arr5) => zipN(arr1, arr2, arr3, arr4, arr5),

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
     * @function module:_listOps.zipWith
     * @param op {Function} - Takes two parts of a tuple and returns a tuple.
     *  E.g., ` op :: a -> b -> (a, b)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWith = (op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) {
            return [];
        }
        const [a1, a2] = lengthsToSmallest(xs1, xs2);
        return reduce((agg, item, ind) =>
                aggregateArr(agg, op(item, a2[ind])),
            [], a1);
    },

    /**
     * Zips all given lists with tupling function. Note: Haskell types do not have
     *  a way (that I know of) to show one or more for params in a function so `@haskellType` below
     *  is left there for general purpose not for exactness as is told by aforementioned.
     * @haskellType `zipWithN :: (a -> b -> c) -> [a] -> [b] -> [c]` - Where `N` is the number
     *  of lists to zip.
     * @function module:_listOps.zipWithN
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param lists ...{Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWithN = (op, ...lists) => {
        const trimmedLists = apply(lengthsToSmallest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind) =>
                aggregateArr(agg, apply(op, _map(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    },

    /**
     * Zips 3 lists with tupling function.
     * @haskellType `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
     * @function module:_listOps.zipWith3
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @param xs3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWith3 = (op, xs1, xs2, xs3) => zipWithN(op, xs1, xs2, xs3),

    /**
     * Zips 4 lists with tupling function.
     * @haskellType `zipWith4 :: (a -> b -> c -> d -> e) -> [a] -> [b] -> [c]  -> [d] -> [e]`
     * @function module:_listOps.zipWith4
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> d -> (a, b, c, d)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @param xs3 {Array}
     * @param xs4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWith4 = (op, xs1, xs2, xs3, xs4) => zipWithN(op, xs1, xs2, xs3, xs4),

    /**
     * Zips 5 lists.
     * @haskellType `zipWith5 :: (a -> b -> c -> d -> e -> f) -> [a] -> [b] -> [c]  -> [d] -> [e] -> [f]`
     * @function module:_listOps.zipWith5
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
    zipWith5 = (op, xs1, xs2, xs3, xs4, xs5) => zipWithN(op, xs1, xs2, xs3, xs4, xs5),

    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
     * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
     * @function module:_listOps.unzip
     * @param arr {Array|*}
     * @returns {Array|*}
     */
    unzip = arr =>
        foldl((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr),

    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @sudoHaskellType `unzipN :: [(a, b, ...x)] -> ([a], [b], ...[x])`
     * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
     * @function module:_listOps.unzip
     * @param list {Array|*} - List of tuples (lists).
     * @returns {Array|*}
     */
    unzipN = list => {
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
     * @function module:_listOps.any
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    any = (p, xs) => {
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
    },

    /**
     * Returns true if all items in container pass predicate `p`.
     * @function module:_listOps.all
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    all = (p, xs) => {
        const limit = length(xs);
        let ind = 0;
        if (limit === 0) {
            return false;
        }
        for (; ind < limit; ind++) {
            if (!p(xs[ind], ind, xs)) {
                return false;
            }
        }
        return true;
    },

    /**
     * Conjuction of container of bools (or truthy and/or falsy values);  Returns
     * `true` if all in container are 'truthy' else returns `false`
     * @function module:_listOps.and
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    and = xs => all(isTruthy, xs),

    /**
     * Returns a boolean indicating whether any item in container is 'truthy' or not.
     * **Note** The haskell type for this function only takes two items, but here
     * we allow the passing of more than one item (may change later to adhere to the haskell type).
     * @function module:_listOps.or
     * @haskellType `or :: Bool -> Bool -> Bool`
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    or = xs => any(isTruthy, xs),

    /**
     * Returns a boolean indicating whether all items in container are 'falsy' or not.
     * **Note** The haskell type for this function only takes two items, but here
     * we allow the passing of more than one item (may change later to adhere to the haskell type).
     * @function module:_listOps.not
     * @haskellType `not :: Bool -> Bool`
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    not = xs => all(isFalsy, xs),

    /**
     * Computes the sum of the numbers of a structure.
     * @function module:_listOps.sum
     * @haskellType `sum :: (List t, Num a) => t a -> a`
     * @param list {Array|String}
     * @returns {Number}
     */
    sum = list => foldl((agg, x) => agg + x, 0, list),

    /**
     * Computes the product of the numbers of a structure.
     * @function module:_listOps.product
     * @haskellType `product :: (List t, Num a) => t a -> a`
     * @param list {Array|String}
     * @returns {Number}
     */
    product = list => foldl((agg, x) => agg * x, 1, list),

    /**
     * Returns the largest element in a non-empty structure of elements.
     * @function module:_listOps.maximum
     * @haskellType `maximum :: forall a . Ord a => t a -> a`
     * @param list {Array|String}
     * @returns {*} - Whatever type the array is made of (if any).
     */
    maximum = list => _last(sortBy(genericAscOrdering, list)),

    /**
     * Returns the smallest element in a non-empty structure of elements.
     * @function module:_listOps.minimum
     * @haskellType `minimum :: forall a . Ord a => t a -> a`
     * @param list {Array|String}
     * @returns {*} - Whatever type the array is made of (if any).
     */
    minimum = list => _head(sortBy(genericAscOrdering, list)),

    /**
     * @function module:_listOps.scanl
     * @param fn {Function}
     * @param zero {*}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanl = (fn, zero, xs) => {
        if (!xs || !length(xs)) {
            return [];
        }
        const limit = length(xs);
        let ind = 0,
            result = zero,
            out = [];
        while (ind < limit) {
            result = fn(result, xs[ind], ind, xs);
            out.push(result);
            ind++;
        }
        return out;
    },

    scanl1 = (fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return scanl(fn, _head(xs), _tail(xs));
    },

    scanr = (fn, zero, xs) => {
        if (!xs || !length(xs)) {
            return [];
        }
        const limit = length(xs);
        let ind = limit - 1,
            result = xs[0],
            out = [];
        while (ind > -1) {
            result = fn(result, xs[ind], ind, xs);
            out.push(result);
            ind--;
        }
        return out;
    },

    scanr1 = (fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return scanr(fn, _last(xs), _init(xs));
    },

    nub = list => nubBy((a, b) => a === b, list),

    remove = (x, list) => removeBy((a, b) => a === b, x, list),

    sort = xs => sortBy(genericAscOrdering, xs),

    sortOn = (valueFn, xs) =>

        // Un-decorate
        _map(decorated => decorated[1],

            // Decorate and sort
            sortBy(
                // Ordering
                ([a0], [b0]) => genericAscOrdering(a0, b0),

                // Decorate
                _map(item => [valueFn(item), item], xs)
            )
        ),

    sortBy = (orderingFn, xs) => copy(xs).sort(orderingFn || genericAscOrdering),

    insert = (x, xs) => {
        if (!length(xs)) {
            return [x];
        }
        const foundIndex = findIndex(item => x <= item, xs);
        return foundIndex === -1 ? [x] :
            concat(intersperse([x], splitAt(foundIndex, xs)));
    },

    /**
     * A version of `insert` that allows you to specify the ordering of the inserted
     * item;  Before/at, or after
     * @function module:_listOps.insertBy
     * @haskellType `insertBy :: (a -> a -> Ordering) -> a -> [a] -> [a]`
     * @note `Ordering` === // something that is order-able
     * @todo Optimize and work the logic of this function;  Think about the types that will be
     *  operated on by this functions logic.
     * @param orderingFn {Function} - A function that returns `-1`, `0`, or 1`.
     * @param x {*} - Value to insert.
     * @param xs {Array} - List to insert into (note new list is returned)
     * @returns {Array} - New list.
     */
    insertBy = (orderingFn, x, xs) => {
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
        return aggregateArr(copy(xs), x);
    },

    nubBy = (pred, list) => {
        if (!length(list)) {
            return [];
        }
        const limit = length(list);
        let ind = 0,
            currItem,
            out = [],
            anyOp = storedItem => pred(currItem, storedItem);
        for (; ind < limit; ind += 1) {
            currItem = list[ind];
            if (any(anyOp, out)) {
                continue;
            }
            out.push(currItem);
        }
        return out;
    },

    removeBy = (pred, x, list) => { // @todo optimize this implementation
        const foundIndex = findIndex(item => pred(x, item), list),
            parts = splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
        return _append(parts[0], _tail(parts[1]));
    },

    removeFirstsBy = (pred, xs1, xs2) =>
        foldl((agg, item) => removeBy(pred, item, agg), xs1, xs2),

    /**
     * Returns the union on elements matching boolean check passed in.
     * @function module:_listOps.unionBy
     * @param pred {Function} - `pred :: a -> a -> Bool`
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    unionBy = (pred, arr1, arr2) =>
        foldl((agg, b) => {
                const alreadyAdded = any(a => pred(a, b), agg);
                return !alreadyAdded ? (agg.push(b), agg) : agg;
            }, copy(arr1), arr2
        ),

    /**
     * Creates a union on matching elements from array1.
     * @function module:_listOps.union
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    union = (arr1, arr2) =>
        _append(arr1,
            filter(elm => !includes(elm, arr1), arr2)),

    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:_listOps.intersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    intersect = (arr1, arr2) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            filter(elm => includes(elm, arr2), arr1),

    /**
     * Returns an intersection by predicate.
     * @function module:_listOps.intersectBy
     * @param pred {Function} - `pred :: a -> b -> Bool`
     * @param list1 {Array}
     * @param list2 {Array}
     * @return {Array}
     */
    intersectBy = (pred, list1, list2) =>
        foldl((agg, a) =>
                any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg
            , [], list1),

    /**
     * Returns the difference of list 1 from list 2.
     * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
     * @function module:_listOps.difference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    difference = (array1, array2) => { // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return copy(array1);
        }
        else if (!array1 && array2 || (!array1 && !array2)) {
            return [];
        }
        return reduce((agg, elm) =>
                !includes(elm, array2) ? (agg.push(elm), agg) : agg
            , [], array1);
    },

    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:_listOps.complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    complement = (arr0, ...arrays) =>
        reduce((agg, arr) => _append(agg, difference(arr, arr0)), [], arrays);
