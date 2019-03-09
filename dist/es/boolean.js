"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("./function/curry");
exports.isTruthy = value => !!value, exports.isFalsy = value => !value, exports.alwaysTrue = () => true, exports.alwaysFalse = () => false, exports.equal = curry_1.curry((a, b) => a === b), exports.equalAll = curry_1.curry2((a, ...args) => args.every(b => exports.equal(a, b)));
//# sourceMappingURL=boolean.js.map