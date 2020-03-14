(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../utils"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../utils"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.utils);
    global.string = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.split = void 0;

  /**
   * Created by elydelacruz on 9/6/2017.
   */

  /**
   * Functional version of `String.prototype.split`.
   * @function module:jsPlatform.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  var split = (0, _utils.fPureTakesOne)('split');
  _exports.split = split;
});