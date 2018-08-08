/**
 * @memberOf object
 * @description Defines some of the platform methods for objects (the ones used within `fjl`).
 */

import {fPureTakesOne} from '../utils';
import {curry, curry2} from '../function/curry';

export const

    /**
     * Returns whether constructor has derived object.
     * @function module:_jsPlatformobject.instanceOf
     * @param instanceConstructor {Function} - Constructor.
     * @param instance {*}
     * @instance {*}
     * @returns {Boolean}
     */
    instanceOf = curry((instanceConstructor, instance) =>
        instance instanceof instanceConstructor),

    /**
     * @function module:_jsPlatformobject.hasOwnProperty
     * @param propName {*}
     * @param typeInstance {*}
     * @returns {Boolean}
     */
    hasOwnProperty = fPureTakesOne('hasOwnProperty'),

    /**
     * @function module:_jsPlatformobject.length
     * @param x {*}
     * @returns {Number}
     * @throws {Error} - Throws an error if value doesn't have a `length` property (
     *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
     */
    length = x => x.length,

    /**
     * Gets own enumerable keys of passed in object (`Object.keys`).
     * @function module:_jsPlatformobject.keys
     * @param obj {*}
     * @returns {Array<String>}
     */
    {keys} = Object,

    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @function module:_jsPlatformobject.assign
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assign = (() => Object.assign ?
            (obj0, ...objs) => Object.assign(obj0, ...objs) :
            curry2((obj0, ...objs) => objs.reduce((topAgg, obj) => {
                return keys(obj).reduce((agg, key) => {
                    agg[key] = obj[key];
                    return agg;
                }, topAgg);
            }, obj0))
        )();
