define(['exports', '../utils', '../function/curry'], function (exports, _utils, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assign = exports.keys = exports.length = exports.hasOwnProperty = exports.instanceOf = undefined;
    /**
     * @memberOf object
     * @description Defines some of the platform methods for objects (the ones used within `fjl`).
     */

    const

    /**
     * Returns whether constructor has derived object.
     * @function module:_jsPlatformobject.instanceOf
     * @param instanceConstructor {Function} - Constructor.
     * @param instance {*}
     * @instance {*}
     * @returns {Boolean}
     */
    instanceOf = exports.instanceOf = (0, _curry.curry)((instanceConstructor, instance) => instance instanceof instanceConstructor),


    /**
     * @function module:_jsPlatformobject.hasOwnProperty
     * @param propName {*}
     * @param typeInstance {*}
     * @returns {Boolean}
     */
    hasOwnProperty = exports.hasOwnProperty = (0, _utils.fPureTakesOne)('hasOwnProperty'),


    /**
     * @function module:_jsPlatformobject.length
     * @param x {*}
     * @returns {Number}
     * @throws {Error} - Throws an error if value doesn't have a `length` property (
     *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
     */
    length = exports.length = x => x.length,


    /**
     * Gets own enumerable keys of passed in object (`Object.keys`).
     * @function module:_jsPlatformobject.keys
     * @param obj {*}
     * @returns {Array<String>}
     */
    { keys } = Object,


    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @function module:_jsPlatformobject.assign
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assign = exports.assign = (() => Object.assign ? (obj0, ...objs) => Object.assign(obj0, ...objs) : (0, _curry.curry2)((obj0, ...objs) => objs.reduce((topAgg, obj) => {
        return keys(obj).reduce((agg, key) => {
            agg[key] = obj[key];
            return agg;
        }, topAgg);
    }, obj0)))();
    exports.keys = keys;
});