/**
 * @module boolean
 * @description Contains functional version of 'always-true', 'always-false', 'is-truthy', and 'is-falsy'.
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
