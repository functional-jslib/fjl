define(['exports', './aggregation_', '../jsPlatform/function_', '../jsPlatform/list_', '../jsPlatform/object_', '../../booleanOps', './map_'], function (exports, _aggregation_, _function_, _list_, _object_, _booleanOps, _map_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports._permutationsAlgo = exports._swap = exports.findWhere = exports.findIndicesWhere = exports.findIndexWhereRight = exports.findIndexWhere = exports.lastIndex = exports.reduceRight = exports.reduce = exports.reduceRightUntil = exports.reduceUntil = exports.lengthsToSmallest = exports.lengths = exports.genericAscOrdering = exports.copy = exports.sliceTo = exports.sliceFrom = undefined;
    Object.keys(_aggregation_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _aggregation_[key];
            }
        });
    });
    // un-curried version good for both strings and arrays
    /**
     * List operator utils module.
     * @module listOpsUtils_
     * @private
     */
    const

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @function module:listOpsUtils_.sliceFrom
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFrom = exports.sliceFrom = (startInd, arr) => (0, _list_.slice)(startInd, (0, _object_.length)(arr), arr),


    /**
     * Slices from index `0` to given index.
     * @function module:listOpsUtils_.sliceTo
     * @param toInd {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceTo = exports.sliceTo = (toInd, xs) => (0, _list_.slice)(0, toInd, xs),


    /**
     * Slices a copy of list.
     * @function listOpsUtils_.sliceFrom
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    copy = exports.copy = xs => sliceFrom(0, xs),


    /**
     * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
     * @function module:listOpsUtils_.genericAscOrdering
     * @param a {*}
     * @param b {*}
     * @returns {number}
     */
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
     * @function module:listOpsUtils_.lengths
     * @param lists ...{Array|String|*}
     * @returns {Array|String|*}
     */
    lengths = exports.lengths = (...lists) => (0, _object_.length)(lists) ? (0, _map_.map)(_object_.length, lists) : [],


    /**
     * @function module:listOpsUtils_.lengthsToSmallest
     * @param lists {...(Array|String|*)}
     * @returns {Array|String|*}
     */
    lengthsToSmallest = exports.lengthsToSmallest = (...lists) => {
        const listLengths = (0, _function_.apply)(lengths, lists),
              smallLen = Math.min.apply(Math, listLengths);
        return (0, _map_.map)((list, ind) => listLengths[ind] > smallLen ? sliceTo(smallLen, list) : copy(list), lists);
    },
          reduceUntil = exports.reduceUntil = (pred, op, agg, arr) => {
        const limit = (0, _object_.length)(arr);
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
        const limit = (0, _object_.length)(arr);
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
     * @function module:listOpsUtils_lastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = exports.lastIndex = x => {
        const len = (0, _object_.length)(x);return len ? len - 1 : 0;
    },


    /**
     * Finds index in string or list.
     * @function module:listOpsUtils_findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = exports.findIndexWhere = (pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = (0, _object_.length)(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    },


    /**
     * Finds index in list from right to left.
     * @function module:listOpsUtils_findIndexWhereRight
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhereRight = exports.findIndexWhereRight = (pred, arr) => {
        const limit = (0, _object_.length)(arr);
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
        const limit = (0, _object_.length)(xs);
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
     * @function module:listOpsUtils_find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    findWhere = exports.findWhere = (pred, xs) => {
        let ind = 0,
            limit = (0, _object_.length)(xs);
        if (!limit) {
            return;
        }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) {
                return elm;
            }
        }
    },
          _swap = exports._swap = (list, ind1, ind2) => {
        const tmp = list[ind1];
        list[ind1] = list[ind2];
        list[ind2] = tmp;
        return list;
    },
          _permutationsAlgo = exports._permutationsAlgo = (listIn, limit, remainderLen) => {
        let out = [];
        if (remainderLen === 1) {
            return copy(listIn);
        }
        for (let i = 0; i < remainderLen; i++) {
            const newLen = remainderLen - 1;

            // Capture permutation
            out.push(_permutationsAlgo(listIn, limit, newLen));

            // If remainderLen is odd, swap first and last element
            //  else, swap `ith` and last element
            _swap(listIn, remainderLen % 2 === 1 ? 0 : i, newLen);
        }
        return out;
    }; // un-curried version
});