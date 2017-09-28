(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/arrayOpsUncurried', './apply', './call'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/arrayOpsUncurried'), require('./apply'), require('./call'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.arrayOpsUncurried, global.apply, global.call);
    global.flip = mod.exports;
  }
})(this, function (exports, _arrayOpsUncurried, _apply, _call) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flipN = undefined;
  var

  /**
   * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
   * @function module:functionOps.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = function flipN(fn) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _apply.apply)(fn, (0, _arrayOpsUncurried.reverse)(args));
    };
  },


  /**
   * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
   * @function module:functionOps.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = function flip(fn) {
    return function (b, a) {
      return (0, _call.call)(fn, a, b);
    };
  };
});