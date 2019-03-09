"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./is");
const curry_1 = require("../function/curry");
exports.searchObj = curry_1.curry((nsString, obj) => {
    if (!obj) {
        return obj;
    }
    if (nsString.indexOf('.') === -1) {
        return obj[nsString];
    }
    const parts = nsString.split('.'), limit = parts.length;
    let ind = 0, parent = obj;
    for (; ind < limit; ind += 1) {
        const node = parent[parts[ind]];
        if (!is_1.isset(node)) {
            return node;
        }
        parent = node;
    }
    return parent;
});
//# sourceMappingURL=searchObj.js.map