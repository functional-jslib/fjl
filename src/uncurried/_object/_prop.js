/**
 * @memberOf _object
 */

import {isset} from './_is';

/**
 * Returns property value if found; Else `undefined`.
 * @note This method is null/undefined safe (will not throw on `null` or `undefined`).
 * @function module:object._prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
export const _prop = (name, obj) => isset(obj) ? obj[name] : undefined;
