(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './curry', '../uncurried/jsPlatform/function_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./curry'), require('../uncurried/jsPlatform/function_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry, global.function_);
    global.call = mod.exports;
  }
})(this, function (exports, _curry, _function_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.call = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   * @memberOf functionOps
   */
  var

  /**
   * Functional `call` function (takes no context).
   * @function module:functionOps.call
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  call = exports.call = (0, _curry.curry2)(_function_.call);
});