"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../jsPlatform/array");
exports.compose = (...args) => arg0 => array_1.reduceRight((value, fn) => fn(value), arg0, args);
//# sourceMappingURL=compose.js.map