define(["exports"], function (_exports) {
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