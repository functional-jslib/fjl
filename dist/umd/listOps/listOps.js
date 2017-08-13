(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../functionOps/curry', '../functionOps/apply', '../functionOps/functionOps', '../booleanOps/is', '../objectOps/is', '../objectOps/prop', '../objectOps/typeOf', '../objectOps/objectPrelude', './listOpsPrelude', '../utils/utils'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../functionOps/curry'), require('../functionOps/apply'), require('../functionOps/functionOps'), require('../booleanOps/is'), require('../objectOps/is'), require('../objectOps/prop'), require('../objectOps/typeOf'), require('../objectOps/objectPrelude'), require('./listOpsPrelude'), require('../utils/utils'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.apply, global.functionOps, global.is, global.is, global.prop, global.typeOf, global.objectPrelude, global.listOpsPrelude, global.utils);
        global.listOps = mod.exports;
    }
})(this, function (exports, _curry, _apply, _functionOps, _is, _is2, _prop, _typeOf, _objectPrelude, _listOpsPrelude, _utils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.arrayComplement = exports.arrayDifference = exports.arrayIntersect = exports.arrayUnion = exports.minimum = exports.maximum = exports.product = exports.sum = exports.equal = exports.not = exports.or = exports.and = exports.all = exports.any = exports.unzipN = exports.unzip = exports.zipWith = exports.zipN = exports.zip = exports.flattenMulti = exports.flatten = exports.stripPrefix = exports.tails = exports.inits = exports.group = exports.isInfixOf = exports.isSuffixOf = exports.isPrefixOf = exports.lookup = exports.notElem = exports.elem = exports.partition = exports.filter = exports.find = exports.at = exports.breakOnList = exports.span = exports.dropWhile = exports.takeWhile = exports.splitAt = exports.drop = exports.take = exports.elemIndices = exports.elemIndex = exports.findIndices = exports.findIndicesWhere = exports.findIndex = exports.unfoldr = exports.mapAccumR = exports.mapAccumL = exports.foldr1 = exports.foldl1 = exports.foldr = exports.foldl = exports.permutations = exports.subsequences = exports.transpose = exports.intercalate = exports.intersperse = exports.reverse = exports.concatMap = exports.concat = exports.map = exports.uncons = exports.init = exports.tail = exports.last = exports.head = exports.appendMany = exports.append = undefined;

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

    var ASC = 1,
        DESC = -1,
        sliceToEndFrom = (0, _curry.curry)(function (startInd, arr) {
        return (0, _listOpsPrelude.slice)(startInd, (0, _objectPrelude.length)(arr), arr);
    }),
        sliceFromZero = sliceToEndFrom(0),
        onlyOneOrNegOne = function onlyOneOrNegOne(x) {
        return x === 1 || x === -1 ? x : 1;
    },
        getSortByOrder = (0, _curry.curry)(function (multiplier, valueFn) {
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
    }),
        sortDesc = getSortByOrder(DESC),
        sortAsc = getSortByOrder(ASC),
        sortDescByLength = getSortByOrder(DESC, function (x) {
        return (0, _objectPrelude.length)(x);
    }),
        lengths = (0, _curry.curry2)(function () {
        for (var _len2 = arguments.length, arrs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            arrs[_key2] = arguments[_key2];
        }

        return (0, _objectPrelude.length)(arrs) ? arrs.map(_objectPrelude.length) : [];
    }),
        getOrderedLengths = (0, _curry.curry2)(function (orderDir) {
        for (var _len3 = arguments.length, arrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            arrs[_key3 - 1] = arguments[_key3];
        }

        return (orderDir ? sortAsc : sortDesc)(lengths(arrs));
    }),
        trimLengths = function trimLengths() {
        for (var _len4 = arguments.length, arrays = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            arrays[_key4] = arguments[_key4];
        }

        var smallLen = getOrderedLengths(ASC, arrays)[0];
        return arrays.map(function (arr) {
            return (0, _objectPrelude.length)(arr) > smallLen ? (0, _listOpsPrelude.slice)(0, smallLen, arr) : sliceFromZero(arr);
        });
    },
        aggregateStr = function aggregateStr(agg, item) {
        agg += item;
        return agg;
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
        if (limit === 0) {
            return agg;
        }
        var ind = 0,
            result = agg,
            keys = (0, _objectPrelude.keys)(arr),
            key = void 0;
        for (; ind < limit; ind++) {
            key = keys[ind];
            if (pred(arr[key], key, arr)) {
                break;
            }
            result = op(result, arr[key], key, arr);
        }
        return result;
    },
        reduceRightUntil = function reduceRightUntil(pred, op, agg, arr) {
        var limit = (0, _objectPrelude.length)(arr);
        if (limit === 0) {
            return agg;
        }
        var ind = limit - 1,
            result = agg,
            keys = (0, _objectPrelude.keys)(arr),
            key = void 0;
        for (; ind >= 0; ind--) {
            key = keys[ind];
            if (pred(arr[key], key, arr)) {
                break;
            }
            result = op(result, arr[key], key, arr);
        }
        return result;
    },
        reduce = (0, _curry.curry)(function (operation, agg, arr) {
        return reduceUntil(function () {
            return false;
        }, // predicate
        operation, // operation
        agg, // aggregator
        arr);
    }),
        // listOps

    reduceRight = (0, _curry.curry)(function (operation, agg, arr) {
        return reduceRightUntil(function () {
            return false;
        }, // predicate
        operation, // operation
        agg, // aggregator
        arr);
    }),
        // listOps

    strConcat = function strConcat(x) {
        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            args[_key5 - 1] = arguments[_key5];
        }

        return reduce(aggregateStr, x, args);
    },


    /**
     * Searches list/list-like for given element `x`.
     * @functionOps module:listOps.indexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - listOps or listOps like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf = (0, _utils.fPureTakesOne)('indexOf'),


    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @functionOps module:listOps.lastIndex
     * @param x {Array|String|*} - listOps like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = function lastIndex(x) {
        var len = (0, _objectPrelude.length)(x);return len ? len - 1 : 0;
    },


    /**
     * Finds index in stringOps or listOps.
     * @functionOps module:listOps.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = (0, _curry.curry)(function (pred, arr) {
        var ind = -1,
            predicateFulfilled = false;
        var limit = (0, _objectPrelude.length)(arr);
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
    findWhere = (0, _curry.curry)(function (pred, xs) {
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
    });

    var

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
    append = exports.append = (0, _curry.curry)(function (xs1, xs2) {
        return ((0, _is2.isArray)(xs1) ? _listOpsPrelude.concat : strConcat)(xs1, xs2);
    }),


    /**
     * Append two or more lists, i.e., same as `append` but for two ore more lists.
     * @functionOps module:listOps.appendMany
     * @param xs1 {Array|String|*} - listOps or list like.
     * @param [...args] {Array|String|*} - Lists or lists likes.
     * @returns {Array|String|*} - Same type as first list or list like passed in.
     */
    appendMany = exports.appendMany = (0, _curry.curry2)(function (x) {
        for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            args[_key6 - 1] = arguments[_key6];
        }

        return ((0, _is2.isArray)(x) ? _listOpsPrelude.concat : strConcat).apply(undefined, [x].concat(args));
    }),


    /**
     * Returns head of listOps (first item of listOps).
     * @haskellType `head :: [a] -> a`
     * @functionOps module:listOps.head
     * @param x {Array|String}
     * @returns {*} - First item from listOps
     */
    head = exports.head = function head(x) {
        return x[0];
    },


    /**
     * Returns last item of listOps.
     * @haskellType `last :: [a] -> a`
     * @functionOps module:listOps.last
     * @param functor {Array|String}
     * @returns {*}
     */
    last = exports.last = function last(functor) {
        return functor[lastIndex(functor)];
    },


    /**
     * Returns tail part of listOps (everything after the first item as new listOps).
     * @haskelType `tail :: [a] -> [a]`
     * @functionOps module:listOps.tail
     * @param functor {Array}
     * @returns {Array}
     */
    tail = exports.tail = function tail(functor) {
        return sliceToEndFrom(1, functor);
    },


    /**
     * Returns everything except last item of listOps as new listOps.
     * @haskellType `init :: [a] -> [a]`
     * @functionOps module:listOps.init
     * @param functor {Array|String}
     * @returns {Array|String}
     */
    init = exports.init = function init(functor) {
        return (0, _listOpsPrelude.slice)(0, lastIndex(functor), functor);
    },


    /**
     * Returns `head` and `tail` of passed in listOps/stringOps in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @functionOps module:listOps.uncons
     * @param x {Array|String}
     * @returns {Array|String|*|undefined}
     */
    uncons = exports.uncons = function uncons(x) {
        var len = (0, _objectPrelude.length)(x);
        if (len === 0) {
            return undefined;
        }
        return [head(x), tail(x)];
    },
        map = exports.map = (0, _curry.curry)(function (fn, xs) {
        var ind = -1,
            limit = (0, _objectPrelude.length)(xs),
            out = xs.constructor(),
            aggregate = aggregatorByType(xs);
        while (++ind < limit) {
            out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
        }
        return out;
    }),
        concat = exports.concat = function concat(foldableOfA) {
        return appendMany.apply(undefined, _toConsumableArray(foldableOfA));
    },
        concatMap = exports.concatMap = (0, _curry.curry)(function (fn, foldableOfA) {
        return concat(map(fn, foldableOfA));
    }),
        reverse = exports.reverse = function reverse(x) {
        return reduceRight(function (agg, item) {
            agg.push(item);
            return agg;
        }, x.constructor(), x);
    },
        intersperse = exports.intersperse = (0, _curry.curry)(function (between, arr) {
        var limit = (0, _objectPrelude.length)(arr) - 1,
            aggregator = arr.constructor(),
            aggregatorOp = aggregatorByType(arr);
        return reduce(function (agg, item, ind) {
            if (ind === limit) {
                return aggregatorOp(agg, item);
            }
            return aggregatorOp(aggregatorOp(agg, item), between);
        }, aggregator, arr);
    }),
        intercalate = exports.intercalate = (0, _curry.curry)(function (xs, xss) {
        return concat(intersperse(xs, xss));
    }),
        transpose = exports.transpose = function transpose(xss) {
        var orderedLengths = getOrderedLengths.apply(undefined, [DESC].concat(_toConsumableArray(xss))),
            out = new Array(orderedLengths[0]);
        return reduce(function (agg, item) {
            return reduce(function (agg2, element, ind2) {
                agg2[ind2].push(element);
                return agg2;
            }, agg, item);
        }, out.map(function () {
            return [];
        }), xss);
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
        foldl = exports.foldl = reduce,
        foldr = exports.foldr = reduceRight,
        foldl1 = exports.foldl1 = (0, _curry.curry)(function (op, xs) {
        var arr = sliceToEndFrom(0, xs);
        return reduce(op, arr.shift(), arr);
    }),
        foldr1 = exports.foldr1 = (0, _curry.curry)(function (op, xs) {
        var arr = sliceToEndFrom(0, xs);
        return reduceRight(op, arr.pop(), arr);
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
    mapAccumL = exports.mapAccumL = (0, _curry.curry)(function (op, zero, xs) {
        var list = sliceToEndFrom(0, xs),
            limit = (0, _objectPrelude.length)(xs);
        if (!limit) {
            return [zero, list];
        }
        var ind = 0,
            agg = zero,
            mapped = xs.constructor(),
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
     * @functionOps module:listOps.mapAccumR
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - listOps type.
     * @return {Array} - [aggregated, listOps]
     */
    mapAccumR = exports.mapAccumR = (0, _curry.curry)(function (op, zero, xs) {
        var list = sliceToEndFrom(0, xs),
            limit = (0, _objectPrelude.length)(xs);
        if (!limit) {
            return [zero, list];
        }
        var ind = limit - 1,
            agg = zero,
            mapped = xs.constructor(),
            tuple = void 0;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    }),
        unfoldr = exports.unfoldr = (0, _curry.curry)(function (op, x, zero) {
        var ind = 0,
            out = !(0, _is2.isset)(zero) ? [] : zero,
            aggregator = aggregatorByType(out),
            resultTuple = op(x, ind, out);
        while ((0, _is2.isset)(resultTuple[1])) {
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
    findIndex = exports.findIndex = findIndexWhere,


    /**
     * @functionOps module:listOps.findIndicesWhere
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = exports.findIndicesWhere = (0, _curry.curry)(function (pred, xs) {
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
    }),


    /**
     * @functionOps module:listOps.findIndices
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {Array|undefined}
     */
    findIndices = exports.findIndices = findIndicesWhere,


    /**
     * @functionOps module:listOps.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    elemIndex = exports.elemIndex = (0, _curry.curry)(function (x, xs) {
        var foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    }),


    /**
     * @functionOps module:listOps.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    elemIndices = exports.elemIndices = (0, _curry.curry)(function (value, xs) {
        return findIndices(function (x) {
            return x === value;
        }, xs);
    }),


    /**
     * Takes `n` items from start of listOps to `limit` (exclusive).
     * @functionOps module:listOps.take
     * @param listOps {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = exports.take = (0, _curry.curry)(function (limit, array) {
        return (0, _listOpsPrelude.slice)(0, limit, array);
    }),


    /**
     * Drops `n` items from start of listOps to `count` (exclusive).
     * @functionOps module:listOps.take
     * @param listOps {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = exports.drop = (0, _curry.curry)(function (count, array) {
        return sliceToEndFrom(count, array);
    }),


    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned listOps)).
     * @functionOps module:listOps.splitAt
     * @param ind {Number} - Index to split at.
     * @param functor {Array|String} - functor (listOps or stringOps) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = exports.splitAt = (0, _curry.curry)(function (ind, arr) {
        return [(0, _listOpsPrelude.slice)(0, ind, arr), sliceToEndFrom(ind, arr)];
    }),


    /**
     * Gives an listOps with passed elements while predicate was true.
     * @functionOps module:listOps.takeWhile
     * @param pred {Function} - Predicate<*, index, listOps|stringOps>
     * @param arr {Array|String}
     * @returns {Array}
     */
    takeWhile = exports.takeWhile = (0, _curry.curry)(function (pred, arr) {
        var zero = arr.constructor();
        var operation = aggregatorByType(arr);
        return reduceUntil((0, _functionOps.negateP)(pred), // predicate
        operation, // operation
        zero, // aggregator
        arr);
    }),


    /**
     * Returns an listOps without elements that match predicate.
     * @functionOps module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, listOps|stringOps>
     * @param arr {Array|String}
     * @returns {Array|String}
     */
    dropWhile = exports.dropWhile = (0, _curry.curry)(function (pred, arr) {
        var limit = (0, _objectPrelude.length)(arr),
            splitPoint = findIndexWhere(function (item, ind, arr2) {
            return !pred(arr[ind], ind, arr2);
        }, arr);

        return splitPoint === -1 ? (0, _listOpsPrelude.slice)(0, limit, arr) : (0, _listOpsPrelude.slice)(splitPoint, limit, arr);
    }),


    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @functionOps module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type listOps or stringOps)).
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
     * @functionOps module:listOps.at
     * @param ind {Number} - Index.
     * @param xs {Array|String|*} - listOps or listOps like.
     * @returns {*}
     */
    at = exports.at = _prop.prop,


    /**
     * @functionOps module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    find = exports.find = findWhere,
        filter = exports.filter = (0, _curry.curry)(function (pred, xs) {
        var ind = 0,
            limit = (0, _objectPrelude.length)(xs),
            aggregator = aggregatorByType(xs),
            out = xs.constructor();
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
     * @functionOps module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type listOps or stringOps)).
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
        var ind = limit2 - 1;
        for (; ind >= 0; ind--) {
            if (xs1[ind] !== xs2[ind]) {
                return false;
            }
        }
        return true;
    }),
        isInfixOf = exports.isInfixOf = (0, _curry.curry)(function (xs1, xs2) {
        var limit1 = (0, _objectPrelude.length)(xs1),
            limit2 = (0, _objectPrelude.length)(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        var ind = limit2 - 1;
        for (; ind >= 0; ind--) {
            if (xs1[ind] !== xs2[ind]) {
                return false;
            }
        }
        return true;
    }),
        group = exports.group = function group(xs) {
        return [xs];
    },
        inits = exports.inits = function inits(xs) {
        return [xs];
    },
        tails = exports.tails = function tails(xs) {
        return [xs];
    },
        stripPrefix = exports.stripPrefix = (0, _curry.curry)(function (prefix, arr) {
        return isPrefixOf(prefix, arr) ? splitAt(prefix.length, arr)[1] : sliceToEndFrom(0, arr);
    }),


    /**
     * Flattens an listOps.
     * @functionOps module:listOps.flatten
     * @param arr {Array}
     * @returns {Array}
     */
    flatten = exports.flatten = function flatten(arr) {
        return reduce(function (agg, elm) {
            if ((0, _is2.isArray)(elm)) {
                return append(agg, flatten(elm));
            }
            agg.push(elm);
            return agg;
        }, [], arr);
    },


    /**
     * Flattens all arrays passed in into one listOps.
     * @functionOps module:listOps.flattenMulti
     * @param arr {Array}
     * @param [...arrays{Array}] - Other arrays to flatten into new listOps.
     * @returns {Array}
     */
    flattenMulti = exports.flattenMulti = (0, _curry.curry2)(function (arr0) {
        for (var _len7 = arguments.length, arrays = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
            arrays[_key7 - 1] = arguments[_key7];
        }

        return reduce(function (agg, arr) {
            return append(agg, flatten(arr));
        }, flatten(arr0), arrays);
    }),


    /**
     * zip :: [a] -> [b] -> [(a, b)]
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @functionOps module:listOps.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = exports.zip = (0, _curry.curry)(function (arr1, arr2) {
        var _trimLengths = trimLengths(arr1, arr2),
            a1 = _trimLengths[0],
            a2 = _trimLengths[1];

        return reduce(function (agg, item, ind) {
            agg.push([item, a2[ind]]);
            return agg;
        }, [], a1);
    }),
        zipN = exports.zipN = (0, _curry.curry2)(function () {
        for (var _len8 = arguments.length, arrs = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            arrs[_key8] = arguments[_key8];
        }

        var lists = (0, _apply.apply)(trimLengths, arrs);
        return reduce(function (agg, arr, ind) {
            if (!ind) {
                return zip(agg, arr);
            }
            return agg.map(function (arr2) {
                arr.forEach(function (elm) {
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
    zipWith = exports.zipWith = (0, _curry.curry)(function (combinator, xs1, xs2) {
        return [];
    }),


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
        for (var _len9 = arguments.length, arrs = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            arrs[_key9] = arguments[_key9];
        }

        return reduce(function (agg, item) {
            agg.push(unzip(item));
            return agg;
        }, [], arrs);
    },
        any = exports.any = (0, _curry.curry)(function (p, xs) {
        return reduceUntil(p, function () {
            return true;
        }, false, xs);
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
        equal = exports.equal = (0, _curry.curry2)(function (arg0) {
        for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
            args[_key10 - 1] = arguments[_key10];
        }

        return all(function (x) {
            return arg0 === x;
        }, args);
    }),
        sum = exports.sum = function sum(arr) {
        var parts = uncons(arr);
        return reduce(function (agg, x) {
            return agg + x;
        }, parts[0], parts[1]);
    },
        product = exports.product = function product(arr) {
        var parts = uncons(arr);
        return reduce(function (agg, x) {
            return agg * x;
        }, parts[0], parts[1]);
    },
        maximum = exports.maximum = function maximum(arr) {
        return (0, _apply.apply)(Math.max, arr);
    },
        minimum = exports.minimum = function minimum(arr) {
        return (0, _apply.apply)(Math.min, arr);
    },


    /**
     * Creates a arrayUnion on matching elements from array1.
     * @functionOps module:listOps.arrayUnion
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    arrayUnion = exports.arrayUnion = (0, _curry.curry)(function (arr1, arr2) {
        return append(arr1, filter(function (elm) {
            return indexOf(elm, arr1) === -1;
        }, arr2));
    }),


    /**
     * Performs an intersection on listOps 1 with  elements from listOps 2.
     * @functionOps module:listOps.arrayIntersect
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
     * Returns the difference of listOps 1 from listOps 2.
     * @functionOps module:listOps.arrayDifference
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
            return (0, _listOpsPrelude.slice)(0, (0, _objectPrelude.length)(arr1), arr1);
        }
        return reduce(function (agg, elm) {
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
    arrayComplement = exports.arrayComplement = (0, _curry.curry2)(function (arr0) {
        for (var _len11 = arguments.length, arrays = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
            arrays[_key11 - 1] = arguments[_key11];
        }

        return reduce(function (agg, arr) {
            return append(agg, arrayDifference(arr0, arr));
        }, [], arrays);
    });
});