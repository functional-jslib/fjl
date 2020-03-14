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
    global.aggregation = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.aggregateArray = void 0;

  var
  /**
   * Pushes incoming `item` onto given array and returns said array.
   * @private
   * @param agg {Array}
   * @param item {*}
   * @returns {Array}
   */
  aggregateArray = function aggregateArray(agg, item) {
    agg.push(item);
    return agg;
  };

  _exports.aggregateArray = aggregateArray;
});