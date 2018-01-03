define(['exports', './uncurried/_listOps', './uncurried/_functionOps'], function (exports, _listOps, _functionOps) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.complement = exports.difference = exports.intersectBy = exports.intersect = exports.union = exports.unionBy = exports.removeFirstsBy = exports.removeBy = exports.nubBy = exports.insertBy = exports.insert = exports.sortBy = exports.sortOn = exports.remove = exports.scanr1 = exports.scanr = exports.scanl1 = exports.scanl = exports.minimumBy = exports.maximumBy = exports.all = exports.any = exports.zipWith5 = exports.zipWith4 = exports.zipWith3 = exports.zipWithN = exports.zipWith = exports.zip = exports.stripPrefix = exports.groupBy = exports.isSubsequenceOf = exports.isInfixOf = exports.isSuffixOf = exports.isPrefixOf = exports.lookup = exports.notElem = exports.elem = exports.partition = exports.filter = exports.find = exports.at = exports.breakOnList = exports.span = exports.dropWhileEnd = exports.dropWhile = exports.takeWhile = exports.splitAt = exports.drop = exports.take = exports.elemIndices = exports.elemIndex = exports.findIndices = exports.findIndex = exports.unfoldr = exports.cycle = exports.replicate = exports.repeat = undefined;
  exports.iterate = exports.mapAccumR = exports.mapAccumL = exports.foldr1 = exports.foldl1 = exports.foldr = exports.foldl = exports.intercalate = exports.intersperse = exports.map = exports.concatMap = exports.appendMany = exports.append = exports._groupBy = exports._intersectBy = exports._intersect = exports._union = exports._difference = exports._complement = exports._sortBy = exports._sortOn = exports._unionBy = exports._removeFirstsBy = exports._removeBy = exports._nubBy = exports._insertBy = exports._insert = exports._remove = exports._minimumBy = exports._maximumBy = exports._filter = exports._isSubsequenceOf = exports._isInfixOf = exports._isSuffixOf = exports._isPrefixOf = exports._stripPrefix = exports._breakOnList = exports._span = exports._at = exports._partition = exports._dropWhileEnd = exports._dropWhile = exports._takeWhile = exports._concatMap = exports._unfoldr = exports._foldr1 = exports._foldr = exports._foldl1 = exports._foldl = exports._splitAt = exports._drop = exports._take = exports._cycle = exports._replicate = exports._repeat = exports._iterate = exports._intercalate = exports._intersperse = exports._lookup = exports._elemIndices = exports._elemIndex = exports._notElem = exports._elem = exports._mapAccumR = exports._mapAccumL = exports._map = exports._zipWith = exports._zipN = exports._zip = exports._findIndices = exports._findIndex = exports._find = exports._any = exports._all = exports._appendMany = exports._append = exports.nub = exports.sort = exports.minimum = exports.maximum = exports.product = exports.sum = exports.tails = exports.inits = exports.group = exports.permutations = exports.subsequences = exports.transpose = exports.reverse = exports.concat = exports.uncons = exports.tail = exports.init = exports.last = exports.head = exports.unzipN = exports.unzip = exports.zipN = exports.or = exports.and = undefined;
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function () {
      return _listOps.and;
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function () {
      return _listOps.or;
    }
  });
  Object.defineProperty(exports, 'zipN', {
    enumerable: true,
    get: function () {
      return _listOps.zipN;
    }
  });
  Object.defineProperty(exports, 'unzip', {
    enumerable: true,
    get: function () {
      return _listOps.unzip;
    }
  });
  Object.defineProperty(exports, 'unzipN', {
    enumerable: true,
    get: function () {
      return _listOps.unzipN;
    }
  });
  Object.defineProperty(exports, 'head', {
    enumerable: true,
    get: function () {
      return _listOps.head;
    }
  });
  Object.defineProperty(exports, 'last', {
    enumerable: true,
    get: function () {
      return _listOps.last;
    }
  });
  Object.defineProperty(exports, 'init', {
    enumerable: true,
    get: function () {
      return _listOps.init;
    }
  });
  Object.defineProperty(exports, 'tail', {
    enumerable: true,
    get: function () {
      return _listOps.tail;
    }
  });
  Object.defineProperty(exports, 'uncons', {
    enumerable: true,
    get: function () {
      return _listOps.uncons;
    }
  });
  Object.defineProperty(exports, 'concat', {
    enumerable: true,
    get: function () {
      return _listOps.concat;
    }
  });
  Object.defineProperty(exports, 'reverse', {
    enumerable: true,
    get: function () {
      return _listOps.reverse;
    }
  });
  Object.defineProperty(exports, 'transpose', {
    enumerable: true,
    get: function () {
      return _listOps.transpose;
    }
  });
  Object.defineProperty(exports, 'subsequences', {
    enumerable: true,
    get: function () {
      return _listOps.subsequences;
    }
  });
  Object.defineProperty(exports, 'permutations', {
    enumerable: true,
    get: function () {
      return _listOps.permutations;
    }
  });
  Object.defineProperty(exports, 'group', {
    enumerable: true,
    get: function () {
      return _listOps.group;
    }
  });
  Object.defineProperty(exports, 'inits', {
    enumerable: true,
    get: function () {
      return _listOps.inits;
    }
  });
  Object.defineProperty(exports, 'tails', {
    enumerable: true,
    get: function () {
      return _listOps.tails;
    }
  });
  Object.defineProperty(exports, 'sum', {
    enumerable: true,
    get: function () {
      return _listOps.sum;
    }
  });
  Object.defineProperty(exports, 'product', {
    enumerable: true,
    get: function () {
      return _listOps.product;
    }
  });
  Object.defineProperty(exports, 'maximum', {
    enumerable: true,
    get: function () {
      return _listOps.maximum;
    }
  });
  Object.defineProperty(exports, 'minimum', {
    enumerable: true,
    get: function () {
      return _listOps.minimum;
    }
  });
  Object.defineProperty(exports, 'sort', {
    enumerable: true,
    get: function () {
      return _listOps.sort;
    }
  });
  Object.defineProperty(exports, 'nub', {
    enumerable: true,
    get: function () {
      return _listOps.nub;
    }
  });
  exports._append = _listOps.append;
  exports._appendMany = _listOps.appendMany;
  exports._all = _listOps.all;
  exports._any = _listOps.any;
  exports._find = _listOps.find;
  exports._findIndex = _listOps.findIndex;
  exports._findIndices = _listOps.findIndices;
  exports._zip = _listOps.zip;
  exports._zipN = _listOps.zipN;
  exports._zipWith = _listOps.zipWith;
  exports._map = _listOps.map;
  exports._mapAccumL = _listOps.mapAccumL;
  exports._mapAccumR = _listOps.mapAccumR;
  exports._elem = _listOps.elem;
  exports._notElem = _listOps.notElem;
  exports._elemIndex = _listOps.elemIndex;
  exports._elemIndices = _listOps.elemIndices;
  exports._lookup = _listOps.lookup;
  exports._intersperse = _listOps.intersperse;
  exports._intercalate = _listOps.intercalate;
  exports._iterate = _listOps.iterate;
  exports._repeat = _listOps.repeat;
  exports._replicate = _listOps.replicate;
  exports._cycle = _listOps.cycle;
  exports._take = _listOps.take;
  exports._drop = _listOps.drop;
  exports._splitAt = _listOps.splitAt;
  exports._foldl = _listOps.foldl;
  exports._foldl1 = _listOps.foldl1;
  exports._foldr = _listOps.foldr;
  exports._foldr1 = _listOps.foldr1;
  exports._unfoldr = _listOps.unfoldr;
  exports._concatMap = _listOps.concatMap;
  exports._takeWhile = _listOps.takeWhile;
  exports._dropWhile = _listOps.dropWhile;
  exports._dropWhileEnd = _listOps.dropWhileEnd;
  exports._partition = _listOps.partition;
  exports._at = _listOps.at;
  exports._span = _listOps.span;
  exports._breakOnList = _listOps.breakOnList;
  exports._stripPrefix = _listOps.stripPrefix;
  exports._isPrefixOf = _listOps.isPrefixOf;
  exports._isSuffixOf = _listOps.isSuffixOf;
  exports._isInfixOf = _listOps.isInfixOf;
  exports._isSubsequenceOf = _listOps.isSubsequenceOf;
  exports._filter = _listOps.filter;
  exports._maximumBy = _listOps.maximumBy;
  exports._minimumBy = _listOps.minimumBy;
  exports._remove = _listOps.remove;
  exports._insert = _listOps.insert;
  exports._insertBy = _listOps.insertBy;
  exports._nubBy = _listOps.nubBy;
  exports._removeBy = _listOps.removeBy;
  exports._removeFirstsBy = _listOps.removeFirstsBy;
  exports._unionBy = _listOps.unionBy;
  exports._sortOn = _listOps.sortOn;
  exports._sortBy = _listOps.sortBy;
  exports._complement = _listOps.complement;
  exports._difference = _listOps.difference;
  exports._union = _listOps.union;
  exports._intersect = _listOps.intersect;
  exports._intersectBy = _listOps.intersectBy;
  exports._groupBy = _listOps.groupBy;


  // Exported internals
  const

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
  append = exports.append = (0, _functionOps.curry)(_listOps.append),


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
  appendMany = exports.appendMany = (0, _functionOps.curry2)(_listOps.appendMany),


  /**
   * Map a function over all the elements of a container and concatenate the resulting lists.
   * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
   * @function module:listOps.concatMap
   * @param fn {Function}
   * @param foldableOfA {Array|String|*}
   * @returns {Array|String|*}
   */
  concatMap = exports.concatMap = (0, _functionOps.curry2)(_listOps.concatMap),


  /**
   * @function module:listOps.map
   * @param fn {Function} - Function to map on functor item(s).
   * @param xs {Array|String|*} - Functor.
   * @returns {Array|String|*} - Functor type that is passed in.
   */
  map = exports.map = (0, _functionOps.curry)(_listOps.map),


  /**
   * Takes an element and a list and `intersperses' that element between the elements of the list. For example
   * @function module:listOps.intersperse
   * @note In our version of the function javascript is loosely typed so, so is our function (to much overhead to make
   *  it typed) so `between` can be any value.
   * @param between {*} - Should be of the same type of elements contained in list.
   * @param arr {Array|String|*} - List.
   * @returns {Array|String|*}
   */
  intersperse = exports.intersperse = (0, _functionOps.curry)(_listOps.intersperse),


  /**
   * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
   * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
   * @function module:listOps.intercalate
   * @param xs {Array|String|*}
   * @param xss {Array|String|*}
   * @returns {Array|String|*}
   */
  intercalate = exports.intercalate = (0, _functionOps.curry)(_listOps.intercalate),


  /**
   * Reduces a foldable (list etc.) with passed in function.
   * @function module:listOps.foldl
   * @param fn {Function}
   * @param zero {*} - Aggregator.
   * @param functor {Array|String|*}
   * @returns {*} - Usually same type as aggregate (`zero`) (depends on `fn`).
   */
  foldl = exports.foldl = (0, _functionOps.curry)(_listOps.foldl),


  /**
   * Reduces a foldable (list etc.) from right to left with passed in function.
   * @function module:listOps.foldr
   * @param fn {Function}
   * @param zero {*} - Aggregator.
   * @param functor {Array|{reduce: {Function}}}
   * @returns {*} - Usually same type as aggregate (`zero`) (depends on `fn`).
   */
  foldr = exports.foldr = (0, _functionOps.curry)(_listOps.foldr),


  /**
   * Reduces a foldable (list etc.) with passed in function.
   * @function module:listOps.foldl1
   * @param fn {Function}
   * @param functor {Array|{reduce: {Function}}}
   * @returns {*}
   */
  foldl1 = exports.foldl1 = (0, _functionOps.curry)(_listOps.foldl1),


  /**
   * Reduces a foldable (list etc.) from right to left with passed in function.
   * @function module:listOps.foldr1
   * @param fn {Function}
   * @param functor {Array|{reduce: {Function}}}
   * @returns {*}
   */
  foldr1 = exports.foldr1 = (0, _functionOps.curry)(_listOps.foldr1),


  /**
   * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   * @function module:listOps.mapAccumL
   * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
   * @param zero {*} - An instance of the passed in list type used to aggregate on.
   * @param xs {Array|String|*} - list type.
   * @return {Array} - [aggregated, list]
   */
  mapAccumL = exports.mapAccumL = (0, _functionOps.curry)(_listOps.mapAccumL),


  /**
   * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   * @function module:listOps.mapAccumR
   * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
   * @param zero {*} - An instance of the passed in list type used to aggregate on.
   * @param xs {Array|String|*} - list type.
   * @return {Array} - [aggregated, list]
   */
  mapAccumR = exports.mapAccumR = (0, _functionOps.curry)(_listOps.mapAccumR),


  /**
   * Iterate on value (`x`) with `op` up to `limit`.
   * @function module:listOps.iterate
   * @param limit {Number}
   * @param op {Function} - Operation
   * @param x {*} - Starting point.
   * @returns {*}
   */
  iterate = exports.iterate = (0, _functionOps.curry)(_listOps.iterate),
        repeat = exports.repeat = (0, _functionOps.curry)(_listOps.repeat),
        replicate = exports.replicate = repeat,
        cycle = exports.cycle = (0, _functionOps.curry)(_listOps.cycle),


  /**
   * Unfolds a value into a list of somethings.
   * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
   * @function module:listOps.unfoldr
   * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
   * @param x {*} - Starting parameter to unfold from.
   * @returns {Array} - An array of whatever you return from `op` yielded.
   */
  unfoldr = exports.unfoldr = (0, _functionOps.curry)(_listOps.unfoldr),


  /**
   * Finds index in string or list (alias for `findIndex`).
   * @function module:listOps.findIndex
   * @param pred {Function} - Predicate<element, index, arr>.
   * @param arr {Array|String}
   * @returns {Number} - `-1` if predicate not matched else `index` found
   */
  findIndex = exports.findIndex = (0, _functionOps.curry)(_listOps.findIndex),


  /**
   * @function module:listOps.findIndices
   * @param pred {Function}
   * @param xs {Array|String|*} - list or list like.
   * @returns {Array|undefined}
   */
  findIndices = exports.findIndices = (0, _functionOps.curry)(_listOps.findIndices),


  /**
   * @function module:listOps.elemIndex
   * @param x {*} - Element to search for.
   * @param xs {Array|String|*} - list or list like.
   * @returns {*}
   */
  elemIndex = exports.elemIndex = (0, _functionOps.curry)(_listOps.elemIndex),


  /**
   * @function module:listOps.elemIndices
   * @param value {*} - Element to search for.
   * @param xs {Array|String|*} - list or list like.
   * @returns {*}
   */
  elemIndices = exports.elemIndices = (0, _functionOps.curry)(_listOps.elemIndices),


  /**
   * Takes `n` items from start of list to `limit` (exclusive).
   * @function module:listOps.take
   * @param list {Array|String}
   * @param limit {Number}
   * @returns {String|Array} - Passed in type's type
   */
  take = exports.take = (0, _functionOps.curry)(_listOps.take),


  /**
   * Drops `n` items from start of list to `count` (exclusive).
   * @function module:listOps.take
   * @param list {Array|String}
   * @param count {Number}
   * @returns {String|Array} - Passed in type's type
   */
  drop = exports.drop = (0, _functionOps.curry)(_listOps.drop),


  /**
   * Splits `x` in two at given `index` (exclusive (includes element/character at
   * given index in second part of returned list)).
   * @function module:listOps.splitAt
   * @param ind {Number} - Index to split at.
   * @param list {Array|String|*} - functor (list or string) to split.
   * @returns {Array} - Array of whatever type `x` was when passed in
   */
  splitAt = exports.splitAt = (0, _functionOps.curry)(_listOps.splitAt),


  /**
   * Gives an list with passed elements while predicate was true.
   * @function module:listOps.takeWhile
   * @param pred {Function} - Predicate<*, index, list|string>
   * @param list {Array|String}
   * @returns {Array}
   */
  takeWhile = exports.takeWhile = (0, _functionOps.curry)(_listOps.takeWhile),


  /**
   * Returns an list without elements that match predicate.
   * @function module:listOps.dropWhile
   * @param pred {Function} - Predicate<*, index, list|string>
   * @param list {Array|String}
   * @refactor
   * @returns {Array|String}
   */
  dropWhile = exports.dropWhile = (0, _functionOps.curry)(_listOps.dropWhile),


  /**
   * @function module:listOps.dropWhile
   * @param pred {Function} - Predicate<*, index, list|string>
   * @param list {Array|String}
   * @refactor
   * @returns {Array|String}
   */
  dropWhileEnd = exports.dropWhileEnd = (0, _functionOps.curry)(_listOps.dropWhileEnd),


  /**
   * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
   * the second list in the tuple is a list of the remaining elements in the given list.
   * **@Note: Not the same as `partition`.  Read descriptions closely!!!
   * @function module:listOps.partition
   * @param pred {Function} - Predicate<item, index, originalArrayOrString>
   * @param list {Array|String|*} - Predicate<item, index, originalArrayOrString>
   * @returns {Array|String|*} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
   */
  span = exports.span = (0, _functionOps.curry)(_listOps.span),
        breakOnList = exports.breakOnList = (0, _functionOps.curry)(_listOps.breakOnList),


  /**
   * @function module:listOps.at
   * @param ind {Number} - Index.
   * @param xs {Array|String|*} - list or list like.
   * @returns {*}
   */
  at = exports.at = (0, _functionOps.curry)(_listOps.at),


  /**
   * @function module:listOps.find
   * @param pred {Function}
   * @param xs {Array|String|*} - list or list like.
   * @returns {*}
   */
  find = exports.find = (0, _functionOps.curry)(_listOps.find),
        filter = exports.filter = (0, _functionOps.curry)(_listOps.filter),


  /**
   * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
   * do not match the tuple are in second list in the returned tuple.
   *  Essentially `[filter(p, xs), filter(negateP(p), xs)]`.
   * @function module:listOps.partition
   * @param pred {Function} - Predicate<item, index, originalArrayOrString>
   * @param list {Array|String|*}
   * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
   */
  partition = exports.partition = (0, _functionOps.curry)(_listOps.partition),
        elem = exports.elem = (0, _functionOps.curry)(_listOps.elem),
        notElem = exports.notElem = (0, _functionOps.curry2)(_listOps.notElem),
        lookup = exports.lookup = at,
        isPrefixOf = exports.isPrefixOf = (0, _functionOps.curry)(_listOps.isPrefixOf),
        isSuffixOf = exports.isSuffixOf = (0, _functionOps.curry)(_listOps.isSuffixOf),
        isInfixOf = exports.isInfixOf = (0, _functionOps.curry)(_listOps.isInfixOf),
        isSubsequenceOf = exports.isSubsequenceOf = (0, _functionOps.curry)(_listOps.isSubsequenceOf),


  /**
   * Allows you to group items in a list based on your supplied equality check.
   * @note Sames `group` but allows you to specify equality operation.
   * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
   * @function module:listOps_.groupBy
   * @param equalityOp {Function}
   * @param xs {Array|String|*}
   * @returns {*}
   */
  groupBy = exports.groupBy = (0, _functionOps.curry)(_listOps.groupBy),
        stripPrefix = exports.stripPrefix = (0, _functionOps.curry)(_listOps.stripPrefix),


  /**
   * zip takes two lists and returns a list of corresponding pairs.
   * If one input list is short, excess elements of the longer list are discarded.
   * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
   * @function module:listOps.zip
   * @param arr1 {Array}
   * @param arr2 {Array}
   * @returns {Array<Array<*,*>>}
   */
  zip = exports.zip = (0, _functionOps.curry)(_listOps.zip),


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
  zipWith = exports.zipWith = (0, _functionOps.curry)(_listOps.zipWith),


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
  zipWithN = exports.zipWithN = (0, _functionOps.curry2)(_listOps.zipWithN),


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
  zipWith3 = exports.zipWith3 = zipWithN,


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
  zipWith4 = exports.zipWith4 = zipWithN,


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
  zipWith5 = exports.zipWith5 = zipWithN,
        any = exports.any = (0, _functionOps.curry)(_listOps.any),
        all = exports.all = (0, _functionOps.curry)(_listOps.all),
        maximumBy = exports.maximumBy = (0, _functionOps.curry)(_listOps.maximumBy),
        minimumBy = exports.minimumBy = (0, _functionOps.curry)(_listOps.minimumBy),
        scanl = exports.scanl = () => null,
        scanl1 = exports.scanl1 = () => null,
        scanr = exports.scanr = () => null,
        scanr1 = exports.scanr1 = () => null,
        remove = exports.remove = (0, _functionOps.curry)(_listOps.remove),
        sortOn = exports.sortOn = (0, _functionOps.curry)(_listOps.sortOn),
        sortBy = exports.sortBy = (0, _functionOps.curry)(_listOps.sortBy),
        insert = exports.insert = (0, _functionOps.curry)(_listOps.insert),


  /**
   * A version of `insert` that allows you to specify the ordering of the inserted
   * item;  Before/at, or after
   * @function module:listOps_.insertBy
   * @haskellType `insertBy :: (a -> a -> Ordering) -> a -> [a] -> [a]`
   * @note `Ordering` === // something that is order-able
   * @todo Optimize and work the logic of this function;  Think about the types that will be
   *  operated on by this functions logic.
   * @param orderingFn {Function} - A function that returns `-1`, `0`, or 1`.
   * @param x {*} - Value to insert.
   * @param xs {Array|String|*} - List to insert into (note new list is returned)
   * @returns {Array|String|*} - New list.
   */
  insertBy = exports.insertBy = (0, _functionOps.curry)(_listOps.insertBy),
        nubBy = exports.nubBy = (0, _functionOps.curry)(_listOps.nubBy),
        removeBy = exports.removeBy = (0, _functionOps.curry)(_listOps.removeBy),
        removeFirstsBy = exports.removeFirstsBy = (0, _functionOps.curry)(_listOps.removeFirstsBy),


  /**
   * Returns the union on elements matching boolean check passed in.
   * @function module:listOps.unionBy
   * @param pred {Function} - `pred :: a -> a -> Bool`
   * @param arr1 {Array|String|*}
   * @param arr2 {Array|String|*}
   * @returns {Array|String|*}
   */
  unionBy = exports.unionBy = (0, _functionOps.curry)(_listOps.unionBy),


  /**
   * Creates a union on matching elements from array1.
   * @function module:listOps.union
   * @param arr1 {Array|String|*}
   * @param arr2 {Array|String|*}
   * @returns {Array|String|*}
   */
  union = exports.union = (0, _functionOps.curry)(_listOps.union),


  /**
   * Performs an intersection on list 1 with  elements from list 2.
   * @function module:listOps.intersect
   * @param arr1 {Array|String|*}
   * @param arr2 {Array|String|*}
   * @returns {Array|String|*}
   */
  intersect = exports.intersect = (0, _functionOps.curry)(_listOps.intersect),


  /**
   * Returns an intersection by predicate.
   * @function module:listOps.intersectBy
   * @param pred {Function} - `pred :: a -> b -> Bool`
   * @param list1 {Array|String|*}
   * @param list2 {Array|String|*}
   * @return {Array|String|*}
   */
  intersectBy = exports.intersectBy = (0, _functionOps.curry)(_listOps.intersectBy),


  /**
   * Returns the difference of list 1 from list 2.
   * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
   * @function module:listOps.difference
   * @param array1 {Array|String|*}
   * @param array2 {Array|String|*}
   * @returns {Array|String|*}
   */
  difference = exports.difference = (0, _functionOps.curry)(_listOps.difference),


  /**
   * Returns the complement of list 0 and the reset of the passed in arrays.
   * @function module:listOps.complement
   * @param arr0 {Array}
   * @param arrays {...Array}
   * @returns {Array}
   */
  complement = exports.complement = (0, _functionOps.curry2)(_listOps.complement);
});