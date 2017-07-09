(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './curry'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./curry'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry);
    global.stringOps = mod.exports;
  }
})(this, function (exports, _curry) {
  /**
   * Contains functions for operating strings.
   * @author elyde
   * @module stringOps {{join: Function, split: Function, lines: Function, words: Function, unlines: Function, unwords: Function}}
   * @created 7/9/2017.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.unlines = exports.unwords = exports.words = exports.lines = exports.split = exports.join = undefined;
  var
  /**
   * Functional version of `Array.prototype.join`.
   * @function module:stringOps.join
   * @param separator {String|RegExp}
   * @param arr {Array}
   * @returns {String}
   */
  join = exports.join = (0, _curry.curry2)(function (separator, arr) {
    return arr ? arr.join(separator) : '';
  }),


  /**
   * Functional version of `String.prototype.split`.
   * @function module:stringOps.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  split = exports.split = (0, _curry.curry2)(function (separator, str) {
    return str ? str.split(separator) : [];
  }),


  /**
   * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
   * @function module:stringOps.lines
   * @param str {String}
   * @returns {Array}
   */
  lines = exports.lines = split(/[\n\r]/gm),


  /**
   * Splits a string on all '\s' and/or all '\t' characters.
   * @function module:stringOps.words
   * @param str{String}
   * @returns {Array}
   */
  words = exports.words = split(/[\s\t]/gm),


  /**
   * Joins an array of strings with '\s'.
   * @function module:stringOps.unwords
   * @param arr {String}
   * @returns {Array}
   */
  unwords = exports.unwords = join('\s'),


  /**
   * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
   * @function module:stringOps.unlines
   * @param str {String}
   * @returns {Array}
   */
  unlines = exports.unlines = join('\n');

  exports.default = {
    join: join,
    split: split,
    lines: lines,
    unlines: unlines,
    words: words,
    unwords: unwords
  };
});