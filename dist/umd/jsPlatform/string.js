(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../functionOps/curry', '../uncurried/jsPlatform/string_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../functionOps/curry'), require('../uncurried/jsPlatform/string_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry, global.string_);
    global.string = mod.exports;
  }
})(this, function (exports, _curry, _string_) {
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
   * @private
   */

  var split = exports.split = (0, _curry.curry)(_string_.split);
});