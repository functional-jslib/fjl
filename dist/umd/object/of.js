(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./is", "../jsPlatform/function"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./is"), require("../jsPlatform/function"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.is, global._function);
    global.of = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _is, _function) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.of = void 0;

  function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
   * @example
   * // - If exists `(value).constructor.of` uses this.
   * // - If value is of one String, Boolean, Symbol, or Number types calls it's
   * //      constructor as a function (in cast form;  E.g., `constructor(...args)` )
   * // - Else if constructor is a function, thus far, then calls constructor using
   * //      the `new` keyword (with any passed in args).
  
   * @function module:object.of
   * @param x {*} - Value to derive returned value's type from.
   * @param [args] {...*} - Any args to pass in to matched construction strategy.
   * @returns {*|undefined} - New value of given value's type else `undefined`.
   */
  var of = function of(x) {
    if (!(0, _is.isset)(x)) {
      return undefined;
    }

    var constructor = x.constructor;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (constructor.hasOwnProperty('of')) {
      return (0, _function.apply)(constructor.of, args);
    } else if ((0, _is.isUsableImmutablePrimitive)(x)) {
      return (0, _function.apply)(constructor, args);
    } else if ((0, _is.isFunction)(constructor)) {
      return _construct(constructor, args);
    }

    return undefined;
  };

  _exports.of = of;
});