define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = compose;

  /**
   * Composes all functions passed in from right to left passing the return value of the function to the right of a function to left.
   * @module compose
   * @type {Function}
   * @param args {...Function}
   * @returns {Function}
   */
  function compose() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (arg0) {
      return args.reduceRight(function (value, fn) {
        return fn(value);
      }, arg0);
    };
  }
});