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
    global.apply = mod.exports;
  }
})(this, function (exports, _curry, _functionOpsUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.apply = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   */
  var

  /**
   * Functional `apply` functionOps (takes no context).
   * @functionOps module:fnOperators.apply
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  apply = exports.apply = (0, _curry.curry)(_functionOpsUncurried.apply);
});