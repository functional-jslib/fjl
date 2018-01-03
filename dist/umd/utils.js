(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './uncurried/_utils', './uncurried/functionOps/curry_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./uncurried/_utils'), require('./uncurried/functionOps/curry_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._utils, global.curry_);
    global.utils = mod.exports;
  }
})(this, function (exports, _utils, _curry_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fPureTakesOneOrMore_ = exports.fPureTakes2_ = exports.fPureTakesOne_ = undefined;
  Object.keys(_utils).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _utils[key];
      }
    });
  });
  /**
   * Created by elydelacruz on 7/22/2017.
   * @module utils
   * @private
   */

  var fPureTakesOne_ = exports.fPureTakesOne_ = function fPureTakesOne_(name) {
    return (0, _curry_.curry)(function (arg, f) {
      return f[name](arg);
    });
  },
      fPureTakes2_ = exports.fPureTakes2_ = function fPureTakes2_(name) {
    return (0, _curry_.curry)(function (arg1, arg2, f) {
      return f[name](arg1, arg2);
    });
  },
      fPureTakesOneOrMore_ = exports.fPureTakesOneOrMore_ = function fPureTakesOneOrMore_(name) {
    return (0, _curry_.curry2)(function (f) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return f[name].apply(f, args);
    });
  };
});