define(['exports', '../utils_'], function (exports, _utils_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.defineEnumNumber = exports.defineEnumProp = exports.defineProperties = exports.defineProperty = exports.assign = exports.keys = exports.toString = exports.length = exports.hasOwnProperty = exports.instanceOf = undefined;
    const

    /**
     * Returns whether constructor has derived objectOps.
     * @function module:jsPlatform_objectOps_.instanceOf
     * @param instanceConstructor {Function} - Constructor.
     * @param instance {*}
     * @instance {*}
     * @returns {Boolean}
     */
    instanceOf = exports.instanceOf = (instanceConstructor, instance) => instance instanceof instanceConstructor,


    /**
     * @function module:jsPlatform_objectOps_.hasOwnProperty
     * @param propName {*}
     * @param typeInstance {*}
     * @returns {Boolean}
     */
    hasOwnProperty = exports.hasOwnProperty = (0, _utils_.fPureTakesOne)('hasOwnProperty'),


    /**
     * @function module:jsPlatform_objectOps_.length
     * @param x {*}
     * @returns {Number}
     * @throws {Error} - Throws an error if value doesn't have a `length` property (
     *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
     */
    length = exports.length = x => x.length,


    /**
     * @function module:jsPlatform_objectOps_.hasOwnProperty
     * @param x {*}
     * @returns {Number}
     * @throws {Error} - Throws an error if value doesn't have a `toString`.
     */
    toString = exports.toString = x => x.toString(),


    /**
     * Gets own enumerable keys of passed in object (`Object.keys`).
     * @function module:jsPlatform_objectOps_.keys
     * @param obj {*}
     * @returns {Array<String>}
     */
    keys = exports.keys = obj => Object.keys(obj),


    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @function module:jsPlatform_objectOps_.assign
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assign = exports.assign = (() => Object.assign ? (obj0, ...objs) => Object.assign(obj0, ...objs) : (obj0, ...objs) => objs.reduce((topAgg, obj) => {
        return keys(obj).reduce((agg, key) => {
            agg[key] = obj[key];
            return agg;
        }, topAgg);
    }, obj0))(),
          defineProperty = exports.defineProperty = (propName, propDescriptor, obj) => Object.defineProperty(obj, propName, propDescriptor),
          defineProperties = exports.defineProperties = (propDescriptors, obj) => Object.defineProperties(obj, propDescriptors),
          defineEnumProp = exports.defineEnumProp = (propName, propDescriptor, obj) => defineProperty(propName, assign({ enumerable: true }, propDescriptor), obj),
          defineEnumNumber = exports.defineEnumNumber = (propName, obj, defaultValue = undefined) => {
        let _value = defaultValue;
        defineEnumProp(propName, {
            get: function () {
                return _value;
            },
            set: function () {}
        });
    }; /**
        * Created by elydelacruz on 9/6/2017.
        * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
        * throughout the library.  @note Doesn't include all methods for objects just the ones used in
        *  the library.
        * @todo change all files named '*UnCurried' to '*_'.
        */

    Object.getOwnPropertyNames(Object).filter(name => Object[name].length > 1).reduce((agg, name) => {
        switch (length(Object[name])) {
            case 2:
                agg[name] = (0, _utils_.fPureTakes2)(name);
                break;
            case 3:
                agg[name] = (0, _utils_.fPureTakes3)(name);
                break;
            case 4:
                agg[name] = (0, _utils_.fPureTakes4)(name);
                break;
            case 5:
                agg[name] = (0, _utils_.fPureTakes5)(name);
                break;
            default:
                agg[name] = (0, _utils_.fPureTakesOne)(name);
                break;
        }
        return agg;
    }, {});
});