/**
 * Created by elyde on 12/18/2016.
 * @memberOf _objectOps
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
 * @function module:objectOps.typeOf
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

const fPureTakesOne = name => (arg, f) => f[name](arg);
const fPureTakes2 = name => (arg1, arg2, f) => f[name](arg1, arg2);
const fPureTakes3 = name => (arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3);
const fPureTakes4 = name => (arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4);
const fPureTakes5 = name => (arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5);
const fPureTakesOneOrMore = name => (f, ...args) => f[name](...args);
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
const lastIndexOf = fPureTakesOne('lastIndexOf');

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
const notFnErrPrefix = '`fn` in `curry(fn, ...args)`';

const curry = (fn, ...argsToCurry) => curryN(fnOrError(notFnErrPrefix, fn).length, fn, ...argsToCurry);
const curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = concat(curriedArgs, args),
                canBeCalled = (length(concatedArgs) >= executeArity) || !executeArity;
            return !canBeCalled ? apply(curryN, concat([executeArity, fnOrError(notFnErrPrefix, fn)], concatedArgs)) :
                apply(fnOrError(notFnErrPrefix, fn), concatedArgs);
        };
    };
const curry2 = fn => curryN(2, fn);
const curry3 = fn => curryN(3, fn);
const curry4 = fn => curryN(4, fn);
const curry5 = fn => curryN(5, fn);

/**
 * @memberOf _objectOps
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
 * @memberOf _objectOps
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

const isFunction = value => instanceOf$1(Function, value);
const isType$1 = (type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type);
const isClass = x => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
const isCallable = x => isFunction(x) && !isClass(x);
const {isArray} = Array;
const isObject = value => isType$1(_Object, value);
const isBoolean = value => isType$1(_Boolean, value);
const isNumber = value => isType$1(_Number$1, value);
const isString = value => isType$1(_String, value);
const isMap = value => isType$1(_Map, value);
const isSet = value => isType$1(_Set, value);
const isWeakMap = value => isType$1(_WeakMap, value);
const isWeakSet = value => isType$1(_WeakSet, value);
const isUndefined = value => isType$1(_Undefined$1, value);
const isNull = value => isType$1(_Null$1, value);
const isSymbol = value => isType$1(_Symbol, value);
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
        else if (hasOwnProperty$1('size', value) && isNumber(value.size)) {
            retVal = isEmptyCollection(value);
        }
        else {
            retVal = !value;
        }
        return retVal;
    };
const isset = x => x !== null && x !== undefined;

const assignDeep$1 = (obj0, ...objs) =>
        objs.reduce((topAgg, obj) =>
            !obj ? topAgg : keys(obj).reduce((agg, key) => {
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

/**
 * Checks if given `x` is set and of one of
 *  [String, Boolean, Number, or Symbol] (null and undefined are immutable
 *   but are not "usable" or 'not what we usually want to operate on'.
 * @private
 * @param x {*}
 * @returns {Boolean}
 */
function isUsableImmutablePrimitive$1 (x) {
    const typeOfX = typeOf(x);
    return isset(x) &&
        [String.name, Number.name, Boolean.name, Symbol.name]
            .some(Type => Type === typeOfX);
}

/**
 * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
 * ```
 * // - If exists `(value).constructor.of` uses this.
 * // - If value is of one String, Boolean, Symbol, or Number types calls it's
 * //      constructor as a function (in cast form;  E.g., `constructor(...args)` )
 * // - Else if constructor is a function, thus far, then calls constructor using
 * //      the `new` keyword (with any passed in args).
 * ```
 * @function module:_objectOps.of
 * @param x {*} - Value to derive returned value's type from.
 * @param [args] {...*} - Any args to pass in to matched construction strategy.
 * @returns {*|undefined} - New value of given value's type else `undefined`.
 */
const of = (x, ...args) => {
    if (!isset(x)) { return undefined; }
    const constructor = x.constructor;
    if (hasOwnProperty$1('of', constructor)) {
        return apply(constructor.of, args);
    }
    else if (isUsableImmutablePrimitive$1(x)) {
        return apply(constructor, args);
    }
    else if (isFunction(constructor)) {
        return new constructor(...args);
    }
    return undefined;
};

const log = console.log.bind(console);
const error = console.error.bind(console);
const peek = (...args) => (log(...args), args.pop());

/**
 * @module errorThrowing
 * @description Contains error throwing facilities for when a value doesn't match a type.
 *  In addition gives you curried and uncurried versions of the multi arity functions.
 */
const isCheckableType = type => isString(type) || isFunction(type);
const _errorIfNotCheckableType = (contextName, type) => {
        if (!isCheckableType(type)) {
            throw new Error (`${contextName} expects \`type\` to be of type \`String\` or \`Function\`.` +
                `  Type received \`${typeOf(type)}\`.  Value \`${type}\`.`);
        }
        return type;
    };
const getTypeName = type =>
        _errorIfNotCheckableType('getTypeName', type) &&
            isString(type) ? type : type.name;
const _defaultTypeChecker = (Type, value) => isType$1(getTypeName(Type), value) || (
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
const _errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall);

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

/**
 * @module _objectOps
 * @description Object operations (uncurried).
 * @private
 */
const jsonClone = x => JSON.parse(JSON.stringify(x));
const toArrayMap = obj => Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object') {
            return [key, toArrayMap(obj[key])];
        }
        return [key, obj[key]];
    });
const fromArrayMap = xs => xs.reduce((agg, [key, value]) => {
        agg[key] = value;
        return agg;
    }, {});
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
                return toArrayMap(x);
        }
    };

/**
 * @function module:_listOps.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
function _map (fn, xs) {
    let ind = 0,
        limit = length(xs),
        out = [];
    if (!limit) { return out; }
    while (ind < limit) {
        out.push(fn(xs[ind], ind, xs));
        ind += 1;
    }
    return out;
}

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
 * List operator utils module.
 * @module _listOpUtils
 * @private
 */
const sliceFrom = (startInd, arr) => slice(startInd, undefined, arr);
const sliceTo = (toInd, xs) => slice(0, toInd, xs);
const copy = xs => sliceFrom(0, xs);
const sliceCopy = copy;
const genericAscOrdering = (a, b) => {
        if (a > b) { return 1; }
        else if (a < b) { return -1; }
        return 0;
    };
const lengths = (...lists) => length(lists) ? _map(length, lists) : [];
const lengthsToSmallest = (...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = Math.min.apply(Math, listLengths);
        return _map((list, ind) => listLengths[ind] > smallLen ?
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
        if (!xs || !xs.length) { return undefined; }
        const limit = length(xs);
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out.length ? out : undefined;
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

/**
 * List operations module (un-curried version).
 * @module _listOps
 * @private
 */
const _append = concat;
const _appendMany = (...args) => {
        if (length(args)) { return apply(concat, args); }
        throw new Error('`_appendMany` requires at least one arg.');
    };
const _head = x => x[0];
const _last = xs => xs[lastIndex(xs)];
const _tail = xs => sliceFrom(1, xs);
const _init = xs => sliceTo(lastIndex(xs), xs);
const _uncons = xs =>
        !xs || length(xs) === 0 ? undefined : [_head(xs), _tail(xs)];
const _unconsr = xs => !xs || length(xs) === 0 ? undefined : [_init(xs), _last(xs)];
const _concat = xs => !length(xs) ? copy(xs) : apply(_appendMany, xs);
const _concatMap = (fn, foldableOfA) => _concat(_map(fn, foldableOfA));
const _reverse = x => _foldr((agg, item) => (agg.push(item), agg), [], x);
const _intersperse = (between, arr) => {
        const limit = length(arr),
            lastInd = limit - 1,
            out = [];
        if (!limit) {
            return out;
        }
        return _foldl((agg, item, ind) => (
                ind === lastInd ?
                    agg.push(item) :
                    agg.push(item, between),
                agg
            ), out, arr);
    };
const _intercalate = (xs, xss) => _concat(_intersperse(xs, xss));
const _transpose = xss => {
        let numLists = length(xss),
            ind = 0, ind2;
        if (!numLists) {
            return [];
        }
        const listLengths = apply(lengths, xss),
            longestListLen = _maximum(listLengths),
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
        return _filter(x => length(x), outLists);
    };
const _subsequences = xs => {
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
const _swapped = (ind1, ind2, list) => {
        const out = copy(list),
            tmp = out[ind1];
        out[ind1] = out[ind2];
        out[ind2] = tmp;
        return out;
    };
const _permutations = xs => {
        const limit = length(xs);

        if (!limit || limit === 1) {
            return [xs];
        }

        let list = copy(xs),
            c = _repeat(limit, 0),
            i = 0;

        const out = [list];

        for (; i < limit; i++) {
            if (c[i] < i) {
                list = _swapped(i % 2 === 0 ? 0 : c[i], i, list);
                out.push(list);
                c[i] += 1;
                i = 0;
                continue;
            }
            c[i] = 0;
        }

        return out;
    };
const _foldl = reduce$1;
const _foldr = reduceRight$1;
const _foldl1 = (op, xs) => {
        const parts = _uncons(xs);
        return !parts ? [] : reduce$1(op, parts[0], parts[1]);
    };
const _foldr1 = (op, xs) => {
        const parts = _unconsr(xs);
        return !parts ? [] : reduceRight$1(op, parts[1], parts[0]);
    };
const _mapAccumL = (op, zero, xs) => {
        const list = copy(xs),
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
    };
const _mapAccumR = (op, zero, xs) => {
        const list = copy(xs),
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
    };
const _iterate = (limit, op, x) => {
        let ind = 0,
            out = [],
            lastX = x;
        for (; ind < limit; ind += 1) {
            out.push(lastX);
            lastX = op(lastX, ind);
        }
        return out;
    };
const _repeat = (limit, x) => _iterate(limit, a => a, x);
const _replicate = _repeat;
const _cycle = (limit, xs) => _concat(_replicate(limit, xs));
const _unfoldr = (op, x) => {
        let ind = 0,
            out = [],
            resultTuple = op(x, ind, out);
        while (resultTuple) {
            out.push(resultTuple[0]);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    };
const _findIndex = findIndexWhere;
const _findIndices = findIndicesWhere;
const _elemIndex = (x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    };
const _elemIndices = (value, xs) => _findIndices(x => x === value, xs);
const _take = (limit, list) => sliceTo(limit, list);
const _drop = (count, list) => sliceFrom(count, list);
const _splitAt = (ind, list) => [ sliceTo(ind, list), sliceFrom(ind, list) ];
const _takeWhile = (pred, list) =>
        reduceUntil(
            negateP(pred),  // predicate
            aggregateArr,   // operation
            [],             // aggregator
            list
        );
const _dropWhile = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhere((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            slice(splitPoint, limit, list);
    };
const _dropWhileEnd = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhereRight((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            sliceTo(splitPoint + 1, list);
    };
const _span = (pred, list) => {
        const splitPoint = findIndexWhere(negateP(pred), list);
        return splitPoint === -1 ?
            _splitAt(0, list) : _splitAt(splitPoint, list);
    };
const _breakOnList = (pred, list) => {
        const splitPoint = findIndexWhere(pred, list);
        return splitPoint === -1 ?
            _splitAt(0, list) : _splitAt(splitPoint, list);
    };
const _at = prop$1;
const _find = findWhere;
const _filter = (pred, xs) => {
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
    };
const _partition = (pred, list) =>
        !length(list) ?
            [[], []] :
                [_filter(pred, list), _filter(negateP(pred), list)];
const _elem = includes;
const _notElem = negateF(includes);
const _lookup = _at;
const _isPrefixOf = (xs1, xs2) => {
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
const _isSuffixOf = (xs1, xs2) => {
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
const _isInfixOf = (xs1, xs2) => {
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
const _isSubsequenceOf = (xs1, xs2) => {
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
const _group = xs => _groupBy((a, b) => a === b, xs);
const _groupBy = (equalityOp, xs) => {
        const limit = length(xs);
        if (!limit) {
            return copy(xs);
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
            agg.push(_takeWhile(predOp, slice(ind, limit, xs)));
        }
        return agg;
    };
const _inits = xs => {
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
const _tails = xs => {
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
const _stripPrefix = (prefix, list) =>
        _isPrefixOf(prefix, list) ?
            _splitAt(length(prefix), list)[1] :
            copy(list);
const _zip = (arr1, arr2) => {
        if (!length(arr1) || !length(arr2)) {
            return [];
        }
        const [a1, a2] = lengthsToSmallest(arr1, arr2);
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, [item, a2[ind]]),
            [], a1);
    };
const _zipN = (...lists) => {
        const trimmedLists = apply(lengthsToSmallest, _filter(length, lists)),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, _map(xs => xs[ind], trimmedLists)),
            [], trimmedLists[0]);
    };
const _zip3 = (arr1, arr2, arr3) => _zipN(arr1, arr2, arr3);
const _zip4 = (arr1, arr2, arr3, arr4) => _zipN(arr1, arr2, arr3, arr4);
const _zip5 = (arr1, arr2, arr3, arr4, arr5) => _zipN(arr1, arr2, arr3, arr4, arr5);
const _zipWith = (op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) {
            return [];
        }
        const [a1, a2] = lengthsToSmallest(xs1, xs2);
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, op(item, a2[ind])),
            [], a1);
    };
const _zipWithN = (op, ...lists) => {
        const trimmedLists = apply(lengthsToSmallest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, apply(op, _map(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    };
const _zipWith3 = (op, xs1, xs2, xs3) => _zipWithN(op, xs1, xs2, xs3);
const _zipWith4 = (op, xs1, xs2, xs3, xs4) => _zipWithN(op, xs1, xs2, xs3, xs4);
const _zipWith5 = (op, xs1, xs2, xs3, xs4, xs5) => _zipWithN(op, xs1, xs2, xs3, xs4, xs5);
const _unzip = arr =>
        _foldl((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr);
const _unzipN = list => {
        if (!length(list)) {
            return [];
        }
        const lenItem0 = length(list[0]);
        let zero = lenItem0 ?
            _unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) :
            [];
        return _foldl((agg, item) => {
            agg.forEach((outList, ind) => outList.push(item[ind]));
            return agg;
        }, zero, list);
    };
const _any = (p, xs) => {
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
const _all = (p, xs) => {
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
const _and = xs => _all(isTruthy, xs);
const _or = xs => _any(isTruthy, xs);
const _not = xs => _all(isFalsy, xs);
const _sum = list => _foldl((agg, x) => agg + x, 0, list);
const _product = list => _foldl((agg, x) => agg * x, 1, list);
const _maximum = list => _last(_sortBy(genericAscOrdering, list));
const _minimum = list => _head(_sortBy(genericAscOrdering, list));
const _scanl = (fn, zero, xs) => {
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
const _scanl1 = (fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return _scanl(fn, _head(xs), _tail(xs));
    };
const _scanr = (fn, zero, xs) => {
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
const _scanr1 = (fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return _scanr(fn, _last(xs), _init(xs));
    };
const _nub = list => _nubBy((a, b) => a === b, list);
const _remove = (x, list) => _removeBy((a, b) => a === b, x, list);
const _sort = xs => _sortBy(genericAscOrdering, xs);
const _sortOn = (valueFn, xs) =>

        // Un-decorate
        _map(decorated => decorated[1],

            // Decorate and sort
            _sortBy(
                // Ordering
                ([a0], [b0]) => genericAscOrdering(a0, b0),

                // Decorate
                _map(item => [valueFn(item), item], xs)
            )
        );
const _sortBy = (orderingFn, xs) => copy(xs).sort(orderingFn || genericAscOrdering);
const _insert = (x, xs) => {
        if (!length(xs)) {
            return [x];
        }
        const foundIndex = _findIndex(item => x <= item, xs);
        return foundIndex === -1 ? [x] :
            _concat(_intersperse([x], _splitAt(foundIndex, xs)));
    };
const _insertBy = (orderingFn, x, xs) => {
        const limit = length(xs);
        if (!limit) {
            return [x];
        }
        let ind = 0;
        for (; ind < limit; ind += 1) {
            if (orderingFn(x, xs[ind]) <= 0) {
                const parts = _splitAt(ind, xs);
                return _concat([parts[0], [x], parts[1]]);
            }
        }
        return aggregateArr(copy(xs), x);
    };
const _nubBy = (pred, list) => {
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
            if (_any(anyOp, out)) {
                continue;
            }
            out.push(currItem);
        }
        return out;
    };
const _removeBy = (pred, x, list) => { // @todo optimize this implementation
        const foundIndex = _findIndex(item => pred(x, item), list),
            parts = _splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
        return _append(parts[0], _tail(parts[1]));
    };
const _removeFirstsBy = (pred, xs1, xs2) =>
        _foldl((agg, x2) => _removeBy(pred, x2, agg), xs1, xs2);
const _unionBy = (pred, arr1, arr2) =>
        _foldl((agg, b) => {
                const alreadyAdded = _any(a => pred(a, b), agg);
                return !alreadyAdded ? (agg.push(b), agg) : agg;
            }, copy(arr1), arr2
        );
const _union = (arr1, arr2) =>
        _append(arr1,
            _filter(elm => !includes(elm, arr1), arr2));
const _intersect = (arr1, arr2) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            _filter(elm => includes(elm, arr2), arr1);
const _intersectBy = (pred, list1, list2) =>
        _foldl((agg, a) =>
                _any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg
            , [], list1);
const _difference = (array1, array2) => { // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return copy(array1);
        }
        else if (!array1 && array2 || (!array1 && !array2)) {
            return [];
        }
        return reduce$1((agg, elm) =>
                !includes(elm, array2) ? (agg.push(elm), agg) : agg
            , [], array1);
    };
const _complement = (arr0, ...arrays) =>
        reduce$1((agg, arr) => _append(agg, _difference(arr, arr0)), [], arrays);

const objUnion$1 = (obj1, obj2) => assignDeep$1(obj1, obj2);
const objIntersect$1 = (obj1, obj2) => _foldl((agg, key) => {
        if (hasOwnProperty$1(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
const objDifference$1 = (obj1, obj2) => _foldl((agg, key) => {
        if (!hasOwnProperty$1(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
const objComplement$1 = (obj0, ...objs) => _foldl((agg, obj) =>
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
const notFnErrPrefix$1 = '`fn` in `curry_(fn, ...args)`';
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
    return curryN_(fnOrError(notFnErrPrefix$1, fn).length, fn, ...argsToCurry);
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
            apply(curryN_, concat([executeArity, fnOrError(notFnErrPrefix$1, fn)], concatedArgs)) :
            apply(fnOrError(notFnErrPrefix$1, fn), concatedArgs);
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
 * @function module:functionOps.id
 * @param x {*}
 * @returns {*}
 */
const id = x => x;

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @function module:_functionOps.compose
 * @type {Function}
 * @param args {...{Function}}
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
     * Curries a function up to an arity of 2 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 2 or more args (not counting placeholder (`__`) value).
     * @function module:functionOps.curry2_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 3 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 3 or more args (not counting placeholder (`__`) value).
     * @function module:functionOps.curry3_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 4 or more args (not counting placeholder (`__`) value).
     * @function module:functionOps.curry4_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 5 or more args (not counting placeholder (`__`) value).
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
     * @function module:functionOps.negateP
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
     * @function module:functionOps.negateFMany
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
     * @param args {...Function}
     * @returns {Function}
     */

/**
 * @module _functionOps
 * @private
 */

/**
 * Created by elydelacruz on 7/22/2017.
 * @module utils
 * @private
 */

const fPureTakesOne_ = name => curry((arg, f) => f[name](arg));
const fPureTakes2_ = name => curry((arg1, arg2, f) => f[name](arg1, arg2));
const fPureTakesOneOrMore_ = name => curry2((f, ...args) => f[name](...args));

/**
 * Created by elyde on 7/20/2017.
 * Curried functional versions of common array methods (`filter`, `map`, etc.).
 * @module jsPlatform_array
 * @private
 */

const join$1 = fPureTakesOne_('join');
const push$1 = fPureTakesOneOrMore_('push');

/**
 * List operations that overlap (apart from globally overlapping props and functions like `length`)
 * on both strings and arrays.
 * @module jsPlatform_list
 * @private
 */

const slice$1 = curry(slice);
const includes$1 = curry(includes);
const indexOf$1 = curry(indexOf);
const lastIndexOf$1 = curry(lastIndexOf);

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
 * @module jsPlatform
 * @private
 */

/**
 * List operators.
 * @module listOps
 */
const append = curry(_append);
const appendMany = curry2(_appendMany);
const concatMap = curry2(_concatMap);
const map$1 = curry(_map);
const intersperse = curry(_intersperse);
const intercalate = curry(_intercalate);
const foldl = curry(_foldl);
const foldr = curry(_foldr);
const foldl1 = curry(_foldl1);
const foldr1 = curry(_foldr1);
const mapAccumL = curry(_mapAccumL);
const mapAccumR = curry(_mapAccumR);
const iterate = curry(_iterate);
const repeat = curry(_repeat);
const replicate = curry(_replicate);
const cycle = curry(_cycle);
const unfoldr = curry(_unfoldr);
const findIndex = curry(_findIndex);
const findIndices = curry(_findIndices);
const elemIndex = curry(_elemIndex);
const elemIndices = curry(_elemIndices);
const take = curry(_take);
const drop = curry(_drop);
const splitAt = curry(_splitAt);
const takeWhile = curry(_takeWhile);
const dropWhile = curry(_dropWhile);
const dropWhileEnd = curry(_dropWhileEnd);
const span = curry(_span);
const breakOnList = curry(_breakOnList);
const at = curry(_at);
const find = curry(_find);
const filter$1 = curry(_filter);
const partition = curry(_partition);
const elem = curry(_elem);
const notElem = curry2(_notElem);
const lookup = curry(_lookup);
const isPrefixOf = curry(_isPrefixOf);
const isSuffixOf = curry(_isSuffixOf);
const isInfixOf = curry(_isInfixOf);
const isSubsequenceOf = curry(_isSubsequenceOf);
const groupBy = curry(_groupBy);
const stripPrefix = curry(_stripPrefix);
const zip = curry(_zip);
const zip3 = curry(_zip3);
const zip4 = curry(_zip4);
const zip5 = curry(_zip5);
const zipWith = curry(_zipWith);
const zipWithN = curry(_zipWithN);
const zipWith3 = curry(_zipWith3);
const zipWith4 = curry(_zipWith4);
const zipWith5 = curry(_zipWith5);
const any = curry(_any);
const all = curry(_all);
const scanl = curry(_scanl);
const scanl1 = curry(_scanl1);
const scanr = curry(_scanr);
const scanr1 = curry(_scanr1);
const remove = curry(_remove);
const sortOn = curry(_sortOn);
const sortBy = curry(_sortBy);
const insert = curry(_insert);
const insertBy = curry(_insertBy);
const nubBy = curry(_nubBy);
const removeBy = curry(_removeBy);
const removeFirstsBy = curry(_removeFirstsBy);
const unionBy = curry(_unionBy);
const union = curry(_union);
const intersect = curry(_intersect);
const intersectBy = curry(_intersectBy);
const difference = curry(_difference);
const complement = curry2(_complement);

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module stringOps
 */
const lines = split$1(/[\n\r]/gm);
const words = split$1(/[\s\t]/gm);
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
            join$1(''),
            map$1(str => ucaseFirst(str.toLowerCase())),
            filter$1(x => !!x),
            split$1(pattern)
        )(_errorIfNotType(String, 'camelCase', 'xs', xs));
const classCase = compose(ucaseFirst, camelCase);

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

export { instanceOf$1 as _instanceOf, isType$1 as _isType, hasOwnProperty$1 as _hasOwnProperty, assign$1 as _assign, prop$1 as _prop, assignDeep$1 as _assignDeep, objUnion$1 as _objUnion, objComplement$1 as _objComplement, objIntersect$1 as _objIntersect, objDifference$1 as _objDifference, prop$$1 as prop, instanceOf$$1 as instanceOf, hasOwnProperty$$1 as hasOwnProperty, assign$$1 as assign, assignDeep$$1 as assignDeep, objUnion$$1 as objUnion, objIntersect$$1 as objIntersect, objDifference$$1 as objDifference, objComplement$$1 as objComplement, isType$$1 as isType, jsonClone, fromArrayMap, toArrayMap, toArray, length, keys, isFunction, isClass, isCallable, isArray, isObject, isBoolean, isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined, isNull, isSymbol, isUsableImmutablePrimitive, isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, isset, typeOf, of, log, error, peek, isTruthy, isFalsy, alwaysTrue, alwaysFalse, apply as _apply, call as _call, until$1 as _until, flip$1 as _flip, flip3$1 as _flip3, flip4$1 as _flip4, flip5$1 as _flip5, flipN$1 as _flipN, apply$1 as apply, call$1 as call, until$$1 as until, flipN$$1 as flipN, flip$$1 as flip, flip3$$1 as flip3, flip4$$1 as flip4, flip5$$1 as flip5, curry, curryN, curry2, curry3, curry4, curry5, curry_, curryN_, __, curry2_, curry3_, curry4_, curry5_, negateF, negateF3, negateF4, negateF5, negateP, negateFMany, id, compose, _and as and, _or as or, _not as not, _zipN as zipN, _unzip as unzip, _unzipN as unzipN, _concat as concat, _reverse as reverse, _transpose as transpose, _subsequences as subsequences, _permutations as permutations, _group as group, _tails as tails, _sum as sum, _product as product, _maximum as maximum, _minimum as minimum, _sort as sort, _nub as nub, _head as head, _last as last, _tail as tail, _init as init, _inits as inits, _uncons as uncons, _unconsr as unconsr, _swapped as swapped, append, appendMany, concatMap, map$1 as map, intersperse, intercalate, foldl, foldr, foldl1, foldr1, mapAccumL, mapAccumR, iterate, repeat, replicate, cycle, unfoldr, findIndex, findIndices, elemIndex, elemIndices, take, drop, splitAt, takeWhile, dropWhile, dropWhileEnd, span, breakOnList, at, find, filter$1 as filter, partition, elem, notElem, lookup, isPrefixOf, isSuffixOf, isInfixOf, isSubsequenceOf, groupBy, stripPrefix, zip, zip3, zip4, zip5, zipWith, zipWithN, zipWith3, zipWith4, zipWith5, any, all, scanl, scanl1, scanr, scanr1, remove, sortOn, sortBy, insert, insertBy, nubBy, removeBy, removeFirstsBy, unionBy, union, intersect, intersectBy, difference, complement, slice$1 as slice, includes$1 as includes, indexOf$1 as indexOf, lastIndexOf$1 as lastIndexOf, split$1 as split, push$1 as push, _map, _append, _appendMany, _head, _last, _tail, _init, _uncons, _unconsr, _concat, _concatMap, _reverse, _intersperse, _intercalate, _transpose, _subsequences, _swapped, _permutations, _foldl, _foldr, _foldl1, _foldr1, _mapAccumL, _mapAccumR, _iterate, _repeat, _replicate, _cycle, _unfoldr, _findIndex, _findIndices, _elemIndex, _elemIndices, _take, _drop, _splitAt, _takeWhile, _dropWhile, _dropWhileEnd, _span, _breakOnList, _at, _find, _filter, _partition, _elem, _notElem, _lookup, _isPrefixOf, _isSuffixOf, _isInfixOf, _isSubsequenceOf, _group, _groupBy, _inits, _tails, _stripPrefix, _zip, _zipN, _zip3, _zip4, _zip5, _zipWith, _zipWithN, _zipWith3, _zipWith4, _zipWith5, _unzip, _unzipN, _any, _all, _and, _or, _not, _sum, _product, _maximum, _minimum, _scanl, _scanl1, _scanr, _scanr1, _nub, _remove, _sort, _sortOn, _sortBy, _insert, _insertBy, _nubBy, _removeBy, _removeFirstsBy, _unionBy, _union, _intersect, _intersectBy, _difference, _complement, lines, words, unwords, unlines, lcaseFirst, ucaseFirst, camelCase, classCase, fPureTakesOne_, fPureTakes2_, fPureTakesOneOrMore_, fPureTakesOne, fPureTakes2, fPureTakes3, fPureTakes4, fPureTakes5, fPureTakesOneOrMore, fnOrError, sliceFrom, sliceTo, copy, sliceCopy, genericAscOrdering, lengths, lengthsToSmallest, reduceUntil, reduceRightUntil, reduce$1 as reduce, reduceRight$1 as reduceRight, lastIndex, findIndexWhere, findIndexWhereRight, findIndicesWhere, findWhere, aggregateStr, aggregateArr, aggregateObj, aggregatorByType };
