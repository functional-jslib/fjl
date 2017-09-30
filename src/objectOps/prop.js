/**
 * @memberOf objectOps
 */

import {curry} from   '../functionOps/curry';

/**
 * Returns property value if found; Else `undefined`.
 * @function module:objectOps.prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
export const prop = curry((name, obj) => obj[name]);
