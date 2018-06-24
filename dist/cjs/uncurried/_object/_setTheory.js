'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._objComplement = exports._objDifference = exports._objIntersect = exports._objUnion = undefined;

var _assignDeep2 = require('./_assignDeep');

var _object = require('../_jsPlatform/_object');

var _list = require('../_list/_list');

var _objUnion = exports._objUnion = function _objUnion(obj1, obj2) {
    return (0, _assignDeep2._assignDeep)(obj1, obj2);
},
    _objIntersect = exports._objIntersect = function _objIntersect(obj1, obj2) {
    return (0, _list._foldl)(function (agg, key) {
        if ((0, _object._hasOwnProperty)(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, (0, _object.keys)(obj1));
},
    _objDifference = exports._objDifference = function _objDifference(obj1, obj2) {
    return (0, _list._foldl)(function (agg, key) {
        if (!(0, _object._hasOwnProperty)(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, (0, _object.keys)(obj1));
},
    _objComplement = exports._objComplement = function _objComplement(obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return (0, _list._foldl)(function (agg, obj) {
        return (0, _assignDeep2._assignDeep)(agg, _objDifference(obj, obj0));
    }, {}, objs);
};