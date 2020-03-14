(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./typeOf", "./assocList"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./typeOf"), require("./assocList"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.typeOf, global.assocList);
    global.toArray = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _typeOf, _assocList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.toArray = void 0;

  var
  /**
   * Converts incoming value to an array.
   * @note For `WeakMap`, `WeakSet`, `Map` and `Set` result is the same as calling `Array.from` on such.
   * @note For `null`, `undefined`, `NaN`, `Number{}`, `Symbol{}`, `Boolean{}` returns an empty array.
   * @note Method does a shallow conversion;
   * @function module:object.toArray
   * @param x {*} - Thing to convert from.
   * @returns {Array}
   */
  toArray = function toArray(x) {
    switch ((0, _typeOf.typeOf)(x)) {
      case 'Null':
      case 'Undefined':
        return [];

      case String.name:
      case Array.name:
      case 'WeakMap':
      case 'WeakSet':
      case 'Map':
      case 'Set':
        return Array.from(x);

      case Object.name:
      default:
        return (0, _assocList.toAssocList)(x);
    }
  };

  _exports.toArray = toArray;
});