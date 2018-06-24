/**
 * Created by elyde on 7/15/2017.
 * @module boolean
 */

export const

    /**
     * Returns whether `value` is 'truthy' or not
     * @function module:boolean.isTruthy
     * @param value
     * @returns {Boolean}
     */
    isTruthy = value => !!value,

    /**
     * Returns whether `value` is 'falsy' or not
     * @function module:boolean.isFalsy
     * @param value
     * @returns {Boolean}
     */
    isFalsy = value => !value,

    /**
     * Returns `true`.
     * @function module:boolean.alwaysTrue
     * @returns {Boolean}
     */
    alwaysTrue = () => true,

    /**
     * Returns `false`.
     * @function module:boolean.alwaysFalse
     * @returns {Boolean}
     */
    alwaysFalse = () => false;
