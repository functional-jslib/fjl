"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trampoline = (fn, fnName) => {
    return (...args) => {
        let result = fn.apply(null, args);
        while (typeof result === 'function' &&
            (!fnName || (result.name === fnName))) {
            result = result();
        }
        return result;
    };
};
//# sourceMappingURL=trampoline.js.map