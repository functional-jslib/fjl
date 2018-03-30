var fjl = (function (exports) {
'use strict';

/**
 * Created by elyde on 12/18/2016.
 * @memberOf _objectOps
 */
var _Number = Number.name;
var _NaN = 'NaN';
var _Null = 'Null';
var _Undefined = 'Undefined';

/**
 * Returns the constructor/class/type name of a value.
 * @note Returns 'NaN' if value is of type `Number` and value is `isNaN`.
 * @note Returns 'Undefined' if value is `undefined`
 * @note Returns 'Null' if value is `null`
 * For values that have no concrete constructors and/or casters
 * (null, NaN, and undefined) we returned normalized names for them ('Null', 'NaN', 'Number')
 * @function module:_objectOps.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name or derived name (in the case of `null`, `undefined`, or `NaN` (whose
 *  normalized names are 'Null', 'Undefined', 'NaN' respectively).
 */
function typeOf(value) {
    var retVal = void 0;
    if (value === undefined) {
        retVal = _Undefined;
    } else if (value === null) {
        retVal = _Null;
    } else {
        var constructorName = value.constructor.name;
        retVal = constructorName === _Number && isNaN(value) ? _NaN : constructorName;
    }
    return retVal;
}

var fPureTakesOne = function fPureTakesOne(name) {
    return function (arg, f) {
        return f[name](arg);
    };
};
var fPureTakes2 = function fPureTakes2(name) {
    return function (arg1, arg2, f) {
        return f[name](arg1, arg2);
    };
};
var fPureTakes3 = function fPureTakes3(name) {
    return function (arg1, arg2, arg3, f) {
        return f[name](arg1, arg2, arg3);
    };
};
var fPureTakes4 = function fPureTakes4(name) {
    return function (arg1, arg2, arg3, arg4, f) {
        return f[name](arg1, arg2, arg3, arg4);
    };
};
var fPureTakes5 = function fPureTakes5(name) {
    return function (arg1, arg2, arg3, arg4, arg5, f) {
        return f[name](arg1, arg2, arg3, arg4, arg5);
    };
};
var fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return f[name].apply(f, args);
    };
};
var fnOrError = function fnOrError(symbolName, f) {
    if (!f || f.constructor !== Function) {
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

var instanceOf$1 = function instanceOf(instanceConstructor, instance) {
    return instance instanceof instanceConstructor;
};
var hasOwnProperty$1 = fPureTakesOne('hasOwnProperty');
var length = function length(x) {
    return x.length;
};
var keys = function keys(obj) {
    return Object.keys(obj);
};
var assign$1 = function () {
    return Object.assign ? function (obj0) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }

        return Object.assign.apply(Object, [obj0].concat(objs));
    } : function (obj0) {
        for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            objs[_key2 - 1] = arguments[_key2];
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

var defineReverse = function defineReverse() {
  return Array.prototype.reverse ? function (x) {
    return x.reverse();
  } : function (x) {
    return x.reduceRight(function (agg, item) {
      agg.push(item);
      return agg;
    }, []);
  };
};
var map = fPureTakesOne('map');
var filter = fPureTakesOne('filter');
var reduce = fPureTakes2('reduce');
var reduceRight = fPureTakes2('reduceRight');
var forEach = fPureTakesOne('forEach');
var some = fPureTakesOne('some');
var every = fPureTakesOne('every');
var join = fPureTakesOne('join');
var push = fPureTakesOneOrMore('push');
var reverse = defineReverse();

/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length`)
 *      on both strings and arrays.
 */

var concat = fPureTakesOneOrMore('concat');
var slice = fPureTakes2('slice');
var includes = function () {
  return 'includes' in Array.prototype ? fPureTakesOne('includes') : function (value, xs) {
    return xs.indexOf(value) > -1;
  };
}();
var indexOf = fPureTakesOne('indexOf');
var lastIndexOf = fPureTakesOne('lastIndexOf');

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
var split = fPureTakesOne('split');

/**
 * Created by elydelacruz on 9/7/2017.
 * @module _jsPlatform_function
 * @private
 */
var apply = function apply(fn, args) {
  return fn.apply(null, args);
};
var call = function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
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
var notFnErrPrefix = '`fn` in `curry(fn, ...args)`';

var curry = function curry(fn) {
    for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        argsToCurry[_key - 1] = arguments[_key];
    }

    return curryN.apply(undefined, [fnOrError(notFnErrPrefix, fn).length, fn].concat(argsToCurry));
};
var curryN = function curryN(executeArity, fn) {
    for (var _len2 = arguments.length, curriedArgs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        curriedArgs[_key2 - 2] = arguments[_key2];
    }

    return function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        var concatedArgs = concat(curriedArgs, args),
            canBeCalled = length(concatedArgs) >= executeArity || !executeArity;
        return !canBeCalled ? apply(curryN, concat([executeArity, fnOrError(notFnErrPrefix, fn)], concatedArgs)) : apply(fnOrError(notFnErrPrefix, fn), concatedArgs);
    };
};
var curry2 = function curry2(fn) {
    return curryN(2, fn);
};
var curry3 = function curry3(fn) {
    return curryN(3, fn);
};
var curry4 = function curry4(fn) {
    return curryN(4, fn);
};
var curry5 = function curry5(fn) {
    return curryN(5, fn);
};

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
var prop$1 = function prop(name, obj) {
  return obj[name];
};

/**
 * Created by elyde on 12/18/2016.
 * @memberOf _objectOps
 */

var _String = String.name;
var _Number$1 = Number.name;
var _Object = Object.name;
var _Boolean = Boolean.name;
var _Function = Function.name;
var _Array = Array.name;
var _Symbol = 'Symbol';
var _Map = 'Map';
var _Set = 'Set';
var _WeakMap = 'WeakMap';
var _WeakSet = 'WeakSet';
var _Null$1 = 'Null';
var _Undefined$1 = 'Undefined';

/**
 * Returns whether a value is a _functionOps or not.
 * @function module:_objectOps._isFunction
 * @param value {*}
 * @returns {Boolean}
 */
var isFunction = function isFunction(value) {
    return instanceOf$1(Function, value);
};
var isType$1 = function isType(type, obj) {
    return typeOf(obj) === (isFunction(type) ? type.name : type);
};
var isClass = function isClass(x) {
    return x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
};
var isCallable = function isCallable(x) {
    return isFunction(x) && !isClass(x);
};
var isArray = Array.isArray;
var isObject = function isObject(value) {
    return isType$1(_Object, value);
};
var isBoolean = function isBoolean(value) {
    return isType$1(_Boolean, value);
};
var isNumber = function isNumber(value) {
    return isType$1(_Number$1, value);
};
var isString = function isString(value) {
    return isType$1(_String, value);
};
var isMap = function isMap(value) {
    return isType$1(_Map, value);
};
var isSet = function isSet(value) {
    return isType$1(_Set, value);
};
var isWeakMap = function isWeakMap(value) {
    return isType$1(_WeakMap, value);
};
var isWeakSet = function isWeakSet(value) {
    return isType$1(_WeakSet, value);
};
var isUndefined = function isUndefined(value) {
    return isType$1(_Undefined$1, value);
};
var isNull = function isNull(value) {
    return isType$1(_Null$1, value);
};
var isSymbol = function isSymbol(value) {
    return isType$1(_Symbol, value);
};
var isUsableImmutablePrimitive = function isUsableImmutablePrimitive(x) {
    var typeOfX = typeOf(x);
    return isset(x) && [_String, _Number$1, _Boolean, _Symbol].some(function (Type) {
        return Type === typeOfX;
    });
};
var isEmptyList = function isEmptyList(x) {
    return !length(x);
};
var isEmptyObject = function isEmptyObject(obj) {
    return isEmptyList(keys(obj));
};
var isEmptyCollection = function isEmptyCollection(x) {
    return x.size === 0;
};
var isEmpty = function isEmpty(value) {
    var typeOfValue = typeOf(value),
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
var isset = function isset(x) {
    return x !== null && x !== undefined;
};

var assignDeep$1 = function assignDeep(obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return objs.reduce(function (topAgg, obj) {
        return keys(obj).reduce(function (agg, key) {
            var propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (hasOwnProperty$1(key, agg) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
                return agg;
            }
            if (isObject(agg[key]) && isObject(obj[key])) {
                assignDeep(agg[key], obj[key]);
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

var negateF = function negateF(fn) {
  return function (a, b) {
    return !fn(a, b);
  };
};
var negateF3 = function negateF3(fn) {
  return function (a, b, c) {
    return !fn(a, b, c);
  };
};
var negateF4 = function negateF4(fn) {
  return function (a, b, c, d) {
    return !fn(a, b, c, d);
  };
};
var negateF5 = function negateF5(fn) {
  return function (a, b, c, d, e) {
    return !fn(a, b, c, d, e);
  };
};
var negateP = negateF3;
var negateFMany = function negateFMany(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !apply(fn, args);
  };
};

/**
 * Created by elyde on 7/15/2017.
 * @module booleanOps
 */

var isTruthy = function isTruthy(value) {
  return !!value;
};
var isFalsy = function isFalsy(value) {
  return !value;
};
var alwaysTrue = function alwaysTrue() {
  return true;
};
var alwaysFalse = function alwaysFalse() {
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
    var typeOfX = typeOf(x);
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
 * @function module:_objectOps.of
 * @param x {*} - Value to derive returned value's type from.
 * @param [args] {...*} - Any args to pass in to matched construction strategy.
 * @returns {*|undefined} - New value of given value's type else `undefined`.
 */
var of = function of(x) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (!isset(x)) {
        return undefined;
    }
    var constructor = x.constructor;
    if (hasOwnProperty$1('of', constructor)) {
        return apply(constructor.of, args);
    } else if (isUsableImmutablePrimitive$1(x)) {
        return apply(constructor, args);
    } else if (isFunction(constructor)) {
        return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
    }
    return undefined;
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * @module _objectOps
 * @description Object operations (uncurried).
 * @private
 */

/**
 * @function module:_listOps.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
function _map(fn, xs) {
    var ind = 0,
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

var aggregateStr = function aggregateStr(agg, item) {
    return agg + item;
};
var aggregateArr = function aggregateArr(agg, item) {
    agg.push(item);
    return agg;
};
var aggregateObj = function aggregateObj(agg, item, ind) {
    agg[ind] = item;
    return agg;
};
var aggregatorByType = function aggregatorByType(x) {
    switch (typeOf(x)) {
        case 'String':
            return aggregateStr;
        case 'Array':
            return aggregateArr;
        case 'Object':
        default:
            return aggregateObj;
    }
};

/**
 * List operator utils module.
 * @module _listOpUtils
 * @private
 */
var sliceFrom = function sliceFrom(startInd, arr) {
    return slice(startInd, undefined, arr);
};
var sliceTo = function sliceTo(toInd, xs) {
    return slice(0, toInd, xs);
};
var copy = function copy(xs) {
    return sliceFrom(0, xs);
};
var sliceCopy = copy;
var genericAscOrdering = function genericAscOrdering(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }
    return 0;
};
var lengths = function lengths() {
    for (var _len = arguments.length, lists = Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
    }

    return length(lists) ? _map(length, lists) : [];
};
var lengthsToSmallest = function lengthsToSmallest() {
    for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
    }

    var listLengths = apply(lengths, lists),
        smallLen = Math.min.apply(Math, listLengths);
    return _map(function (list, ind) {
        return listLengths[ind] > smallLen ? sliceTo(smallLen, list) : copy(list);
    }, lists);
};
var reduceUntil = function reduceUntil(pred, op, agg, arr) {
    var limit = length(arr);
    if (!limit) {
        return agg;
    }
    var ind = 0,
        result = agg;
    for (; ind < limit; ind++) {
        if (pred(arr[ind], ind, arr)) {
            break;
        }
        result = op(result, arr[ind], ind, arr);
    }
    return result;
};
var reduceRightUntil = function reduceRightUntil(pred, op, agg, arr) {
    var limit = length(arr);
    if (!limit) {
        return agg;
    }
    var ind = limit - 1,
        result = agg;
    for (; ind >= 0; ind--) {
        if (pred(arr[ind], ind, arr)) {
            break;
        }
        result = op(result, arr[ind], ind, arr);
    }
    return result;
};
var reduce$1 = function reduce(operation, agg, arr) {
    return reduceUntil(alwaysFalse, // until-predicate
    operation, // operation
    agg, // aggregator
    arr);
};
var reduceRight$1 = function reduceRight(operation, agg, arr) {
    return reduceRightUntil(alwaysFalse, // until-predicate
    operation, // operation
    agg, // aggregator
    arr);
};
var lastIndex = function lastIndex(x) {
    var len = length(x);return len ? len - 1 : 0;
};
var findIndexWhere = function findIndexWhere(pred, arr) {
    var ind = -1,
        predicateFulfilled = false;
    var limit = length(arr);
    while (ind < limit && !predicateFulfilled) {
        predicateFulfilled = pred(arr[++ind], ind, arr);
    }
    return ind;
};
var findIndexWhereRight = function findIndexWhereRight(pred, arr) {
    var limit = length(arr);
    var ind = limit,
        predicateFulfilled = false;
    for (; ind >= 0 && !predicateFulfilled; --ind) {
        predicateFulfilled = pred(arr[ind], ind, arr);
    }
    return ind;
};
var findIndicesWhere = function findIndicesWhere(pred, xs) {
    if (!xs || !xs.length) {
        return undefined;
    }
    var limit = length(xs);
    var ind = 0,
        out = [];
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out.push(ind);
        }
    }
    return out.length ? out : undefined;
};
var findWhere = function findWhere(pred, xs) {
    var ind = 0,
        limit = length(xs);
    if (!limit) {
        return;
    }
    for (; ind < limit; ind++) {
        var elm = xs[ind];
        if (pred(elm, ind, xs)) {
            return elm;
        }
    }
};

/**
 * List operations module.
 * @module _listOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @private
 */
// Exported internals
var _append = concat;
var _appendMany = function _appendMany() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (length(args)) {
        return apply(concat, args);
    }
    throw new Error('`_appendMany` requires at least one arg.');
};
var _head = function _head(x) {
    return x[0];
};
var _last = function _last(xs) {
    return xs[lastIndex(xs)];
};
var _tail = function _tail(xs) {
    return sliceFrom(1, xs);
};
var _init = function _init(xs) {
    return sliceTo(lastIndex(xs), xs);
};
var _uncons = function _uncons(xs) {
    return !xs || length(xs) === 0 ? undefined : [_head(xs), _tail(xs)];
};
var _unconsr = function _unconsr(xs) {
    return !xs || length(xs) === 0 ? undefined : [_init(xs), _last(xs)];
};
var _concat = function _concat(xs) {
    return !length(xs) ? copy(xs) : apply(_appendMany, xs);
};
var _concatMap = function _concatMap(fn, foldableOfA) {
    return _concat(_map(fn, foldableOfA));
};
var _reverse = function _reverse(x) {
    return _foldr(function (agg, item) {
        return agg.push(item), agg;
    }, [], x);
};
var _intersperse = function _intersperse(between, arr) {
    var limit = length(arr),
        lastInd = limit - 1,
        out = [];
    if (!limit) {
        return out;
    }
    return _foldl(function (agg, item, ind) {
        return ind === lastInd ? agg.push(item) : agg.push(item, between), agg;
    }, out, arr);
};
var _intercalate = function _intercalate(xs, xss) {
    return _concat(_intersperse(xs, xss));
};
var _transpose = function _transpose(xss) {
    var numLists = length(xss),
        ind = 0,
        ind2 = void 0;
    if (!numLists) {
        return [];
    }
    var listLengths = apply(lengths, xss),
        longestListLen = _maximum(listLengths),
        outLists = [];
    for (; ind < longestListLen; ind += 1) {
        var outList = [];
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
var _subsequences = function _subsequences(xs) {
    var listLen = length(xs),
        len = Math.pow(2, listLen),
        out = [];
    for (var i = 0; i < len; i += 1) {
        var entry = [];
        for (var j = 0; j < listLen; j += 1) {
            if (i & 1 << j) {
                entry.push(xs[j]);
            }
        }
        out.push(entry);
    }
    return out;
};
var _subsequences1 = function _subsequences1(xs) {
    var listLen = length(xs),
        len = Math.pow(2, listLen),
        out = [];
    for (var i = 0; i < len; i += 1) {
        var entry = [];
        for (var j = 0; j < listLen; j += 1) {
            if (i & 1 << j) {
                entry.push(xs[j]);
            }
        }
        out.push(entry);
    }
    return out;
};
var _swapped = function _swapped(ind1, ind2, list) {
    var out = copy(list),
        tmp = out[ind1];
    out[ind1] = out[ind2];
    out[ind2] = tmp;
    return out;
};
var _permutations = function _permutations(xs) {
    var limit = length(xs);

    if (!limit || limit === 1) {
        return [xs];
    }

    var list = copy(xs),
        c = _repeat(limit, 0),
        i = 0;

    var out = [list];

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
var _foldl = reduce$1;
var _foldr = reduceRight$1;
var _foldl1 = function _foldl1(op, xs) {
    var parts = _uncons(xs);
    return !parts ? [] : reduce$1(op, parts[0], parts[1]);
};
var _foldr1 = function _foldr1(op, xs) {
    var parts = _unconsr(xs);
    return !parts ? [] : reduceRight$1(op, parts[1], parts[0]);
};
var _mapAccumL = function _mapAccumL(op, zero, xs) {
    var list = copy(xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = 0,
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
var _mapAccumR = function _mapAccumR(op, zero, xs) {
    var list = copy(xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = limit - 1,
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
var _iterate = function _iterate(limit, op, x) {
    var ind = 0,
        out = [],
        lastX = x;
    for (; ind < limit; ind += 1) {
        out.push(lastX);
        lastX = op(lastX);
    }
    return out;
};
var _repeat = function _repeat(limit, x) {
    return _iterate(limit, function (a) {
        return a;
    }, x);
};
var _replicate = _repeat;
var _cycle = function _cycle(limit, xs) {
    return _concat(_replicate(limit, xs));
};
var _unfoldr = function _unfoldr(op, x) {
    var ind = 0,
        out = [],
        resultTuple = op(x, ind, out);
    while (resultTuple) {
        out.push(resultTuple[0]);
        resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
};
var _findIndex = findIndexWhere;
var _findIndices = findIndicesWhere;
var _elemIndex = function _elemIndex(x, xs) {
    var foundInd = indexOf(x, xs);
    return foundInd !== -1 ? foundInd : undefined;
};
var _elemIndices = function _elemIndices(value, xs) {
    return _findIndices(function (x) {
        return x === value;
    }, xs);
};
var _take = function _take(limit, list) {
    return sliceTo(limit, list);
};
var _drop = function _drop(count, list) {
    return sliceFrom(count, list);
};
var _splitAt = function _splitAt(ind, list) {
    return [sliceTo(ind, list), sliceFrom(ind, list)];
};
var _takeWhile = function _takeWhile(pred, list) {
    return reduceUntil(negateP(pred), // predicate
    aggregateArr, // operation
    [], // aggregator
    list);
};
var _dropWhile = function _dropWhile(pred, list) {
    var limit = length(list),
        splitPoint = findIndexWhere(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : slice(splitPoint, limit, list);
};
var _dropWhileEnd = function _dropWhileEnd(pred, list) {
    var limit = length(list),
        splitPoint = findIndexWhereRight(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : sliceTo(splitPoint + 1, list);
};
var _span = function _span(pred, list) {
    var splitPoint = findIndexWhere(negateP(pred), list);
    return splitPoint === -1 ? _splitAt(0, list) : _splitAt(splitPoint, list);
};
var _breakOnList = function _breakOnList(pred, list) {
    var splitPoint = findIndexWhere(pred, list);
    return splitPoint === -1 ? _splitAt(0, list) : _splitAt(splitPoint, list);
};
var _at = prop$1;
var _find = findWhere;
var _filter = function _filter(pred, xs) {
    var ind = 0,
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
var _partition = function _partition(pred, list) {
    return !length(list) ? [[], []] : [_filter(pred, list), _filter(negateP(pred), list)];
};
var _elem = includes;
var _notElem = negateF(includes);
var _lookup = _at;
var _isPrefixOf = function _isPrefixOf(xs1, xs2) {
    var limit1 = length(xs1),
        limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
        return false;
    }
    var ind = 0;
    for (; ind < limit1; ind++) {
        if (xs1[ind] !== xs2[ind]) {
            return false;
        }
    }
    return true;
};
var _isSuffixOf = function _isSuffixOf(xs1, xs2) {
    var limit1 = length(xs1),
        limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
        return false;
    }
    var ind1 = limit1 - 1,
        ind2 = limit2 - 1;
    for (; ind1 >= 0; ind1--) {
        if (xs1[ind1] !== xs2[ind2]) {
            return false;
        }
        ind2 -= 1;
    }
    return true;
};
var _isInfixOf = function _isInfixOf(xs1, xs2) {
    var limit1 = length(xs1),
        limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2) {
        return false;
    }
    var ind1 = void 0,
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
var _isSubsequenceOf = function _isSubsequenceOf(xs1, xs2) {
    var len = Math.pow(2, length(xs2)),
        lenXs1 = length(xs1);
    var foundLen = void 0,
        i = void 0;
    for (i = 0; i < len; i += 1) {
        foundLen = 0;
        for (var j = 0; j < len; j += 1) {
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
var _group = function _group(xs) {
    return _groupBy(function (a, b) {
        return a === b;
    }, xs);
};
var _groupBy = function _groupBy(equalityOp, xs) {
    var limit = length(xs);
    if (!limit) {
        return copy(xs);
    }
    var ind = 0,
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
var _inits = function _inits(xs) {
    var limit = length(xs),
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
var _tails = function _tails(xs) {
    var limit = length(xs),
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
var _stripPrefix = function _stripPrefix(prefix, list) {
    return _isPrefixOf(prefix, list) ? _splitAt(length(prefix), list)[1] : copy(list);
};
var _zip = function _zip(arr1, arr2) {
    if (!length(arr1) || !length(arr2)) {
        return [];
    }

    var _lengthsToSmallest = lengthsToSmallest(arr1, arr2),
        _lengthsToSmallest2 = slicedToArray(_lengthsToSmallest, 2),
        a1 = _lengthsToSmallest2[0],
        a2 = _lengthsToSmallest2[1];

    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, [item, a2[ind]]);
    }, [], a1);
};
var _zipN = function _zipN() {
    for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
    }

    var trimmedLists = apply(lengthsToSmallest, _filter(length, lists)),
        lenOfTrimmed = length(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    } else if (lenOfTrimmed === 1) {
        return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
    }
    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, _map(function (xs) {
            return xs[ind];
        }, trimmedLists));
    }, [], trimmedLists[0]);
};
var _zip3 = function _zip3(arr1, arr2, arr3) {
    return _zipN(arr1, arr2, arr3);
};
var _zip4 = function _zip4(arr1, arr2, arr3, arr4) {
    return _zipN(arr1, arr2, arr3, arr4);
};
var _zip5 = function _zip5(arr1, arr2, arr3, arr4, arr5) {
    return _zipN(arr1, arr2, arr3, arr4, arr5);
};
var _zipWith = function _zipWith(op, xs1, xs2) {
    if (!length(xs1) || !length(xs2)) {
        return [];
    }

    var _lengthsToSmallest3 = lengthsToSmallest(xs1, xs2),
        _lengthsToSmallest4 = slicedToArray(_lengthsToSmallest3, 2),
        a1 = _lengthsToSmallest4[0],
        a2 = _lengthsToSmallest4[1];

    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, op(item, a2[ind]));
    }, [], a1);
};
var _zipWithN = function _zipWithN(op) {
    for (var _len3 = arguments.length, lists = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        lists[_key3 - 1] = arguments[_key3];
    }

    var trimmedLists = apply(lengthsToSmallest, lists),
        lenOfTrimmed = length(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    } else if (lenOfTrimmed === 1) {
        return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
    }
    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, apply(op, _map(function (xs) {
            return xs[ind];
        }, trimmedLists)));
    }, [], trimmedLists[0]);
};
var _zipWith3 = function _zipWith3(op, xs1, xs2, xs3) {
    return _zipWithN(op, xs1, xs2, xs3);
};
var _zipWith4 = function _zipWith4(op, xs1, xs2, xs3, xs4) {
    return _zipWithN(op, xs1, xs2, xs3, xs4);
};
var _zipWith5 = function _zipWith5(op, xs1, xs2, xs3, xs4, xs5) {
    return _zipWithN(op, xs1, xs2, xs3, xs4, xs5);
};
var _unzip = function _unzip(arr) {
    return _foldl(function (agg, item) {
        agg[0].push(item[0]);
        agg[1].push(item[1]);
        return agg;
    }, [[], []], arr);
};
var _unzipN = function _unzipN(list) {
    if (!length(list)) {
        return [];
    }
    var lenItem0 = length(list[0]);
    var zero = lenItem0 ? _unfoldr(function (numLists) {
        return numLists-- ? [[], numLists] : undefined;
    }, lenItem0) : [];
    return _foldl(function (agg, item) {
        agg.forEach(function (outList, ind) {
            return outList.push(item[ind]);
        });
        return agg;
    }, zero, list);
};
var _any = function _any(p, xs) {
    var ind = 0,
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
var _all = function _all(p, xs) {
    var limit = length(xs);
    var ind = 0;
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
var _and = function _and(xs) {
    return _all(isTruthy, xs);
};
var _or = function _or(xs) {
    return _any(isTruthy, xs);
};
var _not = function _not(xs) {
    return _all(isFalsy, xs);
};
var _sum = function _sum(list) {
    return _foldl(function (agg, x) {
        return agg + x;
    }, 0, list);
};
var _product = function _product(list) {
    return _foldl(function (agg, x) {
        return agg * x;
    }, 1, list);
};
var _maximum = function _maximum(list) {
    return _last(_sortBy(genericAscOrdering, list));
};
var _minimum = function _minimum(list) {
    return _head(_sortBy(genericAscOrdering, list));
};
var _scanl = function _scanl(fn, zero, xs) {
    if (!xs || !length(xs)) {
        return [];
    }
    var limit = length(xs);
    var ind = 0,
        result = zero,
        out = [];
    while (ind < limit) {
        result = fn(result, xs[ind], ind, xs);
        out.push(result);
        ind++;
    }
    return out;
};
var _scanl1 = function _scanl1(fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return _scanl(fn, _head(xs), _tail(xs));
};
var _scanr = function _scanr(fn, zero, xs) {
    if (!xs || !length(xs)) {
        return [];
    }
    var limit = length(xs);
    var ind = limit - 1,
        result = xs[0],
        out = [];
    while (ind > -1) {
        result = fn(result, xs[ind], ind, xs);
        out.push(result);
        ind--;
    }
    return out;
};
var _scanr1 = function _scanr1(fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return _scanr(fn, _last(xs), _init(xs));
};
var _nub = function _nub(list) {
    return _nubBy(function (a, b) {
        return a === b;
    }, list);
};
var _remove = function _remove(x, list) {
    return _removeBy(function (a, b) {
        return a === b;
    }, x, list);
};
var _sort = function _sort(xs) {
    return _sortBy(genericAscOrdering, xs);
};
var _sortOn = function _sortOn(valueFn, xs) {
    return (

        // Un-decorate
        _map(function (decorated) {
            return decorated[1];
        },

        // Decorate and sort
        _sortBy(
        // Ordering
        function (_ref, _ref2) {
            var _ref4 = slicedToArray(_ref, 1),
                a0 = _ref4[0];

            var _ref3 = slicedToArray(_ref2, 1),
                b0 = _ref3[0];

            return genericAscOrdering(a0, b0);
        },

        // Decorate
        _map(function (item) {
            return [valueFn(item), item];
        }, xs)))
    );
};
var _sortBy = function _sortBy(orderingFn, xs) {
    return copy(xs).sort(orderingFn || genericAscOrdering);
};
var _insert = function _insert(x, xs) {
    if (!length(xs)) {
        return [x];
    }
    var foundIndex = _findIndex(function (item) {
        return x <= item;
    }, xs);
    return foundIndex === -1 ? [x] : _concat(_intersperse([x], _splitAt(foundIndex, xs)));
};
var _insertBy = function _insertBy(orderingFn, x, xs) {
    var limit = length(xs);
    if (!limit) {
        return [x];
    }
    var ind = 0;
    for (; ind < limit; ind += 1) {
        if (orderingFn(x, xs[ind]) <= 0) {
            var parts = _splitAt(ind, xs);
            return _concat([parts[0], [x], parts[1]]);
        }
    }
    return aggregateArr(copy(xs), x);
};
var _nubBy = function _nubBy(pred, list) {
    if (!length(list)) {
        return [];
    }
    var limit = length(list);
    var ind = 0,
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
var _removeBy = function _removeBy(pred, x, list) {
    // @todo optimize this implementation
    var foundIndex = _findIndex(function (item) {
        return pred(x, item);
    }, list),
        parts = _splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
    return _append(parts[0], _tail(parts[1]));
};
var _removeFirstsBy = function _removeFirstsBy(pred, xs1, xs2) {
    return _foldl(function (agg, item) {
        return _removeBy(pred, item, agg);
    }, xs1, xs2);
};
var _unionBy = function _unionBy(pred, arr1, arr2) {
    return _foldl(function (agg, b) {
        var alreadyAdded = _any(function (a) {
            return pred(a, b);
        }, agg);
        return !alreadyAdded ? (agg.push(b), agg) : agg;
    }, copy(arr1), arr2);
};
var _union = function _union(arr1, arr2) {
    return _append(arr1, _filter(function (elm) {
        return !includes(elm, arr1);
    }, arr2));
};
var _intersect = function _intersect(arr1, arr2) {
    return !arr1 || !arr2 || !arr1 && !arr2 ? [] : _filter(function (elm) {
        return includes(elm, arr2);
    }, arr1);
};
var _intersectBy = function _intersectBy(pred, list1, list2) {
    return _foldl(function (agg, a) {
        return _any(function (b) {
            return pred(a, b);
        }, list2) ? (agg.push(a), agg) : agg;
    }, [], list1);
};
var _difference = function _difference(array1, array2) {
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
var _complement = function _complement(arr0) {
    for (var _len4 = arguments.length, arrays = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        arrays[_key4 - 1] = arguments[_key4];
    }

    return reduce$1(function (agg, arr) {
        return _append(agg, _difference(arr, arr0));
    }, [], arrays);
};

var objUnion$1 = function objUnion(obj1, obj2) {
    return assignDeep$1(obj1, obj2);
};
var objIntersect$1 = function objIntersect(obj1, obj2) {
    return _foldl(function (agg, key) {
        if (hasOwnProperty$1(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
};
var objDifference$1 = function objDifference(obj1, obj2) {
    return _foldl(function (agg, key) {
        if (!hasOwnProperty$1(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
};
var objComplement$1 = function objComplement(obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return _foldl(function (agg, obj) {
        return assignDeep$1(agg, objDifference$1(obj, obj0));
    }, {}, objs);
};

/**
 * @module objectOps
 */
var prop$$1 = curry(prop$1);
var instanceOf$$1 = curry(instanceOf$1);
var hasOwnProperty$$1 = curry(hasOwnProperty$1);
var assign$$1 = curry2(assign$1);
var assignDeep$$1 = curry2(assignDeep$1);
var objUnion$$1 = curry(objUnion$1);
var objIntersect$$1 = curry(objIntersect$1);
var objDifference$$1 = curry(objDifference$1);
var objComplement$$1 = curry2(objComplement$1);
var isType$$1 = curry(isType$1);

/**
 * Returns whether a value is a function or not.
 * @function module:objectOps.isFunction
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if `value` is an es2015 `class`.
 * @function module:objectOps.isClass
 * @param x {*}
 * @returns {boolean}
 */

/**
 * Returns a boolean depicting whether a value is callable or not.
 * @function module:objectOps.isCallable
 * @tentative
 * @private
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is an array.
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
 * Checks if value is a boolean.
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

/**
 * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
 * - If exists `(value).constructor.of` uses this.
 * - If value is of one String, Boolean, Symbol, or Number types calls it's constructor as a function (in cast form;  E.g., `constructor(...args)` )
 * - Else if constructor is a function, thus far, then calls constructor using the `new` keyword (with any passed in args).
 * @function module:objectOps.of
 * @param x {*} - Value to derive returned value's type from.
 * @param [args] {...*} - Any args to pass in to matched construction strategy.
 * @returns {*|undefined} - New value of given value's type else `undefined`.
 */

/**
 * @function module:objectOps.length
 * @param x {*}
 * @returns {Number}
 * @throws {Error} - Throws an error if value doesn't have a `length` property (
 *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
 */

/**
 * Gets own enumerable keys of passed in object (same as `Object.keys`).
 * @function module:objectOps.keys
 * @param obj {*}
 * @returns {Array<String>}
 */

var until$1 = function until(predicate, operation, typeInstance) {
    var result = typeInstance;
    while (!predicate(result)) {
        result = operation(result);
    }
    return result;
};

var flipN$1 = function flipN(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return apply(fn, reverse(args));
  };
};
var flip3$1 = function flip3(fn) {
  return function (a, b, c) {
    return call(fn, c, b, a);
  };
};
var flip4$1 = function flip4(fn) {
  return function (a, b, c, d) {
    return call(fn, d, c, b, a);
  };
};
var flip5$1 = function flip5(fn) {
  return function (a, b, c, d, e) {
    return call(fn, e, d, c, b, a);
  };
};
var flip$1 = function flip(fn) {
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
var PlaceHolder = function PlaceHolder() {};
var notFnErrPrefix$1 = '`fn` in `curry_(fn, ...args)`';
var placeHolderInstance = new PlaceHolder();

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
 * Replaces `placeholder` values in `_listOps`.
 * @function replacePlaceHolder
 * @private
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `_listOps` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders(array, args) {
    var out = map(function (element) {
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
 * @function module:_functionOps.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
function curry_(fn) {
    for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        argsToCurry[_key - 1] = arguments[_key];
    }

    return curryN_.apply(undefined, [fnOrError(notFnErrPrefix$1, fn).length, fn].concat(argsToCurry));
}

/**
 * Curries a _functionOps up to given arity also enforces arity via placeholder values (`__`).
 * @function module:_functionOps.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in _functionOps wrapped in a _functionOps for currying.
 */
function curryN_(executeArity, fn) {
    for (var _len2 = arguments.length, curriedArgs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        curriedArgs[_key2 - 2] = arguments[_key2];
    }

    return function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        var concatedArgs = replacePlaceHolders(curriedArgs, args),
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
var __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
var curry2_ = function curry2_(fn) {
    return curryN_(2, fn);
};
var curry3_ = function curry3_(fn) {
    return curryN_(3, fn);
};
var curry4_ = function curry4_(fn) {
    return curryN_(4, fn);
};
var curry5_ = function curry5_(fn) {
    return curryN_(5, fn);
};

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
var id = function id(x) {
  return x;
};

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @function module:_functionOps.compose
 * @type {Function}
 * @param args {...{Function}}
 * @returns {Function}
 */
var compose = function compose() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
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

var apply$1 = curry(apply);
var call$1 = curry2(call);
var until$$1 = curry(until$1);
var flipN$$1 = function flipN$$1(fn) {
    return curry3(function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return apply$1(fn, reverse(args));
    });
};
var flip$$1 = function flip$$1(fn) {
    return curry(flip$1(fn));
};
var flip3$$1 = function flip3$$1(fn) {
    return curry(flip3$1(fn));
};
var flip4$$1 = function flip4$$1(fn) {
    return curry(flip4$1(fn));
};
var flip5$$1 = function flip5$$1(fn) {
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

var fPureTakesOne_ = function fPureTakesOne_(name) {
    return curry(function (arg, f) {
        return f[name](arg);
    });
};
var fPureTakes2_ = function fPureTakes2_(name) {
    return curry(function (arg1, arg2, f) {
        return f[name](arg1, arg2);
    });
};
var fPureTakesOneOrMore_ = function fPureTakesOneOrMore_(name) {
    return curry2(function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
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

var map$2 = fPureTakesOne_('map');
var filter$2 = fPureTakesOne_('filter');
var reduce$2 = fPureTakes2_('reduce');
var reduceRight$2 = fPureTakes2_('reduceRight');
var forEach$1 = fPureTakesOne_('forEach');
var some$1 = fPureTakesOne_('some');
var every$1 = fPureTakesOne_('every');
var join$1 = fPureTakesOne_('join');
var push$1 = fPureTakesOneOrMore_('push');

/**
 * List operations that overlap (apart from globally overlapping props and functions like `length`)
 * on both strings and arrays.
 * @module jsPlatform_list
 * @private
 */

var concat$1 = curry(concat);
var slice$1 = curry(slice);
var includes$1 = curry(includes);
var indexOf$1 = curry(indexOf);
var lastIndexOf$1 = curry(lastIndexOf);

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
var split$1 = curry(split);

/**
 * @module jsPlatform
 * @private
 */

/**
 * List operators.
 * @module listOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to
 *  return undefined (and also determine which cases are ok for just returning undefined).
 */
var append = curry(_append);
var appendMany = curry2(_appendMany);
var concatMap = curry2(_concatMap);
var map$1 = curry(_map);
var intersperse = curry(_intersperse);
var intercalate = curry(_intercalate);
var foldl = curry(_foldl);
var foldr = curry(_foldr);
var foldl1 = curry(_foldl1);
var foldr1 = curry(_foldr1);
var mapAccumL = curry(_mapAccumL);
var mapAccumR = curry(_mapAccumR);
var iterate = curry(_iterate);
var repeat = curry(_repeat);
var replicate = curry(_replicate);
var cycle = curry(_cycle);
var unfoldr = curry(_unfoldr);
var findIndex = curry(_findIndex);
var findIndices = curry(_findIndices);
var elemIndex = curry(_elemIndex);
var elemIndices = curry(_elemIndices);
var take = curry(_take);
var drop = curry(_drop);
var splitAt = curry(_splitAt);
var takeWhile = curry(_takeWhile);
var dropWhile = curry(_dropWhile);
var dropWhileEnd = curry(_dropWhileEnd);
var span = curry(_span);
var breakOnList = curry(_breakOnList);
var at = curry(_at);
var find = curry(_find);
var filter$1 = curry(_filter);
var partition = curry(_partition);
var elem = curry(_elem);
var notElem = curry2(_notElem);
var lookup = curry(_lookup);
var isPrefixOf = curry(_isPrefixOf);
var isSuffixOf = curry(_isSuffixOf);
var isInfixOf = curry(_isInfixOf);
var isSubsequenceOf = curry(_isSubsequenceOf);
var groupBy = curry(_groupBy);
var stripPrefix = curry(_stripPrefix);
var zip = curry(_zip);
var zip3 = curry(_zip3);
var zip4 = curry(_zip4);
var zip5 = curry(_zip5);
var zipWith = curry(_zipWith);
var zipWithN = curry(_zipWithN);
var zipWith3 = curry(_zipWith3);
var zipWith4 = curry(_zipWith4);
var zipWith5 = curry(_zipWith5);
var any = curry(_any);
var all = curry(_all);
var scanl = curry(_scanl);
var scanl1 = curry(_scanl1);
var scanr = curry(_scanr);
var scanr1 = curry(_scanr1);
var remove = curry(_remove);
var sortOn = curry(_sortOn);
var sortBy = curry(_sortBy);
var insert = curry(_insert);
var insertBy = curry(_insertBy);
var nubBy = curry(_nubBy);
var removeBy = curry(_removeBy);
var removeFirstsBy = curry(_removeFirstsBy);
var unionBy = curry(_unionBy);
var union = curry(_union);
var intersect = curry(_intersect);
var intersectBy = curry(_intersectBy);
var difference = curry(_difference);
var complement = curry2(_complement);

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module stringOps
 */
var lines = split$1(/[\n\r]/gm);
var words = split$1(/[\s\t]/gm);
var unwords = intercalate(' ');
var unlines = intercalate('\n');
var lcaseFirst = function lcaseFirst(xs) {
  return xs[0].toLowerCase() + xs.substring(1);
};
var ucaseFirst = function ucaseFirst(xs) {
  return xs[0].toUpperCase() + xs.substring(1);
};
var camelCase = function camelCase(xs, pattern) {
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
exports.negateFMany = negateFMany;
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
exports.subsequences1 = _subsequences1;
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
exports._subsequences1 = _subsequences1;
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
exports.fPureTakesOne_ = fPureTakesOne_;
exports.fPureTakes2_ = fPureTakes2_;
exports.fPureTakesOneOrMore_ = fPureTakesOneOrMore_;
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
exports.aggregateArr = aggregateArr;
exports.aggregateObj = aggregateObj;
exports.aggregatorByType = aggregatorByType;

return exports;

}({}));
//# sourceMappingURL=fjl.js.map
