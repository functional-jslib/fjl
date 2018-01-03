define(['exports', './assignDeep_', '../_jsPlatform/object_', '../_listOps'], function (exports, _assignDeep_, _object_, _listOps) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;
    const objUnion = exports.objUnion = (obj1, obj2) => (0, _assignDeep_.assignDeep)(obj1, obj2),
          objIntersect = exports.objIntersect = (obj1, obj2) => (0, _listOps.foldl)((agg, key) => {
        if ((0, _object_.hasOwnProperty)(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, (0, _object_.keys)(obj1)),
          objDifference = exports.objDifference = (obj1, obj2) => (0, _listOps.foldl)((agg, key) => {
        if (!(0, _object_.hasOwnProperty)(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, (0, _object_.keys)(obj1)),
          objComplement = exports.objComplement = (obj0, ...objs) => (0, _listOps.foldl)((agg, obj) => (0, _assignDeep_.assignDeep)(agg, objDifference(obj, obj0)), {}, objs);
});