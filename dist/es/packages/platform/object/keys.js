/**
 * Gets passed in object's own enumerable keys (same as `Object.keys` but safe (doesn't throw
 *  on `undefined`/`null`).
 * @function module:platform/object.keys
 * @param x {*}
 * @returns {Array<String>}
 */
const keys = (x) => !x ? [] : Object.keys(x);
export default keys;
//# sourceMappingURL=keys.js.map