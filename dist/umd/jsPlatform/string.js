(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../functionOps/curry', '../uncurried/jsPlatform/stringUnCurried'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../functionOps/curry'), require('../uncurried/jsPlatform/stringUnCurried'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry, global.stringUnCurried);
    global.string = mod.exports;
  }
})(this, function (exports, _curry, _stringUnCurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.split = undefined;


  /**
   * Functional version of `String.prototype.split`.
   * @curried
   * @function module:jsPlatform_string.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  /**
   * Created by elydelacruz on 9/6/2017.
   * @module jsPlatform_string
   */

  var split = exports.split = (0, _curry.curry)(_stringUnCurried.split);
});