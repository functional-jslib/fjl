"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./jsPlatform/list");
const function_1 = require("./jsPlatform/function");
const object_1 = require("./jsPlatform/object");
const negate_1 = require("./function/negate");
const curry_1 = require("./function/curry");
const boolean_1 = require("./boolean");
const lookup_1 = require("./object/lookup");
const of_1 = require("./object/of");
const is_1 = require("./object/is");
const typeOf_1 = require("./object/typeOf");
const map_1 = require("./list/map");
exports.map = map_1.default;
const utils_1 = require("./list/utils");
__export(require("./list/range"));
__export(require("./list/utils"));
var jsPlatform_1 = require("./jsPlatform");
exports.slice = jsPlatform_1.slice;
exports.includes = jsPlatform_1.includes;
exports.indexOf = jsPlatform_1.indexOf;
exports.lastIndexOf = jsPlatform_1.lastIndexOf;
exports.push = jsPlatform_1.push;
exports.append = curry_1.curry2((...args) => function_1.apply(list_1.concat, args)), exports.head = x => x[0], exports.last = xs => xs[utils_1.lastIndex(xs)], exports.tail = xs => utils_1.sliceFrom(1, xs), exports.init = xs => utils_1.sliceTo(utils_1.lastIndex(xs), xs), exports.uncons = xs => !xs || object_1.length(xs) === 0 ? undefined : [exports.head(xs), exports.tail(xs)], exports.unconsr = xs => !xs || object_1.length(xs) === 0 ? undefined : [exports.init(xs), exports.last(xs)], exports.concat = xs => {
    switch (object_1.length(xs)) {
        case undefined:
        case 0:
            return [];
        case 1:
            const item0 = xs[0];
            return item0 && item0.slice ? utils_1.sliceCopy(item0) : item0;
        case 2:
        default:
            return function_1.apply(exports.append, xs);
    }
}, exports.concatMap = curry_1.curry((fn, foldableOfA) => exports.concat(map_1.default(fn, foldableOfA))), exports.reverse = xs => {
    if (!is_1.isset(xs) || !xs.length) {
        return xs;
    }
    let out = of_1.of(xs), i = xs.length - 1;
    switch (typeOf_1.typeOf(xs)) {
        case 'String':
            for (; i >= 0; i -= 1) {
                out += xs[i];
            }
            return out;
        default:
            for (; i >= 0; i -= 1) {
                out.push(xs[i]);
            }
            return out;
    }
}, exports.intersperse = curry_1.curry((between, xs) => {
    if (!xs || !xs.length) {
        return xs;
    }
    const limit = xs.length, lastInd = limit - 1;
    let out = of_1.of(xs), i = 0;
    if (is_1.isString(xs)) {
        for (; i < limit; i += 1) {
            out += i === lastInd ?
                xs[i] : xs[i] + between;
        }
        return out;
    }
    for (; i < limit; i += 1) {
        if (i === lastInd) {
            out.push(xs[i]);
        }
        else {
            out.push(xs[i], between);
        }
    }
    return out;
}), exports.intercalate = curry_1.curry((xs, xss) => {
    if (is_1.isString(xss)) {
        return exports.intersperse(xs, xss);
    }
    return exports.concat(exports.intersperse(xs, xss));
}), exports.transpose = (xss) => {
    let numLists = object_1.length(xss), ind = 0, ind2;
    if (!numLists) {
        return [];
    }
    const listLengths = function_1.apply(utils_1.lengths, xss), longestListLen = exports.maximum(listLengths), outLists = [];
    for (; ind < longestListLen; ind += 1) {
        const outList = [];
        for (ind2 = 0; ind2 < numLists; ind2 += 1) {
            if (listLengths[ind2] < ind + 1) {
                continue;
            }
            outList.push(xss[ind2][ind]);
        }
        outLists.push(outList);
    }
    return exports.filter(x => object_1.length(x) > 0, outLists);
}, exports.subsequences = xs => {
    const listLen = object_1.length(xs), len = Math.pow(2, listLen), out = [];
    for (let i = 0; i < len; i += 1) {
        let entry = [];
        for (let j = 0; j < listLen; j += 1) {
            if (i & (1 << j)) {
                entry.push(xs[j]);
            }
        }
        out.push(entry);
    }
    return out;
}, exports.swapped = curry_1.curry((ind1, ind2, list) => {
    const out = utils_1.sliceCopy(list), tmp = out[ind1];
    out[ind1] = out[ind2];
    out[ind2] = tmp;
    return out;
}), exports.permutations = xs => {
    const limit = object_1.length(xs);
    if (!limit || limit === 1) {
        return [xs];
    }
    let list = utils_1.sliceCopy(xs), c = exports.repeat(limit, 0), i = 0;
    const out = [list];
    for (; i < limit; i++) {
        if (c[i] < i) {
            list = exports.swapped(i % 2 === 0 ? 0 : c[i], i, list);
            out.push(list);
            c[i] += 1;
            i = 0;
            continue;
        }
        c[i] = 0;
    }
    return out;
}, exports.foldl = utils_1.reduce, exports.foldr = utils_1.reduceRight, exports.foldl1 = curry_1.curry((op, xs) => {
    const parts = exports.uncons(xs);
    return !parts ? [] : utils_1.reduce(op, parts[0], parts[1]);
}), exports.foldr1 = curry_1.curry((op, xs) => {
    const parts = exports.unconsr(xs);
    return !parts ? [] : utils_1.reduceRight(op, parts[1], parts[0]);
}), exports.mapAccumL = curry_1.curry((op, zero, xs) => {
    const list = utils_1.sliceCopy(xs), limit = object_1.length(xs);
    if (!limit) {
        return [zero, list];
    }
    let ind = 0, agg = zero, mapped = [], tuple;
    for (; ind < limit; ind++) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
}), exports.mapAccumR = curry_1.curry((op, zero, xs) => {
    const list = utils_1.sliceCopy(xs), limit = object_1.length(xs);
    if (!limit) {
        return [zero, list];
    }
    let ind = limit - 1, agg = zero, mapped = [], tuple;
    for (; ind >= 0; ind--) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
}), exports.iterate = curry_1.curry((limit, op, x) => {
    let ind = 0, out = [], lastX = x;
    for (; ind < limit; ind += 1) {
        out.push(lastX);
        lastX = op(lastX, ind);
    }
    return out;
}), exports.repeat = curry_1.curry((limit, x) => exports.iterate(limit, a => a, x)), exports.replicate = exports.repeat, exports.cycle = curry_1.curry((limit, xs) => exports.concat(exports.replicate(limit, xs))), exports.unfoldr = curry_1.curry((op, x) => {
    let ind = 0, out = [], resultTuple = op(x, ind, out);
    while (resultTuple) {
        out.push(resultTuple[0]);
        resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
}), exports.findIndex = utils_1.findIndexWhere, exports.findIndices = utils_1.findIndicesWhere, exports.elemIndex = curry_1.curry((x, xs) => {
    const foundInd = list_1.indexOf(x, xs);
    return foundInd !== -1 ? foundInd : undefined;
}), exports.elemIndices = curry_1.curry((value, xs) => exports.findIndices(x => x === value, xs)), exports.take = utils_1.sliceTo, exports.drop = utils_1.sliceFrom, exports.splitAt = (ind, list) => [utils_1.sliceTo(ind, list), utils_1.sliceFrom(ind, list)], exports.takeWhile = curry_1.curry((pred, list) => utils_1.reduceUntil(negate_1.negateF3(pred), is_1.isString(list) ?
    (agg, x) => agg + x :
    utils_1.aggregateArray, of_1.of(list), list)), exports.dropWhile = curry_1.curry((pred, list) => {
    const limit = object_1.length(list), splitPoint = utils_1.findIndexWhere((x, i, xs) => !pred(x, i, xs), list);
    return splitPoint === -1 ?
        utils_1.sliceFrom(limit, list) :
        list_1.slice(splitPoint, limit, list);
}), exports.dropWhileEnd = curry_1.curry((pred, list) => {
    const splitPoint = utils_1.findIndexWhereRight((x, i, xs) => !pred(x, i, xs), list);
    if (splitPoint === -1) {
        return of_1.of(list);
    }
    return utils_1.sliceTo(splitPoint + 1, list);
}), exports.span = curry_1.curry((pred, list) => {
    const splitPoint = utils_1.findIndexWhere(negate_1.negateF3(pred), list);
    return splitPoint === -1 ?
        [utils_1.sliceFrom(0, list), of_1.of(list)] :
        exports.splitAt(splitPoint, list);
}), exports.breakOnList = curry_1.curry((pred, list) => {
    const splitPoint = utils_1.findIndexWhere(negate_1.negateF3(pred), list);
    return splitPoint === -1 ?
        [of_1.of(list), utils_1.sliceFrom(0, list)] : exports.reverse(exports.splitAt(splitPoint, list));
}), exports.at = lookup_1.lookup, exports.find = utils_1.findWhere, exports.forEach = curry_1.curry((fn, list) => {
    const limit = object_1.length(list);
    if (!limit) {
        return;
    }
    let ind = 0;
    for (; ind < limit; ind += 1) {
        fn(list[ind], ind, list);
    }
}), exports.filter = curry_1.curry((pred, xs) => {
    let ind = 0, limit = object_1.length(xs), out = [];
    if (!limit) {
        return out;
    }
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out.push(xs[ind]);
        }
    }
    return out;
}), exports.partition = curry_1.curry((pred, list) => !object_1.length(list) ?
    [[], []] :
    [exports.filter(pred, list), exports.filter(negate_1.negateF3(pred), list)]), exports.elem = list_1.includes, exports.notElem = negate_1.negateF2(list_1.includes), exports.isPrefixOf = curry_1.curry((xs1, xs2) => {
    const limit1 = object_1.length(xs1), limit2 = object_1.length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || list_1.indexOf(xs1[0], xs2) === -1) {
        return false;
    }
    let ind = 0;
    for (; ind < limit1; ind++) {
        if (xs1[ind] !== xs2[ind]) {
            return false;
        }
    }
    return true;
}), exports.isSuffixOf = curry_1.curry((xs1, xs2) => {
    const limit1 = object_1.length(xs1), limit2 = object_1.length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || list_1.indexOf(xs1[0], xs2) === -1) {
        return false;
    }
    let ind1 = limit1 - 1, ind2 = limit2 - 1;
    for (; ind1 >= 0; ind1--) {
        if (xs1[ind1] !== xs2[ind2]) {
            return false;
        }
        ind2 -= 1;
    }
    return true;
}), exports.isInfixOf = curry_1.curry((xs1, xs2) => {
    const limit1 = object_1.length(xs1), limit2 = object_1.length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2) {
        return false;
    }
    let ind1, foundLen, ind = 0;
    for (; ind < limit2; ind += 1) {
        foundLen = 0;
        for (ind1 = 0; ind1 < limit1; ind1 += 1) {
            if (xs2[ind1 + ind] === xs1[ind1]) {
                foundLen += 1;
            }
            if (foundLen === limit1) {
                return true;
            }
        }
    }
    return false;
}), exports.isSubsequenceOf = curry_1.curry((xs1, xs2) => {
    const len = Math.pow(2, object_1.length(xs2)), lenXs1 = object_1.length(xs1);
    let foundLen, i;
    for (i = 0; i < len; i += 1) {
        foundLen = 0;
        for (let j = 0; j < len; j += 1) {
            if (i & (1 << j) && list_1.indexOf(xs2[j], xs1) > -1) {
                foundLen += 1;
            }
            if (foundLen === lenXs1) {
                return true;
            }
        }
    }
    return false;
}), exports.group = xs => exports.groupBy((a, b) => a === b, xs), exports.groupBy = curry_1.curry((equalityOp, xs) => {
    const limit = object_1.length(xs);
    if (!limit) {
        return utils_1.sliceCopy(xs);
    }
    let ind = 0, prevItem, item, predOp = x => {
        if (equalityOp(x, prevItem)) {
            ind++;
        }
        if (equalityOp(x, item)) {
            prevItem = x;
            return true;
        }
        return false;
    }, agg = [];
    for (; ind < limit; ind += 1) {
        item = xs[ind];
        agg.push(exports.takeWhile(predOp, list_1.slice(ind, limit, xs)));
    }
    return agg;
}), exports.inits = xs => {
    let limit = object_1.length(xs), ind = 0, agg = [];
    if (!limit) {
        return [];
    }
    for (; ind <= limit; ind += 1) {
        agg.push(utils_1.sliceTo(ind, xs));
    }
    return agg;
}, exports.tails = xs => {
    let limit = object_1.length(xs), ind = 0, agg = [];
    if (!limit) {
        return [];
    }
    for (; ind <= limit; ind += 1) {
        agg.push(list_1.slice(ind, limit, xs));
    }
    return agg;
}, exports.stripPrefix = curry_1.curry((prefix, list) => exports.isPrefixOf(prefix, list) ?
    exports.splitAt(object_1.length(prefix), list)[1] :
    utils_1.sliceCopy(list)), exports.zip = curry_1.curry((arr1, arr2) => {
    if (!object_1.length(arr1) || !object_1.length(arr2)) {
        return [];
    }
    const [a1, a2] = utils_1.toShortest(arr1, arr2);
    return utils_1.reduce((agg, item, ind) => utils_1.aggregateArray(agg, [item, a2[ind]]), [], a1);
}), exports.zipN = curry_1.curry2((...lists) => {
    const trimmedLists = function_1.apply(utils_1.toShortest, lists);
    return utils_1.reduce((agg, item, ind) => utils_1.aggregateArray(agg, map_1.default(xs => xs[ind], trimmedLists)), [], trimmedLists[0]);
}), exports.zip3 = curry_1.curry((arr1, arr2, arr3) => exports.zipN(arr1, arr2, arr3)), exports.zip4 = curry_1.curry((arr1, arr2, arr3, arr4) => exports.zipN(arr1, arr2, arr3, arr4)), exports.zip5 = curry_1.curry((arr1, arr2, arr3, arr4, arr5) => exports.zipN(arr1, arr2, arr3, arr4, arr5)), exports.zipWith = curry_1.curry((op, xs1, xs2) => {
    if (!object_1.length(xs1) || !object_1.length(xs2)) {
        return [];
    }
    const [a1, a2] = utils_1.toShortest(xs1, xs2);
    return utils_1.reduce((agg, item, ind) => utils_1.aggregateArray(agg, op(item, a2[ind])), [], a1);
}), exports.zipWithN = curry_1.curry3((op, ...lists) => {
    const trimmedLists = function_1.apply(utils_1.toShortest, lists), lenOfTrimmed = object_1.length(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    }
    else if (lenOfTrimmed === 1) {
        return utils_1.sliceTo(object_1.length(trimmedLists[0]), trimmedLists[0]);
    }
    return utils_1.reduce((agg, item, ind) => utils_1.aggregateArray(agg, function_1.apply(op, map_1.default(xs => xs[ind], trimmedLists))), [], trimmedLists[0]);
}), exports.zipWith3 = curry_1.curry((op, xs1, xs2, xs3) => exports.zipWithN(op, xs1, xs2, xs3)), exports.zipWith4 = curry_1.curry((op, xs1, xs2, xs3, xs4) => exports.zipWithN(op, xs1, xs2, xs3, xs4)), exports.zipWith5 = curry_1.curry((op, xs1, xs2, xs3, xs4, xs5) => exports.zipWithN(op, xs1, xs2, xs3, xs4, xs5)), exports.unzip = exports.foldl((agg, item) => {
    agg[0].push(item[0]);
    agg[1].push(item[1]);
    return agg;
}, [[], []]), exports.unzipN = list => {
    if (!object_1.length(list)) {
        return [];
    }
    const lenItem0 = object_1.length(list[0]);
    let zero = lenItem0 ?
        exports.unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) :
        [];
    return exports.foldl((agg, item) => {
        agg.forEach((outList, ind) => outList.push(item[ind]));
        return agg;
    }, zero, list);
}, exports.any = curry_1.curry((p, xs) => {
    let ind = 0, limit = object_1.length(xs);
    if (!limit) {
        return false;
    }
    for (; ind < limit; ind += 1) {
        if (p(xs[ind])) {
            return true;
        }
    }
    return false;
}), exports.all = curry_1.curry((p, xs) => {
    const limit = object_1.length(xs);
    let ind = 0;
    if (!limit) {
        return false;
    }
    for (; ind < limit; ind++) {
        if (!p(xs[ind], ind, xs)) {
            return false;
        }
    }
    return true;
}), exports.and = xs => exports.all(boolean_1.isTruthy, xs), exports.or = xs => exports.any(boolean_1.isTruthy, xs), exports.not = xs => exports.all(boolean_1.isFalsy, xs), exports.sum = list => exports.foldl((agg, x) => agg + x, 0, list), exports.product = list => exports.foldl((agg, x) => agg * x, 1, list), exports.maximum = list => exports.last(exports.sortBy(utils_1.genericAscOrdering, list)), exports.minimum = list => exports.head(exports.sortBy(utils_1.genericAscOrdering, list)), exports.scanl = curry_1.curry((fn, zero, xs) => {
    if (!xs || !object_1.length(xs)) {
        return [];
    }
    const limit = object_1.length(xs);
    let ind = 0, result = zero, out = [];
    while (ind < limit) {
        result = fn(result, xs[ind], ind, xs);
        out.push(result);
        ind++;
    }
    return out;
}), exports.scanl1 = curry_1.curry((fn, xs) => {
    if (!xs || !xs.length) {
        return [];
    }
    return exports.scanl(fn, exports.head(xs), exports.tail(xs));
}), exports.scanr = curry_1.curry((fn, zero, xs) => {
    if (!xs || !object_1.length(xs)) {
        return [];
    }
    const limit = object_1.length(xs);
    let ind = limit - 1, result = xs[0], out = [];
    while (ind > -1) {
        result = fn(result, xs[ind], ind, xs);
        out.push(result);
        ind--;
    }
    return out;
}), exports.scanr1 = curry_1.curry((fn, xs) => {
    if (!xs || !xs.length) {
        return [];
    }
    return exports.scanr(fn, exports.last(xs), exports.init(xs));
}), exports.nub = list => exports.nubBy((a, b) => a === b, list), exports.remove = curry_1.curry((x, list) => exports.removeBy((a, b) => a === b, x, list)), exports.sort = xs => exports.sortBy(utils_1.genericAscOrdering, xs), exports.sortOn = curry_1.curry((valueFn, xs) => map_1.default(decorated => decorated[1], exports.sortBy(([a0], [b0]) => utils_1.genericAscOrdering(a0, b0), map_1.default(item => [valueFn(item), item], xs)))), exports.sortBy = curry_1.curry((orderingFn, xs) => utils_1.sliceCopy(xs).sort(orderingFn || utils_1.genericAscOrdering)), exports.insert = curry_1.curry((x, xs) => {
    if (!xs.length) {
        return of_1.of(xs, x);
    }
    const foundIndex = exports.findIndex(item => x <= item, xs);
    return foundIndex === -1 ? exports.concat([xs, of_1.of(xs, x)]) :
        exports.concat(exports.intersperse(of_1.of(xs, x), exports.splitAt(foundIndex, xs)));
}), exports.insertBy = curry_1.curry((orderingFn, x, xs) => {
    const limit = object_1.length(xs);
    if (!limit) {
        return [x];
    }
    let ind = 0;
    for (; ind < limit; ind += 1) {
        if (orderingFn(x, xs[ind]) <= 0) {
            const parts = exports.splitAt(ind, xs);
            return exports.concat([parts[0], [x], parts[1]]);
        }
    }
    return utils_1.aggregateArray(utils_1.sliceCopy(xs), x);
}), exports.nubBy = curry_1.curry((pred, list) => {
    if (!object_1.length(list)) {
        return [];
    }
    const limit = object_1.length(list);
    let ind = 0, currItem, out = [], anyOp = storedItem => pred(currItem, storedItem);
    for (; ind < limit; ind += 1) {
        currItem = list[ind];
        if (exports.any(anyOp, out)) {
            continue;
        }
        out.push(currItem);
    }
    return out;
}), exports.removeBy = curry_1.curry((pred, x, list) => {
    const foundIndex = exports.findIndex(item => pred(x, item), list);
    if (foundIndex > -1) {
        const parts = exports.splitAt(foundIndex, list);
        return exports.append(parts[0], exports.tail(parts[1]));
    }
    return utils_1.sliceCopy(list);
}), exports.removeFirstsBy = curry_1.curry((pred, xs1, xs2) => exports.foldl((agg, x) => exports.removeBy(pred, x, agg), xs1, xs2)), exports.unionBy = curry_1.curry((pred, arr1, arr2) => exports.foldl((agg, b) => {
    const alreadyAdded = exports.any(a => pred(a, b), agg);
    return !alreadyAdded ? (agg.push(b), agg) : agg;
}, utils_1.sliceCopy(arr1), arr2)), exports.union = curry_1.curry((arr1, arr2) => exports.append(arr1, exports.filter(elm => !list_1.includes(elm, arr1), arr2))), exports.intersect = curry_1.curry((arr1, arr2) => !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
    exports.filter(elm => list_1.includes(elm, arr2), arr1)), exports.intersectBy = curry_1.curry((pred, list1, list2) => exports.foldl((agg, a) => exports.any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg, [], list1)), exports.difference = curry_1.curry((array1, array2) => {
    if (array1 && !array2) {
        return utils_1.sliceCopy(array1);
    }
    else if (!array1 && array2 || (!array1 && !array2)) {
        return [];
    }
    return utils_1.reduce((agg, elm) => !list_1.includes(elm, array2) ? (agg.push(elm), agg) : agg, [], array1);
}), exports.complement = curry_1.curry2((arr0, ...arrays) => utils_1.reduce((agg, arr) => exports.append(agg, exports.difference(arr, arr0)), [], arrays));
//# sourceMappingURL=list.js.map