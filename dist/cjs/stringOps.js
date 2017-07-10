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
exports.unlines = exports.unwords = exports.words = exports.lines = exports.split = undefined;

var _arrayOperators = require('./arrayOperators');

var _curry = require('./curry');

var

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
unwords = exports.unwords = (0, _arrayOperators.join)('\s'),


/**
 * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
 * @function module:stringOps.unlines
 * @param str {String}
 * @returns {Array}
 */
unlines = exports.unlines = (0, _arrayOperators.join)('\n');

exports.default = {
  split: split,
  lines: lines,
  unlines: unlines,
  words: words,
  unwords: unwords
};