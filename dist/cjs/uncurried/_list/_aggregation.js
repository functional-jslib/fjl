'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.aggregatorByType = exports.aggregateObj = exports.aggregateArr = exports.aggregateStr = undefined;

var _object = require('../_object/_object');

var aggregateStr = exports.aggregateStr = function aggregateStr(agg, item) {
    return agg + item;
},
    aggregateArr = exports.aggregateArr = function aggregateArr(agg, item) {
    agg.push(item);
    return agg;
},
    aggregateObj = exports.aggregateObj = function aggregateObj(agg, item, ind) {
    agg[ind] = item;
    return agg;
},
    aggregatorByType = exports.aggregatorByType = function aggregatorByType(x) {
    switch ((0, _object.typeOf)(x)) {
        case 'String':
            return aggregateStr;
        case 'Array':
            return aggregateArr;
        case 'Object':
        default:
            return aggregateObj;
    }
};