'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.keys = exports.assign = exports.length = exports.hasOwnProperty = exports.instanceOf = undefined;

var _utils = require('../utils');

var _curry = require('../function/curry');

/**
 * Returns whether constructor has derived object.
 * @function module:_jsPlatformobject.instanceOf
 * @param instanceConstructor {Function} - Constructor.
 * @param instance {*}
 * @instance {*}
 * @returns {Boolean}
 */
/**
 * Created by elydelacruz on 9/6/2017.
 * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
 * throughout the library.  @note Doesn't include all methods for objects just the ones used in
 *  the library.
 * @todo change all files named '*UnCurried' to '*_'.
 */

var instanceOf = (0, _curry.curry)(function (instanceConstructor, instance) {
    return instance instanceof instanceConstructor;
}),
    hasOwnProperty = (0, _utils.fPureTakesOne)('hasOwnProperty'),
    length = function length(x) {
    return x.length;
},
    keys = Object.keys,
    assign = function () {
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
}();

exports.instanceOf = instanceOf;
exports.hasOwnProperty = hasOwnProperty;
exports.length = length;
exports.assign = assign;
exports.keys = keys;