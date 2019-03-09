"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assignDeep_1 = require("./assignDeep");
const object_1 = require("../jsPlatform/object");
const utils_1 = require("../list/utils");
const curry_1 = require("../function/curry");
exports.objUnion = curry_1.curry((obj1, obj2) => assignDeep_1.assignDeep(obj1, obj2)), exports.objIntersect = curry_1.curry((obj1, obj2) => utils_1.reduce((agg, key) => {
    if (obj2.hasOwnProperty(key)) {
        agg[key] = obj2[key];
    }
    return agg;
}, {}, object_1.keys(obj1))), exports.objDifference = curry_1.curry((obj1, obj2) => utils_1.reduce((agg, key) => {
    if (!obj2.hasOwnProperty(key)) {
        agg[key] = obj1[key];
    }
    return agg;
}, {}, object_1.keys(obj1))), exports.objComplement = curry_1.curry2((obj0, ...objs) => utils_1.reduce((agg, obj) => assignDeep_1.assignDeep(agg, exports.objDifference(obj, obj0)), {}, objs));
//# sourceMappingURL=setTheory.js.map