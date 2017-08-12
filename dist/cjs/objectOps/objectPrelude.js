'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assignDeep = exports.assign = exports.keys = exports.length = exports.hasOwnProperty = exports.instanceOf = undefined;

var _instanceOf = require('./instanceOf');

Object.defineProperty(exports, 'instanceOf', {
    enumerable: true,
    get: function get() {
        return _instanceOf.instanceOf;
    }
});

var _curry = require('../functionOps/curry');

var _is = require('./is');

var _utils = require('../utils/utils');

var _prop = require('./prop');

/**
 * @returns {Function}
 */
/**
 * Created by elydelacruz on 7/22/2017.
 */
/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

function defineAssign() {
    if (Object.assign) {
        return function (obj0) {
            for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                objs[_key - 1] = arguments[_key];
            }

            return Object.assign.apply(Object, [obj0].concat(objs));
        };
    }
    return function (obj0) {
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
}

var hasOwnProperty = exports.hasOwnProperty = (0, _utils.fPureTakesOne)('hasOwnProperty'),
    length = exports.length = (0, _prop.prop)('length'),
    keys = exports.keys = function keys(obj) {
    return Object.keys(obj);
},


/**
 * Defined as `Object.assign` else is the same thing but shimmed.
 * @functionOps module:assign.assign
 * @param obj0 {Object}
 * @param objs {...{Object}}
 * @returns {Object}
 */
assign = exports.assign = (0, _curry.curry2)(defineAssign()),


/**
 * Merges all objects down into one.
 * @functionOps module:assign.assignDeep
 * @param obj0 {Object}
 * @param objs {...{Object}}
 * @returns {Object}
 */
assignDeep = exports.assignDeep = (0, _curry.curry2)(function (obj0) {
    for (var _len3 = arguments.length, objs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        objs[_key3 - 1] = arguments[_key3];
    }

    return objs.reduce(function (topAgg, obj) {
        return keys(obj).reduce(function (agg, key) {
            var propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (hasOwnProperty(key, agg) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
                return agg;
            }
            if ((0, _is.isObject)(agg[key]) && (0, _is.isObject)(obj[key])) {
                assignDeep(agg[key], obj[key]);
            } else {
                agg[key] = obj[key];
            }
            return agg;
        }, topAgg);
    }, obj0);
});