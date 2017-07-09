/**
 * Contains functions for operating strings.
 * @author elyde
 * @module stringOps {{join: Function, split: Function, lines: Function, words: Function, unlines: Function, unwords: Function}}
 * @created 7/9/2017.
 */

'use strict';
import {curry2} from './curry';

export const
    /**
     * Functional version of `Array.prototype.join`.
     * @function module:stringOps.join
     * @param separator {String|RegExp}
     * @param arr {Array}
     * @returns {String}
     */
    join = curry2((separator, arr) => arr ? arr.join(separator) : ''),

    /**
     * Functional version of `String.prototype.split`.
     * @function module:stringOps.split
     * @param separator {String|RegExp}
     * @param str {String}
     * @returns {Array}
     */
    split = curry2((separator, str) => str ? str.split(separator) : []),

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
     * Joins an array of strings with '\s'.
     * @function module:stringOps.unwords
     * @param arr {String}
     * @returns {Array}
     */
    unwords = join('\s'),

    /**
     * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
     * @function module:stringOps.unlines
     * @param str {String}
     * @returns {Array}
     */
    unlines = join('\n');

export default {
    join,
    split,
    lines,
    unlines,
    words,
    unwords
};
