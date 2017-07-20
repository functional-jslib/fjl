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
const PlaceHolder = function PlaceHolder() {};
const placeHolderInstance = new PlaceHolder();

/**
 * Curries a function based on it's defined arity (argument's list expected length).
 * @function curry
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
 */
function isPlaceHolder (instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `array`.
 * @function replacePlaceHolder
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `array` with placeholders replaced by values in `args`.
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
 * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function curry_
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
 * Curries a function up to given arity also enforces arity via placeholder values (`__`).
 * @function curryN_
 * @param fn {Function}
 * @param executeArity {Number}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in function wrapped in a function for currying.
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
 * Curries a function up to a given arity.
 * @function curryN
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

let _Number$1 = Number.name;
let _NaN = 'NaN';
let _Null$1 = 'Null';
let _Undefined$1 = 'Undefined';
let _undefined$1 = 'undefined';

/**
 * Returns the class name of an object from it's class string.
 * @note Returns 'NaN' if value type is 'Number' and value isNaN evaluates to true as of version 0.4.85.
 * @note If your type (constructor/class) overrides it's `toString` method use a named `toString` method to get the accurate constructor name out of `typeOf`;  E.g., If you do override `toString` on your class(es) and don't set them to named functions then `sjl.typeOf*` will use Object.prototype.toString to pull your classes type out.
 * @function module:fjl.typeOf
 * @param value {*}
 * @returns {string} - A string representation of the type of the value; E.g., 'Number' for `0`
 */
const typeOf = value => {
        let retVal;
        if (typeof value === _undefined$1) {
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
    };
const typeOfIs = curry2((type, obj) => typeOf(obj) === ((type instanceof Function) ? type.name : type));

/**
 * Created by elyde on 12/18/2016.
 */
/**
 * @author elyde
 * @created 12/10/2016.
 * @module is
 * @type {{isset: module:is.isset, issetAndOfType: module:is.issetAndOfType, isNumber: module:is.isNumber, isFunction: module:is.isFunction, isClass: module:is.isClass, isArray: module:is.isArray, isBoolean: module:is.isBoolean, isObject: module:is.isObject, isString: module:is.isString, isMap: module:is.isMap, isSet: module:is.isSet, isWeakMap: module:is.isWeakMap, isWeakSet: module:is.isWeakSet, isUndefined: module:is.isUndefined, isNull: module:is.isNull, isSymbol: module:is.isSymbol, isEmpty: module:is.isEmpty, instanceOf: Function, isConstructablePrimitive: isConstructablePrimitive, notEmptyAndOfType: module:is.notEmptyAndOfType}}
 */

let _String = String.name;
let _Function = Function.name;
let _Array = Array.name;
let _Number = Number.name;
let _Object = Object.name;
let _Boolean = Boolean.name;
let _Map = 'Map';
let _Set = 'Set';
let _WeakMap = 'WeakMap';
let _WeakSet = 'WeakSet';
let _Null = 'Null';
let _Undefined = 'Undefined';
let _undefined = 'undefined';

/**
 * Returns whether constructor has derived object.
 * @instanceConstructor {Function|Class}
 * @instance {*}
 * @returns {Boolean}
 */
const instanceOf = curry2((instanceConstructor, instance) => {
        return instance instanceof instanceConstructor;
    });

/**
 * Checks if `value` is an es2015 `class`.
 * @function module:is.isClass
 * @param value {*}
 * @returns {boolean}
 */
function isClass (value) {
    return value && /^\s{0,3}class\s{1,3}/.test(value.toString().substr(0, 10));
}

/**
 * Returns whether a value is a function or not.
 * @function module:is.isFunction
 * @param value {*}
 * @returns {Boolean}
 */
function isFunction (value) {
    return !isClass(value) && value instanceof Function;
}

/**
 * Checks to see if value passed in is set (not undefined and not null).
 * @function module:is.isset
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
function isset (value) {
    return typeof value !== _undefined && value !== null;
}

/**
 * Checks whether a value isset and if it's type is the same as the type name passed in.
 * @function module:is.issetAndOfType
 * @param value {*} - Value to check on.
 * @param type {String|Function} - Constructor name string or Constructor.  You can pass one or more types.
 * @returns {Boolean}
 */
function issetAndOfType (value, type) {
    return isset(value) && typeOfIs(type, value);
}

/**
 * Checks if value is an array.
 * @function module:is.isArray
 * @param value {*}
 * @returns {boolean}
 */
function isArray (value) {
    return typeOfIs(Array, value);
}

/**
 * Checks whether value is an object or not.
 * @function module:is.isObject
 * @param value
 * @returns {Boolean}
 */
function isObject (value) {
    return typeOfIs(_Object, value);
}

/**
 * Checks if value is a boolean.
 * @function module:is.isBoolean
 * @param value {*}
 * @returns {Boolean}
 */
function isBoolean (value) {
    return typeOfIs(_Boolean, value);
}

/**
 * Checks if value is a valid number (also checks if isNaN so that you don't have to).
 * @function module:is.isNumber
 * @param value {*}
 * @returns {Boolean}
 */
function isNumber (value) {
    return typeOfIs(_Number, value);
}

/**
 * Checks whether value is a string or not.
 * @function module:is.isString
 * @param value {*}
 * @returns {Boolean}
 */
function isString(value) {
    return typeOfIs(_String, value);
}

/**
 * Checks whether value is of `Map` or not.
 * @function module:is.isMap
 * @param value {*}
 * @returns {Boolean}
 */
function isMap(value) {
    return typeOfIs(_Map, value);
}

/**
 * Checks whether value is of `Set` or not.
 * @function module:is.isSet
 * @param value {*}
 * @returns {Boolean}
 */
function isSet(value) {
    return typeOfIs(_Set, value);
}

/**
 * Checks whether value is of `WeakMap` or not.
 * @function module:is.isWeakMap
 * @param value {*}
 * @returns {Boolean}
 */
function isWeakMap(value) {
    return typeOfIs(_WeakMap, value);
}

/**
 * Checks whether value is of `WeakSet` or not.
 * @function module:is.isWeakSet
 * @param value {*}
 * @returns {Boolean}
 */
function isWeakSet(value) {
    return typeOfIs(_WeakSet, value);
}

/**
 * Checks if value is undefined.
 * @function module:is.isUndefined
 * @param value {*}
 * @returns {Boolean}
 */
function isUndefined (value) {
    return typeOfIs(_Undefined, value);
}

/**
 * Checks if value is null.
 * @function module:is.isNull
 * @param value {*}
 * @returns {Boolean}
 */
function isNull (value) {
    return typeOfIs(_Null, value);
}

/**
 * Checks if value is a `Symbol`.
 * @function module:is.isSymbol
 * @param value {*}
 * @returns {Boolean}
 */
function isSymbol (value) {
    return typeOfIs('Symbol', value);
}

/**
 * Checks to see if passed in argument is empty.
 * @function module:is.empty
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
function isEmpty(value) {
    let typeOfValue = typeOf(value),
        retVal;

    if (typeOfValue === _Array || typeOfValue === _String || typeOfValue === _Function) {
        retVal = value.length === 0;
    }
    else if (typeOfValue === _Number && value !== 0) {
        retVal = false;
    }
    else if (typeOfValue === _Object) {
        retVal = Object.keys(value).length === 0;
    }
    else {
        retVal = !value;
    }
    return retVal;
}

/**
 * Returns true if an element is not empty and is of type.
 * @function module:is.notEmptyAndOfType
 * @param type {String|Function} - Type to check against (string name or actual constructor).
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
function notEmptyAndOfType (type, value) {
    return !isEmpty(value) && typeOfIs(type, value);
}

/**
 * Checks to see if value can be constructed from a constructor.
 * @param value {*}
 * @returns {Boolean}
 */
function isConstructablePrimitive (value) {
    return [
        isNumber, isBoolean, isString, isObject,
        isArray, isFunction, isMap, isSet,
        isWeakMap, isWeakSet
    ].some(fn => fn(value));
}

/**
 * Created by elyde on 12/25/2016.
 */

/**
 * @returns {Function}
 */
function defineAssign () {
    if (Object.assign) {
        return (obj0, ...objs) => Object.assign(obj0, ...objs);
    }
    return (obj0, ...objs) => objs.reduce((topAgg, obj) => {
        return Object.keys(obj).reduce((agg, key) => {
            agg[key] = obj[key];
            return agg;
        }, topAgg);
    }, obj0);
}

const assignDeep = (obj0, ...objs) =>
        objs.reduce((topAgg, obj) => {
            return Object.keys(obj).reduce((agg, key) => {
                let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if (agg.hasOwnProperty(key) && propDescription &&
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
        }, obj0);
const assign = defineAssign();

/**
 * @module assign
 * @type {{assign: Function, assignDeep: Function}}
 */

/**
 * Composes all functions passed in from right to left passing the return value of the function to the right of a function to left.
 * @module compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */
let compose = (...args) => arg0 => args.reduceRight((value, fn) => fn(value), arg0);

/**
 * @author edlc
 * @created 5/1/17.
 * @module fnOperators
 * @type {{call: Function, apply: Function, flip: Function, flipN: Function}}
 */
let call = (fn, ...args) => fn.call(null, ...args);
let apply = (fn, args) => fn.apply(null, args);

/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

const assignDeep$1 = (obj0, ...objs) =>
        objs.reduce((topAgg, obj) => {
            return Object.keys(obj).reduce((agg, key) => {
                let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if (agg.hasOwnProperty(key) && propDescription &&
                    !(propDescription.get && propDescription.set) &&
                    !propDescription.writable) {
                    return agg;
                }
                if (isObject(agg[key]) && isObject(obj[key])) {
                    assignDeep$1(agg[key], obj[key]);
                }
                else {
                    agg[key] = obj[key];
                }
                return agg;
            }, topAgg);
        }, obj0);
const hasOwnProperty = curry2((x, propName) => x.hasOwnProperty(propName));
const union = curry2((obj1, obj2) => assignDeep$1(obj1, obj2));
const intersect = curry2((obj1, obj2) => Object.keys(obj1).reduce((agg, key) => {
            if (hasOwnProperty(obj2, key)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {}));
const difference = curry2((obj1, obj2) => Object.keys(obj1).reduce((agg, key) => {
            if (!hasOwnProperty(obj2, key)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {}));
const complement = curry2((obj0, ...objs) => objs.reduce((agg, obj) => {
            return assignDeep$1(agg, difference(obj, obj0));
        }, {}));

/**
 * Created by elyde on 7/15/2017.
 */

var negate = x => isFunction(x) ? (value) => !x(value) : x * -1;

/**
 * Array operators module.
 * @module arrayOperators
 * @type {{complement: Function, difference: Function, intersect: Function, union: Function, flatten: Function, flattenMulti: Function, filter: Function, map: Function, reduce: Function, reduceRight: Function, head: Function, tail: Function, init: Function, last: Function, reverse: Function}}
 */

/**
 * @returns {Function}
 */
function defineReverse () {
    return Array.prototype.reverse ? x => x.reverse() :
        x => x.reduceRight((agg, item) => {
            agg.push(item);
            return agg;
        }, []);
}

const ASC = 1;
const DESC = -1;
const not = curry2((p, elm) => !p(elm));
const join = curry2((separator, arr) => arr ? arr.join(separator) : '');
const concat = curry2((arr0, ...arrays) => arr0.concat.apply(arr0, arrays));
const onlyOneOrNegOne = x => x === 1 || x === -1 ? x : 1;
const getSortByOrder = curry2((multiplier, valueFn = v => v) => {
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
const sortDescByLength = getSortByOrder(DESC, x => x.length);
const head = functor => functor[0];
const tail = functor => functor.slice(1);
const init = functor => functor.slice(0, functor.length - 1);
const last = functor => functor[functor.length - 1];
const take = curry2((limit, array) => array.slice(0, limit - 1));
const drop = curry2((count, array) => array.slice(count, array.length - 1));
const splitStrAt = curry2((ind, str) => [
        str.substring(0, ind),
        str.substring(ind, str.length)
    ]);
const splitArrayAt = curry2((ind, arr) => [
        arr.slice(0, ind),
        arr.slice(ind, arr.length)
    ]);
const splitAt = curry2((ind, x) => isString(x) ? splitStrAt(ind, x) : splitArrayAt(ind, x));
const rangeOnIterable = curry2((predicate, arr) => {
        let ind = 0;
        while (predicate(arr[ind]) && ind < arr.length) ind += 1;
        return ind;
    });
const takeWhile = curry2((predicate, arr) =>
        arr.slice(0, rangeOnIterable(predicate, arr)));
const dropWhile = curry2((predicate, arr) =>
        arr.slice(rangeOnIterable(predicate, arr), arr.length - 1));
const span = curry2((predicate, arr) => [
        takeWhile(predicate, arr),
        dropWhile(predicate, arr)
    ]);
const breakOnList = curry2((predicate, arr) => [
        takeWhile(negate(predicate), arr),
        dropWhile(negate(predicate), arr)
    ]);
const lengths = curry2(...arrs => arrs.length ? arrs.map(arr => arr.length) : []);
const orderedLengths = curry2((orderDir, ...arrs) => length(arrs) ? (orderDir ? sortAsc : sortDesc)(lengths(arrs)) : []);
const trimLengths = (...arrays) => {
        const smallLen = orderedLengths(ASC, arrays)[0];
        return arrays.map(arr => arr.length > smallLen ? arr.slice(0, smallLen) : arr.slice(0));
    };
const reverse = defineReverse();
const map = curry2((fn, functor) => functor.map(fn));
const filter = curry2((fn, arr) => arr.filter(fn));
const reduce = curry2((fn, agg, arr) => arr.reduce(fn, agg));
const reduceRight = curry3((fn, agg, functor) => functor.reduceRight(fn, agg));
const flatten = arr => arr.reduce((agg, elm) => {
        if (Array.isArray(elm)) {
            return concat(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, []);
const flattenMulti = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => concat(agg, flatten(arr)), flatten(arr0), arrays));
const zip = curry2((arr1, arr2) => {
        const {0: a1, 1: a2} = trimLengths(arr1, arr2);
        return a1.reduce((agg, item, ind) => {
                agg.push([item, a2[ind]]);
            return agg;
        }, []);
    });
const zipN = curry2((...arrs) => {
        const lists = apply(trimLengths, arrs);
        return lists.reduce((agg, arr, ind) => {
            if (!ind) {
                return zip (agg, arr);
            }
            return agg.map (arr2 => {
                arr.forEach (elm => {
                    arr2.push(elm);
                });
                return arr2;
            });
        }, lists.shift());
    });
const unzip = arr =>
        reduce((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr);
const unzipN = (...arrs) =>
        reduce((agg, item) => {
            agg.push(unzip(item));
            return agg;
        }, [], arrs);
const union$1 = curry2((arr1, arr2) =>
        concat(arr1, filter(elm => arr1.indexOf(elm) === -1, arr2)));
const intersect$1 = curry2((arr1, arr2) => arr2.length === 0 ? [] :
            filter(elm => arr2.indexOf(elm) > -1, arr1));
const difference$1 = curry2((array1, array2) => { // augment this with max length and min length ordering on op
        let [arr1, arr2] = sortDescByLength(array1, array2);
        if (!arr2 || arr2.length === 0) {
            return arr1.slice();
        }
        return reduce((agg, elm) => {
            if (arr2.indexOf(elm) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    });
const complement$1 = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => concat(agg, difference$1(arr, arr0)), [], arrays));

/**
 * Created by elyde on 12/11/2016.
 * A place to put the common ops (ops that can split between array, object, and possibly other) here.
 */

const complement$2 = curry2((functor, ...others) => {
        switch (typeOf(functor)) {
            case 'Array':
                return complement$1(functor, ...others);
            default:
                return complement(functor, ...others);
        }
    });
const difference$2 = curry2((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return difference$1(functor1, functor2);
            default:
                return difference(functor1, functor2);
        }
    });
const union$2 = curry2((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return union$1(functor1, functor2);
            default:
                return union(functor1, functor2);
        }
    });
const intersect$2 = curry2((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return intersect$1(functor1, functor2);
            default:
                return intersect(functor1, functor2);
        }
    });

/**
 * Contains functions for operating strings.
 * @author elyde
 * @module stringOps {{join: Function, split: Function, lines: Function, words: Function, unlines: Function, unwords: Function}}
 * @created 7/9/2017.
 */

const split = curry2((separator, str) => str ? str.split(separator) : []);
const lines = split(/[\n\r]/gm);
const words = split(/[\s\t]/gm);
const unwords = join('\s');
const unlines = join('\n');

/**
 * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
 * Generated Thu Jul 20 2017 17:14:18 GMT-0400 (EDT) 
 */

let version = '0.13.3';

/**
 * Created by elyde on 12/6/2016.
 * @todo Evaluate library for places where we can make it more functional; E.g.,
 *  - Make methods take the functor/monad values as last (where it makes sense)
 */

export { assign, assignDeep, compose, __, curry, curryN, curry2, curry3, curry4, curry5, curry_, curryN_, curry2_, curry3_, curry4_, curry5_, typeOf, typeOfIs, instanceOf, isset, issetAndOfType, isNumber, isFunction, isArray, isBoolean, isObject, isString, isUndefined, isNull, isSymbol, isEmpty, isMap, isSet, isWeakMap, isWeakSet, isConstructablePrimitive, notEmptyAndOfType, call, apply, complement as objComplement, difference as objDifference, union as objUnion, intersect as objIntersect, complement$1 as arrayComplement, difference$1 as arrayDifference, union$1 as arrayUnion, intersect$1 as arrayIntersect, flatten, flattenMulti, map, filter, reduce, reduceRight, head, tail, init, last, reverse, orderedLengths, lengths, zip, zipN, getSortByOrder, sortAsc, sortDesc, sortDescByLength, concat, ASC, DESC, join, unzip, unzipN, complement$2 as complement, difference$2 as difference, union$2 as union, intersect$2 as intersect, split, lines, words, unlines, unwords, version };
