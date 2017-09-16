/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 */
import {intercalate} from '../listOps/listOps';

import {curry} from '../functionOps/curry';

import {split as pureSplit} from '../uncurried/jsPlatform/stringOpsUnCurried';

/**
 * Functional version of `String.prototype.split`.
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
let split = curry(pureSplit);

export const

    /**
     * Splits a stringOps on all '\n', '\r', '\n\r', or '\r\n' characters.
     * @functionOps module:stringOps.lines
     * @param str {String}
     * @returns {Array}
     */
    lines = split(/[\n\r]/gm),

    /**
     * Splits a stringOps on all '\s' and/or all '\t' characters.
     * @functionOps module:stringOps.words
     * @param str{String}
     * @returns {Array}
     */
    words = split(/[\s\t]/gm),

    /**
     * Intersperse an array of strings with '\s' and then concats them.
     * @functionOps module:stringOps.unwords
     * @param arr {String}
     * @returns {Array}
     */
    unwords = intercalate(' '),

    /**
     * Intersperses a '\n' character into a list of strings and then concats it.
     * @functionOps module:stringOps.unlines
     * @param list {Array|String|*}
     * @returns {Array}
     */
    unlines = intercalate('\n');
