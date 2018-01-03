/**
 * Created by elydelacruz on 9/6/2017.
 * @module jsPlatform_string
 * @private
 */

import {curry} from '../uncurried/_functionOps/_curry';

import {split as _split} from '../uncurried/_jsPlatform/string_';

/**
 * Functional version of `String.prototype.split`.
 * @curried
 * @function module:jsPlatform_string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
export const split = curry(_split);
