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
const returnCurried = (executeArity, unmetArityNum, fn, argsToCurry) => {
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
};
const executeAsCurriedFunc = (fn, executeArity, unmetArity, args, argsToCurry) => {
  let concatedArgs = argsToCurry.concat(args),
      canBeCalled = concatedArgs.length >= executeArity || !executeArity,
      newExpectedArity = executeArity - concatedArgs.length;
  return !canBeCalled ? returnCurried(executeArity, newExpectedArity, fn, concatedArgs) : fn(...concatedArgs);
};

const curryN = (executeArity, fn, ...argsToCurry) => {
  if (!fn || !(fn instanceof Function)) {
    throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\` though received ${fn}?`);
  }

  return returnCurried(executeArity, executeArity - argsToCurry.length, fn, argsToCurry);
};
const curry = (fn, ...argsToCurry) => curryN((fn || {}).length, fn, ...argsToCurry);
const curry2 = fn => curryN(2, fn);
const curry3 = fn => curryN(3, fn);
const curry4 = fn => curryN(4, fn);
const curry5 = fn => curryN(5, fn);

/**
 * @module utils
 */
const fPureTakesOne = name => curry((arg, f) => f[name](arg));
const fPureTakes2 = name => curry((arg1, arg2, f) => f[name](arg1, arg2));
const fPureTakes3 = name => curry((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3));
const fPureTakes4 = name => curry((arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4));
const fPureTakes5 = name => curry((arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5));
const fPureTakesOneOrMore = name => curry2((f, ...args) => f[name](...args));

/**
 * Created by elyde on 7/20/2017.
 * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
 * @module _jsPlatform_arrayOps
 * @private
 */
const defineReverse = () => Array.prototype.reverse ? x => x.reverse() : x => x.reduceRight((agg, item) => {
  agg.push(item);
  return agg;
}, []);
const map = fPureTakesOne('map');
const filter = fPureTakesOne('filter');
const reduce = fPureTakes2('reduce');
const reduceRight = fPureTakes2('reduceRight');
const forEach = fPureTakesOne('forEach');
const some = fPureTakesOne('some');
const every = fPureTakesOne('every');
const join = fPureTakesOne('join');
const push = fPureTakesOneOrMore('push');
const reverse = defineReverse();

/**
 * Created by elydelacruz on 9/7/2017.
 * @memberOf function
 */

const apply = curry((fn, args) => fn.apply(null, args));
const call = curry2((fn, ...args) => fn.call(null, ...args));

const flipN = fn => curry2((...args) => apply(fn, reverse(args)));
const flip = fn => curry((b, a) => call(fn, a, b));
const flip3 = fn => curry((c, b, a) => call(fn, a, b, c));
const flip4 = fn => curry((d, c, b, a) => call(fn, a, b, c, d));
const flip5 = fn => curry((e, d, c, b, a) => call(fn, a, b, c, d, e));

/**
 * @memberOf object
 * @description Defines some of the platform methods for objects (the ones used within `fjl`).
 */
const instanceOf = curry((instanceConstructor, instance) => instance instanceof instanceConstructor);
const hasOwnProperty = fPureTakesOne('hasOwnProperty');
const length = x => x.length;
const native = Object.getOwnPropertyNames(Object).reduce((agg, key) => {
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
}, {});
const {
  keys
} = native;
const assign = (() => Object.assign ? (obj0, ...objs) => Object.assign(obj0, ...objs) : curry2((obj0, ...objs) => objs.reduce((topAgg, obj) => {
  return Object.keys(obj).reduce((agg, key) => {
    agg[key] = obj[key];
    return agg;
  }, topAgg);
}, obj0)))();

/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
 */
const _Number$1 = Number.name;
const _NaN$1 = 'NaN';
const _Null$1 = 'Null';
const _Undefined$1 = 'Undefined';
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
    retVal = _Undefined$1;
  } else if (value === null) {
    retVal = _Null$1;
  } else {
    let constructorName = value.constructor.name;
    retVal = constructorName === _Number$1 && isNaN(value) ? _NaN$1 : constructorName;
  }

  return retVal;
}

/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
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
let _NaN = 'NaN';
const toTypeRef = type => {
  if (!type) {
    return typeOf(type);
  } else if (type.constructor === String || type instanceof Function) {
    return type;
  }

  return typeOf(type);
};
const toTypeRefs = (...types) => types.map(toTypeRef);
const toTypeRefName = Type => {
  const ref = toTypeRef(Type);
  return ref instanceof Function ? ref.name : ref;
};
const toTypeRefNames = (...types) => types.map(toTypeRefName);
const isFunction = instanceOf(Function);
const isType = curry((type, obj) => typeOf(obj) === toTypeRefName(type));
const isOfType = curry((type, x) => isType(type, x) || instanceOf(type, x));
const isClass = x => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
const isCallable = x => isFunction(x) && !isClass(x);
const {
  isArray
} = Array;
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
const isUsableImmutablePrimitive = x => {
  const typeOfX = typeOf(x);
  return isset(x) && [_String, _Number, _Boolean, _Symbol].some(Type => Type === typeOfX);
};
const isEmptyList = x => !length(x);
const isEmptyObject = obj => isEmptyList(keys(obj));
const isEmptyCollection = x => x.size === 0;
const isEmpty = value => {
  if (!value) {
    // if '', 0, `null`, `undefined`, or `false` then is empty
    return true;
  }

  switch (typeOf(value)) {
    case _Array:
    case _Function:
      return !value.length;

    case _Number:
      // zero and NaN checks happened above so `if number` then it's 'not-an-empty-number' (lol)
      return false;

    case _Object:
      return !keys(value).length;

    case _Map:
    case _Set:
    case _WeakSet:
    case _WeakMap:
      return !value.size;

    case _NaN:
      return true;

    default:
      return !value;
  }
};
const isset = x => x !== null && x !== undefined;
const isOneOf = (x, ...types) => {
  const typeName = typeOf(x);
  return toTypeRefNames(types).some(name => typeName === name);
};
const isFunctor = x => x && x.map && instanceOf(Function, x.map);

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

const copy = (x, out) => {
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

const searchObj = curry((nsString, obj) => {
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

const assignDeep = curry2((obj0, ...objs) => !obj0 ? obj0 : objs.reduce((topAgg, obj) => !obj ? topAgg : keys(obj).reduce((agg, key) => {
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
 *      @memberOf list
 */
const concat = fPureTakesOneOrMore('concat');
const slice = fPureTakes2('slice');
const includes = (() => 'includes' in Array.prototype ? fPureTakesOne('includes') : (value, xs) => xs.indexOf(value) > -1)();
const indexOf = fPureTakesOne('indexOf');
const lastIndexOf = fPureTakesOne('lastIndexOf');

/**
 * @module boolean
 * @description Contains functional version of 'always-true', 'always-false', 'is-truthy', and 'is-falsy'.
 */
const isTruthy = value => !!value;
const isFalsy = value => !value;
const alwaysTrue = () => true;
const alwaysFalse = () => false;
const equal = curry((a, b) => a === b);
const equalAll = curry2((a, ...args) => args.every(b => equal(a, b)));

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

const aggregateArray = (agg, item) => {
  agg.push(item);
  return agg;
};

/**
 * List operator utils module.
 * @module listUtils
 */
const sliceFrom = curry((startInd, xs) => slice(startInd, undefined, xs));
const sliceTo = curry((toInd, xs) => slice(0, toInd, xs));
const sliceCopy = sliceFrom(0);
const genericAscOrdering = curry((a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }

  return 0;
});
const lengths = curry2((...lists) => map$1(length, lists));
const toShortest = curry2((...lists) => {
  const listLengths = apply(lengths, lists),
        smallLen = Math.min.apply(Math, listLengths);
  return map$1((list, ind) => listLengths[ind] > smallLen ? sliceTo(smallLen, list) : sliceCopy(list), lists);
});
const reduceUntil = curry((pred, op, agg, xs) => {
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
});
const reduceUntilRight = curry((pred, op, agg, arr) => {
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
});
const reduce$1 = reduceUntil(alwaysFalse);
const reduceRight$1 = reduceUntilRight(alwaysFalse);
const lastIndex = x => {
  const len = length(x);
  return len ? len - 1 : 0;
};
const findIndexWhere = curry((pred, arr) => {
  let ind = 0;
  const limit = length(arr);

  for (; ind < limit; ind += 1) {
    const predicateFulfilled = !!pred(arr[ind], ind, arr);

    if (predicateFulfilled) {
      return ind;
    }
  }

  return -1;
});
const findIndexWhereRight = curry((pred, arr) => {
  let ind = length(arr) - 1;

  for (; ind >= 0; ind -= 1) {
    const predicateFulfilled = !!pred(arr[ind], ind, arr);

    if (predicateFulfilled) {
      return ind;
    }
  }

  return -1;
});
const findIndicesWhere = curry((pred, xs) => {
  const limit = length(xs);
  let ind = 0,
      out = [];

  for (; ind < limit; ind++) {
    if (pred(xs[ind], ind, xs)) {
      out.push(ind);
    }
  }

  return out.length ? out : undefined;
});
const findWhere = curry((pred, xs) => {
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
});

const objUnion = curry((obj1, obj2) => assignDeep(obj1, obj2));
const objIntersect = curry((obj1, obj2) => reduce$1((agg, key) => {
  if (obj2.hasOwnProperty(key)) {
    agg[key] = obj2[key];
  }

  return agg;
}, {}, keys(obj1)));
const objDifference = curry((obj1, obj2) => reduce$1((agg, key) => {
  if (!obj2.hasOwnProperty(key)) {
    agg[key] = obj1[key];
  }

  return agg;
}, {}, keys(obj1)));
const objComplement = curry2((obj0, ...objs) => reduce$1((agg, obj) => assignDeep(agg, objDifference(obj, obj0)), {}, objs));

/**
 * @module console
 * @description Console exports.
 */
const log = console.log.bind(console);
const error = console.error.bind(console);
const peek = (...args) => (log(...args), args.pop());

const jsonClone = x => JSON.parse(JSON.stringify(x));

const toAssocList = obj => keys(obj).map(key => [key, obj[key]]);
const toAssocListDeep = (obj, TypeConstraint = Object) => keys(obj).map(key => TypeConstraint && isType(TypeConstraint, obj[key]) ? [key, toAssocListDeep(obj[key], TypeConstraint)] : [key, obj[key]]);
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
const negateF = fn => x => !fn(x);
const negateF2 = fn => curry((a, b) => !fn(a, b));
const negateF3 = fn => curry((a, b, c) => !fn(a, b, c));
const negateFN = fn => curry2((...args) => !apply(fn, args));

const until = curry((predicate, operation, typeInstance) => {
  let result = typeInstance;

  while (!predicate(result)) {
    result = operation(result);
  }

  return result;
});

const fnOrError = (symbolName, f) => {
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

const range = curry((from, to, step = 1) => {
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
 * List operations module.
 * @module list
 */
const append = curry2((...args) => apply(concat, args));
const head = x => x[0];
const last = xs => xs[lastIndex(xs)];
const tail = xs => sliceFrom(1, xs);
const init = xs => sliceTo(lastIndex(xs), xs);
const uncons = xs => !xs || length(xs) === 0 ? undefined : [head(xs), tail(xs)];
const unconsr = xs => !xs || length(xs) === 0 ? undefined : [init(xs), last(xs)];
const concat$1 = xs => {
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
};
const concatMap = curry((fn, foldableOfA) => concat$1(map$1(fn, foldableOfA)));
const reverse$1 = xs => {
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
};
const intersperse = curry((between, xs) => {
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
});
const intercalate = curry((xs, xss) => {
  if (isString(xss)) {
    return intersperse(xs, xss);
  }

  return concat$1(intersperse(xs, xss));
});
const transpose = xss => {
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
};
const subsequences = xs => {
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
const foldl = reduce$1;
const foldr = reduceRight$1;
const foldl1 = curry((op, xs) => {
  const parts = uncons(xs);
  return !parts ? [] : reduce$1(op, parts[0], parts[1]);
});
const foldr1 = curry((op, xs) => {
  const parts = unconsr(xs);
  return !parts ? [] : reduceRight$1(op, parts[1], parts[0]);
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
const cycle = curry((limit, xs) => concat$1(replicate(limit, xs)));
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
const splitAt = (ind, list) => [sliceTo(ind, list), sliceFrom(ind, list)];
const takeWhile = curry((pred, list) => reduceUntil(negateF3(pred), // predicate
isString(list) ? (agg, x) => agg + x : aggregateArray, // operation
of(list), // aggregate
list));
const dropWhile = curry((pred, list) => {
  const limit = length(list),
        splitPoint = findIndexWhere((x, i, xs) => !pred(x, i, xs), list);
  return splitPoint === -1 ? sliceFrom(limit, list) : slice(splitPoint, limit, list);
});
const dropWhileEnd = curry((pred, list) => {
  const splitPoint = findIndexWhereRight((x, i, xs) => !pred(x, i, xs), list);

  if (splitPoint === -1) {
    return of(list);
  }

  return sliceTo(splitPoint + 1, list);
});
const span = curry((pred, list) => {
  const splitPoint = findIndexWhere(negateF3(pred), list);
  return splitPoint === -1 ? [sliceFrom(0, list), of(list)] : splitAt(splitPoint, list);
});
const breakOnList = curry((pred, list) => {
  const splitPoint = findIndexWhere(negateF3(pred), list);
  return splitPoint === -1 ? [of(list), sliceFrom(0, list)] : reverse$1(splitAt(splitPoint, list));
});
const at = lookup;
const find = findWhere;
const forEach$1 = curry((fn, list) => {
  const limit = length(list);

  if (!limit) {
    return;
  }

  let ind = 0;

  for (; ind < limit; ind += 1) {
    fn(list[ind], ind, list);
  }
});
const filter$1 = curry((pred, xs) => {
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
const partition = curry((pred, list) => !length(list) ? [[], []] : [filter$1(pred, list), filter$1(negateF3(pred), list)]);
const elem = includes;
const notElem = negateF2(includes);
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
const stripPrefix = curry((prefix, list) => isPrefixOf(prefix, list) ? splitAt(length(prefix), list)[1] : sliceCopy(list));
const zip = curry((arr1, arr2) => {
  if (!length(arr1) || !length(arr2)) {
    return [];
  }

  const [a1, a2] = toShortest(arr1, arr2);
  return reduce$1((agg, item, ind) => aggregateArray(agg, [item, a2[ind]]), [], a1);
});
const zipN = curry2((...lists) => {
  const trimmedLists = apply(toShortest, lists);
  return reduce$1((agg, item, ind) => aggregateArray(agg, map$1(xs => xs[ind], trimmedLists)), [], trimmedLists[0]);
});
const zip3 = curry((arr1, arr2, arr3) => zipN(arr1, arr2, arr3));
const zip4 = curry((arr1, arr2, arr3, arr4) => zipN(arr1, arr2, arr3, arr4));
const zip5 = curry((arr1, arr2, arr3, arr4, arr5) => zipN(arr1, arr2, arr3, arr4, arr5));
const zipWith = curry((op, xs1, xs2) => {
  if (!length(xs1) || !length(xs2)) {
    return [];
  }

  const [a1, a2] = toShortest(xs1, xs2);
  return reduce$1((agg, item, ind) => aggregateArray(agg, op(item, a2[ind])), [], a1);
});
const zipWithN = curry3((op, ...lists) => {
  const trimmedLists = apply(toShortest, lists),
        lenOfTrimmed = length(trimmedLists);

  if (!lenOfTrimmed) {
    return [];
  } else if (lenOfTrimmed === 1) {
    return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
  }

  return reduce$1((agg, item, ind) => aggregateArray(agg, apply(op, map$1(xs => xs[ind], trimmedLists))), [], trimmedLists[0]);
});
const zipWith3 = curry((op, xs1, xs2, xs3) => zipWithN(op, xs1, xs2, xs3));
const zipWith4 = curry((op, xs1, xs2, xs3, xs4) => zipWithN(op, xs1, xs2, xs3, xs4));
const zipWith5 = curry((op, xs1, xs2, xs3, xs4, xs5) => zipWithN(op, xs1, xs2, xs3, xs4, xs5));
const unzip = foldl((agg, item) => {
  agg[0].push(item[0]);
  agg[1].push(item[1]);
  return agg;
}, [[], []]);
const unzipN = list => {
  if (!length(list)) {
    return [];
  }

  const lenItem0 = length(list[0]);
  let zero = lenItem0 ? unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) : [];
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

  if (!limit) {
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
  if (!xs || !xs.length) {
    return [];
  }

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
  if (!xs || !xs.length) {
    return [];
  }

  return scanr(fn, last(xs), init(xs));
});
const nub = list => nubBy((a, b) => a === b, list);
const remove = curry((x, list) => removeBy((a, b) => a === b, x, list));
const sort = xs => sortBy(genericAscOrdering, xs);
const sortOn = curry((valueFn, xs) => // Un-decorate
map$1(decorated => decorated[1], // Decorate and sort
sortBy( // Ordering
([a0], [b0]) => genericAscOrdering(a0, b0), // Decorate
map$1(item => [valueFn(item), item], xs))));
const sortBy = curry((orderingFn, xs) => sliceCopy(xs).sort(orderingFn || genericAscOrdering));
const insert = curry((x, xs) => {
  if (!xs.length) {
    return of(xs, x);
  }

  const foundIndex = findIndex(item => x <= item, xs);
  return foundIndex === -1 ? concat$1([xs, of(xs, x)]) : concat$1(intersperse(of(xs, x), splitAt(foundIndex, xs)));
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
      return concat$1([parts[0], [x], parts[1]]);
    }
  }

  return aggregateArray(sliceCopy(xs), x);
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
const removeBy = curry((pred, x, list) => {
  const foundIndex = findIndex(item => pred(x, item), list);

  if (foundIndex > -1) {
    const parts = splitAt(foundIndex, list);
    return append(parts[0], tail(parts[1]));
  }

  return sliceCopy(list);
});
const removeFirstsBy = curry((pred, xs1, xs2) => foldl((agg, x) => removeBy(pred, x, agg), xs1, xs2));
const unionBy = curry((pred, arr1, arr2) => foldl((agg, b) => {
  const alreadyAdded = any(a => pred(a, b), agg);
  return !alreadyAdded ? (agg.push(b), agg) : agg;
}, sliceCopy(arr1), arr2));
const union = curry((arr1, arr2) => append(arr1, filter$1(elm => !includes(elm, arr1), arr2)));
const intersect = curry((arr1, arr2) => !arr1 || !arr2 || !arr1 && !arr2 ? [] : filter$1(elm => includes(elm, arr2), arr1));
const intersectBy = curry((pred, list1, list2) => foldl((agg, a) => any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg, [], list1));
const difference = curry((array1, array2) => {
  // augment this with max length and min length ordering on op
  if (array1 && !array2) {
    return sliceCopy(array1);
  } else if (!array1 && array2 || !array1 && !array2) {
    return [];
  }

  return reduce$1((agg, elm) => !includes(elm, array2) ? (agg.push(elm), agg) : agg, [], array1);
});
const complement = curry2((arr0, ...arrays) => reduce$1((agg, arr) => append(agg, difference(arr, arr0)), [], arrays));

/**
 * @module errorThrowing
 * @description Contains error throwing facilities for when a value doesn't match a type.
 */
const typeRefsToStringOrError = types => types.length ? types.map(type => `\`${toTypeRefName(type)}\``).join(', ') : '';
const defaultErrorMessageCall = tmplContext => {
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
};
const _getErrorIfNotTypeThrower = (errorMessageCall, typeChecker = isOfType) => (ValueType, contextName, valueName, value, messageSuffix = null) => {
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
};
const _getErrorIfNotTypesThrower = (errorMessageCall, typeChecker = isOfType) => (valueTypes, contextName, valueName, value, messageSuffix = null) => {
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
};
const _errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall);
const _errorIfNotTypes = _getErrorIfNotTypesThrower(defaultErrorMessageCall);
const getErrorIfNotTypeThrower = errorMessageCall => curry(_getErrorIfNotTypeThrower(errorMessageCall));
const getErrorIfNotTypesThrower = errorMessageCall => curry(_getErrorIfNotTypesThrower(errorMessageCall));
const errorIfNotType = curry(_errorIfNotType);
const errorIfNotTypes = curry(_errorIfNotTypes);
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
 * @module string
 * @description Contains functions for strings.
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
const camelCase = (xs, pattern = /[^a-z\d]/i) => compose(join(''), map$1(str => ucaseFirst(str.toLowerCase())), filter$1(x => !!x), split(pattern))(_errorIfNotType(String, 'camelCase', 'xs', xs));
const classCase = compose(ucaseFirst, camelCase);
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

export { instanceOf, hasOwnProperty, length, native, keys, assign, lookup, typeOf, copy, toTypeRef, toTypeRefs, toTypeRefName, toTypeRefNames, isFunction, isType, isOfType, isClass, isCallable, isArray, isObject, isBoolean, isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined, isNull, isSymbol, isUsableImmutablePrimitive, isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, isset, isOneOf, isFunctor, of, searchObj, assignDeep, objUnion, objIntersect, objDifference, objComplement, log, error, peek, jsonClone, toArray, toAssocList, toAssocListDeep, fromAssocList, fromAssocListDeep, isTruthy, isFalsy, alwaysTrue, alwaysFalse, equal, equalAll, apply, call, compose, curryN, curry, curry2, curry3, curry4, curry5, flipN, flip, flip3, flip4, flip5, id, negateF, negateF2, negateF3, negateFN, until, fnOrError, noop, map$1 as map, append, head, last, tail, init, uncons, unconsr, concat$1 as concat, concatMap, reverse$1 as reverse, intersperse, intercalate, transpose, subsequences, swapped, permutations, foldl, foldr, foldl1, foldr1, mapAccumL, mapAccumR, iterate, repeat, replicate, cycle, unfoldr, findIndex, findIndices, elemIndex, elemIndices, take, drop, splitAt, takeWhile, dropWhile, dropWhileEnd, span, breakOnList, at, find, forEach$1 as forEach, filter$1 as filter, partition, elem, notElem, isPrefixOf, isSuffixOf, isInfixOf, isSubsequenceOf, group, groupBy, inits, tails, stripPrefix, zip, zipN, zip3, zip4, zip5, zipWith, zipWithN, zipWith3, zipWith4, zipWith5, unzip, unzipN, any, all, and, or, not, sum, product, maximum, minimum, scanl, scanl1, scanr, scanr1, nub, remove, sort, sortOn, sortBy, insert, insertBy, nubBy, removeBy, removeFirstsBy, unionBy, union, intersect, intersectBy, difference, complement, slice, includes, indexOf, lastIndexOf, push, range, sliceFrom, sliceTo, sliceCopy, genericAscOrdering, lengths, toShortest, reduceUntil, reduceUntilRight, reduce$1 as reduce, reduceRight$1 as reduceRight, lastIndex, findIndexWhere, findIndexWhereRight, findIndicesWhere, findWhere, aggregateArray, split, lines, words, unwords, unlines, lcaseFirst, ucaseFirst, camelCase, classCase, fPureTakesOne, fPureTakes2, fPureTakes3, fPureTakes4, fPureTakes5, fPureTakesOneOrMore, typeRefsToStringOrError, defaultErrorMessageCall, _getErrorIfNotTypeThrower, _getErrorIfNotTypesThrower, _errorIfNotType, _errorIfNotTypes, getErrorIfNotTypeThrower, getErrorIfNotTypesThrower, errorIfNotType, errorIfNotTypes };
//# sourceMappingURL=fjl.js.map
