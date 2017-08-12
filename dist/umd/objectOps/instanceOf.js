(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../functionOps/curry'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../functionOps/curry'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry);
    global.instanceOf = mod.exports;
  }
})(this, function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.instanceOf = undefined;
  var

  /**
   * Returns whether constructor has derived objectOps.
   * @instanceConstructor {Function|Class}
   * @instance {*}
   * @returns {Boolean}
   */
  instanceOf = exports.instanceOf = (0, _curry.curry)(function (instanceConstructor, instance) {
    return instance instanceof instanceConstructor;
  }); /**
       * Created by elydelacruz on 7/22/2017.
       */
});