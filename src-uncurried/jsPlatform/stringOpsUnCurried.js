/**
 * Created by elydelacruz on 9/6/2017.
 */

import {fPureTakesOne} from "../../src/utils/utils";

/**
 * Functional version of `String.prototype.split`.
 * @functionOps module:stringOpsUnCurried.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
export const split = fPureTakesOne('split');
