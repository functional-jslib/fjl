/**
 * Created by elyde on 7/15/2017.
 * @module booleanOps
 */

import {curry2} from  '../functionOps/curry';

export {isTruthy, isFalsy} from './is';

export const

    /**
     * Returns `true`.
     * @function module:booleanOps.alwaysTrue
     * @returns {Boolean}
     */
    alwaysTrue = () => true,

    /**
     * Returns `false`.
     * @function module:booleanOps.alwaysFalse
     * @returns {Boolean}
     */
    alwaysFalse = () => false,

    /**
     * Returns whether both values are truthy or not.
     * @function module:booleanOps.bAnd
     * @param a {*}
     * @param b {*}
     * @returns {Boolean}
     */
    bAnd = curry2((a, b) => a && b),

    /**
     * Returns whether one of the two passed in values
     *  are truthy or not.
     * @function module:booleanOps.bOr
     * @param a {*}
     * @param b {*}
     * @returns {Boolean}
     */
    bOr = curry2((a, b) => a || b),

    /**
     * Returns whether passed in value is truthy or not.
     * @function module:booleanOps.bNot
     * @param x {*}
     * @returns {Boolean}
     */
    bNot = x => !x,

    /**
     * Returns `true` - Makes code more readable in places.
     * @tentative
     * @function module:booleanOps.otherwise
     * @returns {Boolean} - Always true
     */
    bOtherwise = alwaysTrue,

    /**
     * Returns whether both values passed in are equal or not.
     * @function module:booleanOps.bEqual
     * @param a {*}
     * @param b {*}
     * @returns {Boolean}
     */
    bEqual = curry2((a, b) => a === b);
