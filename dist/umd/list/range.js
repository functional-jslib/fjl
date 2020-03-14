(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../function/curry"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../function/curry"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry);
    global.range = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _curry) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.range = void 0;

  /**
   * @module object
   */

  /**
   * Normalizes step for `from` and `to` combination.
   * @function module:list.normalizeStep
   * @param from {Number}
   * @param to {Number}
   * @param [step = 1] {Number}
   * @returns {Number}
   * @private
   */
  var normalizeStep = function normalizeStep(from, to, step) {
    if (from > to) {
      return step > 0 ? -step : step; // make step negative
    }

    return step < 0 ? -1 * step : step; // make step positive
  };

  var
  /**
   * Range function - gives you an array contain numbers in given range.
   * @note normalizes `step` to be valid if range numbers given are invalid
   *  (forces `step` to be negative if range required is in the negative direction
   *  and forces `step` to be positive if range required is in the other direction).
   * @function module:list.range
   * @param from {Number}
   * @param to {Number}
   * @param [step = 1] {Number}
   * @returns {Array.<Number>}
   */
  range = (0, _curry.curry)(function (from, to) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var i = from;
    var out = [];
    step = normalizeStep(from, to, step);

    if (step === 0 || from === to) {
      return [from];
    }

    for (; (to - i) * step >= 0; i += step) {
      out.push(i);
    }

    return out;
  });
  _exports.range = range;
});