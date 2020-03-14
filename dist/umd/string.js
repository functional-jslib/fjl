(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./list", "./jsPlatform/string", "./function/compose", "./jsPlatform/array", "./errorThrowing"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./list"), require("./jsPlatform/string"), require("./function/compose"), require("./jsPlatform/array"), require("./errorThrowing"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.list, global.string, global.compose, global.array, global.errorThrowing);
    global.string = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _list, _string, _compose, _array, _errorThrowing) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "split", {
    enumerable: true,
    get: function get() {
      return _string.split;
    }
  });
  _exports.classCase = _exports.camelCase = _exports.ucaseFirst = _exports.lcaseFirst = _exports.unlines = _exports.unwords = _exports.words = _exports.lines = void 0;

  /**
   * @module string
   * @description Contains functions for strings.
   */
  var
  /**
   * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
   * @function module:string.lines
   * @param str {String}
   * @returns {Array}
   */
  lines = (0, _string.split)(/[\n\r]/gm),

  /**
   * Splits a string on all '\s' and/or all '\t' characters.
   * @function module:string.words
   * @param str{String}
   * @returns {Array}
   */
  words = (0, _string.split)(/[\s\t]/gm),

  /**
   * Intersperse an array of strings with '\s' and then concats them.
   * @function module:string.unwords
   * @param arr {String}
   * @returns {Array}
   */
  unwords = (0, _list.intercalate)(' '),

  /**
   * Intersperses a '\n' character into a list of strings and then concats it.
   * @function module:string.unlines
   * @param list {Array|String|*}
   * @returns {Array}
   */
  unlines = (0, _list.intercalate)('\n'),

  /**
   * Lower cases first character of a non-empty string.
   * @function module:string.lcaseFirst
   * @param xs {String}
   * @returns {string}
   * @throws {Error} - Throws error if receiving anything that is not a string.
   */
  lcaseFirst = function lcaseFirst(xs) {
    (0, _errorThrowing._errorIfNotType)(String, 'lcaseFirst', 'xs', xs);
    return xs[0].toLowerCase() + xs.substring(1);
  },

  /**
   * Upper cases first character of a non-empty string.
   * @function module:string.ucaseFirst
   * @param xs {String}
   * @returns {string}
   * @throws {Error} - Throws error if receiving anything that is not a string.
   */
  ucaseFirst = function ucaseFirst(xs) {
    (0, _errorThrowing._errorIfNotType)(String, 'ucaseFirst', 'xs', xs);
    return xs[0].toUpperCase() + xs.substring(1);
  },

  /**
   * Camel cases (class case) a string.
   * @function module:string.camelCase
   * @param xs {String}
   * @param [pattern=/[^a-z\d/i]/] {RegExp} - Pattern to split on.  Optional.
   * @throws {Error} - Throws error if param `xs` is not a string.
   * @returns {string}
   * @curried
   */
  camelCase = function camelCase(xs) {
    var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /[^a-z\d]/i;
    return (0, _compose.compose)((0, _array.join)(''), (0, _list.map)(function (str) {
      return ucaseFirst(str.toLowerCase());
    }), (0, _list.filter)(function (x) {
      return !!x;
    }), (0, _string.split)(pattern))((0, _errorThrowing._errorIfNotType)(String, 'camelCase', 'xs', xs));
  },

  /**
   * Class cases a string.  Uses pattern /[^a-z\d/i]/ to split on.
   * If you require a different pattern use `string.camelCase(str, pattern)`
   * and then upper case first character (`ucaseFirst`).
   * @function module:string.classCase
   * @param xs {String}
   * @returns {string}
   * @throws {Error} - Throws error if `xs` is not a string (via `camelCase` call).
   */
  classCase = (0, _compose.compose)(ucaseFirst, camelCase);
  /**
   * Functional version of `String.prototype.split`.
   * @function module:string.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */


  _exports.classCase = classCase;
  _exports.camelCase = camelCase;
  _exports.ucaseFirst = ucaseFirst;
  _exports.lcaseFirst = lcaseFirst;
  _exports.unlines = unlines;
  _exports.unwords = unwords;
  _exports.words = words;
  _exports.lines = lines;
});