"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../jsPlatform/array");
const function_1 = require("../jsPlatform/function");
const curry_1 = require("./curry");
exports.flipN = fn => curry_1.curry2((...args) => function_1.apply(fn, array_1.reverse(args))), exports.flip = fn => curry_1.curry((b, a) => function_1.call(fn, a, b)), exports.flip3 = fn => curry_1.curry((c, b, a) => function_1.call(fn, a, b, c)), exports.flip4 = fn => curry_1.curry((d, c, b, a) => function_1.call(fn, a, b, c, d)), exports.flip5 = fn => curry_1.curry((e, d, c, b, a) => function_1.call(fn, a, b, c, d, e));
//# sourceMappingURL=flip.js.map