
/**
 * Gets passed in object's own enumerable keys (same as `Object.keys` but safe (doesn't throw
 *  on `undefined`/`null`).
 * @function module:jsPlatform/object.keys
 * @param x {*}
 * @returns {Array<String>}
 */
const keys = (x?: any): string[] => !x ? [] : Object.keys(x);

export default keys;
