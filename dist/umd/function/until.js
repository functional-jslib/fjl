(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./curry"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./curry"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry);
    global.until = mod.exports;
  }
})(this, function (_exports, _curry) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.until = void 0;
  var
  /**
   * Run `operation` until predicate returns `true` (like a functional
   *  version of a while loop).
   * @function module:function.until
   * @param predicate {Function} :: a -> Boolean
   * @param operation {Function} :: a -> a
   * @param typeInstance {*} :: * - A monoidal zero or some starting point.
   * @returns {*} - What ever type `typeInstance` is
   */
  until = (0, _curry.curry)(function (predicate, operation, typeInstance) {
    var result = typeInstance;

    while (!predicate(result)) {
      result = operation(result);
    }

    return result;
  });
  _exports.until = until;
});