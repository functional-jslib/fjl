/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.complement = exports.difference = exports.intersect = exports.union = undefined;

var _assign = require('./assign');

var hasOwnProperty = Object.prototype.hasOwnProperty;

var union = exports.union = function union(obj1, obj2) {
    return (0, _assign.assignDeep)(obj1, obj2);
},
    intersect = exports.intersect = function intersect(obj1, obj2) {
    return Object.keys(obj1).reduce(function (agg, key) {
        if (hasOwnProperty.call(obj2, key)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {});
},
    difference = exports.difference = function difference(obj1, obj2) {
    return Object.keys(obj1).reduce(function (agg, key) {
        if (!hasOwnProperty.call(obj2, key)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {});
},
    complement = exports.complement = function complement(obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return objs.reduce(function (agg, obj) {
        return (0, _assign.assignDeep)(agg, difference(obj, obj0));
    }, {});
};

exports.default = {
    complement: complement,
    difference: difference,
    intersect: intersect,
    union: union
};