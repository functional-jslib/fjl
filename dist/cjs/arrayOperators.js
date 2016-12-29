/**
 * Created by elyde on 12/29/2016.
 */
/**
 * Created by elyde on 12/10/2016.
 * Set functions for arrects.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.complement = exports.difference = exports.intersect = exports.union = exports.flattenMulti = exports.flatten = exports.reduceRight = exports.reduce = exports.map = exports.filter = exports.join = exports.concat = undefined;

var _curry = require('./curry');

var concat = exports.concat = (0, _curry.curry2)(function (arr1, arr2) {
    return arr1.concat(arr2);
}),
    join = exports.join = (0, _curry.curry2)(function (arr, delimiter) {
    return arr.join(delimiter);
}),
    filter = exports.filter = (0, _curry.curry2)(function (fn, arr) {
    return arr.filter(fn);
}),
    map = exports.map = (0, _curry.curry2)(function (fn, arr) {
    return arr.map(fn);
}),
    reduce = exports.reduce = (0, _curry.curry2)(function (fn, agg, arr) {
    return arr.reduce(fn, agg);
}),
    reduceRight = exports.reduceRight = (0, _curry.curry2)(function (fn, agg, arr) {
    return arr.reduceRight(fn, agg);
}),
    flatten = exports.flatten = function flatten(arr) {
    return arr.reduce(function (agg, elm) {
        if (Array.isArray(elm)) {
            return concat(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, []);
},
    flattenMulti = exports.flattenMulti = (0, _curry.curry2)(function (arr0) {
    for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arrays[_key - 1] = arguments[_key];
    }

    return reduce(function (agg, arr) {
        return concat(agg, flatten(arr));
    }, flatten(arr0), arrays);
}),
    union = exports.union = (0, _curry.curry2)(function (arr1, arr2) {
    var whereNotInArray2 = function whereNotInArray2(elm) {
        return arr2.indexOf(elm) === -1;
    };
    return concat(arr1, filter(whereNotInArray2, arr1));
}),
    intersect = exports.intersect = (0, _curry.curry2)(function (arr1, arr2) {
    return filter(function (elm) {
        return arr2.indexOf(elm) > -1;
    }, arr1);
}),
    difference = exports.difference = (0, _curry.curry2)(function (arr1, arr2) {
    return reduce(function (agg, elm) {
        if (arr2.indexOf(elm) === -1) {
            agg.push(elm);
        }
        return agg;
    }, [], arr1);
}),
    complement = exports.complement = (0, _curry.curry2)(function (arr0) {
    for (var _len2 = arguments.length, arrays = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        arrays[_key2 - 1] = arguments[_key2];
    }

    return reduce(function (agg, arr) {
        return concat(agg, difference(arr, arr0));
    }, [], arrays);
});

exports.default = {
    complement: complement,
    difference: difference,
    intersect: intersect,
    union: union,
    concat: concat,
    filter: filter,
    join: join,
    map: map,
    reduce: reduce,
    reduceRight: reduceRight,
    flatten: flatten,
    flattenMulti: flattenMulti
};