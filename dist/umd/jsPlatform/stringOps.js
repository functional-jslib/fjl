(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../functionOps/curry', '../uncurried/jsPlatform/stringOpsUnCurried'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../functionOps/curry'), require('../uncurried/jsPlatform/stringOpsUnCurried'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry, global.stringOpsUnCurried);
    global.stringOps = mod.exports;
  }
})(this, function (exports, _curry, _stringOpsUnCurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.split = undefined;


  /**
   * Functional version of `String.prototype.split`.
   * @curried
   * @function module:jsPlatform.stringOps.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  /**
   * Created by elydelacruz on 9/6/2017.
   * @module jsPlatform.stringOps
   */

  var split = exports.split = (0, _curry.curry)(_stringOpsUnCurried.split);
});