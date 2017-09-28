/**
 * Created by elydelacruz on 9/6/2017.
 * @module jsPlatform_string
 */

import {curry} from   '../functionOps/curry';

import {split as pureSplit} from '../uncurried/jsPlatform/stringUnCurried';

/**
 * Functional version of `String.prototype.split`.
 * @curried
 * @function module:jsPlatform_string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
export const split = curry(pureSplit);
