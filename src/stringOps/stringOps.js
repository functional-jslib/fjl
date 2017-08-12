/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 */
import {join} from '../listOps/listOpsPrelude';

import {curry} from '../functionOps/curry';

export const

    /**
     * Functional version of `String.prototype.split`.
     * @functionOps module:stringOps.split
     * @param separator {String|RegExp}
     * @param str {String}
     * @returns {Array}
     */
    split = curry((separator, str) => {
        return str ? str.split(separator) : [];
    }),

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
     * Joins an arrayOps of strings with '\s'.
     * @functionOps module:stringOps.unwords
     * @param arr {String}
     * @returns {Array}
     */
    unwords = join('\s'),

    /**
     * Splits a stringOps on all '\n', '\r', '\n\r', or '\r\n' characters.
     * @functionOps module:stringOps.unlines
     * @param str {String}
     * @returns {Array}
     */
    unlines = join('\n');
