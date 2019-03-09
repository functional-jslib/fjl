"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeOf_1 = require("./typeOf");
const of_1 = require("./of");
exports.copy = (x, out) => {
    if (!x) {
        return x;
    }
    switch (typeOf_1.typeOf(x)) {
        case Array.name:
            return !out ? x.slice(0) : Object.assign(out, x);
        case Symbol.name:
        case Boolean.name:
        case String.name:
        case Number.name:
        case Promise.name:
        case Function.name:
        case 'NaN':
        case 'Null':
        case 'Undefined':
            return x;
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return new x.constructor(Array.from(x));
        default:
            return Object.assign(!out ? of_1.of(x) : out, x);
    }
};
exports.default = exports.copy;
//# sourceMappingURL=copy.js.map