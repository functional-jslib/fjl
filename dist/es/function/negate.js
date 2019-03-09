"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../jsPlatform/function");
const curry_1 = require("./curry");
exports.negateF = fn => x => !fn(x), exports.negateF2 = fn => curry_1.curry((a, b) => !fn(a, b)), exports.negateF3 = fn => curry_1.curry((a, b, c) => !fn(a, b, c)), exports.negateFN = fn => curry_1.curry2((...args) => !function_1.apply(fn, args));
//# sourceMappingURL=negate.js.map