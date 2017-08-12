(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../listOps/listOpsPrelude'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../listOps/listOpsPrelude'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.listOpsPrelude);
    global.compose = mod.exports;
  }
})(this, function (exports, _listOpsPrelude) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.compose = undefined;


  /**
   * Composes all functions passed in from right to left passing each functions return value to
   * the functionOps on the left of itself.
   * @functionOps module:fjl.compose
   * @type {Function}
   * @param args {...Function}
   * @returns {Function}
   */
  var compose = exports.compose = function compose() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (arg0) {
      return (0, _listOpsPrelude.reduceRight)(function (value, fn) {
        return fn(value);
      }, arg0, args);
    };
  };
});