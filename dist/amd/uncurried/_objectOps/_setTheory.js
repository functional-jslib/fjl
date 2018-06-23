define(['exports', './_assignDeep', '../_jsPlatform/_object', '../_listOps/_listOps'], function (exports, _assignDeep2, _object, _listOps) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports._objComplement = exports._objDifference = exports._objIntersect = exports._objUnion = undefined;
    const _objUnion = exports._objUnion = (obj1, obj2) => (0, _assignDeep2._assignDeep)(obj1, obj2),
          _objIntersect = exports._objIntersect = (obj1, obj2) => (0, _listOps._foldl)((agg, key) => {
        if ((0, _object._hasOwnProperty)(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, (0, _object.keys)(obj1)),
          _objDifference = exports._objDifference = (obj1, obj2) => (0, _listOps._foldl)((agg, key) => {
        if (!(0, _object._hasOwnProperty)(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, (0, _object.keys)(obj1)),
          _objComplement = exports._objComplement = (obj0, ...objs) => (0, _listOps._foldl)((agg, obj) => (0, _assignDeep2._assignDeep)(agg, _objDifference(obj, obj0)), {}, objs);
});