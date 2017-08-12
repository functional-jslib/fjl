/**
 * Created by elyde on 7/15/2017.
 */

import {curry2} from '../functionOps/curry';

export {isTruthy, isFalsy} from './is';

export const

    /**
     * Returns whether both values are truthy or not.
     * @function module:booleanOps.and
     * @param a {*}
     * @param b {*}
     * @returns {Boolean}
     */
    and = curry2((a, b) => a && b),

    /**
     * Returns whether one of the two passed in values
     *  are truthy or not.
     * @function module:booleanOps.or
     * @param a {*}
     * @param b {*}
     * @returns {Boolean}
     */
    or = curry2((a, b) => a || b),

    /**
     * Returns whether passed in value is truthy or not.
     * @function module:booleanOps.not
     * @param x {*}
     * @returns {Boolean}
     */
    not = x => !x,

    /**
     * Returns `true` - Makes code more readable in places.
     * @tentative
     * @function module:booleanOps.otherwise
     * @returns {Boolean} - Always true
     */
    otherwise = () => true,

    /**
     * Returns whether both values passed in are equal or not.
     * @function module:booleanOps.equal
     * @param a {*}
     * @param b {*}
     * @returns {Boolean}
     */
    equal = curry2((a, b) => a === b);
