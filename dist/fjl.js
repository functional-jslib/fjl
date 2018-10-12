'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

let _slicedToArray = function () { function sliceIterator(arr, i) { let _arr = []; let _n = true; let _d = false; let _e = undefined; try { for (let _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Created by elyde on 12/18/2016.
 * @memberOf _objectOps
 */
let _Number = Number.name;
let _NaN = 'NaN';
let _Null = 'Null';
let _Undefined = 'Undefined';

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
function typeOf(value) {
    let retVal = void 0;
    if (value === undefined) {
        retVal = _Undefined;
    } else if (value === null) {
        retVal = _Null;
    } else {
        let constructorName = value.constructor.name;
        retVal = constructorName === _Number && isNaN(value) ? _NaN : constructorName;
    }
    return retVal;
}

let fPureTakesOne = function fPureTakesOne(name) {
    return function (arg, f) {
        return f[name](arg);
    };
};
let fPureTakes2 = function fPureTakes2(name) {
    return function (arg1, arg2, f) {
        return f[name](arg1, arg2);
    };
};
let fPureTakes3 = function fPureTakes3(name) {
    return function (arg1, arg2, arg3, f) {
        return f[name](arg1, arg2, arg3);
    };
};
let fPureTakes4 = function fPureTakes4(name) {
    return function (arg1, arg2, arg3, arg4, f) {
        return f[name](arg1, arg2, arg3, arg4);
    };
};
let fPureTakes5 = function fPureTakes5(name) {
    return function (arg1, arg2, arg3, arg4, arg5, f) {
        return f[name](arg1, arg2, arg3, arg4, arg5);
    };
};
let fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return function (f) {
        for (let _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return f[name].apply(f, args);
    };
};
let fnOrError = function fnOrError(symbolName, f) {
    if (!f || typeof f !== 'function') {
        throw new Error(symbolName + ' should be a function. ' + ('Type received: ' + typeOf(f) + ';  Value received: ' + f + '.'));
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

let instanceOf$1 = function instanceOf$1(instanceConstructor, instance) {
    return instance instanceof instanceConstructor;
};
let hasOwnProperty$1 = fPureTakesOne('hasOwnProperty');
let length = function length(x) {
    return x.length;
};
let keys = function keys(obj) {
    return Object.keys(obj);
};
let assign$1 = function () {
    return Object.assign ? function (obj0) {
        for (let _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            objs[_key2 - 1] = arguments[_key2];
        }

        return Object.assign.apply(Object, [obj0].concat(objs));
    } : function (obj0) {
        for (let _len3 = arguments.length, objs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            objs[_key3 - 1] = arguments[_key3];
        }

        return objs.reduce(function (topAgg, obj) {
            return keys(obj).reduce(function (agg, key) {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    };
}();

/**
 * Created by elyde on 7/20/2017.
 * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
 * @module _jsPlatform_arrayOps
 * @private
 * @todo updated doc blocks to list correct/updated module name.
 */

let defineReverse = function defineReverse() {
    return Array.prototype.reverse ? function (x) {
        return x.reverse();
    } : function (x) {
        return x.reduceRight(function (agg, item) {
            agg.push(item);
            return agg;
        }, []);
    };
};
let map = fPureTakesOne('map');
let filter = fPureTakesOne('filter');
let reduceRight = fPureTakes2('reduceRight');
let reverse = defineReverse();

/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length`)
 *      on both strings and arrays.
 */

let concat = fPureTakesOneOrMore('concat');
let slice = fPureTakes2('slice');
let includes = function () {
    return 'includes' in Array.prototype ? fPureTakesOne('includes') : function (value, xs) {
        return xs.indexOf(value) > -1;
    };
}();
let indexOf = fPureTakesOne('indexOf');
let lastIndexOf = fPureTakesOne('lastIndexOf');

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
let split = fPureTakesOne('split');

/**
 * Created by elydelacruz on 9/7/2017.
 * @module _jsPlatform_function
 * @private
 */
let apply = function apply(fn, args) {
    return fn.apply(null, args);
};
let call = function call(fn) {
    for (let _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
    }

    return apply(fn, args);
};

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
let notFnErrPrefix = '`fn` in `curry(fn, ...args)`';

let curry = function curry(fn) {
    for (let _len5 = arguments.length, argsToCurry = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        argsToCurry[_key5 - 1] = arguments[_key5];
    }

    return curryN.apply(undefined, [fnOrError(notFnErrPrefix, fn).length, fn].concat(argsToCurry));
};
let curryN = function curryN(executeArity, fn) {
    for (let _len6 = arguments.length, curriedArgs = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
        curriedArgs[_key6 - 2] = arguments[_key6];
    }

    return function () {
        for (let _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
        }

        let concatedArgs = concat(curriedArgs, args),
            canBeCalled = length(concatedArgs) >= executeArity || !executeArity;
        return !canBeCalled ? apply(curryN, concat([executeArity, fnOrError(notFnErrPrefix, fn)], concatedArgs)) : apply(fnOrError(notFnErrPrefix, fn), concatedArgs);
    };
};
let curry2 = function curry2(fn) {
    return curryN(2, fn);
};
let curry3 = function curry3(fn) {
    return curryN(3, fn);
};
let curry4 = function curry4(fn) {
    return curryN(4, fn);
};
let curry5 = function curry5(fn) {
    return curryN(5, fn);
};

/**
 * @memberOf _objectOps
 */

/**
 * Returns property value if found; Else `undefined`.
 * @function module:object.prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
let prop$1 = function prop$1(name, obj) {
    return obj[name];
};

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

let isFunction = function isFunction(value) {
    return instanceOf$1(Function, value);
};
let isType$1 = function isType$1(type, obj) {
    return typeOf(obj) === (isFunction(type) ? type.name : type);
};
let isClass = function isClass(x) {
    return x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
};
let isCallable = function isCallable(x) {
    return isFunction(x) && !isClass(x);
};
let isArray = Array.isArray;

let isObject = function isObject(value) {
    return isType$1(_Object, value);
};
let isBoolean = function isBoolean(value) {
    return isType$1(_Boolean, value);
};
let isNumber = function isNumber(value) {
    return isType$1(_Number$1, value);
};
let isString = function isString(value) {
    return isType$1(_String, value);
};
let isMap = function isMap(value) {
    return isType$1(_Map, value);
};
let isSet = function isSet(value) {
    return isType$1(_Set, value);
};
let isWeakMap = function isWeakMap(value) {
    return isType$1(_WeakMap, value);
};
let isWeakSet = function isWeakSet(value) {
    return isType$1(_WeakSet, value);
};
let isUndefined = function isUndefined(value) {
    return isType$1(_Undefined$1, value);
};
let isNull = function isNull(value) {
    return isType$1(_Null$1, value);
};
let isSymbol = function isSymbol(value) {
    return isType$1(_Symbol, value);
};
let isUsableImmutablePrimitive = function isUsableImmutablePrimitive(x) {
    let typeOfX = typeOf(x);
    return isset(x) && [_String, _Number$1, _Boolean, _Symbol].some(function (Type) {
        return Type === typeOfX;
    });
};
let isEmptyList = function isEmptyList(x) {
    return !length(x);
};
let isEmptyObject = function isEmptyObject(obj) {
    return isEmptyList(keys(obj));
};
let isEmptyCollection = function isEmptyCollection(x) {
    return x.size === 0;
};
let isEmpty = function isEmpty(value) {
    let typeOfValue = typeOf(value),
        retVal = void 0;
    if (!value) {
        // if '', 0, `null`, `undefined`, or `false` then is empty
        retVal = true;
    } else if (typeOfValue === _Array || typeOfValue === _Function) {
        retVal = isEmptyList(value);
    } else if (typeOfValue === _Number$1) {
        retVal = false;
    } else if (typeOfValue === _Object) {
        retVal = isEmptyObject(value);
    } else if (hasOwnProperty$1('size', value) && isNumber(value.size)) {
        retVal = isEmptyCollection(value);
    } else {
        retVal = !value;
    }
    return retVal;
};
let isset = function isset(x) {
    return x !== null && x !== undefined;
};

let assignDeep$1 = function assignDeep$1(obj0) {
    for (let _len8 = arguments.length, objs = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        objs[_key8 - 1] = arguments[_key8];
    }

    return objs.reduce(function (topAgg, obj) {
        return !obj ? topAgg : keys(obj).reduce(function (agg, key) {
            let propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (hasOwnProperty$1(key, agg) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
                return agg;
            }
            if (isObject(agg[key]) && isObject(obj[key])) {
                assignDeep$1(agg[key], obj[key]);
            } else {
                agg[key] = obj[key];
            }
            return agg;
        }, topAgg);
    }, obj0);
};

/**
 * @memberOf _functionOps
 */

let negateF = function negateF(fn) {
    return function (a, b) {
        return !fn(a, b);
    };
};
let negateF3 = function negateF3(fn) {
    return function (a, b, c) {
        return !fn(a, b, c);
    };
};
let negateF4 = function negateF4(fn) {
    return function (a, b, c, d) {
        return !fn(a, b, c, d);
    };
};
let negateF5 = function negateF5(fn) {
    return function (a, b, c, d, e) {
        return !fn(a, b, c, d, e);
    };
};
let negateP = negateF3;
let negateFN = function negateFN(fn) {
    return function () {
        for (let _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
        }

        return !apply(fn, args);
    };
};

/**
 * Created by elyde on 7/15/2017.
 * @module booleanOps
 */

let isTruthy = function isTruthy(value) {
    return !!value;
};
let isFalsy = function isFalsy(value) {
    return !value;
};
let alwaysTrue = function alwaysTrue() {
    return true;
};
let alwaysFalse = function alwaysFalse() {
    return false;
};

/**
 * Checks if given `x` is set and of one of
 *  [String, Boolean, Number, or Symbol] (null and undefined are immutable
 *   but are not "usable" or 'not what we usually want to operate on'.
 * @private
 * @param x {*}
 * @returns {Boolean}
 */
function isUsableImmutablePrimitive$1(x) {
    let typeOfX = typeOf(x);
    return isset(x) && [String.name, Number.name, Boolean.name, Symbol.name].some(function (Type) {
        return Type === typeOfX;
    });
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
 * @function module:object.of
 * @param x {*} - Value to derive returned value's type from.
 * @param [args] {...*} - Any args to pass in to matched construction strategy.
 * @returns {*|undefined} - New value of given value's type else `undefined`.
 */
let of = function of(x) {
    for (let _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        args[_key10 - 1] = arguments[_key10];
    }

    if (!isset(x)) {
        return undefined;
    }
    let constructor = x.constructor;
    if (hasOwnProperty$1('of', constructor)) {
        return apply(constructor.of, args);
    } else if (isUsableImmutablePrimitive$1(x)) {
        return apply(constructor, args);
    } else if (isFunction(constructor)) {
        return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
    }
    return undefined;
};

let log = console.log.bind(console);
let error = console.error.bind(console);
let peek = function peek() {
    for (let _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
    }

    return log.apply(undefined, args), args.pop();
};

/**
 * @module _objectOps
 * @description Object operations (uncurried).
 * @private
 */
let jsonClone = function jsonClone(x) {
    return JSON.parse(JSON.stringify(x));
};
let toArrayMap = function toArrayMap(obj) {
    return Object.keys(obj).map(function (key) {
        return [key, obj[key]];
    });
};
let fromArrayMap = function fromArrayMap(xs) {
    return xs.reduce(function (agg, _ref) {
        let _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        agg[key] = value;
        return agg;
    }, {});
};
let toArray = function toArray(x) {
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
 * @function module:list.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
function _map(fn, xs) {
    let ind = 0,
        limit = length(xs),
        out = [];
    if (!limit) {
        return out;
    }
    while (ind < limit) {
        out.push(fn(xs[ind], ind, xs));
        ind += 1;
    }
    return out;
}

let aggregateStr = function aggregateStr(agg, item) {
    return agg + item;
};
let aggregateArr$$ = function aggregateArr$$(agg, item) {
    agg.push(item);
    return agg;
};
let aggregateObj = function aggregateObj(agg, item, ind) {
    agg[ind] = item;
    return agg;
};
let aggregatorByType = function aggregatorByType(x) {
    switch (typeOf(x)) {
        case 'String':
            return aggregateStr;
        case 'Array':
            return aggregateArr$$;
        case 'Object':
        default:
            return aggregateObj;
    }
};

/**
 * List operator utils module.
 * @module _listOpUtils.
 * @private
 */
let sliceFrom = function sliceFrom(startInd, arr) {
    return slice(startInd, undefined, arr);
};
let sliceTo = function sliceTo(toInd, xs) {
    return slice(0, toInd, xs);
};
let copy = function copy(xs) {
    return sliceFrom(0, xs);
};
let sliceCopy = copy;
let genericAscOrdering = function genericAscOrdering(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }
    return 0;
};
let lengths = function lengths() {
    for (let _len12 = arguments.length, lists = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        lists[_key12] = arguments[_key12];
    }

    return length(lists) ? _map(length, lists) : [];
};
let lengthsToSmallest = function lengthsToSmallest() {
    for (let _len13 = arguments.length, lists = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        lists[_key13] = arguments[_key13];
    }

    let listLengths = apply(lengths, lists),
        smallLen = Math.min.apply(Math, listLengths);
    return _map(function (list, ind) {
        return listLengths[ind] > smallLen ? sliceTo(smallLen, list) : copy(list);
    }, lists);
};
let reduceUntil = function reduceUntil(pred, op, agg, arr) {
    let limit = length(arr);
    if (!limit) {
        return agg;
    }
    let ind = 0,
        result = agg;
    for (; ind < limit; ind++) {
        if (pred(arr[ind], ind, arr)) {
            break;
        }
        result = op(result, arr[ind], ind, arr);
    }
    return result;
};
let reduceRightUntil = function reduceRightUntil(pred, op, agg, arr) {
    let limit = length(arr);
    if (!limit) {
        return agg;
    }
    let ind = limit - 1,
        result = agg;
    for (; ind >= 0; ind--) {
        if (pred(arr[ind], ind, arr)) {
            break;
        }
        result = op(result, arr[ind], ind, arr);
    }
    return result;
};
let reduce$1 = function reduce$1(operation, agg, arr) {
    return reduceUntil(alwaysFalse, // until-predicate
    operation, // operation
    agg, // aggregator
    arr);
};
let reduceRight$1 = function reduceRight$1(operation, agg, arr) {
    return reduceRightUntil(alwaysFalse, // until-predicate
    operation, // operation
    agg, // aggregator
    arr);
};
let lastIndex = function lastIndex(x) {
    let len = length(x);return len ? len - 1 : 0;
};
let findIndexWhere = function findIndexWhere(pred, arr) {
    let ind = -1,
        predicateFulfilled = false;
    let limit = length(arr);
    while (ind < limit && !predicateFulfilled) {
        predicateFulfilled = pred(arr[++ind], ind, arr);
    }
    return ind;
};
let findIndexWhereRight = function findIndexWhereRight(pred, arr) {
    let limit = length(arr);
    let ind = limit,
        predicateFulfilled = false;
    for (; ind >= 0 && !predicateFulfilled; --ind) {
        predicateFulfilled = pred(arr[ind], ind, arr);
    }
    return ind;
};
let findIndicesWhere = function findIndicesWhere(pred, xs) {
    if (!xs || !xs.length) {
        return undefined;
    }
    let limit = length(xs);
    let ind = 0,
        out = [];
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out.push(ind);
        }
    }
    return out.length ? out : undefined;
};
let findWhere = function findWhere(pred, xs) {
    let ind = 0,
        limit = length(xs);
    if (!limit) {
        return;
    }
    for (; ind < limit; ind++) {
        let elm = xs[ind];
        if (pred(elm, ind, xs)) {
            return elm;
        }
    }
};

/**
 * List operations module (un-curried version).
 * @module _listOps
 * @private
 */
let _append = concat;
let _appendMany = function _appendMany() {
    for (let _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
    }

    if (length(args)) {
        return apply(concat, args);
    }
    throw new Error('`append` requires at least one arg.');
};
let _head = function _head(x) {
    return x[0];
};
let _last = function _last(xs) {
    return xs[lastIndex(xs)];
};
let _tail = function _tail(xs) {
    return sliceFrom(1, xs);
};
let _init = function _init(xs) {
    return sliceTo(lastIndex(xs), xs);
};
let _uncons = function _uncons(xs) {
    return !xs || length(xs) === 0 ? undefined : [_head(xs), _tail(xs)];
};
let _unconsr = function _unconsr(xs) {
    return !xs || length(xs) === 0 ? undefined : [_init(xs), _last(xs)];
};
let _concat = function _concat(xs) {
    return !length(xs) ? copy(xs) : apply(_appendMany, xs);
};
let _concatMap = function _concatMap(fn, foldableOfA) {
    return _concat(_map(fn, foldableOfA));
};
let _reverse = function _reverse(x) {
    return _foldr(function (agg, item) {
        return agg.push(item), agg;
    }, [], x);
};
let _intersperse = function _intersperse(between, arr) {
    let limit = length(arr),
        lastInd = limit - 1,
        out = [];
    if (!limit) {
        return out;
    }
    return _foldl(function (agg, item, ind) {
        return ind === lastInd ? agg.push(item) : agg.push(item, between), agg;
    }, out, arr);
};
let _intercalate = function _intercalate(xs, xss) {
    return _concat(_intersperse(xs, xss));
};
let _transpose = function _transpose(xss) {
    let numLists = length(xss),
        ind = 0,
        ind2 = void 0;
    if (!numLists) {
        return [];
    }
    let listLengths = apply(lengths, xss),
        longestListLen = _maximum(listLengths),
        outLists = [];
    for (; ind < longestListLen; ind += 1) {
        let outList = [];
        for (ind2 = 0; ind2 < numLists; ind2 += 1) {
            if (listLengths[ind2] < ind + 1) {
                continue;
            }
            outList.push(xss[ind2][ind]);
        }
        outLists.push(outList);
    }
    return _filter(function (x) {
        return length(x);
    }, outLists);
};
let _subsequences = function _subsequences(xs) {
    let listLen = length(xs),
        len = Math.pow(2, listLen),
        out = [];
    for (let i = 0; i < len; i += 1) {
        let entry = [];
        for (let j = 0; j < listLen; j += 1) {
            if (i & 1 << j) {
                entry.push(xs[j]);
            }
        }
        out.push(entry);
    }
    return out;
};
let _swapped = function _swapped(ind1, ind2, list) {
    let out = copy(list),
        tmp = out[ind1];
    out[ind1] = out[ind2];
    out[ind2] = tmp;
    return out;
};
let _permutations = function _permutations(xs) {
    let limit = length(xs);

    if (!limit || limit === 1) {
        return [xs];
    }

    let list = copy(xs),
        c = _repeat(limit, 0),
        i = 0;

    let out = [list];

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
let _foldl = reduce$1;
let _foldr = reduceRight$1;
let _foldl1 = function _foldl1(op, xs) {
    let parts = _uncons(xs);
    return !parts ? [] : reduce$1(op, parts[0], parts[1]);
};
let _foldr1 = function _foldr1(op, xs) {
    let parts = _unconsr(xs);
    return !parts ? [] : reduceRight$1(op, parts[1], parts[0]);
};
let _mapAccumL = function _mapAccumL(op, zero, xs) {
    let list = copy(xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    let ind = 0,
        agg = zero,
        mapped = [],
        tuple = void 0;
    for (; ind < limit; ind++) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
};
let _mapAccumR = function _mapAccumR(op, zero, xs) {
    let list = copy(xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    let ind = limit - 1,
        agg = zero,
        mapped = [],
        tuple = void 0;
    for (; ind >= 0; ind--) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
};
let _iterate = function _iterate(limit, op, x) {
    let ind = 0,
        out = [],
        lastX = x;
    for (; ind < limit; ind += 1) {
        out.push(lastX);
        lastX = op(lastX);
    }
    return out;
};
let _repeat = function _repeat(limit, x) {
    return _iterate(limit, function (a) {
        return a;
    }, x);
};
let _replicate = _repeat;
let _cycle = function _cycle(limit, xs) {
    return _concat(_replicate(limit, xs));
};
let _unfoldr = function _unfoldr(op, x) {
    let ind = 0,
        out = [],
        resultTuple = op(x, ind, out);
    while (resultTuple) {
        out.push(resultTuple[0]);
        resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
};
let _findIndex = findIndexWhere;
let _findIndices = findIndicesWhere;
let _elemIndex = function _elemIndex(x, xs) {
    let foundInd = indexOf(x, xs);
    return foundInd !== -1 ? foundInd : undefined;
};
let _elemIndices = function _elemIndices(value, xs) {
    return _findIndices(function (x) {
        return x === value;
    }, xs);
};
let _take = function _take(limit, list) {
    return sliceTo(limit, list);
};
let _drop = function _drop(count, list) {
    return sliceFrom(count, list);
};
let _splitAt = function _splitAt(ind, list) {
    return [sliceTo(ind, list), sliceFrom(ind, list)];
};
let _takeWhile = function _takeWhile(pred, list) {
    return reduceUntil(negateP(pred), // predicate
    aggregateArr$$, // operation
    [], // aggregator
    list);
};
let _dropWhile = function _dropWhile(pred, list) {
    let limit = length(list),
        splitPoint = findIndexWhere(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : slice(splitPoint, limit, list);
};
let _dropWhileEnd = function _dropWhileEnd(pred, list) {
    let limit = length(list),
        splitPoint = findIndexWhereRight(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : sliceTo(splitPoint + 1, list);
};
let _span = function _span(pred, list) {
    let splitPoint = findIndexWhere(negateP(pred), list);
    return splitPoint === -1 ? _splitAt(0, list) : _splitAt(splitPoint, list);
};
let _breakOnList = function _breakOnList(pred, list) {
    let splitPoint = findIndexWhere(pred, list);
    return splitPoint === -1 ? _splitAt(0, list) : _splitAt(splitPoint, list);
};
let _at = prop$1;
let _find = findWhere;
let _filter = function _filter(pred, xs) {
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
let _partition = function _partition(pred, list) {
    return !length(list) ? [[], []] : [_filter(pred, list), _filter(negateP(pred), list)];
};
let _elem = includes;
let _notElem = negateF(includes);
let _lookup = _at;
let _isPrefixOf = function _isPrefixOf(xs1, xs2) {
    let limit1 = length(xs1),
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
let _isSuffixOf = function _isSuffixOf(xs1, xs2) {
    let limit1 = length(xs1),
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
let _isInfixOf = function _isInfixOf(xs1, xs2) {
    let limit1 = length(xs1),
        limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2) {
        return false;
    }
    let ind1 = void 0,
        foundLen = void 0,
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
let _isSubsequenceOf = function _isSubsequenceOf(xs1, xs2) {
    let len = Math.pow(2, length(xs2)),
        lenXs1 = length(xs1);
    let foundLen = void 0,
        i = void 0;
    for (i = 0; i < len; i += 1) {
        foundLen = 0;
        for (let j = 0; j < len; j += 1) {
            if (i & 1 << j && indexOf(xs2[j], xs1) > -1) {
                foundLen += 1;
            }
            if (foundLen === lenXs1) {
                return true;
            }
        }
    }
    return false;
};
let _group = function _group(xs) {
    return _groupBy(function (a, b) {
        return a === b;
    }, xs);
};
let _groupBy = function _groupBy(equalityOp, xs) {
    let limit = length(xs);
    if (!limit) {
        return copy(xs);
    }
    let ind = 0,
        prevItem = void 0,
        item = void 0,
        predOp = function predOp(x) {
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
let _inits = function _inits(xs) {
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
let _tails = function _tails(xs) {
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
let _stripPrefix = function _stripPrefix(prefix, list) {
    return _isPrefixOf(prefix, list) ? _splitAt(length(prefix), list)[1] : copy(list);
};
let _zip = function _zip(arr1, arr2) {
    if (!length(arr1) || !length(arr2)) {
        return [];
    }

    let _lengthsToSmallest = lengthsToSmallest(arr1, arr2),
        _lengthsToSmallest2 = _slicedToArray(_lengthsToSmallest, 2),
        a1 = _lengthsToSmallest2[0],
        a2 = _lengthsToSmallest2[1];

    return reduce$1(function (agg, item, ind) {
        return aggregateArr$$(agg, [item, a2[ind]]);
    }, [], a1);
};
let _zipN = function _zipN() {
    for (let _len15 = arguments.length, lists = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        lists[_key15] = arguments[_key15];
    }

    let trimmedLists = apply(lengthsToSmallest, _filter(length, lists)),
        lenOfTrimmed = length(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    } else if (lenOfTrimmed === 1) {
        return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
    }
    return reduce$1(function (agg, item, ind) {
        return aggregateArr$$(agg, _map(function (xs) {
            return xs[ind];
        }, trimmedLists));
    }, [], trimmedLists[0]);
};
let _zip3 = function _zip3(arr1, arr2, arr3) {
    return _zipN(arr1, arr2, arr3);
};
let _zip4 = function _zip4(arr1, arr2, arr3, arr4) {
    return _zipN(arr1, arr2, arr3, arr4);
};
let _zip5 = function _zip5(arr1, arr2, arr3, arr4, arr5) {
    return _zipN(arr1, arr2, arr3, arr4, arr5);
};
let _zipWith = function _zipWith(op, xs1, xs2) {
    if (!length(xs1) || !length(xs2)) {
        return [];
    }

    let _lengthsToSmallest3 = lengthsToSmallest(xs1, xs2),
        _lengthsToSmallest4 = _slicedToArray(_lengthsToSmallest3, 2),
        a1 = _lengthsToSmallest4[0],
        a2 = _lengthsToSmallest4[1];

    return reduce$1(function (agg, item, ind) {
        return aggregateArr$$(agg, op(item, a2[ind]));
    }, [], a1);
};
let _zipWithN = function _zipWithN(op) {
    for (let _len16 = arguments.length, lists = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
        lists[_key16 - 1] = arguments[_key16];
    }

    let trimmedLists = apply(lengthsToSmallest, lists),
        lenOfTrimmed = length(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    } else if (lenOfTrimmed === 1) {
        return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
    }
    return reduce$1(function (agg, item, ind) {
        return aggregateArr$$(agg, apply(op, _map(function (xs) {
            return xs[ind];
        }, trimmedLists)));
    }, [], trimmedLists[0]);
};
let _zipWith3 = function _zipWith3(op, xs1, xs2, xs3) {
    return _zipWithN(op, xs1, xs2, xs3);
};
let _zipWith4 = function _zipWith4(op, xs1, xs2, xs3, xs4) {
    return _zipWithN(op, xs1, xs2, xs3, xs4);
};
let _zipWith5 = function _zipWith5(op, xs1, xs2, xs3, xs4, xs5) {
    return _zipWithN(op, xs1, xs2, xs3, xs4, xs5);
};
let _unzip = function _unzip(arr) {
    return _foldl(function (agg, item) {
        agg[0].push(item[0]);
        agg[1].push(item[1]);
        return agg;
    }, [[], []], arr);
};
let _unzipN = function _unzipN(list) {
    if (!length(list)) {
        return [];
    }
    let lenItem0 = length(list[0]);
    let zero = lenItem0 ? _unfoldr(function (numLists) {
        return numLists-- ? [[], numLists] : undefined;
    }, lenItem0) : [];
    return _foldl(function (agg, item) {
        agg.forEach(function (outList, ind) {
            return outList.push(item[ind]);
        });
        return agg;
    }, zero, list);
};
let _any = function _any(p, xs) {
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
let _all = function _all(p, xs) {
    let limit = length(xs);
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
let _and = function _and(xs) {
    return _all(isTruthy, xs);
};
let _or = function _or(xs) {
    return _any(isTruthy, xs);
};
let _not = function _not(xs) {
    return _all(isFalsy, xs);
};
let _sum = function _sum(list) {
    return _foldl(function (agg, x) {
        return agg + x;
    }, 0, list);
};
let _product = function _product(list) {
    return _foldl(function (agg, x) {
        return agg * x;
    }, 1, list);
};
let _maximum = function _maximum(list) {
    return _last(_sortBy(genericAscOrdering, list));
};
let _minimum = function _minimum(list) {
    return _head(_sortBy(genericAscOrdering, list));
};
let _scanl = function _scanl(fn, zero, xs) {
    if (!xs || !length(xs)) {
        return [];
    }
    let limit = length(xs);
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
let _scanl1 = function _scanl1(fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return _scanl(fn, _head(xs), _tail(xs));
};
let _scanr = function _scanr(fn, zero, xs) {
    if (!xs || !length(xs)) {
        return [];
    }
    let limit = length(xs);
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
let _scanr1 = function _scanr1(fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return _scanr(fn, _last(xs), _init(xs));
};
let _nub = function _nub(list) {
    return _nubBy(function (a, b) {
        return a === b;
    }, list);
};
let _remove = function _remove(x, list) {
    return _removeBy(function (a, b) {
        return a === b;
    }, x, list);
};
let _sort = function _sort(xs) {
    return _sortBy(genericAscOrdering, xs);
};
let _sortOn = function _sortOn(valueFn, xs) {
    return (

        // Un-decorate
        _map(function (decorated) {
            return decorated[1];
        },

        // Decorate and sort
        _sortBy(
        // Ordering
        function (_ref3, _ref4) {
            let _ref6 = _slicedToArray(_ref3, 1),
                a0 = _ref6[0];

            let _ref5 = _slicedToArray(_ref4, 1),
                b0 = _ref5[0];

            return genericAscOrdering(a0, b0);
        },

        // Decorate
        _map(function (item) {
            return [valueFn(item), item];
        }, xs)))
    );
};
let _sortBy = function _sortBy(orderingFn, xs) {
    return copy(xs).sort(orderingFn || genericAscOrdering);
};
let _insert = function _insert(x, xs) {
    if (!length(xs)) {
        return [x];
    }
    let foundIndex = _findIndex(function (item) {
        return x <= item;
    }, xs);
    return foundIndex === -1 ? [x] : _concat(_intersperse([x], _splitAt(foundIndex, xs)));
};
let _insertBy = function _insertBy(orderingFn, x, xs) {
    let limit = length(xs);
    if (!limit) {
        return [x];
    }
    let ind = 0;
    for (; ind < limit; ind += 1) {
        if (orderingFn(x, xs[ind]) <= 0) {
            let parts = _splitAt(ind, xs);
            return _concat([parts[0], [x], parts[1]]);
        }
    }
    return aggregateArr$$(copy(xs), x);
};
let _nubBy = function _nubBy(pred, list) {
    if (!length(list)) {
        return [];
    }
    let limit = length(list);
    let ind = 0,
        currItem = void 0,
        out = [],
        anyOp = function anyOp(storedItem) {
        return pred(currItem, storedItem);
    };
    for (; ind < limit; ind += 1) {
        currItem = list[ind];
        if (_any(anyOp, out)) {
            continue;
        }
        out.push(currItem);
    }
    return out;
};
let _removeBy = function _removeBy(pred, x, list) {
    // @todo optimize this implementation
    let foundIndex = _findIndex(function (item) {
        return pred(x, item);
    }, list),
        parts = _splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
    return _append(parts[0], _tail(parts[1]));
};
let _removeFirstsBy = function _removeFirstsBy(pred, xs1, xs2) {
    return _foldl(function (agg, item) {
        return _removeBy(pred, item, agg);
    }, xs1, xs2);
};
let _unionBy = function _unionBy(pred, arr1, arr2) {
    return _foldl(function (agg, b) {
        let alreadyAdded = _any(function (a) {
            return pred(a, b);
        }, agg);
        return !alreadyAdded ? (agg.push(b), agg) : agg;
    }, copy(arr1), arr2);
};
let _union = function _union(arr1, arr2) {
    return _append(arr1, _filter(function (elm) {
        return !includes(elm, arr1);
    }, arr2));
};
let _intersect = function _intersect(arr1, arr2) {
    return !arr1 || !arr2 || !arr1 && !arr2 ? [] : _filter(function (elm) {
        return includes(elm, arr2);
    }, arr1);
};
let _intersectBy = function _intersectBy(pred, list1, list2) {
    return _foldl(function (agg, a) {
        return _any(function (b) {
            return pred(a, b);
        }, list2) ? (agg.push(a), agg) : agg;
    }, [], list1);
};
let _difference = function _difference(array1, array2) {
    // augment this with max length and min length ordering on op
    if (array1 && !array2) {
        return copy(array1);
    } else if (!array1 && array2 || !array1 && !array2) {
        return [];
    }
    return reduce$1(function (agg, elm) {
        return !includes(elm, array2) ? (agg.push(elm), agg) : agg;
    }, [], array1);
};
let _complement = function _complement(arr0) {
    for (let _len17 = arguments.length, arrays = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
        arrays[_key17 - 1] = arguments[_key17];
    }

    return reduce$1(function (agg, arr) {
        return _append(agg, _difference(arr, arr0));
    }, [], arrays);
};

let objUnion$1 = function objUnion$1(obj1, obj2) {
    return assignDeep$1(obj1, obj2);
};
let objIntersect$1 = function objIntersect$1(obj1, obj2) {
    return _foldl(function (agg, key) {
        if (hasOwnProperty$1(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
};
let objDifference$1 = function objDifference$1(obj1, obj2) {
    return _foldl(function (agg, key) {
        if (!hasOwnProperty$1(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
};
let objComplement$1 = function objComplement$1(obj0) {
    for (let _len18 = arguments.length, objs = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
        objs[_key18 - 1] = arguments[_key18];
    }

    return _foldl(function (agg, obj) {
        return assignDeep$1(agg, objDifference$1(obj, obj0));
    }, {}, objs);
};

/**
 * @module objectOps
 */
let prop$$1 = curry(prop$1);
let instanceOf$$1 = curry(instanceOf$1);
let hasOwnProperty$$1 = curry(hasOwnProperty$1);
let assign$$1 = curry2(assign$1);
let assignDeep$$1 = curry2(assignDeep$1);
let objUnion$$1 = curry(objUnion$1);
let objIntersect$$1 = curry(objIntersect$1);
let objDifference$$1 = curry(objDifference$1);
let objComplement$$1 = curry2(objComplement$1);
let isType$$1 = curry(isType$1);

let until$1 = function until$1(predicate, operation, typeInstance) {
    let result = typeInstance;
    while (!predicate(result)) {
        result = operation(result);
    }
    return result;
};

let flipN$1 = function flipN$1(fn) {
    return function () {
        for (let _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
            args[_key19] = arguments[_key19];
        }

        return apply(fn, reverse(args));
    };
};
let flip3$1 = function flip3$1(fn) {
    return function (a, b, c) {
        return call(fn, c, b, a);
    };
};
let flip4$1 = function flip4$1(fn) {
    return function (a, b, c, d) {
        return call(fn, d, c, b, a);
    };
};
let flip5$1 = function flip5$1(fn) {
    return function (a, b, c, d, e) {
        return call(fn, e, d, c, b, a);
    };
};
let flip$1 = function flip$1(fn) {
    return function (b, a) {
        return call(fn, a, b);
    };
};

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
let PlaceHolder = function PlaceHolder() {};
let notFnErrPrefix$1 = '`fn` in `curry_(fn, ...args)`';
let placeHolderInstance = new PlaceHolder();

/**
 * Checks to see if value is a `PlaceHolder`.
 * @param instance {*}
 * @returns {boolean}
 * @private
 */
function isPlaceHolder(instance) {
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
function replacePlaceHolders(array, args) {
    let out = map(function (element) {
        if (!isPlaceHolder(element)) {
            return element;
        } else if (length(args)) {
            return args.shift();
        }
        return element;
    }, array);
    return length(args) ? concat(out, args) : out;
}

/**
 * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function module:function.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
function curry_(fn) {
    for (let _len20 = arguments.length, argsToCurry = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
        argsToCurry[_key20 - 1] = arguments[_key20];
    }

    return curryN_.apply(undefined, [fnOrError(notFnErrPrefix$1, fn).length, fn].concat(argsToCurry));
}

/**
 * Curries a function up to given arity also enforces arity via placeholder values (`__`).
 * @function module:function.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in function wrapped in a function for currying.
 */
function curryN_(executeArity, fn) {
    for (let _len21 = arguments.length, curriedArgs = Array(_len21 > 2 ? _len21 - 2 : 0), _key21 = 2; _key21 < _len21; _key21++) {
        curriedArgs[_key21 - 2] = arguments[_key21];
    }

    return function () {
        for (let _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
            args[_key22] = arguments[_key22];
        }

        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = filter(isPlaceHolder, concatedArgs),
            canBeCalled = length(concatedArgs) - length(placeHolders) >= executeArity || !executeArity;
        return !canBeCalled ? apply(curryN_, concat([executeArity, fnOrError(notFnErrPrefix$1, fn)], concatedArgs)) : apply(fnOrError(notFnErrPrefix$1, fn), concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @memberOf _functionOps
 * @type {PlaceHolder}
 */
let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
let curry2_ = function curry2_(fn) {
    return curryN_(2, fn);
};
let curry3_ = function curry3_(fn) {
    return curryN_(3, fn);
};
let curry4_ = function curry4_(fn) {
    return curryN_(4, fn);
};
let curry5_ = function curry5_(fn) {
    return curryN_(5, fn);
};

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
let id = function id(x) {
    return x;
};

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @function module:function.compose
 * @type {Function}
 * @param args {...{Function}}
 * @returns {Function}
 */
let compose = function compose() {
    for (let _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
        args[_key23] = arguments[_key23];
    }

    return function (arg0) {
        return reduceRight(function (value, fn) {
            return fn(value);
        }, arg0, args);
    };
};

/**
 * Function operations: `
 * @module functionOps
 */

let apply$1 = curry(apply);
let call$1 = curry2(call);
let until$$1 = curry(until$1);
let flipN$$1 = function flipN$$1(fn) {
    return curry3(function () {
        for (let _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
            args[_key24] = arguments[_key24];
        }

        return apply$1(fn, reverse(args));
    });
};
let flip$$1 = function flip$$1(fn) {
    return curry(flip$1(fn));
};
let flip3$$1 = function flip3$$1(fn) {
    return curry(flip3$1(fn));
};
let flip4$$1 = function flip4$$1(fn) {
    return curry(flip4$1(fn));
};
let flip5$$1 = function flip5$$1(fn) {
    return curry(flip5$1(fn));
};

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
 * @function module:functionOps.negateFN
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

let fPureTakesOne = function fPureTakesOne(name) {
    return curry(function (arg, f) {
        return f[name](arg);
    });
};
let fPureTakes2 = function fPureTakes2(name) {
    return curry(function (arg1, arg2, f) {
        return f[name](arg1, arg2);
    });
};
let fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return curry2(function (f) {
        for (let _len25 = arguments.length, args = Array(_len25 > 1 ? _len25 - 1 : 0), _key25 = 1; _key25 < _len25; _key25++) {
            args[_key25 - 1] = arguments[_key25];
        }

        return f[name].apply(f, args);
    });
};

/**
 * Created by elyde on 7/20/2017.
 * Curried functional versions of common array methods (`filter`, `map`, etc.).
 * @module jsPlatform_array
 * @private
 */

let push$1 = fPureTakesOneOrMore('push');

/**
 * List operations that overlap (apart from globally overlapping props and functions like `length`)
 * on both strings and arrays.
 * @module jsPlatform_list
 * @private
 */

let slice$1 = curry(slice);
let includes$1 = curry(includes);
let indexOf$1 = curry(indexOf);
let lastIndexOf$1 = curry(lastIndexOf);

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
let split$1 = curry(split);

/**
 * @module jsPlatform
 * @private
 */

/**
 * List operators.
 * @module listOps
 */
let append = curry(_append);
let appendMany = curry2(_appendMany);
let concatMap = curry2(_concatMap);
let map$1 = curry(_map);
let intersperse = curry(_intersperse);
let intercalate = curry(_intercalate);
let foldl = curry(_foldl);
let foldr = curry(_foldr);
let foldl1 = curry(_foldl1);
let foldr1 = curry(_foldr1);
let mapAccumL = curry(_mapAccumL);
let mapAccumR = curry(_mapAccumR);
let iterate = curry(_iterate);
let repeat = curry(_repeat);
let replicate = curry(_replicate);
let cycle = curry(_cycle);
let unfoldr = curry(_unfoldr);
let findIndex = curry(_findIndex);
let findIndices = curry(_findIndices);
let elemIndex = curry(_elemIndex);
let elemIndices = curry(_elemIndices);
let take = curry(_take);
let drop = curry(_drop);
let splitAt = curry(_splitAt);
let takeWhile = curry(_takeWhile);
let dropWhile = curry(_dropWhile);
let dropWhileEnd = curry(_dropWhileEnd);
let span = curry(_span);
let breakOnList = curry(_breakOnList);
let at = curry(_at);
let find = curry(_find);
let filter$1 = curry(_filter);
let partition = curry(_partition);
let elem = curry(_elem);
let notElem = curry2(_notElem);
let lookup = curry(_lookup);
let isPrefixOf = curry(_isPrefixOf);
let isSuffixOf = curry(_isSuffixOf);
let isInfixOf = curry(_isInfixOf);
let isSubsequenceOf = curry(_isSubsequenceOf);
let groupBy = curry(_groupBy);
let stripPrefix = curry(_stripPrefix);
let zip = curry(_zip);
let zip3 = curry(_zip3);
let zip4 = curry(_zip4);
let zip5 = curry(_zip5);
let zipWith = curry(_zipWith);
let zipWithN = curry(_zipWithN);
let zipWith3 = curry(_zipWith3);
let zipWith4 = curry(_zipWith4);
let zipWith5 = curry(_zipWith5);
let any = curry(_any);
let all = curry(_all);
let scanl = curry(_scanl);
let scanl1 = curry(_scanl1);
let scanr = curry(_scanr);
let scanr1 = curry(_scanr1);
let remove = curry(_remove);
let sortOn = curry(_sortOn);
let sortBy = curry(_sortBy);
let insert = curry(_insert);
let insertBy = curry(_insertBy);
let nubBy = curry(_nubBy);
let removeBy = curry(_removeBy);
let removeFirstsBy = curry(_removeFirstsBy);
let unionBy = curry(_unionBy);
let union = curry(_union);
let intersect = curry(_intersect);
let intersectBy = curry(_intersectBy);
let difference = curry(_difference);
let complement = curry2(_complement);

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module stringOps
 */
let lines = split$1(/[\n\r]/gm);
let words = split$1(/[\s\t]/gm);
let unwords = intercalate(' ');
let unlines = intercalate('\n');
let lcaseFirst = function lcaseFirst(xs) {
    return xs[0].toLowerCase() + xs.substring(1);
};
let ucaseFirst = function ucaseFirst(xs) {
    return xs[0].toUpperCase() + xs.substring(1);
};
let camelCase = function camelCase(xs, pattern) {
    return _map(ucaseFirst, _splitAt(pattern || /[^a-z\d]/i, xs));
};

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

exports._instanceOf = instanceOf$1;
exports._isType = isType$1;
exports._hasOwnProperty = hasOwnProperty$1;
exports._assign = assign$1;
exports._prop = prop$1;
exports._assignDeep = assignDeep$1;
exports._objUnion = objUnion$1;
exports._objComplement = objComplement$1;
exports._objIntersect = objIntersect$1;
exports._objDifference = objDifference$1;
exports.prop = prop$$1;
exports.instanceOf = instanceOf$$1;
exports.hasOwnProperty = hasOwnProperty$$1;
exports.assign = assign$$1;
exports.assignDeep = assignDeep$$1;
exports.objUnion = objUnion$$1;
exports.objIntersect = objIntersect$$1;
exports.objDifference = objDifference$$1;
exports.objComplement = objComplement$$1;
exports.isType = isType$$1;
exports.jsonClone = jsonClone;
exports.fromArrayMap = fromArrayMap;
exports.toArrayMap = toArrayMap;
exports.toArray = toArray;
exports.length = length;
exports.keys = keys;
exports.isFunction = isFunction;
exports.isClass = isClass;
exports.isCallable = isCallable;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isMap = isMap;
exports.isSet = isSet;
exports.isWeakMap = isWeakMap;
exports.isWeakSet = isWeakSet;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isSymbol = isSymbol;
exports.isUsableImmutablePrimitive = isUsableImmutablePrimitive;
exports.isEmptyList = isEmptyList;
exports.isEmptyObject = isEmptyObject;
exports.isEmptyCollection = isEmptyCollection;
exports.isEmpty = isEmpty;
exports.isset = isset;
exports.typeOf = typeOf;
exports.of = of;
exports.log = log;
exports.error = error;
exports.peek = peek;
exports.isTruthy = isTruthy;
exports.isFalsy = isFalsy;
exports.alwaysTrue = alwaysTrue;
exports.alwaysFalse = alwaysFalse;
exports._apply = apply;
exports._call = call;
exports._until = until$1;
exports._flip = flip$1;
exports._flip3 = flip3$1;
exports._flip4 = flip4$1;
exports._flip5 = flip5$1;
exports._flipN = flipN$1;
exports.apply = apply$1;
exports.call = call$1;
exports.until = until$$1;
exports.flipN = flipN$$1;
exports.flip = flip$$1;
exports.flip3 = flip3$$1;
exports.flip4 = flip4$$1;
exports.flip5 = flip5$$1;
exports.curry = curry;
exports.curryN = curryN;
exports.curry2 = curry2;
exports.curry3 = curry3;
exports.curry4 = curry4;
exports.curry5 = curry5;
exports.curry_ = curry_;
exports.curryN_ = curryN_;
exports.__ = __;
exports.curry2_ = curry2_;
exports.curry3_ = curry3_;
exports.curry4_ = curry4_;
exports.curry5_ = curry5_;
exports.negateF = negateF;
exports.negateF3 = negateF3;
exports.negateF4 = negateF4;
exports.negateF5 = negateF5;
exports.negateP = negateP;
exports.negateFN = negateFN;
exports.id = id;
exports.compose = compose;
exports.and = _and;
exports.or = _or;
exports.not = _not;
exports.zipN = _zipN;
exports.unzip = _unzip;
exports.unzipN = _unzipN;
exports.concat = _concat;
exports.reverse = _reverse;
exports.transpose = _transpose;
exports.subsequences = _subsequences;
exports.permutations = _permutations;
exports.group = _group;
exports.tails = _tails;
exports.sum = _sum;
exports.product = _product;
exports.maximum = _maximum;
exports.minimum = _minimum;
exports.sort = _sort;
exports.nub = _nub;
exports.head = _head;
exports.last = _last;
exports.tail = _tail;
exports.init = _init;
exports.inits = _inits;
exports.uncons = _uncons;
exports.unconsr = _unconsr;
exports.swapped = _swapped;
exports.append = append;
exports.appendMany = appendMany;
exports.concatMap = concatMap;
exports.map = map$1;
exports.intersperse = intersperse;
exports.intercalate = intercalate;
exports.foldl = foldl;
exports.foldr = foldr;
exports.foldl1 = foldl1;
exports.foldr1 = foldr1;
exports.mapAccumL = mapAccumL;
exports.mapAccumR = mapAccumR;
exports.iterate = iterate;
exports.repeat = repeat;
exports.replicate = replicate;
exports.cycle = cycle;
exports.unfoldr = unfoldr;
exports.findIndex = findIndex;
exports.findIndices = findIndices;
exports.elemIndex = elemIndex;
exports.elemIndices = elemIndices;
exports.take = take;
exports.drop = drop;
exports.splitAt = splitAt;
exports.takeWhile = takeWhile;
exports.dropWhile = dropWhile;
exports.dropWhileEnd = dropWhileEnd;
exports.span = span;
exports.breakOnList = breakOnList;
exports.at = at;
exports.find = find;
exports.filter = filter$1;
exports.partition = partition;
exports.elem = elem;
exports.notElem = notElem;
exports.lookup = lookup;
exports.isPrefixOf = isPrefixOf;
exports.isSuffixOf = isSuffixOf;
exports.isInfixOf = isInfixOf;
exports.isSubsequenceOf = isSubsequenceOf;
exports.groupBy = groupBy;
exports.stripPrefix = stripPrefix;
exports.zip = zip;
exports.zip3 = zip3;
exports.zip4 = zip4;
exports.zip5 = zip5;
exports.zipWith = zipWith;
exports.zipWithN = zipWithN;
exports.zipWith3 = zipWith3;
exports.zipWith4 = zipWith4;
exports.zipWith5 = zipWith5;
exports.any = any;
exports.all = all;
exports.scanl = scanl;
exports.scanl1 = scanl1;
exports.scanr = scanr;
exports.scanr1 = scanr1;
exports.remove = remove;
exports.sortOn = sortOn;
exports.sortBy = sortBy;
exports.insert = insert;
exports.insertBy = insertBy;
exports.nubBy = nubBy;
exports.removeBy = removeBy;
exports.removeFirstsBy = removeFirstsBy;
exports.unionBy = unionBy;
exports.union = union;
exports.intersect = intersect;
exports.intersectBy = intersectBy;
exports.difference = difference;
exports.complement = complement;
exports.slice = slice$1;
exports.includes = includes$1;
exports.indexOf = indexOf$1;
exports.lastIndexOf = lastIndexOf$1;
exports.split = split$1;
exports.push = push$1;
exports._map = _map;
exports._append = _append;
exports._appendMany = _appendMany;
exports._head = _head;
exports._last = _last;
exports._tail = _tail;
exports._init = _init;
exports._uncons = _uncons;
exports._unconsr = _unconsr;
exports._concat = _concat;
exports._concatMap = _concatMap;
exports._reverse = _reverse;
exports._intersperse = _intersperse;
exports._intercalate = _intercalate;
exports._transpose = _transpose;
exports._subsequences = _subsequences;
exports._swapped = _swapped;
exports._permutations = _permutations;
exports._foldl = _foldl;
exports._foldr = _foldr;
exports._foldl1 = _foldl1;
exports._foldr1 = _foldr1;
exports._mapAccumL = _mapAccumL;
exports._mapAccumR = _mapAccumR;
exports._iterate = _iterate;
exports._repeat = _repeat;
exports._replicate = _replicate;
exports._cycle = _cycle;
exports._unfoldr = _unfoldr;
exports._findIndex = _findIndex;
exports._findIndices = _findIndices;
exports._elemIndex = _elemIndex;
exports._elemIndices = _elemIndices;
exports._take = _take;
exports._drop = _drop;
exports._splitAt = _splitAt;
exports._takeWhile = _takeWhile;
exports._dropWhile = _dropWhile;
exports._dropWhileEnd = _dropWhileEnd;
exports._span = _span;
exports._breakOnList = _breakOnList;
exports._at = _at;
exports._find = _find;
exports._filter = _filter;
exports._partition = _partition;
exports._elem = _elem;
exports._notElem = _notElem;
exports._lookup = _lookup;
exports._isPrefixOf = _isPrefixOf;
exports._isSuffixOf = _isSuffixOf;
exports._isInfixOf = _isInfixOf;
exports._isSubsequenceOf = _isSubsequenceOf;
exports._group = _group;
exports._groupBy = _groupBy;
exports._inits = _inits;
exports._tails = _tails;
exports._stripPrefix = _stripPrefix;
exports._zip = _zip;
exports._zipN = _zipN;
exports._zip3 = _zip3;
exports._zip4 = _zip4;
exports._zip5 = _zip5;
exports._zipWith = _zipWith;
exports._zipWithN = _zipWithN;
exports._zipWith3 = _zipWith3;
exports._zipWith4 = _zipWith4;
exports._zipWith5 = _zipWith5;
exports._unzip = _unzip;
exports._unzipN = _unzipN;
exports._any = _any;
exports._all = _all;
exports._and = _and;
exports._or = _or;
exports._not = _not;
exports._sum = _sum;
exports._product = _product;
exports._maximum = _maximum;
exports._minimum = _minimum;
exports._scanl = _scanl;
exports._scanl1 = _scanl1;
exports._scanr = _scanr;
exports._scanr1 = _scanr1;
exports._nub = _nub;
exports._remove = _remove;
exports._sort = _sort;
exports._sortOn = _sortOn;
exports._sortBy = _sortBy;
exports._insert = _insert;
exports._insertBy = _insertBy;
exports._nubBy = _nubBy;
exports._removeBy = _removeBy;
exports._removeFirstsBy = _removeFirstsBy;
exports._unionBy = _unionBy;
exports._union = _union;
exports._intersect = _intersect;
exports._intersectBy = _intersectBy;
exports._difference = _difference;
exports._complement = _complement;
exports.lines = lines;
exports.words = words;
exports.unwords = unwords;
exports.unlines = unlines;
exports.lcaseFirst = lcaseFirst;
exports.ucaseFirst = ucaseFirst;
exports.camelCase = camelCase;
exports.fPureTakesOne = fPureTakesOne;
exports.fPureTakes2 = fPureTakes2;
exports.fPureTakesOneOrMore = fPureTakesOneOrMore;
exports.fPureTakesOne = fPureTakesOne;
exports.fPureTakes2 = fPureTakes2;
exports.fPureTakes3 = fPureTakes3;
exports.fPureTakes4 = fPureTakes4;
exports.fPureTakes5 = fPureTakes5;
exports.fPureTakesOneOrMore = fPureTakesOneOrMore;
exports.fnOrError = fnOrError;
exports.sliceFrom = sliceFrom;
exports.sliceTo = sliceTo;
exports.copy = copy;
exports.sliceCopy = sliceCopy;
exports.genericAscOrdering = genericAscOrdering;
exports.lengths = lengths;
exports.lengthsToSmallest = lengthsToSmallest;
exports.reduceUntil = reduceUntil;
exports.reduceRightUntil = reduceRightUntil;
exports.reduce = reduce$1;
exports.reduceRight = reduceRight$1;
exports.lastIndex = lastIndex;
exports.findIndexWhere = findIndexWhere;
exports.findIndexWhereRight = findIndexWhereRight;
exports.findIndicesWhere = findIndicesWhere;
exports.findWhere = findWhere;
exports.aggregateStr = aggregateStr;
exports.aggregateArr$$ = aggregateArr$$;
exports.aggregateObj = aggregateObj;
exports.aggregatorByType = aggregatorByType;
