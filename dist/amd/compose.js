define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  /**
   * Composes all functions passed in from right to left passing the return value of the function to the right of a function to left.
   * @module compose
   * @type {Function}
   * @param args {...Function}
   * @returns {Function}
   */
  let compose = exports.compose = (...args) => arg0 => args.reduceRight((value, fn) => fn(value), arg0);

  exports.default = compose;
});