var fjl = (function (exports) {
'use strict';

/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
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
 * @function module:object.typeOf
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

var fnOrError$1 = function fnOrError(symbolName, f) {
    if (!f || typeof f !== 'function') {
        throw new Error(symbolName + ' should be a function. ' + ('Type received: ' + typeOf(f) + ';  Value received: ' + f + '.'));
    }
    return f;
};

/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

var curryNotFnErrPrefix = '`fn` in `curry(fn, ...args)`';
var curryN = function curryN(executeArity, fn) {
  for (var _len = arguments.length, curriedArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    curriedArgs[_key - 2] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var concatedArgs = curriedArgs.concat(args),
        canBeCalled = concatedArgs.length >= executeArity || !executeArity;
    return !canBeCalled ? curryN.apply(null, [executeArity, fnOrError$1(curryNotFnErrPrefix, fn)].concat(concatedArgs)) : fnOrError$1(curryNotFnErrPrefix, fn).apply(null, concatedArgs);
  };
};
var curry = function curry(fn) {
  for (var _len3 = arguments.length, argsToCurry = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    argsToCurry[_key3 - 1] = arguments[_key3];
  }

  return curryN.apply(undefined, [fnOrError$1(curryNotFnErrPrefix, fn).length, fn].concat(argsToCurry));
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

var fPureTakesOne = function fPureTakesOne(name) {
    return curry(function (arg, f) {
        return f[name](arg);
    });
};
var fPureTakes2 = function fPureTakes2(name) {
    return curry(function (arg1, arg2, f) {
        return f[name](arg1, arg2);
    });
};
var fPureTakes3 = function fPureTakes3(name) {
    return curry(function (arg1, arg2, arg3, f) {
        return f[name](arg1, arg2, arg3);
    });
};
var fPureTakes4 = function fPureTakes4(name) {
    return curry(function (arg1, arg2, arg3, arg4, f) {
        return f[name](arg1, arg2, arg3, arg4);
    });
};
var fPureTakes5 = function fPureTakes5(name) {
    return curry(function (arg1, arg2, arg3, arg4, arg5, f) {
        return f[name](arg1, arg2, arg3, arg4, arg5);
    });
};
var fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return curry2(function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return f[name].apply(f, args);
    });
};
var fnOrError = function fnOrError(symbolName, f) {
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

/**
 * Returns whether constructor has derived object.
 * @function module:_jsPlatformobject.instanceOf
 * @param instanceConstructor {Function} - Constructor.
 * @param instance {*}
 * @instance {*}
 * @returns {Boolean}
 */
var instanceOf = curry(function (instanceConstructor, instance) {
  return instance instanceof instanceConstructor;
});
var hasOwnProperty = fPureTakesOne('hasOwnProperty');
var length = function length(x) {
  return x.length;
};
var keys = Object.keys;
var assign = function () {
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
 * Created by elyde on 12/18/2016.
 * @memberOf object
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
 * Returns whether a value is a function or not.
 * @function module:object.isFunction
 * @param value {*}
 * @returns {Boolean}
 */
var isFunction = instanceOf(Function);
var isType = curry(function (type, obj) {
  return typeOf(obj) === (isFunction(type) ? type.name : type);
});
var isClass = function isClass(x) {
  return x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
};
var isCallable = function isCallable(x) {
  return isFunction(x) && !isClass(x);
};
var isArray = Array.isArray;
var isObject = isType(_Object);
var isBoolean = isType(_Boolean);
var isNumber = isType(_Number$1);
var isString = isType(_String);
var isMap = isType(_Map);
var isSet = isType(_Set);
var isWeakMap = isType(_WeakMap);
var isWeakSet = isType(_WeakSet);
var isUndefined = isType(_Undefined$1);
var isNull = isType(_Null$1);
var isSymbol = isType(_Symbol);
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
  var retVal = void 0;
  if (!value) {
    // if '', 0, `null`, `undefined`, or `false` then is empty
    retVal = true;
  }
  var typeOfValue = typeOf(value);
  if (typeOfValue === _Array || typeOfValue === _Function) {
    retVal = isEmptyList(value);
  } else if (typeOfValue === _Number$1) {
    retVal = false;
  } else if (typeOfValue === _Object) {
    retVal = isEmptyObject(value);
  } else if (hasOwnProperty('size', value) && isNumber(value.size)) {
    retVal = isEmptyCollection(value);
  } else {
    retVal = !value;
  }
  return retVal;
};
var isset = function isset(x) {
  return x !== null && x !== undefined;
};

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
var prop = curry(function (name, obj) {
  return isset(obj) ? obj[name] : undefined;
});

/**
 * Created by elydelacruz on 9/7/2017.
 * @module _jsPlatform_function
 * @private
 */
var apply = curry(function (fn, args) {
  return fn.apply(null, args);
});
var call = function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return apply(fn, args);
};

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
var of = function of(x) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (!isset(x)) {
        return undefined;
    }
    var constructor = x.constructor;
    if (hasOwnProperty('of', constructor)) {
        return apply(constructor.of, args);
    } else if (isUsableImmutablePrimitive(x)) {
        return apply(constructor, args);
    } else if (isFunction(constructor)) {
        return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
    }
    return undefined;
};

var searchObj = curry(function (nsString, obj) {
    if (!obj) {
        return obj;
    }
    if (nsString.indexOf('.') === -1) {
        return obj[nsString];
    }
    var parts = nsString.split('.'),
        limit = parts.length;
    var ind = 0,
        parent = obj;
    for (; ind < limit; ind += 1) {
        var node = parent[parts[ind]];
        if (!isset(node)) {
            return node;
        }
        parent = node;
    }
    return parent;
});

var assignDeep = function assignDeep(obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return !obj0 ? obj0 : objs.reduce(function (topAgg, obj) {
        return !obj ? topAgg : keys(obj).reduce(function (agg, key) {
            var propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (hasOwnProperty(key, agg) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
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
 *  List operations that overlap (apart from globally overlapping props and functions like `length`)
 *      on both strings and arrays.
 */

var concat$1 = fPureTakesOneOrMore('concat');
var slice = fPureTakes2('slice');
var includes = function () {
  return 'includes' in Array.prototype ? fPureTakesOne('includes') : function (value, xs) {
    return xs.indexOf(value) > -1;
  };
}();
var indexOf = fPureTakesOne('indexOf');
var lastIndexOf = fPureTakesOne('lastIndexOf');

/**
 * @memberOf function
 */

var negateF = function negateF(fn) {
  return function (x) {
    return !fn(x);
  };
};
var negateF2 = function negateF2(fn) {
  return curry(function (a, b) {
    return !fn(a, b);
  });
};
var negateF3 = function negateF3(fn) {
  return curry(function (a, b, c) {
    return !fn(a, b, c);
  });
};
var negateFN = function negateFN(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !apply(fn, args);
  };
};

/**
 * @module boolean
 * @description Contains functional version of 'always-true', 'always-false', 'is-truthy', and 'is-falsy'.
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
 * @function module:list.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
var map = curry(function (fn, xs) {
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
});

var aggregateArr$ = function aggregateArr$(agg, item) {
    agg.push(item);
    return agg;
};

/**
 * List operator utils module.
 * @module _listOpUtils
 * @private
 */
var sliceFrom = curry(function (startInd, arr) {
    return slice(startInd, undefined, arr);
});
var sliceTo = curry(function (toInd, xs) {
    return slice(0, toInd, xs);
});
var sliceCopy = sliceFrom(0);
var genericAscOrdering = curry(function (a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }
    return 0;
});
var lengths = function lengths() {
    for (var _len = arguments.length, lists = Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
    }

    return length(lists) ? map(length, lists) : [];
};
var lengthsToSmallest = function lengthsToSmallest() {
    for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
    }

    var listLengths = apply(lengths, lists),
        smallLen = Math.min.apply(Math, listLengths);
    return map(function (list, ind) {
        return listLengths[ind] > smallLen ? sliceTo(smallLen, list) : sliceCopy(list);
    }, lists);
};
var reduceUntil = curry(function (pred, op, agg, arr) {
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
});
var reduceRightUntil = curry(function (pred, op, agg, arr) {
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
});
var reduce = reduceUntil(alwaysFalse);
var reduceRight = reduceRightUntil(alwaysFalse);
var lastIndex = function lastIndex(x) {
    var len = length(x);return len ? len - 1 : 0;
};
var findIndexWhere = curry(function (pred, arr) {
    var ind = -1,
        predicateFulfilled = false;
    var limit = length(arr);
    while (ind < limit && !predicateFulfilled) {
        predicateFulfilled = pred(arr[++ind], ind, arr);
    }
    return ind;
});
var findIndexWhereRight = curry(function (pred, arr) {
    var limit = length(arr);
    var ind = limit,
        predicateFulfilled = false;
    for (; ind >= 0 && !predicateFulfilled; --ind) {
        predicateFulfilled = pred(arr[ind], ind, arr);
    }
    return ind;
});
var findIndicesWhere = curry(function (pred, xs) {
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
});
var findWhere = curry(function (pred, xs) {
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
});

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
var map$2 = fPureTakesOne('map');
var filter$1 = fPureTakesOne('filter');
var reduce$1 = fPureTakes2('reduce');
var reduceRight$1 = fPureTakes2('reduceRight');
var forEach = fPureTakesOne('forEach');
var some = fPureTakesOne('some');
var every = fPureTakesOne('every');
var join = fPureTakesOne('join');
var push = fPureTakesOneOrMore('push');
var reverse$1 = defineReverse();

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
var split = fPureTakesOne('split');

/**
 * @module jsPlatform_
 * @private
 */

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
 * List operations module (un-curried version).
 * @module list
 */
var append = function append() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var len = length(args);
    if (!len) {
        return [];
    } else if (len === 1) {
        return sliceCopy(args[0]);
    }
    if (len >= 2) {
        return apply(concat$1, args);
    }
    throw new Error('\'`append` requires at 2 or more arguments.  ' + length(args) + ' args given.');
};
var head = function head(x) {
    return x[0];
};
var last = function last(xs) {
    return xs[lastIndex(xs)];
};
var tail = function tail(xs) {
    return sliceFrom(1, xs);
};
var init = function init(xs) {
    return sliceTo(lastIndex(xs), xs);
};
var uncons = function uncons(xs) {
    return !xs || length(xs) === 0 ? undefined : [head(xs), tail(xs)];
};
var unconsr = function unconsr(xs) {
    return !xs || length(xs) === 0 ? undefined : [init(xs), last(xs)];
};
var concat$$1 = function concat$$1(xs) {
    return !length(xs) ? sliceCopy(xs) : apply(append, xs);
};
var concatMap = curry(function (fn, foldableOfA) {
    return concat$$1(map(fn, foldableOfA));
});
var reverse = function reverse(x) {
    return foldr(function (agg, item) {
        return agg.push(item), agg;
    }, [], x);
};
var intersperse = curry(function (between, arr) {
    var limit = length(arr),
        lastInd = limit - 1,
        out = [];
    if (!limit) {
        return out;
    }
    return foldl(function (agg, item, ind) {
        return ind === lastInd ? agg.push(item) : agg.push(item, between), agg;
    }, out, arr);
});
var intercalate = curry(function (xs, xss) {
    return concat$$1(intersperse(xs, xss));
});
var transpose = function transpose(xss) {
    var numLists = length(xss),
        ind = 0,
        ind2 = void 0;
    if (!numLists) {
        return [];
    }
    var listLengths = apply(lengths, xss),
        longestListLen = maximum(listLengths),
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
    return filter(function (x) {
        return length(x);
    }, outLists);
};
var subsequences = function subsequences(xs) {
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
var swapped = curry(function (ind1, ind2, list) {
    var out = sliceCopy(list),
        tmp = out[ind1];
    out[ind1] = out[ind2];
    out[ind2] = tmp;
    return out;
});
var permutations = function permutations(xs) {
    var limit = length(xs);

    if (!limit || limit === 1) {
        return [xs];
    }

    var list = sliceCopy(xs),
        c = repeat(limit, 0),
        i = 0;

    var out = [list];

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
var foldl = reduce;
var foldr = reduceRight;
var foldl1 = curry(function (op, xs) {
    var parts = uncons(xs);
    return !parts ? [] : reduce(op, parts[0], parts[1]);
});
var foldr1 = curry(function (op, xs) {
    var parts = unconsr(xs);
    return !parts ? [] : reduceRight(op, parts[1], parts[0]);
});
var mapAccumL = curry(function (op, zero, xs) {
    var list = sliceCopy(xs),
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
});
var mapAccumR = curry(function (op, zero, xs) {
    var list = sliceCopy(xs),
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
});
var iterate = curry(function (limit, op, x) {
    var ind = 0,
        out = [],
        lastX = x;
    for (; ind < limit; ind += 1) {
        out.push(lastX);
        lastX = op(lastX, ind);
    }
    return out;
});
var repeat = curry(function (limit, x) {
    return iterate(limit, function (a) {
        return a;
    }, x);
});
var replicate = repeat;
var cycle = curry(function (limit, xs) {
    return concat$$1(replicate(limit, xs));
});
var unfoldr = curry(function (op, x) {
    var ind = 0,
        out = [],
        resultTuple = op(x, ind, out);
    while (resultTuple) {
        out.push(resultTuple[0]);
        resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
});
var findIndex = findIndexWhere;
var findIndices = findIndicesWhere;
var elemIndex = curry(function (x, xs) {
    var foundInd = indexOf(x, xs);
    return foundInd !== -1 ? foundInd : undefined;
});
var elemIndices = curry(function (value, xs) {
    return findIndices(function (x) {
        return x === value;
    }, xs);
});
var take = sliceTo;
var drop = sliceFrom;
var splitAt = function splitAt(ind, list) {
    return [sliceTo(ind, list), sliceFrom(ind, list)];
};
var takeWhile = curry(function (pred, list) {
    return reduceUntil(negateF3(pred), // predicate
    aggregateArr$, // operation
    [], // aggregator
    list);
});
var dropWhile = curry(function (pred, list) {
    var limit = length(list),
        splitPoint = findIndexWhere(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : slice(splitPoint, limit, list);
});
var dropWhileEnd = curry(function (pred, list) {
    var limit = length(list),
        splitPoint = findIndexWhereRight(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : sliceTo(splitPoint + 1, list);
});
var span = curry(function (pred, list) {
    var splitPoint = findIndexWhere(negateF3(pred), list);
    return splitPoint === -1 ? splitAt(0, list) : splitAt(splitPoint, list);
});
var breakOnList = curry(function (pred, list) {
    var splitPoint = findIndexWhere(pred, list);
    return splitPoint === -1 ? splitAt(0, list) : splitAt(splitPoint, list);
});
var at = prop;
var find = findWhere;
var filter = curry(function (pred, xs) {
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
});
var partition = curry(function (pred, list) {
    return !length(list) ? [[], []] : [filter(pred, list), filter(negateF3(pred), list)];
});
var elem = includes;
var notElem = negateF2(includes);
var lookup = at;
var isPrefixOf = curry(function (xs1, xs2) {
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
});
var isSuffixOf = curry(function (xs1, xs2) {
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
});
var isInfixOf = curry(function (xs1, xs2) {
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
});
var isSubsequenceOf = curry(function (xs1, xs2) {
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
});
var group = function group(xs) {
    return groupBy(function (a, b) {
        return a === b;
    }, xs);
};
var groupBy = curry(function (equalityOp, xs) {
    var limit = length(xs);
    if (!limit) {
        return sliceCopy(xs);
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
        agg.push(takeWhile(predOp, slice(ind, limit, xs)));
    }
    return agg;
});
var inits = function inits(xs) {
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
var tails = function tails(xs) {
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
var stripPrefix = curry(function (prefix, list) {
    return isPrefixOf(prefix, list) ? splitAt(length(prefix), list)[1] : sliceCopy(list);
});
var zip = curry(function (arr1, arr2) {
    if (!length(arr1) || !length(arr2)) {
        return [];
    }

    var _lengthsToSmallest = lengthsToSmallest(arr1, arr2),
        _lengthsToSmallest2 = slicedToArray(_lengthsToSmallest, 2),
        a1 = _lengthsToSmallest2[0],
        a2 = _lengthsToSmallest2[1];

    return reduce(function (agg, item, ind) {
        return aggregateArr$(agg, [item, a2[ind]]);
    }, [], a1);
});
var zipN = function zipN() {
    for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
    }

    var trimmedLists = apply(lengthsToSmallest, filter(length, lists)),
        lenOfTrimmed = length(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    } else if (lenOfTrimmed === 1) {
        return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
    }
    return reduce(function (agg, item, ind) {
        return aggregateArr$(agg, map(function (xs) {
            return xs[ind];
        }, trimmedLists));
    }, [], trimmedLists[0]);
};
var zip3 = curry(function (arr1, arr2, arr3) {
    return zipN(arr1, arr2, arr3);
});
var zip4 = curry(function (arr1, arr2, arr3, arr4) {
    return zipN(arr1, arr2, arr3, arr4);
});
var zip5 = curry(function (arr1, arr2, arr3, arr4, arr5) {
    return zipN(arr1, arr2, arr3, arr4, arr5);
});
var zipWith = curry(function (op, xs1, xs2) {
    if (!length(xs1) || !length(xs2)) {
        return [];
    }

    var _lengthsToSmallest3 = lengthsToSmallest(xs1, xs2),
        _lengthsToSmallest4 = slicedToArray(_lengthsToSmallest3, 2),
        a1 = _lengthsToSmallest4[0],
        a2 = _lengthsToSmallest4[1];

    return reduce(function (agg, item, ind) {
        return aggregateArr$(agg, op(item, a2[ind]));
    }, [], a1);
});
var zipWithN = function zipWithN(op) {
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
    return reduce(function (agg, item, ind) {
        return aggregateArr$(agg, apply(op, map(function (xs) {
            return xs[ind];
        }, trimmedLists)));
    }, [], trimmedLists[0]);
};
var zipWith3 = curry(function (op, xs1, xs2, xs3) {
    return zipWithN(op, xs1, xs2, xs3);
});
var zipWith4 = curry(function (op, xs1, xs2, xs3, xs4) {
    return zipWithN(op, xs1, xs2, xs3, xs4);
});
var zipWith5 = curry(function (op, xs1, xs2, xs3, xs4, xs5) {
    return zipWithN(op, xs1, xs2, xs3, xs4, xs5);
});
var unzip = function unzip(arr) {
    return foldl(function (agg, item) {
        agg[0].push(item[0]);
        agg[1].push(item[1]);
        return agg;
    }, [[], []], arr);
};
var unzipN = function unzipN(list) {
    if (!length(list)) {
        return [];
    }
    var lenItem0 = length(list[0]);
    var zero = lenItem0 ? unfoldr(function (numLists) {
        return numLists-- ? [[], numLists] : undefined;
    }, lenItem0) : [];
    return foldl(function (agg, item) {
        agg.forEach(function (outList, ind) {
            return outList.push(item[ind]);
        });
        return agg;
    }, zero, list);
};
var any = curry(function (p, xs) {
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
});
var all = curry(function (p, xs) {
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
});
var and = function and(xs) {
    return all(isTruthy, xs);
};
var or = function or(xs) {
    return any(isTruthy, xs);
};
var not = function not(xs) {
    return all(isFalsy, xs);
};
var sum = function sum(list) {
    return foldl(function (agg, x) {
        return agg + x;
    }, 0, list);
};
var product = function product(list) {
    return foldl(function (agg, x) {
        return agg * x;
    }, 1, list);
};
var maximum = function maximum(list) {
    return last(sortBy(genericAscOrdering, list));
};
var minimum = function minimum(list) {
    return head(sortBy(genericAscOrdering, list));
};
var scanl = curry(function (fn, zero, xs) {
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
});
var scanl1 = curry(function (fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return scanl(fn, head(xs), tail(xs));
});
var scanr = curry(function (fn, zero, xs) {
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
});
var scanr1 = curry(function (fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return scanr(fn, last(xs), init(xs));
});
var nub = function nub(list) {
    return nubBy(function (a, b) {
        return a === b;
    }, list);
};
var remove = curry(function (x, list) {
    return removeBy(function (a, b) {
        return a === b;
    }, x, list);
});
var sort = function sort(xs) {
    return sortBy(genericAscOrdering, xs);
};
var sortOn = curry(function (valueFn, xs) {
    return (

        // Un-decorate
        map(function (decorated) {
            return decorated[1];
        },

        // Decorate and sort
        sortBy(
        // Ordering
        function (_ref, _ref2) {
            var _ref4 = slicedToArray(_ref, 1),
                a0 = _ref4[0];

            var _ref3 = slicedToArray(_ref2, 1),
                b0 = _ref3[0];

            return genericAscOrdering(a0, b0);
        },

        // Decorate
        map(function (item) {
            return [valueFn(item), item];
        }, xs)))
    );
});
var sortBy = curry(function (orderingFn, xs) {
    return sliceCopy(xs).sort(orderingFn || genericAscOrdering);
});
var insert = curry(function (x, xs) {
    if (!length(xs)) {
        return [x];
    }
    var foundIndex = findIndex(function (item) {
        return x <= item;
    }, xs);
    return foundIndex === -1 ? [x] : concat$$1(intersperse([x], splitAt(foundIndex, xs)));
});
var insertBy = curry(function (orderingFn, x, xs) {
    var limit = length(xs);
    if (!limit) {
        return [x];
    }
    var ind = 0;
    for (; ind < limit; ind += 1) {
        if (orderingFn(x, xs[ind]) <= 0) {
            var parts = splitAt(ind, xs);
            return concat$$1([parts[0], [x], parts[1]]);
        }
    }
    return aggregateArr$(sliceCopy(xs), x);
});
var nubBy = curry(function (pred, list) {
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
        if (any(anyOp, out)) {
            continue;
        }
        out.push(currItem);
    }
    return out;
});
var removeBy = curry(function (pred, x, list) {
    // @todo optimize this implementation
    var foundIndex = findIndex(function (item) {
        return pred(x, item);
    }, list),
        parts = splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
    return append(parts[0], tail(parts[1]));
});
var removeFirstsBy = curry(function (pred, xs1, xs2) {
    return foldl(function (agg, x2) {
        return removeBy(pred, x2, agg);
    }, xs1, xs2);
});
var unionBy = curry(function (pred, arr1, arr2) {
    return foldl(function (agg, b) {
        var alreadyAdded = any(function (a) {
            return pred(a, b);
        }, agg);
        return !alreadyAdded ? (agg.push(b), agg) : agg;
    }, sliceCopy(arr1), arr2);
});
var union = curry(function (arr1, arr2) {
    return append(arr1, filter(function (elm) {
        return !includes(elm, arr1);
    }, arr2));
});
var intersect = curry(function (arr1, arr2) {
    return !arr1 || !arr2 || !arr1 && !arr2 ? [] : filter(function (elm) {
        return includes(elm, arr2);
    }, arr1);
});
var intersectBy = curry(function (pred, list1, list2) {
    return foldl(function (agg, a) {
        return any(function (b) {
            return pred(a, b);
        }, list2) ? (agg.push(a), agg) : agg;
    }, [], list1);
});
var difference = curry(function (array1, array2) {
    // augment this with max length and min length ordering on op
    if (array1 && !array2) {
        return sliceCopy(array1);
    } else if (!array1 && array2 || !array1 && !array2) {
        return [];
    }
    return reduce(function (agg, elm) {
        return !includes(elm, array2) ? (agg.push(elm), agg) : agg;
    }, [], array1);
});
var complement = function complement(arr0) {
    for (var _len4 = arguments.length, arrays = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        arrays[_key4 - 1] = arguments[_key4];
    }

    return reduce(function (agg, arr) {
        return append(agg, difference(arr, arr0));
    }, [], arrays);
};

var objUnion = curry(function (obj1, obj2) {
    return assignDeep(obj1, obj2);
});
var objIntersect = curry(function (obj1, obj2) {
    return foldl(function (agg, key) {
        if (hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
});
var objDifference = curry(function (obj1, obj2) {
    return foldl(function (agg, key) {
        if (!hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
});
var objComplement = function objComplement(obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return foldl(function (agg, obj) {
        return assignDeep(agg, objDifference(obj, obj0));
    }, {}, objs);
};

var log = console.log.bind(console);
var error = console.error.bind(console);
var peek = function peek() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return log.apply(undefined, args), args.pop();
};

/**
 * @module object
 * @description Contains error throwing facilities for when a value doesn't match a type.
 *  In addition gives you curried and uncurried versions of the multi arity functions.
 */
var isCheckableType = function isCheckableType(type) {
  return isString(type) || isFunction(type);
};
var errorIfNotCheckableType = function errorIfNotCheckableType(contextName, type) {
  if (!isCheckableType(type)) {
    throw new Error(contextName + ' expects `type` to be of type `String` or `Function`.' + ('  Type received `' + typeOf(type) + '`.  Value `' + type + '`.'));
  }
  return type;
};
var getTypeName = function getTypeName(type) {
  errorIfNotCheckableType('getTypeName', type);
  return type.name || type;
};
var _defaultTypeChecker = function _defaultTypeChecker(Type, value) {
  return isType(getTypeName(Type), value) || isFunction(Type) && isset(value) && value instanceof Type;
};
var multiTypesToString = function multiTypesToString(types) {
  return types.length ? types.map(function (type) {
    return '`' + getTypeName(type) + '`';
  }).join(', ') : '';
};
var defaultErrorMessageCall = function defaultErrorMessageCall(tmplContext) {
  var contextName = tmplContext.contextName,
      valueName = tmplContext.valueName,
      value = tmplContext.value,
      expectedTypeName = tmplContext.expectedTypeName,
      foundTypeName = tmplContext.foundTypeName,
      messageSuffix = tmplContext.messageSuffix,
      isMultiTypeNames = isArray(expectedTypeName),
      typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types',
      typesToMatchCopy = isMultiTypeNames ? multiTypesToString(expectedTypeName) : expectedTypeName;

  return (contextName ? '`' + contextName + '.' : '`') + (valueName + '` is not ' + typesCopy + ': ' + typesToMatchCopy + '.  ') + ('Type received: ' + foundTypeName + '.  Value: ' + value + ';') + ('' + (messageSuffix ? '  ' + messageSuffix + ';' : ''));
};
var _getErrorIfNotTypeThrower = function _getErrorIfNotTypeThrower(errorMessageCall) {
  var typeChecker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultTypeChecker;
  return function (ValueType, contextName, valueName, value) {
    var messageSuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    var expectedTypeName = getTypeName(ValueType),
        foundTypeName = typeOf(value);
    if (typeChecker(ValueType, value)) {
      return value;
    } // Value matches type
    throw new Error(errorMessageCall({ contextName: contextName, valueName: valueName, value: value, expectedTypeName: expectedTypeName, foundTypeName: foundTypeName, messageSuffix: messageSuffix }));
  };
};
var _getErrorIfNotTypesThrower = function _getErrorIfNotTypesThrower(errorMessageCall) {
  var typeChecker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultTypeChecker;
  return function (valueTypes, contextName, valueName, value) {
    var expectedTypeNames = valueTypes.map(getTypeName),
        matchFound = valueTypes.some(function (ValueType) {
      return typeChecker(ValueType, value);
    }),
        foundTypeName = typeOf(value);
    if (matchFound) {
      return value;
    }
    throw new Error(errorMessageCall({
      contextName: contextName, valueName: valueName, value: value,
      expectedTypeName: expectedTypeNames, foundTypeName: foundTypeName
    }));
  };
};
var _errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall);
var _errorIfNotTypes = _getErrorIfNotTypesThrower(defaultErrorMessageCall);
var defaultTypeChecker = curry(_defaultTypeChecker);
var errorIfNotType = curry(_errorIfNotType);
var errorIfNotTypes = curry4(_errorIfNotTypes);
var getErrorIfNotTypeThrower = function getErrorIfNotTypeThrower(errorMessageCall) {
  return curry(_getErrorIfNotTypeThrower(errorMessageCall));
};
var getErrorIfNotTypesThrower = function getErrorIfNotTypesThrower(errorMessageCall) {
  return curry4(_getErrorIfNotTypesThrower(errorMessageCall));
};

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

var jsonClone = function jsonClone(x) {
  return JSON.parse(JSON.stringify(x));
};

var toAssocList = function toAssocList(obj) {
    return keys(obj).map(function (key) {
        return [key, obj[key]];
    });
};
var toAssocListDeep = function toAssocListDeep(obj) {
    var TypeConstraint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
    return keys(obj).map(function (key) {
        return TypeConstraint && isType(TypeConstraint, obj[key]) ? [key, toAssocListDeep(obj[key], TypeConstraint)] : [key, obj[key]];
    });
};
var fromAssocList = function fromAssocList(xs) {
    var OutType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
    return xs.reduce(function (agg, _ref) {
        var _ref2 = slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        agg[key] = value;
        return agg;
    }, new OutType());
};
var fromAssocListDeep = function fromAssocListDeep(xs) {
    var OutType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
    return xs.reduce(function (agg, _ref3) {
        var _ref4 = slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        if (isArray(value) && isArray(value[0]) && value[0].length === 2) {
            agg[key] = fromAssocListDeep(value, OutType);
            return agg;
        }
        agg[key] = value;
        return agg;
    }, new OutType());
};

var toArray$1 = function toArray(x) {
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
var compose = function compose() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (arg0) {
    return reduceRight$1(function (value, fn) {
      return fn(value);
    }, arg0, args);
  };
};

/**
 * @memberOf function
 * @description Curry implementation with place holder concept (`__`).
 */

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
var PlaceHolder = function PlaceHolder() {};
var notFnErrPrefix = '`fn` in `curry_(fn, ...args)`';
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
 * Replaces `placeholder` values in `list`.
 * @function replacePlaceHolder
 * @private
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `list` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders(array, args) {
  var out = array.map(function (element) {
    if (!isPlaceHolder(element)) {
      return element;
    } else if (args.length) {
      return args.shift();
    }
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
function curry_(fn) {
  for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argsToCurry[_key - 1] = arguments[_key];
  }

  return curryN_.apply(undefined, [fnOrError$1(notFnErrPrefix, fn).length, fn].concat(argsToCurry));
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
  for (var _len2 = arguments.length, curriedArgs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    curriedArgs[_key2 - 2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var concatedArgs = replacePlaceHolders(curriedArgs, args),
        placeHolders = concatedArgs.filter(isPlaceHolder),
        canBeCalled = concatedArgs.length - placeHolders.length >= executeArity || !executeArity;
    return !canBeCalled ? curryN_.apply(null, [executeArity, fnOrError$1(notFnErrPrefix, fn)].concat(concatedArgs)) : fnOrError$1(notFnErrPrefix, fn).apply(null, concatedArgs);
  };
}

/**
 * Place holder object (frozen) used by curry.
 * @memberOf function
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

var flipN = function flipN(fn) {
  return curry2(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return apply(fn, reverse$1(args));
  });
};
var flip = function flip(fn) {
  return curry(function (b, a) {
    return call(fn, a, b);
  });
};

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
var id = function id(x) {
  return x;
};

var until = curry(function (predicate, operation, typeInstance) {
    var result = typeInstance;
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
var lines = split(/[\n\r]/gm);
var words = split(/[\s\t]/gm);
var unwords = intercalate(' ');
var unlines = intercalate('\n');
var lcaseFirst = function lcaseFirst(xs) {
  _errorIfNotType(String, 'lcaseFirst', 'xs', xs);
  return xs[0].toLowerCase() + xs.substring(1);
};
var ucaseFirst = function ucaseFirst(xs) {
  _errorIfNotType(String, 'ucaseFirst', 'xs', xs);
  return xs[0].toUpperCase() + xs.substring(1);
};
var camelCase = function camelCase(xs) {
  var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /[^a-z\d]/i;
  return compose(join(''), map(function (str) {
    return ucaseFirst(str.toLowerCase());
  }), filter(function (x) {
    return !!x;
  }), split(pattern))(_errorIfNotType(String, 'camelCase', 'xs', xs));
};
var classCase = compose(ucaseFirst, camelCase);

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

exports.instanceOf = instanceOf;
exports.hasOwnProperty = hasOwnProperty;
exports.length = length;
exports.assign = assign;
exports.keys = keys;
exports.prop = prop;
exports.typeOf = typeOf;
exports.isFunction = isFunction;
exports.isType = isType;
exports.isClass = isClass;
exports.isCallable = isCallable;
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
exports.isArray = isArray;
exports.of = of;
exports.searchObj = searchObj;
exports.assignDeep = assignDeep;
exports.objUnion = objUnion;
exports.objIntersect = objIntersect;
exports.objDifference = objDifference;
exports.objComplement = objComplement;
exports.log = log;
exports.error = error;
exports.peek = peek;
exports.isCheckableType = isCheckableType;
exports.errorIfNotCheckableType = errorIfNotCheckableType;
exports.getTypeName = getTypeName;
exports._defaultTypeChecker = _defaultTypeChecker;
exports.multiTypesToString = multiTypesToString;
exports.defaultErrorMessageCall = defaultErrorMessageCall;
exports._getErrorIfNotTypeThrower = _getErrorIfNotTypeThrower;
exports._getErrorIfNotTypesThrower = _getErrorIfNotTypesThrower;
exports._errorIfNotType = _errorIfNotType;
exports._errorIfNotTypes = _errorIfNotTypes;
exports.defaultTypeChecker = defaultTypeChecker;
exports.errorIfNotType = errorIfNotType;
exports.errorIfNotTypes = errorIfNotTypes;
exports.getErrorIfNotTypeThrower = getErrorIfNotTypeThrower;
exports.getErrorIfNotTypesThrower = getErrorIfNotTypesThrower;
exports.jsonClone = jsonClone;
exports.toArray = toArray$1;
exports.toAssocList = toAssocList;
exports.toAssocListDeep = toAssocListDeep;
exports.fromAssocList = fromAssocList;
exports.fromAssocListDeep = fromAssocListDeep;
exports.isTruthy = isTruthy;
exports.isFalsy = isFalsy;
exports.alwaysTrue = alwaysTrue;
exports.alwaysFalse = alwaysFalse;
exports.apply = apply;
exports.call = call;
exports.compose = compose;
exports.curryNotFnErrPrefix = curryNotFnErrPrefix;
exports.curryN = curryN;
exports.curry = curry;
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
exports.flipN = flipN;
exports.flip = flip;
exports.id = id;
exports.negateF = negateF;
exports.negateF2 = negateF2;
exports.negateF3 = negateF3;
exports.negateFN = negateFN;
exports.until = until;
exports.map = map;
exports.append = append;
exports.head = head;
exports.last = last;
exports.tail = tail;
exports.init = init;
exports.uncons = uncons;
exports.unconsr = unconsr;
exports.concat = concat$$1;
exports.concatMap = concatMap;
exports.reverse = reverse;
exports.intersperse = intersperse;
exports.intercalate = intercalate;
exports.transpose = transpose;
exports.subsequences = subsequences;
exports.swapped = swapped;
exports.permutations = permutations;
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
exports.filter = filter;
exports.partition = partition;
exports.elem = elem;
exports.notElem = notElem;
exports.lookup = lookup;
exports.isPrefixOf = isPrefixOf;
exports.isSuffixOf = isSuffixOf;
exports.isInfixOf = isInfixOf;
exports.isSubsequenceOf = isSubsequenceOf;
exports.group = group;
exports.groupBy = groupBy;
exports.inits = inits;
exports.tails = tails;
exports.stripPrefix = stripPrefix;
exports.zip = zip;
exports.zipN = zipN;
exports.zip3 = zip3;
exports.zip4 = zip4;
exports.zip5 = zip5;
exports.zipWith = zipWith;
exports.zipWithN = zipWithN;
exports.zipWith3 = zipWith3;
exports.zipWith4 = zipWith4;
exports.zipWith5 = zipWith5;
exports.unzip = unzip;
exports.unzipN = unzipN;
exports.any = any;
exports.all = all;
exports.and = and;
exports.or = or;
exports.not = not;
exports.sum = sum;
exports.product = product;
exports.maximum = maximum;
exports.minimum = minimum;
exports.scanl = scanl;
exports.scanl1 = scanl1;
exports.scanr = scanr;
exports.scanr1 = scanr1;
exports.nub = nub;
exports.remove = remove;
exports.sort = sort;
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
exports.slice = slice;
exports.includes = includes;
exports.indexOf = indexOf;
exports.lastIndexOf = lastIndexOf;
exports.split = split;
exports.push = push;
exports.lines = lines;
exports.words = words;
exports.unwords = unwords;
exports.unlines = unlines;
exports.lcaseFirst = lcaseFirst;
exports.ucaseFirst = ucaseFirst;
exports.camelCase = camelCase;
exports.classCase = classCase;
exports.fPureTakesOne = fPureTakesOne;
exports.fPureTakes2 = fPureTakes2;
exports.fPureTakes3 = fPureTakes3;
exports.fPureTakes4 = fPureTakes4;
exports.fPureTakes5 = fPureTakes5;
exports.fPureTakesOneOrMore = fPureTakesOneOrMore;
exports.fnOrError = fnOrError;
exports.sliceFrom = sliceFrom;
exports.sliceTo = sliceTo;
exports.sliceCopy = sliceCopy;
exports.genericAscOrdering = genericAscOrdering;
exports.lengths = lengths;
exports.lengthsToSmallest = lengthsToSmallest;
exports.reduceUntil = reduceUntil;
exports.reduceRightUntil = reduceRightUntil;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.lastIndex = lastIndex;
exports.findIndexWhere = findIndexWhere;
exports.findIndexWhereRight = findIndexWhereRight;
exports.findIndicesWhere = findIndicesWhere;
exports.findWhere = findWhere;
exports.aggregateArr$ = aggregateArr$;

return exports;

}({}));
//# sourceMappingURL=fjl.js.map
