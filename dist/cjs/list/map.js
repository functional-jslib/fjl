"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _object = require("../jsPlatform/object");

var _curry = require("../function/curry");

var _typeOf = require("../object/typeOf");

var _of = require("../object/of");

var _is = require("../object/is");

/**
 * Maps a function onto a List (string or array) or a functor (value containing a map method).
 * @function module:list.map
 * @param fn {Function} - Function to map on given value.
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
var map = (0, _curry.curry)(function (fn, xs) {
  if (!(0, _is.isset)(xs)) {
    return xs;
  }

  var out = (0, _of.of)(xs),
      limit,
      i = 0;

  switch ((0, _typeOf.typeOf)(xs)) {
    case 'Array':
      limit = (0, _object.length)(xs);

      if (!limit) {
        return out;
      }

      for (; i < limit; i += 1) {
        out.push(fn(xs[i], i, xs));
      }

      return out;

    case 'String':
      limit = (0, _object.length)(xs);

      if (!xs) {
        return out;
      }

      for (; i < limit; i += 1) {
        out += fn(xs[i], i, xs);
      }

      return out;

    default:
      if ((0, _is.isFunctor)(xs)) {
        return xs.map(fn);
      } // Other objects


      return Object.keys(xs).reduce(function (agg, key) {
        out[key] = fn(xs[key], key, xs);
        return out;
      }, out);
  }
});
var _default = map;
exports["default"] = _default;