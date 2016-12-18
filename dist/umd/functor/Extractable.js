/**
 * Created by edlc on 12/9/16.
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
    global.Extractable = mod.exports;
  }
})(this, function () {});