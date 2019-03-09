"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./is");
const curry_1 = require("../function/curry");
exports.lookup = curry_1.curry((key, obj) => is_1.isset(obj) ? obj[key] : undefined);
//# sourceMappingURL=lookup.js.map