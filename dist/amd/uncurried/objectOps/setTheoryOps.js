define(['exports', './assignDeep', '../jsPlatform/objectUncurried', '../listOps/listOpsUncurried'], function (exports, _assignDeep, _objectUncurried, _listOpsUncurried) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;
    const objUnion = exports.objUnion = (obj1, obj2) => (0, _assignDeep.assignDeep)(obj1, obj2),
          objIntersect = exports.objIntersect = (obj1, obj2) => (0, _listOpsUncurried.foldl)((agg, key) => {
        if ((0, _objectUncurried.hasOwnProperty)(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, (0, _objectUncurried.keys)(obj1)),
          objDifference = exports.objDifference = (obj1, obj2) => (0, _listOpsUncurried.foldl)((agg, key) => {
        if (!(0, _objectUncurried.hasOwnProperty)(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, (0, _objectUncurried.keys)(obj1)),
          objComplement = exports.objComplement = (obj0, ...objs) => (0, _listOpsUncurried.foldl)((agg, obj) => (0, _assignDeep.assignDeep)(agg, objDifference(obj, obj0)), {}, objs);
});