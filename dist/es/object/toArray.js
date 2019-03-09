"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeOf_1 = require("./typeOf");
const assocList_1 = require("./assocList");
exports.toArray = x => {
    switch (typeOf_1.typeOf(x)) {
        case 'Null':
        case 'Undefined':
            return [];
        case String.name:
        case Array.name:
        case 'WeakMap':
        case 'WeakSet':
        case 'Map':
        case 'Set':
            return Array.from(x);
        case Object.name:
        default:
            return assocList_1.toAssocList(x);
    }
};
//# sourceMappingURL=toArray.js.map