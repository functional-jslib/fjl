/**
 * @module jsPlatform_
 * @private
 */

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.jsPlatform_ = mod.exports;
  }
})(this, function () {
  "use strict";
});