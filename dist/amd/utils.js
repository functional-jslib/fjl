define(['exports', './uncurried/_utils', './uncurried/functionOps/curry_'], function (exports, _utils, _curry_) {
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

  const fPureTakesOne_ = exports.fPureTakesOne_ = name => (0, _curry_.curry)((arg, f) => f[name](arg)),
        fPureTakes2_ = exports.fPureTakes2_ = name => (0, _curry_.curry)((arg1, arg2, f) => f[name](arg1, arg2)),
        fPureTakesOneOrMore_ = exports.fPureTakesOneOrMore_ = name => (0, _curry_.curry2)((f, ...args) => f[name](...args));
});