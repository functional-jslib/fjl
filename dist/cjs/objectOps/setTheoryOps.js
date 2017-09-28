'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;

var _curry = require('../functionOps/curry');

var _objectUncurried = require('../uncurried/jsPlatform/objectUncurried');

var _assignDeep = require('../uncurried/objectOps/assignDeep');

var _listOps = require('../listOps/listOps');

var objUnion = exports.objUnion = (0, _curry.curry)(function (obj1, obj2) {
    return (0, _assignDeep.assignDeep)(obj1, obj2);
}),
    objIntersect = exports.objIntersect = (0, _curry.curry)(function (obj1, obj2) {
    return (0, _listOps.foldl)(function (agg, key) {
        if ((0, _objectUncurried.hasOwnProperty)(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, (0, _objectUncurried.keys)(obj1));
}),
    objDifference = exports.objDifference = (0, _curry.curry)(function (obj1, obj2) {
    return (0, _listOps.foldl)(function (agg, key) {
        if (!(0, _objectUncurried.hasOwnProperty)(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, (0, _objectUncurried.keys)(obj1));
}),
    objComplement = exports.objComplement = (0, _curry.curry2)(function (obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return (0, _listOps.foldl)(function (agg, obj) {
        return (0, _assignDeep.assignDeep)(agg, objDifference(obj, obj0));
    }, {}, objs);
});