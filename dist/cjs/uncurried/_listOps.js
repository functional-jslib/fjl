'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.complement = exports.difference = exports.intersectBy = exports.intersect = exports.union = exports.unionBy = exports.removeFirstsBy = exports.removeBy = exports.nubBy = exports.insertBy = exports.insert = exports.sortBy = exports.sortOn = exports.sort = exports.remove = exports.nub = exports.scanr1 = exports.scanr = exports.scanl1 = exports.scanl = exports.minimum = exports.maximum = exports.product = exports.sum = exports.not = exports.or = exports.and = exports.all = exports.any = exports.unzipN = exports.unzip = exports.zipWith5 = exports.zipWith4 = exports.zipWith3 = exports.zipWithN = exports.zipWith = exports.zip5 = exports.zip4 = exports.zip3 = exports.zipN = exports.zip = exports.stripPrefix = exports.tails = exports.inits = exports.groupBy = exports.group = exports.isSubsequenceOf = exports.isInfixOf = exports.isSuffixOf = exports.isPrefixOf = exports.lookup = exports.notElem = exports.elem = exports.partition = exports.filter = exports.find = exports.at = exports.breakOnList = exports.span = exports.dropWhileEnd = exports.dropWhile = exports.takeWhile = exports.splitAt = exports.drop = exports.take = exports.elemIndices = exports.elemIndex = exports.findIndices = exports.findIndex = exports.unfoldr = exports.cycle = exports.replicate = exports.repeat = exports.iterate = exports.mapAccumR = exports.mapAccumL = exports.foldr1 = exports.foldl1 = exports.foldr = exports.foldl = exports.permutations = exports.subsequences = exports.transpose = exports.intercalate = exports.intersperse = exports.reverse = exports.concatMap = exports.concat = exports.unconsr = exports.uncons = exports.init = exports.tail = exports.last = exports.head = exports.appendMany = exports.append = exports.map = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * List operations module.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @module _listOps
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


var _list = require('./_jsPlatform/_list');

var _function = require('./_jsPlatform/_function');

var _negate = require('./_functionOps/_negate');

var _booleanOps = require('../booleanOps');

var _objectOps = require('./_objectOps');

var _map = require('./_listOps/_map');

var _utils = require('./_listOps/_utils');

// Exported imports
exports.map = _map.map;

// Exported internals

var

/**
 * Append two lists, i.e.,
 * ```
 * append([x1, ..., xm], [y1, ..., yn]) // outputs: [x1, ..., xm, y1, ..., yn]
 * append([x1, ..., xm], [y1, ...]) // outputs: [x1, ..., xm, y1, ...]
 * ```
 * If the first list is not finite, the result is the first list.
 * @haskellType `append :: List a => a -> a -> a`
 * @function module:_listOps.append
 * @param xs1 {Array|String|*} - list or list like.
 * @param xs2 {Array|String|*} - list or list like.
 * @returns {Array|String|*} - Same type as list like passed in.
 */
append = exports.append = _list.concat,


/**
 * Append two or more lists, i.e., same as `append` but for two ore more lists.
 * @haskellType `appendMany :: List a => a -> [a] -> a
 * @note In `@haskellType` we wrote `[a]` only to keep the haskell type valid though note in javascript
 *  this is actually different since the function converts the zero ore more parameters into an array containing such for us.
 * @function module:_listOps.appendMany
 * @param args ...{Array|String|*} - Lists or lists likes.
 * @returns {Array|String|*} - Same type as first list or list like passed in.
 */
appendMany = exports.appendMany = function appendMany() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if ((0, _objectOps.length)(args)) {
        return (0, _function.apply)(_list.concat, args);
    }
    throw new Error('`appendMany` requires at least one arg.');
},


/**
 * Returns head of list (first item of list).
 * @haskellType `head :: [a] -> a`
 * @function module:_listOps.head
 * @param x {Array|String}
 * @returns {*} - First item from list
 */
head = exports.head = function head(x) {
    return x[0];
},


/**
 * Returns last item of list.
 * @haskellType `last :: [a] -> a`
 * @function module:_listOps.last
 * @param xs {Array|String}
 * @returns {*}
 */
last = exports.last = function last(xs) {
    return xs[(0, _utils.lastIndex)(xs)];
},


/**
 * Returns tail part of list (everything after the first item as new list).
 * @haskelType `tail :: [a] -> [a]`
 * @function module:_listOps.tail
 * @param xs {Array}
 * @returns {Array}
 */
tail = exports.tail = function tail(xs) {
    return (0, _utils.sliceFrom)(1, xs);
},


/**
 * Returns everything except last item of list as new list.
 * @haskellType `init :: [a] -> [a]`
 * @function module:_listOps.init
 * @param xs {Array|String}
 * @returns {Array|String}
 */
init = exports.init = function init(xs) {
    return (0, _utils.sliceTo)((0, _utils.lastIndex)(xs), xs);
},


/**
 * Returns `head` and `tail` of passed in list/string in a tuple.
 * @haskellType `uncons :: [a] -> Maybe (a, [a])`
 * @function module:_listOps.uncons
 * @param xs {Array|String}
 * @returns {Array|String|*|undefined}
 */
uncons = exports.uncons = function uncons(xs) {
    if (!xs) {
        return;
    }
    if ((0, _objectOps.length)(xs) === 0) {
        return undefined;
    }
    return [head(xs), tail(xs)];
},


/**
 * Returns `tail` and `head` of passed in list/string in a tuple.
 * @haskellType `unconsr :: [a] -> Maybe ([a], a)`
 * @function module:_listOps.unconsr
 * @param xs {Array|String}
 * @returns {Array|String|*|undefined}
 */
unconsr = exports.unconsr = function unconsr(xs) {
    if (!xs) {
        return;
    }
    if ((0, _objectOps.length)(xs) === 0) {
        return undefined;
    }
    return [init(xs), last(xs)];
},


/**
 * Concatenates all the elements of a container of lists.
 * @haskellType `concat :: Foldable t => t [a] -> [a]`
 * @function module:_listOps.concat
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
concat = exports.concat = function concat(xs) {
    if (!(0, _objectOps.length)(xs)) {
        return (0, _utils.copy)(xs);
    }
    return (0, _objectOps.isString)(xs) ? xs : (0, _function.apply)(appendMany, xs);
},


/**
 * Map a function over all the elements of a container and concatenate the resulting lists.
 * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
 * @function module:_listOps.concatMap
 * @param fn {Function}
 * @param foldableOfA {Array|String|*}
 * @returns {Array|String|*}
 */
concatMap = exports.concatMap = function concatMap(fn, foldableOfA) {
    return concat((0, _map.map)(fn, foldableOfA));
},


/**
 * Returns a copy of the passed in list reverses.
 * @haskellType `reverse :: [a] -> [a]`
 * @function module:_listOps.reverse
 * @param x {Array|String|*}
 * @returns {Array|String|*}
 */
reverse = exports.reverse = function reverse(x) {
    var aggregator = (0, _utils.aggregatorByType)(x);
    return foldr(function (agg, item, ind) {
        return aggregator(agg, item, ind);
    }, (0, _objectOps.of)(x), x);
},


/**
 * Takes an element and a list and `intersperses' that element between the elements of the list. For example
 * @function module:_listOps.intersperse
 * @note In our version of the function javascript is loosely typed so, so is our function (to much overhead to make
 *  it typed) so `between` can be any value.
 * @param between {*} - Should be of the same type of elements contained in list.
 * @param arr {Array|String|*} - List.
 * @returns {Array|String|*}
 */
intersperse = exports.intersperse = function intersperse(between, arr) {
    var limit = (0, _objectOps.length)(arr),
        lastInd = limit - 1,
        aggregator = (0, _objectOps.of)(arr),
        aggregatorOp = (0, _utils.aggregatorByType)(arr);
    if (!limit) {
        return aggregator;
    }
    return foldl(function (agg, item, ind) {
        return ind === lastInd ? aggregatorOp(agg, item) : aggregatorOp(aggregatorOp(agg, item), between);
    }, aggregator, arr);
},


/**
 * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
 * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
 * @function module:_listOps.intercalate
 * @param xs {Array|String|*}
 * @param xss {Array|String|*}
 * @returns {Array|String|*}
 */
intercalate = exports.intercalate = function intercalate(xs, xss) {
    return concat(intersperse(xs, xss));
},


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
transpose = exports.transpose = function transpose(xss) {
    var numLists = (0, _objectOps.length)(xss),
        ind = 0,
        ind2 = void 0;
    if (!numLists) {
        return (0, _objectOps.of)(xss);
    }
    var listLengths = (0, _function.apply)(_utils.lengths, xss),
        longestListLen = maximum(listLengths),
        outLists = [];
    for (; ind < longestListLen; ind += 1) {
        var outList = [];
        for (ind2 = 0; ind2 < numLists; ind2 += 1) {
            if (listLengths[ind2] < ind + 1) {
                continue;
            }
            outList.push(xss[ind2][ind]);
        }
        outLists.push(outList);
    }
    return filter(function (x) {
        return (0, _objectOps.length)(x);
    }, outLists);
},


/**
 * Generates 2^n sub-sequences for passed in sequence (string/list) (`n` is
 * the length of the passed in sequence so: 2^length(xs)).
 * Note: The return value doubles per index/character passed in so use with caution!
 *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
 *  will generate 65536 sub-sequences!  So caution should be taken to not
 *  use this with sequences above a certain length on certain platform (the browser thread in specific).
 * @function module:_listOps.subsequences
 * @param xs {Array|String}
 * @returns {Array}
 */
subsequences = exports.subsequences = function subsequences(xs) {
    var len = Math.pow(2, (0, _objectOps.length)(xs)),
        out = [];
    for (var i = 0; i < len; i += 1) {
        var entry = [];
        for (var j = 0; j < len; j += 1) {
            if (i & 1 << j) {
                entry.push(xs[j]);
            }
        }
        out.push(entry);
    }
    return out;
},


/**
 * Returns a list of permutations for passed in list.
 *  Use caution with lists above a length of 15 (will take long due to nature of
 *  algorithm).
 * @function module:_listOps.permutations
 * @param xs {Array|String|*} - List.
 * @returns {Array<Array|String|*>} - Array of permutations.
 */
permutations = exports.permutations = function permutations(xs) {
    var limit = (0, _objectOps.length)(xs);
    return !limit ? [xs] : (0, _utils._permutationsAlgo)(xs, limit, limit);
},


/**
 * Left associative fold.  Reduces a container of elements down by the given operation (same as [].reduce).
 * @function module:_listOps.foldl
 * @param fn {Function}
 * @param zero {*} - Aggregator.
 * @param functor {Array|String|*}
 * @returns {*} - Whatever type is lastly returned from `fn`.
 */
foldl = exports.foldl = _utils.reduce,


/**
 * Right associative fold.  Reduces a container of elements down by the given operation (same as [].reduceRight).
 * @function module:_listOps.foldr
 * @param fn {Function}
 * @param zero {*} - Aggregator.
 * @param functor {Array|String|*}
 * @returns {*} - Whatever type is lastly returned from `fn`.
 */
foldr = exports.foldr = _utils.reduceRight,


/**
 * A variant of `foldl` except that this one doesn't require the starting point.  The starting point/value will be pulled
 * out from a copy of the container.
 * @function module:_listOps.foldl1
 * @param op {Function}
 * @param xs {Array|String|*}
 * @returns {*} - Whatever type is lastly returned from `op`.
 */
foldl1 = exports.foldl1 = function foldl1(op, xs) {
    var parts = uncons(xs);
    if (!parts) {
        return (0, _objectOps.of)(xs);
    }
    return (0, _utils.reduce)(op, parts[0], parts[1]);
},


/**
 * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting point/value will be pulled
 * out from a copy of the container.
 * @function module:_listOps.foldr1
 * @param op {Function}
 * @param xs {Array|String|*}
 * @returns {*} - Whatever type is lastly returned from `op`.
 */
foldr1 = exports.foldr1 = function foldr1(op, xs) {
    var parts = unconsr(xs);
    if (!parts) {
        return (0, _objectOps.of)(xs);
    }
    return (0, _utils.reduceRight)(op, parts[1], parts[0]);
},


/**
 * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
 * containing the aggregated value and the result of mapping the passed in function on passed in list.
 * @function module:_listOps.mapAccumL
 * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
 * @param zero {*} - An instance of the passed in list type used to aggregate on.
 * @param xs {Array|String|*} - list type.
 * @return {Array} - [aggregated, list]
 */
mapAccumL = exports.mapAccumL = function mapAccumL(op, zero, xs) {
    var list = (0, _utils.sliceFrom)(0, xs),
        limit = (0, _objectOps.length)(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = 0,
        agg = zero,
        mapped = (0, _objectOps.of)(xs),
        tuple = void 0;
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
 * @param xs {Array|String|*} - list type.
 * @return {Array} - [aggregated, list]
 */
mapAccumR = exports.mapAccumR = function mapAccumR(op, zero, xs) {
    var list = (0, _utils.sliceFrom)(0, xs),
        limit = (0, _objectOps.length)(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = limit - 1,
        agg = zero,
        mapped = (0, _objectOps.of)(xs),
        tuple = void 0;
    for (; ind >= 0; ind--) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
},


/**
 * Iterate on value (`x`) with `op` up to `limit`.
 * @function module:_listOps.iterate
 * @param limit {Number}
 * @param op {Function} - Operation
 * @param x {*} - Starting point.
 * @returns {*}
 */
iterate = exports.iterate = function iterate(limit, op, x) {
    var ind = 0,
        out = x;
    for (; ind < limit; ind += 1) {
        out = op(out, ind);
    }
    return out;
},


/**
 * Repeats `x` `limit` number of times
 * @function module:_listOps.repeat
 * @param limit {Number}
 * @param x {*}
 * @return {Array}
 */
repeat = exports.repeat = function repeat(limit, x) {
    return iterate(limit, function (agg) {
        agg.push(x);
        return agg;
    }, []);
},


/**
 * Same as `repeat` due to the nature of javascript (see haskell version for usage).
 * @function module:_listOps.replicate
 * @param limit {Number}
 * @param x {*}
 * @return {Array}
 */
replicate = exports.replicate = repeat,


/**
 * Replicates a list `limit` number of times and appends the results (concat)
 * @function module:_listOps.cycle
 * @param limit {Number}
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
cycle = exports.cycle = function cycle(limit, xs) {
    return concat(replicate(limit, xs));
},


/**
 * Unfolds a value into a list of somethings.
 * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
 * @function module:_listOps.unfoldr
 * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
 * @param x {*} - Starting parameter to unfold from.
 * @returns {Array} - An array of whatever you return from `op` yielded.
 */
unfoldr = exports.unfoldr = function unfoldr(op, x) {
    var ind = 0,
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
findIndex = exports.findIndex = _utils.findIndexWhere,


/**
 * @function module:_listOps.findIndices
 * @param pred {Function}
 * @param xs {Array|String|*} - list or list like.
 * @returns {Array|undefined}
 */
findIndices = exports.findIndices = _utils.findIndicesWhere,


/**
 * @function module:_listOps.elemIndex
 * @param x {*} - Element to search for.
 * @param xs {Array|String|*} - list or list like.
 * @returns {*}
 */
elemIndex = exports.elemIndex = function elemIndex(x, xs) {
    var foundInd = (0, _list.indexOf)(x, xs);
    return foundInd !== -1 ? foundInd : undefined;
},


/**
 * @function module:_listOps.elemIndices
 * @param value {*} - Element to search for.
 * @param xs {Array|String|*} - list or list like.
 * @returns {*}
 */
elemIndices = exports.elemIndices = function elemIndices(value, xs) {
    return findIndices(function (x) {
        return x === value;
    }, xs);
},


/**
 * Takes `n` items from start of list to `limit` (exclusive).
 * @function module:_listOps.take
 * @param list {Array|String}
 * @param limit {Number}
 * @returns {String|Array} - Passed in type's type
 */
take = exports.take = function take(limit, list) {
    return (0, _utils.sliceTo)(limit, list);
},


/**
 * Drops `n` items from start of list to `count` (exclusive).
 * @function module:_listOps.take
 * @param list {Array|String}
 * @param count {Number}
 * @returns {String|Array} - Passed in type's type
 */
drop = exports.drop = function drop(count, list) {
    return (0, _utils.sliceFrom)(count, list);
},


/**
 * Splits `x` in two at given `index` (exclusive (includes element/character at
 * given index in second part of returned list)).
 * @function module:_listOps.splitAt
 * @param ind {Number} - Index to split at.
 * @param list {Array|String|*} - functor (list or string) to split.
 * @returns {Array} - Array of whatever type `x` was when passed in
 */
splitAt = exports.splitAt = function splitAt(ind, list) {
    return [(0, _utils.sliceTo)(ind, list), (0, _utils.sliceFrom)(ind, list)];
},


/**
 * Gives an list with passed elements while predicate was true.
 * @function module:_listOps.takeWhile
 * @param pred {Function} - Predicate<*, index, list|string>
 * @param list {Array|String}
 * @returns {Array}
 */
takeWhile = exports.takeWhile = function takeWhile(pred, list) {
    var zero = (0, _objectOps.of)(list);
    var operation = (0, _utils.aggregatorByType)(list);
    return (0, _utils.reduceUntil)((0, _negate.negateP)(pred), // predicate
    operation, // operation
    zero, // aggregator
    list);
},


/**
 * Returns an list without elements that match predicate.
 * @function module:_listOps.dropWhile
 * @param pred {Function} - Predicate<*, index, list|string>
 * @param list {Array|String}
 * @refactor
 * @returns {Array|String}
 */
dropWhile = exports.dropWhile = function dropWhile(pred, list) {
    var limit = (0, _objectOps.length)(list),
        splitPoint = (0, _utils.findIndexWhere)(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? (0, _utils.sliceTo)(limit, list) : (0, _list.slice)(splitPoint, limit, list);
},


/**
 * @function module:_listOps.dropWhile
 * @param pred {Function} - Predicate<*, index, list|string>
 * @param list {Array|String}
 * @refactor
 * @returns {Array|String}
 */
dropWhileEnd = exports.dropWhileEnd = function dropWhileEnd(pred, list) {
    var limit = (0, _objectOps.length)(list),
        splitPoint = (0, _utils.findIndexWhereRight)(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? (0, _utils.sliceTo)(limit, list) : (0, _utils.sliceTo)(splitPoint + 1, list);
},


/**
 * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
 * the second list in the tuple is a list of the remaining elements in the given list.
 * **@Note: Not the same as `partition`.  Read descriptions closely!!!
 * @function module:_listOps.partition
 * @param pred {Function} - Predicate<item, index, originalArrayOrString>
 * @param list {Array|String|*} - Predicate<item, index, originalArrayOrString>
 * @returns {Array|String|*} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
 */
span = exports.span = function span(pred, list) {
    var splitPoint = (0, _utils.findIndexWhere)((0, _negate.negateP)(pred), list);
    return splitPoint === -1 ? splitAt(0, list) : splitAt(splitPoint, list);
},
    breakOnList = exports.breakOnList = function breakOnList(pred, list) {
    var splitPoint = (0, _utils.findIndexWhere)(pred, list);
    return splitPoint === -1 ? splitAt(0, list) : splitAt(splitPoint, list);
},


/**
 * @function module:_listOps.at
 * @param ind {Number} - Index.
 * @param xs {Array|String|*} - list or list like.
 * @returns {*}
 */
at = exports.at = _objectOps.prop,


/**
 * Find an item in structure of elements based on given predicate (`pred`).
 * @function module:_listOps.find
 * @param pred {Function}
 * @param xs {Array|String|*} - list or list like.
 * @returns {*} - Found item.
 */
find = exports.find = _utils.findWhere,


/**
 * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
 * @function module:_listOps.filter
 * @param pred {Function}
 * @param xs {Array|String|*} - list or list like.
 * @returns {Array|String|*} - Structure of filtered elements.
 */
filter = exports.filter = function filter(pred, xs) {
    var ind = 0,
        limit = (0, _objectOps.length)(xs),
        aggregator = (0, _utils.aggregatorByType)(xs),
        out = (0, _objectOps.of)(xs);
    if (!limit) {
        return out;
    }
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out = aggregator(out, xs[ind]);
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
 * @param list {Array|String|*}
 * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
 */
partition = exports.partition = function partition(pred, list) {
    if (!(0, _objectOps.length)(list)) {
        return [(0, _objectOps.of)(list), (0, _objectOps.of)(list)];
    }
    return [filter(pred, list), filter((0, _negate.negateP)(pred), list)];
},


/**
 * Returns a boolean indicating whether an element exists in given structure of elements.
 * @function module:_listOps.elem
 * @param element {*}
 * @param xs {Array|String|*}
 * @returns {Boolean}
 */
elem = exports.elem = _list.includes,


/**
 * The opposite of `elem` - Returns a boolean indicating whether an element exists in given list.
 * @function module:_listOps.elem
 * @param element {*}
 * @param xs {Array|String|*}
 * @returns {Boolean}
 */
notElem = exports.notElem = (0, _negate.negateF)(_list.includes),
    lookup = exports.lookup = at,
    isPrefixOf = exports.isPrefixOf = function isPrefixOf(xs1, xs2) {
    var limit1 = (0, _objectOps.length)(xs1),
        limit2 = (0, _objectOps.length)(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || (0, _list.indexOf)(xs1[0], xs2) === -1) {
        return false;
    }
    var ind = 0;
    for (; ind < limit1; ind++) {
        if (xs1[ind] !== xs2[ind]) {
            return false;
        }
    }
    return true;
},
    isSuffixOf = exports.isSuffixOf = function isSuffixOf(xs1, xs2) {
    var limit1 = (0, _objectOps.length)(xs1),
        limit2 = (0, _objectOps.length)(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || (0, _list.indexOf)(xs1[0], xs2) === -1) {
        return false;
    }
    var ind1 = limit1 - 1,
        ind2 = limit2 - 1;
    for (; ind1 >= 0; ind1--) {
        if (xs1[ind1] !== xs2[ind2]) {
            return false;
        }
        ind2 -= 1;
    }
    return true;
},
    isInfixOf = exports.isInfixOf = function isInfixOf(xs1, xs2) {
    var limit1 = (0, _objectOps.length)(xs1),
        limit2 = (0, _objectOps.length)(xs2);
    if (limit2 < limit1 || !limit1 || !limit2) {
        return false;
    }
    var ind1 = void 0,
        foundLen = void 0,
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
    isSubsequenceOf = exports.isSubsequenceOf = function isSubsequenceOf(xs1, xs2) {
    var len = Math.pow(2, (0, _objectOps.length)(xs2)),
        lenXs1 = (0, _objectOps.length)(xs1);
    var foundLen = void 0,
        i = void 0;
    for (i = 0; i < len; i += 1) {
        foundLen = 0;
        for (var j = 0; j < len; j += 1) {
            if (i & 1 << j && (0, _list.indexOf)(xs2[j], xs1) > -1) {
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
 * @param xs {Array|String|*}
 * @returns {Array<Array|String|*>|*}
 */
group = exports.group = function group(xs) {
    return groupBy(function (a, b) {
        return a === b;
    }, xs);
},


/**
 * Allows you to group items in a list based on your supplied equality check.
 * @note Sames `group` but allows you to specify equality operation.
 * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
 * @function module:_listOps.groupBy
 * @param equalityOp {Function}
 * @param xs {Array|String|*}
 * @returns {*}
 */
groupBy = exports.groupBy = function groupBy(equalityOp, xs) {
    var limit = (0, _objectOps.length)(xs);
    if (!limit) {
        return (0, _utils.sliceFrom)(0, xs);
    }
    var ind = 0,
        prevItem = void 0,
        item = void 0,
        predOp = function predOp(x) {
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
        agg.push(takeWhile(predOp, (0, _list.slice)(ind, limit, xs)));
    }
    return agg;
},


/**
 * The inits function returns all initial segments of the argument, shortest first. For example,
 * ```
 * shallowEquals(inits('abc'), ['','a','ab','abc'])
 * ```
 * @function module:_listOps.inits
 * @haskellType `inits :: [a] -> [[a]]`
 * @param xs {Array|String|*}
 * @returns {Array}
 */
inits = exports.inits = function inits(xs) {
    var limit = (0, _objectOps.length)(xs),
        ind = 0,
        agg = [];
    if (!limit) {
        return [];
    }
    for (; ind <= limit; ind += 1) {
        agg = (0, _utils.aggregateArr)(agg, (0, _utils.sliceTo)(ind, xs));
    }
    return agg;
},
    //map(list => init(list), xs),

/**
 * The inits function returns all initial segments of the argument, shortest first. For example,
 * ```
 * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
 * ```
 * @function module:_listOps.tails
 * @haskellType `tails :: [a] -> [[a]]`
 * @param xs {Array|String|*}
 * @returns {Array}
 */
tails = exports.tails = function tails(xs) {
    var limit = (0, _objectOps.length)(xs),
        ind = 0,
        agg = [];
    if (!limit) {
        return [];
    }
    for (; ind <= limit; ind += 1) {
        agg = (0, _utils.aggregateArr)(agg, (0, _list.slice)(ind, limit, xs));
    }
    return agg;
},
    //map(list => tail(list), xs),

stripPrefix = exports.stripPrefix = function stripPrefix(prefix, list) {
    return isPrefixOf(prefix, list) ? splitAt((0, _objectOps.length)(prefix), list)[1] : (0, _utils.sliceFrom)(0, list);
},


/**
 * zip takes two lists and returns a list of corresponding pairs.
 * If one input list is short, excess elements of the longer list are discarded.
 * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
 * @function module:_listOps.zip
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @returns {Array<Array<*,*>>}
 */
zip = exports.zip = function zip(arr1, arr2) {
    if (!(0, _objectOps.length)(arr1) || !(0, _objectOps.length)(arr2)) {
        return (0, _objectOps.of)(arr1);
    }

    var _lengthsToSmallest = (0, _utils.lengthsToSmallest)(arr1, arr2),
        _lengthsToSmallest2 = _slicedToArray(_lengthsToSmallest, 2),
        a1 = _lengthsToSmallest2[0],
        a2 = _lengthsToSmallest2[1];

    return (0, _utils.reduce)(function (agg, item, ind) {
        return (0, _utils.aggregateArr)(agg, [item, a2[ind]]);
    }, [], a1);
},


/**
 * zipN takes one or more lists and returns a list containing lists of all indices
 * at a given index, index by index.
 * If one input list is short, excess elements of the longer list are discarded.
 * @function module:_listOps.zipN
 * @param lists {Array|String} - One ore more lists of the same type.
 * @returns {Array}
 */
zipN = exports.zipN = function zipN() {
    for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
    }

    var trimmedLists = (0, _function.apply)(_utils.lengthsToSmallest, filter(_objectOps.length, lists)),
        lenOfTrimmed = (0, _objectOps.length)(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    } else if (lenOfTrimmed === 1) {
        return (0, _utils.sliceTo)((0, _objectOps.length)(trimmedLists[0]), trimmedLists[0]);
    }
    return (0, _utils.reduce)(function (agg, item, ind) {
        return (0, _utils.aggregateArr)(agg, (0, _map.map)(function (xs) {
            return xs[ind];
        }, trimmedLists));
    }, [], trimmedLists[0]);
},


/**
 * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
 * @function module:_listOps.zip3
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @param arr3 {Array}
 * @returns {Array<Array<*,*>>}
 */
zip3 = exports.zip3 = function zip3(arr1, arr2, arr3) {
    return zipN(arr1, arr2, arr3);
},


/**
 * @haskellType `zip4 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
 * @function module:_listOps.zip4
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @param arr3 {Array}
 * @param arr4 {Array}
 * @returns {Array<Array<*,*>>}
 */
zip4 = exports.zip4 = function zip4(arr1, arr2, arr3, arr4) {
    return zipN(arr1, arr2, arr3, arr4);
},


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
zip5 = exports.zip5 = function zip5(arr1, arr2, arr3, arr4, arr5) {
    return zipN(arr1, arr2, arr3, arr4, arr5);
},


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
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @returns {Array<Array<*,*>>}
 */
zipWith = exports.zipWith = function zipWith(op, xs1, xs2) {
    if (!(0, _objectOps.length)(xs1) || !(0, _objectOps.length)(xs2)) {
        return (0, _objectOps.of)(xs1);
    }

    var _lengthsToSmallest3 = (0, _utils.lengthsToSmallest)(xs1, xs2),
        _lengthsToSmallest4 = _slicedToArray(_lengthsToSmallest3, 2),
        a1 = _lengthsToSmallest4[0],
        a2 = _lengthsToSmallest4[1];

    return (0, _utils.reduce)(function (agg, item, ind) {
        return (0, _utils.aggregateArr)(agg, op(item, a2[ind]));
    }, [], a1);
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
 * @param lists ...{Array|String|*}
 * @returns {Array<Array<*,*>>}
 */
zipWithN = exports.zipWithN = function zipWithN(op) {
    for (var _len3 = arguments.length, lists = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        lists[_key3 - 1] = arguments[_key3];
    }

    var trimmedLists = (0, _function.apply)(_utils.lengthsToSmallest, lists),
        lenOfTrimmed = (0, _objectOps.length)(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    } else if (lenOfTrimmed === 1) {
        return (0, _utils.sliceTo)((0, _objectOps.length)(trimmedLists[0]), trimmedLists[0]);
    }
    return (0, _utils.reduce)(function (agg, item, ind) {
        return (0, _utils.aggregateArr)(agg, (0, _function.apply)(op, (0, _map.map)(function (xs) {
            return xs[ind];
        }, trimmedLists)));
    }, [], trimmedLists[0]);
},


/**
 * Zips 3 lists with tupling function.
 * @haskellType `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
 * @function module:_listOps.zipWith3
 * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
 *  of said parts:
 *  E.g., ` op :: a -> b -> c -> (a, b, c)`
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @param xs3 {Array|String|*}
 * @returns {Array<Array<*,*>>}
 */
zipWith3 = exports.zipWith3 = function zipWith3(op, xs1, xs2, xs3) {
    return zipWithN(op, xs1, xs2, xs3);
},


/**
 * Zips 4 lists with tupling function.
 * @haskellType `zipWith4 :: (a -> b -> c -> d -> e) -> [a] -> [b] -> [c]  -> [d] -> [e]`
 * @function module:_listOps.zipWith4
 * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
 *  of said parts:
 *  E.g., ` op :: a -> b -> c -> d -> (a, b, c, d)`
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @param xs3 {Array|String|*}
 * @param xs4 {Array|String|*}
 * @returns {Array<Array<*,*>>}
 */
zipWith4 = exports.zipWith4 = function zipWith4(op, xs1, xs2, xs3, xs4) {
    return zipWithN(op, xs1, xs2, xs3, xs4);
},


/**
 * Zips 5 lists.
 * @haskellType `zipWith5 :: (a -> b -> c -> d -> e -> f) -> [a] -> [b] -> [c]  -> [d] -> [e] -> [f]`
 * @function module:_listOps.zipWith5
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
zipWith5 = exports.zipWith5 = function zipWith5(op, xs1, xs2, xs3, xs4, xs5) {
    return zipWithN(op, xs1, xs2, xs3, xs4, xs5);
},


/**
 * unzip transforms a list of pairs into a list of first components and a list of second components.
 * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
 * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
 * @function module:_listOps.unzip
 * @param arr {Array|*}
 * @returns {Array|*}
 */
unzip = exports.unzip = function unzip(arr) {
    return foldl(function (agg, item) {
        agg[0].push(item[0]);
        agg[1].push(item[1]);
        return agg;
    }, [[], []], arr);
},


/**
 * unzip transforms a list of pairs into a list of first components and a list of second components.
 * @sudoHaskellType `unzipN :: [(a, b, ...x)] -> ([a], [b], ...[x])`
 * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
 * @function module:_listOps.unzip
 * @param list {Array|*} - List of tuples (lists).
 * @returns {Array|*}
 */
unzipN = exports.unzipN = function unzipN(list) {
    if (!(0, _objectOps.length)(list)) {
        return [];
    }
    var lenItem0 = (0, _objectOps.length)(list[0]);
    var zero = lenItem0 ? unfoldr(function (numLists) {
        return numLists-- ? [[], numLists] : undefined;
    }, lenItem0) : [];
    return foldl(function (agg, item) {
        agg.forEach(function (outList, ind) {
            return outList.push(item[ind]);
        });
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
any = exports.any = function any(p, xs) {
    var ind = 0,
        limit = (0, _objectOps.length)(xs);
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
all = exports.all = function all(p, xs) {
    var limit = (0, _objectOps.length)(xs);
    var ind = 0;
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
and = exports.and = function and(xs) {
    return all(_booleanOps.isTruthy, xs);
},


/**
 * Returns a boolean indicating whether any item in container is 'truthy' or not.
 * **Note** The haskell type for this function only takes two items, but here
 * we allow the passing of more than one item (may change later to adhere to the haskell type).
 * @function module:_listOps.or
 * @haskellType `or :: Bool -> Bool -> Bool`
 * @param xs {Array|String}
 * @returns {Boolean}
 */
or = exports.or = function or(xs) {
    return any(_booleanOps.isTruthy, xs);
},


/**
 * Returns a boolean indicating whether all items in container are 'falsy' or not.
 * **Note** The haskell type for this function only takes two items, but here
 * we allow the passing of more than one item (may change later to adhere to the haskell type).
 * @function module:_listOps.not
 * @haskellType `not :: Bool -> Bool`
 * @param xs {Array|String}
 * @returns {Boolean}
 */
not = exports.not = function not(xs) {
    return all(_booleanOps.isFalsy, xs);
},


/**
 * Computes the sum of the numbers of a structure.
 * @function module:_listOps.sum
 * @haskellType `sum :: (List t, Num a) => t a -> a`
 * @param list {Array|String}
 * @returns {Number}
 */
sum = exports.sum = function sum(list) {
    return foldl(function (agg, x) {
        return agg + x;
    }, 0, list);
},


/**
 * Computes the product of the numbers of a structure.
 * @function module:_listOps.product
 * @haskellType `product :: (List t, Num a) => t a -> a`
 * @param list {Array|String}
 * @returns {Number}
 */
product = exports.product = function product(list) {
    return foldl(function (agg, x) {
        return agg * x;
    }, 1, list);
},


/**
 * Returns the largest element in a non-empty structure of elements.
 * @function module:_listOps.maximum
 * @haskellType `maximum :: forall a . Ord a => t a -> a`
 * @param list {Array|String}
 * @returns {*} - Whatever type the array is made of (if any).
 */
maximum = exports.maximum = function maximum(list) {
    return last(sortBy(_utils.genericAscOrdering, list));
},


/**
 * Returns the smallest element in a non-empty structure of elements.
 * @function module:_listOps.minimum
 * @haskellType `minimum :: forall a . Ord a => t a -> a`
 * @param list {Array|String}
 * @returns {*} - Whatever type the array is made of (if any).
 */
minimum = exports.minimum = function minimum(list) {
    return head(sortBy(_utils.genericAscOrdering, list));
},


/**
 * @function module:_listOps.scanl
 * @param fn {Function}
 * @param zero {*}
 * @param xs {Array|String|*}
 * @returns {Array|*}
 */
scanl = exports.scanl = function scanl(fn, zero, xs) {
    if (!xs || !(0, _objectOps.length)(xs)) {
        return [];
    }
    var limit = (0, _objectOps.length)(xs);
    var ind = -1,
        result = zero,
        out = [];
    while (ind++ < limit) {
        result = fn(result, xs[ind], ind, xs);
        out.push(result);
    }
    return out;
},
    scanl1 = exports.scanl1 = function scanl1(fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return scanl(fn, head(xs), tail(xs));
},
    scanr = exports.scanr = function scanr(fn, zero, xs) {
    if (!xs || !(0, _objectOps.length)(xs)) {
        return [];
    }
    var limit = (0, _objectOps.length)(xs);
    var ind = limit,
        result = xs[0],
        out = [];
    while (ind-- > -1) {
        result = fn(result, xs[ind], ind, xs);
        out.push(result);
    }
    return out;
},
    scanr1 = exports.scanr1 = function scanr1(fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return scanr(fn, last(xs), init(xs));
},
    nub = exports.nub = function nub(list) {
    return nubBy(function (a, b) {
        return a === b;
    }, list);
},
    remove = exports.remove = function remove(x, list) {
    return removeBy(function (a, b) {
        return a === b;
    }, x, list);
},
    sort = exports.sort = function sort(xs) {
    return sortBy(_utils.genericAscOrdering, xs);
},
    sortOn = exports.sortOn = function sortOn(valueFn, xs) {
    return (

        // Un-decorate
        (0, _map.map)(function (decorated) {
            return decorated[1];
        },

        // Decorate and sort
        sortBy(
        // Ordering
        function (_ref, _ref2) {
            var _ref4 = _slicedToArray(_ref, 1),
                a0 = _ref4[0];

            var _ref3 = _slicedToArray(_ref2, 1),
                b0 = _ref3[0];

            return (0, _utils.genericAscOrdering)(a0, b0);
        },

        // Decorate
        (0, _map.map)(function (item) {
            return [valueFn(item), item];
        }, xs)))
    );
},
    sortBy = exports.sortBy = function sortBy(orderingFn, xs) {
    return (0, _utils.copy)(xs).sort(orderingFn || _utils.genericAscOrdering);
},
    insert = exports.insert = function insert(x, xs) {
    if ((0, _objectOps.isEmptyList)(xs)) {
        return (0, _utils.aggregatorByType)(xs)((0, _utils.copy)(xs), x, 0);
    }
    var out = (0, _objectOps.of)(xs),
        foundIndex = findIndex(function (item) {
        return x <= item;
    }, xs);
    return foundIndex === -1 ? append((0, _utils.sliceFrom)(0, out), x) : concat(intersperse([x], splitAt(foundIndex, xs)));
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
 * @param xs {Array|String|*} - List to insert into (note new list is returned)
 * @returns {Array|String|*} - New list.
 */
insertBy = exports.insertBy = function insertBy(orderingFn, x, xs) {
    var limit = (0, _objectOps.length)(xs),
        aggregator = (0, _utils.aggregatorByType)(xs),
        out = (0, _objectOps.of)(xs);
    if ((0, _objectOps.isEmptyList)(xs)) {
        return aggregator(out, x, 0);
    }
    var ind = 0;
    for (; ind < limit; ind += 1) {
        if (orderingFn(x, xs[ind]) <= 0) {
            var parts = splitAt(ind, xs);
            // Fold parts[0], [x], parts[1] into `out` and `concat`
            return concat(foldl(aggregator, out, [parts[0], [x], parts[1]]));
        }
    }
    return aggregator((0, _utils.copy)(xs), x);
},
    nubBy = exports.nubBy = function nubBy(pred, list) {
    if ((0, _objectOps.isEmptyList)(list)) {
        return (0, _objectOps.of)(list);
    }
    var limit = (0, _objectOps.length)(list);
    var ind = 0,
        currItem = void 0,
        out = (0, _objectOps.of)(list),
        anyOp = function anyOp(storedItem) {
        return pred(currItem, storedItem);
    };
    for (; ind < limit; ind += 1) {
        currItem = list[ind];
        if (any(anyOp, out)) {
            continue;
        }
        out = append(out, currItem);
    }
    return out;
},
    removeBy = exports.removeBy = function removeBy(pred, x, list) {
    // @todo optimize this implementation
    var foundIndex = findIndex(function (item) {
        return pred(x, item);
    }, list),
        parts = splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
    return append(parts[0], tail(parts[1]));
},
    removeFirstsBy = exports.removeFirstsBy = function removeFirstsBy(pred, xs1, xs2) {
    return foldl(function (agg, item) {
        return removeBy(pred, item, agg);
    }, xs1, xs2);
},


/**
 * Returns the union on elements matching boolean check passed in.
 * @function module:_listOps.unionBy
 * @param pred {Function} - `pred :: a -> a -> Bool`
 * @param arr1 {Array|String|*}
 * @param arr2 {Array|String|*}
 * @returns {Array|String|*}
 */
unionBy = exports.unionBy = function unionBy(pred, arr1, arr2) {
    var aggregator = (0, _utils.aggregatorByType)(arr1);
    return foldl(function (agg, b) {
        var alreadyAdded = any(function (a) {
            return pred(a, b);
        }, agg);
        return !alreadyAdded ? aggregator(agg, b) : agg;
    }, (0, _utils.copy)(arr1), arr2);
},


/**
 * Creates a union on matching elements from array1.
 * @function module:_listOps.union
 * @param arr1 {Array|String|*}
 * @param arr2 {Array|String|*}
 * @returns {Array|String|*}
 */
union = exports.union = function union(arr1, arr2) {
    return append(arr1, filter(function (elm) {
        return !(0, _list.includes)(elm, arr1);
    }, arr2));
},


/**
 * Performs an intersection on list 1 with  elements from list 2.
 * @function module:_listOps.intersect
 * @param arr1 {Array|String|*}
 * @param arr2 {Array|String|*}
 * @returns {Array|String|*}
 */
intersect = exports.intersect = function intersect(arr1, arr2) {
    return !arr1 || !arr2 || !arr1 && !arr2 ? [] : filter(function (elm) {
        return (0, _list.includes)(elm, arr2);
    }, arr1);
},


/**
 * Returns an intersection by predicate.
 * @function module:_listOps.intersectBy
 * @param pred {Function} - `pred :: a -> b -> Bool`
 * @param list1 {Array|String|*}
 * @param list2 {Array|String|*}
 * @return {Array|String|*}
 */
intersectBy = exports.intersectBy = function intersectBy(pred, list1, list2) {
    var aggregator = (0, _utils.aggregatorByType)(list1);
    return foldl(function (agg, a) {
        return any(function (b) {
            return pred(a, b);
        }, list2) ? aggregator(agg, a) : agg;
    }, [], list1);
},


/**
 * Returns the difference of list 1 from list 2.
 * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
 * @function module:_listOps.difference
 * @param array1 {Array|String|*}
 * @param array2 {Array|String|*}
 * @returns {Array|String|*}
 */
difference = exports.difference = function difference(array1, array2) {
    // augment this with max length and min length ordering on op
    if (array1 && !array2) {
        return (0, _utils.sliceFrom)(0, array1);
    } else if (!array1 && array2 || !array1 && !array2) {
        return [];
    }
    var aggregator = (0, _utils.aggregatorByType)(array1);
    return (0, _utils.reduce)(function (agg, elm) {
        return !(0, _list.includes)(elm, array2) ? aggregator(agg, elm) : agg;
    }, [], array1);
},


/**
 * Returns the complement of list 0 and the reset of the passed in arrays.
 * @function module:_listOps.complement
 * @param arr0 {Array}
 * @param arrays {...Array}
 * @returns {Array}
 */
complement = exports.complement = function complement(arr0) {
    for (var _len4 = arguments.length, arrays = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        arrays[_key4 - 1] = arguments[_key4];
    }

    return (0, _utils.reduce)(function (agg, arr) {
        return append(agg, difference(arr, arr0));
    }, [], arrays);
};