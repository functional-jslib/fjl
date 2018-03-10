(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './_aggregation', '../_jsPlatform/_function', '../_jsPlatform/_list', '../_jsPlatform/_object', '../../booleanOps', './_map'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./_aggregation'), require('../_jsPlatform/_function'), require('../_jsPlatform/_list'), require('../_jsPlatform/_object'), require('../../booleanOps'), require('./_map'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._aggregation, global._function, global._list, global._object, global.booleanOps, global._map);
        global._utils = mod.exports;
    }
})(this, function (exports, _aggregation, _function, _list, _object, _booleanOps, _map) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.findWhere = exports.findIndicesWhere = exports.findIndexWhereRight = exports.findIndexWhere = exports.lastIndex = exports.reduceRight = exports.reduce = exports.reduceRightUntil = exports.reduceUntil = exports.lengthsToSmallest = exports.lengths = exports.genericAscOrdering = exports.sliceCopy = exports.copy = exports.sliceTo = exports.sliceFrom = undefined;
    Object.keys(_aggregation).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _aggregation[key];
            }
        });
    });
    // un-curried version good for both strings and arrays
    /**
     * List operator utils module.
     * @module _listOpUtils
     * @private
     */
    var

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @function module:_listOpsUtils.sliceFrom
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFrom = exports.sliceFrom = function sliceFrom(startInd, arr) {
        return (0, _list.slice)(startInd, undefined, arr);
    },


    /**
     * Slices from index `0` to given index.
     * @function module:_listOpsUtils.sliceTo
     * @param toInd {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceTo = exports.sliceTo = function sliceTo(toInd, xs) {
        return (0, _list.slice)(0, toInd, xs);
    },


    /**
     * Slices a copy of list.
     * @function _listOpUtils.sliceFrom
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    copy = exports.copy = function copy(xs) {
        return sliceFrom(0, xs);
    },


    /**
     * Slices a copy of list.
     * @function _listOpUtils.sliceCopy
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceCopy = exports.sliceCopy = copy,


    /**
     * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
     * @function module:_listOpsUtils.genericAscOrdering
     * @param a {*}
     * @param b {*}
     * @returns {number}
     */
    genericAscOrdering = exports.genericAscOrdering = function genericAscOrdering(a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    },


    /**
     * Returns length of all passed lists in list.
     * @function module:_listOpsUtils.lengths
     * @param lists ...{Array|String|*}
     * @returns {Array|String|*}
     */
    lengths = exports.lengths = function lengths() {
        for (var _len = arguments.length, lists = Array(_len), _key = 0; _key < _len; _key++) {
            lists[_key] = arguments[_key];
        }

        return (0, _object.length)(lists) ? (0, _map.map)(_object.length, lists) : [];
    },


    /**
     * @function module:_listOpsUtils.lengthsToSmallest
     * @param lists {...(Array|String|*)}
     * @returns {Array|String|*}
     */
    lengthsToSmallest = exports.lengthsToSmallest = function lengthsToSmallest() {
        for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            lists[_key2] = arguments[_key2];
        }

        var listLengths = (0, _function.apply)(lengths, lists),
            smallLen = Math.min.apply(Math, listLengths);
        return (0, _map.map)(function (list, ind) {
            return listLengths[ind] > smallLen ? sliceTo(smallLen, list) : copy(list);
        }, lists);
    },


    /**
     * Reduces until predicate.
     * @param pred
     * @param op
     * @param agg
     * @param arr
     * @returns {*}
     */
    reduceUntil = exports.reduceUntil = function reduceUntil(pred, op, agg, arr) {
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
    },


    /**
     * Reduces until predicate (from the right).
     * @param pred
     * @param op
     * @param agg
     * @param arr
     * @returns {*}
     */
    reduceRightUntil = exports.reduceRightUntil = function reduceRightUntil(pred, op, agg, arr) {
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
    },
        reduce = exports.reduce = function reduce(operation, agg, arr) {
        return reduceUntil(_booleanOps.alwaysFalse, // until-predicate
        operation, // operation
        agg, // aggregator
        arr);
    },
        // list

    reduceRight = exports.reduceRight = function reduceRight(operation, agg, arr) {
        return reduceRightUntil(_booleanOps.alwaysFalse, // until-predicate
        operation, // operation
        agg, // aggregator
        arr);
    },
        // list

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:_listOpUtilslastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = exports.lastIndex = function lastIndex(x) {
        var len = (0, _object.length)(x);return len ? len - 1 : 0;
    },


    /**
     * Finds index in string or list.
     * @function module:_listOpUtilsfindIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = exports.findIndexWhere = function findIndexWhere(pred, arr) {
        var ind = -1,
            predicateFulfilled = false;
        var limit = (0, _object.length)(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    },


    /**
     * Finds index in list from right to left.
     * @function module:_listOpUtilsfindIndexWhereRight
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhereRight = exports.findIndexWhereRight = function findIndexWhereRight(pred, arr) {
        var limit = (0, _object.length)(arr);
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
    findIndicesWhere = exports.findIndicesWhere = function findIndicesWhere(pred, xs) {
        if (!xs || !xs.length) {
            return undefined;
        }
        var limit = (0, _object.length)(xs);
        var ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out.push(ind);
            }
        }
        return out.length ? out : undefined;
    },


    /**
     * @function module:_listOpUtilsfind
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    findWhere = exports.findWhere = function findWhere(pred, xs) {
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
    }; // un-curried version
});