/**
 * Created by elyde on 12/10/2016.
 */

'use strict';

/**
 * Returns copy of object using JSON stringify/parse.
 * @function module:sjl.jsonClone
 * @param obj {Object} - Object to clone.
 * @returns {*} - Cloned object.
 */
export default function jsonClone (obj) {
    return JSON.parse(JSON.stringify(obj));
}
