/**
 * List operators.
 * @module listOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to
 *  return undefined (and also determine which cases are ok for just returning undefined).
 */
import {curry, curry2} from './uncurried/_functionOps/_functionOps';

import {
    _append, _appendMany, _head, _last, _tail, _init, _uncons, _unconsr,
    _map, _concat, _concatMap, _reverse, _intersperse, _intercalate, _transpose,
    _subsequences, _subsequences1, _swapped, _permutations, _foldl, _foldl1,
    _foldr, _foldr1, _unfoldr, _mapAccumL, _mapAccumR, _iterate, _repeat,
    _replicate, _cycle, _findIndex, _findIndices, _elemIndex, _elemIndices,
    _take, _drop, _splitAt, _takeWhile, _dropWhile, _dropWhileEnd, _span,
    _breakOnList, _at, _find, _filter, _partition, _elem, _notElem, _lookup,
    _isPrefixOf, _isSuffixOf, _isInfixOf, _isSubsequenceOf, _group, _groupBy,
    _inits, _tails, _stripPrefix, _zip, _zipN, _zip3, _zip4, _zip5, _zipWith,
    _zipWithN, _zipWith3, _zipWith4, _zipWith5, _unzip, _unzipN, _any, _all,
    _and, _or, _not, _sum, _product, _maximum, _minimum, _scanl, _scanl1, _scanr, _scanr1,
    _nub, _remove, _sort, _sortOn, _sortBy, _insert, _insertBy, _nubBy, _removeBy,
    _removeFirstsBy, _unionBy, _union, _intersect, _intersectBy, _difference,
    _complement
} from './uncurried/_listOps/_listOps';

// Export single arity methods
export {
    _and as and, _or as or, _not as not, _zipN as zipN, _unzip as unzip, _unzipN as unzipN,
    _concat as concat, _reverse as reverse, _transpose as transpose,
    _subsequences as subsequences, _permutations as permutations,
    _group as group, _tails as tails, _sum as sum, _product as product,
    _maximum as maximum, _minimum as minimum, _sort as sort, _nub as nub,
    _head as head, _last as last, _tail as tail, _init as init, _inits as inits,
    _uncons as uncons, _unconsr as unconsr, _subsequences1 as subsequences1,
    _swapped as swapped
};

export {slice, includes, indexOf, lastIndexOf, split, push} from './jsPlatform';

export * from './uncurried/_listOps/_listOps';

export const

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
    append = curry(_append),

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
    appendMany = curry2(_appendMany),

    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:listOps.concatMap
     * @param fn {Function}
     * @param foldableOfA {Array|String|*}
     * @returns {Array|String|*}
     */
    concatMap = curry2(_concatMap),

    /**
     * @function module:listOps.map
     * @param fn {Function} - Function to map on functor item(s).
     * @param xs {Array|String|*} - Functor.
     * @returns {Array|String|*} - Functor type that is passed in.
     */
    map = curry(_map),

    /**
     * Takes an element and a list and `intersperses' that element between the elements of the list. For example
     * @function module:listOps.intersperse
     * @note In our version of the function javascript is loosely typed so, so is our function (to much overhead to make
     *  it typed) so `between` can be any value.
     * @param between {*} - Should be of the same type of elements contained in list.
     * @param arr {Array|String|*} - List.
     * @returns {Array|String|*}
     */
    intersperse = curry(_intersperse),

    /**
     * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
     * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
     * @function module:listOps.intercalate
     * @param xs {Array|String|*}
     * @param xss {Array|String|*}
     * @returns {Array|String|*}
     */
    intercalate = curry(_intercalate),

    /**
     * Reduces a foldable (list etc.) with passed in function.
     * @function module:listOps.foldl
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array|String|*}
     * @returns {*} - Usually same type as aggregate (`zero`) (depends on `fn`).
     */
    foldl = curry(_foldl),

    /**
     * Reduces a foldable (list etc.) from right to left with passed in function.
     * @function module:listOps.foldr
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array|{reduce: {Function}}}
     * @returns {*} - Usually same type as aggregate (`zero`) (depends on `fn`).
     */
    foldr = curry(_foldr),

    /**
     * Reduces a foldable (list etc.) with passed in function.
     * @function module:listOps.foldl1
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {*}
     */
    foldl1 = curry(_foldl1),

    /**
     * Reduces a foldable (list etc.) from right to left with passed in function.
     * @function module:listOps.foldr1
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {*}
     */
    foldr1 = curry(_foldr1),

    /**
     * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
     * containing the aggregated value and the result of mapping the passed in function on passed in list.
     * @function module:listOps.mapAccumL
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumL = curry(_mapAccumL),

    /**
     * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
     * containing the aggregated value and the result of mapping the passed in function on passed in list.
     * @function module:listOps.mapAccumR
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumR = curry(_mapAccumR),

    /**
     * Iterate on value (`x`) with `op` up to `limit`.
     * @function module:listOps.iterate
     * @param limit {Number}
     * @param op {Function} - Operation
     * @param x {*} - Starting point.
     * @returns {*}
     */
    iterate = curry(_iterate),

    repeat = curry(_repeat),

    replicate = curry(_replicate),

    cycle = curry(_cycle),

    /**
     * Unfolds a value into a list of somethings.
     * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
     * @function module:listOps.unfoldr
     * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
     * @param x {*} - Starting parameter to unfold from.
     * @returns {Array} - An array of whatever you return from `op` yielded.
     */
    unfoldr = curry(_unfoldr),

    /**
     * Finds index in string or list (alias for `findIndex`).
     * @function module:listOps.findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndex = curry(_findIndex),

    /**
     * @function module:listOps.findIndices
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndices = curry(_findIndices),

    /**
     * @function module:listOps.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndex = curry(_elemIndex),

    /**
     * @function module:listOps.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndices = curry(_elemIndices),

    /**
     * Takes `n` items from start of list to `limit` (exclusive).
     * @function module:listOps.take
     * @param list {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = curry(_take),

    /**
     * Drops `n` items from start of list to `count` (exclusive).
     * @function module:listOps.take
     * @param list {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = curry(_drop),

    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:listOps.splitAt
     * @param ind {Number} - Index to split at.
     * @param list {Array|String|*} - functor (list or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = curry(_splitAt),

    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:listOps.takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @returns {Array}
     */
    takeWhile = curry(_takeWhile),

    /**
     * Returns an list without elements that match predicate.
     * @function module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = curry(_dropWhile),

    /**
     * @function module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd = curry(_dropWhileEnd),

    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @function module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array|String|*} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String|*} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    span = curry(_span),

    breakOnList = curry(_breakOnList),

    /**
     * @function module:listOps.at
     * @param ind {Number} - Index.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    at = curry(_at),

    /**
     * @function module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    find = curry(_find),

    filter = curry(_filter),

    /**
     * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
     * do not match the tuple are in second list in the returned tuple.
     *  Essentially `[filter(p, xs), filter(negateP(p), xs)]`.
     * @function module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array|String|*}
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    partition = curry(_partition),

    elem = curry(_elem),

    notElem = curry2(_notElem),

    lookup = curry(_lookup),

    isPrefixOf = curry(_isPrefixOf),

    isSuffixOf = curry(_isSuffixOf),

    isInfixOf = curry(_isInfixOf),

    isSubsequenceOf = curry(_isSubsequenceOf),

    /**
     * Allows you to group items in a list based on your supplied equality check.
     * @note Sames `group` but allows you to specify equality operation.
     * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
     * @function module:listOps.groupBy
     * @param equalityOp {Function}
     * @param xs {Array|String|*}
     * @returns {*}
     */
    groupBy = curry(_groupBy),

    stripPrefix = curry(_stripPrefix),

    /**
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
     * @function module:listOps.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = curry(_zip),

    zip3 = curry(_zip3),

    zip4 = curry(_zip4),

    zip5 = curry(_zip5),

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
    zipWith = curry(_zipWith),

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
    zipWithN = curry(_zipWithN),

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
    zipWith3 = curry(_zipWith3),

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
    zipWith4 = curry(_zipWith4),

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
    zipWith5 = curry(_zipWith5),

    any = curry(_any),

    all = curry(_all),

    scanl = curry(_scanl),

    scanl1 = curry(_scanl1),

    scanr = curry(_scanr),

    scanr1 = curry(_scanr1),

    remove = curry(_remove),

    sortOn = curry(_sortOn),

    sortBy = curry(_sortBy),

    insert = curry(_insert),

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
    insertBy = curry(_insertBy),

    nubBy = curry(_nubBy),

    removeBy = curry(_removeBy),

    removeFirstsBy = curry(_removeFirstsBy),

    /**
     * Returns the union on elements matching boolean check passed in.
     * @function module:listOps.unionBy
     * @param pred {Function} - `pred :: a -> a -> Bool`
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    unionBy = curry(_unionBy),

    /**
     * Creates a union on matching elements from array1.
     * @function module:listOps.union
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    union = curry(_union),

    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:listOps.intersect
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    intersect = curry(_intersect),

    /**
     * Returns an intersection by predicate.
     * @function module:listOps.intersectBy
     * @param pred {Function} - `pred :: a -> b -> Bool`
     * @param list1 {Array|String|*}
     * @param list2 {Array|String|*}
     * @return {Array|String|*}
     */
    intersectBy = curry(_intersectBy),

    /**
     * Returns the difference of list 1 from list 2.
     * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
     * @function module:listOps.difference
     * @param array1 {Array|String|*}
     * @param array2 {Array|String|*}
     * @returns {Array|String|*}
     */
    difference = curry(_difference),

    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:listOps.complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    complement = curry2(_complement)

;
