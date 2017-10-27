'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defineEnumNumber = exports.defineEnumProp = exports.defineProperties = exports.defineProperty = exports.assign = exports.keys = exports.toString = exports.length = exports.hasOwnProperty = exports.instanceOf = undefined;

var _utils_ = require('../utils_');

var

/**
 * Returns whether constructor has derived objectOps.
 * @function module:jsPlatform_objectOps_.instanceOf
 * @param instanceConstructor {Function} - Constructor.
 * @param instance {*}
 * @instance {*}
 * @returns {Boolean}
 */
instanceOf = exports.instanceOf = function instanceOf(instanceConstructor, instance) {
    return instance instanceof instanceConstructor;
},


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
length = exports.length = function length(x) {
    return x.length;
},


/**
 * @function module:jsPlatform_objectOps_.hasOwnProperty
 * @param x {*}
 * @returns {Number}
 * @throws {Error} - Throws an error if value doesn't have a `toString`.
 */
toString = exports.toString = function toString(x) {
    return x.toString();
},


/**
 * Gets own enumerable keys of passed in object (`Object.keys`).
 * @function module:jsPlatform_objectOps_.keys
 * @param obj {*}
 * @returns {Array<String>}
 */
keys = exports.keys = function keys(obj) {
    return Object.keys(obj);
},


/**
 * Defined as `Object.assign` else is the same thing but shimmed.
 * @function module:jsPlatform_objectOps_.assign
 * @param obj0 {Object}
 * @param objs {...{Object}}
 * @returns {Object}
 */
assign = exports.assign = function () {
    return Object.assign ? function (obj0) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }

        return Object.assign.apply(Object, [obj0].concat(objs));
    } : function (obj0) {
        for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            objs[_key2 - 1] = arguments[_key2];
        }

        return objs.reduce(function (topAgg, obj) {
            return keys(obj).reduce(function (agg, key) {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    };
}(),
    defineProperty = exports.defineProperty = function defineProperty(propName, propDescriptor, obj) {
    return Object.defineProperty(obj, propName, propDescriptor);
},
    defineProperties = exports.defineProperties = function defineProperties(propDescriptors, obj) {
    return Object.defineProperties(obj, propDescriptors);
},
    defineEnumProp = exports.defineEnumProp = function defineEnumProp(propName, propDescriptor, obj) {
    return defineProperty(propName, assign({ enumerable: true }, propDescriptor), obj);
},
    defineEnumNumber = exports.defineEnumNumber = function defineEnumNumber(propName, obj) {
    var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    var _value = defaultValue;
    defineEnumProp(propName, {
        get: function get() {
            return _value;
        },
        set: function set() {}
    });
}; /**
    * Created by elydelacruz on 9/6/2017.
    * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
    * throughout the library.  @note Doesn't include all methods for objects just the ones used in
    *  the library.
    * @todo change all files named '*UnCurried' to '*_'.
    */

Object.getOwnPropertyNames(Object).filter(function (name) {
    return Object[name].length > 1;
}).reduce(function (agg, name) {
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