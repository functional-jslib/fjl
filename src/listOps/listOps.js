/**
 * Array operators module.
 * @module arrayOps
 */
import {curry, curry2}      from '../functionOps/curry';
import {apply}              from '../functionOps/apply';
import {negateP}            from '../functionOps/functionOps';
import {isTruthy, isFalsy}  from '../booleanOps/is';
import {isString, isArray, isset}  from '../objectOps/is';
import {prop}               from '../objectOps/prop';
import {typeOf}             from '../objectOps/typeOf';
import {length, keys as objectKeys, hasOwnProperty} from '../objectOps/objectPrelude';
import {concat as arrayConcat, slice}   from './listOpsPrelude';
// import {log}                            from '../../tests/for-server/helpers';
import {fPureTakesOne}                  from '../utils/utils';

const

    ASC = 1,

    DESC = -1,

    sliceToEndFrom = curry((startInd, arr) => slice(startInd, length(arr), arr)),

    sliceFromZero = sliceToEndFrom(0),

    onlyOneOrNegOne = x => x === 1 || x === -1 ? x : 1,

    getSortByOrder = curry((multiplier, valueFn) => {
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
    }),

    sortDesc = getSortByOrder(DESC),

    sortAsc = getSortByOrder(ASC),

    sortDescByLength = getSortByOrder(DESC, x => length(x)),

    lengths = curry2((...arrs) => length(arrs) ? arrs.map(length) : []),

    getOrderedLengths = curry2((orderDir, ...arrs) => (orderDir ? sortAsc : sortDesc)(lengths(arrs))),

    trimLengths = (...arrays) => {
        const smallLen = getOrderedLengths(ASC, arrays)[0];
        return arrays.map(arr => length(arr) > smallLen ? slice(0, smallLen, arr) : sliceFromZero(arr));
    },

    aggregateStr = (agg, item) => {
        agg += item;
        return agg;
    },

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
        if (limit === 0) {
            return agg;
        }
        let ind = 0,
            result = agg,
            keys = objectKeys(arr),
            key;
        for (; ind < limit; ind++) {
            key = keys[ind];
            if (pred(arr[key], key, arr)) { break; }
            result = op(result, arr[key], key, arr);
        }
        return result;
    },

    reduceRightUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (limit === 0) {
            return agg;
        }
        let ind = limit - 1,
            result = agg,
            keys = objectKeys(arr),
            key;
        for (; ind >= 0; ind--) {
            key = keys[ind];
            if (pred(arr[key], key, arr)) { break; }
            result = op(result, arr[key], key, arr);
        }
        return result;
    },

    reduce = curry((operation, agg, arr) =>
        reduceUntil(
            () => false,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr)),                  // listOps

    reduceRight = curry((operation, agg, arr) =>
        reduceRightUntil(
            () => false,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr)),                  // listOps

    strConcat = (x, ...args) => reduce(aggregateStr, x, args),

    /**
     * Searches list/list-like for given element `x`.
     * @functionOps module:listOps.indexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - listOps or listOps like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf = fPureTakesOne('indexOf'),

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @functionOps module:listOps.lastIndex
     * @param x {Array|String|*} - listOps like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = x => { const len = length(x); return len ? len - 1 : 0; },

    /**
     * Finds index in stringOps or listOps.
     * @functionOps module:listOps.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = curry((pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    }),

    /**
     * @functionOps module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    findWhere = curry((pred, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return; }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) { return elm; }
        }
    });

export const

    /**
     * Append two lists, i.e.,
     * ```
     * append([x1, ..., xm], [y1, ..., yn]) // outputs: [x1, ..., xm, y1, ..., yn]
     * append([x1, ..., xm], [y1, ...]) // outputs: [x1, ..., xm, y1, ...]
     * ```
     * If the first list is not finite, the result is the first list.
     * @haskellType `append :: [a] -> [a] -> [a]`
     * @functionOps module:listOps.append
     * @param xs1 {Array|String|*} - listOps or list like.
     * @param xs2 {Array|String|*} - listOps or list like.
     * @returns {Array|String|*} - Same type as list like passed in.
     */
    append = curry((xs1, xs2) => (isArray(xs1) ? arrayConcat : strConcat)(xs1, xs2)),

    /**
     * Append two or more lists, i.e., same as `append` but for two ore more lists.
     * @functionOps module:listOps.appendMany
     * @param xs1 {Array|String|*} - listOps or list like.
     * @param [...args] {Array|String|*} - Lists or lists likes.
     * @returns {Array|String|*} - Same type as first list or list like passed in.
     */
    appendMany = curry2((x, ...args) => (isArray(x) ? arrayConcat : strConcat)(x, ...args)),

    /**
     * Returns head of listOps (first item of listOps).
     * @haskellType `head :: [a] -> a`
     * @functionOps module:listOps.head
     * @param x {Array|String}
     * @returns {*} - First item from listOps
     */
    head = x => x[0],

    /**
     * Returns last item of listOps.
     * @haskellType `last :: [a] -> a`
     * @functionOps module:listOps.last
     * @param functor {Array|String}
     * @returns {*}
     */
    last = functor => functor[lastIndex(functor)],

    /**
     * Returns tail part of listOps (everything after the first item as new listOps).
     * @haskelType `tail :: [a] -> [a]`
     * @functionOps module:listOps.tail
     * @param functor {Array}
     * @returns {Array}
     */
    tail = functor => sliceToEndFrom(1, functor),

    /**
     * Returns everything except last item of listOps as new listOps.
     * @haskellType `init :: [a] -> [a]`
     * @functionOps module:listOps.init
     * @param functor {Array|String}
     * @returns {Array|String}
     */
    init = functor => slice(0, lastIndex(functor), functor),

    /**
     * Returns `head` and `tail` of passed in listOps/stringOps in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @functionOps module:listOps.uncons
     * @param x {Array|String}
     * @returns {Array|String|*|undefined}
     */
    uncons = x => {
        if (!x) { return undefined; }
        const len = length(x);
        if (len === 0) {
            return undefined;
        }
        return [head(x), tail(x)];
    },

    map = curry ((fn, xs) => {
        let ind = -1,
            limit = length(xs),
            out = (xs).constructor(),
            aggregate = aggregatorByType(xs);
        while (++ind < limit) {
            out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
        }
        return out;
    }),

    concat = foldableOfA => appendMany(...foldableOfA),

    concatMap = curry((fn, foldableOfA) => concat(map(fn, foldableOfA))),

    reverse = x => reduceRight((agg, item) => {
        agg.push(item);
        return agg;
    }, x.constructor(), x),

    intersperse = curry((between, arr) => {
        const limit = length(arr) - 1,
            aggregator = (arr).constructor(),
            aggregatorOp = aggregatorByType(arr);
        return reduce((agg, item, ind) => {
            if (ind === limit) {
                return aggregatorOp(agg, item);
            }
            return aggregatorOp(
                aggregatorOp(agg, item),
                between
            );
        }, aggregator, arr);
    }),

    intercalate = curry((xs, xss) => concat(intersperse(xs, xss))),

    transpose = xss => {
        const orderedLengths = getOrderedLengths(DESC, ...xss),
            out = new Array(orderedLengths[0]);
        return reduce((agg, item) =>
            reduce((agg2, element, ind2) => {
                agg2[ind2].push(element);
                return agg2;
            }, agg, item), out.map(() => []), xss);
    },

    /**
     * Generates 2^n sub-sequences for passed in sequence (stringOps/listOps) (`n` is
     * the length of the passed in sequence so: 2^length(xs)).
     * Note: The return value doubles per index/character passed in so use with caution!
     *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
     *  will generate 65536 sub-sequences!  So caution should be taken to not
     *  use this with sequences above a certain length on certain platform (the browser thread in specific).
     * @functionOps module:listOps.subsequences
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

    foldl = reduce,

    foldr = reduceRight,

    foldl1 = curry((op, xs) => {
        const arr = sliceToEndFrom(0, xs);
        return reduce (op, arr.shift(), arr);
    }),

    foldr1 = curry((op, xs) => {
        const arr = sliceToEndFrom(0, xs);
        return reduceRight (op, arr.pop(), arr);
    }),

    /**
     * Accumulative map functionOps which effectively does a map and reduce (from the left) all in one;  Returns a tuple
     * containing the aggregated value and the mapped result of map the passed in `op` on the passed in
     * list (`xs`).
     * @functionOps module:listOps.mapAccumL
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - listOps type.
     * @return {Array} - [aggregated, listOps]
     */
    mapAccumL = curry((op, zero, xs) => {
        const list = sliceToEndFrom(0, xs),
            limit = length(xs);
        if (!limit) { return [zero, list]; }
        let ind = 0,
            agg = zero,
            mapped = xs.constructor(),
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
     * @functionOps module:listOps.mapAccumR
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - listOps type.
     * @return {Array} - [aggregated, listOps]
     */
    mapAccumR = curry((op, zero, xs) => {
        const list = sliceToEndFrom(0, xs),
            limit = length(xs);
        if (!limit) { return [zero, list]; }
        let ind = limit - 1,
            agg = zero,
            mapped = xs.constructor(),
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    }),

    unfoldr = curry((op, x, zero) => {
        let ind = 0,
            out = !isset(zero) ? [] : zero,
            aggregator = aggregatorByType(out),
            resultTuple = op(x, ind, out);
        while (isset(resultTuple[1])) {
            out = aggregator(out, resultTuple[0], ind);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    }),

    /**
     * Finds index in stringOps or listOps (alias for `findIndex`).
     * @functionOps module:listOps.findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndex = findIndexWhere,

    /**
     * @functionOps module:listOps.findIndicesWhere
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = curry((pred, xs) => {
        const limit = length(xs);
        if (!limit) { return undefined; }
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out;
    }),

    /**
     * @functionOps module:listOps.findIndices
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {Array|undefined}
     */
    findIndices =  findIndicesWhere,

    /**
     * @functionOps module:listOps.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    elemIndex = curry((x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    }),

    /**
     * @functionOps module:listOps.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    elemIndices = curry((value, xs) => findIndices(x => x === value, xs)),

    /**
     * Takes `n` items from start of listOps to `limit` (exclusive).
     * @functionOps module:listOps.take
     * @param listOps {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = curry((limit, array) => slice(0, limit, array)),

    /**
     * Drops `n` items from start of listOps to `count` (exclusive).
     * @functionOps module:listOps.take
     * @param listOps {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = curry((count, array) => sliceToEndFrom(count, array)),

    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned listOps)).
     * @functionOps module:listOps.splitAt
     * @param ind {Number} - Index to split at.
     * @param functor {Array|String} - functor (listOps or stringOps) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = curry((ind, arr) => [
        slice(0, ind, arr),
        sliceToEndFrom(ind, arr)
    ]),

    /**
     * Gives an listOps with passed elements while predicate was true.
     * @functionOps module:listOps.takeWhile
     * @param pred {Function} - Predicate<*, index, listOps|stringOps>
     * @param arr {Array|String}
     * @returns {Array}
     */
    takeWhile = curry((pred, arr) => {
        let zero =  (arr).constructor();
        const operation = aggregatorByType(arr);
        return reduceUntil (
            negateP(pred),  // predicate
            operation,      // operation
            zero,           // aggregator
            arr
        );
    }),

    /**
     * Returns an listOps without elements that match predicate.
     * @functionOps module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, listOps|stringOps>
     * @param arr {Array|String}
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
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @functionOps module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type listOps or stringOps)).
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
     * @functionOps module:listOps.at
     * @param ind {Number} - Index.
     * @param xs {Array|String|*} - listOps or listOps like.
     * @returns {*}
     */
    at = prop,

    /**
     * @functionOps module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    find = findWhere,

    filter = curry ((pred, xs) => {
        let ind = 0,
            limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = (xs).constructor();
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
     * @functionOps module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type listOps or stringOps)).
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
        let ind = limit2 - 1;
        for (; ind >= 0; ind--) {
            if (xs1[ind] !== xs2[ind]) { return false; }
        }
        return true;
    }),

    isInfixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = limit2 - 1;
        for (; ind >= 0; ind--) {
            if (xs1[ind] !== xs2[ind]) { return false; }
        }
        return true;
    }),

    group = xs => [xs],

    inits = xs => [xs],

    tails = xs => [xs],

    stripPrefix = curry((prefix, arr) =>
        isPrefixOf(prefix, arr) ? splitAt(prefix.length, arr)[1] : sliceToEndFrom(0, arr)),

    /**
     * Flattens an listOps.
     * @functionOps module:listOps.flatten
     * @param arr {Array}
     * @returns {Array}
     */
    flatten = arr => reduce((agg, elm) => {
        if (isArray(elm)) {
            return append(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, [], arr),

    /**
     * Flattens all arrays passed in into one listOps.
     * @functionOps module:listOps.flattenMulti
     * @param arr {Array}
     * @param [...arrays{Array}] - Other arrays to flatten into new listOps.
     * @returns {Array}
     */
    flattenMulti = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => append(agg, flatten(arr)), flatten(arr0), arrays)),

    /**
     * zip :: [a] -> [b] -> [(a, b)]
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @functionOps module:listOps.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = curry((arr1, arr2) => {
        const {0: a1, 1: a2} = trimLengths(arr1, arr2);
        return reduce((agg, item, ind) => {
                agg.push([item, a2[ind]]);
            return agg;
        }, [], a1);
    }),

    zipN = curry2((...arrs) => {
        const lists = apply(trimLengths, arrs);
        return reduce((agg, arr, ind) => {
            if (!ind) {
                return zip (agg, arr);
            }
            return agg.map (arr2 => {
                arr.forEach (elm => {
                    arr2.push(elm);
                });
                return arr2;
            });
        }, lists.shift(), lists);
    }),

    /**
     * zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
     * zipWith generalises zip by zipping with the functionOps given as the
     * first argument, instead of a tupling functionOps. For example,
     * zipWith (+) is applied to two lists to produce the list of corresponding sums.
     * @type {Function}
     */
    zipWith = curry((combinator, xs1, xs2) => []),

    /**
     * unzip :: [(a, b)] -> ([a], [b])
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @param arr
     */
    unzip = arr =>
        reduce((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr),

    unzipN = (...arrs) =>
        reduce((agg, item) => {
            agg.push(unzip(item));
            return agg;
        }, [], arrs),

    any = curry((p, xs) => reduceUntil(p, (() => true), false, xs)),

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

    equal = curry2((arg0, ...args) => all(x => arg0 === x, args)),

    sum = arr => {
        const parts = uncons(arr);
        return reduce((agg, x) => agg + x, parts[0], parts[1]);
    },

    product = arr => {
        const parts = uncons(arr);
        return reduce((agg, x) => agg * x, parts[0], parts[1]);
    },

    maximum = arr => apply(Math.max, arr),

    minimum = arr => apply(Math.min, arr),

    /**
     * Creates a arrayUnion on matching elements from array1.
     * @functionOps module:listOps.arrayUnion
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    arrayUnion = curry((arr1, arr2) =>
        append(arr1, filter(elm => indexOf(elm, arr1) === -1, arr2))),

    /**
     * Performs an intersection on listOps 1 with  elements from listOps 2.
     * @functionOps module:listOps.arrayIntersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    arrayIntersect = curry((arr1, arr2) => length(arr2) === 0 ? [] :
            filter(elm => indexOf(elm, arr2) > -1, arr1)),

    /**
     * Returns the difference of listOps 1 from listOps 2.
     * @functionOps module:listOps.arrayDifference
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
     * Returns the complement of listOps 0 and the reset of the passed in arrays.
     * @functionOps module:listOps.arrayComplement
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    arrayComplement = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => append(agg, arrayDifference(arr0, arr)), [], arrays));
