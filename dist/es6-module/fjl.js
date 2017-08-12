/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @file fjl-curry/src/curry.js
 * @module curry {{curry: Function, curryN: Function, curry2: Function, curry3: Function, curry4: Function, curry5: Function, curry_: Function, curryN_: Function, curry2_: Function, curry3_: Function, curry4_: Function, curry5_: Function}}
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
 * Curries a functionOps based on it's defined arity (argument's arrayOps expected length).
 * @functionOps curry
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
 * @functionOps isPlaceHolder
 * @param instance {*}
 * @returns {boolean}
 */
function isPlaceHolder (instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `listOps`.
 * @functionOps replacePlaceHolder
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `listOps` with placeholders replaced by values in `args`.
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
 * @functionOps curry_
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
 * @functionOps curryN_
 * @param fn {Function}
 * @param executeArity {Number}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in functionOps wrapped in a functionOps for currying.
 */
function curryN_ (fn, executeArity, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = (concatedArgs.length - placeHolders.length >= executeArity) || !executeArity;
        return !canBeCalled ? curryN_.apply(null, [fn, executeArity].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Curries a functionOps up to a given arity.
 * @functionOps curryN
 * @param fn {Function}
 * @param executeArity {Number}
 * @param curriedArgs {...*}
 * @returns {Function}
 */
function curryN (fn, executeArity, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = curriedArgs.concat(args),
            canBeCalled = (concatedArgs.length >= executeArity) || !executeArity;
        return !canBeCalled ? curryN.apply(null, [fn, executeArity].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @type {PlaceHolder}
 */
let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
let curry2_ = fn => curryN_(fn, 2);
let curry3_ = fn => curryN_(fn, 3);
let curry4_ = fn => curryN_(fn, 4);
let curry5_ = fn => curryN_(fn, 5);
let curry2 = fn => curryN(fn, 2);
let curry3 = fn => curryN(fn, 3);
let curry4 = fn => curryN(fn, 4);
let curry5 = fn => curryN(fn, 5);

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
 * @functionOps module:fjl.typeOf
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
 * Created by elydelacruz on 7/22/2017.
 */

const instanceOf = curry((instanceConstructor, instance) =>
        instance instanceof instanceConstructor);

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

const isFunction = instanceOf(Function);
const isType = curry((type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type));
const isClass = x => x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10));
const isCallable = x => isFunction(x) && !isClass(x);
const isArray = isType(Array);
const isObject = isType(_Object);
const isBoolean = isType(_Boolean);
const isNumber = isType(_Number);
const isString = isType(_String);
const isMap = isType(_Map);
const isSet = isType(_Set);
const isWeakMap = isType(_WeakMap);
const isWeakSet = isType(_WeakSet);
const isUndefined = isType(_Undefined);
const isNull = isType(_Null);
const isSymbol = isType(_Symbol);
const isPromise = isType('Promise');
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
        else if (hasOwnProperty('size', value)) {
            retVal = isEmptyCollection(value);
        }
        else {
            retVal = !value;
        }
        return retVal;
    };
const notEmptyAndOfType = curry((type, value) => !isEmpty(value) && isType(type, value));
const isset = x => !isNull(x) && !isUndefined(x);

/**
 * Created by elydelacruz on 7/22/2017.
 */

const fPureTakesOne = name => curry((arg, f) => f[name](arg));
const fPureTakes2 = name => curry((arg1, arg2, f) => f[name](arg1, arg2));
const fPureTakesOneOrMore = name => curry2((f, ...args) => f[name](...args));

/**
 *
 */

const prop = curry((name, obj) => obj[name]);

/**
 * Created by elydelacruz on 7/22/2017.
 */
/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

const hasOwnProperty = fPureTakesOne('hasOwnProperty');
const length = prop('length');
const keys = obj => Object.keys(obj);
const assign = curry2((function defineAssign () {
        if (Object.assign) {
            return (obj0, ...objs) => Object.assign(obj0, ...objs);
        }
        return (obj0, ...objs) => objs.reduce((topAgg, obj) => {
            return keys(obj).reduce((agg, key) => {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    }()));
const assignDeep = curry2((obj0, ...objs) =>
        objs.reduce((topAgg, obj) => {
            return keys(obj).reduce((agg, key) => {
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
                else {
                    agg[key] = obj[key];
                }
                return agg;
            }, topAgg);
        }, obj0));

/**
 * Created by elydelacruz on 7/22/2017.
 */
const apply = curry((fn, args) => fn.apply(null, args));

const of = (x, ...args) => {
    const constructor = x.constructor,
        typeOfX = typeOf(x);
    if (hasOwnProperty('of', constructor)) {
        return apply(constructor.of, args);
    }
    else if (isUsableImmutablePrimitive(typeOfX)) {
        return apply(constructor, args);
    }
    else if (isFunction(constructor)) {
        return new constructor(...args);
    }
    return undefined;
};

/**
 * Created by elyde on 7/20/2017.
 * All functions here are functional versions of methods of types;  E.g., map, filter etc.
 * @todo add `reverse` to './compounded'
 */

/**
 * Array.prototype.reverse generator (generates a functionOps that calls the prototype version or a
 * shimmed version if it doesn't exist).
 * @returns {Function}
 */
function defineReverse () {
    return Array.prototype.reverse ? x => x.reverse() :
        x => x.reduceRight((agg, item) => {
            agg.push(item);
            return agg;
        }, []);
}

const reduce = fPureTakes2('reduce');
const reduceRight = fPureTakes2('reduceRight');
const concat = fPureTakesOneOrMore('concat');
const join = fPureTakesOne('join');
const slice = fPureTakes2('slice');
const reverse = defineReverse();

const objUnion = curry((obj1, obj2) => assignDeep(obj1, obj2));
const objIntersect = curry((obj1, obj2) => reduce((agg, key) => {
        if (hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1)));
const objDifference = curry((obj1, obj2) => reduce((agg, key) => {
        if (!hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1)));
const objComplement = curry2((obj0, ...objs) => reduce((agg, obj) =>
        assignDeep(agg, objDifference(obj, obj0)), {}, objs));

const isTruthy = value => !!value;
const isFalsy = value => !value;

/**
 * Created by elyde on 7/15/2017.
 * @module booleanOps
 */

const and = curry2((a, b) => a && b);
const or = curry2((a, b) => a || b);
const not = x => !x;
const otherwise = () => true;
const equal = curry2((a, b) => a === b);

/**
 * Created by elydelacruz on 7/22/2017.
 */
const call = curry2((fn, ...args) => fn.call(null, ...args));

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @functionOps module:fjl.compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */
const compose = (...args) => arg0 => reduceRight((value, fn) => fn(value), arg0, args);

/**
 * @module negate
 */

/**
 * Negates a predicate function.
 * @function module:functionOps.negateP
 * @param fn {Function}
 * @returns {Function} - Negated predicate
 */
const negateP = fn => (x, ind, xs) => !fn(x, ind, xs);

/**
 * @module id
 */

/**
 * Returns passed in parameter.
 * @param x {*}
 * @returns {*}
 */
const id = x => x;

const flipN = fn => curry3((...args) => apply(fn, reverse(args)));
const flip = fn => curry((b, a) => call(fn, a, b));

const until = curry((predicate, operation, typeInstance) => {
        let result = typeInstance;
        while (!predicate(result)) {
            result = operation(result);
        }
        return result;
    });

/**
 * Function operations: `
 * @module function
 */

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 */

const split = curry((separator, str) => {
        return str ? str.split(separator) : [];
    });
const lines = split(/[\n\r]/gm);
const words = split(/[\s\t]/gm);
const unwords = join('\s');
const unlines = join('\n');

const negate = x => x * -1;

/**
 * Array operators module.
 * @module arrayOps
 */


// import {log}                            from '../../tests/for-server/helpers';
const ASC = 1;
const DESC = -1;
const sliceToEndFrom = curry((startInd, arr) => slice(startInd, length(arr), arr));
const sliceFromZero = sliceToEndFrom(0);
const onlyOneOrNegOne = x => x === 1 || x === -1 ? x : 1;
const getSortByOrder = curry((multiplier, valueFn) => {
        valueFn = valueFn || (v => v);
        const x = onlyOneOrNegOne(multiplier),
            ifGreaterThan = 1 * x,
            ifLessThan = -1 * x;
        return (...values) => values.sort((a1, b1) => {
            let a = valueFn(a1),
                b = valueFn(b1);
            if (a > b) {
                return ifGreaterThan;
            }
            else if (b > a) {
                return ifLessThan;
            }
            return 0;
        });
    });
const sortDesc = getSortByOrder(DESC);
const sortAsc = getSortByOrder(ASC);
const sortDescByLength = getSortByOrder(DESC, x => length(x));
const lengths = curry2((...arrs) => length(arrs) ? arrs.map(length) : []);
const getOrderedLengths = curry2((orderDir, ...arrs) => (orderDir ? sortAsc : sortDesc)(lengths(arrs)));
const trimLengths = (...arrays) => {
        const smallLen = getOrderedLengths(ASC, arrays)[0];
        return arrays.map(arr => length(arr) > smallLen ? slice(0, smallLen, arr) : sliceFromZero(arr));
    };
const aggregateStr = (agg, item) => {
        agg += item;
        return agg;
    };
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
const reduceUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (limit === 0) {
            return agg;
        }
        let ind = 0,
            result = agg,
            keys$$1 = keys(arr),
            key;
        for (; ind < limit; ind++) {
            key = keys$$1[ind];
            if (pred(arr[key], key, arr)) { break; }
            result = op(result, arr[key], key, arr);
        }
        return result;
    };
const reduceRightUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (limit === 0) {
            return agg;
        }
        let ind = limit - 1,
            result = agg,
            keys$$1 = keys(arr),
            key;
        for (; ind >= 0; ind--) {
            key = keys$$1[ind];
            if (pred(arr[key], key, arr)) { break; }
            result = op(result, arr[key], key, arr);
        }
        return result;
    };
const reduce$1 = curry((operation, agg, arr) =>
        reduceUntil(
            () => false,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr));
const reduceRight$1 = curry((operation, agg, arr) =>
        reduceRightUntil(
            () => false,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr));
const strConcat = (x, ...args) => reduce$1(aggregateStr, x, args);
const indexOf = fPureTakesOne('indexOf');
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
const findWhere = curry((pred, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return; }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) { return elm; }
        }
    });

const append = curry((xs1, xs2) => (isArray(xs1) ? concat : strConcat)(xs1, xs2));
const appendMany = curry2((x, ...args) => (isArray(x) ? concat : strConcat)(x, ...args));
const head = x => x[0];
const last = functor => functor[lastIndex(functor)];
const tail = functor => sliceToEndFrom(1, functor);
const init = functor => slice(0, lastIndex(functor), functor);
const uncons = x => {
        const len = length(x);
        if (len === 0) {
            return undefined;
        }
        return [head(x), tail(x)];
    };
const map$1 = curry ((fn, xs) => {
        let ind = -1,
            limit = length(xs),
            out = (xs).constructor(),
            aggregate = aggregatorByType(xs);
        while (++ind < limit) {
            out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
        }
        return out;
    });
const concat$1 = foldableOfA => appendMany(...foldableOfA);
const concatMap = curry((fn, foldableOfA) => concat$1(map$1(fn, foldableOfA)));
const reverse$1 = x => reduceRight$1((agg, item) => {
        agg.push(item);
        return agg;
    }, x.constructor(), x);
const intersperse = curry((between, arr) => {
        const limit = length(arr) - 1,
            aggregator = (arr).constructor(),
            aggregatorOp = aggregatorByType(arr);
        return reduce$1((agg, item, ind) => {
            if (ind === limit) {
                return aggregatorOp(agg, item);
            }
            return aggregatorOp(
                aggregatorOp(agg, item),
                between
            );
        }, aggregator, arr);
    });
const intercalate = curry((xs, xss) => concat$1(intersperse(xs, xss)));
const transpose = xss => {
        const orderedLengths = getOrderedLengths(DESC, ...xss),
            out = new Array(orderedLengths[0]);
        return reduce$1((agg, item) =>
            reduce$1((agg2, element, ind2) => {
                agg2[ind2].push(element);
                return agg2;
            }, agg, item), out.map(_ => []), xss);
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
const foldl1 = curry((op, xs) => {
        const arr = sliceToEndFrom(0, xs);
        return reduce$1 (op, arr.shift(), arr);
    });
const foldr1 = curry((op, xs) => {
        const arr = sliceToEndFrom(0, xs);
        return reduceRight$1 (op, arr.pop(), arr);
    });
const mapAccumL = curry((op, zero, xs) => {
        const list = sliceToEndFrom(0, xs),
            limit = length(xs);
        if (!limit) { return [zero, list]; }
        let ind = 0,
            agg = zero,
            mapped = xs.constructor(),
            tuple;
        for (; ind < limit; ind++) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    });
const mapAccumR = curry((op, zero, xs) => {
        const list = sliceToEndFrom(0, xs),
            limit = length(xs);
        if (!limit) { return [zero, list]; }
        let ind = limit - 1,
            agg = zero,
            mapped = xs.constructor(),
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    });
const unfoldr = curry((op, x, zero) => {
        let ind = 0,
            out = !isset(zero) ? [] : zero,
            aggregator = aggregatorByType(out),
            resultTuple = op(x, ind, out);
        while (isset(resultTuple[1])) {
            out = aggregator(out, resultTuple[0], ind);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    });
const findIndex = findIndexWhere;
const findIndicesWhere = curry((pred, xs) => {
        const limit = length(xs);
        if (!limit) { return undefined; }
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out;
    });
const findIndices =  findIndicesWhere;
const elemIndex = curry((x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    });
const elemIndices = curry((value, xs) => findIndices(x => x === value, xs));
const take = curry((limit, array) => slice(0, limit, array));
const drop = curry((count, array) => sliceToEndFrom(count, array));
const splitAt = curry((ind, arr) => [
        slice(0, ind, arr),
        sliceToEndFrom(ind, arr)
    ]);
const takeWhile = curry((pred, arr) => {
        let zero =  (arr).constructor();
        const operation = aggregatorByType(arr);
        return reduceUntil (
            negateP(pred),  // predicate
            operation,      // operation
            zero,           // aggregator
            arr
        );
    });
const dropWhile = curry((pred, arr) => {
        const limit = length(arr),
            splitPoint =
                findIndexWhere((item, ind, arr2) =>
                    !pred(arr[ind], ind, arr2), arr);

        return splitPoint === -1 ?
            slice(0, limit, arr) :
            slice(splitPoint, limit, arr);
    });
const span = curry((pred, arr) => {
        const splitPoint = findIndexWhere(negateP(pred), arr);
        return splitPoint === -1 ?
            splitAt(0, arr) : splitAt(splitPoint, arr);
    });
const breakOnList = curry((pred, arr) => {
        const splitPoint = findIndexWhere(pred, arr);
        return splitPoint === -1 ?
            splitAt(0, arr) : splitAt(splitPoint, arr);
    });
const at = prop;
const find = findWhere;
const filter$1 = curry ((pred, xs) => {
        let ind = 0,
            limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = (xs).constructor();
        if (!limit) { return out; }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out = aggregator(out, xs[ind]);
            }
        }
        return out;
    });
const partition = curry((pred, arr) => {
        const limit = length(arr),
            receivedString = isString(arr),
            zero = receivedString ? '' : [];
        if (!limit) { return [zero, zero]; }
        return [filter$1(pred, arr), filter$1(negateP(pred), arr)];
    });
const elem = curry((elm, xs) => indexOf(elm, xs) !== -1);
const notElem = curry((elm, xs) => indexOf(elm, xs) === -1);
const lookup = curry((key, xs) => hasOwnProperty(key, xs) ? xs[key] : undefined);
const isPrefixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = 0;
        for (; ind < limit1; ind++) {
            if (xs1[ind] !== xs2[ind]) { return false; }
        }
        return true;
    });
const isSuffixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = limit2 - 1;
        for (; ind >= 0; ind--) {
            if (xs1[ind] !== xs2[ind]) { return false; }
        }
        return true;
    });
const isInfixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = limit2 - 1;
        for (; ind >= 0; ind--) {
            if (xs1[ind] !== xs2[ind]) { return false; }
        }
        return true;
    });
const group = xs => [xs];
const inits = xs => [xs];
const tails = xs => [xs];
const stripPrefix = curry((prefix, arr) =>
        isPrefixOf(prefix, arr) ? splitAt(prefix.length, arr)[1] : sliceToEndFrom(0, arr));
const flatten = arr => reduce$1((agg, elm) => {
        if (isArray(elm)) {
            return append(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, [], arr);
const flattenMulti = curry2((arr0, ...arrays) =>
        reduce$1((agg, arr) => append(agg, flatten(arr)), flatten(arr0), arrays));
const zip = curry((arr1, arr2) => {
        const {0: a1, 1: a2} = trimLengths(arr1, arr2);
        return reduce$1((agg, item, ind) => {
                agg.push([item, a2[ind]]);
            return agg;
        }, [], a1);
    });
const zipN = curry2((...arrs) => {
        const lists = apply(trimLengths, arrs);
        return reduce$1((agg, arr, ind) => {
            if (!ind) {
                return zip (agg, arr);
            }
            return agg.map (arr2 => {
                arr.forEach (elm => {
                    arr2.push(elm);
                });
                return arr2;
            });
        }, lists.shift(), lists);
    });
const zipWith = curry((combinator, xs1, xs2) => []);
const unzip = arr =>
        reduce$1((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr);
const unzipN = (...arrs) =>
        reduce$1((agg, item) => {
            agg.push(unzip(item));
            return agg;
        }, [], arrs);
const any = curry((p, xs) => reduceUntil(p, (_ => true), false, xs));
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
const and$1 = all(isTruthy);
const or$1 = any(isTruthy);
const not$1 = all(isFalsy);
const equal$1 = curry2((arg0, ...args) => all(x => arg0 === x, args));
const sum = arr => {
        const parts = uncons(arr);
        return reduce$1((agg, x) => agg + x, parts[0], parts[1]);
    };
const product = arr => {
        const parts = uncons(arr);
        return reduce$1((agg, x) => agg * x, parts[0], parts[1]);
    };
const maximum = arr => apply(Math.max, arr);
const minimum = arr => apply(Math.min, arr);
const arrayUnion = curry((arr1, arr2) =>
        append(arr1, filter$1(elm => indexOf(elm, arr1) === -1, arr2)));
const arrayIntersect = curry((arr1, arr2) => length(arr2) === 0 ? [] :
            filter$1(elm => indexOf(elm, arr2) > -1, arr1));
const arrayDifference = curry((array1, array2) => { // augment this with max length and min length ordering on op
        let [arr1, arr2] = sortDescByLength(array1, array2);
        if (!arr2 || length(arr2) === 0) {
            return slice(0, length(arr1), arr1);
        }
        return reduce$1((agg, elm) => {
            if (indexOf(elm, arr2) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    });
const arrayComplement = curry2((arr0, ...arrays) =>
        reduce$1((agg, arr) => append(agg, arrayDifference(arr0, arr)), [], arrays));

const complement = curry((functor, ...others) => {
        switch (typeOf(functor)) {
            case 'Array':
                return arrayComplement(functor, ...others);
            default:
                return objComplement(functor, ...others);
        }
    });
const difference = curry((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayDifference(functor1, functor2);
            default:
                return objDifference(functor1, functor2);
        }
    });
const union = curry((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayUnion(functor1, functor2);
            default:
                return objUnion(functor1, functor2);
        }
    });
const intersect = curry((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayIntersect(functor1, functor2);
            default:
                return objIntersect(functor1, functor2);
        }
    });

/**
 * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
 * Generated Sat Aug 12 2017 19:55:29 GMT-0400 (Eastern Daylight Time) 
 */

let version = '0.14.0';

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

export { version, hasOwnProperty, length, keys, assign, assignDeep, instanceOf, typeOf, isFunction, isType, isClass, isCallable, isArray, isObject, isBoolean, isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined, isNull, isSymbol, isPromise, isUsableImmutablePrimitive, isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, notEmptyAndOfType, isset, of, objUnion, objIntersect, objDifference, objComplement, and, or, not, otherwise, equal, isTruthy, isFalsy, call, apply, compose, curry, curryN, curry2, curry3, curry4, curry5, __, curry_, curryN_, curry2_, curry3_, curry4_, curry5_, negateP, id, flip, flipN, until, split, lines, words, unwords, unlines, negate, complement, difference, union, intersect };
