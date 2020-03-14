(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../function/curry"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../function/curry"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry);
    global._function = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _curry) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.call = _exports.apply = void 0;

  /**
   * Created by elydelacruz on 9/7/2017.
   */
  var
  /**
   * Functional `apply` function (takes no context).
   * @function module:function.apply
   * @param fn {Function}
   * @param args {Array|*}
   * @returns {*}
   */
  apply = (0, _curry.curry)(function (fn, args) {
    return fn.apply(null, args);
  }),

  /**
   * Functional `call` function (takes no context).
   * @function module:function.call
   * @param fn {Function}
   * @param args {...*}
   * @returns {*}
   */
  call = (0, _curry.curry2)(function (fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.call.apply(fn, [null].concat(args));
  });
  _exports.call = call;
  _exports.apply = apply;
});