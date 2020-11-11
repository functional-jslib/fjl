import {UnaryPred} from "../types";

/**
 * Returns whether `value` is 'falsy' or not
 * @function module:boolean.isFalsy
 * @param value
 * @returns {Boolean}
 */
const isFalsy: UnaryPred<any> = value => !value;

export default isFalsy;
