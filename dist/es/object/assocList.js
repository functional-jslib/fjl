"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./is");
const object_1 = require("../jsPlatform/object");
exports.toAssocList = obj => object_1.keys(obj).map(key => [key, obj[key]]), exports.toAssocListDeep = (obj, TypeConstraint = Object) => object_1.keys(obj).map(key => TypeConstraint && is_1.isType(TypeConstraint, obj[key]) ?
    [key, exports.toAssocListDeep(obj[key], TypeConstraint)] :
    [key, obj[key]]), exports.fromAssocList = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
    agg[key] = value;
    return agg;
}, new OutType()), exports.fromAssocListDeep = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
    if (is_1.isArray(value) && is_1.isArray(value[0]) && value[0].length === 2) {
        agg[key] = exports.fromAssocListDeep(value, OutType);
        return agg;
    }
    agg[key] = value;
    return agg;
}, new OutType());
//# sourceMappingURL=assocList.js.map