/**
 * @memberOf objectOps_
 */

/**
 * Returns property value if found; Else `undefined`.
 * @function module:objectOps_.prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
export const prop = (name, obj) => obj[name];
