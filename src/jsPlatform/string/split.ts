/**
 * Created by elydelacruz on 9/6/2017.
 */

import {toCurried2Method} from '../../utils';
import {SplitFunc} from "./types";

/**
 * Functional version of `String.prototype.split`.
 * @function module:jsPlatform.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
const split = toCurried2Method('split') as SplitFunc;

export default split;
