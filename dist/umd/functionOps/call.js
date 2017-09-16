(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './curry', '../uncurried/jsPlatform/functionOpsUncurried'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./curry'), require('../uncurried/jsPlatform/functionOpsUncurried'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry, global.functionOpsUncurried);
    global.call = mod.exports;
  }
})(this, function (exports, _curry, _functionOpsUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.call = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   */
  var

  /**
   * Functional `call` functionOps (takes no context).
   * @functionOps module:fnOperators.call
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  call = exports.call = (0, _curry.curry2)(_functionOpsUncurried.call);
});