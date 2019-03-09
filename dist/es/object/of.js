"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./is");
const function_1 = require("../jsPlatform/function");
exports.of = (x, ...args) => {
    if (!is_1.isset(x)) {
        return undefined;
    }
    const constructor = x.constructor;
    if (constructor.hasOwnProperty('of')) {
        return function_1.apply(constructor.of, args);
    }
    else if (is_1.isUsableImmutablePrimitive(x)) {
        return function_1.apply(constructor, args);
    }
    else if (is_1.isFunction(constructor)) {
        return new constructor(...args);
    }
    return undefined;
};
//# sourceMappingURL=of.js.map