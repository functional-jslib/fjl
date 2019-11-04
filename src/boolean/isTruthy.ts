import {UnaryPred} from "../types";

/**
 * Returns whether `value` is 'truthy' or not
 * @function module:boolean.isTruthy
 * @param value
 * @returns {Boolean}
 */
const isTruthy: UnaryPred<any> = value => !!value;

export default isTruthy;
