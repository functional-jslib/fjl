"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("../jsPlatform/object");
const curry_1 = require("../function/curry");
const typeOf_1 = require("../object/typeOf");
const of_1 = require("../object/of");
const is_1 = require("../object/is");
const map = curry_1.curry((fn, xs) => {
    if (!is_1.isset(xs)) {
        return xs;
    }
    let out = of_1.of(xs), limit, i = 0;
    switch (typeOf_1.typeOf(xs)) {
        case 'Array':
            limit = object_1.length(xs);
            if (!limit) {
                return out;
            }
            for (; i < limit; i += 1) {
                out.push(fn(xs[i], i, xs));
            }
            return out;
        case 'String':
            limit = object_1.length(xs);
            if (!xs) {
                return out;
            }
            for (; i < limit; i += 1) {
                out += fn(xs[i], i, xs);
            }
            return out;
        default:
            if (is_1.isFunctor(xs)) {
                return xs.map(fn);
            }
            return Object.keys(xs).reduce((agg, key) => {
                out[key] = fn(xs[key], key, xs);
                return out;
            }, out);
    }
});
exports.default = map;
//# sourceMappingURL=map.js.map