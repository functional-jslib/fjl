(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './assignDeep', '../jsPlatform/objectUncurried', '../listOpsUncurried'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./assignDeep'), require('../jsPlatform/objectUncurried'), require('../listOpsUncurried'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.assignDeep, global.objectUncurried, global.listOpsUncurried);
        global.setTheory = mod.exports;
    }
})(this, function (exports, _assignDeep, _objectUncurried, _listOpsUncurried) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;
    var objUnion = exports.objUnion = function objUnion(obj1, obj2) {
        return (0, _assignDeep.assignDeep)(obj1, obj2);
    },
        objIntersect = exports.objIntersect = function objIntersect(obj1, obj2) {
        return (0, _listOpsUncurried.foldl)(function (agg, key) {
            if ((0, _objectUncurried.hasOwnProperty)(key, obj2)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {}, (0, _objectUncurried.keys)(obj1));
    },
        objDifference = exports.objDifference = function objDifference(obj1, obj2) {
        return (0, _listOpsUncurried.foldl)(function (agg, key) {
            if (!(0, _objectUncurried.hasOwnProperty)(key, obj2)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {}, (0, _objectUncurried.keys)(obj1));
    },
        objComplement = exports.objComplement = function objComplement(obj0) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }

        return (0, _listOpsUncurried.foldl)(function (agg, obj) {
            return (0, _assignDeep.assignDeep)(agg, objDifference(obj, obj0));
        }, {}, objs);
    };
});