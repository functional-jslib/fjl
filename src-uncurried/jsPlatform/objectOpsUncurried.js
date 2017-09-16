/**
 * Created by elydelacruz on 9/6/2017.
 * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
 * throughout the library.  @note Doesn't include all methods for objects just the ones used in
 *  the library.
 * @todo change all files named '*UnCurried' to '*Uncurried'.
 */

import {typeOf} from '../../src/objectOps/typeOf';

import {fPureTakesOne} from '../../src/utils/utils';

export const

    /**
     * Returns a boolean indicating whether a "value" is a pure object or not.
     * @function module:jsPlatform.objectOpsUncurried.isObject
     * @param x {*}
     * @returns {Boolean}
     */
    isObject = x => typeOf(x) === 'Object',

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
            }, obj0))(),

    /**
     * Merges all objects down into one.
     * @function module:jsPlatform.objectOpsUncurried.assignDeep
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assignDeep = (obj0, ...objs) =>
        objs.reduce((topAgg, obj) =>
            keys(obj).reduce((agg, key) => {
                let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if (hasOwnProperty(key, agg) && propDescription &&
                    !(propDescription.get && propDescription.set) &&
                    !propDescription.writable) {
                    return agg;
                }
                if (isObject(agg[key]) && isObject(obj[key])) {
                    assignDeep(agg[key], obj[key]);
                }
                else { agg[key] = obj[key]; }
                return agg;
            }, topAgg)
        , obj0);
