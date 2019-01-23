"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = exports.assign = exports.native = exports.length = exports.hasOwnProperty = exports.instanceOf = void 0;

var _utils = require("../utils");

var _curry = require("../function/curry");

var _flip = require("../function/flip");

/**
 * @description Defines some of the platform methods for objects (the ones used within `fjl`).
 */

/**
 * Returns whether constructor has derived object.
 * @function module:object.instanceOf
 * @param instanceConstructor {Function} - Constructor.
 * @param instance {*}
 * @instance {*}
 * @returns {Boolean}
 */
var instanceOf = (0, _curry.curry)(function (instanceConstructor, instance) {
  return instance instanceof instanceConstructor;
}),
    hasOwnProperty = (0, _utils.fPureTakesOne)('hasOwnProperty'),
    length = function length(x) {
  return x.length;
},
    native = Object.getOwnPropertyNames(Object).reduce(function (agg, key) {
  if (typeof Object[key] !== 'function') {
    return agg;
  }

  var operation = Object[key];

  switch (operation.length) {
    case 2:
      agg[key] = (0, _flip.flip)(operation);
      break;

    case 3:
      agg[key] = (0, _flip.flip3)(operation);
      break;

    case 4:
      agg[key] = (0, _flip.flip4)(operation);
      break;

    case 5:
      agg[key] = (0, _flip.flip5)(operation);
      break;

    default:
      agg[key] = Object[key];
      break;
  }

  return agg;
}, {}),
    keys = native.keys,
    assign = function () {
  return Object.assign ? function (obj0) {
    for (var _len = arguments.length, objs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      objs[_key - 1] = arguments[_key];
    }

    return Object.assign.apply(Object, [obj0].concat(objs));
  } : (0, _curry.curry2)(function (obj0) {
    for (var _len2 = arguments.length, objs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      objs[_key2 - 1] = arguments[_key2];
    }

    return objs.reduce(function (topAgg, obj) {
      return Object.keys(obj).reduce(function (agg, key) {
        agg[key] = obj[key];
        return agg;
      }, topAgg);
    }, obj0);
  });
}();

exports.assign = assign;
exports.keys = keys;
exports.native = native;
exports.length = length;
exports.hasOwnProperty = hasOwnProperty;
exports.instanceOf = instanceOf;