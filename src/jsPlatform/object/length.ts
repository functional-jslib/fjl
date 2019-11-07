/**
 * @function module:jsPlatform/object.length
 * @param x {{length: number}}
 * @returns {Number}
 */
const length = (x: any): number => !x ? 0 : x.length;

export default length;
