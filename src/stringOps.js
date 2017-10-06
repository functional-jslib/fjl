/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module stringOps
 */
import {intercalate} from './listOps';

import {split} from './jsPlatform/string';

export const

    /**
     * Splits a stringOps on all '\n', '\r', '\n\r', or '\r\n' characters.
     * @function module:stringOps.lines
     * @param str {String}
     * @returns {Array}
     */
    lines = split(/[\n\r]/gm),

    /**
     * Splits a stringOps on all '\s' and/or all '\t' characters.
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
    unlines = intercalate('\n');
