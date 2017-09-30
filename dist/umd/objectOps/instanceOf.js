(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../functionOps/curry', '../uncurried/objectOps/instanceOf_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../functionOps/curry'), require('../uncurried/objectOps/instanceOf_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry, global.instanceOf_);
    global.instanceOf = mod.exports;
  }
})(this, function (exports, _curry, _instanceOf_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.instanceOf = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   */

  var

  /**
   * Returns whether constructor has derived objectOps.
   * @instanceConstructor {Function|Class}
   * @instance {*}
   * @returns {Boolean}
   */
  instanceOf = exports.instanceOf = (0, _curry.curry)(_instanceOf_.instanceOf);
});