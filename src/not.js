/**
 * Created by elyde on 12/18/2016.
 */

'use strict';

import {isEmpty} from './is';
import {typeOfIs} from './typeOf';

/**
 * Retruns a boolean based on whether a key on an object has an empty value or is empty (not set, undefined, null)
 * @function module:sjl.notOfTypeOrEmpty
 * @param value {Object} - Object to search on.
 * @param type {String} - Optional. Type Name to check for match for;  E.g., 'Number', 'Array', 'HTMLMediaElement' etc..
 * @returns {Boolean}
 */
export function notOfTypeOrEmpty (value, type) {
    return isEmpty(value) || !typeOfIs(value, type);
}

/**
 * Returns true if an element is not empty and is of type.
 * @function module:sjl.notEmptyAndOfType
 * @param value {*} - Value to check.
 * @param type {String|Function} - Type to check against (string name or actual constructor).
 * @returns {Boolean}
 */
export function notEmptyAndOfType (value, type) {
    return !isEmpty(value) && typeOfIs(value, type);
}

export default {
    notOfTypeOrEmpty,
    notEmptyAndOfType
};
