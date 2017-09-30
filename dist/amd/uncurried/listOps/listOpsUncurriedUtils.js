define(['exports', './listOpsUncurriedAggregation', '../jsPlatform/function_', '../jsPlatform/list_', '../jsPlatform/object_', '../../booleanOps/booleanOps', './map'], function (exports, _listOpsUncurriedAggregation, _functionUncurried, _listUncurried, _objectUncurried, _booleanOps, _map) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.findWhere = exports.findIndicesWhere = exports.findIndexWhereRight = exports.findIndexWhere = exports.lastIndex = exports.reduceRight = exports.reduce = exports.reduceRightUntil = exports.reduceUntil = exports.lengthsToSmallest = exports.lengths = exports.genericAscOrdering = exports.copy = exports.sliceTo = exports.sliceFrom = undefined;
    Object.keys(_listOpsUncurriedAggregation).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _listOpsUncurriedAggregation[key];
            }
        });
    });
    // un-curried version good for both strings and arrays
    /**
     * Array operators module.
     * @module listOpsUtils
     */
    const

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFrom = exports.sliceFrom = (startInd, arr) => (0, _listUncurried.slice)(startInd, (0, _objectUncurried.length)(arr), arr),


    /**
     * Slices from index `0` to given index.
     * @module module:listOpsUncurried.sliceTo
     * @param toInd {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceTo = exports.sliceTo = (toInd, xs) => (0, _listUncurried.slice)(0, toInd, xs),


    /**
     * Slices a copy of list.
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    copy = exports.copy = xs => sliceFrom(0, xs),
          genericAscOrdering = exports.genericAscOrdering = (a, b) => {
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
    lengths = exports.lengths = (...lists) => (0, _objectUncurried.length)(lists) ? (0, _map.map)(_objectUncurried.length, lists) : [],
          lengthsToSmallest = exports.lengthsToSmallest = (...lists) => {
        const listLengths = (0, _functionUncurried.apply)(lengths, lists),
              smallLen = Math.min.apply(Math, listLengths);
        return (0, _map.map)((list, ind) => listLengths[ind] > smallLen ? sliceTo(smallLen, list) : copy(list), lists);
    },
          reduceUntil = exports.reduceUntil = (pred, op, agg, arr) => {
        const limit = (0, _objectUncurried.length)(arr);
        if (!limit) {
            return agg;
        }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(arr[ind], ind, arr)) {
                break;
            }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },
          reduceRightUntil = exports.reduceRightUntil = (pred, op, agg, arr) => {
        const limit = (0, _objectUncurried.length)(arr);
        if (!limit) {
            return agg;
        }
        let ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) {
                break;
            }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },
          reduce = exports.reduce = (operation, agg, arr) => reduceUntil(_booleanOps.alwaysFalse, // predicate
    operation, // operation
    agg, // aggregator
    arr),
          // list

    reduceRight = exports.reduceRight = (operation, agg, arr) => reduceRightUntil(_booleanOps.alwaysFalse, // predicate
    operation, // operation
    agg, // aggregator
    arr),
          // list

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listOps.lastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = exports.lastIndex = x => {
        const len = (0, _objectUncurried.length)(x);return len ? len - 1 : 0;
    },


    /**
     * Finds index in string or list.
     * @function module:listOps.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = exports.findIndexWhere = (pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = (0, _objectUncurried.length)(arr);
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
    findIndexWhereRight = exports.findIndexWhereRight = (pred, arr) => {
        const limit = (0, _objectUncurried.length)(arr);
        let ind = limit,
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
    findIndicesWhere = exports.findIndicesWhere = (pred, xs) => {
        const limit = (0, _objectUncurried.length)(xs);
        if (!limit) {
            return undefined;
        }
        let ind = 0,
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
    findWhere = exports.findWhere = (pred, xs) => {
        let ind = 0,
            limit = (0, _objectUncurried.length)(xs);
        if (!limit) {
            return;
        }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) {
                return elm;
            }
        }
    }; // un-curried version
});