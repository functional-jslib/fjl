(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './assignDeep', '../jsPlatform/object', '../list', '../function/curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./assignDeep'), require('../jsPlatform/object'), require('../list'), require('../function/curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.assignDeep, global.object, global.list, global.curry);
        global.setTheory = mod.exports;
    }
})(this, function (exports, _assignDeep, _object, _list, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;
    var objUnion = exports.objUnion = (0, _curry.curry)(function (obj1, obj2) {
        return (0, _assignDeep.assignDeep)(obj1, obj2);
    }),
        objIntersect = exports.objIntersect = (0, _curry.curry)(function (obj1, obj2) {
        return (0, _list.foldl)(function (agg, key) {
            if ((0, _object.hasOwnProperty)(key, obj2)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {}, (0, _object.keys)(obj1));
    }),
        objDifference = exports.objDifference = (0, _curry.curry)(function (obj1, obj2) {
        return (0, _list.foldl)(function (agg, key) {
            if (!(0, _object.hasOwnProperty)(key, obj2)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {}, (0, _object.keys)(obj1));
    }),
        objComplement = exports.objComplement = (0, _curry.curry)(function (obj0) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }

        return (0, _list.foldl)(function (agg, obj) {
            return (0, _assignDeep.assignDeep)(agg, objDifference(obj, obj0));
        }, {}, objs);
    });
});