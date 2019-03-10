/**
 * @description Defines some of the platform methods for objects (the ones used within `fjl`).
 */

import {fPureTakesOne} from '../utils';
import {curry, curry2} from '../function/curry';
import {flip, flip3, flip4, flip5} from '../function/flip';
import {Lengthable} from "../../index";

export const

    /**
     * Returns whether constructor has derived object.
     * @function module:object.instanceOf
     * @param instanceConstructor {Function} - Constructor.
     * @param instance {*}
     * @instance {*}
     * @returns {Boolean}
     */
    instanceOf = curry((instanceConstructor, instance) =>
        instance instanceof instanceConstructor),

    /**
     * @function module:object.hasOwnProperty
     * @param propName {*}
     * @param typeInstance {*}
     * @returns {Boolean}
     * @deprecated - Use property directly instead.
     */
    hasOwnProperty = fPureTakesOne('hasOwnProperty'),

    /**
     * @function module:object.length
     * @param x {*}
     * @returns {Number}
     * @throws {Error} - Throws an error if value doesn't have a `length` property (
     *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
     */
    length = (x?: Lengthable): number | undefined => x ? x.length : undefined,

    /**
     * Contains all the static functions from `Object` but curried and flipped;
     * @example
     * // E.g., `Object.defineProperties(obj, descriptor)` can now be used like
     * import {defineProperties} from 'fjl'
     * defineProperties(descriptor, someObj),
     * // Et. al.
     * @memberOf module:object
     * @type {{...Object}}
     */
    native = Object.getOwnPropertyNames(Object).reduce((agg, key) => {
        if (typeof Object[key] !== 'function') {
            return agg;
        }
        const operation = Object[key];
        switch (operation.length) {
            case 2:
                agg[key] = flip(operation);
                break;
            case 3:
                agg[key] = flip3(operation);
                break;
            case 4:
                agg[key] = flip4(operation);
                break;
            case 5:
                agg[key] = flip5(operation);
                break;
            default:
                agg[key] = Object[key];
                break;
        }
        return agg;
    }, {keys: (x: any) : string[] => []}),

    /**
     * Gets passed in object's own enumerable keys (same as `Object.keys`).
     * @function module:object.keys
     * @param obj {*}
     * @returns {Array<String>}
     */
    {keys} = native,

    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @function module:object.assign
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assign = (() => Object.assign ?
            (obj0, ...objs) => Object.assign(obj0, ...objs) :
            curry2((obj0, ...objs) => objs.reduce((topAgg, obj) => {
                return Object.keys(obj).reduce((agg, key) => {
                    agg[key] = obj[key];
                    return agg;
                }, topAgg);
            }, obj0))
        )();
