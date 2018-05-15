define(['exports', '../_jsPlatform/_list', '../_jsPlatform/_function', '../_functionOps/_negate', '../../booleanOps', '../_objectOps/_objectOps', './_map', './_utils'], function (exports, _list, _function, _negate, _booleanOps, _objectOps, _map2, _utils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports._complement = exports._difference = exports._intersectBy = exports._intersect = exports._union = exports._unionBy = exports._removeFirstsBy = exports._removeBy = exports._nubBy = exports._insertBy = exports._insert = exports._sortBy = exports._sortOn = exports._sort = exports._remove = exports._nub = exports._scanr1 = exports._scanr = exports._scanl1 = exports._scanl = exports._minimum = exports._maximum = exports._product = exports._sum = exports._not = exports._or = exports._and = exports._all = exports._any = exports._unzipN = exports._unzip = exports._zipWith5 = exports._zipWith4 = exports._zipWith3 = exports._zipWithN = exports._zipWith = exports._zip5 = exports._zip4 = exports._zip3 = exports._zipN = exports._zip = exports._stripPrefix = exports._tails = exports._inits = exports._groupBy = exports._group = exports._isSubsequenceOf = exports._isInfixOf = exports._isSuffixOf = exports._isPrefixOf = exports._lookup = exports._notElem = exports._elem = exports._partition = exports._filter = exports._find = exports._at = exports._breakOnList = exports._span = exports._dropWhileEnd = exports._dropWhile = exports._takeWhile = exports._splitAt = exports._drop = exports._take = exports._elemIndices = exports._elemIndex = exports._findIndices = exports._findIndex = exports._unfoldr = exports._cycle = exports._replicate = exports._repeat = exports._iterate = exports._mapAccumR = exports._mapAccumL = exports._foldr1 = exports._foldl1 = exports._foldr = exports._foldl = exports._permutations = exports._swapped = exports._subsequences = exports._transpose = exports._intercalate = exports._intersperse = exports._reverse = exports._concatMap = exports._concat = exports._unconsr = exports._uncons = exports._init = exports._tail = exports._last = exports._head = exports._appendMany = exports._append = exports._map = undefined;

    var _map3 = _interopRequireDefault(_map2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports._map = _map3.default;
    const

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
    _append = exports._append = _list.concat,


    /**
     * Append two or more lists, i.e., same as `_append` but for two ore more lists.
     * @haskellType `appendMany :: List a => a -> [a] -> a
     * @note In `@haskellType` we wrote `[a]` only to keep the haskell type valid though note in javascript
     *  this is actually different since the function converts the zero ore more parameters into an array containing such for us.
     * @function module:_listOps._appendMany
     * @param args ...{Array} - Lists or lists likes.
     * @returns {Array} - Same type as first list or list like passed in.
     */
    _appendMany = exports._appendMany = (...args) => {
        if ((0, _objectOps.length)(args)) {
            return (0, _function.apply)(_list.concat, args);
        }
        throw new Error('`_appendMany` requires at least one arg.');
    },


    /**
     * Returns head of list (first item of list).
     * @haskellType `head :: [a] -> a`
     * @function module:_listOps._head
     * @param x {Array|String}
     * @returns {*} - First item from list
     */
    _head = exports._head = x => x[0],


    /**
     * Returns last item of list.
     * @haskellType `last :: [a] -> a`
     * @function module:_listOps._last
     * @param xs {Array|String}
     * @returns {*}
     */
    _last = exports._last = xs => xs[(0, _utils.lastIndex)(xs)],


    /**
     * Returns tail part of list (everything after the first item as new list).
     * @haskelType `tail :: [a] -> [a]`
     * @function module:_listOps._tail
     * @param xs {Array}
     * @returns {Array}
     */
    _tail = exports._tail = xs => (0, _utils.sliceFrom)(1, xs),


    /**
     * Returns everything except last item of list as new list.
     * @haskellType `init :: [a] -> [a]`
     * @function module:_listOps._init
     * @param xs {Array|String}
     * @returns {Array|String}
     */
    _init = exports._init = xs => (0, _utils.sliceTo)((0, _utils.lastIndex)(xs), xs),


    /**
     * Returns `head` and `tail` of passed in list/string in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @function module:_listOps._uncons
     * @param xs {Array|String}
     * @returns {Array|undefined}
     */
    _uncons = exports._uncons = xs => !xs || (0, _objectOps.length)(xs) === 0 ? undefined : [_head(xs), _tail(xs)],


    /**
     * Returns `tail` and `head` of passed in list/string in a tuple.
     * @haskellType `unconsr :: [a] -> Maybe ([a], a)`
     * @function module:_listOps._unconsr
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    _unconsr = exports._unconsr = xs => !xs || (0, _objectOps.length)(xs) === 0 ? undefined : [_init(xs), _last(xs)],


    /**
     * Concatenates all the elements of a container of lists.
     * @haskellType `concat :: Foldable t => t [a] -> [a]`
     * @function module:_listOps._concat
     * @param xs {Array}
     * @returns {Array}
     */
    _concat = exports._concat = xs => !(0, _objectOps.length)(xs) ? (0, _utils.copy)(xs) : (0, _function.apply)(_appendMany, xs),


    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:_listOps._concatMap
     * @param fn {Function}
     * @param foldableOfA {Array}
     * @returns {Array}
     */
    _concatMap = exports._concatMap = (fn, foldableOfA) => _concat((0, _map3.default)(fn, foldableOfA)),


    /**
     * Returns a copy of the passed in list reverses.
     * @haskellType `reverse :: [a] -> [a]`
     * @function module:_listOps._reverse
     * @param x {Array}
     * @returns {Array}
     */
    _reverse = exports._reverse = x => _foldr((agg, item) => (agg.push(item), agg), [], x),


    /**
     * Takes an element and a list and `intersperses' that element between the elements of the list. For example
     * @function module:_listOps._intersperse
     * @note In our version of the function javascript is loosely typed so, so is our function (to much overhead to make
     *  it typed) so `between` can be any value.
     * @param between {*} - Should be of the same type of elements contained in list.
     * @param arr {Array} - List.
     * @returns {Array}
     */
    _intersperse = exports._intersperse = (between, arr) => {
        const limit = (0, _objectOps.length)(arr),
              lastInd = limit - 1,
              out = [];
        if (!limit) {
            return out;
        }
        return _foldl((agg, item, ind) => (ind === lastInd ? agg.push(item) : agg.push(item, between), agg), out, arr);
    },


    /**
     * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
     * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
     * @function module:_listOps._intercalate
     * @param xs {Array}
     * @param xss {Array}
     * @returns {Array}
     */
    _intercalate = exports._intercalate = (xs, xss) => _concat(_intersperse(xs, xss)),


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
     * @function module:_listOps._transpose
     * @param xss {Array}
     * @returns {Array}
     */
    _transpose = exports._transpose = xss => {
        let numLists = (0, _objectOps.length)(xss),
            ind = 0,
            ind2;
        if (!numLists) {
            return [];
        }
        const listLengths = (0, _function.apply)(_utils.lengths, xss),
              longestListLen = _maximum(listLengths),
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
        return _filter(x => (0, _objectOps.length)(x), outLists);
    },


    /**
     * Generates 2^n sub-sequences for passed in sequence (string/list) (`n` is
     * the length of the passed in sequence so: 2^length(xs)).
     * Note: The return value doubles per index/character passed in so use with caution!
     *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
     *  will generate 65536 sub-sequences!  So caution should be taken to not
     *  use this with sequences above a certain length on certain platform (the browser thread in specific).
     * @function module:_listOps._subsequences
     * @jsperftest https://jsperf.com/subsequences
     * @param xs {Array|String}
     * @returns {Array.<Array>}
     */
    _subsequences = exports._subsequences = xs => {
        const listLen = (0, _objectOps.length)(xs),
              len = Math.pow(2, listLen),
              out = [];
        for (let i = 0; i < len; i += 1) {
            let entry = [];
            for (let j = 0; j < listLen; j += 1) {
                if (i & 1 << j) {
                    entry.push(xs[j]);
                }
            }
            out.push(entry);
        }
        return out;
    },


    /**
     * Returns an array with the given indices swapped.
     * @function module:_listOps._swapped
     * @param ind1 {Number}
     * @param ind2 {Number}
     * @param list {Array}
     * @returns {Array} - Copy of incoming with swapped values at indices.
     */
    _swapped = exports._swapped = (ind1, ind2, list) => {
        const out = (0, _utils.copy)(list),
              tmp = out[ind1];
        out[ind1] = out[ind2];
        out[ind2] = tmp;
        return out;
    },


    /**
     * Returns a list of permutations for passed in list.
     *  Use caution with lists above a length of 15 (will take long due to nature of
     *  algorithm).
     * @function module:_listOps._permutations
     * @param xs {Array} - List.
     * @returns {Array<Array|String|*>} - Array of permutations.
     */
    _permutations = exports._permutations = xs => {
        const limit = (0, _objectOps.length)(xs);

        if (!limit || limit === 1) {
            return [xs];
        }

        let list = (0, _utils.copy)(xs),
            c = _repeat(limit, 0),
            i = 0;

        const out = [list];

        for (; i < limit; i++) {
            if (c[i] < i) {
                list = _swapped(i % 2 === 0 ? 0 : c[i], i, list);
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
     * @function module:_listOps._foldl
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array}
     * @returns {*} - Whatever type is lastly returned from `fn`.
     */
    _foldl = exports._foldl = _utils.reduce,


    /**
     * Right associative fold.  Reduces a container of elements down by the given operation (same as [].reduceRight).
     * @function module:_listOps._foldr
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array}
     * @returns {*} - Whatever type is lastly returned from `fn`.
     */
    _foldr = exports._foldr = _utils.reduceRight,


    /**
     * A variant of `foldl` except that this one doesn't require the starting point.  The starting point/value will be pulled
     * out from a copy of the container.
     * @function module:_listOps._foldl1
     * @param op {Function}
     * @param xs {Array}
     * @returns {*} - Whatever type is lastly returned from `op`.
     */
    _foldl1 = exports._foldl1 = (op, xs) => {
        const parts = _uncons(xs);
        return !parts ? [] : (0, _utils.reduce)(op, parts[0], parts[1]);
    },


    /**
     * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting point/value will be pulled
     * out from a copy of the container.
     * @function module:_listOps._foldr1
     * @param op {Function}
     * @param xs {Array}
     * @returns {*} - Whatever type is lastly returned from `op`.
     */
    _foldr1 = exports._foldr1 = (op, xs) => {
        const parts = _unconsr(xs);
        return !parts ? [] : (0, _utils.reduceRight)(op, parts[1], parts[0]);
    },


    /**
     * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
     * containing the aggregated value and the result of mapping the passed in function on passed in list.
     * @function module:_listOps._mapAccumL
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array} - list type.
     * @return {Array} - [aggregated, list]
     */
    _mapAccumL = exports._mapAccumL = (op, zero, xs) => {
        const list = (0, _utils.copy)(xs),
              limit = (0, _objectOps.length)(xs);
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
     * @function module:_listOps._mapAccumR
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array} - list type.
     * @return {Array} - [aggregated, list]
     */
    _mapAccumR = exports._mapAccumR = (op, zero, xs) => {
        const list = (0, _utils.copy)(xs),
              limit = (0, _objectOps.length)(xs);
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
     * @function module:_listOps._iterate
     * @example `iterate(5, f, x) == [x, f(x), f(f(x)), ...]`
     * @param limit {Number}
     * @param op {Function} - Operation.
     * @param x {*} - Starting point.
     * @returns {*}
     */
    _iterate = exports._iterate = (limit, op, x) => {
        let ind = 0,
            out = [],
            lastX = x;
        for (; ind < limit; ind += 1) {
            out.push(lastX);
            lastX = op(lastX, ind);
        }
        return out;
    },


    /**
     * Repeats `x` `limit` number of times.
     * @function module:_listOps._repeat
     * @param limit {Number}
     * @param x {*}
     * @return {Array}
     */
    _repeat = exports._repeat = (limit, x) => _iterate(limit, a => a, x),


    /**
     * Same as `repeat` due to the nature of javascript (see haskell version for usage).
     * @function module:_listOps._replicate
     * @param limit {Number}
     * @param x {*}
     * @return {Array}
     */
    _replicate = exports._replicate = _repeat,


    /**
     * Replicates a list `limit` number of times and appends the results (concat)
     * @function module:_listOps._cycle
     * @param limit {Number}
     * @param xs {Array}
     * @returns {Array}
     */
    _cycle = exports._cycle = (limit, xs) => _concat(_replicate(limit, xs)),


    /**
     * Unfolds a value into a list of somethings.
     * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
     * @function module:_listOps._unfoldr
     * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
     * @param x {*} - Starting parameter to unfold from.
     * @returns {Array} - An array of whatever you return from `op` yielded.
     */
    _unfoldr = exports._unfoldr = (op, x) => {
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
     * @function module:_listOps._findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    _findIndex = exports._findIndex = _utils.findIndexWhere,


    /**
     * @function module:_listOps._findIndices
     * @param pred {Function}
     * @param xs {Array} - list or list like.
     * @returns {Array|undefined}
     */
    _findIndices = exports._findIndices = _utils.findIndicesWhere,


    /**
     * @function module:_listOps._elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array} - list or list like.
     * @returns {*}
     */
    _elemIndex = exports._elemIndex = (x, xs) => {
        const foundInd = (0, _list.indexOf)(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    },


    /**
     * @function module:_listOps._elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array} - list or list like.
     * @returns {*}
     */
    _elemIndices = exports._elemIndices = (value, xs) => _findIndices(x => x === value, xs),


    /**
     * Takes `n` items from start of list to `limit` (exclusive).
     * @function module:_listOps._take
     * @param list {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    _take = exports._take = (limit, list) => (0, _utils.sliceTo)(limit, list),


    /**
     * Drops `n` items from start of list to `count` (exclusive).
     * @function module:_listOps._take
     * @param list {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    _drop = exports._drop = (count, list) => (0, _utils.sliceFrom)(count, list),


    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:_listOps._splitAt
     * @param ind {Number} - Index to split at.
     * @param list {Array} - functor (list or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    _splitAt = exports._splitAt = (ind, list) => [(0, _utils.sliceTo)(ind, list), (0, _utils.sliceFrom)(ind, list)],


    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:_listOps._takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @returns {Array}
     */
    _takeWhile = exports._takeWhile = (pred, list) => (0, _utils.reduceUntil)((0, _negate.negateP)(pred), // predicate
    _utils.aggregateArr, // operation
    [], // aggregator
    list),


    /**
     * Returns an list without elements that match predicate.
     * @function module:_listOps._dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    _dropWhile = exports._dropWhile = (pred, list) => {
        const limit = (0, _objectOps.length)(list),
              splitPoint = (0, _utils.findIndexWhere)((item, ind, list2) => !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ? (0, _utils.sliceTo)(limit, list) : (0, _list.slice)(splitPoint, limit, list);
    },


    /**
     * @function module:_listOps._dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    _dropWhileEnd = exports._dropWhileEnd = (pred, list) => {
        const limit = (0, _objectOps.length)(list),
              splitPoint = (0, _utils.findIndexWhereRight)((item, ind, list2) => !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ? (0, _utils.sliceTo)(limit, list) : (0, _utils.sliceTo)(splitPoint + 1, list);
    },


    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @function module:_listOps._span
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array} - Predicate<item, index, originalArrayOrString>
     * @returns {Array} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    _span = exports._span = (pred, list) => {
        const splitPoint = (0, _utils.findIndexWhere)((0, _negate.negateP)(pred), list);
        return splitPoint === -1 ? _splitAt(0, list) : _splitAt(splitPoint, list);
    },


    /**
     * breakOnList, applied to a predicate p and a list xs, returns a tuple
     * where first element is longest prefix (possibly empty) of xs of elements
     * that do not satisfy p and second element is the remainder of the list:
     * @haskellExample
     * Replace `break` with `breakOnList` for our version.
     * ```
     * break (> 3) [1,2,3,4,1,2,3,4] == ([1,2,3],[4,1,2,3,4])
     * break (< 9) [1,2,3] == ([],[1,2,3])
     * break (> 9) [1,2,3] == ([1,2,3],[])
     * ```
     * @function module:_listOps._breakOnList
     * @param pred {Function}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    _breakOnList = exports._breakOnList = (pred, list) => {
        const splitPoint = (0, _utils.findIndexWhere)(pred, list);
        return splitPoint === -1 ? _splitAt(0, list) : _splitAt(splitPoint, list);
    },


    /**
     * Gets item at index.
     * @function module:_listOps._at
     * @param ind {Number} - Index.
     * @param xs {Array} - list or list like.
     * @returns {*|undefined} - Item or `undefined`.
     */
    _at = exports._at = _objectOps.prop,


    /**
     * Find an item in structure of elements based on given predicate (`pred`).
     * @function module:_listOps._find
     * @param pred {Function}
     * @param xs {Array} - list or list like.
     * @returns {*} - Found item.
     */
    _find = exports._find = _utils.findWhere,


    /**
     * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
     * @function module:_listOps._filter
     * @param pred {Function}
     * @param xs {Array} - list or list like.
     * @returns {Array} - Structure of filtered elements.
     */
    _filter = exports._filter = (pred, xs) => {
        let ind = 0,
            limit = (0, _objectOps.length)(xs),
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
     * @function module:_listOps._partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array}
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    _partition = exports._partition = (pred, list) => !(0, _objectOps.length)(list) ? [[], []] : [_filter(pred, list), _filter((0, _negate.negateP)(pred), list)],


    /**
     * Returns a boolean indicating whether an element exists in given structure of elements.
     * @function module:_listOps._elem
     * @param element {*}
     * @param xs {Array}
     * @returns {Boolean}
     */
    _elem = exports._elem = _list.includes,


    /**
     * The opposite of `elem` - Returns a boolean indicating whether an element exists in given list.
     * @function module:_listOps._notElem
     * @param element {*}
     * @param xs {Array}
     * @returns {Boolean}
     */
    _notElem = exports._notElem = (0, _negate.negateF)(_list.includes),


    /**
     * Same as _listOps._at - Returns property value at key/indice.
     * @function module:_objectOps._lookup
     * @type {module:_objectOps.prop}
     */
    _lookup = exports._lookup = _at,


    /**
     * Checks if list `xs1` is a prefix of list `xs2`
     * @function module:_listOps._isPrefixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    _isPrefixOf = exports._isPrefixOf = (xs1, xs2) => {
        const limit1 = (0, _objectOps.length)(xs1),
              limit2 = (0, _objectOps.length)(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || (0, _list.indexOf)(xs1[0], xs2) === -1) {
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


    /**
     * Checks if list `xs1` is a suffix of list `xs2`
     * @function module:_listOps._isSuffixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    _isSuffixOf = exports._isSuffixOf = (xs1, xs2) => {
        const limit1 = (0, _objectOps.length)(xs1),
              limit2 = (0, _objectOps.length)(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || (0, _list.indexOf)(xs1[0], xs2) === -1) {
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


    /**
     * Checks if list `xs1` is an infix of list `xs2`
     * @function module:_listOps._isInfixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    _isInfixOf = exports._isInfixOf = (xs1, xs2) => {
        const limit1 = (0, _objectOps.length)(xs1),
              limit2 = (0, _objectOps.length)(xs2);
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


    /**
     * Checks if list `xs1` is a sub-sequence of list `xs2`
     * @function module:_listOps._isPrefixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    _isSubsequenceOf = exports._isSubsequenceOf = (xs1, xs2) => {
        const len = Math.pow(2, (0, _objectOps.length)(xs2)),
              lenXs1 = (0, _objectOps.length)(xs1);
        let foundLen, i;
        for (i = 0; i < len; i += 1) {
            foundLen = 0;
            for (let j = 0; j < len; j += 1) {
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
     * @function module:_listOps._group
     * @param xs {Array}
     * @returns {Array<Array|String|*>|*}
     */
    _group = exports._group = xs => _groupBy((a, b) => a === b, xs),


    /**
     * Allows you to group items in a list based on your supplied equality check.
     * @note Sames `group` but allows you to specify equality operation.
     * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
     * @function module:_listOps._groupBy
     * @param equalityOp {Function}
     * @param xs {Array}
     * @returns {*}
     */
    _groupBy = exports._groupBy = (equalityOp, xs) => {
        const limit = (0, _objectOps.length)(xs);
        if (!limit) {
            return (0, _utils.copy)(xs);
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
            agg.push(_takeWhile(predOp, (0, _list.slice)(ind, limit, xs)));
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
    _inits = exports._inits = xs => {
        let limit = (0, _objectOps.length)(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push((0, _utils.sliceTo)(ind, xs));
        }
        return agg;
    },
          //_map(list => _init(list), xs),

    /**
     * The inits function returns all initial segments of the argument, shortest first. For example,
     * ```
     * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
     * ```
     * @function module:_listOps._tails
     * @haskellType `tails :: [a] -> [[a]]`
     * @param xs {Array}
     * @returns {Array}
     */
    _tails = exports._tails = xs => {
        let limit = (0, _objectOps.length)(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push((0, _list.slice)(ind, limit, xs));
        }
        return agg;
    },
          //_map(list => tail(list), xs),

    /**
     * Strips prefix list from given list
     * @function module:_listOps._stripPrefix
     * @param prefix {Array|String|*}
     * @param list {Array|string|*}
     * @returns {Array|*}
     */
    _stripPrefix = exports._stripPrefix = (prefix, list) => _isPrefixOf(prefix, list) ? _splitAt((0, _objectOps.length)(prefix), list)[1] : (0, _utils.copy)(list),


    /**
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
     * @function module:_listOps._zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    _zip = exports._zip = (arr1, arr2) => {
        if (!(0, _objectOps.length)(arr1) || !(0, _objectOps.length)(arr2)) {
            return [];
        }
        const [a1, a2] = (0, _utils.lengthsToSmallest)(arr1, arr2);
        return (0, _utils.reduce)((agg, item, ind) => (0, _utils.aggregateArr)(agg, [item, a2[ind]]), [], a1);
    },


    /**
     * zipN takes one or more lists and returns a list containing lists of all indices
     * at a given index, index by index.
     * If one input list is short, excess elements of the longer list are discarded.
     * @function module:_listOps._zipN
     * @param lists {Array|String} - One ore more lists of the same type.
     * @returns {Array}
     */
    _zipN = exports._zipN = (...lists) => {
        const trimmedLists = (0, _function.apply)(_utils.lengthsToSmallest, _filter(_objectOps.length, lists)),
              lenOfTrimmed = (0, _objectOps.length)(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        } else if (lenOfTrimmed === 1) {
            return (0, _utils.sliceTo)((0, _objectOps.length)(trimmedLists[0]), trimmedLists[0]);
        }
        return (0, _utils.reduce)((agg, item, ind) => (0, _utils.aggregateArr)(agg, (0, _map3.default)(xs => xs[ind], trimmedLists)), [], trimmedLists[0]);
    },


    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
     * @function module:_listOps._zip3
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    _zip3 = exports._zip3 = (arr1, arr2, arr3) => _zipN(arr1, arr2, arr3),


    /**
     * @haskellType `zip4 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
     * @function module:_listOps._zip4
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    _zip4 = exports._zip4 = (arr1, arr2, arr3, arr4) => _zipN(arr1, arr2, arr3, arr4),


    /**
     * @haskellType `zip5 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
     * @function module:_listOps._zip5
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @param arr5 {Array}
     * @returns {Array<Array<*,*>>}
     */
    _zip5 = exports._zip5 = (arr1, arr2, arr3, arr4, arr5) => _zipN(arr1, arr2, arr3, arr4, arr5),


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
     * @function module:_listOps._zipWith
     * @param op {Function} - Takes two parts of a tuple and returns a tuple.
     *  E.g., ` op :: a -> b -> (a, b)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    _zipWith = exports._zipWith = (op, xs1, xs2) => {
        if (!(0, _objectOps.length)(xs1) || !(0, _objectOps.length)(xs2)) {
            return [];
        }
        const [a1, a2] = (0, _utils.lengthsToSmallest)(xs1, xs2);
        return (0, _utils.reduce)((agg, item, ind) => (0, _utils.aggregateArr)(agg, op(item, a2[ind])), [], a1);
    },


    /**
     * Zips all given lists with tupling function. Note: Haskell types do not have
     *  a way (that I know of) to show one or more for params in a function so `@haskellType` below
     *  is left there for general purpose not for exactness as is told by aforementioned.
     * @haskellType `zipWithN :: (a -> b -> c) -> [a] -> [b] -> [c]` - Where `N` is the number
     *  of lists to zip.
     * @function module:_listOps._zipWithN
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param lists ...{Array}
     * @returns {Array<Array<*,*>>}
     */
    _zipWithN = exports._zipWithN = (op, ...lists) => {
        const trimmedLists = (0, _function.apply)(_utils.lengthsToSmallest, lists),
              lenOfTrimmed = (0, _objectOps.length)(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        } else if (lenOfTrimmed === 1) {
            return (0, _utils.sliceTo)((0, _objectOps.length)(trimmedLists[0]), trimmedLists[0]);
        }
        return (0, _utils.reduce)((agg, item, ind) => (0, _utils.aggregateArr)(agg, (0, _function.apply)(op, (0, _map3.default)(xs => xs[ind], trimmedLists))), [], trimmedLists[0]);
    },


    /**
     * Zips 3 lists with tupling function.
     * @haskellType `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
     * @function module:_listOps._zipWith3
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @param xs3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    _zipWith3 = exports._zipWith3 = (op, xs1, xs2, xs3) => _zipWithN(op, xs1, xs2, xs3),


    /**
     * Zips 4 lists with tupling function.
     * @haskellType `zipWith4 :: (a -> b -> c -> d -> e) -> [a] -> [b] -> [c]  -> [d] -> [e]`
     * @function module:_listOps._zipWith4
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> d -> (a, b, c, d)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @param xs3 {Array}
     * @param xs4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    _zipWith4 = exports._zipWith4 = (op, xs1, xs2, xs3, xs4) => _zipWithN(op, xs1, xs2, xs3, xs4),


    /**
     * Zips 5 lists.
     * @haskellType `zipWith5 :: (a -> b -> c -> d -> e -> f) -> [a] -> [b] -> [c]  -> [d] -> [e] -> [f]`
     * @function module:_listOps._zipWith5
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
    _zipWith5 = exports._zipWith5 = (op, xs1, xs2, xs3, xs4, xs5) => _zipWithN(op, xs1, xs2, xs3, xs4, xs5),


    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
     * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
     * @function module:_listOps._unzip
     * @param arr {Array|*}
     * @returns {Array|*}
     */
    _unzip = exports._unzip = arr => _foldl((agg, item) => {
        agg[0].push(item[0]);
        agg[1].push(item[1]);
        return agg;
    }, [[], []], arr),


    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @sudoHaskellType `unzipN :: [(a, b, ...x)] -> ([a], [b], ...[x])`
     * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
     * @function module:_listOps._unzip
     * @param list {Array|*} - List of tuples (lists).
     * @returns {Array|*}
     */
    _unzipN = exports._unzipN = list => {
        if (!(0, _objectOps.length)(list)) {
            return [];
        }
        const lenItem0 = (0, _objectOps.length)(list[0]);
        let zero = lenItem0 ? _unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) : [];
        return _foldl((agg, item) => {
            agg.forEach((outList, ind) => outList.push(item[ind]));
            return agg;
        }, zero, list);
    },


    /**
     * Returns true if any item in container passes predicate `p`.
     * @function module:_listOps._any
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    _any = exports._any = (p, xs) => {
        let ind = 0,
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
     * @function module:_listOps._all
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    _all = exports._all = (p, xs) => {
        const limit = (0, _objectOps.length)(xs);
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
     * @function module:_listOps._and
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    _and = exports._and = xs => _all(_booleanOps.isTruthy, xs),


    /**
     * Returns a boolean indicating whether any item in container is 'truthy' or not.
     * **Note** The haskell type for this function only takes two items, but here
     * we allow the passing of more than one item (may change later to adhere to the haskell type).
     * @function module:_listOps._or
     * @haskellType `or :: Bool -> Bool -> Bool`
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    _or = exports._or = xs => _any(_booleanOps.isTruthy, xs),


    /**
     * Returns a boolean indicating whether all items in container are 'falsy' or not.
     * **Note** The haskell type for this function only takes two items, but here
     * we allow the passing of more than one item (may change later to adhere to the haskell type).
     * @function module:_listOps._not
     * @haskellType `not :: Bool -> Bool`
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    _not = exports._not = xs => _all(_booleanOps.isFalsy, xs),


    /**
     * Computes the sum of the numbers of a structure.
     * @function module:_listOps._sum
     * @haskellType `sum :: (List t, Num a) => t a -> a`
     * @param list {Array|String}
     * @returns {Number}
     */
    _sum = exports._sum = list => _foldl((agg, x) => agg + x, 0, list),


    /**
     * Computes the product of the numbers of a structure.
     * @function module:_listOps._product
     * @haskellType `product :: (List t, Num a) => t a -> a`
     * @param list {Array|String}
     * @returns {Number}
     */
    _product = exports._product = list => _foldl((agg, x) => agg * x, 1, list),


    /**
     * Returns the largest element in a non-empty structure of elements.
     * @function module:_listOps._maximum
     * @haskellType `maximum :: forall a . Ord a => t a -> a`
     * @param list {Array|String}
     * @returns {*} - Whatever type the array is made of (if any).
     */
    _maximum = exports._maximum = list => _last(_sortBy(_utils.genericAscOrdering, list)),


    /**
     * Returns the smallest element in a non-empty structure of elements.
     * @function module:_listOps._minimum
     * @haskellType `minimum :: forall a . Ord a => t a -> a`
     * @param list {Array|String}
     * @returns {*} - Whatever type the array is made of (if any).
     */
    _minimum = exports._minimum = list => _head(_sortBy(_utils.genericAscOrdering, list)),


    /**
     * scanl is similar to foldl, but returns a list of successive reduced values from the left:
     * ```
     * scanl f z [x1, x2, ...] == [z, z `f` x1, (z `f` x1) `f` x2, ...]
     * ```
     * Also note that:
     * ```
     * last (scanl f z xs) == foldl f z xs.
     * ```
     * @function module:_listOps._scanl
     * @param fn {Function}
     * @param zero {*}
     * @param xs {Array}
     * @returns {Array|*}
     */
    _scanl = exports._scanl = (fn, zero, xs) => {
        if (!xs || !(0, _objectOps.length)(xs)) {
            return [];
        }
        const limit = (0, _objectOps.length)(xs);
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


    /**
     * `scanl1` is a variant of `scanl` that has no starting value argument:
     * `shallowCompare(scanl1(fn, [x1, x2, ...]), [x1, fn(x1, x2), ...]) // true`
     * @function module:_listOps._scanl1
     * @param fn {Function}
     * @param xs {Array}
     * @returns {Array|*}
     */
    _scanl1 = exports._scanl1 = (fn, xs) => {
        if (!xs || !xs.length) {
            return [];
        }
        return _scanl(fn, _head(xs), _tail(xs));
    },


    /**
     * Same as `scanl` but from the right (similiar to `foldr`'s relationship to `foldl`).
     * Note also `scanr`'s relationship ot `foldr`:
     * `head (scanr(fn, z, xs)) === foldr(fn, z, xs).
     * @function module:_listOps._scanr
     * @param fn {Function}
     * @param zero {*}
     * @param xs {Array}
     * @returns {Array|*}
     */
    _scanr = exports._scanr = (fn, zero, xs) => {
        if (!xs || !(0, _objectOps.length)(xs)) {
            return [];
        }
        const limit = (0, _objectOps.length)(xs);
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


    /**
     * Same as `scanr` but takes no zero/accumulator value.
     * @function module:_listOps._scanr1
     * @param fn {Function}
     * @param xs {Array}
     * @returns {Array|*}
     */
    _scanr1 = exports._scanr1 = (fn, xs) => {
        if (!xs || !xs.length) {
            return [];
        }
        return _scanr(fn, _last(xs), _init(xs));
    },


    /**
     * The nub function removes duplicate elements from a list.
     * In particular, it keeps only the first occurrence of each element.
     * (The name nub means `essence'.) It is a special case of nubBy, which
     * allows the programmer to supply their own equality test.
     * ```shallowCompare( nub ([1,2,3,4,3,2,1,2,4,3,5]), [1,2,3,4,5] )```
     * @function module:_listOps._nub
     * @param list {Array|String|*}
     * @returns {Array}
     */
    _nub = exports._nub = list => _nubBy((a, b) => a === b, list),


    /**
     * `remove(x, xs)` removes the first occurrence of `x` from `xs`.
     * For example, `remove('a', 'banana') === 'bnana';`
     * @function module:_listOps._remove
     * @param x {*}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    _remove = exports._remove = (x, list) => _removeBy((a, b) => a === b, x, list),


    /**
     * The sort function implements a stable sorting algorithm.
     * It is a special case of sortBy, which allows the programmer
     * to supply their own comparison function.
     * ```shallowCompare(sort ([1,6,4,3,2,5]), [1,2,3,4,5,6]) // true```
     * @function module:_listOps._sort
     * @param xs {Array|String|*}
     * @returns {Array}
     */
    _sort = exports._sort = xs => _sortBy(_utils.genericAscOrdering, xs),


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
     * @function module:_listOps._sortOn
     * @param valueFn {Function}
     * @param xs {Array|String|*}
     * @returns {Array}
     */
    _sortOn = exports._sortOn = (valueFn, xs) =>

    // Un-decorate
    (0, _map3.default)(decorated => decorated[1],

    // Decorate and sort
    _sortBy(
    // Ordering
    ([a0], [b0]) => (0, _utils.genericAscOrdering)(a0, b0),

    // Decorate
    (0, _map3.default)(item => [valueFn(item), item], xs))),


    /**
     * The sortBy function is the non-overloaded (in haskell terms) version of sort.
     * @haskellExample ```
     *  >>> sortBy (\(a,_) (b,_) -> compare a b) [(2, "world"), (4, "!"), (1, "Hello")]
     *  [(1,"Hello"),(2,"world"),(4,"!")]
     * ```
     * @function module:_listOps._sortBy
     * @param orderingFn {Function}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    _sortBy = exports._sortBy = (orderingFn, xs) => (0, _utils.copy)(xs).sort(orderingFn || _utils.genericAscOrdering),


    /**
     * The insert function takes an element and a list and inserts the element
     * into the list at the first position where it is less than or equal to the
     * next element. In particular, if the list is sorted before the call, the
     * result will also be sorted. It is a special case of insertBy, which allows
     * the programmer to supply their own comparison function.
     * @function module:_listOps._insert
     * @param x {*}
     * @param xs {Array|*}
     * @returns {Array}
     */
    _insert = exports._insert = (x, xs) => {
        if (!(0, _objectOps.length)(xs)) {
            return [x];
        }
        const foundIndex = _findIndex(item => x <= item, xs);
        return foundIndex === -1 ? [x] : _concat(_intersperse([x], _splitAt(foundIndex, xs)));
    },


    /**
     * A version of `insert` that allows you to specify the ordering of the inserted
     * item;  Before/at, or after
     * @function module:_listOps._insertBy
     * @haskellType `insertBy :: (a -> a -> Ordering) -> a -> [a] -> [a]`
     * @note `Ordering` === // something that is order-able
     * @todo Optimize and work the logic of this function;  Think about the types that will be
     *  operated on by this functions logic.
     * @param orderingFn {Function} - A function that returns `-1`, `0`, or 1`.
     * @param x {*} - Value to insert.
     * @param xs {Array} - List to insert into (note new list is returned)
     * @returns {Array} - New list.
     */
    _insertBy = exports._insertBy = (orderingFn, x, xs) => {
        const limit = (0, _objectOps.length)(xs);
        if (!limit) {
            return [x];
        }
        let ind = 0;
        for (; ind < limit; ind += 1) {
            if (orderingFn(x, xs[ind]) <= 0) {
                const parts = _splitAt(ind, xs);
                return _concat([parts[0], [x], parts[1]]);
            }
        }
        return (0, _utils.aggregateArr)((0, _utils.copy)(xs), x);
    },


    /**
     * The nubBy function behaves just like nub, except it uses a user-supplied equality predicate.
     * @function module:_listOps._nubBy
     * @param pred {Function}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    _nubBy = exports._nubBy = (pred, list) => {
        if (!(0, _objectOps.length)(list)) {
            return [];
        }
        const limit = (0, _objectOps.length)(list);
        let ind = 0,
            currItem,
            out = [],
            anyOp = storedItem => pred(currItem, storedItem);
        for (; ind < limit; ind += 1) {
            currItem = list[ind];
            if (_any(anyOp, out)) {
                continue;
            }
            out.push(currItem);
        }
        return out;
    },


    /**
     * Behaves the same as `remove`, but takes a user-supplied equality predicate.
     * @function module:_listOps._removeBy
     * @param pred {Function}
     * @param x {*}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    _removeBy = exports._removeBy = (pred, x, list) => {
        // @todo optimize this implementation
        const foundIndex = _findIndex(item => pred(x, item), list),
              parts = _splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
        return _append(parts[0], _tail(parts[1]));
    },


    /**
     * The `removeFirstsBy` function takes a predicate and two lists and returns the first list with the first
     * occurrence of each element of the second list removed.
     * @param pred {Function}
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {Array}
     */
    _removeFirstsBy = exports._removeFirstsBy = (pred, xs1, xs2) => _foldl((agg, x2) => _removeBy(pred, x2, agg), xs1, xs2),


    /**
     * Returns the union on elements matching boolean check passed in.
     * @function module:_listOps._unionBy
     * @param pred {Function} - `pred :: a -> a -> Bool`
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    _unionBy = exports._unionBy = (pred, arr1, arr2) => _foldl((agg, b) => {
        const alreadyAdded = _any(a => pred(a, b), agg);
        return !alreadyAdded ? (agg.push(b), agg) : agg;
    }, (0, _utils.copy)(arr1), arr2),


    /**
     * Creates a union on matching elements from array1.
     * @function module:_listOps._union
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    _union = exports._union = (arr1, arr2) => _append(arr1, _filter(elm => !(0, _list.includes)(elm, arr1), arr2)),


    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:_listOps._intersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    _intersect = exports._intersect = (arr1, arr2) => !arr1 || !arr2 || !arr1 && !arr2 ? [] : _filter(elm => (0, _list.includes)(elm, arr2), arr1),


    /**
     * Returns an intersection by predicate.
     * @function module:_listOps._intersectBy
     * @param pred {Function} - `pred :: a -> b -> Bool`
     * @param list1 {Array}
     * @param list2 {Array}
     * @return {Array}
     */
    _intersectBy = exports._intersectBy = (pred, list1, list2) => _foldl((agg, a) => _any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg, [], list1),


    /**
     * Returns the difference of list 1 from list 2.
     * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
     * @function module:_listOps._difference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    _difference = exports._difference = (array1, array2) => {
        // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return (0, _utils.copy)(array1);
        } else if (!array1 && array2 || !array1 && !array2) {
            return [];
        }
        return (0, _utils.reduce)((agg, elm) => !(0, _list.includes)(elm, array2) ? (agg.push(elm), agg) : agg, [], array1);
    },


    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:_listOps._complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    _complement = exports._complement = (arr0, ...arrays) => (0, _utils.reduce)((agg, arr) => _append(agg, _difference(arr, arr0)), [], arrays);
});