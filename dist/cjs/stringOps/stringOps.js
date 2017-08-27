'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unlines = exports.unwords = exports.words = exports.lines = exports.split = undefined;

var _listOps = require('../listOps/listOps');

var _curry = require('../functionOps/curry');

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 */
var

/**
 * Functional version of `String.prototype.split`.
 * @functionOps module:stringOps.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
split = exports.split = (0, _curry.curry)(function (separator, str) {
  return str ? str.split(separator) : [];
}),


/**
 * Splits a stringOps on all '\n', '\r', '\n\r', or '\r\n' characters.
 * @functionOps module:stringOps.lines
 * @param str {String}
 * @returns {Array}
 */
lines = exports.lines = split(/[\n\r]/gm),


/**
 * Splits a stringOps on all '\s' and/or all '\t' characters.
 * @functionOps module:stringOps.words
 * @param str{String}
 * @returns {Array}
 */
words = exports.words = split(/[\s\t]/gm),


/**
 * Intersperse an array of strings with '\s' and then concats them.
 * @functionOps module:stringOps.unwords
 * @param arr {String}
 * @returns {Array}
 */
unwords = exports.unwords = (0, _listOps.intercalate)('\s'),


/**
 * Intersperses a '\n' character into a list of strings and then concats it.
 * @functionOps module:stringOps.unlines
 * @param list {Array|String|*}
 * @returns {Array}
 */
unlines = exports.unlines = (0, _listOps.intercalate)('\n');