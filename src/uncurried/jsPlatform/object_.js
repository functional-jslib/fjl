/**
 * Created by elydelacruz on 9/6/2017.
 * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
 * throughout the library.  @note Doesn't include all methods for objects just the ones used in
 *  the library.
 * @todo change all files named '*UnCurried' to '*_'.
 */

import {fPureTakesOne} from '../../utils';

export const

    /**
     * Returns whether constructor has derived objectOps.
     * @function module:jsPlatform.objectOpsUncurried.instanceOf
     * @param instanceConstructor {Function} - Constructor.
     * @param instance {*}
     * @instance {*}
     * @returns {Boolean}
     */
    instanceOf = (instanceConstructor, instance) =>
        instance instanceof instanceConstructor,

    /**
     * @function module:jsPlatform.objectOpsUncurried.hasOwnProperty
     * @param propName {*}
     * @param typeInstance {*}
     * @returns {Boolean}
     */
    hasOwnProperty = fPureTakesOne('hasOwnProperty'),

    /**
     * @function module:jsPlatform.objectOpsUncurried.length
     * @param x {*}
     * @returns {Number}
     * @throws {Error} - Throws an error if value doesn't have a `length` property (
     *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
     */
    length = x => x.length,

    /**
     * @function module:jsPlatform.objectOpsUncurried.hasOwnProperty
     * @param x {*}
     * @returns {Number}
     * @throws {Error} - Throws an error if value doesn't have a `toString`.
     */
    toString = x => x.toString(),

    /**
     * Gets own enumerable keys of passed in object (`Object.keys`).
     * @function module:jsPlatform.objectOpsUncurried.keys
     * @param obj {*}
     * @returns {Array<String>}
     */
    keys = obj => Object.keys(obj),

    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @function module:jsPlatform.objectOpsUncurried.assign
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assign = (() =>
        Object.assign ?
            (obj0, ...objs) => Object.assign(obj0, ...objs) :
            (obj0, ...objs) => objs.reduce((topAgg, obj) => {
                return keys(obj).reduce((agg, key) => {
                    agg[key] = obj[key];
                    return agg;
                }, topAgg);
            }, obj0))();
