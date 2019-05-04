/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

/**
 * @private
 * @type {string}
 */
const
/**
 * Returns curried function.
 * @private
 * @param executeArity {Number}
 * @param unmetArityNum {Number}
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function} - Curried function.
 */
returnCurried = (executeArity, unmetArityNum, fn, argsToCurry) => {
  switch (unmetArityNum) {
    case 1:
      /* eslint-disable */
      return function func(x) {
        /* eslint-enable */
        return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
      };

    case 2:
      /* eslint-disable */
      return function func(a, b) {
        /* eslint-enable */
        return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
      };

    case 3:
      /* eslint-disable */
      return function func(a, b, c) {
        /* eslint-enable */
        return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
      };

    case 4:
      /* eslint-disable */
      return function func(a, b, c, d) {
        /* eslint-enable */
        return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
      };

    case 5:
      /* eslint-disable */
      return function func(a, b, c, d, e) {
        /* eslint-enable */
        return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
      };

    default:
      return (...args) => executeAsCurriedFunc(fn, executeArity, unmetArityNum, args, argsToCurry);
  }
},

/**
 * Returns curried function if unmetArity is not met else returns result of executing
 * final function.
 * @private
 * @param fn {Function}
 * @param executeArity {Number}
 * @param unmetArity {Number}
 * @param args {Array<*>}
 * @param argsToCurry {Array<*>}
 * @returns {Function|*} - Curried function or result of 'finally' executed function.
 */
executeAsCurriedFunc = (fn, executeArity, unmetArity, args, argsToCurry) => {
  let concatedArgs = argsToCurry.concat(args),
      canBeCalled = concatedArgs.length >= executeArity || !executeArity,
      newExpectedArity = executeArity - concatedArgs.length;
  return !canBeCalled ? returnCurried(executeArity, newExpectedArity, fn, concatedArgs) : fn(...concatedArgs);
};

const 
/**
 * Curries a function up to a given arity.
 * @function module:function.curryN
 * @param executeArity {Number}
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 * @throws {Error} - When `fn` is not a function.
 */
curryN = (executeArity, fn, ...argsToCurry) => {
  if (!fn || !(fn instanceof Function)) {
    throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\` though received ${fn}?`);
  }

  return returnCurried(executeArity, executeArity - argsToCurry.length, fn, argsToCurry);
},

/**
 * Curries a function based on it's defined arity (note: rest args param (`...rest`) are not counted in arity).
 * @function module:function.curry
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
curry = (fn, ...argsToCurry) => curryN((fn || {}).length, fn, ...argsToCurry),

/**
 * Curries a function up to an arity of 2 (won't call function until 2 or more args).
 * @function module:function.curry2
 * @param fn {Function}
 * @returns {Function}
 */
curry2 = fn => curryN(2, fn),

/**
 * Curries a function up to an arity of 3 (won't call function until 3 or more args).
 * @function module:function.curry3
 * @param fn {Function}
 * @returns {Function}
 */
curry3 = fn => curryN(3, fn),

/**
 * Curries a function up to an arity of 4 (won't call function until 4 or more args).
 * @function module:function.curry4
 * @param fn {Function}
 * @returns {Function}
 */
curry4 = fn => curryN(4, fn),

/**
 * Curries a function up to an arity of 5 (won't call function until 5 or more args).
 * @function module:function.curry5
 * @param fn {Function}
 * @returns {Function}
 */
curry5 = fn => curryN(5, fn);

/**
 * @module utils
 */
const 
/**
 * Returns a function that takes an argument and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakesOne
 * @param name {String}
 * @returns {Function}
 */
fPureTakesOne = name => curry((arg, f) => f[name](arg)),

/**
 * Returns a function that takes 2 arguments and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakes2
 * @param name {String}
 * @returns {Function}
 */
fPureTakes2 = name => curry((arg1, arg2, f) => f[name](arg1, arg2)),

/**
 * Returns a function that takes 3 arguments and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakes3
 * @param name {String}
 * @returns {Function}
 */
fPureTakes3 = name => curry((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3)),

/**
 * Returns a function that takes 4 arguments and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakes4
 * @param name {String}
 * @returns {Function}
 */
fPureTakes4 = name => curry((arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4)),

/**
 * Returns a function that takes 5 arguments and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakes5
 * @param name {String}
 * @returns {Function}
 */
fPureTakes5 = name => curry((arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5)),

/**
 * Returns a function that takes an object and one or more arguments on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakesOneOrMore
 * @param name {String}
 * @returns {Function}
 */
fPureTakesOneOrMore = name => curry2((f, ...args) => f[name](...args));

/**
 * Created by elyde on 7/20/2017.
 * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
 */

const
/**
 * Array.prototype.reverse generator (generates a function that calls the prototype version or a
 * shimmed version if it doesn't exist).
 * @returns {Function}
 */
defineReverse = () => Array.prototype.reverse ? x => x.reverse() : x => x.reduceRight((agg, item) => {
  agg.push(item);
  return agg;
}, []);

const 
/**
 * Maps a function to functor (list etc.).
 * @function module:jsPlatform.map
 * @param fn {Function}
 * @param functor {Array|{map: {Function}}}
 * @returns {Array|{map: {Function}}}
 */
map = fPureTakesOne('map'),

/**
 * Filters a functor (list etc.) with passed in function.
 * @function module:jsPlatform.filter
 * @param fn {Function}
 * @param functor {Array|{filter: {Function}}}
 * @returns {Array|{filter: {Function}}}
 */
filter = fPureTakesOne('filter'),

/**
 * Reduces a foldable (list etc.) with passed in function.
 * @function module:jsPlatform.reduce
 * @param fn {Function}
 * @param functor {Array|{reduce: {Function}}}
 * @returns {Array|{reduce: {Function}}}
 */
reduce = fPureTakes2('reduce'),

/**
 * Reduces a foldable (list etc.) from the right with passed in function.
 * @function module:jsPlatform.reduceRight
 * @param fn {Function}
 * @param functor {Array|{reduceRight: {Function}}}
 * @returns {Array|{reduceRight: {Function}}}
 */
reduceRight = fPureTakes2('reduceRight'),

/**
 * For each on functor (Array|Object|etc.).
 * @function module:jsPlatform.forEach
 * @param fn {Function}
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type of object you pass in unless it doesn't have a `forEach` method.
 * @throws {Error} - When passed in functor doesn't have a `forEach` method.
 */
forEach = fPureTakesOne('forEach'),

/**
 * Returns `true` if `fn` (predicate) returns true for at least one item
 * in functor else returns `false`.
 * @param fn {Function} - Predicate.
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have a `some` method.
 */
some = fPureTakesOne('some'),

/**
 * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
 * @function module:jsPlatform.every
 * @param fn {Function} - Predicate.
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have an `every` method.
 */
every = fPureTakesOne('every'),

/**
 * Array.prototype.join
 * @function module:jsPlatform.join
 * @param separator {String|RegExp}
 * @param arr {Array}
 * @returns {String}
 */
join = fPureTakesOne('join'),

/**
 * Same as Array.prototype.push
 * @function module:jsPlatform.push
 * @param item {*}
 * @param arr {Array}
 * @returns {Number}
 */
push = fPureTakesOneOrMore('push'),

/**
 * Reverses an list (shimmed if not exists).
 * @function module:jsPlatform.reverse
 * @param x {Array<any>}
 * @return {Array}
 */
reverse = defineReverse();

/**
 * Created by elydelacruz on 9/7/2017.
 */

const 
/**
 * Functional `apply` function (takes no context).
 * @function module:function.apply
 * @param fn {Function}
 * @param args {Array|*}
 * @returns {*}
 */
apply = curry((fn, args) => fn.apply(null, args)),

/**
 * Functional `call` function (takes no context).
 * @function module:function.call
 * @param fn {Function}
 * @param args {...*}
 * @returns {*}
 */
call = curry2((fn, ...args) => fn.call(null, ...args));

const 
/**
 * Returns a curried function requiring given functions arguments in reverse
 * (returned function expects 2 or more variables (curried at 2 or more args)).
 * @function module:function.flipN
 * @param fn {Function}
 * @returns {Function}
 * @curried
 */
flipN = fn => curry2((...args) => apply(fn, reverse(args))),

/**
 * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
 * @function module:function.flip
 * @param fn {Function}
 * @returns {Function}
 */
flip = fn => curry((b, a) => call(fn, a, b)),

/**
 * Same as `flip` except returns a flipped function of arity 3.
 * @function module:function.flip3
 * @param fn {Function}
 * @returns {Function}
 */
flip3 = fn => curry((c, b, a) => call(fn, a, b, c)),

/**
 * Same as `flip` except returns a flipped function of arity 4.
 * @function module:function.flip4
 * @param fn {Function}
 * @returns {Function}
 */
flip4 = fn => curry((d, c, b, a) => call(fn, a, b, c, d)),

/**
 * Same as `flip` except returns a flipped function of arity 5.
 * @function module:function.flip5
 * @param fn {Function}
 * @returns {Function}
 */
flip5 = fn => curry((e, d, c, b, a) => call(fn, a, b, c, d, e));

/**
 * @description Defines some of the platform methods for objects (the ones used within `fjl`).
 */
const 
/**
 * Returns whether constructor has derived object.
 * @function module:object.instanceOf
 * @param instanceConstructor {Function} - Constructor.
 * @param instance {*}
 * @instance {*}
 * @returns {Boolean}
 */
instanceOf = curry((instanceConstructor, instance) => instance instanceof instanceConstructor),

/**
 * @function module:object.hasOwnProperty
 * @param propName {*}
 * @param typeInstance {*}
 * @returns {Boolean}
 * @deprecated - Use property directly instead.
 */
hasOwnProperty = fPureTakesOne('hasOwnProperty'),

/**
 * @function module:object.length
 * @param x {*}
 * @returns {Number}
 * @throws {Error} - Throws an error if value doesn't have a `length` property (
 *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
 */
length = x => x.length,

/**
 * Contains all the static functions from `Object` but curried and flipped;
 * @example
 * // E.g., `Object.defineProperties(obj, descriptor)` can now be used like
 * import {defineProperties} from 'fjl'
 * defineProperties(descriptor, someObj),
 * // Et. al.
 * @memberOf module:object
 * @type {{...Object}}
 */
native = Object.getOwnPropertyNames(Object).reduce((agg, key) => {
  if (typeof Object[key] !== 'function') {
    return agg;
  }

  const operation = Object[key];

  switch (operation.length) {
    case 2:
      agg[key] = flip(operation);
      break;

    case 3:
      agg[key] = flip3(operation);
      break;

    case 4:
      agg[key] = flip4(operation);
      break;

    case 5:
      agg[key] = flip5(operation);
      break;

    default:
      agg[key] = Object[key];
      break;
  }

  return agg;
}, {}),

/**
 * Gets passed in object's own enumerable keys (same as `Object.keys`).
 * @function module:object.keys
 * @param obj {*}
 * @returns {Array<String>}
 */
{
  keys
} = native,

/**
 * Defined as `Object.assign` else is the same thing but shimmed.
 * @function module:object.assign
 * @param obj0 {Object}
 * @param objs {...{Object}}
 * @returns {Object}
 */
assign = (() => Object.assign ? (obj0, ...objs) => Object.assign(obj0, ...objs) : curry2((obj0, ...objs) => objs.reduce((topAgg, obj) => {
  return Object.keys(obj).reduce((agg, key) => {
    agg[key] = obj[key];
    return agg;
  }, topAgg);
}, obj0)))();

/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
 */
const _Number = Number.name,
      _NaN = 'NaN',
      _Null = 'Null',
      _Undefined = 'Undefined';
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

function typeOf(value) {
  let retVal;

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

/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
 */
let _String = String.name,
    _Number$1 = Number.name,
    _Object = Object.name,
    _Boolean = Boolean.name,
    _Symbol = 'Symbol',
    _Map = 'Map',
    _Set = 'Set',
    _WeakMap = 'WeakMap',
    _WeakSet = 'WeakSet',
    _Null$1 = 'Null',
    _Undefined$1 = 'Undefined';
const 
/**
 * Resolves/normalizes a type name from either a string or a constructor.
 * @function module:object.toTypeRef
 * @param type {Function|String} - String or function representing a type.
 * @returns {String}
 * @todo write tests for this function.
 */
toTypeRef = type => {
  if (!type) {
    return typeOf(type);
  } else if (type.constructor === String || type instanceof Function) {
    return type;
  }

  return typeOf(type);
},

/**
 * Returns an array of type refs from possible type refs (converts null, undefined, NaN, and other values into
 * type refs (either constructor name or constructor name based on whether value(s) is a string, a constructor, or not).
 * @function module:object.toTypeRefs
 * @param types {...(TypeRef|*)}
 * @returns {Array<TypeRef>}
 * @todo Ensure tests are written for this function.
 */
toTypeRefs = (...types) => types.map(toTypeRef),

/**
 * Returns possible Type's TypeRef name.
 * @function module:object.toTypeRefName
 * @param Type {(TypeRef|*)}
 * @returns {String}
 * @todo Ensure tests are written for this function.
 */
toTypeRefName = Type => {
  const ref = toTypeRef(Type);
  return ref instanceof Function ? ref.name : ref;
},

/**
 * Returns possible Types' TypeRef names.
 * @function module:object.toTypeRefNames
 * @param types {...(TypeRef|*)}
 * @returns {String[]}
 * @todo Ensure tests are written for this function.
 */
toTypeRefNames = (...types) => types.map(toTypeRefName),

/**
 * Returns whether a value is a function or not.
 * @function module:object.isFunction
 * @param value {*}
 * @returns {Boolean}
 */
isFunction = instanceOf(Function),

/**
 * Strict type checker.  Checks if given value is a direct instance of given type;  E.g.,
 * @example
 *   isType(String, 'abcdefg')  === true // true
 *   isType(String.name, 'abcdefg') === true
 *   isType(Number, NaN) === false
 *   isType(Number, 99) === true
 *   isType('Null', 99) === false // though, for `null` and `undefined` checks
 *                                // @see `isset`, in this module, instead
 *   isType('Undefined', undefined) === true // true
 *
 * @note Useful where absolute types, or some semblance thereof, are required.
 * @function module:object.isType
 * @param type {Function|ObjectConstructor|String} - Constructor or constructor name
 * @param obj {*}
 * @return {Boolean}
 */
isType = curry((type, obj) => typeOf(obj) === toTypeRefName(type)),

/**
 * Synonym for `isType` (or just a more accurate name for `isType`).
 * @function module:object.isStrictly
 * @param type {Function|ObjectConstructor|String} - Constructor or constructor name
 * @param obj {*}
 * @return {Boolean}
 */
isStrictly = isType,

/**
 * Loose type checker;  E.g., If `type` is not a constructor, but a constructor name, does a type check on
 * constructor names, else if first check fails and `type` is a constructor, performs an `instanceof` check
 * on value with constructor.
 * @note Use care when checking for `Array` since it is an `instanceof` Object.
 * @note For `null` and `undefined` their class cased names can be used for type checks
 * `isOfType('Null', null) === true (passes strict type check)` (or better yet @link `module:object.isset` can be used).
 * @throwsafe - Doesn't throw on `null` or `undefined` `obj` values.
 * @example
 * isOfType(Number, 99) === true        // true  (passes strict type check (numbers are not instances of `Number`
 *                                      //        constructor)
 * isOfType('Number', 99) === true      // true  (passes strict type check)
 * isOfType(Number, NaN) === true       // true. (passes instance of check)
 *                                      //        If you want "true" strict type checking use `isType`
 * isOfType(Object, []) === true        // true  (passes instance of check)
 * isOfType(Array, []) === true         // true  (passes instance of check)
 * isOfType(Object, {}) === true        // true  (passes instance of check)
 * isOfType(Object.name, {}) === true   // true  (Passes strict type check)
 * class Abc extends String {}
 * isOfType(String, new Abc('abcd')) // true (passes instanceof check)
 *
 * @function module:object.isOfType
 * @param type {Function|String} - Type reference (constructor or `constructor.name`).
 * @param x {*} - Value to check.
 * @returns {Boolean}
 */
isOfType = curry((type, x) => isType(type, x) || instanceOf(type, x)),

/**
 * Synonym for `isOfType` (or just a more accurate name).
 * @function module:object.isLoosely
 * @param type {Function|String} - Type reference (constructor or `constructor.name`).
 * @param x {*} - Value to check.
 * @returns {Boolean}
 */
isLoosely = isOfType,

/**
 * Checks if `value` is an es2015 `class`.
 * @function module:object.isClass
 * @param x {*}
 * @returns {boolean}
 */
isClass = x => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10)),

/**
 * Returns a boolean depicting whether a value is callable or not.
 * @function module:object.isCallable
 * @tentative
 * @param x {*}
 * @returns {Boolean}
 */
isCallable = x => isFunction(x) && !isClass(x),

/**
 * Checks if value is an array (same as `Array.isArray`).
 * @function module:object.isArray
 * @param value {*}
 * @returns {boolean}
 */
{
  isArray
} = Array,

/**
 * Checks whether value is an object or not.
 * @function module:object.isObject
 * @param value
 * @returns {Boolean}
 */
isObject = isType(_Object),

/**
 * Checks if value is a boolean.
 * @function module:object.isBoolean
 * @param value {*}
 * @returns {Boolean}
 */
isBoolean = isType(_Boolean),

/**
 * Checks if value is a valid number (also checks if isNaN so that you don't have to).
 * @function module:object.isNumber
 * @param value {*}
 * @returns {Boolean}
 */
isNumber = isType(_Number$1),

/**
 * Checks whether value is a string or not.
 * @function module:object.isString
 * @param value {*}
 * @returns {Boolean}
 */
isString = isType(_String),

/**
 * Checks whether value is of `Map` or not.
 * @function module:object.isMap
 * @param value {*}
 * @returns {Boolean}
 */
isMap = isType(_Map),

/**
 * Checks whether value is of `Set` or not.
 * @function module:object.isSet
 * @param value {*}
 * @returns {Boolean}
 */
isSet = isType(_Set),

/**
 * Checks whether value is of `WeakMap` or not.
 * @function module:object.isWeakMap
 * @param value {*}
 * @returns {Boolean}
 */
isWeakMap = isType(_WeakMap),

/**
 * Checks whether value is of `WeakSet` or not.
 * @function module:object.isWeakSet
 * @param value {*}
 * @returns {Boolean}
 */
isWeakSet = isType(_WeakSet),

/**
 * Checks if value is undefined.
 * @function module:object.isUndefined
 * @param value {*}
 * @returns {Boolean}
 */
isUndefined = isType(_Undefined$1),

/**
 * Checks if value is null.
 * @function module:object.isNull
 * @param value {*}
 * @returns {Boolean}
 */
isNull = isType(_Null$1),

/**
 * Checks if value is a `Symbol`.
 * @function module:object.isSymbol
 * @param value {*}
 * @returns {Boolean}
 */
isSymbol = isType(_Symbol),

/**
 * Checks if given `x` is set and of one of
 *  [String, Boolean, Number, Symbol] (null and undefined are immutable
 *  but are not "usable" (usually not what we want to operate on).
 * @function module:object.isUsableImmutablePrimitive
 * @param x {*}
 * @returns {Boolean}
 */
isUsableImmutablePrimitive = x => {
  const typeOfX = typeOf(x);
  return isset(x) && [_String, _Number$1, _Boolean, _Symbol].some(Type => Type === typeOfX);
},

/**
 * Checks if !length.
 * @function module:object.isEmptyList
 * @param x {*}
 * @returns {Boolean}
 */
isEmptyList = x => !length(x),

/**
 * Checks if object has own properties/enumerable-props or not.
 * @function module:object.isEmptyObject
 * @param obj {*}
 * @returns {Boolean}
 */
isEmptyObject = obj => isEmptyList(keys(obj)),

/**
 * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
 * @function module:object.isEmptyCollection
 * @param x {*}
 * @returns {Boolean}
 */
isEmptyCollection = x => x.size === 0,

/**
 * Checks to see if passed in value is empty;  I.e.,
 *  check for one of '', 0, `null`, `undefined`, `NaN`, `false`, empty array, empty object, ~~empty function (zero arity)~~,
 *  or empty collection (es6 collection: Map, Set, WeakMap, or WeakSet etc.) (`!value.size`).
 * @function module:object.isEmpty
 * @param x {*} - Value to check.
 * @returns {Boolean}
 */
isEmpty = x => {
  if (!x) {
    // if '', 0, `null`, `undefined`, `NaN`, or `false` then is empty
    return true;
  }

  if (isNumber(x) || isFunction(x)) {
    return false;
  }

  if (isArray(x)) {
    // takes care of 'instances of Array'
    return !x.length;
  }

  if (x.size !== undefined && !instanceOf(Function, x.size)) {
    return !x.size;
  }

  if (isObject(x)) {
    return !keys(x).length;
  }

  return false;
},

/**
 * Returns whether passed in values is defined and not null or not.
 * @function module:object.isset
 * @param x {*}
 * @returns {Boolean}
 */
isset = x => x !== null && x !== undefined,

/**
 * Checks to see if `x` is of one of the given type refs;  Strict type check (not-instanceof check).
 * @function object.isOneOf
 * @param x {*}
 * @param types {...(TypeRef|*)}
 * @returns {boolean}
 * @deprecated - Instead use @link module:isStrictlyOneOf
 * @todo write tests for this function.
 */
isOneOf = (x, ...types) => {
  const typeName = typeOf(x);
  return toTypeRefNames(types).some(name => typeName === name);
},

/**
 * Checks if given value is strictly one of given types.
 * @function module:object.isStrictlyOneOf
 * @param x {*}
 * @param types {...TypeRef}
 * @returns {boolean}
 */
isStrictlyOneOf = isOneOf,

/**
 * Checks if given value is either strictly one of given types or is
 * an `instanceof` one of given types.
 * @function module:object.isLooselyOneOf
 * @param x {*}
 * @param types {...TypeRef}
 * @returns {boolean}
 */
isLooselyOneOf = (x, ...types) => types.some(type => isType(type, x) || instanceOf(x, type)),

/**
 * Checks if given value is instance of one of the types given.
 * @function module:object.instanceOfOne
 * @param x {*}
 * @param types {...TypeRef}
 * @returns {boolean}
 */
instanceOfOne = (x, ...types) => types.some(instanceOf(x)),

/**
 * Checks if value qualifies (has `map` method) as a functor.
 * @function module:object.isFunctor
 * @param x {*}
 * @returns {bool}
 */
isFunctor = x => x && x.map && instanceOf(Function, x.map);

/**
 * @memberOf object
 */
/**
 * Looks up property and returns it's value; Else `undefined`.
 * Method is null safe (will not throw on `null` or `undefined`).
 * @function module:object.lookup
 * @param key {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */

const lookup = curry((key, obj) => isset(obj) ? obj[key] : undefined);

/**
 * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
 * @example
 * // - If exists `(value).constructor.of` uses this.
 * // - If value is of one String, Boolean, Symbol, or Number types calls it's
 * //      constructor as a function (in cast form;  E.g., `constructor(...args)` )
 * // - Else if constructor is a function, thus far, then calls constructor using
 * //      the `new` keyword (with any passed in args).

 * @function module:object.of
 * @param x {*} - Value to derive returned value's type from.
 * @param [args] {...*} - Any args to pass in to matched construction strategy.
 * @returns {*|undefined} - New value of given value's type else `undefined`.
 */

const of = (x, ...args) => {
  if (!isset(x)) {
    return undefined;
  }

  const constructor = x.constructor;

  if (constructor.hasOwnProperty('of')) {
    return apply(constructor.of, args);
  } else if (isUsableImmutablePrimitive(x)) {
    return apply(constructor, args);
  } else if (isFunction(constructor)) {
    return new constructor(...args);
  }

  return undefined;
};

const 
/**
 * Make a copy of a value or optionally copy incoming value onto an outgoing value (second parameter).
 * @note If incoming thing is an immmutable primitive (string, number, symbol, null, undefined, boolean)
 *  it is returned as is.
 * @function module:object.copy
 * @param x {*} - Thing to copy.
 * @param [out = undefined] {*} - Optional value to copy on to.  Not required.
 * @returns {*} - Copied thing or optionally outgoing value copied onto.
 */
copy = (x, out) => {
  // if `null`, `undefined`, `''`, `0`, `false` return
  if (!x) {
    return x;
  }

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

const 
/**
 * Gives you value at key/namespace-key within `obj`;  E.g.,
 * searchObj('all.your.base', {all: {your: {base: 99}}}) === 99 // `true`
 * @note If key is unreachable (undefined) returns `undefined`.
 *  Useful in cases where we do not want to check each key along the way before getting/checking value;  E.g.,
 * @example
 * ```
 * if (obj && obj.all && obj.all.your && obj.all.your.base) {
 *   // Thing we want to do
 * }
 *
 * // So with our function becomes
 * if (searchObj('all.your.base', obj)) {
 *   // Thing we want to do
 * }
 * ```
 * @function module:object.searchObj
 * @param nsString {String}
 * @param obj {*}
 * @returns {*}
 */
searchObj = curry((nsString, obj) => {
  if (!obj) {
    return obj;
  }

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

/**
 * @module errorThrowing
 * @description Contains error throwing facilities for when a value doesn't match a type.
 */
const 
/**
 * Pretty prints an array of types/type-strings for use by error messages;
 * Outputs "`SomeTypeName`, ..." from [SomeType, 'SomeTypeName', etc...]
 * @function module:errorThrowing.typeRefsToStringOrError
 * @param types {Array|TypesArray}
 * @return {String}
 * @private
 */
typeRefsToStringOrError = types => types.length ? types.map(type => `\`${toTypeRefName(type)}\``).join(', ') : '',

/**
 * Prints a message from an object.  Object signature:
 * {contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix}
 * @function module:errorThrowing.defaultErrorMessageCall
 * @param tmplContext {Object|TemplateContext} - Object to use in error template.
 * @returns {string}
 * @private
 */
defaultErrorMessageCall = tmplContext => {
  const {
    contextName,
    valueName,
    value,
    expectedTypeName,
    foundTypeName,
    messageSuffix
  } = tmplContext,
        isMultiTypeNames = isArray(expectedTypeName),
        typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types',
        typesToMatchCopy = isMultiTypeNames ? typeRefsToStringOrError(expectedTypeName) : expectedTypeName;
  return (contextName ? `\`${contextName}.` : '`') + `${valueName}\` is not ${typesCopy}: ${typesToMatchCopy}.  ` + `Type received: ${foundTypeName}.  Value: ${value};` + `${messageSuffix ? '  ' + messageSuffix + ';' : ''}`;
},

/**
 * Gets the error message thrower seeded with passed in errorMessage template call.
 * @function module:errorThrowing.getErrorIfNotTypeThrower$
 * @param errorMessageCall {Function|ErrorMessageCall}
 * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
 * @returns {Function|ErrorIfNotType}
 * @private
 */
_getErrorIfNotTypeThrower = (errorMessageCall, typeChecker = isOfType) => (ValueType, contextName, valueName, value, messageSuffix = null) => {
  const expectedTypeName = toTypeRef(ValueType),
        foundTypeName = typeOf(value);

  if (typeChecker(ValueType, value)) {
    return value;
  } // Value matches type


  throw new Error(errorMessageCall({
    contextName,
    valueName,
    value,
    expectedTypeName,
    foundTypeName,
    messageSuffix
  }));
},

/**
 * Gets the error message thrower seeded with passed in errorMessage template call.
 * @function module:errorThrowing.getErrorIfNotTypesThrower$
 * @param errorMessageCall {Function|ErrorMessageCall}
 * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
 * @returns {Function|ErrorIfNotTypes}
 * @private
 */
_getErrorIfNotTypesThrower = (errorMessageCall, typeChecker = isOfType) => (valueTypes, contextName, valueName, value, messageSuffix = null) => {
  const expectedTypeNames = valueTypes.map(toTypeRef),
        matchFound = valueTypes.some(ValueType => typeChecker(ValueType, value)),
        foundTypeName = typeOf(value);

  if (matchFound) {
    return value;
  }

  throw new Error(errorMessageCall({
    contextName,
    valueName,
    value,
    expectedTypeName: expectedTypeNames,
    foundTypeName,
    messageSuffix
  }));
},

/**
 * Checks that passed in `value` is of given `type`.  Throws an error if value
 * is not of given `type`.  This is the un-curried version.  For the curried version
 * see `module:errorThrowing.errorIfNotType`.
 * @function module:errorThrowing.errorIfNotType$
 * @param type {String|Function} - Type's name or type itself.
 * @param contextName {String} - Name of context to attribute errors if thrown.
 * @param valueName {String} - String rep of value.
 * @param value {*}
 * @param [messageSuffix=null] {String} - Optional.
 * @returns {*} - Given `value` if `value` matches passed in type.
 * @private
 */
_errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall),

/**
 * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
 *  is not of one of the given `types`.  This is the un-curried version.  For the curried version
 * see `module:errorThrowing.errorIfNotTypes`.
 * @type {Function|module:errorThrowing.errorIfNotTypes}
 * @function module:errorThrowing.errorIfNotTypes$
 * @param types {Array} - Array of one or more types or type names themselves.
 * @param contextName {String} - Name of context to attribute errors if thrown.
 * @param valueName {String} - String rep of value.
 * @param value {*}
 * @returns {*} - Given `value` if `value` matches passed in type.
 * @private
 */
_errorIfNotTypes = _getErrorIfNotTypesThrower(defaultErrorMessageCall),

/**
 * Returns a function that can be used to ensure that values are of a given type.
 *   Also throws informative error messages containing the value types, names, expected type names,
 *   etc.
 * @function module:errorThrowing.getErrorIfNotTypeThrower
 * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
 * @returns {Function|ErrorIfNotType} - Returns a function with the same signature as `errorIfNotType` though curried.
 */
getErrorIfNotTypeThrower = errorMessageCall => curry(_getErrorIfNotTypeThrower(errorMessageCall)),

/**
 * Returns a function that can be used to ensure that a value is of one or more given types.
 *   The returned function is used in cases where informative error messages
 *   containing the value types, names, expected type names, are-required/should-be-used etc.
 * @function module:errorThrowing.getErrorIfNotTypesThrower
 * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
 * @returns {Function|ErrorIfNotTypes} - Returns a function with the same signature as `errorIfNotTypes` though curried.
 */
getErrorIfNotTypesThrower = errorMessageCall => curry(_getErrorIfNotTypesThrower(errorMessageCall)),

/**
 * Checks that passed in `value` is of given `type`.  Throws an error if value
 * is not of given `type`.  Curried.
 * @function module:errorThrowing.errorIfNotType
 * @param type {String|Function} - Type's name or type itself.
 * @param contextName {String} - Name of context to attribute errors if thrown.
 * @param valueName {String} - String rep of value.
 * @param value {*}
 * @param [messageSuffix=null] {String} - Optional.
 * @returns {*} - Given `value` if `value` matches passed in type.
 * @curried
 */
errorIfNotType = curry(_errorIfNotType),

/**
 * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
 *  is not of one of the given `types`.  Curried.
 * @function module:errorThrowing.errorIfNotTypes
 * @param types {Array} - Array of one or more types or type names themselves.
 * @param contextName {String} - Name of context to attribute errors if thrown.
 * @param valueName {String} - String rep of value.
 * @param value {*}
 * @returns {*} - Given `value` if `value` matches passed in type.
 * @curried
 */
errorIfNotTypes = curry(_errorIfNotTypes);
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
 * @module object
 * @note Custom jsdoc type definitions defined toward end of file.
 */
/**
 * Creates `defineProps` and `defineEnumProps` methods based on `{enumerable}` param.
 * @param {{enumerable: Boolean}}
 * @returns {function(*, *)|PropsDefinerCall}
 * @private
 */

function createDefinePropsMethod({
  enumerable
}) {
  const operation = enumerable ? defineEnumProp : defineProp;
  return (argTuples, target) => {
    argTuples.forEach(argTuple => {
      const [TypeRef, propName, defaultValue] = argTuple;
      apply(operation, [TypeRef, target, propName, defaultValue]);
    });
    return target;
  };
}

const 
/**
 * Creates a descriptor for a property which is settable but throws
 * errors when the `Type` is disobeyed.
 * @function module:object.createTypedDescriptor
 * @param Type {TypeRef} - {String|Function}
 * @param target {*}
 * @param propName {String}
 * @returns {Descriptor} - Property descriptor with just getter and setter.
 */
createTypedDescriptor = (Type, target, propName) => {
  let _value;

  return {
    get: function () {
      return _value;
    },
    set: function (value) {
      _value = errorIfNotType(Type, propName, target, value);
    }
  };
},

/**
 * Returns a target-descriptor tuple whose 'descriptor' will be set to
 *  enumerable (`enumerable: true`).
 * @function module:object.toEnumerableDescriptor
 * @param {TargetDescriptorTuple} - [target, descriptor] tuple.
 * @returns {TargetDescriptorTuple} - Array of target and descriptor.
 */
toEnumerableDescriptor = ([target, descriptor]) => {
  descriptor.enumerable = true;
  return [target, descriptor];
},

/**
 * Returns an target and descriptor tuple from given.
 * @function module:object.toTargetDescriptorTuple
 * @param targetOrTargetDescriptorTuple {(*|Array<*, *>)} - Target object or tuple of target and descriptor.
 * @returns {(Array<*>|Array<*,*>)}
 */
toTargetDescriptorTuple = targetOrTargetDescriptorTuple => isType('Array', targetOrTargetDescriptorTuple) ? // Strict type check for array
targetOrTargetDescriptorTuple : [targetOrTargetDescriptorTuple],

/**
 * Allows you to define a "typed" property on given `target`.
 * @function module:object.defineProp
 * @param Type {TypeRef} - {String|Function}
 * @param target {TargetDescriptorTuple} - Target or array of target and descriptor ([target, descriptor]).
 * @param propName {String}
 * @param [defaultValue=undefined] {*}
 * @returns {TargetDescriptorTuple}
 */
defineProp = (Type, target, propName, defaultValue = undefined) => {
  const [_target, _descriptor] = toTargetDescriptorTuple(target),
        descriptor = _descriptor || createTypedDescriptor(Type, _target, propName);

  Object.defineProperty(_target, propName, descriptor);

  if (!isUndefined(defaultValue)) {
    _target[propName] = defaultValue;
  }

  return [_target, descriptor];
},

/**
 * Allows you to define a "typed", enumerated property on `target`.
 * @function module:object.defineEnumProp
 * @param Type {TypeRef} - {String|Function}
 * @param target {TargetDescriptorTuple} - Target or array of target and descriptor ([target, descriptor]).
 * @param propName {String}
 * @param [defaultValue=undefined] {*}
 * @returns {TargetDescriptorTuple}
 */
defineEnumProp = (Type, target, propName, defaultValue = undefined) => {
  const [_target, _descriptor] = toTargetDescriptorTuple(target),
        descriptor = _descriptor || createTypedDescriptor(Type, _target, propName);

  return defineProp(Type, toEnumerableDescriptor([_target, descriptor]), propName, defaultValue);
},

/**
 * Allows you to define multiple enum props at once on target.
 * @function module:object.defineEnumProps
 * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineEnumProp`.
 * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
 * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineEnumProp`.
 */
defineEnumProps = curry(createDefinePropsMethod({
  enumerable: true
})),

/**
 * Allows you to define multiple props at once on target.
 * @function module:object.defineProps
 * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineProp`.
 * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
 * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineProp`.
 * @curried
 */
defineProps = curry(createDefinePropsMethod({
  enumerable: false
}));
/** ============================================================= */

/** Type definitions:                                             */

/** ============================================================= */

/**
 * @typedef {*} Target
 */

/**
 * @typedef {Object} Descriptor
 */

/**
 * @typedef {Array<Target, Descriptor>} TargetDescriptorTuple
 */

/**
 * @typedef {Array.<TypeRef, TargetDescriptorTuple, String, *>}  DefinePropArgsTuple
 * @description Arguments list for `defineProp` and/or `defineEnumProp` (note: some
 *  parts of array/tuple are options (namely the last two args));  E.g.,
 *  ```
 *  [String, [someTarget], 'somePropName', 'someDefaultValue] // ...
 *  ```
 */

/**
 * @typedef {Function} PropsDefinerCall
 * @description Same type as `defineProp` and `defineEnumProp`
 * @param argsTuple {DefinePropArgsTuple}
 * @param target {Target}
 * @returns {Array.<TargetDescriptorTuple>}
 */

const 
/**
 * Merges all objects down into one (takes two or more args).
 * @function module:object.assignDeep
 * @param obj0 {Object}
 * @param [objs] {...{Object}} - One or more objects to merge onto `obj0`.
 * @returns {Object}
 */
assignDeep = curry2((obj0, ...objs) => !obj0 ? obj0 : objs.reduce((topAgg, obj) => !obj ? topAgg : keys(obj).reduce((agg, key) => {
  let propDescription = Object.getOwnPropertyDescriptor(agg, key); // If property is not writable move to next item in collection

  if (agg.hasOwnProperty(key) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
    return agg;
  }

  if (isObject(agg[key]) && isObject(obj[key])) {
    assignDeep(agg[key], obj[key]);
  } else {
    agg[key] = obj[key];
  }

  return agg;
}, topAgg), obj0));

/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length`)
 *      on both strings and arrays.
 */
const 
/**
 * Concats/appends all functors onto the end of first functor.
 * Note:  functors passed in after the first one must be of the same type.
 * @function module:jsPlatform.concat
 * @param functor {Array|Object|*}
 * @param ...functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have an `every` method.
 */
concat = fPureTakesOneOrMore('concat'),

/**
 * Same as Array.prototype.slice
 * @function module:list.slice
 * @param separator {String|RegExp}
 * @param arr{Array}
 * @returns {Array}
 */
slice = fPureTakes2('slice'),

/**
 * `Array.prototype.includes` or shim.
 * @function module:list.includes
 * @param value {*}
 * @param xs {Array|String}
 * @returns {Boolean}
 */
includes = (() => 'includes' in Array.prototype ? fPureTakesOne('includes') : (value, xs) => xs.indexOf(value) > -1)(),

/**
 * Searches list/list-like for given element `x`.
 * @function module:list.indexOf
 * @param x {*} - Element to search for.
 * @param xs {Array|String|*} - list or list like to look in.
 * @returns {Number} - `-1` if element not found else index at which it is found.
 */
indexOf = fPureTakesOne('indexOf'),

/**
 * Last index of (`Array.prototype.lastIndexOf`).
 * @function module:list.lastIndexOf
 * @param x {*} - Element to search for.
 * @param xs {Array|String|*} - list or list like to look in.
 * @returns {Number} - `-1` if element not found else index at which it is found.
 */
lastIndexOf = fPureTakesOne('lastIndexOf');

/**
 * @module boolean
 * @description Contains functional version of 'always-true', 'always-false', 'is-truthy', and 'is-falsy'.
 */
const 
/**
 * Returns whether `value` is 'truthy' or not
 * @function module:boolean.isTruthy
 * @param value
 * @returns {Boolean}
 */
isTruthy = value => !!value,

/**
 * Returns whether `value` is 'falsy' or not
 * @function module:boolean.isFalsy
 * @param value
 * @returns {Boolean}
 */
isFalsy = value => !value,

/**
 * Returns `true`.
 * @function module:boolean.alwaysTrue
 * @returns {Boolean}
 */
alwaysTrue = () => true,

/**
 * Returns `false`.
 * @function module:boolean.alwaysFalse
 * @returns {Boolean}
 */
alwaysFalse = () => false,

/**
 * Equality operator.
 * @function module:boolean.equal
 * @param a {*}
 * @param b {*}
 * @returns {boolean}
 */
equal = curry((a, b) => a === b),

/**
 * Equality operator for all.
 * @function module:boolean.equalAll
 * @param a {*} - Item `0`.
 * @param args {...*} - Others
 * @returns {boolean}
 */
equalAll = curry2((a, ...args) => args.every(b => equal(a, b)));

/**
 * Maps a function onto a List (string or array) or a functor (value containing a map method).
 * @function module:list.map
 * @param fn {Function} - Function to map on given value.
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */

const map$1 = curry((fn, xs) => {
  if (!isset(xs)) {
    return xs;
  }

  let out = of(xs),
      limit,
      i = 0;

  switch (typeOf(xs)) {
    case 'Array':
      limit = length(xs);

      if (!limit) {
        return out;
      }

      for (; i < limit; i += 1) {
        out.push(fn(xs[i], i, xs));
      }

      return out;

    case 'String':
      limit = length(xs);

      if (!xs) {
        return out;
      }

      for (; i < limit; i += 1) {
        out += fn(xs[i], i, xs);
      }

      return out;

    default:
      if (isFunctor(xs)) {
        return xs.map(fn);
      } // Other objects


      return Object.keys(xs).reduce((agg, key) => {
        out[key] = fn(xs[key], key, xs);
        return out;
      }, out);
  }
});

const 
/**
 * Pushes incoming `item` onto given array and returns said array.
 * @private
 * @param agg {Array}
 * @param item {*}
 * @returns {Array}
 */
aggregateArray = (agg, item) => {
  agg.push(item);
  return agg;
};

/**
 * List operator utils module.
 * @module listUtils
 */
const 
/**
 * Returns a slice of the given list from `startInd` to the end of the list.
 * @function module:listUtils.sliceFrom
 * @param startInd {Number}
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
sliceFrom = curry((startInd, xs) => slice(startInd, undefined, xs)),

/**
 * Slices from index `0` to given index.
 * @function module:listUtils.sliceTo
 * @param toInd {Number}
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
sliceTo = curry((toInd, xs) => slice(0, toInd, xs)),

/**
 * Slices a copy of list.
 * @function listUtils.sliceCopy
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
sliceCopy = sliceFrom(0),

/**
 * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
 * @function module:listUtils.genericAscOrdering
 * @param a {*}
 * @param b {*}
 * @returns {number}
 */
genericAscOrdering = curry((a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }

  return 0;
}),

/**
 * Returns length of all passed lists in list.
 * @function module:listUtils.lengths
 * @param lists ...{Array|String|*}
 * @returns {Array|String|*}
 */
lengths = curry2((...lists) => map$1(length, lists)),

/**
 * Returns a list of lists trimmed to the shortest length in given list of lists.   @background This method is used by the `zip*` functions to achieve their
 *  'slice to smallest' functionality.
 * @function module:listUtils.toShortest
 * @param lists {...(Array|String|*)}
 * @returns {Array|String|*}
 */
toShortest = curry2((...lists) => {
  const listLengths = apply(lengths, lists),
        smallLen = Math.min.apply(Math, listLengths);
  return map$1((list, ind) => listLengths[ind] > smallLen ? sliceTo(smallLen, list) : sliceCopy(list), lists);
}),

/**
 * Reduces until predicate.
 * @function module:listUtils.reduceUntil
 * @param pred {Function} - `(item, index, list) => Boolean(...)`
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {Array|String|*} - List.
 * @returns {*}
 */
reduceUntil = curry((pred, op, agg, xs) => {
  const limit = length(xs);

  if (!limit) {
    return agg;
  }

  let ind = 0,
      result = agg;

  for (; ind < limit; ind++) {
    if (pred(xs[ind], ind, xs)) {
      break;
    }

    result = op(result, xs[ind], ind, xs);
  }

  return result;
}),

/**
 * Reduces until predicate (from right to left).
 * @function module:listUtils.reduceUntilRight
 * @param pred {Function} - `(item, index, list) => Boolean(...)`
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {Array|String|*} - List.
 * @returns {*}
 */
reduceUntilRight = curry((pred, op, agg, arr) => {
  const limit = length(arr);

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
}),

/**
 * Reduces a list with given operation (`op`) function.
 * @function module:listUtils.reduce
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {Array|String|*} - List.
 * @returns {*}
 */
reduce$1 = reduceUntil(alwaysFalse),

/**
 * Reduces a list with given operation (`op`) function (from right-to-left).
 * @function module:listUtils.reduceRight
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {Array|String|*} - List.
 * @returns {*}
 */
reduceRight$1 = reduceUntilRight(alwaysFalse),

/**
 * Gets last index of a list/list-like (Array|String|Function etc.).
 * @function module:listUtils.lastIndex
 * @param x {Array|String|*} - list like or list.
 * @returns {Number} - `-1` if no element found.
 */
lastIndex = x => {
  const len = length(x);
  return len ? len - 1 : 0;
},

/**
 * Finds index in string or list.
 * @function module:listUtils.findIndexWhere
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {Array|String}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 */
findIndexWhere = curry((pred, arr) => {
  let ind = 0;
  const limit = length(arr);

  for (; ind < limit; ind += 1) {
    const predicateFulfilled = !!pred(arr[ind], ind, arr);

    if (predicateFulfilled) {
      return ind;
    }
  }

  return -1;
}),

/**
 * Finds index in list from right to left.
 * @function module:listUtils.findIndexWhereRight
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {Array|String}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 */
findIndexWhereRight = curry((pred, arr) => {
  let ind = length(arr) - 1;

  for (; ind >= 0; ind -= 1) {
    const predicateFulfilled = !!pred(arr[ind], ind, arr);

    if (predicateFulfilled) {
      return ind;
    }
  }

  return -1;
}),

/**
 * @function module:listUtils.findIndicesWhere
 * @param pred {Function}
 * @param xs {Array|String|*} - list or list like.
 * @returns {Array|undefined}
 */
findIndicesWhere = curry((pred, xs) => {
  const limit = length(xs);
  let ind = 0,
      out = [];

  for (; ind < limit; ind++) {
    if (pred(xs[ind], ind, xs)) {
      out.push(ind);
    }
  }

  return out.length ? out : undefined;
}),

/**
 * @function module:listUtils.findWhere
 * @param pred {Function}
 * @param xs {Array|String|*} - list or list like.
 * @returns {*}
 */
findWhere = curry((pred, xs) => {
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

  return undefined;
});

const objUnion = curry((obj1, obj2) => assignDeep(obj1, obj2)),
      objIntersect = curry((obj1, obj2) => reduce$1((agg, key) => {
  if (obj2.hasOwnProperty(key)) {
    agg[key] = obj2[key];
  }

  return agg;
}, {}, keys(obj1))),
      objDifference = curry((obj1, obj2) => reduce$1((agg, key) => {
  if (!obj2.hasOwnProperty(key)) {
    agg[key] = obj1[key];
  }

  return agg;
}, {}, keys(obj1))),
      objComplement = curry2((obj0, ...objs) => reduce$1((agg, obj) => assignDeep(agg, objDifference(obj, obj0)), {}, objs));

/**
 * @module console
 * @description Console exports.
 */
const 
/**
 * `Console.log` method.
 * @function module:console.log
 * @params args {...*}
 * @returns {void}
 */
log = console.log.bind(console),

/**
 * `Console.error` method.
 * @function module:console.error
 * @params args {...*}
 * @returns {void}
 */
error = console.error.bind(console),

/**
 * Peeks (console.log) at incoming value(s) and returns the last value.
 * @function module:console.peek
 * @param args {...*}
 * @returns {*} Last given value (if one or more values) else first value.
 */
peek = (...args) => (log(...args), args.pop()),

/**
 * `Console.warn`.
 * @function module:console.warn
 * @param args {...*}
 * @returns {void}
 */
warn = console.warn.bind(console);

const 
/**
 * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
 * @function module:object.jsonClone
 * @param x {*}
 * @returns {*}
 */
jsonClone = x => JSON.parse(JSON.stringify(x));

const 
/**
 * Returns an associated list from given object.
 * @note Useful for working with plain javascript objects.
 * @function module:object.toAssocList
 * @param obj {(Object|Array|*)}
 * @returns {Array.<*, *>}
 */
toAssocList = obj => keys(obj).map(key => [key, obj[key]]),

/**
 * Returns an associated list from given object (deeply (on incoming object's type)).
 * @note Does deep conversion on all values of passed in type's type.
 * @function module:object.toAssocListDeep
 * @param obj {*}
 * @param [TypeConstraint = Object] {(Constructor|Function)} - Type constraint to convert on.
 * @returns {*}
 */
toAssocListDeep = (obj, TypeConstraint = Object) => keys(obj).map(key => TypeConstraint && isType(TypeConstraint, obj[key]) ? [key, toAssocListDeep(obj[key], TypeConstraint)] : [key, obj[key]]),

/**
 * From associated list to object.
 * @function module:object.fromAssocList
 * @param xs {Array.<Array>} - Associated list.
 * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
 * @returns {*} - Default is `Object`
 */
fromAssocList = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
  agg[key] = value;
  return agg;
}, new OutType()),

/**
 * From associated list to object (deep conversion on associative lists (array of 2 value arrays)).
 * @note Considers array of arrays associated lists.
 * @function module:object.fromAssocListDeep
 * @param xs {Array.<Array>} - Associated list.
 * @param [OutType = Object] {Constructor|Function} - Output type.  Default `Object`.
 * @returns {*} - Default is `Object`
 */
fromAssocListDeep = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
  if (isArray(value) && isArray(value[0]) && value[0].length === 2) {
    agg[key] = fromAssocListDeep(value, OutType);
    return agg;
  }

  agg[key] = value;
  return agg;
}, new OutType());

const 
/**
 * Converts incoming value to an array.
 * @note For `WeakMap`, `WeakSet`, `Map` and `Set` result is the same as calling `Array.from` on such.
 * @note For `null`, `undefined`, `NaN`, `Number{}`, `Symbol{}`, `Boolean{}` returns an empty array.
 * @note Method does a shallow conversion;
 * @function module:object.toArray
 * @param x {*} - Thing to convert from.
 * @returns {Array}
 */
toArray = x => {
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

const compose = (...args) => arg0 => reduceRight((value, fn) => fn(value), arg0, args);

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

/**
 * @memberOf function
 */
const 
/**
 * Negates a function that takes one/no argument.
 * @function module:function.negateF
 * @param fn {Function}
 * @returns {function(*=): boolean}
 */
negateF = fn => x => !fn(x),

/**
 * Takes a function that takes two parameters and returns a negated version of given
 * function.
 * @function module:_negate.negateF2
 * @param fn {Function}
 * @returns {Function}
 */
negateF2 = fn => curry((a, b) => !fn(a, b)),

/**
 * Takes a function that takes three parameters and returns a
 * negated version of given function.
 * @function module:_negate.negateF3
 * @param fn {Function}
 * @returns {Function}
 */
negateF3 = fn => curry((a, b, c) => !fn(a, b, c)),

/**
 * Returns a negated version of given function.
 * Returned function is variadiac (takes one or more arguments).
 * @note function returned is uncurried.
 * @uncurried
 * @function module:function.negateFN
 * @param fn {Function}
 * @returns {Function}
 */
negateFN = fn => curry2((...args) => !apply(fn, args));

const 
/**
 * Run `operation` until predicate returns `true` (like a functional
 *  version of a while loop).
 * @function module:function.until
 * @param predicate {Function} :: a -> Boolean
 * @param operation {Function} :: a -> a
 * @param typeInstance {*} :: * - A monoidal zero or some starting point.
 * @returns {*} - What ever type `typeInstance` is
 */
until = curry((predicate, operation, typeInstance) => {
  let result = typeInstance;

  while (!predicate(result)) {
    result = operation(result);
  }

  return result;
});

const 
/**
 * Returns a function or throws an error if given `f` is not a function.
 * @function module:function.fnOrError
 * @param symbolName {String} - Error message prefix.
 * @param f {Function|*} - Expected function.
 * @returns {Function}
 * @throws {Error} - Error if `f` is not of `function`
 */
fnOrError = (symbolName, f) => {
  if (!f || !(f instanceof Function)) {
    throw new Error(`${symbolName} should be a function. ` + `Type received: ${typeOf(f)};  Value received: ${f}.`);
  }

  return f;
};

/**
 * No-op ('op' as in 'operation') - Performs no operation 'always' (good for places where
 * a value should always be a function etc.).
 * @function module:function.noop
 * @returns {undefined}
 */
const noop = () => undefined;

/**
 * Trampolines function calls in order to avoid stack overflow errors
 * on recursive function calls; Tail recursion replacement.
 * @example
 * // Instead of ... (which is prone to stack-overflow in
 * //   non-tail-call optimized environments (es5-es3))
 * const factorial = n => n > 1 ? n * factorial(n - 1) : 1;
 *
 * // We do
 * const
 *
 *  factorialProcess = (n, agg = 1) => {
 *      n > 1 ? () => factorialProcess(n - 1, agg * n) : agg,
 *  },
 *
 *  factorial = trampoline(factorialProcess)
 *  // will not overflow as we are performing tail call elimination
 *  // by returning thunks from factorial process which run in `while` loop
 *  // within `trampoline`.
 *
 *  ;
 *
 * @note function returned by trampoline is not curried (for convenience)!
 * @function module:function.trampoline
 * @param fn {Function} - Function to trampoline.
 * @param [fnName=undefined] {String} - Optionally restrict trampolining only to function with specific name.
 * @returns {*} - Finally returned value.
 */
const trampoline = (fn, fnName) => {
  return (...args) => {
    let result = fn.apply(null, args);

    while (typeof result === 'function' && (!fnName || result.name === fnName)) {
      result = result();
    }

    return result;
  };
};

const 
/**
 * If given value is not a function, wraps it an 'identity' function (function that returns given value untouched) else returns given value. (useful in
 * functional composition).
 * @function module:function.toFunction
 * @param x {Function|any}
 * @returns {function(): any}
 */
toFunction = x => isFunction(x) ? x : () => x;

/**
 * @module function
 */

/**
 * @module object
 */
/**
 * Normalizes step for `from` and `to` combination.
 * @function module:list.normalizeStep
 * @param from {Number}
 * @param to {Number}
 * @param [step = 1] {Number}
 * @returns {Number}
 * @private
 */

const normalizeStep = (from, to, step) => {
  if (from > to) {
    return step > 0 ? -step : step; // make step negative
  }

  return step < 0 ? -1 * step : step; // make step positive
};

const 
/**
 * Range function - gives you an array contain numbers in given range.
 * @note normalizes `step` to be valid if range numbers given are invalid
 *  (forces `step` to be negative if range required is in the negative direction
 *  and forces `step` to be positive if range required is in the other direction).
 * @function module:list.range
 * @param from {Number}
 * @param to {Number}
 * @param [step = 1] {Number}
 * @returns {Array.<Number>}
 */
range = curry((from, to, step = 1) => {
  let i = from;
  const out = [];
  step = normalizeStep(from, to, step);

  if (step === 0 || from === to) {
    return [from];
  }

  for (; (to - i) * step >= 0; i += step) {
    out.push(i);
  }

  return out;
});

/**
 * Created by elydelacruz on 9/6/2017.
 */
/**
 * Functional version of `String.prototype.split`.
 * @function module:jsPlatform.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */

const split = fPureTakesOne('split');

/**
 * @module jsPlatform
 */

var _jsPlatform = /*#__PURE__*/Object.freeze({
    instanceOf: instanceOf,
    hasOwnProperty: hasOwnProperty,
    length: length,
    native: native,
    keys: keys,
    assign: assign,
    map: map,
    filter: filter,
    reduce: reduce,
    reduceRight: reduceRight,
    forEach: forEach,
    some: some,
    every: every,
    join: join,
    push: push,
    reverse: reverse,
    concat: concat,
    slice: slice,
    includes: includes,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    split: split,
    apply: apply,
    call: call
});

/**
 * List operations module.
 * @module list
 */
const 
/**
 * Append two, or more, lists, i.e.,
 * @example
 * expectEqual(append(take(13, alphabetString), drop(13, alphabetString)), alphabetString); // true
 *
 * // Another example
 * const result = append(
 *   alphabetStr.split(''),
 *   alphabetStr.split('')
 * ),
 * expected = repeat(2, alphabetStr).split('');
 *
 * shallowEquals(result, expected) === true // `true`
 *
 * @function module:list.append
 * @param [args] {...(Array|String|*)} - One or more lists or list likes (strings etc.).
 * @returns {(Array|String|*)} - Same type as list like passed in.
 * @curried - Curried at upto 2 arguments.
 */
append = curry2((...args) => apply(concat, args)),

/**
 * Returns head of list (first item of list).
 * @haskellType `head :: [a] -> a`
 * @function module:list.head
 * @param x {Array|String}
 * @returns {*} - First item from list
 */
head = x => x[0],

/**
 * Returns last item of list.
 * @haskellType `last :: [a] -> a`
 * @function module:list.last
 * @param xs {Array|String}
 * @returns {*}
 */
last = xs => xs[lastIndex(xs)],

/**
 * Returns tail part of list (everything after the first item as new list).
 * @haskelType `tail :: [a] -> [a]`
 * @function module:list.tail
 * @param xs {Array|String}
 * @returns {Array|String}
 */
tail = xs => sliceFrom(1, xs),

/**
 * Returns everything except last item of list as new list.
 * @haskellType `init :: [a] -> [a]`
 * @function module:list.init
 * @param xs {Array|String}
 * @returns {Array|String}
 */
init = xs => sliceTo(lastIndex(xs), xs),

/**
 * Returns `head` and `tail` of passed in list/string in a tuple.
 * @haskellType `uncons :: [a] -> Maybe (a, [a])`
 * @function module:list.uncons
 * @param xs {Array|String}
 * @returns {Array|undefined}
 */
uncons = xs => !xs || length(xs) === 0 ? undefined : [head(xs), tail(xs)],

/**
 * Returns `tail` and `head` of passed in list/string in a tuple.
 * @haskellType `unconsr :: [a] -> Maybe ([a], a)`
 * @function module:list.unconsr
 * @param xs {Array|String}
 * @returns {Array|String|*|undefined}
 */
unconsr = xs => !xs || length(xs) === 0 ? undefined : [init(xs), last(xs)],

/**
 * Concatenates all the elements of a container of lists.
 * @haskellType `concat :: Foldable t => t [a] -> [a]`
 * @function module:list.concat
 * @param xs {Array}
 * @returns {Array}
 */
concat$1 = xs => {
  switch (length(xs)) {
    case undefined:
    case 0:
      return [];

    case 1:
      const item0 = xs[0];
      return item0 && item0.slice ? sliceCopy(item0) : item0;

    case 2:
    default:
      return apply(append, xs);
  }
},

/**
 * Map a function over all the elements of a container and concatenate the resulting lists.
 * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
 * @function module:list.concatMap
 * @param fn {Function}
 * @param foldableOfA {Array}
 * @returns {Array}
 */
concatMap = curry((fn, foldableOfA) => concat$1(map$1(fn, foldableOfA))),

/**
 * Returns a copy of the passed in list reverses.
 * @haskellType `reverse :: [a] -> [a]`
 * @function module:list.reverse
 * @param xs {Array|String}
 * @returns {Array|String}
 */
reverse$1 = xs => {
  if (!isset(xs) || !xs.length) {
    return xs;
  }

  let out = of(xs),
      i = xs.length - 1;

  switch (typeOf(xs)) {
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
},

/**
 * Takes an element and a list and `intersperses' that element between the
 *  elements of the list.
 * @function module:list.intersperse
 * @note In our version of the function javascript is loosely typed so,
 *  so is our function (to much overhead to make it typed) so `between` can be any value.
 * @param between {*} - Should be of the same type of elements contained in list.
 * @param arr {Array|String} - List.
 * @returns {Array|String}
 */
intersperse = curry((between, xs) => {
  if (!xs || !xs.length) {
    return xs;
  }

  const limit = xs.length,
        lastInd = limit - 1;
  let out = of(xs),
      i = 0;

  if (isString(xs)) {
    for (; i < limit; i += 1) {
      out += i === lastInd ? xs[i] : xs[i] + between;
    }

    return out;
  }

  for (; i < limit; i += 1) {
    if (i === lastInd) {
      out.push(xs[i]);
    } else {
      out.push(xs[i], between);
    }
  }

  return out;
}),

/**
 * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
 * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
 * @function module:list.intercalate
 * @param xs {Array|String}
 * @param xss {Array|String}
 * @returns {Array|String}
 */
intercalate = curry((xs, xss) => {
  if (isString(xss)) {
    return intersperse(xs, xss);
  }

  return concat$1(intersperse(xs, xss));
}),

/**
 * Transposes rows and columns into lists by index;  E.g.,
 * Haskell example:
 * ```
 *  transpose [[1,2,3],[4,5,6]] == [[1,4],[2,5],[3,6]]
 *
 *  -- Notice the shorter arrays are ignored after their last index is copied over:
 *  transpose [[10,11],[20],[],[30,31,32]] == [[10,20,30],[11,31],[32]]
 * ```
 * @note from columns to rows.
 * @note Empty lists are ignored.
 * @haskellType `transpose :: [[a]] -> [[a]]`
 * @function module:list.transpose
 * @param xss {Array}
 * @returns {Array}
 */
transpose = xss => {
  let numLists = length(xss),
      ind = 0,
      ind2;

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

  return filter$1(x => length(x) > 0, outLists);
},

/**
 * Generates 2^n sub-sequences for passed in sequence (string/list) (`n` is
 * the length of the passed in sequence so: 2^length(xs)).
 * Note: The return value doubles per index/character passed in so use with caution!
 *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
 *  will generate 65536 sub-sequences!  So caution should be taken to not
 *  use this with sequences above a certain length on certain platform (the browser thread in specific).
 * @function module:list.subsequences
 * @jsperftest https://jsperf.com/subsequences
 * @param xs {Array|String}
 * @returns {Array.<Array>}
 */
subsequences = xs => {
  const listLen = length(xs),
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
},

/**
 * Returns an array with the given indices swapped.
 * @function module:list.swapped
 * @param ind1 {Number}
 * @param ind2 {Number}
 * @param list {Array}
 * @returns {Array} - Copy of incoming with swapped values at indices.
 */
swapped = curry((ind1, ind2, list) => {
  const out = sliceCopy(list),
        tmp = out[ind1];
  out[ind1] = out[ind2];
  out[ind2] = tmp;
  return out;
}),

/**
 * Returns a list of permutations for passed in list.
 *  Use caution with lists above a length of 15 (will take long due to nature of
 *  algorithm).
 * @function module:list.permutations
 * @param xs {Array} - List.
 * @returns {Array<Array|String|*>} - Array of permutations.
 */
permutations = xs => {
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
},

/**
 * Left associative fold.  Reduces a container of elements down by the given operation (same as [].reduce).
 * @function module:list.foldl
 * @param fn {Function}
 * @param zero {*} - Aggregator.
 * @param functor {Array}
 * @returns {*} - Whatever type is lastly returned from `fn`.
 */
foldl = reduce$1,

/**
 * Right associative fold.  Reduces a container of elements down by the given operation (same as [].reduceRight).
 * @function module:list.foldr
 * @param fn {Function}
 * @param zero {*} - Aggregator.
 * @param functor {Array}
 * @returns {*} - Whatever type is lastly returned from `fn`.
 */
foldr = reduceRight$1,

/**
 * A variant of `foldl` except that this one doesn't require the starting point.  The starting point/value will be pulled
 * out from a copy of the container.
 * @function module:list.foldl1
 * @param op {Function}
 * @param xs {Array}
 * @returns {*} - Whatever type is lastly returned from `op`.
 */
foldl1 = curry((op, xs) => {
  const parts = uncons(xs);
  return !parts ? [] : reduce$1(op, parts[0], parts[1]);
}),

/**
 * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting point/value will be pulled
 * out from a copy of the container.
 * @function module:list.foldr1
 * @param op {Function}
 * @param xs {Array}
 * @returns {*} - Whatever type is lastly returned from `op`.
 */
foldr1 = curry((op, xs) => {
  const parts = unconsr(xs);
  return !parts ? [] : reduceRight$1(op, parts[1], parts[0]);
}),

/**
 * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
 * containing the aggregated value and the result of mapping the passed in function on passed in list.
 * @function module:list.mapAccumL
 * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
 * @param zero {*} - An instance of the passed in list type used to aggregateArray on.
 * @param xs {Array} - list type.
 * @return {Array} - [aggregated, list]
 */
mapAccumL = curry((op, zero, xs) => {
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
}),

/**
 * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
 * containing the aggregated value and the result of mapping the passed in function on passed in list.
 * @function module:list.mapAccumR
 * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
 * @param zero {*} - An instance of the passed in list type used to aggregateArray on.
 * @param xs {Array} - list type.
 * @return {Array} - [aggregated, list]
 */
mapAccumR = curry((op, zero, xs) => {
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
}),

/**
 * iterate f x returns an infinite list of repeated applications of f to x.
 * @function module:list.iterate
 * @example `iterate(5, f, x) == [x, f(x), f(f(x)), ...]`
 * @param limit {Number}
 * @param op {Function} - Operation.
 * @param x {*} - Starting point.
 * @returns {*}
 */
iterate = curry((limit, op, x) => {
  let ind = 0,
      out = [],
      lastX = x;

  for (; ind < limit; ind += 1) {
    out.push(lastX);
    lastX = op(lastX, ind);
  }

  return out;
}),

/**
 * Repeats `x` `limit` number of times.
 * @function module:list.repeat
 * @param limit {Number}
 * @param x {*}
 * @return {Array}
 */
repeat = curry((limit, x) => iterate(limit, a => a, x)),

/**
 * Same as `repeat` due to the nature of javascript (see haskell version for usage).
 * @function module:list.replicate
 * @param limit {Number}
 * @param x {*}
 * @return {Array}
 */
replicate = repeat,

/**
 * Replicates a list `limit` number of times and appends the results (concat)
 * @function module:list.cycle
 * @param limit {Number}
 * @param xs {Array}
 * @returns {Array}
 */
cycle = curry((limit, xs) => concat$1(replicate(limit, xs))),

/**
 * Unfolds a value into a list of somethings.
 * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
 * @function module:list.unfoldr
 * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregateArray and item to unfold in next iteration).
 * @param x {*} - Starting parameter to unfold from.
 * @returns {Array} - An array of whatever you return from `op` yielded.
 */
unfoldr = curry((op, x) => {
  let ind = 0,
      out = [],
      resultTuple = op(x, ind, out);

  while (resultTuple) {
    out.push(resultTuple[0]);
    resultTuple = op(resultTuple[1], ++ind, out);
  }

  return out;
}),

/**
 * Finds index in string or list (alias for `findIndex`).
 * @function module:list.findIndex
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {Array|String}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 */
findIndex = findIndexWhere,

/**
 * @function module:list.findIndices
 * @param pred {Function}
 * @param xs {Array} - list or list like.
 * @returns {Array|undefined}
 */
findIndices = findIndicesWhere,

/**
 * @function module:list.elemIndex
 * @param x {*} - Element to search for.
 * @param xs {Array} - list or list like.
 * @returns {*}
 */
elemIndex = curry((x, xs) => {
  const foundInd = indexOf(x, xs);
  return foundInd !== -1 ? foundInd : undefined;
}),

/**
 * @function module:list.elemIndices
 * @param value {*} - Element to search for.
 * @param xs {Array} - list or list like.
 * @returns {*}
 */
elemIndices = curry((value, xs) => findIndices(x => x === value, xs)),

/**
 * Takes `n` items from start of list to `limit` (exclusive).
 * @function module:list.take
 * @param list {Array|String}
 * @param limit {Number}
 * @returns {String|Array} - Passed in type's type
 */
take = sliceTo,

/**
 * Drops `n` items from start of list to `count` (exclusive).
 * @function module:list.drop
 * @param list {Array|String}
 * @param count {Number}
 * @returns {String|Array} - Passed in type's type
 */
drop = sliceFrom,

/**
 * Splits `x` in two at given `index` (exclusive (includes element/character at
 * given index in second part of returned list)).
 * @function module:list.splitAt
 * @param ind {Number} - Index to split at.
 * @param list {Array|String} - functor (list or string) to split.
 * @returns {Array|String} - List like type passed
 */
splitAt = (ind, list) => [sliceTo(ind, list), sliceFrom(ind, list)],

/**
 * Gives an list with passed elements while predicate was true.
 * @function module:list.takeWhile
 * @param pred {Function} - Predicate<*, index, list|string>
 * @param list {Array|String}
 * @returns {Array}
 */
takeWhile = curry((pred, list) => reduceUntil(negateF3(pred), // predicate
isString(list) ? (agg, x) => agg + x : aggregateArray, // operation
of(list), // aggregate
list)),

/**
 * Returns an list without elements that match predicate.
 * @function module:list.dropWhile
 * @param pred {Function} - Predicate<*, index, list|string>
 * @param list {Array|String}
 * @refactor
 * @returns {Array|String}
 */
dropWhile = curry((pred, list) => {
  const limit = length(list),
        splitPoint = findIndexWhere((x, i, xs) => !pred(x, i, xs), list);
  return splitPoint === -1 ? sliceFrom(limit, list) : slice(splitPoint, limit, list);
}),

/**
 * @function module:list.dropWhileEnd
 * @param pred {Function} - Predicate<*, index, list|string>
 * @param list {Array|String}
 * @refactor
 * @returns {Array|String}
 */
dropWhileEnd = curry((pred, list) => {
  const splitPoint = findIndexWhereRight((x, i, xs) => !pred(x, i, xs), list);

  if (splitPoint === -1) {
    return of(list);
  }

  return sliceTo(splitPoint + 1, list);
}),

/**
 * Gives you the `span` of items matching predicate
 * and items not matching predicate;  E.g., Gives an
 * array of arrays;  E.g., [[matching-items], [non-matching-items]]
 * @function list.span
 * @param pred {Function} - List predicate (`(x, i, list) => bool`)
 * @param list {Array|String}
 * @returns {(Array<Array<*>>|Array<String>)}
 * @type {Function}
 */
span = curry((pred, list) => {
  const splitPoint = findIndexWhere(negateF3(pred), list);
  return splitPoint === -1 ? [sliceFrom(0, list), of(list)] : splitAt(splitPoint, list);
}),

/**
 * breakOnList, applied to a predicate p and a list xs, returns a tuple
 * where first element is longest prefix (possibly empty) of xs of elements
 * that do not satisfy p and second element is the remainder of the list:
 * @haskellExample
 * Replace `break` with `breakOnList` for our version.
 * ```
 * breakOnList (> 3) [1,2,3,4,1,2,3,4] == ([1,2,3],[4,1,2,3,4])
 * breakOnList (< 9) [1,2,3] == ([],[1,2,3])
 * breakOnList (> 9) [1,2,3] == ([1,2,3],[])
 * ```
 * @function module:list.breakOnList
 * @param pred {Function}
 * @param list {Array|String|*}
 * @returns {Array}
 */
breakOnList = curry((pred, list) => {
  const splitPoint = findIndexWhere(negateF3(pred), list);
  return splitPoint === -1 ? [of(list), sliceFrom(0, list)] : reverse$1(splitAt(splitPoint, list));
}),

/**
 * Gets item at index.
 * @function module:list.at
 * @param ind {Number} - Index.
 * @param xs {Array} - list or list like.
 * @returns {*|undefined} - Item or `undefined`.
 */
at = lookup,

/**
 * Find an item in structure of elements based on given predicate (`pred`).
 * @function module:list.find
 * @param pred {Function}
 * @param xs {Array} - list or list like.
 * @returns {*} - Found item.
 */
find = findWhere,

/**
 * For each function (same as `[].forEach` except in functional format).
 * @function module:list.forEach
 * @param fn {Function} - Operation (`(element, index, list) => {...}`, etc.)
 * @param xs {(Array|String)}
 * @returns {void}
 */
forEach$1 = curry((fn, list) => {
  const limit = length(list);

  if (!limit) {
    return;
  }

  let ind = 0;

  for (; ind < limit; ind += 1) {
    fn(list[ind], ind, list);
  }
}),

/**
 * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
 * @function module:list.filter
 * @param pred {Function}
 * @param xs {Array} - list or list like.
 * @returns {Array} - Structure of filtered elements.
 */
filter$1 = curry((pred, xs) => {
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
}),

/**
 * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
 * do not match the tuple are in second list in the returned tuple.
 *  Essentially `[filter(p, xs), filter(negateF3(p), xs)]`.
 * @function module:list.partition
 * @param pred {Function} - Predicate<item, index, originalArrayOrString>
 * @param list {Array}
 * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
 */
partition = curry((pred, list) => !length(list) ? [[], []] : [filter$1(pred, list), filter$1(negateF3(pred), list)]),

/**
 * Returns a boolean indicating whether an element exists in given structure of elements.
 * @function module:list.elem
 * @param element {*}
 * @param xs {Array}
 * @returns {Boolean}
 */
elem = includes,

/**
 * The opposite of `elem` - Returns a boolean indicating whether an element exists in given list.
 * @function module:list.notElem
 * @param element {*}
 * @param xs {Array}
 * @returns {Boolean}
 */
notElem = negateF2(includes),

/**
 * Checks if list `xs1` is a prefix of list `xs2`
 * @function module:list.isPrefixOf
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @returns {boolean}
 */
isPrefixOf = curry((xs1, xs2) => {
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
}),

/**
 * Checks if list `xs1` is a suffix of list `xs2`
 * @function module:list.isSuffixOf
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @returns {boolean}
 */
isSuffixOf = curry((xs1, xs2) => {
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
}),

/**
 * Checks if list `xs1` is an infix of list `xs2`
 * @function module:list.isInfixOf
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @returns {boolean}
 */
isInfixOf = curry((xs1, xs2) => {
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
}),

/**
 * Checks if list `xs1` is a sub-sequence of list `xs2`
 * @function module:list.isSubsequenceOf
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @returns {boolean}
 */
isSubsequenceOf = curry((xs1, xs2) => {
  const len = Math.pow(2, length(xs2)),
        lenXs1 = length(xs1);
  let foundLen, i;

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
}),

/**
 * The group function takes a list and returns a list of lists such that
 *  the concatenation of the result is equal to the argument. Moreover, each
 *  sublist in the result contains only equal elements. For example,
 * `group "Mississippi" = ["M","i","ss","i","ss","i","pp","i"]`
 * It is a special case of groupBy, which allows the programmer to supply
 *  their own equality test.
 * @haskellType `group :: Eq a => [a] -> [[a]]`
 * @function module:list.group
 * @param xs {Array|String}
 * @returns {Array<Array|String|*>|*}
 */
group = xs => groupBy((a, b) => a === b, xs),

/**
 * Allows you to group items in a list based on your supplied equality check.
 * @note Sames `group` but allows you to specify equality operation.
 * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
 * @function module:list.groupBy
 * @param equalityOp {Function}
 * @param xs {Array}
 * @returns {*}
 */
groupBy = curry((equalityOp, xs) => {
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
}),

/**
 * The inits function returns all initial segments of the argument, shortest first. For example,
 * ```
 * shallowEquals(inits('abc'), ['','a','ab','abc'])
 * ```
 * @function module:list.inits
 * @haskellType `inits :: [a] -> [[a]]`
 * @param xs {Array}
 * @returns {Array}
 */
inits = xs => {
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
},
      //map(list => init(list), xs),

/**
 * The inits function returns all initial segments of the argument, shortest first. For example,
 * ```
 * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
 * ```
 * @function module:list.tails
 * @haskellType `tails :: [a] -> [[a]]`
 * @param xs {Array}
 * @returns {Array}
 */
tails = xs => {
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
},
      //map(list => tail(list), xs),

/**
 * Strips prefix list from given list
 * @function module:list.stripPrefix
 * @param prefix {Array|String|*}
 * @param list {Array|string|*}
 * @returns {Array|*}
 */
stripPrefix = curry((prefix, list) => isPrefixOf(prefix, list) ? splitAt(length(prefix), list)[1] : sliceCopy(list)),

/**
 * zip takes two lists and returns a list of corresponding pairs.
 * If one input list is short, excess elements of the longer list are discarded.
 * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
 * @function module:list.zip
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @returns {Array<Array<*,*>>}
 */
zip = curry((arr1, arr2) => {
  if (!length(arr1) || !length(arr2)) {
    return [];
  }

  const [a1, a2] = toShortest(arr1, arr2);
  return reduce$1((agg, item, ind) => aggregateArray(agg, [item, a2[ind]]), [], a1);
}),

/**
 * zipN takes one or more lists and returns a list containing lists of all indices
 * at a given index, index by index.
 * If one input list is short, excess elements of the longer list are discarded.
 * @function module:list.zipN
 * @param lists {Array|String} - One ore more lists of the same type.
 * @returns {Array}
 */
zipN = curry2((...lists) => {
  const trimmedLists = apply(toShortest, lists);
  return reduce$1((agg, item, ind) => aggregateArray(agg, map$1(xs => xs[ind], trimmedLists)), [], trimmedLists[0]);
}),

/**
 * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
 * @function module:list.zip3
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @param arr3 {Array}
 * @returns {Array<Array<*,*>>}
 */
zip3 = curry((arr1, arr2, arr3) => zipN(arr1, arr2, arr3)),

/**
 * @haskellType `zip4 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
 * @function module:list.zip4
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @param arr3 {Array}
 * @param arr4 {Array}
 * @returns {Array<Array<*,*>>}
 */
zip4 = curry((arr1, arr2, arr3, arr4) => zipN(arr1, arr2, arr3, arr4)),

/**
 * @haskellType `zip5 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
 * @function module:list.zip5
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @param arr3 {Array}
 * @param arr4 {Array}
 * @param arr5 {Array}
 * @returns {Array<Array<*,*>>}
 */
zip5 = curry((arr1, arr2, arr3, arr4, arr5) => zipN(arr1, arr2, arr3, arr4, arr5)),

/**
 * zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
 * zipWith generalises zip by zipping with the function given as the
 * first argument, instead of a function tupling function (function that returns a tuple). For example,
 * zipWith (+) is applied to two lists to produce the list of corresponding sums.
 * @note `_|_` means bottom or perpetual (@see
 *  - https://wiki.haskell.org/Bottom
 *  - https://stackoverflow.com/questions/19794681/what-does-this-syntax-mean-in-haskell-or
 *  )
 * @example
 * ```
 * zipWith f [] _|_ = []
 * ```
 * @haskellType `zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]`
 * @function module:list.zipWith
 * @param op {Function} - Takes two parts of a tuple and returns a tuple.
 *  E.g., ` op :: a -> b -> (a, b)`
 * @param xs1 {Array}
 * @param xs2 {Array}
 * @returns {Array<Array<*,*>>}
 */
zipWith = curry((op, xs1, xs2) => {
  if (!length(xs1) || !length(xs2)) {
    return [];
  }

  const [a1, a2] = toShortest(xs1, xs2);
  return reduce$1((agg, item, ind) => aggregateArray(agg, op(item, a2[ind])), [], a1);
}),

/**
 * Zips all given lists with tupling function. Note: Haskell types do not have
 *  a way (that I know of) to show one or more for params in a function so `@haskellType` below
 *  is left there for general purpose not for exactness as is told by aforementioned.
 * @haskellType `zipWithN :: (a -> b -> c) -> [a] -> [b] -> [c]` - Where `N` is the number
 *  of lists to zip.
 * @function module:list.zipWithN
 * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
 *  of said parts:
 *  E.g., ` op :: a -> b -> c -> (a, b, c)`
 * @param lists ...{Array}
 * @returns {Array<Array<*,*>>}
 */
zipWithN = curry3((op, ...lists) => {
  const trimmedLists = apply(toShortest, lists),
        lenOfTrimmed = length(trimmedLists);

  if (!lenOfTrimmed) {
    return [];
  } else if (lenOfTrimmed === 1) {
    return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
  }

  return reduce$1((agg, item, ind) => aggregateArray(agg, apply(op, map$1(xs => xs[ind], trimmedLists))), [], trimmedLists[0]);
}),

/**
 * Zips 3 lists with tupling function.
 * @haskellType `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
 * @function module:list.zipWith3
 * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
 *  of said parts:
 *  E.g., ` op :: a -> b -> c -> (a, b, c)`
 * @param xs1 {Array}
 * @param xs2 {Array}
 * @param xs3 {Array}
 * @returns {Array<Array<*,*>>}
 */
zipWith3 = curry((op, xs1, xs2, xs3) => zipWithN(op, xs1, xs2, xs3)),

/**
 * Zips 4 lists with tupling function.
 * @haskellType `zipWith4 :: (a -> b -> c -> d -> e) -> [a] -> [b] -> [c]  -> [d] -> [e]`
 * @function module:list.zipWith4
 * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
 *  of said parts:
 *  E.g., ` op :: a -> b -> c -> d -> (a, b, c, d)`
 * @param xs1 {Array}
 * @param xs2 {Array}
 * @param xs3 {Array}
 * @param xs4 {Array}
 * @returns {Array<Array<*,*>>}
 */
zipWith4 = curry((op, xs1, xs2, xs3, xs4) => zipWithN(op, xs1, xs2, xs3, xs4)),

/**
 * Zips 5 lists.
 * @haskellType `zipWith5 :: (a -> b -> c -> d -> e -> f) -> [a] -> [b] -> [c]  -> [d] -> [e] -> [f]`
 * @function module:list.zipWith5
 * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
 *  of said parts:
 *  E.g., ` op :: a -> b -> c -> d -> e -> (a, b, c, d, e)`
 * @param xs1 {Array}
 * @param xs2 {Array}
 * @param xs3 {Array}
 * @param xs4 {Array}
 * @param xs5 {Array}
 * @returns {Array<Array<*,*>>}
 */
zipWith5 = curry((op, xs1, xs2, xs3, xs4, xs5) => zipWithN(op, xs1, xs2, xs3, xs4, xs5)),

/**
 * unzip transforms a list of pairs into a list of first components and a list of second components.
 * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
 * @function module:list.unzip
 * @param arr {Array|*}
 * @returns {Array|*}
 */
unzip = foldl((agg, item) => {
  agg[0].push(item[0]);
  agg[1].push(item[1]);
  return agg;
}, [[], []]),

/**
 * unzip transforms a list of pairs into a list of first components and a list of second components.
 * @sudoHaskellType `unzipN :: [(a, b, ...x)] -> ([a], [b], ...[x])`
 * @function module:list.unzipN
 * @param list {Array|*} - List of tuples (lists).
 * @returns {Array|*}
 */
unzipN = list => {
  if (!length(list)) {
    return [];
  }

  const lenItem0 = length(list[0]);
  let zero = lenItem0 ? unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) : [];
  return foldl((agg, item) => {
    agg.forEach((outList, ind) => outList.push(item[ind]));
    return agg;
  }, zero, list);
},

/**
 * Returns true if any item in container passes predicate `p`.
 * @function module:list.any
 * @param p {Function} - Predicate.
 * @param xs {Array|String}
 * @returns {Boolean}
 */
any = curry((p, xs) => {
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
}),

/**
 * Returns true if all items in container pass predicate `p`.
 * @function module:list.all
 * @param p {Function} - Predicate.
 * @param xs {Array|String}
 * @returns {Boolean}
 */
all = curry((p, xs) => {
  const limit = length(xs);
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
}),

/**
 * Conjuction of container of bools (or truthy and/or falsy values);  Returns
 * `true` if all in container are 'truthy' else returns `false`
 * @function module:list.and
 * @param xs {Array|String}
 * @returns {Boolean}
 */
and = xs => all(isTruthy, xs),

/**
 * Returns a boolean indicating whether any item in container is 'truthy' or not.
 * **Note** The haskell type for this function only takes two items, but here
 * we allow the passing of more than one item (may change later to adhere to the haskell type).
 * @function module:list.or
 * @haskellType `or :: Bool -> Bool -> Bool`
 * @param xs {Array|String}
 * @returns {Boolean}
 */
or = xs => any(isTruthy, xs),

/**
 * Returns a boolean indicating whether all items in container are 'falsy' or not.
 * **Note** The haskell type for this function only takes two items, but here
 * we allow the passing of more than one item (may change later to adhere to the haskell type).
 * @function module:list.not
 * @haskellType `not :: Bool -> Bool`
 * @param xs {Array|String}
 * @returns {Boolean}
 */
not = xs => all(isFalsy, xs),

/**
 * Computes the sum of the numbers of a structure.
 * @function module:list.sum
 * @haskellType `sum :: (List t, Num a) => t a -> a`
 * @param list {Array|String}
 * @returns {Number}
 */
sum = list => foldl((agg, x) => agg + x, 0, list),

/**
 * Computes the product of the numbers of a structure.
 * @function module:list.product
 * @haskellType `product :: (List t, Num a) => t a -> a`
 * @param list {Array|String}
 * @returns {Number}
 */
product = list => foldl((agg, x) => agg * x, 1, list),

/**
 * Returns the largest element in a non-empty structure of elements.
 * @function module:list.maximum
 * @haskellType `maximum :: forall a . Ord a => t a -> a`
 * @param list {Array|String}
 * @returns {*} - Whatever type the array is made of (if any).
 */
maximum = list => last(sortBy(genericAscOrdering, list)),

/**
 * Returns the smallest element in a non-empty structure of elements.
 * @function module:list.minimum
 * @haskellType `minimum :: forall a . Ord a => t a -> a`
 * @param list {Array|String}
 * @returns {*} - Whatever type the array is made of (if any).
 */
minimum = list => head(sortBy(genericAscOrdering, list)),

/**
 * scanl is similar to foldl, but returns a list of successive reduced values from the left:
 * ```
 * scanl f z [x1, x2, ...] == [z, z `f` x1, (z `f` x1) `f` x2, ...]
 * ```
 * Also note that:
 * ```
 * last (scanl f z xs) == foldl f z xs.
 * ```
 * @function module:list.scanl
 * @param fn {Function}
 * @param zero {*}
 * @param xs {Array}
 * @returns {Array|*}
 */
scanl = curry((fn, zero, xs) => {
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
}),

/**
 * `scanl1` is a variant of `scanl` that has no starting value argument:
 * `shallowCompare(scanl1(fn, [x1, x2, ...]), [x1, fn(x1, x2), ...]) // true`
 * @function module:list.scanl1
 * @param fn {Function}
 * @param xs {Array}
 * @returns {Array|*}
 */
scanl1 = curry((fn, xs) => {
  if (!xs || !xs.length) {
    return [];
  }

  return scanl(fn, head(xs), tail(xs));
}),

/**
 * Same as `scanl` but from the right (similiar to `foldr`'s relationship to 'foldl').
 * Note also `scanr`'s relationship ot `foldr`:
 * `head (scanr(fn, z, xs)) === foldr(fn, z, xs).
 * @function module:list.scanr
 * @param fn {Function}
 * @param zero {*}
 * @param xs {Array}
 * @returns {Array|*}
 */
scanr = curry((fn, zero, xs) => {
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
}),

/**
 * Same as `scanr` but takes no zero/accumulator value.
 * @function module:list.scanr1
 * @param fn {Function}
 * @param xs {Array}
 * @returns {Array|*}
 */
scanr1 = curry((fn, xs) => {
  if (!xs || !xs.length) {
    return [];
  }

  return scanr(fn, last(xs), init(xs));
}),

/**
 * The nub function removes duplicate elements from a list.
 * In particular, it keeps only the first occurrence of each element.
 * (The name nub means `essence'.) It is a special case of nubBy, which
 * allows the programmer to supply their own equality test.
 * ```shallowCompare( nub ([1,2,3,4,3,2,1,2,4,3,5]), [1,2,3,4,5] )```
 * @function module:list.nub
 * @param list {Array|String|*}
 * @returns {Array}
 */
nub = list => nubBy((a, b) => a === b, list),

/**
 * `remove(x, xs)` removes the first occurrence of `x` from `xs`.
 * For example, `remove('a', 'banana') === 'bnana';`
 * @function module:list.remove
 * @param x {*}
 * @param list {Array|String|*}
 * @returns {Array}
 */
remove = curry((x, list) => removeBy((a, b) => a === b, x, list)),

/**
 * The sort function implements a stable sorting algorithm.
 * It is a special case of sortBy, which allows the programmer
 * to supply their own comparison function.
 * ```shallowCompare(sort ([1,6,4,3,2,5]), [1,2,3,4,5,6]) // true```
 * @function module:list.sort
 * @param xs {Array|String|*}
 * @returns {Array}
 */
sort = xs => sortBy(genericAscOrdering, xs),

/**
 * Sort a list by comparing the results of a key function applied to each
 * element. sortOn f is equivalent to sortBy (comparing f), but has the
 * performance advantage of only evaluating f once for each element in the
 * input list. This is called the decorate-sort-undecorate paradigm, or
 * Schwartzian transform.
 *
 * Elements are arranged from from lowest to highest, keeping duplicates
 * in the order they appeared in the input.
 *
 * Ex:
 * ```
 * shallowEquals(
 *  sortOn (head, [[2, "world"], [4, "!"], [1, "Hello"]]),
 *  [[1,"Hello"],[2,"world"],[4,"!"]]
 * ) // true
 * ```
 * @function module:list.sortOn
 * @param valueFn {Function}
 * @param xs {Array|String|*}
 * @returns {Array}
 */
sortOn = curry((valueFn, xs) => // Un-decorate
map$1(decorated => decorated[1], // Decorate and sort
sortBy( // Ordering
([a0], [b0]) => genericAscOrdering(a0, b0), // Decorate
map$1(item => [valueFn(item), item], xs)))),

/**
 * The sortBy function is the non-overloaded (in haskell terms) version of sort.
 * @haskellExample ```
 *  >>> sortBy (\(a,_) (b,_) -> compare a b) [(2, "world"), (4, "!"), (1, "Hello")]
 *  [(1,"Hello"),(2,"world"),(4,"!")]
 * ```
 * @function module:list.sortBy
 * @param orderingFn {Function}
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
sortBy = curry((orderingFn, xs) => sliceCopy(xs).sort(orderingFn || genericAscOrdering)),

/**
 * The insert function takes an element and a list and inserts the element
 * into the list at the first position where it is less than or equal to the
 * next element. In particular, if the list is sorted before the call, the
 * result will also be sorted. It is a special case of insertBy, which allows
 * the programmer to supply their own comparison function.
 * @function module:list.insert
 * @param x {*}
 * @param xs {Array|*}
 * @returns {Array}
 */
insert = curry((x, xs) => {
  if (!xs.length) {
    return of(xs, x);
  }

  const foundIndex = findIndex(item => x <= item, xs);
  return foundIndex === -1 ? concat$1([xs, of(xs, x)]) : concat$1(intersperse(of(xs, x), splitAt(foundIndex, xs)));
}),

/**
 * A version of `insert` that allows you to specify the ordering of the inserted
 * item;  Before/at, or after
 * @function module:list.insertBy
 * @haskellType `insertBy :: (a -> a -> Ordering) -> a -> [a] -> [a]`
 * @note `Ordering` means 'something that is order-able'
 *  operated on by this functions logic.
 * @param orderingFn {Function} - A function that returns `-1`, `0`, or 1`.
 * @param x {*} - Value to insert.
 * @param xs {Array} - List to insert into (note new list is returned)
 * @returns {Array} - New list.
 */
insertBy = curry((orderingFn, x, xs) => {
  const limit = length(xs);

  if (!limit) {
    return [x];
  }

  let ind = 0;

  for (; ind < limit; ind += 1) {
    if (orderingFn(x, xs[ind]) <= 0) {
      const parts = splitAt(ind, xs);
      return concat$1([parts[0], [x], parts[1]]);
    }
  }

  return aggregateArray(sliceCopy(xs), x);
}),

/**
 * The nubBy function behaves just like nub, except it uses a user-supplied equality predicate.
 * @function module:list.nubBy
 * @param pred {Function}
 * @param list {Array|String|*}
 * @returns {Array}
 */
nubBy = curry((pred, list) => {
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
}),

/**
 * Behaves the same as `remove`, but takes a user-supplied equality predicate.
 * @function module:list.removeBy
 * @param pred {Function} - Equality predicate `(a, b) => bool`
 * @param x {*}
 * @param list {Array|String|*}
 * @returns {Array}
 */
removeBy = curry((pred, x, list) => {
  const foundIndex = findIndex(item => pred(x, item), list);

  if (foundIndex > -1) {
    const parts = splitAt(foundIndex, list);
    return append(parts[0], tail(parts[1]));
  }

  return sliceCopy(list);
}),

/**
 * The `removeFirstsBy` function takes a predicate and two lists and returns the first list with the first
 * occurrence of each element of the second list removed.
 * @function module:list.removeFirstBy
 * @param pred {Function}
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @returns {Array}
 */
removeFirstsBy = curry((pred, xs1, xs2) => foldl((agg, x) => removeBy(pred, x, agg), xs1, xs2)),

/**
 * Returns the union on elements matching boolean check passed in.
 * @function module:list.unionBy
 * @param pred {Function} - `pred :: a -> a -> Bool`
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @returns {Array}
 */
unionBy = curry((pred, arr1, arr2) => foldl((agg, b) => {
  const alreadyAdded = any(a => pred(a, b), agg);
  return !alreadyAdded ? (agg.push(b), agg) : agg;
}, sliceCopy(arr1), arr2)),

/**
 * Creates a union on matching elements from array1.
 * @function module:list.union
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @returns {Array}
 */
union = curry((arr1, arr2) => append(arr1, filter$1(elm => !includes(elm, arr1), arr2))),

/**
 * Performs an intersection on list 1 with  elements from list 2.
 * @function module:list.intersect
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @returns {Array}
 */
intersect = curry((arr1, arr2) => !arr1 || !arr2 || !arr1 && !arr2 ? [] : filter$1(elm => includes(elm, arr2), arr1)),

/**
 * Returns an intersection by predicate.
 * @function module:list.intersectBy
 * @param pred {Function} - `pred :: a -> b -> Bool`
 * @param list1 {Array}
 * @param list2 {Array}
 * @return {Array}
 */
intersectBy = curry((pred, list1, list2) => foldl((agg, a) => any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg, [], list1)),

/**
 * Returns the difference of list 1 from list 2.
 * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
 * @function module:list.difference
 * @param array1 {Array}
 * @param array2 {Array}
 * @returns {Array}
 */
difference = curry((array1, array2) => {
  // augment this with max length and min length ordering on op
  if (array1 && !array2) {
    return sliceCopy(array1);
  } else if (!array1 && array2 || !array1 && !array2) {
    return [];
  }

  return reduce$1((agg, elm) => !includes(elm, array2) ? (agg.push(elm), agg) : agg, [], array1);
}),

/**
 * Returns the complement of list 0 and the reset of the passed in arrays.
 * @function module:list.complement
 * @param arr0 {Array}
 * @param arrays {...Array}
 * @returns {Array}
 */
complement = curry2((arr0, ...arrays) => reduce$1((agg, arr) => append(agg, difference(arr, arr0)), [], arrays));

/**
 * @module string
 * @description Contains functions for strings.
 */
const 
/**
 * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
 * @function module:string.lines
 * @param str {String}
 * @returns {Array}
 */
lines = split(/[\n\r]/gm),

/**
 * Splits a string on all '\s' and/or all '\t' characters.
 * @function module:string.words
 * @param str{String}
 * @returns {Array}
 */
words = split(/[\s\t]/gm),

/**
 * Intersperse an array of strings with '\s' and then concats them.
 * @function module:string.unwords
 * @param arr {String}
 * @returns {Array}
 */
unwords = intercalate(' '),

/**
 * Intersperses a '\n' character into a list of strings and then concats it.
 * @function module:string.unlines
 * @param list {Array|String|*}
 * @returns {Array}
 */
unlines = intercalate('\n'),

/**
 * Lower cases first character of a non-empty string.
 * @function module:string.lcaseFirst
 * @param xs {String}
 * @returns {string}
 * @throws {Error} - Throws error if receiving anything that is not a string.
 */
lcaseFirst = xs => {
  _errorIfNotType(String, 'lcaseFirst', 'xs', xs);

  return xs[0].toLowerCase() + xs.substring(1);
},

/**
 * Upper cases first character of a non-empty string.
 * @function module:string.ucaseFirst
 * @param xs {String}
 * @returns {string}
 * @throws {Error} - Throws error if receiving anything that is not a string.
 */
ucaseFirst = xs => {
  _errorIfNotType(String, 'ucaseFirst', 'xs', xs);

  return xs[0].toUpperCase() + xs.substring(1);
},

/**
 * Camel cases (class case) a string.
 * @function module:string.camelCase
 * @param xs {String}
 * @param [pattern=/[^a-z\d/i]/] {RegExp} - Pattern to split on.  Optional.
 * @throws {Error} - Throws error if param `xs` is not a string.
 * @returns {string}
 * @curried
 */
camelCase = (xs, pattern = /[^a-z\d]/i) => compose(join(''), map$1(str => ucaseFirst(str.toLowerCase())), filter$1(x => !!x), split(pattern))(_errorIfNotType(String, 'camelCase', 'xs', xs)),

/**
 * Class cases a string.  Uses pattern /[^a-z\d/i]/ to split on.
 * If you require a different pattern use `string.camelCase(str, pattern)`
 * and then upper case first character (`ucaseFirst`).
 * @function module:string.classCase
 * @param xs {String}
 * @returns {string}
 * @throws {Error} - Throws error if `xs` is not a string (via `camelCase` call).
 */
classCase = compose(ucaseFirst, camelCase);
/**
 * Functional version of `String.prototype.split`.
 * @function module:string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */

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
const jsPlatform = _jsPlatform;
/**
 * @typedef {String|Function|ArrayBufferConstructor|ArrayConstructor|BooleanConstructor|MapConstructor|NumberConstructor|SetConstructor|WeakMapConstructor|WeakSetConstructor} TypeRef
 * @description Type reference.  Either actual type or type's name;  E.g., `Type.name`
 * Also note: Class cased names are use for values that do not have `name` properties;  Namely: 'Null', 'NaN' and 'Undefined' (for their respective values respectively).
 */

export { _errorIfNotType, _errorIfNotTypes, _getErrorIfNotTypeThrower, _getErrorIfNotTypesThrower, aggregateArray, all, alwaysFalse, alwaysTrue, and, any, append, apply, assign, assignDeep, at, breakOnList, call, camelCase, classCase, complement, compose, concat$1 as concat, concatMap, copy, createTypedDescriptor, curry, curry2, curry3, curry4, curry5, curryN, cycle, defaultErrorMessageCall, defineEnumProp, defineEnumProps, defineProp, defineProps, difference, drop, dropWhile, dropWhileEnd, elem, elemIndex, elemIndices, equal, equalAll, error, errorIfNotType, errorIfNotTypes, fPureTakes2, fPureTakes3, fPureTakes4, fPureTakes5, fPureTakesOne, fPureTakesOneOrMore, filter$1 as filter, find, findIndex, findIndexWhere, findIndexWhereRight, findIndices, findIndicesWhere, findWhere, flip, flip3, flip4, flip5, flipN, fnOrError, foldl, foldl1, foldr, foldr1, forEach$1 as forEach, fromAssocList, fromAssocListDeep, genericAscOrdering, getErrorIfNotTypeThrower, getErrorIfNotTypesThrower, group, groupBy, hasOwnProperty, head, id, includes, indexOf, init, inits, insert, insertBy, instanceOf, instanceOfOne, intercalate, intersect, intersectBy, intersperse, isArray, isBoolean, isCallable, isClass, isEmpty, isEmptyCollection, isEmptyList, isEmptyObject, isFalsy, isFunction, isFunctor, isInfixOf, isLoosely, isLooselyOneOf, isMap, isNull, isNumber, isObject, isOfType, isOneOf, isPrefixOf, isSet, isStrictly, isStrictlyOneOf, isString, isSubsequenceOf, isSuffixOf, isSymbol, isTruthy, isType, isUndefined, isUsableImmutablePrimitive, isWeakMap, isWeakSet, isset, iterate, jsPlatform, jsonClone, keys, last, lastIndex, lastIndexOf, lcaseFirst, length, lengths, lines, log, lookup, map$1 as map, mapAccumL, mapAccumR, maximum, minimum, native, negateF, negateF2, negateF3, negateFN, noop, not, notElem, nub, nubBy, objComplement, objDifference, objIntersect, objUnion, of, or, partition, peek, permutations, product, push, range, reduce$1 as reduce, reduceRight$1 as reduceRight, reduceUntil, reduceUntilRight, remove, removeBy, removeFirstsBy, repeat, replicate, reverse$1 as reverse, scanl, scanl1, scanr, scanr1, searchObj, slice, sliceCopy, sliceFrom, sliceTo, sort, sortBy, sortOn, span, split, splitAt, stripPrefix, subsequences, sum, swapped, tail, tails, take, takeWhile, toArray, toAssocList, toAssocListDeep, toEnumerableDescriptor, toFunction, toShortest, toTargetDescriptorTuple, toTypeRef, toTypeRefName, toTypeRefNames, toTypeRefs, trampoline, transpose, typeOf, typeRefsToStringOrError, ucaseFirst, uncons, unconsr, unfoldr, union, unionBy, unlines, until, unwords, unzip, unzipN, warn, words, zip, zip3, zip4, zip5, zipN, zipWith, zipWith3, zipWith4, zipWith5, zipWithN };
//# sourceMappingURL=fjl.mjs.map
