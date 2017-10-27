/**
 * Created by elydelacruz on 9/6/2017.
 * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
 * throughout the library.  @note Doesn't include all methods for objects just the ones used in
 *  the library.
 * @todo change all files named '*UnCurried' to '*_'.
 */

import {fPureTakes2, fPureTakesOne} from '../utils_';

export const

    /**
     * Returns whether constructor has derived objectOps.
     * @function module:jsPlatform_objectOps_.instanceOf
     * @param instanceConstructor {Function} - Constructor.
     * @param instance {*}
     * @instance {*}
     * @returns {Boolean}
     */
    instanceOf = (instanceConstructor, instance) =>
        instance instanceof instanceConstructor,

    /**
     * @function module:jsPlatform_objectOps_.hasOwnProperty
     * @param propName {*}
     * @param typeInstance {*}
     * @returns {Boolean}
     */
    hasOwnProperty = fPureTakesOne('hasOwnProperty'),

    /**
     * @function module:jsPlatform_objectOps_.length
     * @param x {*}
     * @returns {Number}
     * @throws {Error} - Throws an error if value doesn't have a `length` property (
     *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
     */
    length = x => x.length,

    /**
     * @function module:jsPlatform_objectOps_.hasOwnProperty
     * @param x {*}
     * @returns {Number}
     * @throws {Error} - Throws an error if value doesn't have a `toString`.
     */
    toString = x => x.toString(),

    /**
     * Gets own enumerable keys of passed in object (`Object.keys`).
     * @function module:jsPlatform_objectOps_.keys
     * @param obj {*}
     * @returns {Array<String>}
     */
    keys = obj => Object.keys(obj),

    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @function module:jsPlatform_objectOps_.assign
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

    defineProperty = (propName, propDescriptor, obj) =>
        Object.defineProperty(obj, propName, propDescriptor),

    defineProperties = (propDescriptors, obj) =>
        Object.defineProperties(obj, propDescriptors),

    defineEnumProp = (propName, propDescriptor, obj) =>
        defineProperty(propName,
            assign({enumerable: true}, propDescriptor),
            obj),

    defineEnumNumber = (propName, obj, defaultValue = undefined) => {
        let _value = defaultValue;
        defineEnumProp(propName, {
            get: function () { return _value; },
            set: function () { }
        });
    };

Object.getOwnPropertyNames(Object)
    .filter(name => Object[name].length > 1)
    .reduce((agg, name) => {
        switch (length(agg[name])) {
            case 2:
                agg[name] = fPureTakes2(name);
                break;
            case 3:
                agg[name] = fPureTakes3(name);
                break;
            case 4:
                agg[name] = fPureTakes4(name);
                break;
            case 5:
                agg[name] = fPureTakes5(name);
                break;
            default:
                agg[name] = fPureTakesOne(name);
                break;
        }
        return agg;
    }, {});

export {

};

