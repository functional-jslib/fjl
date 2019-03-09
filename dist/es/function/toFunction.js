"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("../object/is");
exports.toFunction = x => is_1.isFunction(x) ? x : () => x;
//# sourceMappingURL=toFunction.js.map