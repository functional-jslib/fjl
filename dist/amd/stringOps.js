define(['exports', './listOps', './jsPlatform/string', './uncurried/_functionOps/_compose', './jsPlatform/array', './uncurried/_object/_errorThrowing'], function (exports, _listOps, _string, _compose, _array, _errorThrowing) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.classCase = exports.camelCase = exports.ucaseFirst = exports.lcaseFirst = exports.unlines = exports.unwords = exports.words = exports.lines = undefined;
    const

    /**
     * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
     * @function module:stringOps.lines
     * @param str {String}
     * @returns {Array}
     */
    lines = exports.lines = (0, _string.split)(/[\n\r]/gm),


    /**
     * Splits a string on all '\s' and/or all '\t' characters.
     * @function module:stringOps.words
     * @param str{String}
     * @returns {Array}
     */
    words = exports.words = (0, _string.split)(/[\s\t]/gm),


    /**
     * Intersperse an array of strings with '\s' and then concats them.
     * @function module:stringOps.unwords
     * @param arr {String}
     * @returns {Array}
     */
    unwords = exports.unwords = (0, _listOps.intercalate)(' '),


    /**
     * Intersperses a '\n' character into a list of strings and then concats it.
     * @function module:stringOps.unlines
     * @param list {Array|String|*}
     * @returns {Array}
     */
    unlines = exports.unlines = (0, _listOps.intercalate)('\n'),


    /**
     * Lower cases first character of a non-empty string.
     * @function module:stringOps.lcaseFirst
     * @param xs {String}
     * @returns {string}
     * @throws {Error} - Throws error if receiving anything that is not a string.
     */
    lcaseFirst = exports.lcaseFirst = xs => {
        (0, _errorThrowing._errorIfNotType)(String, 'lcaseFirst', 'xs', xs);
        return xs[0].toLowerCase() + xs.substring(1);
    },


    /**
     * Upper cases first character of a non-empty string.
     * @function module:stringOps.ucaseFirst
     * @param xs {String}
     * @returns {string}
     * @throws {Error} - Throws error if receiving anything that is not a string.
     */
    ucaseFirst = exports.ucaseFirst = xs => {
        (0, _errorThrowing._errorIfNotType)(String, 'ucaseFirst', 'xs', xs);
        return xs[0].toUpperCase() + xs.substring(1);
    },


    /**
     * Camel cases (class case) a string.
     * @function module:stringOps.camelCase
     * @param xs {String}
     * @param [pattern=/[^a-z\d/i]/] {RegExp} - Pattern to split on.  Optional.
     * @throws {Error} - Throws error if param `xs` is not a string.
     * @returns {string}
     * @curried
     */
    camelCase = exports.camelCase = (xs, pattern = /[^a-z\d]/i) => (0, _compose.compose)((0, _array.join)(''), (0, _listOps.map)(str => ucaseFirst(str.toLowerCase())), (0, _listOps.filter)(x => !!x), (0, _string.split)(pattern))((0, _errorThrowing._errorIfNotType)(String, 'camelCase', 'xs', xs)),


    /**
     * Class cases a string.  Uses pattern /[^a-z\d/i]/ to split on.
     * If you require a different pattern use `stringOps.camelCase(str, pattern)`
     * and then upper case first character (`ucaseFirst`).
     * @function module:stringOps.classCase
     * @param xs {String}
     * @returns {string}
     * @throws {Error} - Throws error if `xs` is not a string (via `camelCase` call).
     */
    classCase = exports.classCase = (0, _compose.compose)(ucaseFirst, camelCase); /**
                                                                                   * Contains functions for operating strings.
                                                                                   * @author elyde
                                                                                   * @created 7/9/2017.
                                                                                   * @module stringOps
                                                                                   */
});