"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("./function/curry");
exports.fPureTakesOne = name => curry_1.curry((arg, f) => f[name](arg)), exports.fPureTakes2 = name => curry_1.curry((arg1, arg2, f) => f[name](arg1, arg2)), exports.fPureTakes3 = name => curry_1.curry((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3)), exports.fPureTakes4 = name => curry_1.curry((arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4)), exports.fPureTakes5 = name => curry_1.curry((arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5)), exports.fPureTakesOneOrMore = name => curry_1.curry2((f, ...args) => f[name](...args));
//# sourceMappingURL=utils.js.map