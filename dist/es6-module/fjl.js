/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf functionOps
 * @description Different curry implementations for modern javascript currying.
 * @todo Make code here more minimal (reuse small parts here).
 * @todo separate curry_ (and it's variants) into a separate file/module.
 */

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
const PlaceHolder = function PlaceHolder() {};
const placeHolderInstance = new PlaceHolder();

/**
 * Curries a function based on it's defined arity (argument's arrayOps expected length).
 * @function module:functionOps.curry
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
function curry (fn, ...argsToCurry) {
    return (...args) => {
        const concatedArgs = argsToCurry.concat(args);
        return concatedArgs.length < fn.length ?
            curry.apply(null, [fn].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Checks to see if value is a `PlaceHolder`.
 * @function isPlaceHolder
 * @param instance {*}
 * @returns {boolean}
 * @private
 */
function isPlaceHolder (instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `listOps`.
 * @function replacePlaceHolder
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `listOps` with placeholders replaced by values in `args`.
 * @private
 */
function replacePlaceHolders (array, args) {
    let out = array.map(element => {
        if (!isPlaceHolder(element)) {
            return element;
        }
        else if (args.length > 0) {
            return args.shift();
        }
        return element;
    });
    return args.length > 0 ? out.concat(args) : out;
}

/**
 * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function module:functionOps.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
function curry_ (fn, ...argsToCurry) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(argsToCurry, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = placeHolders.length === 0 &&
                concatedArgs.length >= fn.length;
        return canBeCalled ? fn.apply(null, concatedArgs) :
            curry_.apply(null, [fn].concat(concatedArgs));
    };
}

/**
 * Curries a functionOps up to given arity also enforces arity via placeholder values (`__`).
 * @function module:functionOps.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in functionOps wrapped in a functionOps for currying.
 */
function curryN_ (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = (concatedArgs.length - placeHolders.length >= executeArity) || !executeArity;
        return !canBeCalled ? curryN_.apply(null, [executeArity, fn].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Curries a functionOps up to a given arity.
 * @function module:functionOps.curryN
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*}
 * @returns {Function}
 */
function curryN (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = curriedArgs.concat(args),
            canBeCalled = (concatedArgs.length >= executeArity) || !executeArity;
        return !canBeCalled ? curryN.apply(null, [executeArity, fn].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
let curry2_ = fn => curryN_(2, fn);
let curry3_ = fn => curryN_(3, fn);
let curry4_ = fn => curryN_(4, fn);
let curry5_ = fn => curryN_(5, fn);
let curry2 = fn => curryN(2, fn);
let curry3 = fn => curryN(3, fn);
let curry4 = fn => curryN(4, fn);
let curry5 = fn => curryN(5, fn);

/**
 * Created by elydelacruz on 7/22/2017.
 */

const fPureTakesOne = name => (arg, f) => f[name](arg);
const fPureTakes2 = name => (arg1, arg2, f) => f[name](arg1, arg2);
const fPureTakesOneOrMore = name => (f, ...args) => f[name](...args);

/**
 * Created by elydelacruz on 9/6/2017.
 * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
 * throughout the library.  @note Doesn't include all methods for objects just the ones used in
 *  the library.
 * @todo change all files named '*UnCurried' to '*Uncurried'.
 */

const instanceOf$1 = (instanceConstructor, instance) =>
        instance instanceof instanceConstructor;
const hasOwnProperty$1 = fPureTakesOne('hasOwnProperty');
const length = x => x.length;
const toString = x => x.toString();
const keys = obj => Object.keys(obj);
const assign$1 = (() =>
        Object.assign ?
            (obj0, ...objs) => Object.assign(obj0, ...objs) :
            (obj0, ...objs) => objs.reduce((topAgg, obj) => {
                return keys(obj).reduce((agg, key) => {
                    agg[key] = obj[key];
                    return agg;
                }, topAgg);
            }, obj0))();

/**
 * Created by elyde on 12/18/2016.
 */
const _Number$1 = Number.name;
const _NaN = 'NaN';
const _Null$1 = 'Null';
const _Undefined$1 = 'Undefined';
const _undefined = 'undefined';

/**
 * Returns the class name of an object from it's class stringOps.
 * @note Returns 'NaN' if value `isNaN` and value type is 'Number'.
 * @function module:fjl.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name property if not null or undefined (in which case a
 *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
 */
function typeOf (value) {
    let retVal;
    if (typeof value === _undefined) {
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
 * @module is
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
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
const isType = (type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type);
const isClass = x => x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10));
const isCallable = x => isFunction(x) && !isClass(x);
const isArray = value => isType(Array, value);
const isObject = value => isType(_Object, value);
const isBoolean = value => isType(_Boolean, value);
const isNumber = value => isType(_Number, value);
const isString = value => isType(_String, value);
const isMap = value => isType(_Map, value);
const isSet = value => isType(_Set, value);
const isWeakMap = value => isType(_WeakMap, value);
const isWeakSet = value => isType(_WeakSet, value);
const isUndefined = value => isType(_Undefined, value);
const isNull = value => isType(_Null, value);
const isSymbol = value => isType(_Symbol, value);
const isPromise = value => isType('Promise', value);
const isUsableImmutablePrimitive = x => {
        const typeOfX = typeOf(x);
        return [_String, _Number, _Boolean, _Symbol]
            .some(Type => Type === typeOfX);
    };
const isEmptyList = x => length(x) === 0;
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
const notEmptyAndOfType = (type, value) => !isEmpty(value) && isType(type, value);
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
 * Created by elydelacruz on 9/7/2017.
 */
const apply = (fn, args) => fn.apply(null, args);
const call = (fn, ...args) => apply(fn, args);

/**
 * Created by elydelacruz on 7/22/2017.
 */

/**
 * Functional `apply` functionOps (takes no context).
 * @function module:functionOps.apply
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 */

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
 *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
 *      on both strings and arrays.
 */

// export {length, toString} from './objectOpsUnCurried';

const concat$1 = fPureTakesOneOrMore('concat');
const slice = fPureTakes2('slice');
const includes = (() => 'includes' in Array.prototype ?
            fPureTakesOne('includes') :
            (value, xs) => xs.indexOf(value) > -1)();
const indexOf = fPureTakesOne('indexOf');

/**
 * Created by elyde on 7/20/2017.
 * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
 * @module jsPlatform:arrayOpsUncurried
 * @todo updated doc blocks to list correct/updated module name.
 */

/**
 * @module negate
 */

const negateF = fn => (a, b) => !fn(a, b);
const negateF3 = fn => (a, b, c) => !fn(a, b, c);
const negateP = negateF3;

/**
 * Created by elydelacruz on 7/22/2017.
 */

/**
 * Functional `call` functionOps (takes no context).
 * @function module:functionOps.call
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 */

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @function module:fjl.compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */

/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @module curry
 * @description Curry strict and curry arbitrarily functions `curry` and `curryN`.
 */

const curry$1 = (fn, ...argsToCurry) => {
        return (...args) => {
            const concatedArgs = append(argsToCurry, args);
            return length(concatedArgs) < length(fn) ?
                apply(curry$1, append([fn], concatedArgs)) :
                apply(fn, concatedArgs);
        };
    };
const curryN$1 = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = append(curriedArgs, args),
                canBeCalled = (length(concatedArgs) >= executeArity) || !executeArity;
            return !canBeCalled ? apply(curryN$1, append([executeArity, fn], concatedArgs)) :
                apply(fn, concatedArgs);
        };
    };
const curry2$1 = fn => curryN$1(2, fn);

/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @file fjl-curry/src/curry.js
 * @module curry {{curry: Function, curryN: Function, curry2: Function, curry3: Function, curry4: Function, curry5: Function, curry_: Function, curryN_: Function, curry2_: Function, curry3_: Function, curry4_: Function, curry5_: Function}}
 * @description Different curry implementations for modern javascript currying.
 * @todo Make code here more minimal (reuse small parts here).
 */

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
const PlaceHolder$1 = function PlaceHolder() {};
const placeHolderInstance$1 = new PlaceHolder$1();

/**
 * Checks to see if value is a `PlaceHolder`.
 * @function isPlaceHolder
 * @param instance {*}
 * @returns {boolean}
 */
function isPlaceHolder$1 (instance) {
    return instance instanceof PlaceHolder$1;
}

/**
 * Replaces `placeholder` values in `listOps`.
 * @function replacePlaceHolder
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `listOps` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders$1 (array, args) {
    let out = map$1(element => {
            if (!isPlaceHolder$1(element)) { return element; }
            else if (length(args)) { return args.shift(); }
            return element;
        }, array);
    return length(args) ? append(out, args) : out;
}

/**
 * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */


/**
 * Curries a functionOps up to given arity also enforces arity via placeholder values (`__`).
 * @function curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in functionOps wrapped in a functionOps for currying.
 */
function curryN_$1 (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders$1(curriedArgs, args),
            placeHolders = filter(isPlaceHolder$1, concatedArgs),
            canBeCalled = (length(concatedArgs) - length(placeHolders) >= executeArity) || !executeArity;
        return !canBeCalled ?
            apply(curryN_$1, append([executeArity, fn], concatedArgs)) :
            apply(fn, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @type {PlaceHolder}
 */
let __$1 = Object.freeze ? Object.freeze(placeHolderInstance$1) : placeHolderInstance$1;
let curry2_$1 = fn => curryN_$1(2, fn);
let curry3_$1 = fn => curryN_$1(3, fn);
let curry4_$1 = fn => curryN_$1(4, fn);
let curry5_$1 = fn => curryN_$1(5, fn);

/**
 * @module id
 */

/**
 * Returns passed in parameter.
 * @param x {*}
 * @returns {*}
 */

/**
 * @module functionOpsUncurried
 */

const isTruthy = value => !!value;
const isFalsy = value => !value;

/**
 * Created by elyde on 7/15/2017.
 * @module booleanOps
 */

const alwaysTrue = () => true;
const alwaysFalse = () => false;
const bAnd = curry2((a, b) => a && b);
const bOr = curry2((a, b) => a || b);
const bNot = x => !x;
const bOtherwise = alwaysTrue;
const bEqual = curry2((a, b) => a === b);

/**
 *
 */

const prop = (name, obj) => obj[name];

/**
 * Created by elyde on 12/18/2016.
 */
const _Number$3 = Number.name;
const _NaN$1 = 'NaN';
const _Null$3 = 'Null';
const _Undefined$3 = 'Undefined';
const _undefined$1 = 'undefined';

/**
 * Returns the class name of an object from it's class stringOps.
 * @note Returns 'NaN' if value `isNaN` and value type is 'Number'.
 * @function module:fjl.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name property if not null or undefined (in which case a
 *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
 */
function typeOf$1 (value) {
    let retVal;
    if (typeof value === _undefined$1) {
        retVal = _Undefined$3;
    }
    else if (value === null) {
        retVal = _Null$3;
    }
    else {
        let constructorName = (value).constructor.name;
        retVal = constructorName === _Number$3 && isNaN(value) ?
            _NaN$1 : constructorName;
    }
    return retVal;
}

/**
 * Created by elydelacruz on 7/22/2017.
 */

/**
 * Functional, uncurried 'instanceof'.
 * @returns {Boolean}
 */

/**
 * Created by elydelacruz on 7/22/2017.
 */

const instanceOf$2 = curry(instanceOf$1);

/**
 * Created by elyde on 12/18/2016.
 * @module is
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
 */
let _String$1 = String.name;
let _Number$2 = Number.name;
let _Object$1 = Object.name;
let _Boolean$1 = Boolean.name;
let _Function$1 = Function.name;
let _Array$1 = Array.name;
let _Symbol$1 = 'Symbol';
let _Map$1 = 'Map';
let _Set$1 = 'Set';
let _WeakMap$1 = 'WeakMap';
let _WeakSet$1 = 'WeakSet';
let _Null$2 = 'Null';
let _Undefined$2 = 'Undefined';

const isFunction$1 = instanceOf$2(Function);
const isType$1 = curry((type, obj) => typeOf$1(obj) === (isFunction$1(type) ? type.name : type));
const isClass$1 = x => x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10));
const isCallable$1 = x => isFunction$1(x) && !isClass$1(x);
const isArray$1 = isType$1(Array);
const isObject$1 = isType$1(_Object$1);
const isBoolean$1 = isType$1(_Boolean$1);
const isNumber$1 = isType$1(_Number$2);
const isString$1 = isType$1(_String$1);
const isMap$1 = isType$1(_Map$1);
const isSet$1 = isType$1(_Set$1);
const isWeakMap$1 = isType$1(_WeakMap$1);
const isWeakSet$1 = isType$1(_WeakSet$1);
const isUndefined$1 = isType$1(_Undefined$2);
const isNull$1 = isType$1(_Null$2);
const isSymbol$1 = isType$1(_Symbol$1);
const isPromise$1 = isType$1('Promise');
const isUsableImmutablePrimitive$1 = x => {
        const typeOfX = typeOf$1(x);
        return [_String$1, _Number$2, _Boolean$1, _Symbol$1]
            .some(Type => Type === typeOfX);
    };
const isEmptyList$1 = x => length(x) === 0;
const isEmptyObject$1 = obj => isEmptyList$1(keys(obj));
const isEmptyCollection$1 = x => x.size === 0;
const isEmpty$2 = value => {
        let typeOfValue = typeOf$1(value),
            retVal;

        if (!value) { // '', 0, `null`, `undefined` or `false` then is empty
            retVal = true;
        }
        else if (typeOfValue === _Array$1 || typeOfValue === _Function$1) {
            retVal = isEmptyList$1(value);
        }
        else if (typeOfValue === _Number$2 && value !== 0) {
            retVal = false;
        }
        else if (typeOfValue === _Object$1) {
            retVal = isEmptyObject$1(value);
        }
        else if (hasOwnProperty$1('size', value)) {
            retVal = isEmptyCollection$1(value);
        }
        else {
            retVal = !value;
        }
        return retVal;
    };
const notEmptyAndOfType$1 = curry((type, value) => !isEmpty$2(value) && isType$1(type, value));
const isset$1 = x => !isNull$1(x) && !isUndefined$1(x);

/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf functionOps
 */
const apply$1 = curry(apply);

const of$1 = (x, ...args) => {
    if (!isset$1(x)) { return undefined; }
    const constructor = x.constructor;
    if (hasOwnProperty$1('of', constructor)) {
        return apply$1(constructor.of, args);
    }
    else if (isUsableImmutablePrimitive$1(x)) {
        return apply$1(constructor, args);
    }
    else if (isFunction$1(constructor)) {
        return new constructor(...args);
    }
    return undefined;
};

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
 * @function module:listOps.map
 * @param fn {Function} - Function to map on functor item(s).
 * @param xs {Array|String|*} - Functor.
 * @returns {Array|String|*} - Functor type that is passed in.
 */
const map$1 = (fn, xs) => {
    let ind = 0,
        limit = length(xs),
        out = of$1(xs),
        aggregate = aggregatorByType(xs);
    if (!limit) { return out; }
    for (; ind < limit; ind += 1) {
        out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
    }
    return out;
};

/**
 * Array operators module.
 * @module listOpsUtils
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
            alwaysFalse,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr);
const reduceRight$1 = (operation, agg, arr) =>
        reduceRightUntil(
            alwaysFalse,            // predicate
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

/**
 * 'Uncurried' list operators.
 * @module listOpsUncurried
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @todo code unperformant shorthand in `listOps`
 * @todo rename monoid functions to normal functions since we are not really defining methods for monoids here.
 */
// Exported internals
const append = concat$1;
const appendMany = (...args) => {
        if (length(args)) { return apply(concat$1, args); }
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
const isEmpty$1 = x => !length(x);
const concat$$1 = xs => {
        if (!length(xs)) { return copy(xs); }
        return isString(xs) ? xs : apply(appendMany, xs);
    };
const concatMap = (fn, foldableOfA) => concat$$1(map$1(fn, foldableOfA));
const reverse = x => {
        const aggregator = aggregatorByType(x);
        return reduceRight$1(
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
const intercalate = (xs, xss) => concat$$1(intersperse(xs, xss));
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
        return filter(x => length(x), outLists);
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
const permutations = xs => [xs];
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
const cycle = (limit, xs) => concat$$1(replicate(limit, xs));
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
const at = prop;
const find = findWhere;
const filter = (pred, xs) => {
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
        return [filter(pred, list), filter(negateP(pred), list)];
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
        const trimmedLists = apply(lengthsToSmallest, filter(length, lists)),
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
const product = arr => foldl((agg, x) => agg * x, 1, arr);
const maximum = list => maximumBy(genericAscOrdering, list);
const minimum = list => minimumBy(genericAscOrdering, list);
const maximumBy = (ordering, xs) => last(sortBy(ordering, xs));
const minimumBy = (ordering, xs) => head(sortBy(ordering, xs));
const nub = list => nubBy((a, b) => a === b, list);
const remove = (x, list) => removeBy((a, b) => a === b, x, list);
const sort = xs => sortBy(genericAscOrdering, xs);
const sortOn = (valueFn, xs) =>

        // Un-decorate
        map$1(decorated => decorated[1],

            // Decorate and sort
            sortBy(
                // Ordering
                (a1, b1) => {
                    let a = a1[0],
                        b = b1[0];
                    if (a > b) {
                        return 1;
                    }
                    else if (a < b) {
                        return -1;
                    }
                    return 0;
                },

                // Decorate
                map$1(item => [valueFn(item), item], xs)
            )
        );
const sortBy = (orderingFn, xs) => copy(xs).sort(orderingFn);
const insert = (x, xs) => {
        if (isEmpty$1(xs)) {
            return aggregatorByType(xs)(copy(xs), x, 0);
        }
        let out = of(xs),
            foundIndex = findIndex(item => x <= item, xs);
        return foundIndex === -1 ? append(sliceFrom(0, out), x) :
            concat$$1(intersperse([x], splitAt(foundIndex, xs)));
    };
const insertBy = (orderingFn, x, xs) => {
        const limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = of(xs);
        if (isEmpty$1(xs)) {
            return aggregator(out, x, 0);
        }
        let ind = 0;
        for (; ind < limit; ind += 1) {
            if (orderingFn(x, xs[ind]) <= 0) {
                const parts = splitAt(ind, xs);
                // Fold parts[0], [x], parts[1] into `out` and `concat`
                return concat$$1(foldl(aggregator, out, [parts[0], [x], parts[1]]));
            }
        }
        return aggregator(copy(xs), x);
    };
const nubBy = (pred, list) => {
        if (isEmpty$1(list)) {
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
            filter(elm => !includes(elm, arr1), arr2));
const intersect = (arr1, arr2) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            filter(elm => includes(elm, arr2), arr1);
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

const objUnion = (obj1, obj2) => assignDeep$1(obj1, obj2);
const objIntersect = (obj1, obj2) => foldl((agg, key) => {
        if (hasOwnProperty$1(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
const objDifference = (obj1, obj2) => foldl((agg, key) => {
        if (!hasOwnProperty$1(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
const objComplement = (obj0, ...objs) => foldl((agg, obj) =>
        assignDeep$1(agg, objDifference(obj, obj0)), {}, objs);

const instanceOf$$1 = curry(instanceOf$1);
const hasOwnProperty$$1 = curry(hasOwnProperty$1);
const assign$$1 = curry2(assign$1);
const assignDeep$$1 = curry2(assignDeep$1);

/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf functionOps
 */
const call$1 = curry2(call);

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
const append$1 = curry$1(append);
const appendMany$1 = curry2$1(appendMany);
const concatMap$1 = curry2$1(concatMap);
const map$2 = curry$1(map$1);
const intersperse$1 = curry$1(intersperse);
const intercalate$1 = curry$1(intercalate);
const foldl$1 = curry$1(foldl);
const foldr$1 = curry$1(foldr);
const foldl1$1 = curry$1(foldl1);
const foldr1$1 = curry$1(foldr1);
const mapAccumL$1 = curry$1(mapAccumL);
const mapAccumR$1 = curry$1(mapAccumR);
const iterate$1 = curry$1(iterate);
const repeat$1 = curry$1(repeat);
const replicate$1 = repeat$1;
const cycle$1 = curry$1(cycle);
const unfoldr$1 = curry$1(unfoldr);
const findIndex$1 = curry$1(findIndex);
const findIndices$1 = curry$1(findIndices);
const elemIndex$1 = curry$1(elemIndex);
const elemIndices$1 = curry$1(elemIndices);
const take$1 = curry$1(take);
const drop$1 = curry$1(drop);
const splitAt$1 = curry$1(splitAt);
const takeWhile$1 = curry$1(takeWhile);
const dropWhile$1 = curry$1(dropWhile);
const dropWhileEnd$1 = curry$1(dropWhileEnd);
const span$1 = curry$1(span);
const breakOnList$1 = curry$1(breakOnList);
const at$1 = curry$1(at);
const find$1 = curry$1(find);
const filter$2 = curry$1(filter);
const partition$1 = curry$1(partition);
const elem$1 = curry$1(elem);
const notElem$1 = curry2$1(notElem);
const lookup$1 = at$1;
const isPrefixOf$1 = curry$1(isPrefixOf);
const isSuffixOf$1 = curry$1(isSuffixOf);
const isInfixOf$1 = curry$1(isInfixOf);
const isSubsequenceOf$1 = curry$1(isSubsequenceOf);
const groupBy$1 = curry$1(groupBy);
const stripPrefix$1 = curry$1(stripPrefix);
const zip$1 = curry$1(zip);
const zipWith$1 = curry$1(zipWith);
const zipWithN$1 = curry2$1(zipWithN);
const zipWith3$1 = zipWithN$1;
const zipWith4$1 = zipWithN$1;
const zipWith5$1 = zipWithN$1;
const any$1 = curry$1(any);
const all$1 = curry$1(all);
const maximumBy$1 = curry$1(maximumBy);
const minimumBy$1 = curry$1(minimumBy);
const scanl$1 = () => null;
const scanl1$1 = () => null;
const scanr$1 = () => null;
const scanr1$1 = () => null;
const remove$1 = curry$1(remove);
const sortOn$1 = curry$1(sortOn);
const sortBy$1 = curry$1(sortBy);
const insert$1 = curry$1(insert);
const insertBy$1 = curry$1(insertBy);
const nubBy$1 = curry$1(nubBy);
const removeBy$1 = curry$1(removeBy);
const removeFirstsBy$1 = curry$1(removeFirstsBy);
const unionBy$1 = curry$1(unionBy);
const union$1 = curry$1(union);
const intersect$1 = curry$1(intersect);
const intersectBy$1 = curry$1(intersectBy);
const difference$1 = curry$1(difference);
const complement$1 = curry2$1(complement);

/**
 * @memberOf functionOps
 */
/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @function module:functionOps.compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */
const compose$1 = (...args) => arg0 => foldr$1((value, fn) => fn(value), arg0, args);

/**
 * @memberOf functionOps
 */

/**
 * Negates a predicate function.
 * @function module:functionOps.negateP
 * @param fn {Function}
 * @returns {Function} - Negated predicate
 */
const negateP$1 = fn => (x, ind, xs) => !fn(x, ind, xs);

/**
 * @memberOf functionOps
 */

/**
 * Returns passed in parameter.
 * @function module:functionOps.id
 * @param x {*}
 * @returns {*}
 */
const id$1 = x => x;

/**
 * @memberOf functionOps
 */
const flipN$1 = fn => curry3((...args) => apply$1(fn, reverse(args)));
const flip$1 = fn => curry((b, a) => call$1(fn, a, b));

/**
 * @memberOf functionOps
 */
const until$1 = curry((predicate, operation, typeInstance) => {
        let result = typeInstance;
        while (!predicate(result)) {
            result = operation(result);
        }
        return result;
    });

/**
 * Function operations: `
 * @module functionOps
 */

const negate = x => Math.abs(x) * -1;

/**
 * Created by elydelacruz on 9/6/2017.
 */

/**
 * Functional version of `String.prototype.split`.
 * @function module:stringOpsUnCurried.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
const split$1 = fPureTakesOne('split');

/**
 * Created by elydelacruz on 9/6/2017.
 * @module jsPlatform.stringOps
 */

/**
 * Functional version of `String.prototype.split`.
 * @curried
 * @function module:jsPlatform.stringOps.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
const split$$1 = curry(split$1);

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 */
const lines = split$$1(/[\n\r]/gm);
const words = split$$1(/[\s\t]/gm);
const unwords = intercalate$1(' ');
const unlines = intercalate$1('\n');

/**
 * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
 * Generated Thu Sep 28 2017 00:44:31 GMT-0400 (Eastern Daylight Time) 
 */

let version = '0.14.89';

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
 * @todo any cross importing between packages should be done from the package object (package file: E.g., './src/functionOps/functionOps.js').
 * @todo decide how to include 'uncurried' members in the main export of the library.
 * @module fjl
 */

export { version, instanceOf$$1 as instanceOf, hasOwnProperty$$1 as hasOwnProperty, assign$$1 as assign, assignDeep$$1 as assignDeep, length, toString, keys, typeOf, isFunction, isType, isClass, isCallable, isArray, isObject, isBoolean, isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined, isNull, isSymbol, isPromise, isUsableImmutablePrimitive, isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, notEmptyAndOfType, isset, of, objUnion, objIntersect, objDifference, objComplement, alwaysTrue, alwaysFalse, bAnd, bOr, bNot, bOtherwise, bEqual, isTruthy, isFalsy, call$1 as call, apply$1 as apply, compose$1 as compose, curry, curryN, curry2, curry3, curry4, curry5, __, curry_, curryN_, curry2_, curry3_, curry4_, curry5_, negateP$1 as negateP, id$1 as id, flip$1 as flip, flipN$1 as flipN, until$1 as until, append as _append, appendMany as _appendMany, all as _all, and as _and, or as _or, any as _any, find as _find, findIndex as _findIndex, findIndices as _findIndices, zip as _zip, zipN as _zipN, zipWith as _zipWith, unzip as _unzip, unzipN as _unzipN, map$1 as _map, mapAccumL as _mapAccumL, mapAccumR as _mapAccumR, elem as _elem, notElem as _notElem, elemIndex as _elemIndex, elemIndices as _elemIndices, lookup as _lookup, head as _head, last as _last, init as _init, tail as _tail, uncons as _uncons, length as _length, reverse as _reverse, intersperse as _intersperse, intercalate as _intercalate, transpose as _transpose, subsequences as _subsequences, permutations as _permutations, isEmpty$1 as _isEmpty, iterate as _iterate, repeat as _repeat, replicate as _replicate, cycle as _cycle, take as _take, drop as _drop, splitAt as _splitAt, foldl as _foldl, foldl1 as _foldl1, foldr as _foldr, foldr1 as _foldr1, unfoldr as _unfoldr, concat$$1 as _concat, concatMap as _concatMap, takeWhile as _takeWhile, dropWhile as _dropWhile, dropWhileEnd as _dropWhileEnd, partition as _partition, at as _at, span as _span, breakOnList as _breakOnList, stripPrefix as _stripPrefix, group as _group, inits as _inits, tails as _tails, isPrefixOf as _isPrefixOf, isSuffixOf as _isSuffixOf, isInfixOf as _isInfixOf, isSubsequenceOf as _isSubsequenceOf, filter as _filter, sum as _sum, product as _product, maximum as _maximum, maximumBy as _maximumBy, minimum as _minimum, minimumBy as _minimumBy, nub as _nub, remove as _remove, insert as _insert, insertBy as _insertBy, nubBy as _nubBy, removeBy as _removeBy, removeFirstsBy as _removeFirstsBy, unionBy as _unionBy, sort as _sort, sortOn as _sortOn, sortBy as _sortBy, complement as _complement, difference as _difference, union as _union, intersect as _intersect, intersectBy as _intersectBy, groupBy as _groupBy, append$1 as append, appendMany$1 as appendMany, concatMap$1 as concatMap, map$2 as map, intersperse$1 as intersperse, intercalate$1 as intercalate, foldl$1 as foldl, foldr$1 as foldr, foldl1$1 as foldl1, foldr1$1 as foldr1, mapAccumL$1 as mapAccumL, mapAccumR$1 as mapAccumR, iterate$1 as iterate, repeat$1 as repeat, replicate$1 as replicate, cycle$1 as cycle, unfoldr$1 as unfoldr, findIndex$1 as findIndex, findIndices$1 as findIndices, elemIndex$1 as elemIndex, elemIndices$1 as elemIndices, take$1 as take, drop$1 as drop, splitAt$1 as splitAt, takeWhile$1 as takeWhile, dropWhile$1 as dropWhile, dropWhileEnd$1 as dropWhileEnd, span$1 as span, breakOnList$1 as breakOnList, at$1 as at, find$1 as find, filter$2 as filter, partition$1 as partition, elem$1 as elem, notElem$1 as notElem, lookup$1 as lookup, isPrefixOf$1 as isPrefixOf, isSuffixOf$1 as isSuffixOf, isInfixOf$1 as isInfixOf, isSubsequenceOf$1 as isSubsequenceOf, groupBy$1 as groupBy, stripPrefix$1 as stripPrefix, zip$1 as zip, zipWith$1 as zipWith, zipWithN$1 as zipWithN, zipWith3$1 as zipWith3, zipWith4$1 as zipWith4, zipWith5$1 as zipWith5, any$1 as any, all$1 as all, maximumBy$1 as maximumBy, minimumBy$1 as minimumBy, scanl$1 as scanl, scanl1$1 as scanl1, scanr$1 as scanr, scanr1$1 as scanr1, remove$1 as remove, sortOn$1 as sortOn, sortBy$1 as sortBy, insert$1 as insert, insertBy$1 as insertBy, nubBy$1 as nubBy, removeBy$1 as removeBy, removeFirstsBy$1 as removeFirstsBy, unionBy$1 as unionBy, union$1 as union, intersect$1 as intersect, intersectBy$1 as intersectBy, difference$1 as difference, complement$1 as complement, and, or, zipN, unzip, unzipN, head, last, init, tail, uncons, concat$$1 as concat, reverse, transpose, subsequences, permutations, group, inits, tails, sum, product, maximum, minimum, sort, nub, negate, lines, words, unwords, unlines };
