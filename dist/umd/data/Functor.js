/**
 * Created by elyde on 6/5/2017.
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
    global.Functor = mod.exports;
  }
})(this, function () {});