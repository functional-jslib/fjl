/**
 * @memberOf _object
 */

import {isset} from './_is';

/**
 * Returns property value if found; Else `undefined`.
 * @note Is null/undefined safe (will not throw on `null` or `undefined` `obj`).
 * @function module:object._prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
export const _prop = (name, obj) => isset(obj) ? obj[name] : undefined;
