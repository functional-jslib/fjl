(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../uncurried/functionOps/curry_', '../uncurried/jsPlatform/object_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../uncurried/functionOps/curry_'), require('../uncurried/jsPlatform/object_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry_, global.object_);
    global.instanceOf = mod.exports;
  }
})(this, function (exports, _curry_, _object_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.instanceOf = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   * @memberOf objectOps
   */

  var

  /**
   * `instanceof` in function form.
   * @function module:objectOps.instanceOf
   * @param instance {*}
   * @param Type {Function}
   * @returns {Boolean}
   */
  instanceOf = exports.instanceOf = (0, _curry_.curry)(_object_.instanceOf);
});