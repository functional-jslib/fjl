"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./is");
const object_1 = require("../jsPlatform/object");
const curry_1 = require("../function/curry");
exports.assignDeep = curry_1.curry2((obj0, ...objs) => !obj0 ? obj0 : objs.reduce((topAgg, obj) => !obj ? topAgg : object_1.keys(obj).reduce((agg, key) => {
    let propDescription = Object.getOwnPropertyDescriptor(agg, key);
    if (agg.hasOwnProperty(key) && propDescription &&
        !(propDescription.get && propDescription.set) &&
        !propDescription.writable) {
        return agg;
    }
    if (is_1.isObject(agg[key]) && is_1.isObject(obj[key])) {
        exports.assignDeep(agg[key], obj[key]);
    }
    else {
        agg[key] = obj[key];
    }
    return agg;
}, topAgg), obj0));
//# sourceMappingURL=assignDeep.js.map