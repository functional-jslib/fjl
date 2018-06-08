(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './_assignDeep', '../_jsPlatform/_object', '../_listOps/_listOps'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./_assignDeep'), require('../_jsPlatform/_object'), require('../_listOps/_listOps'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._assignDeep, global._object, global._listOps);
        global._setTheory = mod.exports;
    }
})(this, function (exports, _assignDeep2, _object, _listOps) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports._objComplement = exports._objDifference = exports._objIntersect = exports._objUnion = undefined;
    var _objUnion = exports._objUnion = function _objUnion(obj1, obj2) {
        return (0, _assignDeep2._assignDeep)(obj1, obj2);
    },
        _objIntersect = exports._objIntersect = function _objIntersect(obj1, obj2) {
        return (0, _listOps._foldl)(function (agg, key) {
            if ((0, _object._hasOwnProperty)(key, obj2)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {}, (0, _object.keys)(obj1));
    },
        _objDifference = exports._objDifference = function _objDifference(obj1, obj2) {
        return (0, _listOps._foldl)(function (agg, key) {
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

        return (0, _listOps._foldl)(function (agg, obj) {
            return (0, _assignDeep2._assignDeep)(agg, _objDifference(obj, obj0));
        }, {}, objs);
    };
});