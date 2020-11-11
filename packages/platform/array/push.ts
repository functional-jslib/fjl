import {toCurried2Method} from "../../utils";
import {Push} from "./types";

/**
 * Same as Array.prototype.push
 * @function module:platform.push
 * @param item {*}
 * @param arr {Array}
 * @returns {Number}
 */
const push = toCurried2Method('push') as Push<any, any[]>;

export default push;
