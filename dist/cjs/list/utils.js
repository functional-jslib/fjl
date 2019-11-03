"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  sliceFrom: true,
  sliceTo: true,
  sliceCopy: true,
  genericAscOrdering: true,
  lengths: true,
  toShortest: true,
  reduceUntil: true,
  reduceUntilRight: true,
  reduce: true,
  reduceRight: true,
  lastIndex: true,
  findIndexWhere: true,
  findIndexWhereRight: true,
  findIndicesWhere: true,
  findWhere: true
};
exports.findWhere = exports.findIndicesWhere = exports.findIndexWhereRight = exports.findIndexWhere = exports.lastIndex = exports.reduceRight = exports.reduce = exports.reduceUntilRight = exports.reduceUntil = exports.toShortest = exports.lengths = exports.genericAscOrdering = exports.sliceCopy = exports.sliceTo = exports.sliceFrom = void 0;

var _function = require("../jsPlatform/function");

var _list = require("../jsPlatform/slice");

var _object = require("../jsPlatform/object");

var _boolean = require("../boolean");

var _map = _interopRequireDefault(require("./map"));

var _curry = require("../function/curry");

var _aggregation = require("./aggregation");

Object.keys(_aggregation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aggregation[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List operator utils module.
 * @module listUtils
 */
// un-curried version
// un-curried version good for both strings and arrays
var
/**
 * Returns a slice of the given list from `startInd` to the end of the list.
 * @function module:listUtils.sliceFrom
 * @param startInd {Number}
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
sliceFrom = (0, _curry.curry)(function (startInd, xs) {
  return (0, _list.slice)(startInd, undefined, xs);
}),

/**
 * Slices from index `0` to given index.
 * @function module:listUtils.sliceTo
 * @param toInd {Number}
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
sliceTo = (0, _curry.curry)(function (toInd, xs) {
  return (0, _list.slice)(0, toInd, xs);
}),

/**
 * Slices a copy of list.
 * @function listUtils.sliceCopy
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
sliceCopy = sliceFrom(0),

/**
 * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
 * @function module:listUtils.genericAscOrdering
 * @param a {*}
 * @param b {*}
 * @returns {number}
 */
genericAscOrdering = (0, _curry.curry)(function (a, b) {
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
lengths = (0, _curry.curry2)(function () {
  for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
    lists[_key] = arguments[_key];
  }

  return (0, _map.default)(_object.length, lists);
}),

/**
 * Returns a list of lists trimmed to the shortest length in given list of lists.   @background This method is used by the `zip*` functions to achieve their
 *  'slice to smallest' functionality.
 * @function module:listUtils.toShortest
 * @param lists {...(Array|String|*)}
 * @returns {Array|String|*}
 */
toShortest = (0, _curry.curry2)(function () {
  for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    lists[_key2] = arguments[_key2];
  }

  var listLengths = (0, _function.apply)(lengths, lists),
      smallLen = Math.min.apply(Math, listLengths);
  return (0, _map.default)(function (list, ind) {
    return listLengths[ind] > smallLen ? sliceTo(smallLen, list) : sliceCopy(list);
  }, lists);
}),

/**
 * Reduces until predicate.
 * @function module:listUtils.reduceUntil
 * @param pred {Function} - `(item, index, list) => Boolean(...)`
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {Array|String|*} - List.
 * @returns {*}
 */
reduceUntil = (0, _curry.curry)(function (pred, op, agg, xs) {
  var limit = (0, _object.length)(xs);

  if (!limit) {
    return agg;
  }

  var ind = 0,
      result = agg;

  for (; ind < limit; ind++) {
    if (pred(xs[ind], ind, xs)) {
      break;
    }

    result = op(result, xs[ind], ind, xs);
  }

  return result;
}),

/**
 * Reduces until predicate (from right to left).
 * @function module:listUtils.reduceUntilRight
 * @param pred {Function} - `(item, index, list) => Boolean(...)`
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {Array|String|*} - List.
 * @returns {*}
 */
reduceUntilRight = (0, _curry.curry)(function (pred, op, agg, arr) {
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

/**
 * Reduces a list with given operation (`op`) function.
 * @function module:listUtils.reduce
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {Array|String|*} - List.
 * @returns {*}
 */
reduce = reduceUntil(_boolean.alwaysFalse),

/**
 * Reduces a list with given operation (`op`) function (from right-to-left).
 * @function module:listUtils.reduceRight
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {Array|String|*} - List.
 * @returns {*}
 */
reduceRight = reduceUntilRight(_boolean.alwaysFalse),

/**
 * Gets last index of a list/list-like (Array|String|Function etc.).
 * @function module:listUtils.lastIndex
 * @param x {Array|String|*} - list like or list.
 * @returns {Number} - `-1` if no element found.
 */
lastIndex = function lastIndex(x) {
  var len = (0, _object.length)(x);
  return len ? len - 1 : 0;
},

/**
 * Finds index in string or list.
 * @function module:listUtils.findIndexWhere
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {Array|String}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 */
findIndexWhere = (0, _curry.curry)(function (pred, arr) {
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
 * @function module:listUtils.findIndexWhereRight
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {Array|String}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 */
findIndexWhereRight = (0, _curry.curry)(function (pred, arr) {
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
 * @function module:listUtils.findIndicesWhere
 * @param pred {Function}
 * @param xs {Array|String|*} - list or list like.
 * @returns {Array|undefined}
 */
findIndicesWhere = (0, _curry.curry)(function (pred, xs) {
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
 * @function module:listUtils.findWhere
 * @param pred {Function}
 * @param xs {Array|String|*} - list or list like.
 * @returns {*}
 */
findWhere = (0, _curry.curry)(function (pred, xs) {
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

  return undefined;
});

exports.findWhere = findWhere;
exports.findIndicesWhere = findIndicesWhere;
exports.findIndexWhereRight = findIndexWhereRight;
exports.findIndexWhere = findIndexWhere;
exports.lastIndex = lastIndex;
exports.reduceRight = reduceRight;
exports.reduce = reduce;
exports.reduceUntilRight = reduceUntilRight;
exports.reduceUntil = reduceUntil;
exports.toShortest = toShortest;
exports.lengths = lengths;
exports.genericAscOrdering = genericAscOrdering;
exports.sliceCopy = sliceCopy;
exports.sliceTo = sliceTo;
exports.sliceFrom = sliceFrom;