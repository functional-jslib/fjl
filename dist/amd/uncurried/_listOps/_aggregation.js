define(['exports', '../_object/_object'], function (exports, _objectOps) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.aggregatorByType = exports.aggregateObj = exports.aggregateArr = exports.aggregateStr = undefined;
    const aggregateStr = exports.aggregateStr = (agg, item) => agg + item,
          aggregateArr = exports.aggregateArr = (agg, item) => {
        agg.push(item);
        return agg;
    },
          aggregateObj = exports.aggregateObj = (agg, item, ind) => {
        agg[ind] = item;
        return agg;
    },
          aggregatorByType = exports.aggregatorByType = x => {
        switch ((0, _objectOps.typeOf)(x)) {
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