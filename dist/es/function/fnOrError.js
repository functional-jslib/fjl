"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeOf_1 = require("../object/typeOf");
exports.fnOrError = (symbolName, f) => {
    if (!f || !(f instanceof Function)) {
        throw new Error(`${symbolName} should be a function. ` +
            `Type received: ${typeOf_1.typeOf(f)};  Value received: ${f}.`);
    }
    return f;
};
//# sourceMappingURL=fnOrError.js.map