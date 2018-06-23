define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const

  /**
   * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
   * @function module:objectOps.jsonClone
   * @param x {*}
   * @returns {*}
   */
  jsonClone = exports.jsonClone = x => JSON.parse(JSON.stringify(x));
});