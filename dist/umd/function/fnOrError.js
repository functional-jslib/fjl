(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../object/typeOf"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../object/typeOf"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.typeOf);
    global.fnOrError = mod.exports;
  }
})(this, function (_exports, _typeOf) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.fnOrError = void 0;

  var
  /**
   * Returns a function or throws an error if given `f` is not a function.
   * @function module:function.fnOrError
   * @param symbolName {String} - Error message prefix.
   * @param f {Function|*} - Expected function.
   * @returns {Function}
   * @throws {Error} - Error if `f` is not of `function`
   */
  fnOrError = function fnOrError(symbolName, f) {
    if (!f || !(f instanceof Function)) {
      throw new Error("".concat(symbolName, " should be a function. ") + "Type received: ".concat((0, _typeOf.typeOf)(f), ";  Value received: ").concat(f, "."));
    }

    return f;
  };

  _exports.fnOrError = fnOrError;
});