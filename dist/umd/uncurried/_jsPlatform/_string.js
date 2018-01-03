(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._utils);
    global._string = mod.exports;
  }
})(this, function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.split = undefined;


  /**
   * Functional version of `String.prototype.split`.
   * @function module:_stringOps.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  var split = exports.split = (0, _utils.fPureTakesOne)('split'); /**
                                                                   * Created by elydelacruz on 9/6/2017.
                                                                   */
});