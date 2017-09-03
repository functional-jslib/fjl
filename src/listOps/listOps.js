/**
 * Array operators module.
 * @module arrayOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @todo code unperformant shorthand in `listOps`
 */
import {curry, curry2, curry3, curry4, curry5, curryN}      from '../functionOps/curry';
import {apply}              from '../functionOps/apply';
import {negateP}            from '../functionOps/functionOps';
import {isTruthy, isFalsy}  from '../booleanOps/is';
import {isString, isArray, isset}  from '../objectOps/is';
import {prop}               from '../objectOps/prop';
import {typeOf}             from '../objectOps/typeOf';
import {of}                 from '../objectOps/of';
import {length, hasOwnProperty} from '../objectOps/objectPrelude';
import {fPureTakes2, fPureTakesOne, fPureTakesOneOrMore} from '../utils/utils';
import {log} from '../../tests/for-server/helpers';

export {length};

const

    /**
     * Ascension multiplier.
     * @type {number}
     */
    ASC = 1,

    /**
     * Descension multiplier.
     * @type {number}
     */
    DESC = -1,

    /**
     * @returns {Boolean} - Always `false`.
     */
    alwaysFalse = () => false,

    /**
     * Array and String `slice`.
     * @param separator {String|RegExp}
     * @param arr{Array}
     * @returns {Array}
     */
    slice = fPureTakes2('slice'),

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceToEndFrom = (startInd, arr) => slice(startInd, length(arr), arr),

    /**
     * Slices list from zero to `x` value.
     * @param x {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFromZero = x => sliceToEndFrom(0, x),

    /**
     * Always `1` or `-1`.
     * @param x {Number}
     * @returns {Number} - Always `1` or `-1`.
     */
    onlyOneOrNegOne = x => x === 1 || x === -1 ? x : 1,

    /**
     * @param multiplier {Number}
     * @param valueFn {Function}
     * @returns {function(...[*]): Array.<*>}
     */
    getSortByOrder = (multiplier, valueFn) => {
        valueFn = valueFn || (v => v);
        const x = onlyOneOrNegOne(multiplier),
            ifGreaterThan = 1 * x,
            ifLessThan = -1 * x;
        return (...values) => values.sort((a1, b1) => {
            let a = valueFn(a1),
                b = valueFn(b1);
            if (a > b) {
                return ifGreaterThan;
            }
            else if (b > a) {
                return ifLessThan;
            }
            return 0;
        });
    },

    sortDescByLength = getSortByOrder(DESC, length),

    /**
     * Returns length of all passed lists in list.
     * @param lists ...{Array|String|*}
     * @returns {Array|String|*}
     */
    lengths = (...lists) => length(lists) ? map(length, lists) : [],

    lengthsToSmallest = (...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = minimum(listLengths);
        return map((list, ind) => listLengths[ind] > smallLen ?
            slice(0, smallLen, list) : sliceFromZero(list), lists);
    },

    aggregateStr = (agg, item) => agg + item,

    aggregateArr = (agg, item) => {
        agg.push(item);
        return agg;
    },

    aggregateObj = (agg, item, ind) => {
        agg[ind] = item;
        return agg;
    },

    aggregatorByType = x => {
        switch (typeOf(x)) {
            case 'String': return aggregateStr;
            case 'Array': return aggregateArr;
            case 'Object':
            default: return aggregateObj;
        }
    },

    reduceUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },

    reduceRightUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },

    reduce = (operation, agg, arr) =>
        reduceUntil(
            alwaysFalse,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr),                   // list

    reduceRight = (operation, agg, arr) =>
        reduceRightUntil(
            alwaysFalse,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr),                   // list

    /**
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @param functor {Array|Object|*}
     * @param ...functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in objectOps doesn't have an `every` method.
     */
    arrayAppend = fPureTakesOneOrMore('concat'),

    /**
     * Appends any subsequent lists (strings) onto the first one (string).
     * @note Same as a Monoidal `mappend`;  In this case for strings.
     * @param arg0 {String}
     * @param args {...String}
     * @returns {String}
     */
    strAppend = (arg0, ...args) => reduce(aggregateStr, arg0, args),

    /**
     * Searches list/list-like for given element `x`.
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf = fPureTakesOne('indexOf'),

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listOps.lastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = x => { const len = length(x); return len ? len - 1 : 0; },

    /**
     * Finds index in string or list.
     * @function module:listOps.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = (pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    },

    /**
     * Finds index in list from right to left.
     * @function module:listOps.findIndexWhereRight
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhereRight = (pred, arr) => {
        const limit = length(arr);
        let ind = limit,
            predicateFulfilled = false;
        for (; ind >= 0 && !predicateFulfilled; --ind) {
            predicateFulfilled = pred(arr[ind], ind, arr);
        }
        return ind;
    },

    /**
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = (pred, xs) => {
        const limit = length(xs);
        if (!limit) { return undefined; }
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out;
    },

    /**
     * @function module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    findWhere = (pred, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return; }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) { return elm; }
        }
    },

    /**
     * Append two lists, i.e.,
     * ```
     * append([x1, ..., xm], [y1, ..., yn]) // outputs: [x1, ..., xm, y1, ..., yn]
     * append([x1, ..., xm], [y1, ...]) // outputs: [x1, ..., xm, y1, ...]
     * ```
     * If the first list is not finite, the result is the first list.
     * @haskellType `append :: List a => a -> a -> a`
     * @function module:listOps.append
     * @param xs1 {Array|String|*} - list or list like.
     * @param xs2 {Array|String|*} - list or list like.
     * @returns {Array|String|*} - Same type as list like passed in.
     */
    append = (xs1, xs2) => (isArray(xs1) ? arrayAppend : strAppend)(xs1, xs2),

    /**
     * Append two or more lists, i.e., same as `append` but for two ore more lists.
     * @haskellType `appendMany :: List a => a -> [a] -> a
     * @note In `@haskellType` we wrote `[a]` only to keep the haskell type valid though note in javascript
     *  this is actually different since the function converts the zero ore more parameters into an array containing such for us.
     * @function module:listOps.appendMany
     * @param x {Array|String|*}
     * @param args ...{Array|String|*} - Lists or lists likes.
     * @returns {Array|String|*} - Same type as first list or list like passed in.
     */
    appendMany = (x, ...args) => {
        const lenArgs = length(args);
        if (!isset(x)) { return []; }
        if (!lenArgs) { return sliceToEndFrom(0, x); }
        return (isArray(x) ? arrayAppend : strAppend)(x, ...args);
    }
;

export const

    /**
     * Returns a new instance of passed in list.
     * @function module:listOps.mempty
     * @note is named after haskell's `Monoid mempty`
     * @param x {Array|String|*}
     * @returns {Array|String|*}
     */
    mempty = x => {
        if (!isset(x)) { return []; }
        else if (x.mempty) { return x.mempty(); }
        return  of(x);
    },

    /**
     * Append two lists, i.e.,
     * ```
     * append([x1, ..., xm], [y1, ..., yn]) // outputs: [x1, ..., xm, y1, ..., yn]
     * append([x1, ..., xm], [y1, ...]) // outputs: [x1, ..., xm, y1, ...]
     * ```
     * If the first list is not finite, the result is the first list.
     * @haskellType `append :: List a => a -> a -> a`
     * @function module:listOps.append
     * @param xs1 {Array|String|*} - list or list like.
     * @param xs2 {Array|String|*} - list or list like.
     * @returns {Array|String|*} - Same type as list like passed in.
     */
    mappend = curry(append),

    /**
     * Same as `module:listOps.mappend` but for `n` lists (two or more lists).
     * @todo review currying here.
     * @haskellType `mappend :: List a => a -> a -> a`
     * @function module:listOps.mappendMany
     * @param args ...{Array|String|*} - lists or lists likes.
     * @returns {Array|String|*} - Same type as list likes passed in.
     */
    mappendMany = appendMany,

    /**
     * Returns head of list (first item of list).
     * @haskellType `head :: [a] -> a`
     * @function module:listOps.head
     * @param x {Array|String}
     * @returns {*} - First item from list
     */
    head = x => x[0],

    /**
     * Returns last item of list.
     * @haskellType `last :: [a] -> a`
     * @function module:listOps.last
     * @param xs {Array|String}
     * @returns {*}
     */
    last = xs => xs[lastIndex(xs)],

    /**
     * Returns tail part of list (everything after the first item as new list).
     * @haskelType `tail :: [a] -> [a]`
     * @function module:listOps.tail
     * @param xs {Array}
     * @returns {Array}
     */
    tail = xs => sliceToEndFrom(1, xs),

    /**
     * Returns everything except last item of list as new list.
     * @haskellType `init :: [a] -> [a]`
     * @function module:listOps.init
     * @param xs {Array|String}
     * @returns {Array|String}
     */
    init = xs => slice(0, lastIndex(xs), xs),

    /**
     * Returns `head` and `tail` of passed in list/string in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @function module:listOps.uncons
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    uncons = xs => {
        if (!xs) { return; } //
        const len = length(xs);
        if (len === 0) { return undefined; }
        return [head(xs), tail(xs)];
    },

    /**
     * Returns `tail` and `head` of passed in list/string in a tuple.
     * @haskellType `unconsr :: [a] -> Maybe ([a], a)`
     * @function module:listOps.unconsr
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    unconsr = xs => {
        if (!xs) { return; } //
        const len = length(xs);
        if (len === 0) { return undefined; }
        return [init(xs), last(xs)];
    },

    /**
     * Returns whether a list is empty or not.
     * @note not to be mistaken with module:objectOps.isEmpty;
     *  `objectOps.isEmpty` Checks any passed in type for empty;
     *  `listOps.isEmpty` only checks if length on passed in
     *  value is not truthy.
     *  In typed languages this would be all we
     *  need do due to assuming that only lists make it into our
     *  function but in javascript this is loose and in order
     *  to the function to perform well under load and
     *  for it to follow the specification we are not allowed
     *  to type check in it.
     * @note Will keep it like this for now.
     * @function module:listOps.isEmpty
     * @param x {*}
     * @returns {Boolean}
     */
    isEmpty = x => !length(x),

    /**
     * @function module:listOps.map
     * @param fn {Function} - Function to map on functor item(s).
     * @param xs {Array|String|*} - Functor.
     * @returns {Array|String|*} - Functor type that is passed in.
     */
    map = curry ((fn, xs) => {
        let ind = 0,
            limit = length(xs),
            out = mempty(xs),
            aggregate = aggregatorByType(xs);
        if (!limit) { return out; }
        for (; ind < limit; ind += 1) {
            out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
        }
        return out;
    }),

    /**
     * Concatenates all the elements of a container of lists.
     * @haskellType `concat :: Foldable t => t [a] -> [a]`
     * @function module:listOps.concat
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    concat = xs => mappendMany(...xs),

    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:listOps.concatMap
     * @param fn {Function}
     * @param foldableOfA {Array|String|*}
     * @returns {Array|String|*}
     */
    concatMap = curry((fn, foldableOfA) => concat(map(fn, foldableOfA))),

    /**
     * Returns a copy of the passed in list reverses.
     * @haskellType `reverse :: [a] -> [a]`
     * @function module:listOps.reverse
     * @param x {Array|String|*}
     * @returns {Array|String|*}
     */
    reverse = x => {
        const aggregator = aggregatorByType(x);
        return reduceRight(
                (agg, item, ind) => aggregator(agg, item, ind),
                mempty(x), x
            );
    },

    /**
     * Takes an element and a list and `intersperses' that element between the elements of the list. For example
     * @function module:listOps.intersperse
     * @note In our version of the function javascript is loosely typed so, so is our function (to much overhead to make
     *  it typed) so `between` can be any value.
     * @param between {*} - Should be of the same type of elements contained in list.
     * @param arr {Array|String|*} - List.
     * @returns {Array|String|*}
     */
    intersperse = curry((between, arr) => {
        const limit = length(arr),
            lastInd = limit - 1,
            aggregator = mempty(arr),
            aggregatorOp = aggregatorByType(arr);
        if (!limit) { return aggregator; }
        return reduce((agg, item, ind) => {
            return ind === lastInd ?
                aggregatorOp(agg, item) :
                aggregatorOp(
                    aggregatorOp(agg, item),
                    between
                );
        }, aggregator, arr);
    }),

    /**
     * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
     * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
     * @function module:listOps.intercalate
     * @param xs {Array|String|*}
     * @param xss {Array|String|*}
     * @returns {Array|String|*}
     */
    intercalate = curry((xs, xss) => {
        const result = intersperse(xs, xss);
        return isString(result) ? result : concat(result);
    }),

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
     * @function module:listOps.transpose
     * @param xss {Array}
     * @returns {Array}
     */
    transpose = xss => {
        const numLists = length(xss);
        if (!numLists) { return mempty(xss); }
        const listLengths = apply(lengths, xss),
            longestListLen = maximum(listLengths),
            outLists = [];
        let ind = 0, ind2;
        for (; ind < longestListLen; ind += 1) {
            const outList = [];
            for (ind2 = 0; ind2 < numLists; ind2 += 1) {
                if (listLengths[ind2] < ind + 1) { continue; }
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
     * @function module:listOps.subsequences
     * @param xs {Array|String}
     * @returns {Array}
     */
    subsequences = xs => {
        const len = Math.pow(2, length(xs)),
            out = [];
        for (let i = 0; i < len; i += 1) {
            const entry = [];
            for (let j = 0; j < len; j += 1) {
                if (i & (1 << j)) {
                    entry.push(xs[j]);
                }
            }
            out.push(entry);
        }
        return out;
    },

    permutations = xs => [xs],

    foldl = curry(reduce),

    foldr = curry(reduceRight),

    foldl1 = curry((op, xs) => {
        const parts = uncons(xs);
        if (!parts) { return of (xs); }
        return reduce (op, parts[0], parts[1]);
    }),

    foldr1 = curry((op, xs) => {
        const parts = unconsr(xs);
        if (!parts) { return of (xs); }
        return reduceRight (op, parts[1], parts[0]);
    }),

    /**
     * Accumulative map functionOps which effectively does a map and reduce (from the left) all in one;  Returns a tuple
     * containing the aggregated value and the mapped result of map the passed in `op` on the passed in
     * list (`xs`).
     * @function module:listOps.mapAccumL
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumL = curry((op, zero, xs) => {
        const list = sliceToEndFrom(0, xs),
            limit = length(xs);
        if (!limit) { return [zero, list]; }
        let ind = 0,
            agg = zero,
            mapped = mempty(xs),
            tuple;
        for (; ind < limit; ind++) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    }),

    /**
     * Accumulative map functionOps which effectively does a map and reduce (from the right) all in one;  Returns a tuple
     * containing the aggregated value and the mapped result of map the passed in `op` on the passed in
     * list (`xs`).
     * @function module:listOps.mapAccumR
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumR = curry((op, zero, xs) => {
        const list = sliceToEndFrom(0, xs),
            limit = length(xs);
        if (!limit) { return [zero, list]; }
        let ind = limit - 1,
            agg = zero,
            mapped = mempty(xs),
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    }),

    /**
     * Unfolds a value into a list of somethings.
     * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
     * @function module:listOps.unfoldr
     * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
     * @param x {*} - Starting parameter to unfold from.
     * @returns {Array} - An array of whatever you return from `op` yielded.
     */
    unfoldr = curry2((op, x) => {
        let ind = 0,
            out = [],
            resultTuple = op(x, ind, out);
        while (resultTuple) {
            out.push(resultTuple[0]);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    }),

    /**
     * Finds index in string or list (alias for `findIndex`).
     * @function module:listOps.findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndex = curry(findIndexWhere),

    /**
     * @function module:listOps.findIndices
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndices =  curry(findIndicesWhere),

    /**
     * @function module:listOps.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndex = curry((x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    }),

    /**
     * @function module:listOps.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndices = curry((value, xs) => findIndices(x => x === value, xs)),

    /**
     * Takes `n` items from start of list to `limit` (exclusive).
     * @function module:listOps.take
     * @param list {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = curry((limit, array) => slice(0, limit, array)),

    /**
     * Drops `n` items from start of list to `count` (exclusive).
     * @function module:listOps.take
     * @param list {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = curry((count, array) => sliceToEndFrom(count, array)),

    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:listOps.splitAt
     * @param ind {Number} - Index to split at.
     * @param functor {Array|String} - functor (list or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = curry((ind, arr) => [
        slice(0, ind, arr),
        sliceToEndFrom(ind, arr)
    ]),

    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:listOps.takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param arr {Array|String}
     * @returns {Array}
     */
    takeWhile = curry((pred, arr) => {
        let zero =  mempty(arr);
        const operation = aggregatorByType(arr);
        return reduceUntil (
            negateP(pred),  // predicate
            operation,      // operation
            zero,           // aggregator
            arr
        );
    }),

    /**
     * Returns an list without elements that match predicate.
     * @function module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param arr {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = curry((pred, arr) => {
        const limit = length(arr),
            splitPoint =
                findIndexWhere((item, ind, arr2) =>
                    !pred(arr[ind], ind, arr2), arr);

        return splitPoint === -1 ?
            slice(0, limit, arr) :
            slice(splitPoint, limit, arr);
    }),

    /**
     * @function module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param arr {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd = curry((pred, arr) => {
        const limit = length(arr),
            splitPoint =
                findIndexWhereRight((item, ind, arr2) =>
                    !pred(arr[ind], ind, arr2), arr);

        return splitPoint === -1 ?
            slice(0, limit, arr) :
            slice(0, splitPoint + 1, arr);
    }),

    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @function module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    span = curry((pred, arr) => {
        const splitPoint = findIndexWhere(negateP(pred), arr);
        return splitPoint === -1 ?
            splitAt(0, arr) : splitAt(splitPoint, arr);
    }),

    breakOnList = curry((pred, arr) => {
        const splitPoint = findIndexWhere(pred, arr);
        return splitPoint === -1 ?
            splitAt(0, arr) : splitAt(splitPoint, arr);
    }),

    /**
     * @function module:listOps.at
     * @param ind {Number} - Index.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    at = prop,

    /**
     * @function module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    find = curry(findWhere),

    filter = curry((pred, xs) => {
        let ind = 0,
            limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = mempty(xs);
        if (!limit) { return out; }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out = aggregator(out, xs[ind]);
            }
        }
        return out;
    }),

    /**
     * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
     * do not match the tuple are in second list in the returned tuple.
     *  Essentially `[filter(p, xs), filter(negateP(p), xs)]`.
     * @function module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    partition = curry((pred, arr) => {
        const limit = length(arr),
            receivedString = isString(arr),
            zero = receivedString ? '' : [];
        if (!limit) { return [zero, zero]; }
        return [filter(pred, arr), filter(negateP(pred), arr)];
    }),

    elem = curry((elm, xs) => indexOf(elm, xs) !== -1),

    notElem = curry((elm, xs) => indexOf(elm, xs) === -1),

    lookup = curry((key, xs) => hasOwnProperty(key, xs) ? xs[key] : undefined),

    isPrefixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = 0;
        for (; ind < limit1; ind++) {
            if (xs1[ind] !== xs2[ind]) { return false; }
        }
        return true;
    }),

    isSuffixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind1 = limit1 - 1,
            ind2 = limit2 - 1;
        for (; ind1 >= 0; ind1--) {
            if (xs1[ind1] !== xs2[ind2]) { return false; }
            ind2 -= 1;
        }
        return true;
    }),

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
                if (xs2[ind1 + ind] === xs1[ind1]) { foundLen += 1; }
                if (foundLen === limit1) { return true; }
            }
        }
        return false;
    }),

    isSubsequenceOf = curry((xs1, xs2) => {
        const len = Math.pow(2, length(xs2)),
            lenXs1 = length(xs1);
        let foundLen,
            i;
        for (i = 0; i < len; i += 1) {
            foundLen = 0;
            for (let j = 0; j < len; j += 1) {
                if (i & (1 << j) && indexOf(xs2[j], xs1) > -1) { foundLen += 1; }
                if (foundLen === lenXs1) { return true; }
            }
        }
        return false;
    }),

    group = xs => {
        const limit = length(xs);
        if (!limit) { return sliceToEndFrom(0, xs); }
        let ind = 0,
            prevItem,
            item,
            agg = [];
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(
                takeWhile (x => {
                        if (x === prevItem) { ind++; }
                        if (x === item) { prevItem = x; return true; }
                        return false;
                    },
                    slice(ind, limit, xs)
                )
            );
        }
        return agg;
    },

    inits = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) { return []; }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(0, ind, xs));
        }
        return agg;
    }, //map(list => init(list), xs),

    tails = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) { return []; }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(ind, limit, xs));
        }
        return agg;
    }, //map(list => tail(list), xs),

    stripPrefix = curry((prefix, list) =>
        isPrefixOf(prefix, list) ?
            splitAt(prefix.length, list)[1] :
                sliceToEndFrom(0, list)),

    /**
     * Flattens an list.
     * @function module:listOps.flatten
     * @param arr {Array}
     * @returns {Array}
     */
    flatten = arr => reduce((agg, elm) => {
        if (isArray(elm)) {
            return mappend(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, [], arr),

    /**
     * Flattens all arrays passed in into one list.
     * @function module:listOps.flattenMulti
     * @param arr {Array}
     * @param [...arrays{Array}] - Other arrays to flatten into new list.
     * @returns {Array}
     */
    flattenMulti = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => mappend(agg, flatten(arr)), flatten(arr0), arrays)),

    /**
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
     * @function module:listOps.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = curry((arr1, arr2) => {
        if (!length(arr1) || !length(arr2)) { return mempty(arr1); }
        const [a1, a2] = lengthsToSmallest(arr1, arr2);
        return reduce((agg, item, ind) =>
                aggregateArr(agg, [item, a2[ind]]),
            [], a1);
    }),

    /**
     * zipN takes one or more lists and returns a list containing lists of all indices
     * at a given index, index by index.
     * If one input list is short, excess elements of the longer list are discarded.
     * @function module:listOps.zipN
     * @param lists {...<Array|String>}
     * @returns {Array}
     */
    zipN = (...lists) => {
        const trimmedLists = apply(lengthsToSmallest, filter(length, lists)),
        lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) { return []; }
        else if (lenOfTrimmed === 1) {
            return slice(0, length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind, list) =>
                aggregateArr(agg, map(xs => xs[ind], trimmedLists)),
            [], trimmedLists[0]);
    },

    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
     * @function module:listOps.zip3
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip3 = curry3(zipN),

    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
     * @function module:listOps.zip4
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip4 = curry4(zipN),

    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
     * @function module:listOps.zip5
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip5 = curry5(zipN),

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
     * @function module:listOps.zipWith
     * @param op {Function} - Takes two parts of a tuple and returns a tuple.
     *  E.g., ` op :: a -> b -> (a, b)`
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWith = curry((op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) { return mempty(xs1); }
        const [a1, a2] = lengthsToSmallest(xs1, xs2);
        return reduce((agg, item, ind) =>
                aggregateArr(agg, op(item, a2[ind])),
            [], a1);
    }),

    /**
     * Zips all given lists with tupling function. Note: Haskell types do not have
     *  a way (that I know of) to show one or more for params in a function so `@haskellType` below
     *  is left there for general purpose not for exactness as is told by aforementioned.
     * @haskellType `zipWithN :: (a -> b -> c) -> [a] -> [b] -> [c]` - Where `N` is the number
     *  of lists to zip.
     * @function module:listOps.zipWithN
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param lists ...{Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWithN = (op, ...lists) => {
        const trimmedLists = apply(lengthsToSmallest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) { return []; }
        else if (lenOfTrimmed === 1) {
            return slice(0, length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind, list) =>
                aggregateArr(agg, apply(op, map(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    },

    /**
     * Zips 3 lists with tupling function.
     * @haskellType `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
     * @function module:listOps.zipWith3
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @param xs3 {Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWith3 = curry4(zipWithN),

    /**
     * Zips 4 lists with tupling function.
     * @haskellType `zipWith4 :: (a -> b -> c -> d -> e) -> [a] -> [b] -> [c]  -> [d] -> [e]`
     * @function module:listOps.zipWith4
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> d -> (a, b, c, d)`
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @param xs3 {Array|String|*}
     * @param xs4 {Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWith4 = curry5(zipWithN),

    /**
     * Zips 5 lists.
     * @haskellType `zipWith5 :: (a -> b -> c -> d -> e -> f) -> [a] -> [b] -> [c]  -> [d] -> [e] -> [f]`
     * @function module:listOps.zipWith5
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> d -> e -> (a, b, c, d, e)`
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @param xs3 {Array|String|*}
     * @param xs4 {Array|String|*}
     * @param xs5 {Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWith5 = curryN(6, zipWithN),

    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
     * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
     * @function module:listOps.unzip
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
     * @function module:listOps.unzip
     * @param list {Array|*} - List of tuples (lists).
     * @returns {Array|*}
     */
    unzipN = list => {
        if (!length(list)) { return []; }
        const lenItem0 = length(list[0]);
        let zero = lenItem0 ?
            unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) :
            [];
        return foldl((agg, item) => {
            agg.forEach((outList, ind) => outList.push(item[ind]));
            return agg;
        }, zero, list);
    },

    any = curry((p, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return false; }
        for (; ind < limit; ind += 1) {
            if (p(xs[ind])) { return true; }
        }
        return false;
    }),

    all = curry((p, xs) => {
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
    }),

    and = all(isTruthy),

    or = any(isTruthy),

    not = all(isFalsy),

    sum = list => reduce((agg, x) => agg + x, 0, list),

    product = arr => reduce((agg, x) => agg * x, 1, arr),

    maximum = arr => apply(Math.max, arr),

    minimum = arr => apply(Math.min, arr),

    /**
     * Creates a arrayUnion on matching elements from array1.
     * @function module:listOps.arrayUnion
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    arrayUnion = curry((arr1, arr2) =>
        mappend(arr1, filter(elm => indexOf(elm, arr1) === -1, arr2))),

    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:listOps.arrayIntersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    arrayIntersect = curry((arr1, arr2) => length(arr2) === 0 ? [] :
            filter(elm => indexOf(elm, arr2) > -1, arr1)),

    /**
     * Returns the difference of list 1 from list 2.
     * @function module:listOps.arrayDifference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    arrayDifference = curry((array1, array2) => { // augment this with max length and min length ordering on op
        let [arr1, arr2] = sortDescByLength(array1, array2);
        if (!arr2 || length(arr2) === 0) {
            return slice(0, length(arr1), arr1);
        }
        return reduce((agg, elm) => {
            if (indexOf(elm, arr2) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    }),

    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:listOps.arrayComplement
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    arrayComplement = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => mappend(agg, arrayDifference(arr0, arr)), [], arrays));
