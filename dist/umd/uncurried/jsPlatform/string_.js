(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../utils_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../utils_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.utils_);
    global.string_ = mod.exports;
  }
})(this, function (exports, _utils_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.split = undefined;


  /**
   * Functional version of `String.prototype.split`.
   * @function module:stringOps_.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  var split = exports.split = (0, _utils_.fPureTakesOne)('split'); /**
                                                                    * Created by elydelacruz on 9/6/2017.
                                                                    */
});