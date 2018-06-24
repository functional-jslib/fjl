/**
 * @memberOf object
 */

import {isset} from './is';
import {curry} from '../function/curry';

/**
 * Returns property value if found; Else `undefined`.
 * @note This method is null/undefined safe (will not throw on `null` or `undefined`).
 * @function module:object.prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
export const prop = curry((name, obj) => isset(obj) ? obj[name] : undefined);
