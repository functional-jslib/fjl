define(['exports', './aggregation', '../jsPlatform/function', '../jsPlatform/list', '../jsPlatform/object', '../boolean', './map', '../function/curry'], function (exports, _aggregation, _function, _list, _object, _boolean, _map, _curry) {
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

    var _map2 = _interopRequireDefault(_map);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    // un-curried version
    const

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @function module:listUtils.sliceFrom
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFrom = exports.sliceFrom = (0, _curry.curry)((startInd, arr) => (0, _list.slice)(startInd, undefined, arr)),


    /**
     * Slices from index `0` to given index.
     * @function module:listUtils.sliceTo
     * @param toInd {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceTo = exports.sliceTo = (0, _curry.curry)((toInd, xs) => (0, _list.slice)(0, toInd, xs)),


    /**
     * Slices a copy of list.
     * @function _listOpUtils.sliceFrom
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    copy = exports.copy = sliceFrom(0),


    /**
     * Slices a copy of list.
     * @function _listOpUtils.sliceCopy
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceCopy = exports.sliceCopy = copy,


    /**
     * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
     * @function module:listUtils.genericAscOrdering
     * @param a {*}
     * @param b {*}
     * @returns {number}
     */
    genericAscOrdering = exports.genericAscOrdering = (0, _curry.curry)((a, b) => {
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
    lengths = exports.lengths = (...lists) => (0, _object.length)(lists) ? (0, _map2.default)(_object.length, lists) : [],


    /**
     * @function module:listUtils.lengthsToSmallest
     * @param lists {...(Array|String|*)}
     * @returns {Array|String|*}
     */
    lengthsToSmallest = exports.lengthsToSmallest = (...lists) => {
        const listLengths = (0, _function.apply)(lengths, lists),
              smallLen = Math.min.apply(Math, listLengths);
        return (0, _map2.default)((list, ind) => listLengths[ind] > smallLen ? sliceTo(smallLen, list) : copy(list), lists);
    },


    /**
     * Reduces until predicate.
     * @param pred
     * @param op
     * @param agg
     * @param arr
     * @returns {*}
     */
    reduceUntil = exports.reduceUntil = (0, _curry.curry)((pred, op, agg, arr) => {
        const limit = (0, _object.length)(arr);
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
    }),


    /**
     * Reduces until predicate (from the right).
     * @param pred
     * @param op
     * @param agg
     * @param arr
     * @returns {*}
     */
    reduceRightUntil = exports.reduceRightUntil = (0, _curry.curry)((pred, op, agg, arr) => {
        const limit = (0, _object.length)(arr);
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
    }),
          reduce = exports.reduce = reduceUntil(_boolean.alwaysFalse),
          reduceRight = exports.reduceRight = reduceRightUntil(_boolean.alwaysFalse),


    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listOpUtilslastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = exports.lastIndex = x => {
        const len = (0, _object.length)(x);return len ? len - 1 : 0;
    },


    /**
     * Finds index in string or list.
     * @function module:listOpUtilsfindIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = exports.findIndexWhere = (0, _curry.curry)((pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = (0, _object.length)(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    }),


    /**
     * Finds index in list from right to left.
     * @function module:listOpUtilsfindIndexWhereRight
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhereRight = exports.findIndexWhereRight = (0, _curry.curry)((pred, arr) => {
        const limit = (0, _object.length)(arr);
        let ind = limit,
            predicateFulfilled = false;
        for (; ind >= 0 && !predicateFulfilled; --ind) {
            predicateFulfilled = pred(arr[ind], ind, arr);
        }
        return ind;
    }),


    /**
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = exports.findIndicesWhere = (0, _curry.curry)((pred, xs) => {
        if (!xs || !xs.length) {
            return undefined;
        }
        const limit = (0, _object.length)(xs);
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out.push(ind);
            }
        }
        return out.length ? out : undefined;
    }),


    /**
     * @function module:listOpUtilsfind
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    findWhere = exports.findWhere = (0, _curry.curry)((pred, xs) => {
        let ind = 0,
            limit = (0, _object.length)(xs);
        if (!limit) {
            return;
        }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) {
                return elm;
            }
        }
    }); // un-curried version good for both strings and arrays
    /**
     * List operator utils module.
     * @module _listOpUtils
     * @private
     */
});