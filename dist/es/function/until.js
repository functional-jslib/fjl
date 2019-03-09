"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("./curry");
exports.until = curry_1.curry((predicate, operation, typeInstance) => {
    let result = typeInstance;
    while (!predicate(result)) {
        result = operation(result);
    }
    return result;
});
//# sourceMappingURL=until.js.map