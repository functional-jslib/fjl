'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findWhere = exports.findIndicesWhere = exports.findIndexWhereRight = exports.findIndexWhere = exports.lastIndex = exports.reduceRight = exports.reduce = exports.reduceRightUntil = exports.reduceUntil = exports.lengthsToSmallest = exports.lengths = exports.genericAscOrdering = exports.copy = exports.sliceTo = exports.sliceFrom = undefined;

var _listOpsUncurriedAggregation = require('./listOpsUncurriedAggregation');

Object.keys(_listOpsUncurriedAggregation).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _listOpsUncurriedAggregation[key];
        }
    });
});

var _functionUncurried = require('../jsPlatform/function_');

var _listUncurried = require('../jsPlatform/list_');

var _objectUncurried = require('../jsPlatform/object_');

var _booleanOps = require('../../booleanOps/booleanOps');

var _map = require('./map');

// un-curried version good for both strings and arrays
/**
 * Array operators module.
 * @module listOpsUtils
 */
var

/**
 * Returns a slice of the given list from `startInd` to the end of the list.
 * @param startInd {Number}
 * @param arr {Array|String|*}
 * @returns {Array|String|*}
 */
sliceFrom = exports.sliceFrom = function sliceFrom(startInd, arr) {
    return (0, _listUncurried.slice)(startInd, (0, _objectUncurried.length)(arr), arr);
},


/**
 * Slices from index `0` to given index.
 * @module module:listOpsUncurried.sliceTo
 * @param toInd {Number}
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
sliceTo = exports.sliceTo = function sliceTo(toInd, xs) {
    return (0, _listUncurried.slice)(0, toInd, xs);
},


/**
 * Slices a copy of list.
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
copy = exports.copy = function copy(xs) {
    return sliceFrom(0, xs);
},
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
 * @param lists ...{Array|String|*}
 * @returns {Array|String|*}
 */
lengths = exports.lengths = function lengths() {
    for (var _len = arguments.length, lists = Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
    }

    return (0, _objectUncurried.length)(lists) ? (0, _map.map)(_objectUncurried.length, lists) : [];
},
    lengthsToSmallest = exports.lengthsToSmallest = function lengthsToSmallest() {
    for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
    }

    var listLengths = (0, _functionUncurried.apply)(lengths, lists),
        smallLen = Math.min.apply(Math, listLengths);
    return (0, _map.map)(function (list, ind) {
        return listLengths[ind] > smallLen ? sliceTo(smallLen, list) : copy(list);
    }, lists);
},
    reduceUntil = exports.reduceUntil = function reduceUntil(pred, op, agg, arr) {
    var limit = (0, _objectUncurried.length)(arr);
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
    reduceRightUntil = exports.reduceRightUntil = function reduceRightUntil(pred, op, agg, arr) {
    var limit = (0, _objectUncurried.length)(arr);
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
    return reduceUntil(_booleanOps.alwaysFalse, // predicate
    operation, // operation
    agg, // aggregator
    arr);
},
    // list

reduceRight = exports.reduceRight = function reduceRight(operation, agg, arr) {
    return reduceRightUntil(_booleanOps.alwaysFalse, // predicate
    operation, // operation
    agg, // aggregator
    arr);
},
    // list

/**
 * Gets last index of a list/list-like (Array|String|Function etc.).
 * @function module:listOps.lastIndex
 * @param x {Array|String|*} - list like or list.
 * @returns {Number} - `-1` if no element found.
 */
lastIndex = exports.lastIndex = function lastIndex(x) {
    var len = (0, _objectUncurried.length)(x);return len ? len - 1 : 0;
},


/**
 * Finds index in string or list.
 * @function module:listOps.findIndexWhere
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {Array|String}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 */
findIndexWhere = exports.findIndexWhere = function findIndexWhere(pred, arr) {
    var ind = -1,
        predicateFulfilled = false;
    var limit = (0, _objectUncurried.length)(arr);
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
findIndexWhereRight = exports.findIndexWhereRight = function findIndexWhereRight(pred, arr) {
    var limit = (0, _objectUncurried.length)(arr);
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
    var limit = (0, _objectUncurried.length)(xs);
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
findWhere = exports.findWhere = function findWhere(pred, xs) {
    var ind = 0,
        limit = (0, _objectUncurried.length)(xs);
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