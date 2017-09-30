(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../objectOpsUncurried'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../objectOpsUncurried'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.objectOpsUncurried);
        global.aggregation = mod.exports;
    }
})(this, function (exports, _objectOpsUncurried) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.aggregatorByType = exports.aggregateObj = exports.aggregateArr = exports.aggregateStr = undefined;
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
        switch ((0, _objectOpsUncurried.typeOf)(x)) {
            case 'String':
                return aggregateStr;
            case 'Array':
                return aggregateArr;
            case 'Object':
            default:
                return aggregateObj;
        }
    };
});