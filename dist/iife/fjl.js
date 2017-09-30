var fjl = (function (exports) {
'use strict';

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
var PlaceHolder = function PlaceHolder() {};
var placeHolderInstance = new PlaceHolder();

/**
 * Curries a function based on it's defined arity (argument's arrayOps expected length).
 * @function module:functionOps.curry
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
function curry(fn) {
  for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argsToCurry[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var concatedArgs = argsToCurry.concat(args);
    return concatedArgs.length < fn.length ? curry.apply(null, [fn].concat(concatedArgs)) : fn.apply(null, concatedArgs);
  };
}

/**
 * Checks to see if value is a `PlaceHolder`.
 * @function isPlaceHolder
 * @param instance {*}
 * @returns {boolean}
 * @private
 */
function isPlaceHolder(instance) {
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
function replacePlaceHolders(array, args) {
  var out = array.map(function (element) {
    if (!isPlaceHolder(element)) {
      return element;
    } else if (args.length > 0) {
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
function curry_(fn) {
  for (var _len3 = arguments.length, argsToCurry = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    argsToCurry[_key3 - 1] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var concatedArgs = replacePlaceHolders(argsToCurry, args),
        placeHolders = concatedArgs.filter(isPlaceHolder),
        canBeCalled = placeHolders.length === 0 && concatedArgs.length >= fn.length;
    return canBeCalled ? fn.apply(null, concatedArgs) : curry_.apply(null, [fn].concat(concatedArgs));
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
function curryN_(executeArity, fn) {
  for (var _len5 = arguments.length, curriedArgs = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
    curriedArgs[_key5 - 2] = arguments[_key5];
  }

  return function () {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    var concatedArgs = replacePlaceHolders(curriedArgs, args),
        placeHolders = concatedArgs.filter(isPlaceHolder),
        canBeCalled = concatedArgs.length - placeHolders.length >= executeArity || !executeArity;
    return !canBeCalled ? curryN_.apply(null, [executeArity, fn].concat(concatedArgs)) : fn.apply(null, concatedArgs);
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
function curryN(executeArity, fn) {
  for (var _len7 = arguments.length, curriedArgs = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
    curriedArgs[_key7 - 2] = arguments[_key7];
  }

  return function () {
    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    var concatedArgs = curriedArgs.concat(args),
        canBeCalled = concatedArgs.length >= executeArity || !executeArity;
    return !canBeCalled ? curryN.apply(null, [executeArity, fn].concat(concatedArgs)) : fn.apply(null, concatedArgs);
  };
}

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
 * Created by elydelacruz on 7/22/2017.
 */

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
var fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return f[name].apply(f, args);
    };
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
var toString = function toString(x) {
  return x.toString();
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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
 * Created by elyde on 12/18/2016.
 */
var _Number$1 = Number.name;
var _NaN = 'NaN';
var _Null$1 = 'Null';
var _Undefined$1 = 'Undefined';
var _undefined = 'undefined';

/**
 * Returns the class name of an object from it's class stringOps.
 * @note Returns 'NaN' if value `isNaN` and value type is 'Number'.
 * @function module:fjl.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name property if not null or undefined (in which case a
 *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
 */
function typeOf(value) {
    var retVal = void 0;
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _undefined) {
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
 * @module is
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
 */

var _String = String.name;
var _Number = Number.name;
var _Object = Object.name;
var _Boolean = Boolean.name;
var _Function = Function.name;
var _Array = Array.name;
var _Symbol = 'Symbol';
var _Map = 'Map';
var _Set = 'Set';
var _WeakMap = 'WeakMap';
var _WeakSet = 'WeakSet';
var _Null = 'Null';
var _Undefined = 'Undefined';

var isFunction = function isFunction(value) {
  return instanceOf$1(Function, value);
};
var isType = function isType(type, obj) {
  return typeOf(obj) === (isFunction(type) ? type.name : type);
};
var isClass = function isClass(x) {
  return x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10));
};
var isCallable = function isCallable(x) {
  return isFunction(x) && !isClass(x);
};
var isArray = function isArray(value) {
  return isType(Array, value);
};
var isObject = function isObject(value) {
  return isType(_Object, value);
};
var isBoolean = function isBoolean(value) {
  return isType(_Boolean, value);
};
var isNumber = function isNumber(value) {
  return isType(_Number, value);
};
var isString = function isString(value) {
  return isType(_String, value);
};
var isMap = function isMap(value) {
  return isType(_Map, value);
};
var isSet = function isSet(value) {
  return isType(_Set, value);
};
var isWeakMap = function isWeakMap(value) {
  return isType(_WeakMap, value);
};
var isWeakSet = function isWeakSet(value) {
  return isType(_WeakSet, value);
};
var isUndefined = function isUndefined(value) {
  return isType(_Undefined, value);
};
var isNull = function isNull(value) {
  return isType(_Null, value);
};
var isSymbol = function isSymbol(value) {
  return isType(_Symbol, value);
};
var isPromise = function isPromise(value) {
  return isType('Promise', value);
};
var isUsableImmutablePrimitive = function isUsableImmutablePrimitive(x) {
  var typeOfX = typeOf(x);
  return [_String, _Number, _Boolean, _Symbol].some(function (Type) {
    return Type === typeOfX;
  });
};
var isEmptyList = function isEmptyList(x) {
  return length(x) === 0;
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
    // '', 0, `null`, `undefined` or `false` then is empty
    retVal = true;
  } else if (typeOfValue === _Array || typeOfValue === _Function) {
    retVal = isEmptyList(value);
  } else if (typeOfValue === _Number && value !== 0) {
    retVal = false;
  } else if (typeOfValue === _Object) {
    retVal = isEmptyObject(value);
  } else if (hasOwnProperty$1('size', value)) {
    retVal = isEmptyCollection(value);
  } else {
    retVal = !value;
  }
  return retVal;
};
var notEmptyAndOfType = function notEmptyAndOfType(type, value) {
  return !isEmpty(value) && isType(type, value);
};
var isset = function isset(x) {
  return !isNull(x) && !isUndefined(x);
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
 * Created by elydelacruz on 9/7/2017.
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
 * Created by elydelacruz on 7/22/2017.
 */

/**
 * Functional `apply` functionOps (takes no context).
 * @function module:functionOps.apply
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
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
    } else if (isUsableImmutablePrimitive(x)) {
        return apply(constructor, args);
    } else if (isFunction(constructor)) {
        return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
    }
    return undefined;
};

/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
 *      on both strings and arrays.
 */

// export {length, toString} from './objectOpsUnCurried';

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
 * Created by elyde on 7/20/2017.
 * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
 * @module jsPlatform:arrayOpsUncurried
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
var filter$1 = fPureTakesOne('filter');
var reduce = fPureTakes2('reduce');
var reduceRight = fPureTakes2('reduceRight');
var forEach = fPureTakesOne('forEach');
var some = fPureTakesOne('some');
var every = fPureTakesOne('every');
var join = fPureTakesOne('join');
var push = fPureTakesOneOrMore('push');
var reverse$1 = defineReverse();

/**
 * @module negate
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

    return !apply(fn, reverse$1(args));
  };
};

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

var curry$1 = function curry(fn) {
  for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argsToCurry[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var concatedArgs = append(argsToCurry, args);
    return length(concatedArgs) < length(fn) ? apply(curry, append([fn], concatedArgs)) : apply(fn, concatedArgs);
  };
};
var curryN$1 = function curryN(executeArity, fn) {
  for (var _len3 = arguments.length, curriedArgs = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    curriedArgs[_key3 - 2] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var concatedArgs = append(curriedArgs, args),
        canBeCalled = length(concatedArgs) >= executeArity || !executeArity;
    return !canBeCalled ? apply(curryN, append([executeArity, fn], concatedArgs)) : apply(fn, concatedArgs);
  };
};
var curry2$1 = function curry2(fn) {
  return curryN$1(2, fn);
};

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
var PlaceHolder$1 = function PlaceHolder() {};
var placeHolderInstance$1 = new PlaceHolder$1();

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


/**
 * Place holder object (frozen) used by curry.
 * @type {PlaceHolder}
 */
var __$1 = Object.freeze ? Object.freeze(placeHolderInstance$1) : placeHolderInstance$1;

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
var bAnd = curry2(function (a, b) {
  return a && b;
});
var bOr = curry2(function (a, b) {
  return a || b;
});
var bNot = function bNot(x) {
  return !x;
};
var bOtherwise = alwaysTrue;
var bEqual = curry2(function (a, b) {
  return a === b;
});

/**
 *
 */

var prop = function prop(name, obj) {
  return obj[name];
};

/**
 * Created by elyde on 12/18/2016.
 */
var _Number$3 = Number.name;
var _NaN$1 = 'NaN';
var _Null$3 = 'Null';
var _Undefined$3 = 'Undefined';
var _undefined$1 = 'undefined';

/**
 * Returns the class name of an object from it's class stringOps.
 * @note Returns 'NaN' if value `isNaN` and value type is 'Number'.
 * @function module:fjl.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name property if not null or undefined (in which case a
 *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
 */
function typeOf$1(value) {
    var retVal = void 0;
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _undefined$1) {
        retVal = _Undefined$3;
    } else if (value === null) {
        retVal = _Null$3;
    } else {
        var constructorName = value.constructor.name;
        retVal = constructorName === _Number$3 && isNaN(value) ? _NaN$1 : constructorName;
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

var instanceOf$2 = curry(instanceOf$1);

/**
 * Created by elyde on 12/18/2016.
 * @module is
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
 */
var _String$1 = String.name;
var _Number$2 = Number.name;
var _Object$1 = Object.name;
var _Boolean$1 = Boolean.name;
var _Function$1 = Function.name;
var _Array$1 = Array.name;
var _Symbol$1 = 'Symbol';
var _Map$1 = 'Map';
var _Set$1 = 'Set';
var _WeakMap$1 = 'WeakMap';
var _WeakSet$1 = 'WeakSet';
var _Null$2 = 'Null';
var _Undefined$2 = 'Undefined';

var isFunction$1 = instanceOf$2(Function);
var isType$1 = curry(function (type, obj) {
  return typeOf$1(obj) === (isFunction$1(type) ? type.name : type);
});
var isArray$1 = isType$1(Array);
var isObject$1 = isType$1(_Object$1);
var isBoolean$1 = isType$1(_Boolean$1);
var isNumber$1 = isType$1(_Number$2);
var isString$1 = isType$1(_String$1);
var isMap$1 = isType$1(_Map$1);
var isSet$1 = isType$1(_Set$1);
var isWeakMap$1 = isType$1(_WeakMap$1);
var isWeakSet$1 = isType$1(_WeakSet$1);
var isUndefined$1 = isType$1(_Undefined$2);
var isNull$1 = isType$1(_Null$2);
var isSymbol$1 = isType$1(_Symbol$1);
var isPromise$1 = isType$1('Promise');
var isUsableImmutablePrimitive$1 = function isUsableImmutablePrimitive(x) {
  var typeOfX = typeOf$1(x);
  return [_String$1, _Number$2, _Boolean$1, _Symbol$1].some(function (Type) {
    return Type === typeOfX;
  });
};
var isEmptyList$1 = function isEmptyList(x) {
  return length(x) === 0;
};
var isEmptyObject$1 = function isEmptyObject(obj) {
  return isEmptyList$1(keys(obj));
};
var isEmptyCollection$1 = function isEmptyCollection(x) {
  return x.size === 0;
};
var isEmpty$2 = function isEmpty(value) {
  var typeOfValue = typeOf$1(value),
      retVal = void 0;

  if (!value) {
    // '', 0, `null`, `undefined` or `false` then is empty
    retVal = true;
  } else if (typeOfValue === _Array$1 || typeOfValue === _Function$1) {
    retVal = isEmptyList$1(value);
  } else if (typeOfValue === _Number$2 && value !== 0) {
    retVal = false;
  } else if (typeOfValue === _Object$1) {
    retVal = isEmptyObject$1(value);
  } else if (hasOwnProperty$1('size', value)) {
    retVal = isEmptyCollection$1(value);
  } else {
    retVal = !value;
  }
  return retVal;
};
var notEmptyAndOfType$1 = curry(function (type, value) {
  return !isEmpty$2(value) && isType$1(type, value);
});
var isset$1 = function isset(x) {
  return !isNull$1(x) && !isUndefined$1(x);
};

/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf functionOps
 */
var apply$1 = curry(apply);

var of$1 = function of(x) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (!isset$1(x)) {
        return undefined;
    }
    var constructor = x.constructor;
    if (hasOwnProperty$1('of', constructor)) {
        return apply$1(constructor.of, args);
    } else if (isUsableImmutablePrimitive$1(x)) {
        return apply$1(constructor, args);
    } else if (isFunction$1(constructor)) {
        return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
    }
    return undefined;
};

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
 * @function module:listOps.map
 * @param fn {Function} - Function to map on functor item(s).
 * @param xs {Array|String|*} - Functor.
 * @returns {Array|String|*} - Functor type that is passed in.
 */
var map$1 = function map(fn, xs) {
    var ind = 0,
        limit = length(xs),
        out = of$1(xs),
        aggregate = aggregatorByType(xs);
    if (!limit) {
        return out;
    }
    for (; ind < limit; ind += 1) {
        out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
    }
    return out;
};

/**
 * Array operators module.
 * @module listOpsUtils
 */
var sliceFrom = function sliceFrom(startInd, arr) {
    return slice(startInd, length(arr), arr);
};
var sliceTo = function sliceTo(toInd, xs) {
    return slice(0, toInd, xs);
};
var copy = function copy(xs) {
    return sliceFrom(0, xs);
};
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

    return length(lists) ? map$1(length, lists) : [];
};
var lengthsToSmallest = function lengthsToSmallest() {
    for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
    }

    var listLengths = apply(lengths, lists),
        smallLen = Math.min.apply(Math, listLengths);
    return map$1(function (list, ind) {
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
    return reduceUntil(alwaysFalse, // predicate
    operation, // operation
    agg, // aggregator
    arr);
};
var reduceRight$1 = function reduceRight(operation, agg, arr) {
    return reduceRightUntil(alwaysFalse, // predicate
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
    var limit = length(xs);
    if (!limit) {
        return undefined;
    }
    var ind = 0,
        out = [];
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out.push(ind);
        }
    }
    return out;
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
 * '_' list operators.
 * @module listOpsUncurried
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @todo code unperformant shorthand in `listOps`
 * @todo rename monoid functions to normal functions since we are not really defining methods for monoids here.
 */
// Exported internals
var append = concat$1;
var appendMany = function appendMany() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (length(args)) {
        return apply(concat$1, args);
    }
    throw new Error('`appendMany` requires at least one arg.');
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
    if (!xs) {
        return;
    }
    if (length(xs) === 0) {
        return undefined;
    }
    return [head(xs), tail(xs)];
};
var unconsr = function unconsr(xs) {
    if (!xs) {
        return;
    }
    if (length(xs) === 0) {
        return undefined;
    }
    return [init(xs), last(xs)];
};
var isEmpty$1 = function isEmpty(x) {
    return !length(x);
};
var concat$$1 = function concat$$1(xs) {
    if (!length(xs)) {
        return copy(xs);
    }
    return isString(xs) ? xs : apply(appendMany, xs);
};
var concatMap = function concatMap(fn, foldableOfA) {
    return concat$$1(map$1(fn, foldableOfA));
};
var reverse = function reverse(x) {
    var aggregator = aggregatorByType(x);
    return foldr(function (agg, item, ind) {
        return aggregator(agg, item, ind);
    }, of(x), x);
};
var intersperse = function intersperse(between, arr) {
    var limit = length(arr),
        lastInd = limit - 1,
        aggregator = of(arr),
        aggregatorOp = aggregatorByType(arr);
    if (!limit) {
        return aggregator;
    }
    return foldl(function (agg, item, ind) {
        return ind === lastInd ? aggregatorOp(agg, item) : aggregatorOp(aggregatorOp(agg, item), between);
    }, aggregator, arr);
};
var intercalate = function intercalate(xs, xss) {
    return concat$$1(intersperse(xs, xss));
};
var transpose = function transpose(xss) {
    var numLists = length(xss),
        ind = 0,
        ind2 = void 0;
    if (!numLists) {
        return of(xss);
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
    var len = Math.pow(2, length(xs)),
        out = [];
    for (var i = 0; i < len; i += 1) {
        var entry = [];
        for (var j = 0; j < len; j += 1) {
            if (i & 1 << j) {
                entry.push(xs[j]);
            }
        }
        out.push(entry);
    }
    return out;
};
var permutations = function permutations(xs) {
    return [xs];
};
var foldl = reduce$1;
var foldr = reduceRight$1;
var foldl1 = function foldl1(op, xs) {
    var parts = uncons(xs);
    if (!parts) {
        return of(xs);
    }
    return reduce$1(op, parts[0], parts[1]);
};
var foldr1 = function foldr1(op, xs) {
    var parts = unconsr(xs);
    if (!parts) {
        return of(xs);
    }
    return reduceRight$1(op, parts[1], parts[0]);
};
var mapAccumL = function mapAccumL(op, zero, xs) {
    var list = sliceFrom(0, xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = 0,
        agg = zero,
        mapped = of(xs),
        tuple = void 0;
    for (; ind < limit; ind++) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
};
var mapAccumR = function mapAccumR(op, zero, xs) {
    var list = sliceFrom(0, xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = limit - 1,
        agg = zero,
        mapped = of(xs),
        tuple = void 0;
    for (; ind >= 0; ind--) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
};
var iterate = function iterate(limit, op, x) {
    var ind = 0,
        out = x;
    for (; ind < limit; ind += 1) {
        out = op(out, ind);
    }
    return out;
};
var repeat = function repeat(limit, x) {
    return iterate(limit, function (agg) {
        agg.push(x);
        return agg;
    }, []);
};
var replicate = repeat;
var cycle = function cycle(limit, xs) {
    return concat$$1(replicate(limit, xs));
};
var unfoldr = function unfoldr(op, x) {
    var ind = 0,
        out = [],
        resultTuple = op(x, ind, out);
    while (resultTuple) {
        out.push(resultTuple[0]);
        resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
};
var findIndex = findIndexWhere;
var findIndices = findIndicesWhere;
var elemIndex = function elemIndex(x, xs) {
    var foundInd = indexOf(x, xs);
    return foundInd !== -1 ? foundInd : undefined;
};
var elemIndices = function elemIndices(value, xs) {
    return findIndices(function (x) {
        return x === value;
    }, xs);
};
var take = function take(limit, list) {
    return sliceTo(limit, list);
};
var drop = function drop(count, list) {
    return sliceFrom(count, list);
};
var splitAt = function splitAt(ind, list) {
    return [sliceTo(ind, list), sliceFrom(ind, list)];
};
var takeWhile = function takeWhile(pred, list) {
    var zero = of(list);
    var operation = aggregatorByType(list);
    return reduceUntil(negateP(pred), // predicate
    operation, // operation
    zero, // aggregator
    list);
};
var dropWhile = function dropWhile(pred, list) {
    var limit = length(list),
        splitPoint = findIndexWhere(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : slice(splitPoint, limit, list);
};
var dropWhileEnd = function dropWhileEnd(pred, list) {
    var limit = length(list),
        splitPoint = findIndexWhereRight(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : sliceTo(splitPoint + 1, list);
};
var span = function span(pred, list) {
    var splitPoint = findIndexWhere(negateP(pred), list);
    return splitPoint === -1 ? splitAt(0, list) : splitAt(splitPoint, list);
};
var breakOnList = function breakOnList(pred, list) {
    var splitPoint = findIndexWhere(pred, list);
    return splitPoint === -1 ? splitAt(0, list) : splitAt(splitPoint, list);
};
var at = prop;
var find = findWhere;
var filter = function filter(pred, xs) {
    var ind = 0,
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
var partition = function partition(pred, list) {
    if (!length(list)) {
        return [of(list), of(list)];
    }
    return [filter(pred, list), filter(negateP(pred), list)];
};
var elem = includes;
var notElem = negateF(includes);
var lookup = at;
var isPrefixOf = function isPrefixOf(xs1, xs2) {
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
var isSuffixOf = function isSuffixOf(xs1, xs2) {
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
var isInfixOf = function isInfixOf(xs1, xs2) {
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
var isSubsequenceOf = function isSubsequenceOf(xs1, xs2) {
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
var group = function group(xs) {
    return groupBy(function (a, b) {
        return a === b;
    }, xs);
};
var groupBy = function groupBy(equalityOp, xs) {
    var limit = length(xs);
    if (!limit) {
        return sliceFrom(0, xs);
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
};
var inits = function inits(xs) {
    var limit = length(xs),
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
var tails = function tails(xs) {
    var limit = length(xs),
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
var stripPrefix = function stripPrefix(prefix, list) {
    return isPrefixOf(prefix, list) ? splitAt(length(prefix), list)[1] : sliceFrom(0, list);
};
var zip = function zip(arr1, arr2) {
    if (!length(arr1) || !length(arr2)) {
        return of(arr1);
    }

    var _lengthsToSmallest = lengthsToSmallest(arr1, arr2),
        _lengthsToSmallest2 = slicedToArray(_lengthsToSmallest, 2),
        a1 = _lengthsToSmallest2[0],
        a2 = _lengthsToSmallest2[1];

    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, [item, a2[ind]]);
    }, [], a1);
};
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
    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, map$1(function (xs) {
            return xs[ind];
        }, trimmedLists));
    }, [], trimmedLists[0]);
};
var zipWith = function zipWith(op, xs1, xs2) {
    if (!length(xs1) || !length(xs2)) {
        return of(xs1);
    }

    var _lengthsToSmallest3 = lengthsToSmallest(xs1, xs2),
        _lengthsToSmallest4 = slicedToArray(_lengthsToSmallest3, 2),
        a1 = _lengthsToSmallest4[0],
        a2 = _lengthsToSmallest4[1];

    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, op(item, a2[ind]));
    }, [], a1);
};
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
    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, apply(op, map$1(function (xs) {
            return xs[ind];
        }, trimmedLists)));
    }, [], trimmedLists[0]);
};
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
var any = function any(p, xs) {
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
var all = function all(p, xs) {
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
var and = function and(xs) {
    return all(isTruthy, xs);
};
var or = function or(xs) {
    return any(isTruthy, xs);
};
var sum = function sum(list) {
    return foldl(function (agg, x) {
        return agg + x;
    }, 0, list);
};
var product = function product(arr) {
    return foldl(function (agg, x) {
        return agg * x;
    }, 1, arr);
};
var maximum = function maximum(list) {
    return maximumBy(genericAscOrdering, list);
};
var minimum = function minimum(list) {
    return minimumBy(genericAscOrdering, list);
};
var maximumBy = function maximumBy(ordering, xs) {
    return last(sortBy(ordering, xs));
};
var minimumBy = function minimumBy(ordering, xs) {
    return head(sortBy(ordering, xs));
};
var nub = function nub(list) {
    return nubBy(function (a, b) {
        return a === b;
    }, list);
};
var remove = function remove(x, list) {
    return removeBy(function (a, b) {
        return a === b;
    }, x, list);
};
var sort = function sort(xs) {
    return sortBy(genericAscOrdering, xs);
};
var sortOn = function sortOn(valueFn, xs) {
    return (

        // Un-decorate
        map$1(function (decorated) {
            return decorated[1];
        },

        // Decorate and sort
        sortBy(
        // Ordering
        function (a1, b1) {
            var a = a1[0],
                b = b1[0];
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            }
            return 0;
        },

        // Decorate
        map$1(function (item) {
            return [valueFn(item), item];
        }, xs)))
    );
};
var sortBy = function sortBy(orderingFn, xs) {
    return copy(xs).sort(orderingFn);
};
var insert = function insert(x, xs) {
    if (isEmpty$1(xs)) {
        return aggregatorByType(xs)(copy(xs), x, 0);
    }
    var out = of(xs),
        foundIndex = findIndex(function (item) {
        return x <= item;
    }, xs);
    return foundIndex === -1 ? append(sliceFrom(0, out), x) : concat$$1(intersperse([x], splitAt(foundIndex, xs)));
};
var insertBy = function insertBy(orderingFn, x, xs) {
    var limit = length(xs),
        aggregator = aggregatorByType(xs),
        out = of(xs);
    if (isEmpty$1(xs)) {
        return aggregator(out, x, 0);
    }
    var ind = 0;
    for (; ind < limit; ind += 1) {
        if (orderingFn(x, xs[ind]) <= 0) {
            var parts = splitAt(ind, xs);
            // Fold parts[0], [x], parts[1] into `out` and `concat`
            return concat$$1(foldl(aggregator, out, [parts[0], [x], parts[1]]));
        }
    }
    return aggregator(copy(xs), x);
};
var nubBy = function nubBy(pred, list) {
    if (isEmpty$1(list)) {
        return of(list);
    }
    var limit = length(list);
    var ind = 0,
        currItem = void 0,
        out = of(list),
        anyOp = function anyOp(storedItem) {
        return pred(currItem, storedItem);
    };
    for (; ind < limit; ind += 1) {
        currItem = list[ind];
        if (any(anyOp, out)) {
            continue;
        }
        out = append(out, currItem);
    }
    return out;
};
var removeBy = function removeBy(pred, x, list) {
    // @todo optimize this implementation
    var foundIndex = findIndex(function (item) {
        return pred(x, item);
    }, list),
        parts = splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
    return append(parts[0], tail(parts[1]));
};
var removeFirstsBy = function removeFirstsBy(pred, xs1, xs2) {
    return foldl(function (agg, item) {
        return removeBy(pred, item, agg);
    }, xs1, xs2);
};
var unionBy = function unionBy(pred, arr1, arr2) {
    var aggregator = aggregatorByType(arr1);
    return foldl(function (agg, b) {
        var alreadyAdded = any(function (a) {
            return pred(a, b);
        }, agg);
        return !alreadyAdded ? aggregator(agg, b) : agg;
    }, copy(arr1), arr2);
};
var union = function union(arr1, arr2) {
    return append(arr1, filter(function (elm) {
        return !includes(elm, arr1);
    }, arr2));
};
var intersect = function intersect(arr1, arr2) {
    return !arr1 || !arr2 || !arr1 && !arr2 ? [] : filter(function (elm) {
        return includes(elm, arr2);
    }, arr1);
};
var intersectBy = function intersectBy(pred, list1, list2) {
    var aggregator = aggregatorByType(list1);
    return foldl(function (agg, a) {
        return any(function (b) {
            return pred(a, b);
        }, list2) ? aggregator(agg, a) : agg;
    }, [], list1);
};
var difference = function difference(array1, array2) {
    // augment this with max length and min length ordering on op
    if (array1 && !array2) {
        return sliceFrom(0, array1);
    } else if (!array1 && array2 || !array1 && !array2) {
        return [];
    }
    var aggregator = aggregatorByType(array1);
    return reduce$1(function (agg, elm) {
        return !includes(elm, array2) ? aggregator(agg, elm) : agg;
    }, [], array1);
};
var complement = function complement(arr0) {
    for (var _len4 = arguments.length, arrays = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        arrays[_key4 - 1] = arguments[_key4];
    }

    return reduce$1(function (agg, arr) {
        return append(agg, difference(arr, arr0));
    }, [], arrays);
};

var objUnion = function objUnion(obj1, obj2) {
    return assignDeep$1(obj1, obj2);
};
var objIntersect = function objIntersect(obj1, obj2) {
    return foldl(function (agg, key) {
        if (hasOwnProperty$1(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
};
var objDifference = function objDifference(obj1, obj2) {
    return foldl(function (agg, key) {
        if (!hasOwnProperty$1(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
};
var objComplement = function objComplement(obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return foldl(function (agg, obj) {
        return assignDeep$1(agg, objDifference(obj, obj0));
    }, {}, objs);
};

var instanceOf$$1 = curry(instanceOf$1);
var hasOwnProperty$$1 = curry(hasOwnProperty$1);
var assign$$1 = curry2(assign$1);
var assignDeep$$1 = curry2(assignDeep$1);

/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf functionOps
 */
var call$1 = curry2(call);

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
var append$1 = curry$1(append);
var appendMany$1 = curry2$1(appendMany);
var concatMap$1 = curry2$1(concatMap);
var map$2 = curry$1(map$1);
var intersperse$1 = curry$1(intersperse);
var intercalate$1 = curry$1(intercalate);
var foldl$1 = curry$1(foldl);
var foldr$1 = curry$1(foldr);
var foldl1$1 = curry$1(foldl1);
var foldr1$1 = curry$1(foldr1);
var mapAccumL$1 = curry$1(mapAccumL);
var mapAccumR$1 = curry$1(mapAccumR);
var iterate$1 = curry$1(iterate);
var repeat$1 = curry$1(repeat);
var replicate$1 = repeat$1;
var cycle$1 = curry$1(cycle);
var unfoldr$1 = curry$1(unfoldr);
var findIndex$1 = curry$1(findIndex);
var findIndices$1 = curry$1(findIndices);
var elemIndex$1 = curry$1(elemIndex);
var elemIndices$1 = curry$1(elemIndices);
var take$1 = curry$1(take);
var drop$1 = curry$1(drop);
var splitAt$1 = curry$1(splitAt);
var takeWhile$1 = curry$1(takeWhile);
var dropWhile$1 = curry$1(dropWhile);
var dropWhileEnd$1 = curry$1(dropWhileEnd);
var span$1 = curry$1(span);
var breakOnList$1 = curry$1(breakOnList);
var at$1 = curry$1(at);
var find$1 = curry$1(find);
var filter$2 = curry$1(filter);
var partition$1 = curry$1(partition);
var elem$1 = curry$1(elem);
var notElem$1 = curry2$1(notElem);
var lookup$1 = at$1;
var isPrefixOf$1 = curry$1(isPrefixOf);
var isSuffixOf$1 = curry$1(isSuffixOf);
var isInfixOf$1 = curry$1(isInfixOf);
var isSubsequenceOf$1 = curry$1(isSubsequenceOf);
var groupBy$1 = curry$1(groupBy);
var stripPrefix$1 = curry$1(stripPrefix);
var zip$1 = curry$1(zip);
var zipWith$1 = curry$1(zipWith);
var zipWithN$1 = curry2$1(zipWithN);
var zipWith3$1 = zipWithN$1;
var zipWith4$1 = zipWithN$1;
var zipWith5$1 = zipWithN$1;
var any$1 = curry$1(any);
var all$1 = curry$1(all);
var maximumBy$1 = curry$1(maximumBy);
var minimumBy$1 = curry$1(minimumBy);
var scanl$1 = function scanl$$1() {
  return null;
};
var scanl1$1 = function scanl1$$1() {
  return null;
};
var scanr$1 = function scanr$$1() {
  return null;
};
var scanr1$1 = function scanr1$$1() {
  return null;
};
var remove$1 = curry$1(remove);
var sortOn$1 = curry$1(sortOn);
var sortBy$1 = curry$1(sortBy);
var insert$1 = curry$1(insert);
var insertBy$1 = curry$1(insertBy);
var nubBy$1 = curry$1(nubBy);
var removeBy$1 = curry$1(removeBy);
var removeFirstsBy$1 = curry$1(removeFirstsBy);
var unionBy$1 = curry$1(unionBy);
var union$1 = curry$1(union);
var intersect$1 = curry$1(intersect);
var intersectBy$1 = curry$1(intersectBy);
var difference$1 = curry$1(difference);
var complement$1 = curry2$1(complement);

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
var compose$1 = function compose() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (arg0) {
    return foldr$1(function (value, fn) {
      return fn(value);
    }, arg0, args);
  };
};

/**
 * @memberOf functionOps
 */

/**
 * Returns passed in parameter.
 * @function module:functionOps.id
 * @param x {*}
 * @returns {*}
 */
var id$1 = function id(x) {
  return x;
};

/**
 * @memberOf functionOps
 */
var flipN$1 = function flipN(fn) {
  return curry3(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return apply$1(fn, reverse(args));
  });
};
var flip$1 = function flip(fn) {
  return curry(function (b, a) {
    return call$1(fn, a, b);
  });
};

/**
 * @memberOf functionOps
 */
var until$1 = curry(function (predicate, operation, typeInstance) {
    var result = typeInstance;
    while (!predicate(result)) {
        result = operation(result);
    }
    return result;
});

/**
 * Function operations: `
 * @module functionOps
 */

var negate = function negate(x) {
  return Math.abs(x) * -1;
};

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
var split$1 = fPureTakesOne('split');

/**
 * Created by elydelacruz on 9/6/2017.
 * @module jsPlatform_string
 */

/**
 * Functional version of `String.prototype.split`.
 * @curried
 * @function module:jsPlatform_string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
var split$$1 = curry(split$1);

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 */
var lines = split$$1(/[\n\r]/gm);
var words = split$$1(/[\s\t]/gm);
var unwords = intercalate$1(' ');
var unlines = intercalate$1('\n');

/**
 * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
 * Generated Sat Sep 30 2017 01:56:18 GMT-0400 (EDT) 
 */

var version = '0.15.0';

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

exports.version = version;
exports.instanceOf = instanceOf$$1;
exports.hasOwnProperty = hasOwnProperty$$1;
exports.assign = assign$$1;
exports.assignDeep = assignDeep$$1;
exports.length = length;
exports.toString = toString;
exports.keys = keys;
exports.typeOf = typeOf;
exports.isFunction = isFunction;
exports.isType = isType;
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
exports.isPromise = isPromise;
exports.isUsableImmutablePrimitive = isUsableImmutablePrimitive;
exports.isEmptyList = isEmptyList;
exports.isEmptyObject = isEmptyObject;
exports.isEmptyCollection = isEmptyCollection;
exports.isEmpty = isEmpty;
exports.notEmptyAndOfType = notEmptyAndOfType;
exports.isset = isset;
exports.of = of;
exports.objUnion = objUnion;
exports.objIntersect = objIntersect;
exports.objDifference = objDifference;
exports.objComplement = objComplement;
exports.isTruthy = isTruthy;
exports.isFalsy = isFalsy;
exports.alwaysTrue = alwaysTrue;
exports.alwaysFalse = alwaysFalse;
exports.bAnd = bAnd;
exports.bOr = bOr;
exports.bNot = bNot;
exports.bOtherwise = bOtherwise;
exports.bEqual = bEqual;
exports.call = call$1;
exports.apply = apply$1;
exports.compose = compose$1;
exports.curry = curry;
exports.curryN = curryN;
exports.curry2 = curry2;
exports.curry3 = curry3;
exports.curry4 = curry4;
exports.curry5 = curry5;
exports.__ = __;
exports.curry_ = curry_;
exports.curryN_ = curryN_;
exports.curry2_ = curry2_;
exports.curry3_ = curry3_;
exports.curry4_ = curry4_;
exports.curry5_ = curry5_;
exports.id = id$1;
exports.flip = flip$1;
exports.flipN = flipN$1;
exports.until = until$1;
exports.negateF = negateF;
exports.negateF3 = negateF3;
exports.negateF4 = negateF4;
exports.negateF5 = negateF5;
exports.negateP = negateP;
exports.negateFMany = negateFMany;
exports._append = append;
exports._appendMany = appendMany;
exports._all = all;
exports._and = and;
exports._or = or;
exports._any = any;
exports._find = find;
exports._findIndex = findIndex;
exports._findIndices = findIndices;
exports._zip = zip;
exports._zipN = zipN;
exports._zipWith = zipWith;
exports._unzip = unzip;
exports._unzipN = unzipN;
exports._map = map$1;
exports._mapAccumL = mapAccumL;
exports._mapAccumR = mapAccumR;
exports._elem = elem;
exports._notElem = notElem;
exports._elemIndex = elemIndex;
exports._elemIndices = elemIndices;
exports._lookup = lookup;
exports._head = head;
exports._last = last;
exports._init = init;
exports._tail = tail;
exports._uncons = uncons;
exports._length = length;
exports._reverse = reverse;
exports._intersperse = intersperse;
exports._intercalate = intercalate;
exports._transpose = transpose;
exports._subsequences = subsequences;
exports._permutations = permutations;
exports._isEmpty = isEmpty$1;
exports._iterate = iterate;
exports._repeat = repeat;
exports._replicate = replicate;
exports._cycle = cycle;
exports._take = take;
exports._drop = drop;
exports._splitAt = splitAt;
exports._foldl = foldl;
exports._foldl1 = foldl1;
exports._foldr = foldr;
exports._foldr1 = foldr1;
exports._unfoldr = unfoldr;
exports._concat = concat$$1;
exports._concatMap = concatMap;
exports._takeWhile = takeWhile;
exports._dropWhile = dropWhile;
exports._dropWhileEnd = dropWhileEnd;
exports._partition = partition;
exports._at = at;
exports._span = span;
exports._breakOnList = breakOnList;
exports._stripPrefix = stripPrefix;
exports._group = group;
exports._inits = inits;
exports._tails = tails;
exports._isPrefixOf = isPrefixOf;
exports._isSuffixOf = isSuffixOf;
exports._isInfixOf = isInfixOf;
exports._isSubsequenceOf = isSubsequenceOf;
exports._filter = filter;
exports._sum = sum;
exports._product = product;
exports._maximum = maximum;
exports._maximumBy = maximumBy;
exports._minimum = minimum;
exports._minimumBy = minimumBy;
exports._nub = nub;
exports._remove = remove;
exports._insert = insert;
exports._insertBy = insertBy;
exports._nubBy = nubBy;
exports._removeBy = removeBy;
exports._removeFirstsBy = removeFirstsBy;
exports._unionBy = unionBy;
exports._sort = sort;
exports._sortOn = sortOn;
exports._sortBy = sortBy;
exports._complement = complement;
exports._difference = difference;
exports._union = union;
exports._intersect = intersect;
exports._intersectBy = intersectBy;
exports._groupBy = groupBy;
exports.append = append$1;
exports.appendMany = appendMany$1;
exports.concatMap = concatMap$1;
exports.map = map$2;
exports.intersperse = intersperse$1;
exports.intercalate = intercalate$1;
exports.foldl = foldl$1;
exports.foldr = foldr$1;
exports.foldl1 = foldl1$1;
exports.foldr1 = foldr1$1;
exports.mapAccumL = mapAccumL$1;
exports.mapAccumR = mapAccumR$1;
exports.iterate = iterate$1;
exports.repeat = repeat$1;
exports.replicate = replicate$1;
exports.cycle = cycle$1;
exports.unfoldr = unfoldr$1;
exports.findIndex = findIndex$1;
exports.findIndices = findIndices$1;
exports.elemIndex = elemIndex$1;
exports.elemIndices = elemIndices$1;
exports.take = take$1;
exports.drop = drop$1;
exports.splitAt = splitAt$1;
exports.takeWhile = takeWhile$1;
exports.dropWhile = dropWhile$1;
exports.dropWhileEnd = dropWhileEnd$1;
exports.span = span$1;
exports.breakOnList = breakOnList$1;
exports.at = at$1;
exports.find = find$1;
exports.filter = filter$2;
exports.partition = partition$1;
exports.elem = elem$1;
exports.notElem = notElem$1;
exports.lookup = lookup$1;
exports.isPrefixOf = isPrefixOf$1;
exports.isSuffixOf = isSuffixOf$1;
exports.isInfixOf = isInfixOf$1;
exports.isSubsequenceOf = isSubsequenceOf$1;
exports.groupBy = groupBy$1;
exports.stripPrefix = stripPrefix$1;
exports.zip = zip$1;
exports.zipWith = zipWith$1;
exports.zipWithN = zipWithN$1;
exports.zipWith3 = zipWith3$1;
exports.zipWith4 = zipWith4$1;
exports.zipWith5 = zipWith5$1;
exports.any = any$1;
exports.all = all$1;
exports.maximumBy = maximumBy$1;
exports.minimumBy = minimumBy$1;
exports.scanl = scanl$1;
exports.scanl1 = scanl1$1;
exports.scanr = scanr$1;
exports.scanr1 = scanr1$1;
exports.remove = remove$1;
exports.sortOn = sortOn$1;
exports.sortBy = sortBy$1;
exports.insert = insert$1;
exports.insertBy = insertBy$1;
exports.nubBy = nubBy$1;
exports.removeBy = removeBy$1;
exports.removeFirstsBy = removeFirstsBy$1;
exports.unionBy = unionBy$1;
exports.union = union$1;
exports.intersect = intersect$1;
exports.intersectBy = intersectBy$1;
exports.difference = difference$1;
exports.complement = complement$1;
exports.and = and;
exports.or = or;
exports.zipN = zipN;
exports.unzip = unzip;
exports.unzipN = unzipN;
exports.head = head;
exports.last = last;
exports.init = init;
exports.tail = tail;
exports.uncons = uncons;
exports.concat = concat$$1;
exports.reverse = reverse;
exports.transpose = transpose;
exports.subsequences = subsequences;
exports.permutations = permutations;
exports.group = group;
exports.inits = inits;
exports.tails = tails;
exports.sum = sum;
exports.product = product;
exports.maximum = maximum;
exports.minimum = minimum;
exports.sort = sort;
exports.nub = nub;
exports.negate = negate;
exports.lines = lines;
exports.words = words;
exports.unwords = unwords;
exports.unlines = unlines;

return exports;

}({}));
//# sourceMappingURL=fjl.js.map
