import {toCurried2Method} from "../../utils";
import {Join} from "./types";

/**
 * Array.prototype.join
 * @function module:platform.join
 * @param separator {String|RegExp}
 * @param arr {Array}
 * @returns {String}
 */
const join = toCurried2Method('join') as Join<any, any[], any>;

export default join;
