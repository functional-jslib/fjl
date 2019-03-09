"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../function/curry");
exports.apply = curry_1.curry((fn, args) => fn.apply(null, args)), exports.call = curry_1.curry2((fn, ...args) => fn.call(null, ...args));
//# sourceMappingURL=function.js.map