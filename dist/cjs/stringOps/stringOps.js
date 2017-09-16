'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unlines = exports.unwords = exports.words = exports.lines = undefined;

var _listOps = require('../listOps/listOps');

var _stringOps = require('../jsPlatform/stringOps');

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 */
var

/**
 * Splits a stringOps on all '\n', '\r', '\n\r', or '\r\n' characters.
 * @functionOps module:stringOps.lines
 * @param str {String}
 * @returns {Array}
 */
lines = exports.lines = (0, _stringOps.split)(/[\n\r]/gm),


/**
 * Splits a stringOps on all '\s' and/or all '\t' characters.
 * @functionOps module:stringOps.words
 * @param str{String}
 * @returns {Array}
 */
words = exports.words = (0, _stringOps.split)(/[\s\t]/gm),


/**
 * Intersperse an array of strings with '\s' and then concats them.
 * @functionOps module:stringOps.unwords
 * @param arr {String}
 * @returns {Array}
 */
unwords = exports.unwords = (0, _listOps.intercalate)(' '),


/**
 * Intersperses a '\n' character into a list of strings and then concats it.
 * @functionOps module:stringOps.unlines
 * @param list {Array|String|*}
 * @returns {Array}
 */
unlines = exports.unlines = (0, _listOps.intercalate)('\n');