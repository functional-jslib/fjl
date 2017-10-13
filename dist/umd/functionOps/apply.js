(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../uncurried/functionOps/curry_', '../uncurried/jsPlatform/function_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../uncurried/functionOps/curry_'), require('../uncurried/jsPlatform/function_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry_, global.function_);
    global.apply = mod.exports;
  }
})(this, function (exports, _curry_, _function_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.apply = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   * @memberOf functionOps
   */
  var

  /**
   * Functional `apply` functionOps (takes no context).
   * @function module:functionOps.apply
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  apply = exports.apply = (0, _curry_.curry)(_function_.apply);
});