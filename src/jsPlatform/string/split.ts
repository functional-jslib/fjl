/**
 * Created by elydelacruz on 9/6/2017.
 */

import {fPureTakesOne} from '../../utils';
import {SplitFunc} from "./types";

/**
 * Functional version of `String.prototype.split`.
 * @function module:jsPlatform.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
const split = fPureTakesOne('split') as SplitFunc;

export default split;
