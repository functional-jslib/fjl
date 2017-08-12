(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './curry'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./curry'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry);
    global.apply = mod.exports;
  }
})(this, function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.apply = undefined;
  var

  /**
   * Functional `apply` functionOps (takes no context).
   * @functionOps module:fnOperators.apply
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  apply = exports.apply = (0, _curry.curry)(function (fn, args) {
    return fn.apply(null, args);
  }); /**
       * Created by elydelacruz on 7/22/2017.
       */
});