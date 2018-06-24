define(['exports', './is', '../jsPlatform/object', '../jsPlatform/function'], function (exports, _is, _object, _function) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.of = undefined;


    /**
     * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
     * ```
     * // - If exists `(value).constructor.of` uses this.
     * // - If value is of one String, Boolean, Symbol, or Number types calls it's
     * //      constructor as a function (in cast form;  E.g., `constructor(...args)` )
     * // - Else if constructor is a function, thus far, then calls constructor using
     * //      the `new` keyword (with any passed in args).
     * ```
     * @function module:object.of
     * @param x {*} - Value to derive returned value's type from.
     * @param [args] {...*} - Any args to pass in to matched construction strategy.
     * @returns {*|undefined} - New value of given value's type else `undefined`.
     */
    const of = exports.of = (x, ...args) => {
        if (!(0, _is.isset)(x)) {
            return undefined;
        }
        const constructor = x.constructor;
        if ((0, _object.hasOwnProperty)('of', constructor)) {
            return (0, _function.apply)(constructor.of, args);
        } else if ((0, _is.isUsableImmutablePrimitive)(x)) {
            return (0, _function.apply)(constructor, args);
        } else if ((0, _is.isFunction)(constructor)) {
            return new constructor(...args);
        }
        return undefined;
    };
});