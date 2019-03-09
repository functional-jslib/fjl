"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const curry_1 = require("../function/curry");
const flip_1 = require("../function/flip");
exports.instanceOf = curry_1.curry((instanceConstructor, instance) => instance instanceof instanceConstructor), exports.hasOwnProperty = utils_1.fPureTakesOne('hasOwnProperty'), exports.length = x => x.length, exports.native = Object.getOwnPropertyNames(Object).reduce((agg, key) => {
    if (typeof Object[key] !== 'function') {
        return agg;
    }
    const operation = Object[key];
    switch (operation.length) {
        case 2:
            agg[key] = flip_1.flip(operation);
            break;
        case 3:
            agg[key] = flip_1.flip3(operation);
            break;
        case 4:
            agg[key] = flip_1.flip4(operation);
            break;
        case 5:
            agg[key] = flip_1.flip5(operation);
            break;
        default:
            agg[key] = Object[key];
            break;
    }
    return agg;
}, { keys: (x) => [] }), exports.keys = exports.native.keys, exports.assign = (() => Object.assign ?
    (obj0, ...objs) => Object.assign(obj0, ...objs) :
    curry_1.curry2((obj0, ...objs) => objs.reduce((topAgg, obj) => {
        return Object.keys(obj).reduce((agg, key) => {
            agg[key] = obj[key];
            return agg;
        }, topAgg);
    }, obj0)))();
//# sourceMappingURL=object.js.map