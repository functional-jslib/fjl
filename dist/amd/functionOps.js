define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @author edlc
   * @created 5/1/17.
   * @module fnOperators
   * @type {{call: Function, apply: Function, flip: Function, flipN: Function}}
   */
  var

  /**
   * Functional `call` function (takes no context).
   * @function module:fnOperators.call
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  call = exports.call = function call(fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.call.apply(fn, [null].concat(args));
  },


  /**
   * Functional `apply` function (takes no context).
   * @function module:fnOperators.apply
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  apply = exports.apply = function apply(fn, args) {
    return fn.apply(null, args);
  },


  /**
   * Flips a functions arguments order and returns a new function requiring such (arguments in reverse order).
   * @function module:fnOperators.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = function flipN(fn) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return apply(fn, args.reverse());
    };
  },


  /**
   * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
   * @function module:fnOperators.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = function flip(fn) {
    return function (b, a) {
      return call(fn, a, b);
    };
  };

  exports.default = {
    call: call,
    apply: apply,
    flip: flip,
    flipN: flipN
  };
});