(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../functionOps/curry', '../functionOps/apply', '../functionOps/functionOps', '../booleanOps/is', '../objectOps/is', '../objectOps/prop', '../objectOps/typeOf', '../objectOps/of', '../objectOps/objectPrelude', '../utils/utils', '../../tests/for-server/helpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../functionOps/curry'), require('../functionOps/apply'), require('../functionOps/functionOps'), require('../booleanOps/is'), require('../objectOps/is'), require('../objectOps/prop'), require('../objectOps/typeOf'), require('../objectOps/of'), require('../objectOps/objectPrelude'), require('../utils/utils'), require('../../tests/for-server/helpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.apply, global.functionOps, global.is, global.is, global.prop, global.typeOf, global.of, global.objectPrelude, global.utils, global.helpers);
        global.listOps = mod.exports;
    }
})(this, function (exports, _curry, _apply, _functionOps, _is, _is2, _prop, _typeOf, _of, _objectPrelude, _utils, _helpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.arrayComplement = exports.arrayDifference = exports.arrayIntersect = exports.arrayUnion = exports.minimum = exports.maximum = exports.product = exports.sum = exports.not = exports.or = exports.and = exports.all = exports.any = exports.unzipN = exports.unzip = exports.zipWith5 = exports.zipWith4 = exports.zipWith3 = exports.zipWithN = exports.zipWith = exports.zip5 = exports.zip4 = exports.zip3 = exports.zipN = exports.zip = exports.flattenMulti = exports.flatten = exports.stripPrefix = exports.tails = exports.inits = exports.group = exports.isSubsequenceOf = exports.isInfixOf = exports.isSuffixOf = exports.isPrefixOf = exports.lookup = exports.notElem = exports.elem = exports.partition = exports.filter = exports.find = exports.at = exports.breakOnList = exports.span = exports.dropWhileEnd = exports.dropWhile = exports.takeWhile = exports.splitAt = exports.drop = exports.take = exports.elemIndices = exports.elemIndex = exports.findIndices = exports.findIndex = exports.unfoldr = exports.mapAccumR = exports.mapAccumL = exports.foldr1 = exports.foldl1 = exports.foldr = exports.foldl = exports.permutations = exports.subsequences = exports.transpose = exports.intercalate = exports.intersperse = exports.reverse = exports.concatMap = exports.concat = exports.map = exports.isEmpty = exports.unconsr = exports.uncons = exports.init = exports.tail = exports.last = exports.head = exports.mappendMany = exports.mappend = exports.mempty = exports.length = undefined;

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    exports.length = _objectPrelude.length;


    var

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
    alwaysFalse = function alwaysFalse() {
        return false;
    },


    /**
     * Array and String `slice`.
     * @param separator {String|RegExp}
     * @param arr{Array}
     * @returns {Array}
     */
    slice = (0, _utils.fPureTakes2)('slice'),


    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceToEndFrom = function sliceToEndFrom(startInd, arr) {
        return slice(startInd, (0, _objectPrelude.length)(arr), arr);
    },


    /**
     * Slices list from zero to `x` value.
     * @param x {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFromZero = function sliceFromZero(x) {
        return sliceToEndFrom(0, x);
    },


    /**
     * Always `1` or `-1`.
     * @param x {Number}
     * @returns {Number} - Always `1` or `-1`.
     */
    onlyOneOrNegOne = function onlyOneOrNegOne(x) {
        return x === 1 || x === -1 ? x : 1;
    },


    /**
     * @param multiplier {Number}
     * @param valueFn {Function}
     * @returns {function(...[*]): Array.<*>}
     */
    getSortByOrder = function getSortByOrder(multiplier, valueFn) {
        valueFn = valueFn || function (v) {
            return v;
        };
        var x = onlyOneOrNegOne(multiplier),
            ifGreaterThan = 1 * x,
            ifLessThan = -1 * x;
        return function () {
            for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
                values[_key] = arguments[_key];
            }

            return values.sort(function (a1, b1) {
                var a = valueFn(a1),
                    b = valueFn(b1);
                if (a > b) {
                    return ifGreaterThan;
                } else if (b > a) {
                    return ifLessThan;
                }
                return 0;
            });
        };
    },
        sortDescByLength = getSortByOrder(DESC, _objectPrelude.length),


    /**
     * Returns length of all passed lists in list.
     * @param lists ...{Array|String|*}
     * @returns {Array|String|*}
     */
    lengths = function lengths() {
        for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            lists[_key2] = arguments[_key2];
        }

        return (0, _objectPrelude.length)(lists) ? map(_objectPrelude.length, lists) : [];
    },
        lengthsToSmallest = function lengthsToSmallest() {
        for (var _len3 = arguments.length, lists = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            lists[_key3] = arguments[_key3];
        }

        var listLengths = (0, _apply.apply)(lengths, lists),
            smallLen = minimum(listLengths);
        return map(function (list, ind) {
            return listLengths[ind] > smallLen ? slice(0, smallLen, list) : sliceFromZero(list);
        }, lists);
    },
        aggregateStr = function aggregateStr(agg, item) {
        return agg + item;
    },
        aggregateArr = function aggregateArr(agg, item) {
        agg.push(item);
        return agg;
    },
        aggregateObj = function aggregateObj(agg, item, ind) {
        agg[ind] = item;
        return agg;
    },
        aggregatorByType = function aggregatorByType(x) {
        switch ((0, _typeOf.typeOf)(x)) {
            case 'String':
                return aggregateStr;
            case 'Array':
                return aggregateArr;
            case 'Object':
            default:
                return aggregateObj;
        }
    },
        reduceUntil = function reduceUntil(pred, op, agg, arr) {
        var limit = (0, _objectPrelude.length)(arr);
        if (!limit) {
            return agg;
        }
        var ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(arr[ind], ind, arr)) {
                break;
            }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },
        reduceRightUntil = function reduceRightUntil(pred, op, agg, arr) {
        var limit = (0, _objectPrelude.length)(arr);
        if (!limit) {
            return agg;
        }
        var ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) {
                break;
            }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },
        reduce = function reduce(operation, agg, arr) {
        return reduceUntil(alwaysFalse, // predicate
        operation, // operation
        agg, // aggregator
        arr);
    },
        // list

    reduceRight = function reduceRight(operation, agg, arr) {
        return reduceRightUntil(alwaysFalse, // predicate
        operation, // operation
        agg, // aggregator
        arr);
    },
        // list

    /**
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @param functor {Array|Object|*}
     * @param ...functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in objectOps doesn't have an `every` method.
     */
    arrayAppend = (0, _utils.fPureTakesOneOrMore)('concat'),


    /**
     * Appends any subsequent lists (strings) onto the first one (string).
     * @note Same as a Monoidal `mappend`;  In this case for strings.
     * @param arg0 {String}
     * @param args {...String}
     * @returns {String}
     */
    strAppend = function strAppend(arg0) {
        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
        }

        return reduce(aggregateStr, arg0, args);
    },


    /**
     * Searches list/list-like for given element `x`.
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf = (0, _utils.fPureTakesOne)('indexOf'),


    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listOps.lastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = function lastIndex(x) {
        var len = (0, _objectPrelude.length)(x);return len ? len - 1 : 0;
    },


    /**
     * Finds index in string or list.
     * @function module:listOps.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = function findIndexWhere(pred, arr) {
        var ind = -1,
            predicateFulfilled = false;
        var limit = (0, _objectPrelude.length)(arr);
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
    findIndexWhereRight = function findIndexWhereRight(pred, arr) {
        var limit = (0, _objectPrelude.length)(arr);
        var ind = limit,
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
    findIndicesWhere = function findIndicesWhere(pred, xs) {
        var limit = (0, _objectPrelude.length)(xs);
        if (!limit) {
            return undefined;
        }
        var ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out.push(ind);
            }
        }
        return out;
    },


    /**
     * @function module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    findWhere = function findWhere(pred, xs) {
        var ind = 0,
            limit = (0, _objectPrelude.length)(xs);
        if (!limit) {
            return;
        }
        for (; ind < limit; ind++) {
            var elm = xs[ind];
            if (pred(elm, ind, xs)) {
                return elm;
            }
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
    append = function append(xs1, xs2) {
        return ((0, _is2.isArray)(xs1) ? arrayAppend : strAppend)(xs1, xs2);
    },


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
    appendMany = function appendMany(x) {
        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            args[_key5 - 1] = arguments[_key5];
        }

        return ((0, _is2.isArray)(x) ? arrayAppend : strAppend).apply(undefined, [x].concat(args));
    };

    var

    /**
     * Returns a new instance of passed in list.
     * @function module:listOps.mempty
     * @note is named after haskell's `Monoid mempty`
     * @param x {Array|String|*}
     * @returns {Array|String|*}
     */
    mempty = exports.mempty = function mempty(x) {
        if (!(0, _is2.isset)(x)) {
            return [];
        } else if (x.mempty) {
            return x.mempty();
        }
        return (0, _of.of)(x);
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
    mappend = exports.mappend = (0, _curry.curry)(append),


    /**
     * Same as `module:listOps.mappend` but for `n` lists (two or more lists).
     * @haskellType `mappend :: List a => a -> a -> a`
     * @function module:listOps.mappendMany
     * @param xs ...{Array|String|*} - lists or lists likes.
     * @returns {Array|String|*} - Same type as list likes passed in.
     */
    mappendMany = exports.mappendMany = (0, _curry.curry)(appendMany),


    /**
     * Returns head of list (first item of list).
     * @haskellType `head :: [a] -> a`
     * @function module:listOps.head
     * @param x {Array|String}
     * @returns {*} - First item from list
     */
    head = exports.head = function head(x) {
        return x[0];
    },


    /**
     * Returns last item of list.
     * @haskellType `last :: [a] -> a`
     * @function module:listOps.last
     * @param xs {Array|String}
     * @returns {*}
     */
    last = exports.last = function last(xs) {
        return xs[lastIndex(xs)];
    },


    /**
     * Returns tail part of list (everything after the first item as new list).
     * @haskelType `tail :: [a] -> [a]`
     * @function module:listOps.tail
     * @param xs {Array}
     * @returns {Array}
     */
    tail = exports.tail = function tail(xs) {
        return sliceToEndFrom(1, xs);
    },


    /**
     * Returns everything except last item of list as new list.
     * @haskellType `init :: [a] -> [a]`
     * @function module:listOps.init
     * @param xs {Array|String}
     * @returns {Array|String}
     */
    init = exports.init = function init(xs) {
        return slice(0, lastIndex(xs), xs);
    },


    /**
     * Returns `head` and `tail` of passed in list/string in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @function module:listOps.uncons
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    uncons = exports.uncons = function uncons(xs) {
        if (!xs) {
            return;
        } //
        var len = (0, _objectPrelude.length)(xs);
        if (len === 0) {
            return undefined;
        }
        return [head(xs), tail(xs)];
    },


    /**
     * Returns `tail` and `head` of passed in list/string in a tuple.
     * @haskellType `unconsr :: [a] -> Maybe ([a], a)`
     * @function module:listOps.unconsr
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    unconsr = exports.unconsr = function unconsr(xs) {
        if (!xs) {
            return;
        } //
        var len = (0, _objectPrelude.length)(xs);
        if (len === 0) {
            return undefined;
        }
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
    isEmpty = exports.isEmpty = function isEmpty(x) {
        return !(0, _objectPrelude.length)(x);
    },


    /**
     * @function module:listOps.map
     * @param fn {Function} - Function to map on functor item(s).
     * @param xs {Array|String|*} - Functor.
     * @returns {Array|String|*} - Functor type that is passed in.
     */
    map = exports.map = (0, _curry.curry)(function (fn, xs) {
        var ind = 0,
            limit = (0, _objectPrelude.length)(xs),
            out = mempty(xs),
            aggregate = aggregatorByType(xs);
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
    concat = exports.concat = function concat(xs) {
        return mappendMany.apply(undefined, _toConsumableArray(xs));
    },


    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:listOps.concatMap
     * @param fn {Function}
     * @param foldableOfA {Array|String|*}
     * @returns {Array|String|*}
     */
    concatMap = exports.concatMap = (0, _curry.curry)(function (fn, foldableOfA) {
        return concat(map(fn, foldableOfA));
    }),


    /**
     * Returns a copy of the passed in list reverses.
     * @haskellType `reverse :: [a] -> [a]`
     * @function module:listOps.reverse
     * @param x {Array|String|*}
     * @returns {Array|String|*}
     */
    reverse = exports.reverse = function reverse(x) {
        var aggregator = aggregatorByType(x);
        return reduceRight(function (agg, item, ind) {
            return aggregator(agg, item, ind);
        }, mempty(x), x);
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
    intersperse = exports.intersperse = (0, _curry.curry)(function (between, arr) {
        var limit = (0, _objectPrelude.length)(arr),
            lastInd = limit - 1,
            aggregator = mempty(arr),
            aggregatorOp = aggregatorByType(arr);
        if (!limit) {
            return aggregator;
        }
        return reduce(function (agg, item, ind) {
            return ind === lastInd ? aggregatorOp(agg, item) : aggregatorOp(aggregatorOp(agg, item), between);
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
    intercalate = exports.intercalate = (0, _curry.curry)(function (xs, xss) {
        var result = intersperse(xs, xss);
        return (0, _is2.isString)(result) ? result : concat(result);
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
    transpose = exports.transpose = function transpose(xss) {
        var numLists = (0, _objectPrelude.length)(xss);
        if (!numLists) {
            return mempty(xss);
        }
        var listLengths = (0, _apply.apply)(lengths, xss),
            longestListLen = maximum(listLengths),
            outLists = [];
        var ind = 0,
            ind2 = void 0;
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
            return (0, _objectPrelude.length)(x);
        }, outLists);
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
    subsequences = exports.subsequences = function subsequences(xs) {
        var len = Math.pow(2, (0, _objectPrelude.length)(xs)),
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
        permutations = exports.permutations = function permutations(xs) {
        return [xs];
    },
        foldl = exports.foldl = (0, _curry.curry)(reduce),
        foldr = exports.foldr = (0, _curry.curry)(reduceRight),
        foldl1 = exports.foldl1 = (0, _curry.curry)(function (op, xs) {
        var parts = uncons(xs);
        if (!parts) {
            return (0, _of.of)(xs);
        }
        return reduce(op, parts[0], parts[1]);
    }),
        foldr1 = exports.foldr1 = (0, _curry.curry)(function (op, xs) {
        var parts = unconsr(xs);
        if (!parts) {
            return (0, _of.of)(xs);
        }
        return reduceRight(op, parts[1], parts[0]);
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
    mapAccumL = exports.mapAccumL = (0, _curry.curry)(function (op, zero, xs) {
        var list = sliceToEndFrom(0, xs),
            limit = (0, _objectPrelude.length)(xs);
        if (!limit) {
            return [zero, list];
        }
        var ind = 0,
            agg = zero,
            mapped = mempty(xs),
            tuple = void 0;
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
    mapAccumR = exports.mapAccumR = (0, _curry.curry)(function (op, zero, xs) {
        var list = sliceToEndFrom(0, xs),
            limit = (0, _objectPrelude.length)(xs);
        if (!limit) {
            return [zero, list];
        }
        var ind = limit - 1,
            agg = zero,
            mapped = mempty(xs),
            tuple = void 0;
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
     * @param op {Function} - Operation to perform (should return
     * @param x {*} - Starting parameter to unfold from.
     * @returns {Array} - An array of whatever you return from `op` yielded.
     */
    unfoldr = exports.unfoldr = (0, _curry.curry2)(function (op, x) {
        var ind = 0,
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
    findIndex = exports.findIndex = (0, _curry.curry)(findIndexWhere),


    /**
     * @function module:listOps.findIndices
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndices = exports.findIndices = (0, _curry.curry)(findIndicesWhere),


    /**
     * @function module:listOps.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndex = exports.elemIndex = (0, _curry.curry)(function (x, xs) {
        var foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    }),


    /**
     * @function module:listOps.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndices = exports.elemIndices = (0, _curry.curry)(function (value, xs) {
        return findIndices(function (x) {
            return x === value;
        }, xs);
    }),


    /**
     * Takes `n` items from start of list to `limit` (exclusive).
     * @function module:listOps.take
     * @param list {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = exports.take = (0, _curry.curry)(function (limit, array) {
        return slice(0, limit, array);
    }),


    /**
     * Drops `n` items from start of list to `count` (exclusive).
     * @function module:listOps.take
     * @param list {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = exports.drop = (0, _curry.curry)(function (count, array) {
        return sliceToEndFrom(count, array);
    }),


    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:listOps.splitAt
     * @param ind {Number} - Index to split at.
     * @param functor {Array|String} - functor (list or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = exports.splitAt = (0, _curry.curry)(function (ind, arr) {
        return [slice(0, ind, arr), sliceToEndFrom(ind, arr)];
    }),


    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:listOps.takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param arr {Array|String}
     * @returns {Array}
     */
    takeWhile = exports.takeWhile = (0, _curry.curry)(function (pred, arr) {
        var zero = mempty(arr);
        var operation = aggregatorByType(arr);
        return reduceUntil((0, _functionOps.negateP)(pred), // predicate
        operation, // operation
        zero, // aggregator
        arr);
    }),


    /**
     * Returns an list without elements that match predicate.
     * @function module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param arr {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = exports.dropWhile = (0, _curry.curry)(function (pred, arr) {
        var limit = (0, _objectPrelude.length)(arr),
            splitPoint = findIndexWhere(function (item, ind, arr2) {
            return !pred(arr[ind], ind, arr2);
        }, arr);

        return splitPoint === -1 ? slice(0, limit, arr) : slice(splitPoint, limit, arr);
    }),


    /**
     * @function module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param arr {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd = exports.dropWhileEnd = (0, _curry.curry)(function (pred, arr) {
        var limit = (0, _objectPrelude.length)(arr),
            splitPoint = findIndexWhereRight(function (item, ind, arr2) {
            return !pred(arr[ind], ind, arr2);
        }, arr);

        return splitPoint === -1 ? slice(0, limit, arr) : slice(0, splitPoint + 1, arr);
    }),


    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @function module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    span = exports.span = (0, _curry.curry)(function (pred, arr) {
        var splitPoint = findIndexWhere((0, _functionOps.negateP)(pred), arr);
        return splitPoint === -1 ? splitAt(0, arr) : splitAt(splitPoint, arr);
    }),
        breakOnList = exports.breakOnList = (0, _curry.curry)(function (pred, arr) {
        var splitPoint = findIndexWhere(pred, arr);
        return splitPoint === -1 ? splitAt(0, arr) : splitAt(splitPoint, arr);
    }),


    /**
     * @function module:listOps.at
     * @param ind {Number} - Index.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    at = exports.at = _prop.prop,


    /**
     * @function module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    find = exports.find = (0, _curry.curry)(findWhere),
        filter = exports.filter = (0, _curry.curry)(function (pred, xs) {
        var ind = 0,
            limit = (0, _objectPrelude.length)(xs),
            aggregator = aggregatorByType(xs),
            out = mempty(xs);
        if (!limit) {
            return out;
        }
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
    partition = exports.partition = (0, _curry.curry)(function (pred, arr) {
        var limit = (0, _objectPrelude.length)(arr),
            receivedString = (0, _is2.isString)(arr),
            zero = receivedString ? '' : [];
        if (!limit) {
            return [zero, zero];
        }
        return [filter(pred, arr), filter((0, _functionOps.negateP)(pred), arr)];
    }),
        elem = exports.elem = (0, _curry.curry)(function (elm, xs) {
        return indexOf(elm, xs) !== -1;
    }),
        notElem = exports.notElem = (0, _curry.curry)(function (elm, xs) {
        return indexOf(elm, xs) === -1;
    }),
        lookup = exports.lookup = (0, _curry.curry)(function (key, xs) {
        return (0, _objectPrelude.hasOwnProperty)(key, xs) ? xs[key] : undefined;
    }),
        isPrefixOf = exports.isPrefixOf = (0, _curry.curry)(function (xs1, xs2) {
        var limit1 = (0, _objectPrelude.length)(xs1),
            limit2 = (0, _objectPrelude.length)(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        var ind = 0;
        for (; ind < limit1; ind++) {
            if (xs1[ind] !== xs2[ind]) {
                return false;
            }
        }
        return true;
    }),
        isSuffixOf = exports.isSuffixOf = (0, _curry.curry)(function (xs1, xs2) {
        var limit1 = (0, _objectPrelude.length)(xs1),
            limit2 = (0, _objectPrelude.length)(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
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
    }),
        isInfixOf = exports.isInfixOf = (0, _curry.curry)(function (xs1, xs2) {
        var limit1 = (0, _objectPrelude.length)(xs1),
            limit2 = (0, _objectPrelude.length)(xs2);
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
    }),
        isSubsequenceOf = exports.isSubsequenceOf = (0, _curry.curry)(function (xs1, xs2) {
        var len = Math.pow(2, (0, _objectPrelude.length)(xs2)),
            lenXs1 = (0, _objectPrelude.length)(xs1);
        var foundLen = void 0,
            i = void 0;
        for (i = 0; i < len; i += 1) {
            foundLen = 0;
            for (var j = 0; j < len; j += 1) {
                if (i & 1 << j && indexOf(xs2[j], xs1) > -1) {
                    foundLen += 1;
                }
                if (foundLen === lenXs1) {
                    return true;
                }
            }
        }
        return false;
    }),
        group = exports.group = function group(xs) {
        var limit = (0, _objectPrelude.length)(xs);
        if (!limit) {
            return sliceToEndFrom(0, xs);
        }
        var ind = 0,
            prevItem = void 0,
            item = void 0,
            agg = [];
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(takeWhile(function (x) {
                if (x === prevItem) {
                    ind++;
                }
                if (x === item) {
                    prevItem = x;return true;
                }
                return false;
            }, slice(ind, limit, xs)));
        }
        return agg;
    },
        inits = exports.inits = function inits(xs) {
        var limit = (0, _objectPrelude.length)(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(0, ind, xs));
        }
        return agg;
    },
        //map(list => init(list), xs),

    tails = exports.tails = function tails(xs) {
        var limit = (0, _objectPrelude.length)(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(ind, limit, xs));
        }
        return agg;
    },
        //map(list => tail(list), xs),

    stripPrefix = exports.stripPrefix = (0, _curry.curry)(function (prefix, list) {
        return isPrefixOf(prefix, list) ? splitAt(prefix.length, list)[1] : sliceToEndFrom(0, list);
    }),


    /**
     * Flattens an list.
     * @function module:listOps.flatten
     * @param arr {Array}
     * @returns {Array}
     */
    flatten = exports.flatten = function flatten(arr) {
        return reduce(function (agg, elm) {
            if ((0, _is2.isArray)(elm)) {
                return mappend(agg, flatten(elm));
            }
            agg.push(elm);
            return agg;
        }, [], arr);
    },


    /**
     * Flattens all arrays passed in into one list.
     * @function module:listOps.flattenMulti
     * @param arr {Array}
     * @param [...arrays{Array}] - Other arrays to flatten into new list.
     * @returns {Array}
     */
    flattenMulti = exports.flattenMulti = (0, _curry.curry2)(function (arr0) {
        for (var _len6 = arguments.length, arrays = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            arrays[_key6 - 1] = arguments[_key6];
        }

        return reduce(function (agg, arr) {
            return mappend(agg, flatten(arr));
        }, flatten(arr0), arrays);
    }),


    /**
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
     * @function module:listOps.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = exports.zip = (0, _curry.curry)(function (arr1, arr2) {
        if (!(0, _objectPrelude.length)(arr1) || !(0, _objectPrelude.length)(arr2)) {
            return mempty(arr1);
        }

        var _lengthsToSmallest = lengthsToSmallest(arr1, arr2),
            _lengthsToSmallest2 = _slicedToArray(_lengthsToSmallest, 2),
            a1 = _lengthsToSmallest2[0],
            a2 = _lengthsToSmallest2[1];

        return reduce(function (agg, item, ind) {
            return aggregateArr(agg, [item, a2[ind]]);
        }, [], a1);
    }),
        zipN = exports.zipN = function zipN() {
        for (var _len7 = arguments.length, lists = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            lists[_key7] = arguments[_key7];
        }

        var trimmedLists = (0, _apply.apply)(lengthsToSmallest, filter(_objectPrelude.length, lists)),
            lenOfTrimmed = (0, _objectPrelude.length)(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        } else if (lenOfTrimmed === 1) {
            return slice(0, (0, _objectPrelude.length)(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce(function (agg, item, ind, list) {
            return aggregateArr(agg, map(function (xs) {
                return xs[ind];
            }, trimmedLists));
        }, [], trimmedLists[0]);
    },
        zip3 = exports.zip3 = (0, _curry.curry3)(zipN),
        zip4 = exports.zip4 = (0, _curry.curry4)(zipN),
        zip5 = exports.zip5 = (0, _curry.curry5)(zipN),


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
     * @type {Function}
     */
    zipWith = exports.zipWith = (0, _curry.curry)(function (op, xs1, xs2) {
        if (!(0, _objectPrelude.length)(xs1) || !(0, _objectPrelude.length)(xs2)) {
            return mempty(xs1);
        }

        var _lengthsToSmallest3 = lengthsToSmallest(xs1, xs2),
            _lengthsToSmallest4 = _slicedToArray(_lengthsToSmallest3, 2),
            a1 = _lengthsToSmallest4[0],
            a2 = _lengthsToSmallest4[1];

        return reduce(function (agg, item, ind) {
            return aggregateArr(agg, op(item, a2[ind]));
        }, [], a1);
    }),
        zipWithN = exports.zipWithN = function zipWithN(op) {
        for (var _len8 = arguments.length, lists = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
            lists[_key8 - 1] = arguments[_key8];
        }

        var trimmedLists = (0, _apply.apply)(lengthsToSmallest, lists),
            lenOfTrimmed = (0, _objectPrelude.length)(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        } else if (lenOfTrimmed === 1) {
            return slice(0, (0, _objectPrelude.length)(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce(function (agg, item, ind, list) {
            return aggregateArr(agg, (0, _apply.apply)(op, map(function (xs) {
                return xs[ind];
            }, trimmedLists)));
        }, [], trimmedLists[0]);
    },
        zipWith3 = exports.zipWith3 = (0, _curry.curry4)(zipWithN),
        zipWith4 = exports.zipWith4 = (0, _curry.curry5)(zipWithN),
        zipWith5 = exports.zipWith5 = (0, _curry.curryN)(5, zipWithN),


    /**
     * unzip :: [(a, b)] -> ([a], [b])
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @param arr
     */
    unzip = exports.unzip = function unzip(arr) {
        return reduce(function (agg, item) {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr);
    },
        unzipN = exports.unzipN = function unzipN() {
        for (var _len9 = arguments.length, lists = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            lists[_key9] = arguments[_key9];
        }

        return reduce(function (agg, item) {
            agg.push(unzip(item));
            return agg;
        }, [], lists);
    },
        any = exports.any = (0, _curry.curry)(function (p, xs) {
        var ind = 0,
            limit = (0, _objectPrelude.length)(xs);
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
        all = exports.all = (0, _curry.curry)(function (p, xs) {
        var limit = (0, _objectPrelude.length)(xs);
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
    }),
        and = exports.and = all(_is.isTruthy),
        or = exports.or = any(_is.isTruthy),
        not = exports.not = all(_is.isFalsy),
        sum = exports.sum = function sum(list) {
        return reduce(function (agg, x) {
            return agg + x;
        }, 0, list);
    },
        product = exports.product = function product(arr) {
        return reduce(function (agg, x) {
            return agg * x;
        }, 1, arr);
    },
        maximum = exports.maximum = function maximum(arr) {
        return (0, _apply.apply)(Math.max, arr);
    },
        minimum = exports.minimum = function minimum(arr) {
        return (0, _apply.apply)(Math.min, arr);
    },


    /**
     * Creates a arrayUnion on matching elements from array1.
     * @function module:listOps.arrayUnion
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    arrayUnion = exports.arrayUnion = (0, _curry.curry)(function (arr1, arr2) {
        return mappend(arr1, filter(function (elm) {
            return indexOf(elm, arr1) === -1;
        }, arr2));
    }),


    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:listOps.arrayIntersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    arrayIntersect = exports.arrayIntersect = (0, _curry.curry)(function (arr1, arr2) {
        return (0, _objectPrelude.length)(arr2) === 0 ? [] : filter(function (elm) {
            return indexOf(elm, arr2) > -1;
        }, arr1);
    }),


    /**
     * Returns the difference of list 1 from list 2.
     * @function module:listOps.arrayDifference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    arrayDifference = exports.arrayDifference = (0, _curry.curry)(function (array1, array2) {
        // augment this with max length and min length ordering on op
        var _sortDescByLength = sortDescByLength(array1, array2),
            _sortDescByLength2 = _slicedToArray(_sortDescByLength, 2),
            arr1 = _sortDescByLength2[0],
            arr2 = _sortDescByLength2[1];

        if (!arr2 || (0, _objectPrelude.length)(arr2) === 0) {
            return slice(0, (0, _objectPrelude.length)(arr1), arr1);
        }
        return reduce(function (agg, elm) {
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
    arrayComplement = exports.arrayComplement = (0, _curry.curry2)(function (arr0) {
        for (var _len10 = arguments.length, arrays = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
            arrays[_key10 - 1] = arguments[_key10];
        }

        return reduce(function (agg, arr) {
            return mappend(agg, arrayDifference(arr0, arr));
        }, [], arrays);
    });
});