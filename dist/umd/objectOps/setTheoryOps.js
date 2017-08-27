(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../functionOps/curry', './objectPrelude', '../listOps/listOps'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../functionOps/curry'), require('./objectPrelude'), require('../listOps/listOps'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.objectPrelude, global.listOps);
        global.setTheoryOps = mod.exports;
    }
})(this, function (exports, _curry, _objectPrelude, _listOps) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;
    var objUnion = exports.objUnion = (0, _curry.curry)(function (obj1, obj2) {
        return (0, _objectPrelude.assignDeep)(obj1, obj2);
    }),
        objIntersect = exports.objIntersect = (0, _curry.curry)(function (obj1, obj2) {
        return (0, _listOps.foldl)(function (agg, key) {
            if ((0, _objectPrelude.hasOwnProperty)(key, obj2)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {}, (0, _objectPrelude.keys)(obj1));
    }),
        objDifference = exports.objDifference = (0, _curry.curry)(function (obj1, obj2) {
        return (0, _listOps.foldl)(function (agg, key) {
            if (!(0, _objectPrelude.hasOwnProperty)(key, obj2)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {}, (0, _objectPrelude.keys)(obj1));
    }),
        objComplement = exports.objComplement = (0, _curry.curry2)(function (obj0) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }

        return (0, _listOps.foldl)(function (agg, obj) {
            return (0, _objectPrelude.assignDeep)(agg, objDifference(obj, obj0));
        }, {}, objs);
    });
});