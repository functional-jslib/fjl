var fjl = (function (exports) {
'use strict';

function _AwaitValue(value) {
  this.wrapped = value;
}

function _AsyncGenerator(gen) {
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
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume("next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
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
  _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

_AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

_AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

_AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
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
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

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
var returnCurried = function returnCurried(executeArity, unmetArityNum, fn, argsToCurry) {
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
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return executeAsCurriedFunc(fn, executeArity, unmetArityNum, args, argsToCurry);
      };
  }
};
var executeAsCurriedFunc = function executeAsCurriedFunc(fn, executeArity, unmetArity, args, argsToCurry) {
  var concatedArgs = argsToCurry.concat(args),
      canBeCalled = concatedArgs.length >= executeArity || !executeArity,
      newExpectedArity = executeArity - concatedArgs.length;
  return !canBeCalled ? returnCurried(executeArity, newExpectedArity, fn, concatedArgs) : fn.apply(void 0, _toConsumableArray(concatedArgs));
};

var curryN = function curryN(executeArity, fn) {
  if (!fn || !(fn instanceof Function)) {
    throw new Error("`curry*` functions expect first parameter to be of type `Function` though received ".concat(fn, "?"));
  }

  for (var _len2 = arguments.length, argsToCurry = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    argsToCurry[_key2 - 2] = arguments[_key2];
  }

  return returnCurried(executeArity, executeArity - argsToCurry.length, fn, argsToCurry);
};
var curry = function curry(fn) {
  for (var _len3 = arguments.length, argsToCurry = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    argsToCurry[_key3 - 1] = arguments[_key3];
  }

  return curryN.apply(void 0, [(fn || {}).length, fn].concat(argsToCurry));
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
 * @module utils
 */
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
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return f[name].apply(f, args);
  });
};

/**
 * Created by elyde on 7/20/2017.
 * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
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
 * Created by elydelacruz on 9/7/2017.
 */

var apply = curry(function (fn, args) {
  return fn.apply(null, args);
});
var call = curry2(function (fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return fn.call.apply(fn, [null].concat(args));
});

var flipN = function flipN(fn) {
  return curry2(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return apply(fn, reverse(args));
  });
};
var flip = function flip(fn) {
  return curry(function (b, a) {
    return call(fn, a, b);
  });
};
var flip3 = function flip3(fn) {
  return curry(function (c, b, a) {
    return call(fn, a, b, c);
  });
};
var flip4 = function flip4(fn) {
  return curry(function (d, c, b, a) {
    return call(fn, a, b, c, d);
  });
};
var flip5 = function flip5(fn) {
  return curry(function (e, d, c, b, a) {
    return call(fn, a, b, c, d, e);
  });
};

/**
 * @description Defines some of the platform methods for objects (the ones used within `fjl`).
 */
/**
 * Returns whether constructor has derived object.
 * @function module:object.instanceOf
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
var native = Object.getOwnPropertyNames(Object).reduce(function (agg, key) {
  if (typeof Object[key] !== 'function') {
    return agg;
  }

  var operation = Object[key];

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
var keys = native.keys;
var assign = function () {
  return Object.assign ? function (obj0) {
    for (var _len = arguments.length, objs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      objs[_key - 1] = arguments[_key];
    }

    return Object.assign.apply(Object, [obj0].concat(objs));
  } : curry2(function (obj0) {
    for (var _len2 = arguments.length, objs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      objs[_key2 - 1] = arguments[_key2];
    }

    return objs.reduce(function (topAgg, obj) {
      return Object.keys(obj).reduce(function (agg, key) {
        agg[key] = obj[key];
        return agg;
      }, topAgg);
    }, obj0);
  });
}();

/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
 */
var _Number$1 = Number.name;
var _NaN = 'NaN';
var _Null$1 = 'Null';
var _Undefined$1 = 'Undefined';
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
  var retVal;

  if (value === undefined) {
    retVal = _Undefined$1;
  } else if (value === null) {
    retVal = _Null$1;
  } else {
    var constructorName = value.constructor.name;
    retVal = constructorName === _Number$1 && isNaN(value) ? _NaN : constructorName;
  }

  return retVal;
}

/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
 */
var _String = String.name;
var _Number = Number.name;
var _Object = Object.name;
var _Boolean = Boolean.name;
var _Symbol = 'Symbol';
var _Map = 'Map';
var _Set = 'Set';
var _WeakMap = 'WeakMap';
var _WeakSet = 'WeakSet';
var _Null = 'Null';
var _Undefined = 'Undefined';

/**
 * Resolves/normalizes a type name from either a string or a constructor.
 * @function module:object.toTypeRef
 * @param type {Function|String} - String or function representing a type.
 * @returns {String}
 * @todo write tests for this function.
 */
var toTypeRef = function toTypeRef(type) {
  if (!type) {
    return typeOf(type);
  } else if (type.constructor === String || type instanceof Function) {
    return type;
  }

  return typeOf(type);
};
var toTypeRefs = function toTypeRefs() {
  for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  return types.map(toTypeRef);
};
var toTypeRefName = function toTypeRefName(Type) {
  var ref = toTypeRef(Type);
  return ref instanceof Function ? ref.name : ref;
};
var toTypeRefNames = function toTypeRefNames() {
  for (var _len2 = arguments.length, types = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    types[_key2] = arguments[_key2];
  }

  return types.map(toTypeRefName);
};
var isFunction = instanceOf(Function);
var isType = curry(function (type, obj) {
  return typeOf(obj) === toTypeRefName(type);
});
var isStrictly = isType;
var isOfType = curry(function (type, x) {
  return isType(type, x) || instanceOf(type, x);
});
var isLoosely = isOfType;
var isClass = function isClass(x) {
  return x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
};
var isCallable = function isCallable(x) {
  return isFunction(x) && !isClass(x);
};
var isArray = Array.isArray;
var isObject = isType(_Object);
var isBoolean = isType(_Boolean);
var isNumber = isType(_Number);
var isString = isType(_String);
var isMap = isType(_Map);
var isSet = isType(_Set);
var isWeakMap = isType(_WeakMap);
var isWeakSet = isType(_WeakSet);
var isUndefined = isType(_Undefined);
var isNull = isType(_Null);
var isSymbol = isType(_Symbol);
var isUsableImmutablePrimitive = function isUsableImmutablePrimitive(x) {
  var typeOfX = typeOf(x);
  return isset(x) && [_String, _Number, _Boolean, _Symbol].some(function (Type) {
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
var isEmpty = function isEmpty(x) {
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
};
var isset = function isset(x) {
  return x !== null && x !== undefined;
};
var isOneOf = function isOneOf(x) {
  var typeName = typeOf(x);

  for (var _len3 = arguments.length, types = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    types[_key3 - 1] = arguments[_key3];
  }

  return toTypeRefNames(types).some(function (name) {
    return typeName === name;
  });
};
var isStrictlyOneOf = isOneOf;
var isLooselyOneOf = function isLooselyOneOf(x) {
  for (var _len4 = arguments.length, types = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    types[_key4 - 1] = arguments[_key4];
  }

  return types.some(function (type) {
    return isType(type, x) || instanceOf(x, type);
  });
};
var instanceOfOne = function instanceOfOne(x) {
  for (var _len5 = arguments.length, types = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    types[_key5 - 1] = arguments[_key5];
  }

  return types.some(instanceOf(x));
};
var isFunctor = function isFunctor(x) {
  return x && x.map && instanceOf(Function, x.map);
};

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

var lookup = curry(function (key, obj) {
  return isset(obj) ? obj[key] : undefined;
});

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

var of = function of(x) {
  if (!isset(x)) {
    return undefined;
  }

  var constructor = x.constructor;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (constructor.hasOwnProperty('of')) {
    return apply(constructor.of, args);
  } else if (isUsableImmutablePrimitive(x)) {
    return apply(constructor, args);
  } else if (isFunction(constructor)) {
    return _construct(constructor, args);
  }

  return undefined;
};

var copy = function copy(x, out) {
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

var assignDeep = curry2(function (obj0) {
  for (var _len = arguments.length, objs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objs[_key - 1] = arguments[_key];
  }

  return !obj0 ? obj0 : objs.reduce(function (topAgg, obj) {
    return !obj ? topAgg : keys(obj).reduce(function (agg, key) {
      var propDescription = Object.getOwnPropertyDescriptor(agg, key); // If property is not writable move to next item in collection

      if (agg.hasOwnProperty(key) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
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
});

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
var equal = curry(function (a, b) {
  return a === b;
});
var equalAll = curry2(function (a) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.every(function (b) {
    return equal(a, b);
  });
});

/**
 * Maps a function onto a List (string or array) or a functor (value containing a map method).
 * @function module:list.map
 * @param fn {Function} - Function to map on given value.
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */

var map$1 = curry(function (fn, xs) {
  if (!isset(xs)) {
    return xs;
  }

  var out = of(xs),
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


      return Object.keys(xs).reduce(function (agg, key) {
        out[key] = fn(xs[key], key, xs);
        return out;
      }, out);
  }
});

var aggregateArray = function aggregateArray(agg, item) {
  agg.push(item);
  return agg;
};

/**
 * List operator utils module.
 * @module listUtils
 */
var sliceFrom = curry(function (startInd, xs) {
  return slice(startInd, undefined, xs);
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
var lengths = curry2(function () {
  for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
    lists[_key] = arguments[_key];
  }

  return map$1(length, lists);
});
var toShortest = curry2(function () {
  for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    lists[_key2] = arguments[_key2];
  }

  var listLengths = apply(lengths, lists),
      smallLen = Math.min.apply(Math, listLengths);
  return map$1(function (list, ind) {
    return listLengths[ind] > smallLen ? sliceTo(smallLen, list) : sliceCopy(list);
  }, lists);
});
var reduceUntil = curry(function (pred, op, agg, xs) {
  var limit = length(xs);

  if (!limit) {
    return agg;
  }

  var ind = 0,
      result = agg;

  for (; ind < limit; ind++) {
    if (pred(xs[ind], ind, xs)) {
      break;
    }

    result = op(result, xs[ind], ind, xs);
  }

  return result;
});
var reduceUntilRight = curry(function (pred, op, agg, arr) {
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
var reduce$1 = reduceUntil(alwaysFalse);
var reduceRight$1 = reduceUntilRight(alwaysFalse);
var lastIndex = function lastIndex(x) {
  var len = length(x);
  return len ? len - 1 : 0;
};
var findIndexWhere = curry(function (pred, arr) {
  var ind = 0;
  var limit = length(arr);

  for (; ind < limit; ind += 1) {
    var predicateFulfilled = !!pred(arr[ind], ind, arr);

    if (predicateFulfilled) {
      return ind;
    }
  }

  return -1;
});
var findIndexWhereRight = curry(function (pred, arr) {
  var ind = length(arr) - 1;

  for (; ind >= 0; ind -= 1) {
    var predicateFulfilled = !!pred(arr[ind], ind, arr);

    if (predicateFulfilled) {
      return ind;
    }
  }

  return -1;
});
var findIndicesWhere = curry(function (pred, xs) {
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

  return undefined;
});

var objUnion = curry(function (obj1, obj2) {
  return assignDeep(obj1, obj2);
});
var objIntersect = curry(function (obj1, obj2) {
  return reduce$1(function (agg, key) {
    if (obj2.hasOwnProperty(key)) {
      agg[key] = obj2[key];
    }

    return agg;
  }, {}, keys(obj1));
});
var objDifference = curry(function (obj1, obj2) {
  return reduce$1(function (agg, key) {
    if (!obj2.hasOwnProperty(key)) {
      agg[key] = obj1[key];
    }

    return agg;
  }, {}, keys(obj1));
});
var objComplement = curry2(function (obj0) {
  for (var _len = arguments.length, objs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objs[_key - 1] = arguments[_key];
  }

  return reduce$1(function (agg, obj) {
    return assignDeep(agg, objDifference(obj, obj0));
  }, {}, objs);
});

/**
 * @module console
 * @description Console exports.
 */
var log = console.log.bind(console);
var error = console.error.bind(console);
var peek = function peek() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return log.apply(void 0, args), args.pop();
};
var warn = console.warn.bind(console);

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
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    agg[key] = value;
    return agg;
  }, new OutType());
};
var fromAssocListDeep = function fromAssocListDeep(xs) {
  var OutType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
  return xs.reduce(function (agg, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
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

var toArray = function toArray(x) {
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
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (arg0) {
    return reduceRight(function (value, fn) {
      return fn(value);
    }, arg0, args);
  };
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
var id$1 = function id(x) {
  return x;
};

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
  return curry2(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !apply(fn, args);
  });
};

var until = curry(function (predicate, operation, typeInstance) {
  var result = typeInstance;

  while (!predicate(result)) {
    result = operation(result);
  }

  return result;
});

var fnOrError = function fnOrError(symbolName, f) {
  if (!f || !(f instanceof Function)) {
    throw new Error("".concat(symbolName, " should be a function. ") + "Type received: ".concat(typeOf(f), ";  Value received: ").concat(f, "."));
  }

  return f;
};

/**
 * No-op ('op' as in 'operation') - Performs no operation 'always' (good for places where
 * a value should always be a function etc.).
 * @function module:function.noop
 * @returns {undefined}
 */
var noop = function noop() {
  return undefined;
};

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
var trampoline = function trampoline(fn, fnName) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var result = fn.apply(null, args);

    while (typeof result === 'function' && (!fnName || result.name === fnName)) {
      result = result();
    }

    return result;
  };
};

var toFunction = function toFunction(x) {
  return isFunction(x) ? x : function () {
    return x;
  };
};

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

var normalizeStep = function normalizeStep(from, to, step) {
  if (from > to) {
    return step > 0 ? -step : step; // make step negative
  }

  return step < 0 ? -1 * step : step; // make step positive
};

var range = curry(function (from, to) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var i = from;
  var out = [];
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

var split = fPureTakesOne('split');

/**
 * @module jsPlatform
 */


var _jsPlatform = Object.freeze({
	instanceOf: instanceOf,
	hasOwnProperty: hasOwnProperty,
	length: length,
	native: native,
	assign: assign,
	keys: keys,
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
var append = curry2(function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return apply(concat, args);
});
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
var concat$1 = function concat$$1(xs) {
  switch (length(xs)) {
    case undefined:
    case 0:
      return [];

    case 1:
      var item0 = xs[0];
      return item0 && item0.slice ? sliceCopy(item0) : item0;

    case 2:
    default:
      return apply(append, xs);
  }
};
var concatMap = curry(function (fn, foldableOfA) {
  return concat$1(map$1(fn, foldableOfA));
});
var reverse$1 = function reverse(xs) {
  if (!isset(xs) || !xs.length) {
    return xs;
  }

  var out = of(xs),
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
var intersperse = curry(function (between, xs) {
  if (!xs || !xs.length) {
    return xs;
  }

  var limit = xs.length,
      lastInd = limit - 1;
  var out = of(xs),
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
var intercalate = curry(function (xs, xss) {
  if (isString(xss)) {
    return intersperse(xs, xss);
  }

  return concat$1(intersperse(xs, xss));
});
var transpose = function transpose(xss) {
  var numLists = length(xss),
      ind = 0,
      ind2;

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

  return filter$1(function (x) {
    return length(x) > 0;
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
var foldl = reduce$1;
var foldr = reduceRight$1;
var foldl1 = curry(function (op, xs) {
  var parts = uncons(xs);
  return !parts ? [] : reduce$1(op, parts[0], parts[1]);
});
var foldr1 = curry(function (op, xs) {
  var parts = unconsr(xs);
  return !parts ? [] : reduceRight$1(op, parts[1], parts[0]);
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
      tuple;

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
      tuple;

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
  return concat$1(replicate(limit, xs));
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
  isString(list) ? function (agg, x) {
    return agg + x;
  } : aggregateArray, // operation
  of(list), // aggregate
  list);
});
var dropWhile = curry(function (pred, list) {
  var limit = length(list),
      splitPoint = findIndexWhere(function (x, i, xs) {
    return !pred(x, i, xs);
  }, list);
  return splitPoint === -1 ? sliceFrom(limit, list) : slice(splitPoint, limit, list);
});
var dropWhileEnd = curry(function (pred, list) {
  var splitPoint = findIndexWhereRight(function (x, i, xs) {
    return !pred(x, i, xs);
  }, list);

  if (splitPoint === -1) {
    return of(list);
  }

  return sliceTo(splitPoint + 1, list);
});
var span = curry(function (pred, list) {
  var splitPoint = findIndexWhere(negateF3(pred), list);
  return splitPoint === -1 ? [sliceFrom(0, list), of(list)] : splitAt(splitPoint, list);
});
var breakOnList = curry(function (pred, list) {
  var splitPoint = findIndexWhere(negateF3(pred), list);
  return splitPoint === -1 ? [of(list), sliceFrom(0, list)] : reverse$1(splitAt(splitPoint, list));
});
var at = lookup;
var find = findWhere;
var forEach$1 = curry(function (fn, list) {
  var limit = length(list);

  if (!limit) {
    return;
  }

  var ind = 0;

  for (; ind < limit; ind += 1) {
    fn(list[ind], ind, list);
  }
});
var filter$1 = curry(function (pred, xs) {
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
  return !length(list) ? [[], []] : [filter$1(pred, list), filter$1(negateF3(pred), list)];
});
var elem = includes;
var notElem = negateF2(includes);
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

  var ind1,
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
var isSubsequenceOf = curry(function (xs1, xs2) {
  var len = Math.pow(2, length(xs2)),
      lenXs1 = length(xs1);
  var foundLen, i;

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
      prevItem,
      item,
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

  var _toShortest = toShortest(arr1, arr2),
      _toShortest2 = _slicedToArray(_toShortest, 2),
      a1 = _toShortest2[0],
      a2 = _toShortest2[1];

  return reduce$1(function (agg, item, ind) {
    return aggregateArray(agg, [item, a2[ind]]);
  }, [], a1);
});
var zipN = curry2(function () {
  for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    lists[_key2] = arguments[_key2];
  }

  var trimmedLists = apply(toShortest, lists);
  return reduce$1(function (agg, item, ind) {
    return aggregateArray(agg, map$1(function (xs) {
      return xs[ind];
    }, trimmedLists));
  }, [], trimmedLists[0]);
});
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

  var _toShortest3 = toShortest(xs1, xs2),
      _toShortest4 = _slicedToArray(_toShortest3, 2),
      a1 = _toShortest4[0],
      a2 = _toShortest4[1];

  return reduce$1(function (agg, item, ind) {
    return aggregateArray(agg, op(item, a2[ind]));
  }, [], a1);
});
var zipWithN = curry3(function (op) {
  for (var _len3 = arguments.length, lists = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    lists[_key3 - 1] = arguments[_key3];
  }

  var trimmedLists = apply(toShortest, lists),
      lenOfTrimmed = length(trimmedLists);

  if (!lenOfTrimmed) {
    return [];
  } else if (lenOfTrimmed === 1) {
    return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
  }

  return reduce$1(function (agg, item, ind) {
    return aggregateArray(agg, apply(op, map$1(function (xs) {
      return xs[ind];
    }, trimmedLists)));
  }, [], trimmedLists[0]);
});
var zipWith3 = curry(function (op, xs1, xs2, xs3) {
  return zipWithN(op, xs1, xs2, xs3);
});
var zipWith4 = curry(function (op, xs1, xs2, xs3, xs4) {
  return zipWithN(op, xs1, xs2, xs3, xs4);
});
var zipWith5 = curry(function (op, xs1, xs2, xs3, xs4, xs5) {
  return zipWithN(op, xs1, xs2, xs3, xs4, xs5);
});
var unzip = foldl(function (agg, item) {
  agg[0].push(item[0]);
  agg[1].push(item[1]);
  return agg;
}, [[], []]);
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
  return (// Un-decorate
    map$1(function (decorated) {
      return decorated[1];
    }, // Decorate and sort
    sortBy( // Ordering
    function (_ref, _ref2) {
      var _ref3 = _slicedToArray(_ref, 1),
          a0 = _ref3[0];

      var _ref4 = _slicedToArray(_ref2, 1),
          b0 = _ref4[0];

      return genericAscOrdering(a0, b0);
    }, // Decorate
    map$1(function (item) {
      return [valueFn(item), item];
    }, xs)))
  );
});
var sortBy = curry(function (orderingFn, xs) {
  return sliceCopy(xs).sort(orderingFn || genericAscOrdering);
});
var insert = curry(function (x, xs) {
  if (!xs.length) {
    return of(xs, x);
  }

  var foundIndex = findIndex(function (item) {
    return x <= item;
  }, xs);
  return foundIndex === -1 ? concat$1([xs, of(xs, x)]) : concat$1(intersperse(of(xs, x), splitAt(foundIndex, xs)));
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
      return concat$1([parts[0], [x], parts[1]]);
    }
  }

  return aggregateArray(sliceCopy(xs), x);
});
var nubBy = curry(function (pred, list) {
  if (!length(list)) {
    return [];
  }

  var limit = length(list);

  var ind = 0,
      currItem,
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
  var foundIndex = findIndex(function (item) {
    return pred(x, item);
  }, list);

  if (foundIndex > -1) {
    var parts = splitAt(foundIndex, list);
    return append(parts[0], tail(parts[1]));
  }

  return sliceCopy(list);
});
var removeFirstsBy = curry(function (pred, xs1, xs2) {
  return foldl(function (agg, x) {
    return removeBy(pred, x, agg);
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
  return append(arr1, filter$1(function (elm) {
    return !includes(elm, arr1);
  }, arr2));
});
var intersect = curry(function (arr1, arr2) {
  return !arr1 || !arr2 || !arr1 && !arr2 ? [] : filter$1(function (elm) {
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

  return reduce$1(function (agg, elm) {
    return !includes(elm, array2) ? (agg.push(elm), agg) : agg;
  }, [], array1);
});
var complement = curry2(function (arr0) {
  for (var _len4 = arguments.length, arrays = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    arrays[_key4 - 1] = arguments[_key4];
  }

  return reduce$1(function (agg, arr) {
    return append(agg, difference(arr, arr0));
  }, [], arrays);
});

/**
 * @module errorThrowing
 * @description Contains error throwing facilities for when a value doesn't match a type.
 */
var typeRefsToStringOrError = function typeRefsToStringOrError(types) {
  return types.length ? types.map(function (type) {
    return "`".concat(toTypeRefName(type), "`");
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
      typesToMatchCopy = isMultiTypeNames ? typeRefsToStringOrError(expectedTypeName) : expectedTypeName;
  return (contextName ? "`".concat(contextName, ".") : '`') + "".concat(valueName, "` is not ").concat(typesCopy, ": ").concat(typesToMatchCopy, ".  ") + "Type received: ".concat(foundTypeName, ".  Value: ").concat(value, ";") + "".concat(messageSuffix ? '  ' + messageSuffix + ';' : '');
};
var _getErrorIfNotTypeThrower = function _getErrorIfNotTypeThrower(errorMessageCall) {
  var typeChecker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isOfType;
  return function (ValueType, contextName, valueName, value) {
    var messageSuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var expectedTypeName = toTypeRef(ValueType),
        foundTypeName = typeOf(value);

    if (typeChecker(ValueType, value)) {
      return value;
    } // Value matches type


    throw new Error(errorMessageCall({
      contextName: contextName,
      valueName: valueName,
      value: value,
      expectedTypeName: expectedTypeName,
      foundTypeName: foundTypeName,
      messageSuffix: messageSuffix
    }));
  };
};
var _getErrorIfNotTypesThrower = function _getErrorIfNotTypesThrower(errorMessageCall) {
  var typeChecker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isOfType;
  return function (valueTypes, contextName, valueName, value) {
    var messageSuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var expectedTypeNames = valueTypes.map(toTypeRef),
        matchFound = valueTypes.some(function (ValueType) {
      return typeChecker(ValueType, value);
    }),
        foundTypeName = typeOf(value);

    if (matchFound) {
      return value;
    }

    throw new Error(errorMessageCall({
      contextName: contextName,
      valueName: valueName,
      value: value,
      expectedTypeName: expectedTypeNames,
      foundTypeName: foundTypeName,
      messageSuffix: messageSuffix
    }));
  };
};
var _errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall);
var _errorIfNotTypes = _getErrorIfNotTypesThrower(defaultErrorMessageCall);
var getErrorIfNotTypeThrower = function getErrorIfNotTypeThrower(errorMessageCall) {
  return curry(_getErrorIfNotTypeThrower(errorMessageCall));
};
var getErrorIfNotTypesThrower = function getErrorIfNotTypesThrower(errorMessageCall) {
  return curry(_getErrorIfNotTypesThrower(errorMessageCall));
};
var errorIfNotType = curry(_errorIfNotType);
var errorIfNotTypes = curry(_errorIfNotTypes);
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
  return compose(join(''), map$1(function (str) {
    return ucaseFirst(str.toLowerCase());
  }), filter$1(function (x) {
    return !!x;
  }), split(pattern))(_errorIfNotType(String, 'camelCase', 'xs', xs));
};
var classCase = compose(ucaseFirst, camelCase);
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
var jsPlatform = _jsPlatform;
/**
 * @typedef {String|Function|ArrayBufferConstructor|ArrayConstructor|BooleanConstructor|MapConstructor|NumberConstructor|SetConstructor|WeakMapConstructor|WeakSetConstructor} TypeRef
 * @description Type reference.  Either actual type or type's name;  E.g., `Type.name`
 * Also note: Class cased names are use for values that do not have `name` properties;  Namely: 'Null', 'NaN' and 'Undefined' (for their respective values respectively).
 */

exports.jsPlatform = jsPlatform;
exports.instanceOf = instanceOf;
exports.hasOwnProperty = hasOwnProperty;
exports.length = length;
exports.native = native;
exports.assign = assign;
exports.keys = keys;
exports.lookup = lookup;
exports.typeOf = typeOf;
exports.copy = copy;
exports.toTypeRef = toTypeRef;
exports.toTypeRefs = toTypeRefs;
exports.toTypeRefName = toTypeRefName;
exports.toTypeRefNames = toTypeRefNames;
exports.isFunction = isFunction;
exports.isType = isType;
exports.isStrictly = isStrictly;
exports.isOfType = isOfType;
exports.isLoosely = isLoosely;
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
exports.isOneOf = isOneOf;
exports.isStrictlyOneOf = isStrictlyOneOf;
exports.isLooselyOneOf = isLooselyOneOf;
exports.instanceOfOne = instanceOfOne;
exports.isFunctor = isFunctor;
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
exports.warn = warn;
exports.jsonClone = jsonClone;
exports.toArray = toArray;
exports.toAssocList = toAssocList;
exports.toAssocListDeep = toAssocListDeep;
exports.fromAssocList = fromAssocList;
exports.fromAssocListDeep = fromAssocListDeep;
exports.isTruthy = isTruthy;
exports.isFalsy = isFalsy;
exports.alwaysTrue = alwaysTrue;
exports.alwaysFalse = alwaysFalse;
exports.equal = equal;
exports.equalAll = equalAll;
exports.apply = apply;
exports.call = call;
exports.compose = compose;
exports.curryN = curryN;
exports.curry = curry;
exports.curry2 = curry2;
exports.curry3 = curry3;
exports.curry4 = curry4;
exports.curry5 = curry5;
exports.flipN = flipN;
exports.flip = flip;
exports.flip3 = flip3;
exports.flip4 = flip4;
exports.flip5 = flip5;
exports.id = id$1;
exports.negateF = negateF;
exports.negateF2 = negateF2;
exports.negateF3 = negateF3;
exports.negateFN = negateFN;
exports.until = until;
exports.fnOrError = fnOrError;
exports.noop = noop;
exports.trampoline = trampoline;
exports.toFunction = toFunction;
exports.map = map$1;
exports.append = append;
exports.head = head;
exports.last = last;
exports.tail = tail;
exports.init = init;
exports.uncons = uncons;
exports.unconsr = unconsr;
exports.concat = concat$1;
exports.concatMap = concatMap;
exports.reverse = reverse$1;
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
exports.forEach = forEach$1;
exports.filter = filter$1;
exports.partition = partition;
exports.elem = elem;
exports.notElem = notElem;
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
exports.push = push;
exports.range = range;
exports.sliceFrom = sliceFrom;
exports.sliceTo = sliceTo;
exports.sliceCopy = sliceCopy;
exports.genericAscOrdering = genericAscOrdering;
exports.lengths = lengths;
exports.toShortest = toShortest;
exports.reduceUntil = reduceUntil;
exports.reduceUntilRight = reduceUntilRight;
exports.reduce = reduce$1;
exports.reduceRight = reduceRight$1;
exports.lastIndex = lastIndex;
exports.findIndexWhere = findIndexWhere;
exports.findIndexWhereRight = findIndexWhereRight;
exports.findIndicesWhere = findIndicesWhere;
exports.findWhere = findWhere;
exports.aggregateArray = aggregateArray;
exports.split = split;
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
exports.typeRefsToStringOrError = typeRefsToStringOrError;
exports.defaultErrorMessageCall = defaultErrorMessageCall;
exports._getErrorIfNotTypeThrower = _getErrorIfNotTypeThrower;
exports._getErrorIfNotTypesThrower = _getErrorIfNotTypesThrower;
exports._errorIfNotType = _errorIfNotType;
exports._errorIfNotTypes = _errorIfNotTypes;
exports.getErrorIfNotTypeThrower = getErrorIfNotTypeThrower;
exports.getErrorIfNotTypesThrower = getErrorIfNotTypesThrower;
exports.errorIfNotType = errorIfNotType;
exports.errorIfNotTypes = errorIfNotTypes;

return exports;

}({}));
//# sourceMappingURL=fjl.js.map
