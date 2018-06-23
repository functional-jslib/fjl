(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './jsPlatform', './uncurried/_listOps/_listOps', './uncurried/_functionOps/_functionOps'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./jsPlatform'), require('./uncurried/_listOps/_listOps'), require('./uncurried/_functionOps/_functionOps'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jsPlatform, global._listOps, global._functionOps);
        global.listOps = mod.exports;
    }
})(this, function (exports, _jsPlatform, _listOps, _functionOps) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.complement = exports.difference = exports.intersectBy = exports.intersect = undefined;
    exports.union = exports.unionBy = exports.removeFirstsBy = exports.removeBy = exports.nubBy = exports.insertBy = exports.insert = exports.sortBy = exports.sortOn = exports.remove = exports.scanr1 = exports.scanr = exports.scanl1 = exports.scanl = exports.all = exports.any = exports.zipWith5 = exports.zipWith4 = exports.zipWith3 = exports.zipWithN = exports.zipWith = exports.zip5 = exports.zip4 = exports.zip3 = exports.zip = exports.stripPrefix = exports.groupBy = exports.isSubsequenceOf = exports.isInfixOf = exports.isSuffixOf = exports.isPrefixOf = exports.lookup = exports.notElem = exports.elem = exports.partition = exports.filter = exports.find = exports.at = exports.breakOnList = exports.span = exports.dropWhileEnd = exports.dropWhile = exports.takeWhile = exports.splitAt = exports.drop = exports.take = exports.elemIndices = exports.elemIndex = exports.findIndices = exports.findIndex = exports.unfoldr = exports.cycle = exports.replicate = exports.repeat = exports.iterate = exports.mapAccumR = exports.mapAccumL = exports.foldr1 = exports.foldl1 = exports.foldr = exports.foldl = exports.intercalate = exports.intersperse = exports.map = exports.concatMap = exports.appendMany = exports.append = exports.push = exports.split = exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.swapped = exports.unconsr = exports.uncons = exports.inits = exports.init = exports.tail = exports.last = exports.head = exports.nub = exports.sort = exports.minimum = exports.maximum = exports.product = exports.sum = exports.tails = exports.group = exports.permutations = exports.subsequences = exports.transpose = exports.reverse = exports.concat = exports.unzipN = exports.unzip = exports.zipN = exports.not = exports.or = exports.and = undefined;
    Object.defineProperty(exports, 'slice', {
        enumerable: true,
        get: function () {
            return _jsPlatform.slice;
        }
    });
    Object.defineProperty(exports, 'includes', {
        enumerable: true,
        get: function () {
            return _jsPlatform.includes;
        }
    });
    Object.defineProperty(exports, 'indexOf', {
        enumerable: true,
        get: function () {
            return _jsPlatform.indexOf;
        }
    });
    Object.defineProperty(exports, 'lastIndexOf', {
        enumerable: true,
        get: function () {
            return _jsPlatform.lastIndexOf;
        }
    });
    Object.defineProperty(exports, 'split', {
        enumerable: true,
        get: function () {
            return _jsPlatform.split;
        }
    });
    Object.defineProperty(exports, 'push', {
        enumerable: true,
        get: function () {
            return _jsPlatform.push;
        }
    });
    Object.keys(_listOps).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _listOps[key];
            }
        });
    });
    exports.and = _listOps._and;
    exports.or = _listOps._or;
    exports.not = _listOps._not;
    exports.zipN = _listOps._zipN;
    exports.unzip = _listOps._unzip;
    exports.unzipN = _listOps._unzipN;
    exports.concat = _listOps._concat;
    exports.reverse = _listOps._reverse;
    exports.transpose = _listOps._transpose;
    exports.subsequences = _listOps._subsequences;
    exports.permutations = _listOps._permutations;
    exports.group = _listOps._group;
    exports.tails = _listOps._tails;
    exports.sum = _listOps._sum;
    exports.product = _listOps._product;
    exports.maximum = _listOps._maximum;
    exports.minimum = _listOps._minimum;
    exports.sort = _listOps._sort;
    exports.nub = _listOps._nub;
    exports.head = _listOps._head;
    exports.last = _listOps._last;
    exports.tail = _listOps._tail;
    exports.init = _listOps._init;
    exports.inits = _listOps._inits;
    exports.uncons = _listOps._uncons;
    exports.unconsr = _listOps._unconsr;
    exports.swapped = _listOps._swapped;
    var

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
    append = exports.append = (0, _functionOps.curry)(_listOps._append),


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
    appendMany = exports.appendMany = (0, _functionOps.curry2)(_listOps._appendMany),


    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:listOps.concatMap
     * @param fn {Function}
     * @param foldableOfA {Array|String|*}
     * @returns {Array|String|*}
     */
    concatMap = exports.concatMap = (0, _functionOps.curry2)(_listOps._concatMap),


    /**
     * @function module:listOps.map
     * @param fn {Function} - Function to map on functor item(s).
     * @param xs {Array|String|*} - Functor.
     * @returns {Array|String|*} - Functor type that is passed in.
     */
    map = exports.map = (0, _functionOps.curry)(_listOps._map),


    /**
     * Takes an element and a list and `intersperses' that element between the elements of the list. For example
     * @function module:listOps.intersperse
     * @note In our version of the function javascript is loosely typed so, so is our function (to much overhead to make
     *  it typed) so `between` can be any value.
     * @param between {*} - Should be of the same type of elements contained in list.
     * @param arr {Array|String|*} - List.
     * @returns {Array|String|*}
     */
    intersperse = exports.intersperse = (0, _functionOps.curry)(_listOps._intersperse),


    /**
     * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
     * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
     * @function module:listOps.intercalate
     * @param xs {Array|String|*}
     * @param xss {Array|String|*}
     * @returns {Array|String|*}
     */
    intercalate = exports.intercalate = (0, _functionOps.curry)(_listOps._intercalate),


    /**
     * Reduces a foldable (list etc.) with passed in function.
     * @function module:listOps.foldl
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array|String|*}
     * @returns {*} - Usually same type as aggregate (`zero`) (depends on `fn`).
     */
    foldl = exports.foldl = (0, _functionOps.curry)(_listOps._foldl),


    /**
     * Reduces a foldable (list etc.) from right to left with passed in function.
     * @function module:listOps.foldr
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array|{reduce: {Function}}}
     * @returns {*} - Usually same type as aggregate (`zero`) (depends on `fn`).
     */
    foldr = exports.foldr = (0, _functionOps.curry)(_listOps._foldr),


    /**
     * Reduces a foldable (list etc.) with passed in function.
     * @function module:listOps.foldl1
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {*}
     */
    foldl1 = exports.foldl1 = (0, _functionOps.curry)(_listOps._foldl1),


    /**
     * Reduces a foldable (list etc.) from right to left with passed in function.
     * @function module:listOps.foldr1
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {*}
     */
    foldr1 = exports.foldr1 = (0, _functionOps.curry)(_listOps._foldr1),


    /**
     * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
     * containing the aggregated value and the result of mapping the passed in function on passed in list.
     * @function module:listOps.mapAccumL
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumL = exports.mapAccumL = (0, _functionOps.curry)(_listOps._mapAccumL),


    /**
     * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
     * containing the aggregated value and the result of mapping the passed in function on passed in list.
     * @function module:listOps.mapAccumR
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumR = exports.mapAccumR = (0, _functionOps.curry)(_listOps._mapAccumR),


    /**
     * Iterate on value (`x`) with `op` up to `limit`.
     * @function module:listOps.iterate
     * @param limit {Number}
     * @param op {Function} - Operation
     * @param x {*} - Starting point.
     * @returns {*}
     */
    iterate = exports.iterate = (0, _functionOps.curry)(_listOps._iterate),


    /**
     * Repeats `x` `limit` number of times.
     * @function module:listOps.repeat
     * @param limit {Number}
     * @param x {*}
     * @return {Array}
     */
    repeat = exports.repeat = (0, _functionOps.curry)(_listOps._repeat),


    /**
     * Same as `repeat` due to the nature of javascript (see haskell version for usage).
     * @function module:listOps.replicate
     * @param limit {Number}
     * @param x {*}
     * @return {Array}
     */
    replicate = exports.replicate = (0, _functionOps.curry)(_listOps._replicate),


    /**
     * Replicates a list `limit` number of times and appends the results (concat)
     * @function module:listOps.cycle
     * @param limit {Number}
     * @param xs {Array}
     * @returns {Array}
     */
    cycle = exports.cycle = (0, _functionOps.curry)(_listOps._cycle),


    /**
     * Unfolds a value into a list of somethings.
     * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
     * @function module:listOps.unfoldr
     * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
     * @param x {*} - Starting parameter to unfold from.
     * @returns {Array} - An array of whatever you return from `op` yielded.
     */
    unfoldr = exports.unfoldr = (0, _functionOps.curry)(_listOps._unfoldr),


    /**
     * Finds index in string or list (alias for `findIndex`).
     * @function module:listOps.findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndex = exports.findIndex = (0, _functionOps.curry)(_listOps._findIndex),


    /**
     * @function module:listOps.findIndices
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndices = exports.findIndices = (0, _functionOps.curry)(_listOps._findIndices),


    /**
     * @function module:listOps.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndex = exports.elemIndex = (0, _functionOps.curry)(_listOps._elemIndex),


    /**
     * @function module:listOps.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndices = exports.elemIndices = (0, _functionOps.curry)(_listOps._elemIndices),


    /**
     * Takes `n` items from start of list to `limit` (exclusive).
     * @function module:listOps.take
     * @param list {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = exports.take = (0, _functionOps.curry)(_listOps._take),


    /**
     * Drops `n` items from start of list to `count` (exclusive).
     * @function module:listOps.take
     * @param list {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = exports.drop = (0, _functionOps.curry)(_listOps._drop),


    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:listOps.splitAt
     * @param ind {Number} - Index to split at.
     * @param list {Array|String|*} - functor (list or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = exports.splitAt = (0, _functionOps.curry)(_listOps._splitAt),


    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:listOps.takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @returns {Array}
     */
    takeWhile = exports.takeWhile = (0, _functionOps.curry)(_listOps._takeWhile),


    /**
     * Returns an list without elements that match predicate.
     * @function module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = exports.dropWhile = (0, _functionOps.curry)(_listOps._dropWhile),


    /**
     * @function module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd = exports.dropWhileEnd = (0, _functionOps.curry)(_listOps._dropWhileEnd),


    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @function module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array|String|*} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String|*} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    span = exports.span = (0, _functionOps.curry)(_listOps._span),


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
     * @function module:listOps.breakOnList
     * @param pred {Function}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    breakOnList = exports.breakOnList = (0, _functionOps.curry)(_listOps._breakOnList),


    /**
     * @function module:listOps.at
     * @param ind {Number} - Index.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    at = exports.at = (0, _functionOps.curry)(_listOps._at),


    /**
     * @function module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    find = exports.find = (0, _functionOps.curry)(_listOps._find),
        filter = exports.filter = (0, _functionOps.curry)(_listOps._filter),


    /**
     * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
     * do not match the tuple are in second list in the returned tuple.
     *  Essentially `[filter(p, xs), filter(negateP(p), xs)]`.
     * @function module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array|String|*}
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    partition = exports.partition = (0, _functionOps.curry)(_listOps._partition),


    /**
     * Returns a boolean indicating whether an element exists in given structure of elements.
     * @function module:listOps.elem
     * @param element {*}
     * @param xs {Array}
     * @returns {Boolean}
     */
    elem = exports.elem = (0, _functionOps.curry)(_listOps._elem),


    /**
     * The opposite of `elem` - Returns a boolean indicating whether an element exists in given list.
     * @function module:listOps.notElem
     * @param element {*}
     * @param xs {Array}
     * @returns {Boolean}
     */
    notElem = exports.notElem = (0, _functionOps.curry2)(_listOps._notElem),


    /**
     * Same as _listOps._at - Returns property value at key/indice.
     * @function module:_object._lookup
     * @type {module:_objectOps.prop}
     */
    lookup = exports.lookup = (0, _functionOps.curry)(_listOps._lookup),


    /**
     * Checks if list `xs1` is a prefix of list `xs2`
     * @function module:listOps.isPrefixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    isPrefixOf = exports.isPrefixOf = (0, _functionOps.curry)(_listOps._isPrefixOf),


    /**
     * Checks if list `xs1` is a suffix of list `xs2`
     * @function module:listOps.isSuffixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    isSuffixOf = exports.isSuffixOf = (0, _functionOps.curry)(_listOps._isSuffixOf),


    /**
     * Checks if list `xs1` is an infix of list `xs2`
     * @function module:listOps.isInfixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    isInfixOf = exports.isInfixOf = (0, _functionOps.curry)(_listOps._isInfixOf),


    /**
     * Checks if list `xs1` is a sub-sequence of list `xs2`
     * @function module:listOps.isPrefixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    isSubsequenceOf = exports.isSubsequenceOf = (0, _functionOps.curry)(_listOps._isSubsequenceOf),


    /**
     * Allows you to group items in a list based on your supplied equality check.
     * @note Sames `group` but allows you to specify equality operation.
     * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
     * @function module:listOps.groupBy
     * @param equalityOp {Function}
     * @param xs {Array|String|*}
     * @returns {*}
     */
    groupBy = exports.groupBy = (0, _functionOps.curry)(_listOps._groupBy),


    /**
     * Strips prefix list from given list
     * @function module:listOps.stripPrefix
     * @param prefix {Array|String|*}
     * @param list {Array|string|*}
     * @returns {Array|*}
     */
    stripPrefix = exports.stripPrefix = (0, _functionOps.curry)(_listOps._stripPrefix),


    /**
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
     * @function module:listOps.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = exports.zip = (0, _functionOps.curry)(_listOps._zip),


    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
     * @function module:listOps.zip3
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip3 = exports.zip3 = (0, _functionOps.curry)(_listOps._zip3),


    /**
     * @haskellType `zip4 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
     * @function module:listOps.zip4
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip4 = exports.zip4 = (0, _functionOps.curry)(_listOps._zip4),


    /**
     * @haskellType `zip5 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
     * @function module:listOps.zip5
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @param arr5 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip5 = exports.zip5 = (0, _functionOps.curry)(_listOps._zip5),


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
    zipWith = exports.zipWith = (0, _functionOps.curry)(_listOps._zipWith),


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
    zipWithN = exports.zipWithN = (0, _functionOps.curry)(_listOps._zipWithN),


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
    zipWith3 = exports.zipWith3 = (0, _functionOps.curry)(_listOps._zipWith3),


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
    zipWith4 = exports.zipWith4 = (0, _functionOps.curry)(_listOps._zipWith4),


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
    zipWith5 = exports.zipWith5 = (0, _functionOps.curry)(_listOps._zipWith5),


    /**
     * Returns true if any item in container passes predicate `p`.
     * @function module:listOps.any
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    any = exports.any = (0, _functionOps.curry)(_listOps._any),


    /**
     * Returns true if all items in container pass predicate `p`.
     * @function module:listOps.all
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    all = exports.all = (0, _functionOps.curry)(_listOps._all),


    /**
     * scanl is similar to foldl, but returns a list of successive reduced values from the left:
     * ```
     * scanl f z [x1, x2, ...] == [z, z `f` x1, (z `f` x1) `f` x2, ...]
     * ```
     * Also note that:
     * ```
     * last (scanl f z xs) == foldl f z xs.
     * ```
     * @function module:listOps.scanl
     * @param fn {Function}
     * @param zero {*}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanl = exports.scanl = (0, _functionOps.curry)(_listOps._scanl),


    /**
     * `scanl1` is a variant of `scanl` that has no starting value argument:
     * `shallowCompare(scanl1(fn, [x1, x2, ...]), [x1, fn(x1, x2), ...]) // true`
     * @function module:listOps.scanl1
     * @param fn {Function}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanl1 = exports.scanl1 = (0, _functionOps.curry)(_listOps._scanl1),


    /**
     * Same as `scanl` but from the right (similiar to `foldr`'s relationship to `foldl`).
     * Note also `scanr`'s relationship ot `foldr`:
     * `head (scanr(fn, z, xs)) === foldr(fn, z, xs).
     * @function module:listOps.scanr
     * @param fn {Function}
     * @param zero {*}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanr = exports.scanr = (0, _functionOps.curry)(_listOps._scanr),


    /**
     * Same as `scanr` but takes no zero/accumulator value.
     * @function module:listOps.scanr1
     * @param fn {Function}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanr1 = exports.scanr1 = (0, _functionOps.curry)(_listOps._scanr1),


    /**
     * `remove(x, xs)` removes the first occurrence of `x` from `xs`.
     * For example, `remove('a', 'banana') === 'bnana';`
     * @function module:listOps.remove
     * @param x {*}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    remove = exports.remove = (0, _functionOps.curry)(_listOps._remove),


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
     * @function module:listOps.sortOn
     * @param valueFn {Function}
     * @param xs {Array|String|*}
     * @returns {Array}
     */
    sortOn = exports.sortOn = (0, _functionOps.curry)(_listOps._sortOn),


    /**
     * The sortBy function is the non-overloaded (in haskell terms) version of sort.
     * @haskellExample ```
     *  >>> sortBy (\(a,_) (b,_) -> compare a b) [(2, "world"), (4, "!"), (1, "Hello")]
     *  [(1,"Hello"),(2,"world"),(4,"!")]
     * ```
     * @function module:listOps.sortBy
     * @param orderingFn {Function}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sortBy = exports.sortBy = (0, _functionOps.curry)(_listOps._sortBy),


    /**
     * The insert function takes an element and a list and inserts the element
     * into the list at the first position where it is less than or equal to the
     * next element. In particular, if the list is sorted before the call, the
     * result will also be sorted. It is a special case of insertBy, which allows
     * the programmer to supply their own comparison function.
     * @function module:listOps.insert
     * @param x {*}
     * @param xs {Array|*}
     * @returns {Array}
     */
    insert = exports.insert = (0, _functionOps.curry)(_listOps._insert),


    /**
     * A version of `insert` that allows you to specify the ordering of the inserted
     * item;  Before/at, or after
     * @function module:listOps.insertBy
     * @haskellType `insertBy :: (a -> a -> Ordering) -> a -> [a] -> [a]`
     * @note `Ordering` === // something that is order-able
     * @todo Optimize and work the logic of this function;  Think about the types that will be
     *  operated on by this functions logic.
     * @param orderingFn {Function} - A function that returns `-1`, `0`, or 1`.
     * @param x {*} - Value to insert.
     * @param xs {Array|String|*} - List to insert into (note new list is returned)
     * @returns {Array|String|*} - New list.
     */
    insertBy = exports.insertBy = (0, _functionOps.curry)(_listOps._insertBy),


    /**
     * The nubBy function behaves just like nub, except it uses a user-supplied equality predicate.
     * @function module:listOps.nubBy
     * @param pred {Function}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    nubBy = exports.nubBy = (0, _functionOps.curry)(_listOps._nubBy),


    /**
     * Behaves the same as `remove`, but takes a user-supplied equality predicate.
     * @function module:listOps.removeBy
     * @param pred {Function}
     * @param x {*}
     * @param list {Array|String|*}
     * @returns {Array}
     */
    removeBy = exports.removeBy = (0, _functionOps.curry)(_listOps._removeBy),


    /**
     * The `removeFirstsBy` function takes a predicate and two lists and returns the first list with the first
     * occurrence of each element of the second list removed.
     * @function module:listOps.removeFirstBy
     * @param pred {Function}
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {Array}
     */
    removeFirstsBy = exports.removeFirstsBy = (0, _functionOps.curry)(_listOps._removeFirstsBy),


    /**
     * Returns the union on elements matching boolean check passed in.
     * @function module:listOps.unionBy
     * @param pred {Function} - `pred :: a -> a -> Bool`
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    unionBy = exports.unionBy = (0, _functionOps.curry)(_listOps._unionBy),


    /**
     * Creates a union on matching elements from array1.
     * @function module:listOps.union
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    union = exports.union = (0, _functionOps.curry)(_listOps._union),


    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:listOps.intersect
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    intersect = exports.intersect = (0, _functionOps.curry)(_listOps._intersect),


    /**
     * Returns an intersection by predicate.
     * @function module:listOps.intersectBy
     * @param pred {Function} - `pred :: a -> b -> Bool`
     * @param list1 {Array|String|*}
     * @param list2 {Array|String|*}
     * @return {Array|String|*}
     */
    intersectBy = exports.intersectBy = (0, _functionOps.curry)(_listOps._intersectBy),


    /**
     * Returns the difference of list 1 from list 2.
     * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
     * @function module:listOps.difference
     * @param array1 {Array|String|*}
     * @param array2 {Array|String|*}
     * @returns {Array|String|*}
     */
    difference = exports.difference = (0, _functionOps.curry)(_listOps._difference),


    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:listOps.complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    complement = exports.complement = (0, _functionOps.curry2)(_listOps._complement);
});