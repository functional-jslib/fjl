/**
 * Created by elyde on 12/18/2016.
 */

'use strict';

import {isEmpty} from './is';
import {typeOfIs} from './typeOf';

/**
 * Returns true if an element is not empty and is of type.
 * @function module:sjl.notEmptyAndOfType
 * @param value {*} - Value to check.
 * @param type {String|Function} - Type to check against (string name or actual constructor).
 * @returns {Boolean}
 */
export function notEmptyAndOfType (value, type) {
    return !isEmpty(value) && typeOfIs(type, value);
}

export default {
    notEmptyAndOfType
};
