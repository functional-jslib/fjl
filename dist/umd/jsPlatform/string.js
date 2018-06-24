(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../uncurried/_function/_curry', '../uncurried/_jsPlatform/_string'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../uncurried/_function/_curry'), require('../uncurried/_jsPlatform/_string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._curry, global._string);
    global.string = mod.exports;
  }
})(this, function (exports, _curry, _string) {
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

  var split = exports.split = (0, _curry.curry)(_string.split);
});