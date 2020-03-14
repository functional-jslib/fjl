(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./is", "../function/curry"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./is"), require("../function/curry"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.is, global.curry);
    global.searchObj = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _is, _curry) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.searchObj = void 0;
  var
  /**
   * Gives you value at key/namespace-key within `obj`;  E.g.,
   * searchObj('all.your.base', {all: {your: {base: 99}}}) === 99 // `true`
   * @note If key is unreachable (undefined) returns `undefined`.
   *  Useful in cases where we do not want to check each key along the way before getting/checking value;  E.g.,
   * @example
   * ```
   * if (obj && obj.all && obj.all.your && obj.all.your.base) {
   *   // Thing we want to do
   * }
   *
   * // So with our function becomes
   * if (searchObj('all.your.base', obj)) {
   *   // Thing we want to do
   * }
   * ```
   * @function module:object.searchObj
   * @param nsString {String}
   * @param obj {*}
   * @returns {*}
   */
  searchObj = (0, _curry.curry)(function (nsString, obj) {
    if (!obj) {
      return obj;
    }

    if (nsString.indexOf('.') === -1) {
      return obj[nsString];
    }

    var parts = nsString.split('.'),
        limit = parts.length;
    var ind = 0,
        parent = obj;

    for (; ind < limit; ind += 1) {
      var node = parent[parts[ind]];

      if (!(0, _is.isset)(node)) {
        return node;
      }

      parent = node;
    }

    return parent;
  });
  _exports.searchObj = searchObj;
});