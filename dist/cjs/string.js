'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.classCase = exports.camelCase = exports.ucaseFirst = exports.lcaseFirst = exports.unlines = exports.unwords = exports.words = exports.lines = undefined;

var _list = require('./list');

var _string = require('./jsPlatform/string');

var _compose = require('./function/compose');

var _array = require('./jsPlatform/array');

var _errorThrowing = require('./object/errorThrowing');

var

/**
 * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
 * @function module:string.lines
 * @param str {String}
 * @returns {Array}
 */
lines = exports.lines = (0, _string.split)(/[\n\r]/gm),


/**
 * Splits a string on all '\s' and/or all '\t' characters.
 * @function module:string.words
 * @param str{String}
 * @returns {Array}
 */
words = exports.words = (0, _string.split)(/[\s\t]/gm),


/**
 * Intersperse an array of strings with '\s' and then concats them.
 * @function module:string.unwords
 * @param arr {String}
 * @returns {Array}
 */
unwords = exports.unwords = (0, _list.intercalate)(' '),


/**
 * Intersperses a '\n' character into a list of strings and then concats it.
 * @function module:string.unlines
 * @param list {Array|String|*}
 * @returns {Array}
 */
unlines = exports.unlines = (0, _list.intercalate)('\n'),


/**
 * Lower cases first character of a non-empty string.
 * @function module:string.lcaseFirst
 * @param xs {String}
 * @returns {string}
 * @throws {Error} - Throws error if receiving anything that is not a string.
 */
lcaseFirst = exports.lcaseFirst = function lcaseFirst(xs) {
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
ucaseFirst = exports.ucaseFirst = function ucaseFirst(xs) {
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
camelCase = exports.camelCase = function camelCase(xs) {
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
classCase = exports.classCase = (0, _compose.compose)(ucaseFirst, camelCase); /**
                                                                               * Contains functions for operating strings.
                                                                               * @author elyde
                                                                               * @created 7/9/2017.
                                                                               * @module string
                                                                               */