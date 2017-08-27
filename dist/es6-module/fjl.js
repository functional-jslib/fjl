import { expect } from 'chai';

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
 * @functionOps curryN
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

/**
 * Place holder object (frozen) used by curry.
 * @type {PlaceHolder}
 */
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
 * Created by elydelacruz on 7/22/2017.
 */
/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

const hasOwnProperty = fPureTakesOne('hasOwnProperty');
const length = x => x.length;
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
const compose = (...args) => arg0 => foldr((value, fn) => fn(value), arg0, args);

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

const isTruthy = value => !!value;
const isFalsy = value => !value;

/**
 *
 */

const prop = curry((name, obj) => obj[name]);

/**
 * Created by elyde on 12/10/2016.
 */
// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

let expectInstanceOf = curry2_((value, instance) => expect(value).to.be.instanceOf(instance));
let expectFunction = value => expectInstanceOf(value, Function);
let expectEqual = curry2_((value, value2) => expect(value).to.be.equal(value2));
let expectFalse = value => expectEqual(value, false);
let expectTrue = value => expectEqual(value, true);
let expectLength = curry2_((len, element) => compose(expectEqual(len), length$1)(element));
let hasOwnProperty$1 = (instance, key) => Object.prototype.hasOwnProperty.call(instance, key);
let length$1 = something => something.length;
let add = curry2_((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    });
let multiply = curry2_((...args) => {
        return args.reduce((agg, num) => num * agg, 1);
    });
let divide = curry2_((...args) => {
        return args.reduce((agg, num) => agg / num, args.shift());
    });
let subtract = curry2_((arg0, ...args) => {
        return args.reduce((agg, num) => agg - num, arg0);
    });
let shallowCompareOnLeft = curry2_((incoming, against) => Array.isArray(incoming) ?
        shallowCompareArraysLeft(incoming, against) :
            shallowCompareObjectsLeft(incoming, against) );
let shallowCompareArraysLeft = curry2_((incoming, against) => !incoming.some((_, ind) => against[ind] !== incoming[ind]));
let shallowCompareObjectsLeft = curry2_((incoming, against, keys) => !(keys || Object.keys(incoming))
        .some(key => against[key] !== incoming[key]) );
let deepCompareLeft = (incoming, against) => {
        return Object.keys(incoming).some(key => {
            const typeOfValue = typeof incoming[key];
            return !(
                typeOfValue !== 'string' ||
                typeOfValue !== 'object' ||
                typeOfValue !== 'Array' ?
                    against[key] === incoming[key] :
                        deepCompareLeft(incoming[key], against[key])
            );
        });
    };
let expectShallowEquals = curry2_((a, b) => expectTrue(shallowCompareOnLeft(a, b)));
let expectDeepEquals = curry2_((a, b) => expectTrue(deepCompareLeft(a, b)));
let range = curry2_((from, to, step = 1) => {
        let inc = from;
        const out = [];
        for (; inc <= to; inc += step) { out.push(inc); }
        return out;
    });
let log = console.log.bind(console);
let alphabetCharCodeRange = range('a'.charCodeAt(0), 'z'.charCodeAt(0));
let alphabetArray = alphabetCharCodeRange
        .map(charCode => String.fromCharCode(charCode));
let alphabetString = alphabetArray.join('');

/**
 * Array operators module.
 * @module arrayOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @todo code unperformant shorthand in `listOps`
 */
const ASC = 1;
const DESC = -1;
const alwaysFalse = () => false;
const slice = fPureTakes2('slice');
const sliceToEndFrom = (startInd, arr) => slice(startInd, length(arr), arr);
const sliceFromZero = x => sliceToEndFrom(0, x);
const onlyOneOrNegOne = x => x === 1 || x === -1 ? x : 1;
const getSortByOrder = (multiplier, valueFn) => {
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
    };
const sortDescByLength = getSortByOrder(DESC, length);
const lengths = (...lists) => length(lists) ? map(length, lists) : [];
const lengthsToSmallest = (...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = minimum(listLengths);
        return map((list, ind) => listLengths[ind] > smallLen ?
            slice(0, smallLen, list) : sliceFromZero(list), lists);
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
const reduce = (operation, agg, arr) =>
        reduceUntil(
            alwaysFalse,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr);
const reduceRight = (operation, agg, arr) =>
        reduceRightUntil(
            alwaysFalse,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr);
const arrayAppend = fPureTakesOneOrMore('concat');
const strAppend = (arg0, ...args) => reduce(aggregateStr, arg0, args);
const indexOf = fPureTakesOne('indexOf');
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
const append = (xs1, xs2) => (isArray(xs1) ? arrayAppend : strAppend)(xs1, xs2);
const appendMany = (x, ...args) => (isArray(x) ? arrayAppend : strAppend)(x, ...args);

const mempty = x => {
        if (!isset(x)) { return []; }
        else if (x.mempty) { return x.mempty(); }
        return  of(x);
    };
const mappend = curry(append);
const mappendMany = curry(appendMany);
const head = x => x[0];
const last = xs => xs[lastIndex(xs)];
const tail = xs => sliceToEndFrom(1, xs);
const init = xs => slice(0, lastIndex(xs), xs);
const uncons = xs => {
        if (!xs) { return; } //
        const len = length(xs);
        if (len === 0) { return undefined; }
        return [head(xs), tail(xs)];
    };
const unconsr = xs => {
        if (!xs) { return; } //
        const len = length(xs);
        if (len === 0) { return undefined; }
        return [init(xs), last(xs)];
    };
const isEmpty$1 = x => !length(x);
const map = curry ((fn, xs) => {
        let ind = 0,
            limit = length(xs),
            out = mempty(xs),
            aggregate = aggregatorByType(xs);
        for (; ind < limit; ind += 1) {
            out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
        }
        return out;
    });
const concat = xs => mappendMany(...xs);
const concatMap = curry((fn, foldableOfA) => concat(map(fn, foldableOfA)));
const reverse = x => {
        const aggregator = aggregatorByType(x);
        return reduceRight(
                (agg, item, ind) => aggregator(agg, item, ind),
                mempty(x), x
            );
    };
const intersperse = curry((between, arr) => {
        const limit = length(arr),
            lastInd = limit - 1,
            aggregator = mempty(arr),
            aggregatorOp = aggregatorByType(arr);
        if (!limit) { return aggregator; }
        return reduce((agg, item, ind) => {
            return ind === lastInd ?
                aggregatorOp(agg, item) :
                aggregatorOp(
                    aggregatorOp(agg, item),
                    between
                );
        }, aggregator, arr);
    });
const intercalate = curry((xs, xss) => {
        const result = intersperse(xs, xss);
        return isString(result) ? result : concat(result);
    });
const transpose = xss => {
        const numLists = length(xss);
        if (!numLists) { return mempty(xss); }
        const listLengths = apply(lengths, xss),
            longestListLen = maximum(listLengths),
            outLists = [];
        let ind = 0, ind2;
        for (; ind < longestListLen; ind += 1) {
            const outList = [];
            for (ind2 = 0; ind2 < numLists; ind2 += 1) {
                if (listLengths[ind2] < ind + 1) { continue; }
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
const foldl = curry(reduce);
const foldr = curry(reduceRight);
const foldl1 = curry((op, xs) => {
        const parts = uncons(xs);
        if (!parts) { return of (xs); }
        return reduce (op, parts[0], parts[1]);
    });
const foldr1 = curry((op, xs) => {
        const parts = unconsr(xs);
        if (!parts) { return of (xs); }
        return reduceRight (op, parts[1], parts[0]);
    });
const mapAccumL = curry((op, zero, xs) => {
        const list = sliceToEndFrom(0, xs),
            limit = length(xs);
        if (!limit) { return [zero, list]; }
        let ind = 0,
            agg = zero,
            mapped = mempty(xs),
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
            mapped = mempty(xs),
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    });
const unfoldr = curry2((op, x) => {
        let ind = 0,
            out = [],
            resultTuple = op(x, ind, out);
        while (resultTuple) {
            out.push(resultTuple[0]);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    });
const findIndex = curry(findIndexWhere);
const findIndices =  curry(findIndicesWhere);
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
        let zero =  mempty(arr);
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
const dropWhileEnd = curry((pred, arr) => {
        const limit = length(arr),
            splitPoint =
                findIndexWhereRight((item, ind, arr2) =>
                    !pred(arr[ind], ind, arr2), arr);

        return splitPoint === -1 ?
            slice(0, limit, arr) :
            slice(0, splitPoint + 1, arr);
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
const find = curry(findWhere);
const filter = curry((pred, xs) => {
        let ind = 0,
            limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = mempty(xs);
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
        return [filter(pred, arr), filter(negateP(pred), arr)];
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
        let ind1 = limit1 - 1,
            ind2 = limit2 - 1;
        for (; ind1 >= 0; ind1--) {
            if (xs1[ind1] !== xs2[ind2]) { return false; }
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
                if (xs2[ind1 + ind] === xs1[ind1]) { foundLen += 1; }
                if (foundLen === limit1) { return true; }
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
                if (i & (1 << j) && indexOf(xs2[j], xs1) > -1) { foundLen += 1; }
                if (foundLen === lenXs1) { return true; }
            }
        }
        return false;
    });
const group = xs => {
        const limit = length(xs);
        if (!limit) { return sliceToEndFrom(0, xs); }
        let ind = 0,
            prevItem,
            item,
            agg = [];
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(
                takeWhile (x => {
                        if (x === prevItem) { ind++; }
                        if (x === item) { prevItem = x; return true; }
                        return false;
                    },
                    slice(ind, limit, xs)
                )
            );
        }
        return agg;
    };
const inits = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) { return []; }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(0, ind, xs));
        }
        return agg;
    };
const tails = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) { return []; }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(ind, limit, xs));
        }
        return agg;
    };
const stripPrefix = curry((prefix, list) =>
        isPrefixOf(prefix, list) ?
            splitAt(prefix.length, list)[1] :
                sliceToEndFrom(0, list));
const flatten = arr => reduce((agg, elm) => {
        if (isArray(elm)) {
            return mappend(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, [], arr);
const flattenMulti = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => mappend(agg, flatten(arr)), flatten(arr0), arrays));
const zip = curry((arr1, arr2) => {
        if (!length(arr1) || !length(arr2)) { return mempty(arr1); }
        const [a1, a2] = lengthsToSmallest(arr1, arr2);
        return reduce((agg, item, ind) =>
                aggregateArr(agg, [item, a2[ind]]),
            [], a1);
    });
const zipN = (...lists) => {
        const trimmedLists = apply(lengthsToSmallest, filter(length, lists)),
        lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) { return []; }
        else if (lenOfTrimmed === 1) {
            return slice(0, length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind, list) =>
                aggregateArr(agg, map(xs => xs[ind], trimmedLists)),
            [], trimmedLists[0]);
    };
const zip3 = curry3(zipN);
const zip4 = curry4(zipN);
const zip5 = curry5(zipN);
const zipWith = curry((op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) { return mempty(xs1); }
        const [a1, a2] = lengthsToSmallest(xs1, xs2);
        return reduce((agg, item, ind) =>
                aggregateArr(agg, op(item, a2[ind])),
            [], a1);
    });
const zipWithN = (op, ...lists) => {
        const trimmedLists = apply(lengthsToSmallest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) { return []; }
        else if (lenOfTrimmed === 1) {
            return slice(0, length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind, list) =>
                aggregateArr(agg, apply(op, map(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    };
const zipWith3 = curry4(zipWithN);
const zipWith4 = curry5(zipWithN);
const zipWith5 = curryN(5, zipWithN);
const unzip = arr =>
        reduce((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr);
const unzipN = (...lists) =>
        reduce((agg, item) => {
            agg.push(unzip(item));
            return agg;
        }, [], lists);
const any = curry((p, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return false; }
        for (; ind < limit; ind += 1) {
            if (p(xs[ind])) { return true; }
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
const and = all(isTruthy);
const or = any(isTruthy);
const not = all(isFalsy);
const sum = list => reduce((agg, x) => agg + x, 0, list);
const product = arr => reduce((agg, x) => agg * x, 1, arr);
const maximum = arr => apply(Math.max, arr);
const minimum = arr => apply(Math.min, arr);
const arrayUnion = curry((arr1, arr2) =>
        mappend(arr1, filter(elm => indexOf(elm, arr1) === -1, arr2)));
const arrayIntersect = curry((arr1, arr2) => length(arr2) === 0 ? [] :
            filter(elm => indexOf(elm, arr2) > -1, arr1));
const arrayDifference = curry((array1, array2) => { // augment this with max length and min length ordering on op
        let [arr1, arr2] = sortDescByLength(array1, array2);
        if (!arr2 || length(arr2) === 0) {
            return slice(0, length(arr1), arr1);
        }
        return reduce((agg, elm) => {
            if (indexOf(elm, arr2) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    });
const arrayComplement = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => mappend(agg, arrayDifference(arr0, arr)), [], arrays));

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
const objComplement = curry2((obj0, ...objs) => foldl((agg, obj) =>
        assignDeep(agg, objDifference(obj, obj0)), {}, objs));

/**
 * Created by elyde on 7/15/2017.
 * @module booleanOps
 */

const bAnd = curry2((a, b) => a && b);
const bOr = curry2((a, b) => a || b);
const bNot = x => !x;
const bOtherwise = () => true;
const bEqual = curry2((a, b) => a === b);

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
const unwords = intercalate('\s');
const unlines = intercalate('\n');

const negate = x => x * -1;

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
 * Generated Sun Aug 27 2017 19:08:34 GMT-0400 (Eastern Daylight Time) 
 */

let version = '0.14.34';

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

export { version, hasOwnProperty, length, keys, assign, assignDeep, instanceOf, typeOf, isFunction, isType, isClass, isCallable, isArray, isObject, isBoolean, isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined, isNull, isSymbol, isPromise, isUsableImmutablePrimitive, isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, notEmptyAndOfType, isset, of, objUnion, objIntersect, objDifference, objComplement, bAnd, bOr, bNot, bOtherwise, bEqual, isTruthy, isFalsy, call, apply, compose, curry, curryN, curry2, curry3, curry4, curry5, __, curry_, curryN_, curry2_, curry3_, curry4_, curry5_, negateP, id, flip, flipN, until, mempty, mappend, mappendMany, head, last, tail, init, uncons, unconsr, map, concat, concatMap, reverse, intersperse, intercalate, transpose, subsequences, permutations, foldl, foldr, foldl1, foldr1, mapAccumL, mapAccumR, unfoldr, findIndex, findIndices, elemIndex, elemIndices, take, drop, splitAt, takeWhile, dropWhile, dropWhileEnd, span, breakOnList, at, find, filter, partition, elem, notElem, lookup, isPrefixOf, isSuffixOf, isInfixOf, isSubsequenceOf, group, inits, tails, stripPrefix, flatten, flattenMulti, zip, zipN, zip3, zip4, zip5, zipWith, zipWithN, zipWith3, zipWith4, zipWith5, unzip, unzipN, any, all, and, or, not, sum, product, maximum, minimum, arrayUnion, arrayIntersect, arrayDifference, arrayComplement, split, lines, words, unwords, unlines, negate, complement, difference, union, intersect };
