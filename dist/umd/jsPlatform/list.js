(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../functionOps/curry', '../uncurried/jsPlatform/listUncurried'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../functionOps/curry'), require('../uncurried/jsPlatform/listUncurried'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry, global.listUncurried);
    global.list = mod.exports;
  }
})(this, function (exports, _curry, _listUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;
  /**
   * List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
   * on both strings and arrays.
   * @module jsPlatform_list
   */

  var concat = exports.concat = _listUncurried.concat,


  /**
   * Calls `slice` method on passed in instance.
   * @function module:jsPlatform_list.slice
   * @param separator {String|RegExp}
   * @param list {Array|String|*}
   * @returns {Array|String|*}
   */
  slice = exports.slice = (0, _curry.curry)(_listUncurried.slice),
      includes = exports.includes = _listUncurried.includes,
      indexOf = exports.indexOf = _listUncurried.indexOf,
      lastIndexOf = exports.lastIndexOf = _listUncurried.lastIndexOf;
});