(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.instanceOf = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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
  instanceOf = exports.instanceOf = function instanceOf(instanceConstructor, instance) {
    return instance instanceof instanceConstructor;
  };
});