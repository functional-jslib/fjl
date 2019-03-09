"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../jsPlatform/function");
const list_1 = require("../jsPlatform/list");
const object_1 = require("../jsPlatform/object");
const boolean_1 = require("../boolean");
const map_1 = require("./map");
const curry_1 = require("../function/curry");
__export(require("./aggregation"));
exports.sliceFrom = curry_1.curry((startInd, xs) => list_1.slice(startInd, undefined, xs)), exports.sliceTo = curry_1.curry((toInd, xs) => list_1.slice(0, toInd, xs)), exports.sliceCopy = exports.sliceFrom(0), exports.genericAscOrdering = curry_1.curry((a, b) => {
    if (a > b) {
        return 1;
    }
    else if (a < b) {
        return -1;
    }
    return 0;
}), exports.lengths = curry_1.curry2((...lists) => map_1.default(object_1.length, lists)), exports.toShortest = curry_1.curry2((...lists) => {
    const listLengths = function_1.apply(exports.lengths, lists), smallLen = Math.min.apply(Math, listLengths);
    return map_1.default((list, ind) => listLengths[ind] > smallLen ?
        exports.sliceTo(smallLen, list) : exports.sliceCopy(list), lists);
}), exports.reduceUntil = curry_1.curry((pred, op, agg, xs) => {
    const limit = object_1.length(xs);
    if (!limit) {
        return agg;
    }
    let ind = 0, result = agg;
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            break;
        }
        result = op(result, xs[ind], ind, xs);
    }
    return result;
}), exports.reduceUntilRight = curry_1.curry((pred, op, agg, arr) => {
    const limit = object_1.length(arr);
    if (!limit) {
        return agg;
    }
    let ind = limit - 1, result = agg;
    for (; ind >= 0; ind--) {
        if (pred(arr[ind], ind, arr)) {
            break;
        }
        result = op(result, arr[ind], ind, arr);
    }
    return result;
}), exports.reduce = exports.reduceUntil(boolean_1.alwaysFalse), exports.reduceRight = exports.reduceUntilRight(boolean_1.alwaysFalse), exports.lastIndex = x => { const len = object_1.length(x); return len ? len - 1 : 0; }, exports.findIndexWhere = curry_1.curry((pred, arr) => {
    let ind = 0;
    const limit = object_1.length(arr);
    for (; ind < limit; ind += 1) {
        const predicateFulfilled = !!pred(arr[ind], ind, arr);
        if (predicateFulfilled) {
            return ind;
        }
    }
    return -1;
}), exports.findIndexWhereRight = curry_1.curry((pred, arr) => {
    let ind = object_1.length(arr) - 1;
    for (; ind >= 0; ind -= 1) {
        const predicateFulfilled = !!pred(arr[ind], ind, arr);
        if (predicateFulfilled) {
            return ind;
        }
    }
    return -1;
}), exports.findIndicesWhere = curry_1.curry((pred, xs) => {
    const limit = object_1.length(xs);
    let ind = 0, out = [];
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out.push(ind);
        }
    }
    return out.length ? out : undefined;
}), exports.findWhere = curry_1.curry((pred, xs) => {
    let ind = 0, limit = object_1.length(xs);
    if (!limit) {
        return;
    }
    for (; ind < limit; ind++) {
        let elm = xs[ind];
        if (pred(elm, ind, xs)) {
            return elm;
        }
    }
    return undefined;
});
//# sourceMappingURL=utils.js.map