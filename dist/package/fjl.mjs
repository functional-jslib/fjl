/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
 */
const _Number = Number.name;
const _NaN = 'NaN';
const _Null = 'Null';
const _Undefined = 'Undefined';

/**
 * Returns the constructor/class/type name of a value.
 * @note Returns 'NaN' if value is of type `Number` and value is `isNaN`.
 * @note Returns 'Undefined' if value is `undefined`
 * @note Returns 'Null' if value is `null`
 * For values that have no concrete constructors and/or casters
 * (null, NaN, and undefined) we returned normalized names for them ('Null', 'NaN', 'Number')
 * @function module:object.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name or derived name (in the case of `null`, `undefined`, or `NaN` (whose
 *  normalized names are 'Null', 'Undefined', 'NaN' respectively).
 */
function typeOf (value) {
    let retVal;
    if (value === undefined) {
        retVal = _Undefined;
    }
    else if (value === null) {
        retVal = _Null;
    }
    else {
        let constructorName = (value).constructor.name;
        retVal = constructorName === _Number && isNaN(value) ?
            _NaN : constructorName;
    }
    return retVal;
}

const fnOrError$1 = (symbolName, f) => {
        if (!f || typeof f !== 'function') {
            throw new Error(`${symbolName} should be a function. ` +
                `Type received: ${typeOf(f)};  Value received: ${f}.`);
        }
        return f;
    };

/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

const curryNotFnErrPrefix = '`fn` in `curry(fn, ...args)`';
const curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = curriedArgs.concat(args),
                canBeCalled = (concatedArgs.length >= executeArity) || !executeArity;
            return !canBeCalled ? curryN.apply(null, [executeArity, fnOrError$1(curryNotFnErrPrefix, fn)].concat(concatedArgs)) :
                fnOrError$1(curryNotFnErrPrefix, fn).apply(null, concatedArgs);
        };
    };
const curry = (fn, ...argsToCurry) => curryN(fnOrError$1(curryNotFnErrPrefix, fn).length, fn, ...argsToCurry);
const curry2 = fn => curryN(2, fn);
const curry3 = fn => curryN(3, fn);
const curry4 = fn => curryN(4, fn);
const curry5 = fn => curryN(5, fn);

const fPureTakesOne = name => curry((arg, f) => f[name](arg));
const fPureTakes2 = name => curry((arg1, arg2, f) => f[name](arg1, arg2));
const fPureTakes3 = name => curry((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3));
const fPureTakes4 = name => curry((arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4));
const fPureTakes5 = name => curry((arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5));
const fPureTakesOneOrMore = name => curry2((f, ...args) => f[name](...args));
const fnOrError = (symbolName, f) => {
        if (!f || typeof f !== 'function') {
            throw new Error (`${symbolName} should be a function. ` +
                `Type received: ${typeOf(f)};  Value received: ${f}.`);
        }
        return f;
    };

/**
 * Created by elydelacruz on 9/6/2017.
 * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
 * throughout the library.  @note Doesn't include all methods for objects just the ones used in
 *  the library.
 * @todo change all files named '*UnCurried' to '*_'.
 */

const instanceOf = curry((instanceConstructor, instance) =>
        instance instanceof instanceConstructor);
const hasOwnProperty = fPureTakesOne('hasOwnProperty');
const length = x => x.length;
const {keys} = Object;
const assign = (() => Object.assign ?
            (obj0, ...objs) => Object.assign(obj0, ...objs) :
            (obj0, ...objs) => objs.reduce((topAgg, obj) => {
                return keys(obj).reduce((agg, key) => {
                    agg[key] = obj[key];
                    return agg;
                }, topAgg);
            }, obj0)
        )();

/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
 */

let _String = String.name;
let _Number$1 = Number.name;
let _Object = Object.name;
let _Boolean = Boolean.name;
let _Function = Function.name;
let _Array = Array.name;
let _Symbol = 'Symbol';
let _Map = 'Map';
let _Set = 'Set';
let _WeakMap = 'WeakMap';
let _WeakSet = 'WeakSet';
let _Null$1 = 'Null';
let _Undefined$1 = 'Undefined';

const isFunction = instanceOf(Function);
const isType = curry((type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type));
const isClass = x => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
const isCallable = x => isFunction(x) && !isClass(x);
const {isArray} = Array;
const isObject = isType(_Object);
const isBoolean = isType(_Boolean);
const isNumber = isType(_Number$1);
const isString = isType(_String);
const isMap = isType(_Map);
const isSet = isType(_Set);
const isWeakMap =isType(_WeakMap);
const isWeakSet = isType(_WeakSet);
const isUndefined = isType(_Undefined$1);
const isNull = isType(_Null$1);
const isSymbol = isType(_Symbol);
const isUsableImmutablePrimitive = x => {
        const typeOfX = typeOf(x);
        return isset(x) &&
            [_String, _Number$1, _Boolean, _Symbol]
                .some(Type => Type === typeOfX);
    };
const isEmptyList = x => !length(x);
const isEmptyObject = obj => isEmptyList(keys(obj));
const isEmptyCollection = x => x.size === 0;
const isEmpty = value => {
        let retVal;
        if (!value) { // if '', 0, `null`, `undefined`, or `false` then is empty
            retVal = true;
        }
        const typeOfValue = typeOf(value);
        if (typeOfValue === _Array || typeOfValue === _Function) {
            retVal = isEmptyList(value);
        }
        else if (typeOfValue === _Number$1) {
            retVal = false;
        }
        else if (typeOfValue === _Object) {
            retVal = isEmptyObject(value);
        }
        else if (hasOwnProperty('size', value) && isNumber(value.size)) {
            retVal = isEmptyCollection(value);
        }
        else {
            retVal = !value;
        }
        return retVal;
    };
const isset = x => x !== null && x !== undefined;

/**
 * @memberOf object
 */

/**
 * Returns property value if found; Else `undefined`.
 * @note This method is null/undefined safe (will not throw on `null` or `undefined`).
 * @function module:object.prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
const prop = curry((name, obj) => isset(obj) ? obj[name] : undefined);

/**
 * Created by elydelacruz on 9/7/2017.
 * @module _jsPlatform_function
 * @private
 */
const apply = curry((fn, args) => fn.apply(null, args));
const call = (fn, ...args) => apply(fn, args);

/**
 * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
 * ```
 * // - If exists `(value).constructor.of` uses this.
 * // - If value is of one String, Boolean, Symbol, or Number types calls it's
 * //      constructor as a function (in cast form;  E.g., `constructor(...args)` )
 * // - Else if constructor is a function, thus far, then calls constructor using
 * //      the `new` keyword (with any passed in args).
 * ```
 * @function module:object.of
 * @param x {*} - Value to derive returned value's type from.
 * @param [args] {...*} - Any args to pass in to matched construction strategy.
 * @returns {*|undefined} - New value of given value's type else `undefined`.
 */
const of = (x, ...args) => {
    if (!isset(x)) { return undefined; }
    const constructor = x.constructor;
    if (hasOwnProperty('of', constructor)) {
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

const copy = (x, out) => {
        // if `null`, `undefined`, `''`, `0`, `false` return
        if (!x) { return x; }
        switch (typeOf(x)) {
            case Array.name:
                return !out ? x.slice(0) : Object.assign(out, x);

            // If immutable primitive, return it
            case Symbol.name:
            case Boolean.name:
            case String.name:
            case Number.name:
            case Promise.name:
            case Function.name:
            case 'NaN':
            case 'Null':
            case 'Undefined':
                return x;

            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
                return new x.constructor(Array.from(x));

            // Else make copy
            default:
                return Object.assign(!out ? of(x) : out, x);
        }
    };

const searchObj = curry((nsString, obj) => {
        if (!obj) { return obj; }
        if (nsString.indexOf('.') === -1) {
            return obj[nsString];
        }
        const parts = nsString.split('.'),
            limit = parts.length;
        let ind = 0,
            parent = obj;
        for (; ind < limit; ind += 1) {
            const node = parent[parts[ind]];
            if (!isset(node)) {
                return node;
            }
            parent = node;
        }
        return parent;
    });

const assignDeep = (obj0, ...objs) =>
        !obj0 ? obj0 : objs.reduce((topAgg, obj) =>
            !obj ? topAgg : keys(obj).reduce((agg, key) => {
                let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if (hasOwnProperty(key, agg) && propDescription &&
                    !(propDescription.get && propDescription.set) &&
                    !propDescription.writable) {
                    return agg;
                }
                if (isObject(agg[key]) && isObject(obj[key])) {
                    assignDeep(agg[key], obj[key]);
                }
                else { agg[key] = obj[key]; }
                return agg;
            }, topAgg)
        , obj0);

/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length`)
 *      on both strings and arrays.
 */

const concat$1 = fPureTakesOneOrMore('concat');
const slice = fPureTakes2('slice');
const includes = (() => 'includes' in Array.prototype ?
            fPureTakesOne('includes') :
            (value, xs) => xs.indexOf(value) > -1)();
const indexOf = fPureTakesOne('indexOf');
const lastIndexOf = fPureTakesOne('lastIndexOf');

/**
 * @memberOf function
 */

const negateF = fn => x => !fn(x);
const negateF2 = fn => curry((a, b) => !fn(a, b));
const negateF3 = fn => curry((a, b, c) => !fn(a, b, c));
const negateFN = fn => (...args) => !apply(fn, args);

/**
 * @module boolean
 * @description Contains functional version of 'always-true', 'always-false', 'is-truthy', and 'is-falsy'.
 */

const isTruthy = value => !!value;
const isFalsy = value => !value;
const alwaysTrue = () => true;
const alwaysFalse = () => false;

/**
 * @function module:list.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
const map = curry((fn, xs) =>  {
    let ind = 0,
        limit = length(xs),
        out = [];
    if (!limit) { return out; }
    while (ind < limit) {
        out.push(fn(xs[ind], ind, xs));
        ind += 1;
    }
    return out;
});

const aggregateArr$ = (agg, item) => {
        agg.push(item);
        return agg;
    };

/**
 * List operator utils module.
 * @module _listOpUtils
 * @private
 */
const sliceFrom = curry((startInd, arr) => slice(startInd, undefined, arr));
const sliceTo = curry((toInd, xs) => slice(0, toInd, xs));
const sliceCopy = sliceFrom(0);
const genericAscOrdering = curry((a, b) => {
        if (a > b) { return 1; }
        else if (a < b) { return -1; }
        return 0;
    });
const lengths = (...lists) => length(lists) ? map(length, lists) : [];
const lengthsToSmallest = (...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = Math.min.apply(Math, listLengths);
        return map((list, ind) => listLengths[ind] > smallLen ?
            sliceTo(smallLen, list) : sliceCopy(list), lists);
    };
const reduceUntil = curry((pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    });
const reduceRightUntil = curry((pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    });
const reduce = reduceUntil(alwaysFalse);
const reduceRight = reduceRightUntil(alwaysFalse);
const lastIndex = x => { const len = length(x); return len ? len - 1 : 0; };
const findIndexWhere = curry((pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    });
const findIndexWhereRight = curry((pred, arr) => {
        const limit = length(arr);
        let ind = limit,
            predicateFulfilled = false;
        for (; ind >= 0 && !predicateFulfilled; --ind) {
            predicateFulfilled = pred(arr[ind], ind, arr);
        }
        return ind;
    });
const findIndicesWhere = curry((pred, xs) => {
        if (!xs || !xs.length) { return undefined; }
        const limit = length(xs);
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out.length ? out : undefined;
    });
const findWhere = curry((pred, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return; }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) { return elm; }
        }
    });

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
const reduceRight$1 = fPureTakes2('reduceRight');
const join = fPureTakesOne('join');
const push = fPureTakesOneOrMore('push');
const reverse$1 = defineReverse();

/**
 * Created by elydelacruz on 9/6/2017.
 */

/**
 * Functional version of `String.prototype.split`.
 * @function module:_string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
const split = fPureTakesOne('split');

/**
 * @module jsPlatform_
 * @private
 */

/**
 * List operations module (un-curried version).
 * @module list
 */
const append = (...args) => {
        const len = length(args);
        if (!len) { return []; }
        else if (len === 1) { return sliceCopy(args[0]); }
        if (len >= 2) { return apply(concat$1, args); }
        throw new Error(`'\`append\` requires at 2 or more arguments.  ${length(args)} args given.`);
    };
const head = x => x[0];
const last = xs => xs[lastIndex(xs)];
const tail = xs => sliceFrom(1, xs);
const init = xs => sliceTo(lastIndex(xs), xs);
const uncons = xs =>
        !xs || length(xs) === 0 ? undefined : [head(xs), tail(xs)];
const unconsr = xs => !xs || length(xs) === 0 ? undefined : [init(xs), last(xs)];
const concat$$1 = xs => !length(xs) ? sliceCopy(xs) : apply(append, xs);
const concatMap = curry((fn, foldableOfA) => concat$$1(map(fn, foldableOfA)));
const reverse = x => foldr((agg, item) => (agg.push(item), agg), [], x);
const intersperse = curry((between, arr) => {
        const limit = length(arr),
            lastInd = limit - 1,
            out = [];
        if (!limit) {
            return out;
        }
        return foldl((agg, item, ind) => (
                ind === lastInd ?
                    agg.push(item) :
                    agg.push(item, between),
                agg
            ), out, arr);
    });
const intercalate = curry((xs, xss) => concat$$1(intersperse(xs, xss)));
const transpose = xss => {
        let numLists = length(xss),
            ind = 0, ind2;
        if (!numLists) {
            return [];
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
        return filter(x => length(x), outLists);
    };
const subsequences = xs => {
        const listLen = length(xs),
            len = Math.pow(2, listLen),
            out = [];
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
    };
const swapped = curry((ind1, ind2, list) => {
        const out = sliceCopy(list),
            tmp = out[ind1];
        out[ind1] = out[ind2];
        out[ind2] = tmp;
        return out;
    });
const permutations = xs => {
        const limit = length(xs);

        if (!limit || limit === 1) {
            return [xs];
        }

        let list = sliceCopy(xs),
            c = repeat(limit, 0),
            i = 0;

        const out = [list];

        for (; i < limit; i++) {
            if (c[i] < i) {
                list = swapped(i % 2 === 0 ? 0 : c[i], i, list);
                out.push(list);
                c[i] += 1;
                i = 0;
                continue;
            }
            c[i] = 0;
        }

        return out;
    };
const foldl = reduce;
const foldr = reduceRight;
const foldl1 = curry((op, xs) => {
        const parts = uncons(xs);
        return !parts ? [] : reduce(op, parts[0], parts[1]);
    });
const foldr1 = curry((op, xs) => {
        const parts = unconsr(xs);
        return !parts ? [] : reduceRight(op, parts[1], parts[0]);
    });
const mapAccumL = curry((op, zero, xs) => {
        const list = sliceCopy(xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = 0,
            agg = zero,
            mapped = [],
            tuple;
        for (; ind < limit; ind++) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    });
const mapAccumR = curry((op, zero, xs) => {
        const list = sliceCopy(xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = limit - 1,
            agg = zero,
            mapped = [],
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    });
const iterate = curry((limit, op, x) => {
        let ind = 0,
            out = [],
            lastX = x;
        for (; ind < limit; ind += 1) {
            out.push(lastX);
            lastX = op(lastX, ind);
        }
        return out;
    });
const repeat = curry((limit, x) => iterate(limit, a => a, x));
const replicate = repeat;
const cycle = curry((limit, xs) => concat$$1(replicate(limit, xs)));
const unfoldr = curry((op, x) => {
        let ind = 0,
            out = [],
            resultTuple = op(x, ind, out);
        while (resultTuple) {
            out.push(resultTuple[0]);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    });
const findIndex = findIndexWhere;
const findIndices = findIndicesWhere;
const elemIndex = curry((x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    });
const elemIndices = curry((value, xs) => findIndices(x => x === value, xs));
const take = sliceTo;
const drop = sliceFrom;
const splitAt = (ind, list) => [ sliceTo(ind, list), sliceFrom(ind, list) ];
const takeWhile = curry((pred, list) =>
        reduceUntil(
            negateF3(pred),  // predicate
            aggregateArr$,   // operation
            [],             // aggregator
            list
        ));
const dropWhile = curry((pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhere((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            slice(splitPoint, limit, list);
    });
const dropWhileEnd = curry((pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhereRight((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            sliceTo(splitPoint + 1, list);
    });
const span = curry((pred, list) => {
        const splitPoint = findIndexWhere(negateF3(pred), list);
        return splitPoint === -1 ?
            splitAt(0, list) : splitAt(splitPoint, list);
    });
const breakOnList = curry((pred, list) => {
        const splitPoint = findIndexWhere(pred, list);
        return splitPoint === -1 ?
            splitAt(0, list) : splitAt(splitPoint, list);
    });
const at = prop;
const find = findWhere;
const filter = curry((pred, xs) => {
        let ind = 0,
            limit = length(xs),
            out = [];
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out.push(xs[ind]);
            }
        }
        return out;
    });
const partition = curry((pred, list) =>
        !length(list) ?
            [[], []] :
                [filter(pred, list), filter(negateF3(pred), list)]);
const elem = includes;
const notElem = negateF2(includes);
const lookup = at;
const isPrefixOf = curry((xs1, xs2) => {
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
    });
const isSuffixOf = curry((xs1, xs2) => {
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
    });
const isInfixOf = curry((xs1, xs2) => {
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
    });
const isSubsequenceOf = curry((xs1, xs2) => {
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
    });
const group = xs => groupBy((a, b) => a === b, xs);
const groupBy = curry((equalityOp, xs) => {
        const limit = length(xs);
        if (!limit) {
            return sliceCopy(xs);
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
    });
const inits = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push(sliceTo(ind, xs));
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
            agg.push(slice(ind, limit, xs));
        }
        return agg;
    };
const stripPrefix = curry((prefix, list) =>
        isPrefixOf(prefix, list) ?
            splitAt(length(prefix), list)[1] :
            sliceCopy(list));
const zip = curry((arr1, arr2) => {
        if (!length(arr1) || !length(arr2)) {
            return [];
        }
        const [a1, a2] = lengthsToSmallest(arr1, arr2);
        return reduce((agg, item, ind) =>
                aggregateArr$(agg, [item, a2[ind]]),
            [], a1);
    });
const zipN = (...lists) => {
        const trimmedLists = apply(lengthsToSmallest, filter(length, lists)),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind) =>
                aggregateArr$(agg, map(xs => xs[ind], trimmedLists)),
            [], trimmedLists[0]);
    };
const zip3 = curry((arr1, arr2, arr3) => zipN(arr1, arr2, arr3));
const zip4 = curry((arr1, arr2, arr3, arr4) => zipN(arr1, arr2, arr3, arr4));
const zip5 = curry((arr1, arr2, arr3, arr4, arr5) => zipN(arr1, arr2, arr3, arr4, arr5));
const zipWith = curry((op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) {
            return [];
        }
        const [a1, a2] = lengthsToSmallest(xs1, xs2);
        return reduce((agg, item, ind) =>
                aggregateArr$(agg, op(item, a2[ind])),
            [], a1);
    });
const zipWithN = (op, ...lists) => {
        const trimmedLists = apply(lengthsToSmallest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind) =>
                aggregateArr$(agg, apply(op, map(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    };
const zipWith3 = curry((op, xs1, xs2, xs3) => zipWithN(op, xs1, xs2, xs3));
const zipWith4 = curry((op, xs1, xs2, xs3, xs4) => zipWithN(op, xs1, xs2, xs3, xs4));
const zipWith5 = curry((op, xs1, xs2, xs3, xs4, xs5) => zipWithN(op, xs1, xs2, xs3, xs4, xs5));
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
const any = curry((p, xs) => {
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
    });
const all = curry((p, xs) => {
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
    });
const and = xs => all(isTruthy, xs);
const or = xs => any(isTruthy, xs);
const not = xs => all(isFalsy, xs);
const sum = list => foldl((agg, x) => agg + x, 0, list);
const product = list => foldl((agg, x) => agg * x, 1, list);
const maximum = list => last(sortBy(genericAscOrdering, list));
const minimum = list => head(sortBy(genericAscOrdering, list));
const scanl = curry((fn, zero, xs) => {
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
    });
const scanl1 = curry((fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return scanl(fn, head(xs), tail(xs));
    });
const scanr = curry((fn, zero, xs) => {
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
    });
const scanr1 = curry((fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return scanr(fn, last(xs), init(xs));
    });
const nub = list => nubBy((a, b) => a === b, list);
const remove = curry((x, list) => removeBy((a, b) => a === b, x, list));
const sort = xs => sortBy(genericAscOrdering, xs);
const sortOn = curry((valueFn, xs) =>

        // Un-decorate
        map(decorated => decorated[1],

            // Decorate and sort
            sortBy(
                // Ordering
                ([a0], [b0]) => genericAscOrdering(a0, b0),

                // Decorate
                map(item => [valueFn(item), item], xs)
            )
        )
    );
const sortBy = curry((orderingFn, xs) => sliceCopy(xs).sort(orderingFn || genericAscOrdering));
const insert = curry((x, xs) => {
        if (!length(xs)) {
            return [x];
        }
        const foundIndex = findIndex(item => x <= item, xs);
        return foundIndex === -1 ? [x] :
            concat$$1(intersperse([x], splitAt(foundIndex, xs)));
    });
const insertBy = curry((orderingFn, x, xs) => {
        const limit = length(xs);
        if (!limit) {
            return [x];
        }
        let ind = 0;
        for (; ind < limit; ind += 1) {
            if (orderingFn(x, xs[ind]) <= 0) {
                const parts = splitAt(ind, xs);
                return concat$$1([parts[0], [x], parts[1]]);
            }
        }
        return aggregateArr$(sliceCopy(xs), x);
    });
const nubBy = curry((pred, list) => {
        if (!length(list)) {
            return [];
        }
        const limit = length(list);
        let ind = 0,
            currItem,
            out = [],
            anyOp = storedItem => pred(currItem, storedItem);
        for (; ind < limit; ind += 1) {
            currItem = list[ind];
            if (any(anyOp, out)) {
                continue;
            }
            out.push(currItem);
        }
        return out;
    });
const removeBy = curry((pred, x, list) => { // @todo optimize this implementation
        const foundIndex = findIndex(item => pred(x, item), list),
            parts = splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
        return append(parts[0], tail(parts[1]));
    });
const removeFirstsBy = curry((pred, xs1, xs2) =>
        foldl((agg, x2) => removeBy(pred, x2, agg), xs1, xs2));
const unionBy = curry((pred, arr1, arr2) =>
        foldl((agg, b) => {
                const alreadyAdded = any(a => pred(a, b), agg);
                return !alreadyAdded ? (agg.push(b), agg) : agg;
            }, sliceCopy(arr1), arr2
        ));
const union = curry((arr1, arr2) =>
        append(arr1,
            filter(elm => !includes(elm, arr1), arr2)));
const intersect = curry((arr1, arr2) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            filter(elm => includes(elm, arr2), arr1));
const intersectBy = curry((pred, list1, list2) =>
        foldl((agg, a) =>
                any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg
            , [], list1));
const difference = curry((array1, array2) => { // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return sliceCopy(array1);
        }
        else if (!array1 && array2 || (!array1 && !array2)) {
            return [];
        }
        return reduce((agg, elm) =>
                !includes(elm, array2) ? (agg.push(elm), agg) : agg
            , [], array1);
    });
const complement = (arr0, ...arrays) =>
        reduce((agg, arr) => append(agg, difference(arr, arr0)), [], arrays);

const objUnion = curry((obj1, obj2) => assignDeep(obj1, obj2));
const objIntersect = curry((obj1, obj2) => foldl((agg, key) => {
        if (hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1)));
const objDifference = curry((obj1, obj2) => foldl((agg, key) => {
        if (!hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1)));
const objComplement = (obj0, ...objs) => foldl((agg, obj) =>
        assignDeep(agg, objDifference(obj, obj0)), {}, objs);

const log = console.log.bind(console);
const error = console.error.bind(console);
const peek = (...args) => (log(...args), args.pop());

/**
 * @module object
 * @description Contains error throwing facilities for when a value doesn't match a type.
 *  In addition gives you curried and uncurried versions of the multi arity functions.
 */
const isCheckableType = type => isString(type) || isFunction(type);
const errorIfNotCheckableType = (contextName, type) => {
        if (!isCheckableType(type)) {
            throw new Error (`${contextName} expects \`type\` to be of type \`String\` or \`Function\`.` +
                `  Type received \`${typeOf(type)}\`.  Value \`${type}\`.`);
        }
        return type;
    };
const getTypeName = type => {
        errorIfNotCheckableType('getTypeName', type);
        return type.name || type;
    };
const _defaultTypeChecker = (Type, value) => isType(getTypeName(Type), value) || (
        isFunction(Type) && isset(value) && value instanceof Type);
const multiTypesToString = types => types.length ?
             types.map(type => `\`${getTypeName(type)}\``).join(', ') : '';
const defaultErrorMessageCall = tmplContext => {
        const {
            contextName, valueName, value, expectedTypeName,
            foundTypeName, messageSuffix
        } = tmplContext,
            isMultiTypeNames = isArray(expectedTypeName),
            typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types',
            typesToMatchCopy = isMultiTypeNames ? multiTypesToString(expectedTypeName) : expectedTypeName;
        return (contextName ? `\`${contextName}.` : '`') +
            `${valueName}\` is not ${typesCopy}: ${typesToMatchCopy}.  ` +
            `Type received: ${foundTypeName}.  Value: ${value};` +
            `${messageSuffix ?  '  ' + messageSuffix + ';' : ''}`;
    };
const _getErrorIfNotTypeThrower = (errorMessageCall, typeChecker = _defaultTypeChecker) =>
      (ValueType, contextName, valueName, value, messageSuffix = null) => {
        const expectedTypeName = getTypeName(ValueType),
            foundTypeName = typeOf(value);
        if (typeChecker(ValueType, value)) { return value; } // Value matches type
        throw new Error(errorMessageCall(
            {contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix}
        ));
    };
const _getErrorIfNotTypesThrower = (errorMessageCall, typeChecker = _defaultTypeChecker) =>
      (valueTypes, contextName, valueName, value) => {
            const expectedTypeNames = valueTypes.map(getTypeName),
                matchFound = valueTypes.some(ValueType => typeChecker(ValueType, value)),
                foundTypeName = typeOf(value);
            if (matchFound) { return value; }
            throw new Error(
                errorMessageCall({
                    contextName, valueName, value,
                    expectedTypeName: expectedTypeNames, foundTypeName
                })
            );
        };
const _errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall);
const _errorIfNotTypes = _getErrorIfNotTypesThrower(defaultErrorMessageCall);
const defaultTypeChecker = curry(_defaultTypeChecker);
const errorIfNotType = curry(_errorIfNotType);
const errorIfNotTypes = curry4(_errorIfNotTypes);
const getErrorIfNotTypeThrower = errorMessageCall => curry(_getErrorIfNotTypeThrower(errorMessageCall));
const getErrorIfNotTypesThrower = errorMessageCall => curry4(_getErrorIfNotTypesThrower(errorMessageCall));

/**
 * @typedef {*} Any - Synonym for 'any value'.
 */

/**
 * @typedef {String|Function} TypeRef
 * @description Type reference.  Type itself or Type's name;  E.g., `Type.name`;
 */

/**
 * @typedef {Object<value, valueName, expectedTypeName, foundTypeName, messageSuffix>} TemplateContext
 * @description Template context used for error message renderers (functions that take a context obj and return a string).
 * @property value {*}
 * @property valueName {String}
 * @property expectedTypeName {String} - Expected name of constructor of `value`;  E.g., usually `SomeConstructor.name`;
 * @property foundTypeName {String} - Found types name;  E.g., `FoundConstructor.name`;
 * @property [messageSuffix=null] {*} - Message suffix (sometimes an extra hint or instructions for
 *  directing user to fix where his/her error has occurred).  Optional.
 */

/**
 * @typedef {Array<(String|Function)>} TypesArray
 */

/**
 * @typedef {Function} TypeChecker
 * @description Checks whether a value is of given type.
 * @param Type {TypeRef} - a Type or it's name;  E.g., `Type.name`.
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * @typedef {Function} ErrorMessageCall
 * @description Error message template function.
 * @param tmplContext {TemplateContext}
 * @returns {String}
 */

/**
 * @typedef {Function} ErrorIfNotType
 * @description Used to ensure value matches passed in type.
 * @param type {TypeRef} - Constructor name or constructor.
 * @param contextName {String}
 * @param valueName {String}
 * @param value {*}
 * @throws {Error} - If value doesn't match type.
 * @returns {*} - What ever value is.
 */

/**
 * @typedef {Function} ErrorIfNotTypes
 * @description Used to ensure a value matches one of one or more types passed in.
 * @param valueTypes {TypesArray} - Array of constructor names or constructors.
 * @param contextName {String}
 * @param valueName {String}
 * @param value {*}
 * @throws {Error} - If value doesn't match type.
 * @returns {*} - Whatever value is.
 */

const jsonClone = x => JSON.parse(JSON.stringify(x));

const toAssocList = obj => keys(obj).map(key => [key, obj[key]]);
const toAssocListDeep = (obj, TypeConstraint = Object) => keys(obj).map(key =>
        TypeConstraint && isType(TypeConstraint, obj[key]) ?
            [key, toAssocListDeep(obj[key], TypeConstraint)] :
            [key, obj[key]]
    );
const fromAssocList = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        agg[key] = value;
        return agg;
    }, new OutType());
const fromAssocListDeep = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        if (isArray(value) && isArray(value[0]) && value[0].length === 2) {
            agg[key] = fromAssocListDeep(value, OutType);
            return agg;
        }
        agg[key] = value;
        return agg;
    }, new OutType());

const toArray = x => {
        switch (typeOf(x)) {
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
                return toAssocList(x);
        }
    };

/**
 * @module object
 * @description Object operations/combinators.
 */

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the function on the left of itself.
 * @function module:function.compose
 * @type {Function}
 * @param args {...{Function}}
 * @returns {Function}
 */
const compose = (...args) =>
        arg0 => reduceRight$1((value, fn) => fn(value), arg0, args);

/**
 * @memberOf function
 * @description Curry implementation with place holder concept (`__`).
 */

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
const PlaceHolder = function PlaceHolder() {};
const notFnErrPrefix = '`fn` in `curry_(fn, ...args)`';
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
 * Replaces `placeholder` values in `list`.
 * @function replacePlaceHolder
 * @private
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `list` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders (array, args) {
    let out = array.map(element => {
            if (!isPlaceHolder(element)) { return element; }
            else if (args.length) { return args.shift(); }
            return element;
        });
    return args.length ? out.concat(args) : out;
}

/**
 * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function module:function.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
function curry_ (fn, ...argsToCurry) {
    return curryN_(fnOrError$1(notFnErrPrefix, fn).length, fn, ...argsToCurry);
}

/**
 * Curries a function up to given arity also enforces arity via placeholder values (`__`).
 * @function module:function.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in function wrapped in a function for currying.
 */
function curryN_ (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = (concatedArgs.length - placeHolders.length >= executeArity) || !executeArity;
        return !canBeCalled ?
            curryN_.apply(null, [executeArity, fnOrError$1(notFnErrPrefix, fn)].concat(concatedArgs)) :
            fnOrError$1(notFnErrPrefix, fn).apply(null, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @memberOf function
 * @type {PlaceHolder}
 */
let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
let curry2_ = fn => curryN_(2, fn);
let curry3_ = fn => curryN_(3, fn);
let curry4_ = fn => curryN_(4, fn);
let curry5_ = fn => curryN_(5, fn);

const flipN = fn => curry2((...args) => apply(fn, reverse$1(args)));
const flip = fn => curry((b, a) => call(fn, a, b));

/**
 * @memberOf function
 */

/**
 * Returns passed in parameter.
 * @haskellType `id :: a -> a`
 * @function module:function.id
 * @param x {*}
 * @returns {*}
 */
const id = x => x;

const until = curry((predicate, operation, typeInstance) => {
        let result = typeInstance;
        while (!predicate(result)) {
            result = operation(result);
        }
        return result;
    });

/**
 * @module function
 */

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module string
 */
const lines = split(/[\n\r]/gm);
const words = split(/[\s\t]/gm);
const unwords = intercalate(' ');
const unlines = intercalate('\n');
const lcaseFirst = xs => {
        _errorIfNotType(String, 'lcaseFirst', 'xs', xs);
        return xs[0].toLowerCase() + xs.substring(1);
    };
const ucaseFirst = xs => {
        _errorIfNotType(String, 'ucaseFirst', 'xs', xs);
        return xs[0].toUpperCase() + xs.substring(1);
    };
const camelCase = (xs, pattern = /[^a-z\d]/i) => compose(
            join(''),
            map(str => ucaseFirst(str.toLowerCase())),
            filter(x => !!x),
            split(pattern)
        )(_errorIfNotType(String, 'camelCase', 'xs', xs));
const classCase = compose(ucaseFirst, camelCase);

/**
 * @module fjl
 * @description Exports all module methods (object, list, string modules etc.).
 * @goal to include everything from haskell's Prelude where it makes sense in order to create
 *  a subset of functions which can make the javascript developer more efficient and make his/her
 *  code more concise (and functional).
 * @motivation preludejs, lodash/fp, RamdaJs, Haskell.
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Prelude.html
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Data-List.html
 */

export { instanceOf, hasOwnProperty, length, keys, assign, prop, typeOf, copy, isFunction, isType, isClass, isCallable, isArray, isObject, isBoolean, isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined, isNull, isSymbol, isUsableImmutablePrimitive, isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, isset, of, searchObj, assignDeep, objUnion, objIntersect, objDifference, objComplement, log, error, peek, isCheckableType, errorIfNotCheckableType, getTypeName, _defaultTypeChecker, multiTypesToString, defaultErrorMessageCall, _getErrorIfNotTypeThrower, _getErrorIfNotTypesThrower, _errorIfNotType, _errorIfNotTypes, defaultTypeChecker, errorIfNotType, errorIfNotTypes, getErrorIfNotTypeThrower, getErrorIfNotTypesThrower, jsonClone, toArray, toAssocList, toAssocListDeep, fromAssocList, fromAssocListDeep, isTruthy, isFalsy, alwaysTrue, alwaysFalse, apply, call, compose, curryNotFnErrPrefix, curryN, curry, curry2, curry3, curry4, curry5, curry_, curryN_, __, curry2_, curry3_, curry4_, curry5_, flipN, flip, id, negateF, negateF2, negateF3, negateFN, until, map, append, head, last, tail, init, uncons, unconsr, concat$$1 as concat, concatMap, reverse, intersperse, intercalate, transpose, subsequences, swapped, permutations, foldl, foldr, foldl1, foldr1, mapAccumL, mapAccumR, iterate, repeat, replicate, cycle, unfoldr, findIndex, findIndices, elemIndex, elemIndices, take, drop, splitAt, takeWhile, dropWhile, dropWhileEnd, span, breakOnList, at, find, filter, partition, elem, notElem, lookup, isPrefixOf, isSuffixOf, isInfixOf, isSubsequenceOf, group, groupBy, inits, tails, stripPrefix, zip, zipN, zip3, zip4, zip5, zipWith, zipWithN, zipWith3, zipWith4, zipWith5, unzip, unzipN, any, all, and, or, not, sum, product, maximum, minimum, scanl, scanl1, scanr, scanr1, nub, remove, sort, sortOn, sortBy, insert, insertBy, nubBy, removeBy, removeFirstsBy, unionBy, union, intersect, intersectBy, difference, complement, slice, includes, indexOf, lastIndexOf, split, push, lines, words, unwords, unlines, lcaseFirst, ucaseFirst, camelCase, classCase, fPureTakesOne, fPureTakes2, fPureTakes3, fPureTakes4, fPureTakes5, fPureTakesOneOrMore, fnOrError, sliceFrom, sliceTo, sliceCopy, genericAscOrdering, lengths, lengthsToSmallest, reduceUntil, reduceRightUntil, reduce, reduceRight, lastIndex, findIndexWhere, findIndexWhereRight, findIndicesWhere, findWhere, aggregateArr$ };
