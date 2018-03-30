/**
 * Created by elydelacruz on 9/6/2017.
 */

import {fPureTakesOne} from '../_objectOps/_utils';

/**
 * Functional version of `String.prototype.split`.
 * @function module:_stringOps.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
export const split = fPureTakesOne('split');
