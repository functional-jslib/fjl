const fPureTakesOne = name => (arg, f) => f[name](arg);
const fPureTakes2 = name => (arg1, arg2, f) => f[name](arg1, arg2);
const fPureTakesOneOrMore = name => (f, ...args) => f[name](...args);

/**
 * Created by elydelacruz on 9/6/2017.
 * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
 * throughout the library.  @note Doesn't include all methods for objects just the ones used in
 *  the library.
 * @todo change all files named '*UnCurried' to '*_'.
 */

const instanceOf$1 = (instanceConstructor, instance) =>
        instance instanceof instanceConstructor;
const hasOwnProperty$1 = fPureTakesOne('hasOwnProperty');
const length = x => x.length;
const keys = obj => Object.keys(obj);
const assign$1 = (() => Object.assign ?
            (obj0, ...objs) => Object.assign(obj0, ...objs) :
            (obj0, ...objs) => objs.reduce((topAgg, obj) => {
                return keys(obj).reduce((agg, key) => {
                    agg[key] = obj[key];
                    return agg;
                }, topAgg);
            }, obj0)
        )();

/**
 * Created by elyde on 7/20/2017.
 * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
 * @module _jsPlatform_arrayOps
 * @private
 * @todo updated doc blocks to list correct/updated module name.
 */

const defineReverse = () =>
        Array.prototype.reverse ? x => x.reverse() :
            x => x.reduceRight((agg, item) => {
                agg.push(item);
                return agg;
            }, []);
const map = fPureTakesOne('map');
const filter = fPureTakesOne('filter');
const reduceRight = fPureTakes2('reduceRight');
const reverse = defineReverse();

/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length`)
 *      on both strings and arrays.
 */

const concat = fPureTakesOneOrMore('concat');
const slice = fPureTakes2('slice');
const includes = (() => 'includes' in Array.prototype ?
            fPureTakesOne('includes') :
            (value, xs) => xs.indexOf(value) > -1)();
const indexOf = fPureTakesOne('indexOf');

/**
 * Created by elydelacruz on 9/6/2017.
 */

/**
 * Functional version of `String.prototype.split`.
 * @function module:_stringOps.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
const split = fPureTakesOne('split');

/**
 * Created by elydelacruz on 9/7/2017.
 * @module _jsPlatform_function
 * @private
 */
const apply = (fn, args) => fn.apply(null, args);
const call = (fn, ...args) => apply(fn, args);

/**
 * @module jsPlatform_
 * @private
 */

/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf _functionOps
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */
const curry = (fn, ...argsToCurry) => {
        return (...args) => {
            const concatedArgs = concat(argsToCurry, args);
            return length(concatedArgs) < length(fn) ?
                apply(curry, concat([fn], concatedArgs)) :
                apply(fn, concatedArgs);
        };
    };
const curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = concat(curriedArgs, args),
                canBeCalled = (length(concatedArgs) >= executeArity) || !executeArity;
            return !canBeCalled ? apply(curryN, concat([executeArity, fn], concatedArgs)) :
                apply(fn, concatedArgs);
        };
    };
const curry2 = fn => curryN(2, fn);
const curry3 = fn => curryN(3, fn);
const curry4 = fn => curryN(4, fn);
const curry5 = fn => curryN(5, fn);

/**
 * @memberOf _objectOps_
 */

/**
 * Returns property value if found; Else `undefined`.
 * @function module:_objectOps.prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
const prop$1 = (name, obj) => obj[name];

/**
 * Created by elyde on 12/18/2016.
 * @memberOf _objectOps_
 */
const _Number$1 = Number.name;
const _NaN = 'NaN';
const _Null$1 = 'Null';
const _Undefined$1 = 'Undefined';

/**
 * Returns the class name of an object from it's class string.
 * @note Returns 'NaN' if value `isNaN` and value type is 'Number'.
 * @function module:_objectOps.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name property if not null or undefined (in which case a
 *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
 */
function typeOf (value) {
    let retVal;
    if (value === undefined) {
        retVal = _Undefined$1;
    }
    else if (value === null) {
        retVal = _Null$1;
    }
    else {
        let constructorName = (value).constructor.name;
        retVal = constructorName === _Number$1 && isNaN(value) ?
            _NaN : constructorName;
    }
    return retVal;
}

/**
 * Created by elyde on 12/18/2016.
 * @memberOf _objectOps_
 */

let _String = String.name;
let _Number = Number.name;
let _Object = Object.name;
let _Boolean = Boolean.name;
let _Function = Function.name;
let _Array = Array.name;
let _Symbol = 'Symbol';
let _Map = 'Map';
let _Set = 'Set';
let _WeakMap = 'WeakMap';
let _WeakSet = 'WeakSet';
let _Null = 'Null';
let _Undefined = 'Undefined';

const isFunction = value => instanceOf$1(Function, value);
const isType$1 = (type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type);
const isClass = x => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
const isCallable = x => isFunction(x) && !isClass(x);
const isArray = value => isType$1(Array, value);
const isObject = value => isType$1(_Object, value);
const isBoolean = value => isType$1(_Boolean, value);
const isNumber = value => isType$1(_Number, value);
const isString = value => isType$1(_String, value);
const isMap = value => isType$1(_Map, value);
const isSet = value => isType$1(_Set, value);
const isWeakMap = value => isType$1(_WeakMap, value);
const isWeakSet = value => isType$1(_WeakSet, value);
const isUndefined = value => isType$1(_Undefined, value);
const isNull = value => isType$1(_Null, value);
const isSymbol = value => isType$1(_Symbol, value);
const isUsableImmutablePrimitive = x => {
        const typeOfX = typeOf(x);
        return [_String, _Number, _Boolean, _Symbol]
            .some(Type => Type === typeOfX);
    };
const isEmptyList = x => !length(x);
const isEmptyObject = obj => isEmptyList(keys(obj));
const isEmptyCollection = x => x.size === 0;
const isEmpty = value => {
        let typeOfValue = typeOf(value),
            retVal;

        if (!value) { // '', 0, `null`, `undefined` or `false` then is empty
            retVal = true;
        }
        else if (typeOfValue === _Array || typeOfValue === _Function) {
            retVal = isEmptyList(value);
        }
        else if (typeOfValue === _Number && value !== 0) {
            retVal = false;
        }
        else if (typeOfValue === _Object) {
            retVal = isEmptyObject(value);
        }
        else if (hasOwnProperty$1('size', value)) {
            retVal = isEmptyCollection(value);
        }
        else {
            retVal = !value;
        }
        return retVal;
    };
const isset = x => !isNull(x) && !isUndefined(x);

const assignDeep$1 = (obj0, ...objs) =>
        objs.reduce((topAgg, obj) =>
                keys(obj).reduce((agg, key) => {
                    let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                    // If property is not writable move to next item in collection
                    if (hasOwnProperty$1(key, agg) && propDescription &&
                        !(propDescription.get && propDescription.set) &&
                        !propDescription.writable) {
                        return agg;
                    }
                    if (isObject(agg[key]) && isObject(obj[key])) {
                        assignDeep$1(agg[key], obj[key]);
                    }
                    else { agg[key] = obj[key]; }
                    return agg;
                }, topAgg)
            , obj0);

/**
 * @memberOf _functionOps
 */

const negateF = fn => (a, b) => !fn(a, b);
const negateF3 = fn => (a, b, c) => !fn(a, b, c);
const negateF4 = fn => (a, b, c, d) => !fn(a, b, c, d);
const negateF5 = fn => (a, b, c, d, e) => !fn(a, b, c, d, e);
const negateP = negateF3;
const negateFMany = fn => (...args) => !apply(fn, args);

/**
 * Created by elyde on 7/15/2017.
 * @module booleanOps
 */

const isTruthy = value => !!value;
const isFalsy = value => !value;
const alwaysTrue = () => true;
const alwaysFalse = () => false;

const of = (x, ...args) => {
    if (!isset(x)) { return undefined; }
    const constructor = x.constructor;
    if (hasOwnProperty$1('of', constructor)) {
        return apply(constructor.of, args);
    }
    else if (isUsableImmutablePrimitive(x)) {
        return apply(constructor, args);
    }
    else if (isFunction(constructor)) {
        return new constructor(...args);
    }
    return undefined;
};

/**
 * @module _objectOps_
 * @private
 */

const aggregateStr = (agg, item) => agg + item;
const aggregateArr = (agg, item) => {
        agg.push(item);
        return agg;
    };
const aggregateObj = (agg, item, ind) => {
        agg[ind] = item;
        return agg;
    };
const aggregatorByType = x => {
        switch (typeOf(x)) {
            case 'String': return aggregateStr;
            case 'Array': return aggregateArr;
            case 'Object':
            default: return aggregateObj;
        }
    };

/**
 * @function module:_listOps.map
 * @param fn {Function} - Function to map on functor item(s).
 * @param xs {Array|String|*} - Functor.
 * @returns {Array|String|*} - Functor type that is passed in.
 */
const map$1 = (fn, xs) => {
    let ind = 0,
        limit = length(xs),
        out = of(xs),
        aggregate = aggregatorByType(xs);
    if (!limit) { return out; }
    for (; ind < limit; ind += 1) {
        out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
    }
    return out;
};

/**
 * List operator utils module.
 * @module listOpsUtils_
 * @private
 */
const sliceFrom = (startInd, arr) => slice(startInd, length(arr), arr);
const sliceTo = (toInd, xs) => slice(0, toInd, xs);
const copy = xs => sliceFrom(0, xs);
const genericAscOrdering = (a, b) => {
        if (a > b) { return 1; }
        else if (a < b) { return -1; }
        return 0;
    };
const lengths = (...lists) => length(lists) ? map$1(length, lists) : [];
const lengthsToSmallest = (...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = Math.min.apply(Math, listLengths);
        return map$1((list, ind) => listLengths[ind] > smallLen ?
            sliceTo(smallLen, list) : copy(list), lists);
    };
const reduceUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    };
const reduceRightUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    };
const reduce$1 = (operation, agg, arr) =>
        reduceUntil(
            alwaysFalse,            // until-predicate
            operation,              // operation
            agg,                    // aggregator
            arr);
const reduceRight$1 = (operation, agg, arr) =>
        reduceRightUntil(
            alwaysFalse,            // until-predicate
            operation,              // operation
            agg,                    // aggregator
            arr);
const lastIndex = x => { const len = length(x); return len ? len - 1 : 0; };
const findIndexWhere = (pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    };
const findIndexWhereRight = (pred, arr) => {
        const limit = length(arr);
        let ind = limit,
            predicateFulfilled = false;
        for (; ind >= 0 && !predicateFulfilled; --ind) {
            predicateFulfilled = pred(arr[ind], ind, arr);
        }
        return ind;
    };
const findIndicesWhere = (pred, xs) => {
        const limit = length(xs);
        if (!limit) { return undefined; }
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out;
    };
const findWhere = (pred, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return; }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) { return elm; }
        }
    };
const _swap = (list, ind1, ind2) => {
        const tmp = list[ind1];
        list[ind1] = list[ind2];
        list[ind2] = tmp;
        return list;
    };
const _permutationsAlgo = (listIn, limit, remainderLen) => {
        let out = [];
        if (remainderLen === 1) { return copy(listIn); }
        for (let i = 0; i < remainderLen; i++) {
            const newLen = remainderLen - 1;

            // Capture permutation
            out.push(_permutationsAlgo(listIn, limit, newLen));

            // If remainderLen is odd, swap first and last element
            //  else, swap `ith` and last element
            _swap(listIn, (remainderLen % 2 === 1 ? 0 : i), newLen);
        }
        return out;
    };

/**
 * List operations module.
 * @module _listOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 */
// Exported internals
const append = concat;
const appendMany = (...args) => {
        if (length(args)) { return apply(concat, args); }
        throw new Error('`appendMany` requires at least one arg.');
    };
const head = x => x[0];
const last = xs => xs[lastIndex(xs)];
const tail = xs => sliceFrom(1, xs);
const init = xs => sliceTo(lastIndex(xs), xs);
const uncons = xs => {
        if (!xs) {
            return;
        }
        if (length(xs) === 0) {
            return undefined;
        }
        return [head(xs), tail(xs)];
    };
const unconsr = xs => {
        if (!xs) {
            return;
        }
        if (length(xs) === 0) {
            return undefined;
        }
        return [init(xs), last(xs)];
    };
const concat$1 = xs => {
        if (!length(xs)) { return copy(xs); }
        return isString(xs) ? xs : apply(appendMany, xs);
    };
const concatMap = (fn, foldableOfA) => concat$1(map$1(fn, foldableOfA));
const reverse$1 = x => {
        const aggregator = aggregatorByType(x);
        return foldr (
            (agg, item, ind) => aggregator(agg, item, ind),
            of(x), x
        );
    };
const intersperse = (between, arr) => {
        const limit = length(arr),
            lastInd = limit - 1,
            aggregator = of(arr),
            aggregatorOp = aggregatorByType(arr);
        if (!limit) {
            return aggregator;
        }
        return foldl((agg, item, ind) => {
            return ind === lastInd ?
                aggregatorOp(agg, item) :
                aggregatorOp(
                    aggregatorOp(agg, item),
                    between
                );
        }, aggregator, arr);
    };
const intercalate = (xs, xss) => concat$1(intersperse(xs, xss));
const transpose = xss => {
        let numLists = length(xss),
            ind = 0, ind2;
        if (!numLists) {
            return of(xss);
        }
        const listLengths = apply(lengths, xss),
            longestListLen = maximum(listLengths),
            outLists = [];
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
        return filter$1(x => length(x), outLists);
    };
const subsequences = xs => {
        const len = Math.pow(2, length(xs)),
            out = [];
        for (let i = 0; i < len; i += 1) {
            const entry = [];
            for (let j = 0; j < len; j += 1) {
                if (i & (1 << j)) {
                    entry.push(xs[j]);
                }
            }
            out.push(entry);
        }
        return out;
    };
const permutations = xs => {
        const limit = length(xs);
        return !limit ? [xs] :
            _permutationsAlgo(xs, limit, limit);
    };
const foldl = reduce$1;
const foldr = reduceRight$1;
const foldl1 = (op, xs) => {
        const parts = uncons(xs);
        if (!parts) {
            return of(xs);
        }
        return reduce$1(op, parts[0], parts[1]);
    };
const foldr1 = (op, xs) => {
        const parts = unconsr(xs);
        if (!parts) {
            return of(xs);
        }
        return reduceRight$1(op, parts[1], parts[0]);
    };
const mapAccumL = (op, zero, xs) => {
        const list = sliceFrom(0, xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = 0,
            agg = zero,
            mapped = of(xs),
            tuple;
        for (; ind < limit; ind++) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    };
const mapAccumR = (op, zero, xs) => {
        const list = sliceFrom(0, xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = limit - 1,
            agg = zero,
            mapped = of(xs),
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    };
const iterate = (limit, op, x) => {
        let ind = 0,
            out = x;
        for (; ind < limit; ind += 1) {
            out = op(out, ind);
        }
        return out;
    };
const repeat = (limit, x) =>
        iterate(limit, agg => {
            agg.push(x);
            return agg;
        }, []);
const replicate = repeat;
const cycle = (limit, xs) => concat$1(replicate(limit, xs));
const unfoldr = (op, x) => {
        let ind = 0,
            out = [],
            resultTuple = op(x, ind, out);
        while (resultTuple) {
            out.push(resultTuple[0]);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    };
const findIndex = findIndexWhere;
const findIndices = findIndicesWhere;
const elemIndex = (x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    };
const elemIndices = (value, xs) => findIndices(x => x === value, xs);
const take = (limit, list) => sliceTo(limit, list);
const drop = (count, list) => sliceFrom(count, list);
const splitAt = (ind, list) => [
        sliceTo(ind, list),
        sliceFrom(ind, list)
    ];
const takeWhile = (pred, list) => {
        let zero = of(list);
        const operation = aggregatorByType(list);
        return reduceUntil(
            negateP(pred),  // predicate
            operation,      // operation
            zero,           // aggregator
            list
        );
    };
const dropWhile = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhere((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            slice(splitPoint, limit, list);
    };
const dropWhileEnd = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhereRight((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            sliceTo(splitPoint + 1, list);
    };
const span = (pred, list) => {
        const splitPoint = findIndexWhere(negateP(pred), list);
        return splitPoint === -1 ?
            splitAt(0, list) : splitAt(splitPoint, list);
    };
const breakOnList = (pred, list) => {
        const splitPoint = findIndexWhere(pred, list);
        return splitPoint === -1 ?
            splitAt(0, list) : splitAt(splitPoint, list);
    };
const at = prop$1;
const find = findWhere;
const filter$1 = (pred, xs) => {
        let ind = 0,
            limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = of(xs);
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out = aggregator(out, xs[ind]);
            }
        }
        return out;
    };
const partition = (pred, list) => {
        if (!length(list)) {
            return [of(list), of(list)];
        }
        return [filter$1(pred, list), filter$1(negateP(pred), list)];
    };
const elem = includes;
const notElem = negateF(includes);
const lookup = at;
const isPrefixOf = (xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = 0;
        for (; ind < limit1; ind++) {
            if (xs1[ind] !== xs2[ind]) {
                return false;
            }
        }
        return true;
    };
const isSuffixOf = (xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind1 = limit1 - 1,
            ind2 = limit2 - 1;
        for (; ind1 >= 0; ind1--) {
            if (xs1[ind1] !== xs2[ind2]) {
                return false;
            }
            ind2 -= 1;
        }
        return true;
    };
const isInfixOf = (xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2) {
            return false;
        }
        let ind1,
            foundLen,
            ind = 0;
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
    };
const isSubsequenceOf = (xs1, xs2) => {
        const len = Math.pow(2, length(xs2)),
            lenXs1 = length(xs1);
        let foundLen,
            i;
        for (i = 0; i < len; i += 1) {
            foundLen = 0;
            for (let j = 0; j < len; j += 1) {
                if (i & (1 << j) && indexOf(xs2[j], xs1) > -1) {
                    foundLen += 1;
                }
                if (foundLen === lenXs1) {
                    return true;
                }
            }
        }
        return false;
    };
const group = xs => groupBy((a, b) => a === b, xs);
const groupBy = (equalityOp, xs) => {
        const limit = length(xs);
        if (!limit) {
            return sliceFrom(0, xs);
        }
        let ind = 0,
            prevItem,
            item,
            predOp = x => {
                if (equalityOp(x, prevItem)) {
                    ind++;
                }
                if (equalityOp(x, item)) {
                    prevItem = x;
                    return true;
                }
                return false;
            },
            agg = [];
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(takeWhile(predOp, slice(ind, limit, xs)));
        }
        return agg;
    };
const inits = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, sliceTo(ind, xs));
        }
        return agg;
    };
const tails = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(ind, limit, xs));
        }
        return agg;
    };
const stripPrefix = (prefix, list) =>
        isPrefixOf(prefix, list) ?
            splitAt(length(prefix), list)[1] :
            sliceFrom(0, list);
const zip = (arr1, arr2) => {
        if (!length(arr1) || !length(arr2)) {
            return of(arr1);
        }
        const [a1, a2] = lengthsToSmallest(arr1, arr2);
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, [item, a2[ind]]),
            [], a1);
    };
const zipN = (...lists) => {
        const trimmedLists = apply(lengthsToSmallest, filter$1(length, lists)),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, map$1(xs => xs[ind], trimmedLists)),
            [], trimmedLists[0]);
    };
const zipWith = (op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) {
            return of(xs1);
        }
        const [a1, a2] = lengthsToSmallest(xs1, xs2);
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, op(item, a2[ind])),
            [], a1);
    };
const zipWithN = (op, ...lists) => {
        const trimmedLists = apply(lengthsToSmallest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, apply(op, map$1(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    };
const unzip = arr =>
        foldl((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr);
const unzipN = list => {
        if (!length(list)) {
            return [];
        }
        const lenItem0 = length(list[0]);
        let zero = lenItem0 ?
            unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) :
            [];
        return foldl((agg, item) => {
            agg.forEach((outList, ind) => outList.push(item[ind]));
            return agg;
        }, zero, list);
    };
const any = (p, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) {
            return false;
        }
        for (; ind < limit; ind += 1) {
            if (p(xs[ind])) {
                return true;
            }
        }
        return false;
    };
const all = (p, xs) => {
        const limit = length(xs);
        let ind = 0;
        if (limit === 0) {
            return false;
        }
        for (; ind < limit; ind++) {
            if (!p(xs[ind], ind, xs)) {
                return false;
            }
        }
        return true;
    };
const and = xs => all(isTruthy, xs);
const or = xs => any(isTruthy, xs);
const sum = list => foldl((agg, x) => agg + x, 0, list);
const product = list => foldl((agg, x) => agg * x, 1, list);
const maximum = list => last(sortBy(genericAscOrdering, list));
const minimum = list => head(sortBy(genericAscOrdering, list));
const scanl = (fn, zero, xs) => {
        if (!xs || !length(xs)) {
            return [];
        }
        const limit = length(xs);
        let ind = 0,
            result = zero,
            out = [];
        while (ind < limit) {
            result = fn(result, xs[ind], ind, xs);
            out.push(result);
            ind++;
        }
        return out;
    };
const scanl1 = (fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return scanl(fn, head(xs), tail(xs));
    };
const scanr = (fn, zero, xs) => {
        if (!xs || !length(xs)) {
            return [];
        }
        const limit = length(xs);
        let ind = limit - 1,
            result = xs[0],
            out = [];
        while (ind > -1) {
            result = fn(result, xs[ind], ind, xs);
            out.push(result);
            ind--;
        }
        return out;
    };
const scanr1 = (fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return scanr(fn, last(xs), init(xs));
    };
const nub = list => nubBy((a, b) => a === b, list);
const remove = (x, list) => removeBy((a, b) => a === b, x, list);
const sort = xs => sortBy(genericAscOrdering, xs);
const sortOn = (valueFn, xs) =>

        // Un-decorate
        map$1(decorated => decorated[1],

            // Decorate and sort
            sortBy(
                // Ordering
                ([a0], [b0]) => genericAscOrdering(a0, b0),

                // Decorate
                map$1(item => [valueFn(item), item], xs)
            )
        );
const sortBy = (orderingFn, xs) => copy(xs).sort(orderingFn || genericAscOrdering);
const insert = (x, xs) => {
        if (isEmptyList(xs)) {
            return aggregatorByType(xs)(copy(xs), x, 0);
        }
        let out = of(xs),
            foundIndex = findIndex(item => x <= item, xs);
        return foundIndex === -1 ? append(sliceFrom(0, out), x) :
            concat$1(intersperse([x], splitAt(foundIndex, xs)));
    };
const insertBy = (orderingFn, x, xs) => {
        const limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = of(xs);
        if (isEmptyList(xs)) {
            return aggregator(out, x, 0);
        }
        let ind = 0;
        for (; ind < limit; ind += 1) {
            if (orderingFn(x, xs[ind]) <= 0) {
                const parts = splitAt(ind, xs);
                // Fold parts[0], [x], parts[1] into `out` and `concat`
                return concat$1(foldl(aggregator, out, [parts[0], [x], parts[1]]));
            }
        }
        return aggregator(copy(xs), x);
    };
const nubBy = (pred, list) => {
        if (isEmptyList(list)) {
            return of(list);
        }
        const limit = length(list);
        let ind = 0,
            currItem,
            out = of(list),
            anyOp = storedItem => pred(currItem, storedItem);
        for (; ind < limit; ind += 1) {
            currItem = list[ind];
            if (any(anyOp, out)) {
                continue;
            }
            out = append(out, currItem);
        }
        return out;
    };
const removeBy = (pred, x, list) => { // @todo optimize this implementation
        const foundIndex = findIndex(item => pred(x, item), list),
            parts = splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
        return append(parts[0], tail(parts[1]));
    };
const removeFirstsBy = (pred, xs1, xs2) =>
        foldl((agg, item) => removeBy(pred, item, agg), xs1, xs2);
const unionBy = (pred, arr1, arr2) => {
        const aggregator = aggregatorByType(arr1);
        return foldl((agg, b) => {
            const alreadyAdded = any(a => pred(a, b), agg);
            return !alreadyAdded ? aggregator(agg, b) : agg;
        }, copy(arr1), arr2);
    };
const union = (arr1, arr2) =>
        append(arr1,
            filter$1(elm => !includes(elm, arr1), arr2));
const intersect = (arr1, arr2) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            filter$1(elm => includes(elm, arr2), arr1);
const intersectBy = (pred, list1, list2) => {
        const aggregator = aggregatorByType(list1);
        return foldl((agg, a) =>
                any(b => pred(a, b), list2) ? aggregator(agg, a) : agg
            , [], list1);
    };
const difference = (array1, array2) => { // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return sliceFrom(0, array1);
        }
        else if (!array1 && array2 || (!array1 && !array2)) {
            return [];
        }
        const aggregator = aggregatorByType(array1);
        return reduce$1((agg, elm) =>
                !includes(elm, array2) ? aggregator(agg, elm) : agg
            , [], array1);
    };
const complement = (arr0, ...arrays) =>
        reduce$1((agg, arr) => append(agg, difference(arr, arr0)), [], arrays);

const objUnion$1 = (obj1, obj2) => assignDeep$1(obj1, obj2);
const objIntersect$1 = (obj1, obj2) => foldl((agg, key) => {
        if (hasOwnProperty$1(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
const objDifference$1 = (obj1, obj2) => foldl((agg, key) => {
        if (!hasOwnProperty$1(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
const objComplement$1 = (obj0, ...objs) => foldl((agg, obj) =>
        assignDeep$1(agg, objDifference$1(obj, obj0)), {}, objs);

/**
 * @module objectOps
 */
const prop$$1 = curry(prop$1);
const instanceOf$$1 = curry(instanceOf$1);
const hasOwnProperty$$1 = curry(hasOwnProperty$1);
const assign$$1 = curry2(assign$1);
const assignDeep$$1 = curry2(assignDeep$1);
const objUnion$$1 = curry(objUnion$1);
const objIntersect$$1 = curry(objIntersect$1);
const objDifference$$1 = curry(objDifference$1);
const objComplement$$1 = curry2(objComplement$1);
const isType$$1 = curry(isType$1);

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:objectOps.isClass
     * @param x {*}
     * @returns {boolean}
     */

    /**
     * Returns a booleanOps depicting whether a value is callable or not.
     * @function module:objectOps.isCallable
     * @tentative
     * @private
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is an arrayOps.
     * @function module:objectOps.isArray
     * @param value {*}
     * @returns {boolean}
     */

    /**
     * Checks whether value is an object or not.
     * @function module:objectOps.isObject
     * @param value
     * @returns {Boolean}
     */

    /**
     * Checks if value is a booleanOps.
     * @function module:objectOps.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:objectOps.isNumber
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is a string or not.
     * @function module:objectOps.isString
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `Map` or not.
     * @function module:objectOps.isMap
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `Set` or not.
     * @function module:objectOps.isSet
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:objectOps.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:objectOps.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is undefined.
     * @function module:objectOps.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is null.
     * @function module:objectOps.isNull
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is a `Symbol`.
     * @function module:objectOps.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * @tentative
     * @private
     */

    /**
     * Checks if given `x` is one of the four
     * "usable" immutable JS primitives; I.e.,
     *  One of [String, Boolean, Number, Symbol]
     * @function module:objectOps.isUsableImmutablePrimitive
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if !length.
     * @function module:objectOps.isEmptyList
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if object has own properties/enumerable-props or not.
     * @function module:objectOps.isEmptyObject
     * @param obj {*}
     * @returns {Boolean}
     */

    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @function module:objectOps.isEmptyCollection
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks to see if passed in argument is empty.
     * @function module:objectOps.isEmpty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */

    /**
     * Returns whether passed in values is defined and not null.
     * @function module:objectOps.isset
     * @param x {*}
     * @returns {Boolean}
     */

const until$1 = (predicate, operation, typeInstance) => {
        let result = typeInstance;
        while (!predicate(result)) {
            result = operation(result);
        }
        return result;
    };

const flipN$1 = fn => (...args) => apply(fn, reverse(args));
const flip3$1 = fn => (a, b, c) => call(fn, c, b, a);
const flip4$1 = fn => (a, b, c, d) => call(fn, d, c, b, a);
const flip5$1 = fn => (a, b, c, d, e) => call(fn, e, d, c, b, a);
const flip$1 = fn => (b, a) => call(fn, a, b);

/**
 * @memberOf _functionOps
 * @author elydelacruz
 * @created 12/6/2016.
 * @description Curry implementation with place holder concept (`__`).
 * @todo Make code here more minimal (reuse small parts here).
 */

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
const PlaceHolder = function PlaceHolder() {};
const placeHolderInstance = new PlaceHolder();

/**
 * Checks to see if value is a `PlaceHolder`.
 * @param instance {*}
 * @returns {boolean}
 * @private
 */
function isPlaceHolder (instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `_listOps`.
 * @function replacePlaceHolder
 * @private
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `_listOps` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders (array, args) {
    let out = map(element => {
            if (!isPlaceHolder(element)) { return element; }
            else if (length(args)) { return args.shift(); }
            return element;
        }, array);
    return length(args) ? concat(out, args) : out;
}

/**
 * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function module:_functionOps.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
function curry_ (fn, ...argsToCurry) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(argsToCurry, args),
            placeHolders = filter(isPlaceHolder, concatedArgs),
            canBeCalled = length(placeHolders) === 0 &&
                length(concatedArgs) >= length(fn);
        return canBeCalled ? apply(fn, concatedArgs) :
            apply(curry_, concat([fn], concatedArgs));
    };
}

/**
 * Curries a _functionOps up to given arity also enforces arity via placeholder values (`__`).
 * @function module:_functionOps.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in _functionOps wrapped in a _functionOps for currying.
 */
function curryN_ (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = filter(isPlaceHolder, concatedArgs),
            canBeCalled = (length(concatedArgs) - length(placeHolders) >= executeArity) || !executeArity;
        return !canBeCalled ?
            apply(curryN_, concat([executeArity, fn], concatedArgs)) :
            apply(fn, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @memberOf _functionOps
 * @type {PlaceHolder}
 */
let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
let curry2_ = fn => curryN_(2, fn);
let curry3_ = fn => curryN_(3, fn);
let curry4_ = fn => curryN_(4, fn);
let curry5_ = fn => curryN_(5, fn);

/**
 * @memberOf _functionOps
 */

/**
 * Returns passed in parameter.
 * @haskellType `id :: a -> a`
 * @function module:_functionOps.id
 * @param x {*}
 * @returns {*}
 */
const id = x => x;

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @function module:_functionOps.compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */
const compose = (...args) =>
        arg0 => reduceRight((value, fn) => fn(value), arg0, args);

/**
 * Function operations: `
 * @module functionOps
 */

const apply$1 = curry(apply);
const call$1 = curry2(call);
const until$$1 = curry(until$1);
const flipN$$1 = fn => curry3((...args) => apply$1(fn, reverse(args)));
const flip$$1 = fn => curry(flip$1(fn));
const flip3$$1 = fn => curry(flip3$1(fn));
const flip4$$1 = fn => curry(flip4$1(fn));
const flip5$$1 = fn => curry(flip5$1(fn));

    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:functionOps.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     * @curried
     */

    /**
     * Curries a function up to a given arity.
     * @function module:functionOps.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:functionOps.curry2
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:functionOps.curry3
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:functionOps.curry4
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:functionOps.curry5
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
     * @function module:functionOps.curry_
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */

    /**
     * Curries a function up to given arity also enforces arity via placeholder values (`__`).
     * @function module:functionOps.curryN_
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
     * @returns {Function} - Passed in function wrapped in a function for currying.
     */

    /**
     * Place holder object (frozen) used by curry.
     * @memberOf functionOps
     * @type {PlaceHolder}
     */

    /**
     * Curries a function up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call function until 2 or more args).
     * @function module:functionOps.curry2_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call function until 3 or more args).
     * @function module:functionOps.curry3_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call function until 4 or more args).
     * @function module:functionOps.curry4_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call function until 5 or more args).
     * @function module:functionOps.curry5_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes two parameters and returns a negated version of given
     * function.
     * @function module:functionOps.negateF
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes three parameters and returns a
     * negated version of given function.
     * @function module:functionOps.negateF3
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:functionOps.negateF4
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:functionOps.negateF5
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
     * @function module:_functionOps.negateP
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
     * @function module:_functionOps.negateFMany
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Returns passed in parameter.
     * @haskellType `id :: a -> a`
     * @function module:functionOps.id
     * @param x {*}
     * @returns {*}
     */

    /**
     * Composes all functions passed in from right to left passing each functions return value to
     * the function on the left of itself.
     * @function module:functionOps.compose
     * @param ...args {Function}
     * @returns {Function}
     */

/**
 * @module _functionOps
 * @memberOf functionOps
 * @private
 */

/**
 * List operators.
 * @module listOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to
 *  return undefined (and also determine which cases are ok for just returning undefined).
 * @todo code unperformant shorthand in `listOps`
 * @todo rename monoid functions to normal functions since we are not really defining methods for monoids here.
 */
// Uncurried methods import
// Exported internals
const append$1 = curry(append);
const appendMany$1 = curry2(appendMany);
const concatMap$1 = curry2(concatMap);
const map$2 = curry(map$1);
const intersperse$1 = curry(intersperse);
const intercalate$1 = curry(intercalate);
const foldl$1 = curry(foldl);
const foldr$1 = curry(foldr);
const foldl1$1 = curry(foldl1);
const foldr1$1 = curry(foldr1);
const mapAccumL$1 = curry(mapAccumL);
const mapAccumR$1 = curry(mapAccumR);
const iterate$1 = curry(iterate);
const repeat$1 = curry(repeat);
const replicate$1 = repeat$1;
const cycle$1 = curry(cycle);
const unfoldr$1 = curry(unfoldr);
const findIndex$1 = curry(findIndex);
const findIndices$1 = curry(findIndices);
const elemIndex$1 = curry(elemIndex);
const elemIndices$1 = curry(elemIndices);
const take$1 = curry(take);
const drop$1 = curry(drop);
const splitAt$1 = curry(splitAt);
const takeWhile$1 = curry(takeWhile);
const dropWhile$1 = curry(dropWhile);
const dropWhileEnd$1 = curry(dropWhileEnd);
const span$1 = curry(span);
const breakOnList$1 = curry(breakOnList);
const at$1 = curry(at);
const find$1 = curry(find);
const filter$2 = curry(filter$1);
const partition$1 = curry(partition);
const elem$1 = curry(elem);
const notElem$1 = curry2(notElem);
const lookup$1 = at$1;
const isPrefixOf$1 = curry(isPrefixOf);
const isSuffixOf$1 = curry(isSuffixOf);
const isInfixOf$1 = curry(isInfixOf);
const isSubsequenceOf$1 = curry(isSubsequenceOf);
const groupBy$1 = curry(groupBy);
const stripPrefix$1 = curry(stripPrefix);
const zip$1 = curry(zip);
const zipWith$1 = curry(zipWith);
const zipWithN$1 = curry3(zipWithN);
const zipWith3$1 = curry4(zipWithN$1);
const zipWith4$1 = curry5(zipWithN$1);
const zipWith5$1 = curryN(6, zipWithN$1);
const any$1 = curry(any);
const all$1 = curry(all);
const scanl$1 = curry(scanl);
const scanl1$1 = curry(scanl1);
const scanr$1 = curry(scanr);
const scanr1$1 = curry(scanr1);
const remove$1 = curry(remove);
const sortOn$1 = curry(sortOn);
const sortBy$1 = curry(sortBy);
const insert$1 = curry(insert);
const insertBy$1 = curry(insertBy);
const nubBy$1 = curry(nubBy);
const removeBy$1 = curry(removeBy);
const removeFirstsBy$1 = curry(removeFirstsBy);
const unionBy$1 = curry(unionBy);
const union$1 = curry(union);
const intersect$1 = curry(intersect);
const intersectBy$1 = curry(intersectBy);
const difference$1 = curry(difference);
const complement$1 = curry2(complement);

/**
 * Created by elydelacruz on 9/6/2017.
 * @module jsPlatform_string
 * @private
 */

/**
 * Functional version of `String.prototype.split`.
 * @curried
 * @function module:jsPlatform_string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
const split$1 = curry(split);

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module stringOps
 */
const lines = split$1(/[\n\r]/gm);
const words = split$1(/[\s\t]/gm);
const unwords = intercalate$1(' ');
const unlines = intercalate$1('\n');

/**
 * Created by elyde on 12/6/2016.
 * @file fjl.js
 * @goal to include everything from haskell's Prelude where it makes sense in order to create
 *  a subset of functions which can make the javascript developer more efficient and make his/her
 *  code more concise (and functional).
 * @description Includes operations from haskell's Prelude.
 * @motivation preludejs, lodash/fp, RamdaJs, Haskell.
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Prelude.html
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Data-List.html
 * @module fjl
 */

export { instanceOf$1 as _instanceOf, isType$1 as _isType, hasOwnProperty$1 as _hasOwnProperty, assign$1 as _assign, prop$1 as _prop, assignDeep$1 as _assignDeep, objUnion$1 as _objUnion, objComplement$1 as _objComplement, objIntersect$1 as _objIntersect, objDifference$1 as _objDifference, prop$$1 as prop, instanceOf$$1 as instanceOf, hasOwnProperty$$1 as hasOwnProperty, assign$$1 as assign, assignDeep$$1 as assignDeep, objUnion$$1 as objUnion, objIntersect$$1 as objIntersect, objDifference$$1 as objDifference, objComplement$$1 as objComplement, isType$$1 as isType, length, keys, isFunction, isClass, isCallable, isArray, isObject, isBoolean, isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined, isNull, isSymbol, isUsableImmutablePrimitive, isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, isset, typeOf, of, isTruthy, isFalsy, alwaysTrue, alwaysFalse, apply as _apply, call as _call, until$1 as _until, flip$1 as _flip, flip3$1 as _flip3, flip4$1 as _flip4, flip5$1 as _flip5, flipN$1 as _flipN, apply$1 as apply, call$1 as call, until$$1 as until, flipN$$1 as flipN, flip$$1 as flip, flip3$$1 as flip3, flip4$$1 as flip4, flip5$$1 as flip5, curry, curryN, curry2, curry3, curry4, curry5, curry_, curryN_, __, curry2_, curry3_, curry4_, curry5_, negateF, negateF3, negateF4, negateF5, negateP, negateFMany, id, compose, append as _append, appendMany as _appendMany, all as _all, any as _any, find as _find, findIndex as _findIndex, findIndices as _findIndices, zip as _zip, zipN as _zipN, zipWith as _zipWith, map$1 as _map, mapAccumL as _mapAccumL, mapAccumR as _mapAccumR, elem as _elem, notElem as _notElem, elemIndex as _elemIndex, elemIndices as _elemIndices, lookup as _lookup, intersperse as _intersperse, intercalate as _intercalate, iterate as _iterate, repeat as _repeat, replicate as _replicate, cycle as _cycle, take as _take, drop as _drop, splitAt as _splitAt, foldl as _foldl, foldl1 as _foldl1, foldr as _foldr, foldr1 as _foldr1, unfoldr as _unfoldr, concatMap as _concatMap, takeWhile as _takeWhile, dropWhile as _dropWhile, dropWhileEnd as _dropWhileEnd, partition as _partition, at as _at, span as _span, breakOnList as _breakOnList, stripPrefix as _stripPrefix, isPrefixOf as _isPrefixOf, isSuffixOf as _isSuffixOf, isInfixOf as _isInfixOf, isSubsequenceOf as _isSubsequenceOf, filter$1 as _filter, remove as _remove, insert as _insert, insertBy as _insertBy, nubBy as _nubBy, removeBy as _removeBy, removeFirstsBy as _removeFirstsBy, unionBy as _unionBy, sortOn as _sortOn, sortBy as _sortBy, complement as _complement, difference as _difference, union as _union, intersect as _intersect, intersectBy as _intersectBy, groupBy as _groupBy, append$1 as append, appendMany$1 as appendMany, concatMap$1 as concatMap, map$2 as map, intersperse$1 as intersperse, intercalate$1 as intercalate, foldl$1 as foldl, foldr$1 as foldr, foldl1$1 as foldl1, foldr1$1 as foldr1, mapAccumL$1 as mapAccumL, mapAccumR$1 as mapAccumR, iterate$1 as iterate, repeat$1 as repeat, replicate$1 as replicate, cycle$1 as cycle, unfoldr$1 as unfoldr, findIndex$1 as findIndex, findIndices$1 as findIndices, elemIndex$1 as elemIndex, elemIndices$1 as elemIndices, take$1 as take, drop$1 as drop, splitAt$1 as splitAt, takeWhile$1 as takeWhile, dropWhile$1 as dropWhile, dropWhileEnd$1 as dropWhileEnd, span$1 as span, breakOnList$1 as breakOnList, at$1 as at, find$1 as find, filter$2 as filter, partition$1 as partition, elem$1 as elem, notElem$1 as notElem, lookup$1 as lookup, isPrefixOf$1 as isPrefixOf, isSuffixOf$1 as isSuffixOf, isInfixOf$1 as isInfixOf, isSubsequenceOf$1 as isSubsequenceOf, groupBy$1 as groupBy, stripPrefix$1 as stripPrefix, zip$1 as zip, zipWith$1 as zipWith, zipWithN$1 as zipWithN, zipWith3$1 as zipWith3, zipWith4$1 as zipWith4, zipWith5$1 as zipWith5, any$1 as any, all$1 as all, scanl$1 as scanl, scanl1$1 as scanl1, scanr$1 as scanr, scanr1$1 as scanr1, remove$1 as remove, sortOn$1 as sortOn, sortBy$1 as sortBy, insert$1 as insert, insertBy$1 as insertBy, nubBy$1 as nubBy, removeBy$1 as removeBy, removeFirstsBy$1 as removeFirstsBy, unionBy$1 as unionBy, union$1 as union, intersect$1 as intersect, intersectBy$1 as intersectBy, difference$1 as difference, complement$1 as complement, and, or, zipN, unzip, unzipN, head, last, init, tail, uncons, concat$1 as concat, reverse$1 as reverse, transpose, subsequences, permutations, group, inits, tails, sum, product, maximum, minimum, sort, nub, lines, words, unwords, unlines };
