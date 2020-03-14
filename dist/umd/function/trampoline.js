(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.trampoline = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.trampoline = void 0;

  /**
   * Trampolines function calls in order to avoid stack overflow errors
   * on recursive function calls; Tail recursion replacement.
   * @example
   * // Instead of ... (which is prone to stack-overflow in
   * //   non-tail-call optimized environments (es5-es3))
   * const factorial = n => n > 1 ? n * factorial(n - 1) : 1;
   *
   * // We do
   * const
   *
   *  factorialProcess = (n, agg = 1) => {
   *      n > 1 ? () => factorialProcess(n - 1, agg * n) : agg,
   *  },
   *
   *  factorial = trampoline(factorialProcess)
   *  // will not overflow as we are performing tail call elimination
   *  // by returning thunks from factorial process which run in `while` loop
   *  // within `trampoline`.
   *
   *  ;
   *
   * @note function returned by trampoline is not curried (for convenience)!
   * @function module:function.trampoline
   * @param fn {Function} - Function to trampoline.
   * @param [fnName=undefined] {String} - Optionally restrict trampolining only to function with specific name.
   * @returns {*} - Finally returned value.
   */
  var trampoline = function trampoline(fn, fnName) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = fn.apply(null, args);

      while (typeof result === 'function' && (!fnName || result.name === fnName)) {
        result = result();
      }

      return result;
    };
  };

  _exports.trampoline = trampoline;
});