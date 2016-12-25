/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assignDeep = assignDeep;
exports.assign = assign;

var _is = require('./is');

var hasOwnProperty = Object.prototype.hasOwnProperty;

function assignDeep(obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return objs.reduce(function (topAgg, obj) {
        return Object.keys(obj).reduce(function (agg, key) {
            var propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (hasOwnProperty.call(agg, key) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
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
}

function assign(obj0) {
    for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        objs[_key2 - 1] = arguments[_key2];
    }

    if (Object.assign) {
        return Object.assign.apply(Object, [obj0].concat(objs));
    }
    return objs.reduce(function (topAgg, obj) {
        return Object.keys(obj).reduce(function (agg, key) {
            agg[key] = obj[key];
            return agg;
        }, topAgg);
    }, obj0);
}

exports.default = {
    assign: assign,
    assignDeep: assignDeep
};