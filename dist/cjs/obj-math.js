/**
 * Created by elyde on 12/10/2016.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.subtractObj = subtractObj;
function subtractObj(obj1, obj2) {
    return Object.keys(obj1).reduce(function (agg, key) {
        if (!obj2.hasOwnProperty(key)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {});
}

exports.default = {
    subtractObj: subtractObj
};