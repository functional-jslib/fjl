(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './aggregation', '../jsPlatform/function', '../jsPlatform/list', '../jsPlatform/object', '../boolean', './map', '../function/curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./aggregation'), require('../jsPlatform/function'), require('../jsPlatform/list'), require('../jsPlatform/object'), require('../boolean'), require('./map'), require('../function/curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.aggregation, global._function, global.list, global.object, global.boolean, global.map, global.curry);
        global.utils = mod.exports;
    }
})(this, function (exports, _aggregation, _function, _list, _object, _boolean, _map, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.findWhere = exports.findIndicesWhere = exports.findIndexWhereRight = exports.findIndexWhere = exports.lastIndex = exports.reduceRight = exports.reduce = exports.reduceUntilRight = exports.reduceUntil = exports.toShortest = exports.lengths = exports.genericAscOrdering = exports.sliceCopy = exports.sliceTo = exports.sliceFrom = undefined;
    Object.keys(_aggregation).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _aggregation[key];
            }
        });
    });

    var _map2 = _interopRequireDefault(_map);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    // un-curried version
    var

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @function module:listUtils.sliceFrom
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFrom = exports.sliceFrom = (0, _curry.curry)(function (startInd, arr) {
        return (0, _list.slice)(startInd, undefined, arr);
    }),


    /**
     * Slices from index `0` to given index.
     * @function module:listUtils.sliceTo
     * @param toInd {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceTo = exports.sliceTo = (0, _curry.curry)(function (toInd, xs) {
        return (0, _list.slice)(0, toInd, xs);
    }),


    /**
     * Slices a copy of list.
     * @function _listOpUtils.sliceCopy
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceCopy = exports.sliceCopy = sliceFrom(0),


    /**
     * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
     * @function module:listUtils.genericAscOrdering
     * @param a {*}
     * @param b {*}
     * @returns {number}
     */
    genericAscOrdering = exports.genericAscOrdering = (0, _curry.curry)(function (a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    }),


    /**
     * Returns length of all passed lists in list.
     * @function module:listUtils.lengths
     * @param lists ...{Array|String|*}
     * @returns {Array|String|*}
     */
    lengths = exports.lengths = (0, _curry.curry2)(function () {
        for (var _len = arguments.length, lists = Array(_len), _key = 0; _key < _len; _key++) {
            lists[_key] = arguments[_key];
        }

        return (0, _map2.default)(_object.length, lists);
    }),


    /**
     * Returns a list of lists trimmed to the shortest length in given list of lists.   @background This method is used by the `zip*` functions to achieve their
     *  'slice to smallest' functionality.
     * @function module:listUtils.toShortest
     * @param lists {...(Array|String|*)}
     * @returns {Array|String|*}
     */
    toShortest = exports.toShortest = (0, _curry.curry2)(function () {
        for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            lists[_key2] = arguments[_key2];
        }

        var listLengths = (0, _function.apply)(lengths, lists),
            smallLen = Math.min.apply(Math, listLengths);
        return (0, _map2.default)(function (list, ind) {
            return listLengths[ind] > smallLen ? sliceTo(smallLen, list) : sliceCopy(list);
        }, lists);
    }),


    /**
     * Reduces until predicate.
     * @param pred
     * @param op
     * @param agg
     * @param arr
     * @returns {*}
     */
    reduceUntil = exports.reduceUntil = (0, _curry.curry)(function (pred, op, agg, arr) {
        var limit = (0, _object.length)(arr);
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
    }),


    /**
     * Reduces until predicate (from the right).
     * @param pred
     * @param op
     * @param agg
     * @param arr
     * @returns {*}
     */
    reduceUntilRight = exports.reduceUntilRight = (0, _curry.curry)(function (pred, op, agg, arr) {
        var limit = (0, _object.length)(arr);
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
    }),
        reduce = exports.reduce = reduceUntil(_boolean.alwaysFalse),
        reduceRight = exports.reduceRight = reduceUntilRight(_boolean.alwaysFalse),


    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listOpUtils.lastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = exports.lastIndex = function lastIndex(x) {
        var len = (0, _object.length)(x);return len ? len - 1 : 0;
    },


    /**
     * Finds index in string or list.
     * @function module:listOpUtils.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = exports.findIndexWhere = (0, _curry.curry)(function (pred, arr) {
        var ind = 0;
        var limit = (0, _object.length)(arr);
        for (; ind < limit; ind += 1) {
            var predicateFulfilled = !!pred(arr[ind], ind, arr);
            if (predicateFulfilled) {
                return ind;
            }
        }
        return -1;
    }),


    /**
     * Finds index in list from right to left.
     * @function module:listOpUtils.findIndexWhereRight
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhereRight = exports.findIndexWhereRight = (0, _curry.curry)(function (pred, arr) {
        var ind = (0, _object.length)(arr) - 1;
        for (; ind >= 0; ind -= 1) {
            var predicateFulfilled = !!pred(arr[ind], ind, arr);
            if (predicateFulfilled) {
                return ind;
            }
        }
        return -1;
    }),


    /**
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = exports.findIndicesWhere = (0, _curry.curry)(function (pred, xs) {
        var limit = (0, _object.length)(xs);
        var ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out.push(ind);
            }
        }
        return out.length ? out : undefined;
    }),


    /**
     * @function module:listOpUtils.find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    findWhere = exports.findWhere = (0, _curry.curry)(function (pred, xs) {
        var ind = 0,
            limit = (0, _object.length)(xs);
        if (!limit) {
            return;
        }
        for (; ind < limit; ind++) {
            var elm = xs[ind];
            if (pred(elm, ind, xs)) {
                return elm;
            }
        }
    }); // un-curried version good for both strings and arrays
    /**
     * List operator utils module.
     * @module _listOpUtils.
     * @private
     */
});