'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.complement = exports.difference = exports.intersect = exports.union = exports.keys = exports.length = exports.toString = exports.hasOwnProperty = exports.assign = exports.assignDeep = undefined;

var _curry = require('./curry');

var _is = require('./is');

/**
 * @returns {Function}
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
            return Object.keys(obj).reduce(function (agg, key) {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    };
}

var

/**
 * Merges all objects down into one.
 * @function module:assign.assignDeep
 * @param obj0 {Object}
 * @param objs {...{Object}}
 * @returns {Object}
 */
assignDeep = exports.assignDeep = function assignDeep(obj0) {
    for (var _len3 = arguments.length, objs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        objs[_key3 - 1] = arguments[_key3];
    }

    return objs.reduce(function (topAgg, obj) {
        return Object.keys(obj).reduce(function (agg, key) {
            var propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (agg.hasOwnProperty(key) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
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
},


/**
 * Defined as `Object.assign` else is the same thing but shimmed.
 * @function module:assign.assign
 * @param obj0 {Object}
 * @param objs {...{Object}}
 * @returns {Object}
 */
assign = exports.assign = defineAssign(),
    hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry2)(function (x, propName) {
    return x.hasOwnProperty(propName);
}),
    toString = exports.toString = function toString(obj) {
    return obj.toString();
},
    length = exports.length = function length(x) {
    return x.length;
},
    keys = exports.keys = function keys(x) {
    return Object.keys(x);
},
    union = exports.union = (0, _curry.curry2)(function (obj1, obj2) {
    return assignDeep(obj1, obj2);
}),
    intersect = exports.intersect = (0, _curry.curry2)(function (obj1, obj2) {
    return Object.keys(obj1).reduce(function (agg, key) {
        if (hasOwnProperty(obj2, key)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {});
}),
    difference = exports.difference = (0, _curry.curry2)(function (obj1, obj2) {
    return Object.keys(obj1).reduce(function (agg, key) {
        if (!hasOwnProperty(obj2, key)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {});
}),
    complement = exports.complement = (0, _curry.curry2)(function (obj0) {
    for (var _len4 = arguments.length, objs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        objs[_key4 - 1] = arguments[_key4];
    }

    return objs.reduce(function (agg, obj) {
        return assignDeep(agg, difference(obj, obj0));
    }, {});
});

exports.default = {
    hasOwnProperty: hasOwnProperty,
    length: length,
    assign: assign,
    assignDeep: assignDeep,
    complement: complement,
    difference: difference,
    intersect: intersect,
    union: union
};