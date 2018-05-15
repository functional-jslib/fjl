/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module stringOps
 */
import {intercalate, map, filter} from './listOps';
import {split} from './jsPlatform/string';
import {compose} from './uncurried/_functionOps/_compose';
import {join} from './jsPlatform/array';

export const

    /**
     * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
     * @function module:stringOps.lines
     * @param str {String}
     * @returns {Array}
     */
    lines = split(/[\n\r]/gm),

    /**
     * Splits a string on all '\s' and/or all '\t' characters.
     * @function module:stringOps.words
     * @param str{String}
     * @returns {Array}
     */
    words = split(/[\s\t]/gm),

    /**
     * Intersperse an array of strings with '\s' and then concats them.
     * @function module:stringOps.unwords
     * @param arr {String}
     * @returns {Array}
     */
    unwords = intercalate(' '),

    /**
     * Intersperses a '\n' character into a list of strings and then concats it.
     * @function module:stringOps.unlines
     * @param list {Array|String|*}
     * @returns {Array}
     */
    unlines = intercalate('\n'),

    /**
     * Lower cases first character of a non-empty string.
     * @function module:stringOps.lcaseFirst
     * @param xs {String}
     * @returns {string}
     */
    lcaseFirst = xs => xs[0].toLowerCase() + xs.substring(1),

    /**
     * Upper cases first character of a non-empty string.
     * @function module:stringOps.ucaseFirst
     * @param xs {String}
     * @returns {string}
     */
    ucaseFirst = xs => xs[0].toUpperCase() + xs.substring(1),

    /**
     * Camel cases (class case) a string.
     * @function module:stringOps.camelCase
     * @param xs {String}
     * @param [pattern=/[^a-z\d/i]/] {RegExp} - Pattern to split on.  Optional.
     * @returns {string}
     */
    camelCase = (xs, pattern) => compose(
            join(''),
            map(str => ucaseFirst(str.toLowerCase())),
            filter(x => !!x),
            split(pattern || /[^a-z\d]/i)
        )(xs)
    ;
