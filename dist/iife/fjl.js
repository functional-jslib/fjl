(function (exports) {
'use strict';

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
var PlaceHolder = function PlaceHolder() {};
var placeHolderInstance = new PlaceHolder();

/**
 * Curries a functionOps based on it's defined arity (argument's arrayOps expected length).
 * @functionOps curry
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
 * @functionOps isPlaceHolder
 * @param instance {*}
 * @returns {boolean}
 */
function isPlaceHolder(instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `listOps`.
 * @functionOps replacePlaceHolder
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `listOps` with placeholders replaced by values in `args`.
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
 * @functionOps curry_
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
 * @functionOps curryN_
 * @param fn {Function}
 * @param executeArity {Number}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in functionOps wrapped in a functionOps for currying.
 */
function curryN_(fn, executeArity) {
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
        return !canBeCalled ? curryN_.apply(null, [fn, executeArity].concat(concatedArgs)) : fn.apply(null, concatedArgs);
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
function curryN(fn, executeArity) {
    for (var _len7 = arguments.length, curriedArgs = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
        curriedArgs[_key7 - 2] = arguments[_key7];
    }

    return function () {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
        }

        var concatedArgs = curriedArgs.concat(args),
            canBeCalled = concatedArgs.length >= executeArity || !executeArity;
        return !canBeCalled ? curryN.apply(null, [fn, executeArity].concat(concatedArgs)) : fn.apply(null, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @type {PlaceHolder}
 */
var __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
var curry2_ = function curry2_(fn) {
    return curryN_(fn, 2);
};
var curry3_ = function curry3_(fn) {
    return curryN_(fn, 3);
};
var curry4_ = function curry4_(fn) {
    return curryN_(fn, 4);
};
var curry5_ = function curry5_(fn) {
    return curryN_(fn, 5);
};
var curry2 = function curry2(fn) {
    return curryN(fn, 2);
};
var curry3 = function curry3(fn) {
    return curryN(fn, 3);
};
var curry4 = function curry4(fn) {
    return curryN(fn, 4);
};
var curry5 = function curry5(fn) {
    return curryN(fn, 5);
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









































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













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

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
 * @functionOps module:fjl.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name property if not null or undefined (in which case a
 *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
 */
var typeOf = function typeOf(value) {
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
};

/**
 * Created by elydelacruz on 7/22/2017.
 */

var instanceOf = curry(function (instanceConstructor, instance) {
  return instance instanceof instanceConstructor;
});

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

var isFunction = instanceOf(Function);
var isType = curry(function (type, obj) {
    return typeOf(obj) === (isFunction(type) ? type.name : type);
});
var isClass = function isClass(x) {
    return x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10));
};
var isCallable = function isCallable(x) {
    return isFunction(x) && !isClass(x);
};
var isArray = isType(Array);
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
var isPromise = isType('Promise');
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
    } else if (hasOwnProperty('size', value)) {
        retVal = isEmptyCollection(value);
    } else {
        retVal = !value;
    }
    return retVal;
};
var notEmptyAndOfType = curry(function (type, value) {
    return !isEmpty(value) && isType(type, value);
});
var isset = function isset(x) {
    return !isNull(x) && !isUndefined(x);
};

/**
 * Created by elydelacruz on 7/22/2017.
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
var fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return curry2(function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return f[name].apply(f, args);
    });
};

/**
 *
 */

var prop = curry(function (name, obj) {
  return obj[name];
});

/**
 * Created by elydelacruz on 7/22/2017.
 */
/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

/**
 * @returns {Function}
 */
function defineAssign() {
    if (Object.assign) {
        return function (obj0) {
            for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                objs[_key - 1] = arguments[_key];
            }

            return Object.assign.apply(Object, [obj0].concat(objs));
        };
    }
    return function (obj0) {
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
}

var hasOwnProperty = fPureTakesOne('hasOwnProperty');
var length = prop('length');
var keys = function keys(obj) {
    return Object.keys(obj);
};
var assign = curry2(defineAssign());
var assignDeep = curry2(function (obj0) {
    for (var _len3 = arguments.length, objs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        objs[_key3 - 1] = arguments[_key3];
    }

    return objs.reduce(function (topAgg, obj) {
        return keys(obj).reduce(function (agg, key) {
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
});

/**
 * Created by elydelacruz on 7/22/2017.
 */
var apply = curry(function (fn, args) {
  return fn.apply(null, args);
});

var of = function of(x) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    var constructor = x.constructor,
        typeOfX = typeOf(x);
    if (hasOwnProperty('of', constructor)) {
        return apply(constructor.of, args);
    } else if (isUsableImmutablePrimitive(typeOfX)) {
        return apply(constructor, args);
    } else if (isFunction(constructor)) {
        return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
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
function defineReverse() {
  return Array.prototype.reverse ? function (x) {
    return x.reverse();
  } : function (x) {
    return x.reduceRight(function (agg, item) {
      agg.push(item);
      return agg;
    }, []);
  };
}

var map = fPureTakesOne('map');
var filter = fPureTakesOne('filter');
var reduce = fPureTakes2('reduce');
var reduceRight = fPureTakes2('reduceRight');
var forEach = fPureTakesOne('forEach');
var some = fPureTakesOne('some');
var every = fPureTakesOne('every');
var concat = fPureTakesOneOrMore('concat');
var join = fPureTakesOne('join');
var slice = fPureTakes2('slice');
var push = fPureTakesOneOrMore('push');
var reverse = defineReverse();

var objUnion = curry(function (obj1, obj2) {
    return assignDeep(obj1, obj2);
});
var objIntersect = curry(function (obj1, obj2) {
    return reduce(function (agg, key) {
        if (hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
});
var objDifference = curry(function (obj1, obj2) {
    return reduce(function (agg, key) {
        if (!hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
});
var objComplement = curry2(function (obj0) {
    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
    }

    return reduce(function (agg, obj) {
        return assignDeep(agg, objDifference(obj, obj0));
    }, {}, objs);
});

var isTruthy = function isTruthy(value) {
    return !!value;
};
var isFalsy = function isFalsy(value) {
    return !value;
};

/**
 * Created by elyde on 7/15/2017.
 * @module booleanOps
 */

var and = curry2(function (a, b) {
  return a && b;
});
var or = curry2(function (a, b) {
  return a || b;
});
var not = function not(x) {
  return !x;
};
var otherwise = function otherwise() {
  return true;
};
var equal = curry2(function (a, b) {
  return a === b;
});

/**
 * Created by elydelacruz on 7/22/2017.
 */
var call = curry2(function (fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return fn.call.apply(fn, [null].concat(args));
});

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @functionOps module:fjl.compose
 * @type {Function}
 * @param args {...Function}
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
 * @module negate
 */

/**
 * Negates a predicate function.
 * @function module:functionOps.negateP
 * @param fn {Function}
 * @returns {Function} - Negated predicate
 */
var negateP = function negateP(fn) {
  return function (x, ind, xs) {
    return !fn(x, ind, xs);
  };
};

/**
 * @module id
 */

/**
 * Returns passed in parameter.
 * @param x {*}
 * @returns {*}
 */
var id = function id(x) {
  return x;
};

var flipN = function flipN(fn) {
  return curry3(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
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

var until = curry(function (predicate, operation, typeInstance) {
    var result = typeInstance;
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

var split = curry(function (separator, str) {
  return str ? str.split(separator) : [];
});
var lines = split(/[\n\r]/gm);
var words = split(/[\s\t]/gm);
var unwords = join('\s');
var unlines = join('\n');

var negate = function negate(x) {
  return x * -1;
};

/**
 * Array operators module.
 * @module arrayOps
 */

// import {log}                            from '../../tests/for-server/helpers';
var ASC = 1;
var DESC = -1;
var sliceToEndFrom = curry(function (startInd, arr) {
    return slice(startInd, length(arr), arr);
});
var sliceFromZero = sliceToEndFrom(0);
var onlyOneOrNegOne = function onlyOneOrNegOne(x) {
    return x === 1 || x === -1 ? x : 1;
};
var getSortByOrder = curry(function (multiplier, valueFn) {
    valueFn = valueFn || function (v) {
        return v;
    };
    var x = onlyOneOrNegOne(multiplier),
        ifGreaterThan = 1 * x,
        ifLessThan = -1 * x;
    return function () {
        for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
            values[_key] = arguments[_key];
        }

        return values.sort(function (a1, b1) {
            var a = valueFn(a1),
                b = valueFn(b1);
            if (a > b) {
                return ifGreaterThan;
            } else if (b > a) {
                return ifLessThan;
            }
            return 0;
        });
    };
});
var sortDesc = getSortByOrder(DESC);
var sortAsc = getSortByOrder(ASC);
var sortDescByLength = getSortByOrder(DESC, function (x) {
    return length(x);
});
var lengths = curry2(function () {
    for (var _len2 = arguments.length, arrs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        arrs[_key2] = arguments[_key2];
    }

    return length(arrs) ? arrs.map(length) : [];
});
var getOrderedLengths = curry2(function (orderDir) {
    for (var _len3 = arguments.length, arrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        arrs[_key3 - 1] = arguments[_key3];
    }

    return (orderDir ? sortAsc : sortDesc)(lengths(arrs));
});
var trimLengths = function trimLengths() {
    for (var _len4 = arguments.length, arrays = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        arrays[_key4] = arguments[_key4];
    }

    var smallLen = getOrderedLengths(ASC, arrays)[0];
    return arrays.map(function (arr) {
        return length(arr) > smallLen ? slice(0, smallLen, arr) : sliceFromZero(arr);
    });
};
var reduceUntil = function reduceUntil(pred, op, agg, arr) {
    var limit = length(arr);
    if (limit === 0) {
        return agg;
    }
    var ind = 0,
        result = agg,
        keys$$1 = keys(arr),
        key = void 0;
    for (; ind < limit; ind++) {
        key = keys$$1[ind];
        if (pred(arr[key], key, arr)) {
            break;
        }
        result = op(result, arr[key], key, arr);
    }
    return result;
};
var reduceRightUntil = function reduceRightUntil(pred, op, agg, arr) {
    var limit = length(arr);
    if (limit === 0) {
        return agg;
    }
    var ind = limit - 1,
        result = agg,
        keys$$1 = keys(arr),
        key = void 0;
    for (; ind >= 0; ind--) {
        key = keys$$1[ind];
        if (pred(arr[key], key, arr)) {
            break;
        }
        result = op(result, arr[key], key, arr);
    }
    return result;
};
var aggregateStr = function aggregateStr(agg, item) {
    agg += item;
    return agg;
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
var reduce$1 = curry(function (operation, agg, arr) {
    return reduceUntil(function () {
        return false;
    }, // predicate
    operation, // operation
    agg, // aggregator
    arr);
});
var reduceRight$1 = curry(function (operation, agg, arr) {
    return reduceRightUntil(function () {
        return false;
    }, // predicate
    operation, // operation
    agg, // aggregator
    arr);
});
var strConcat = function strConcat(x) {
    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
    }

    return reduce$1(aggregateStr, x, args);
};
var indexOf = fPureTakesOne('indexOf');
var lastIndex = function lastIndex(x) {
    var len = length(x);return len ? len - 1 : 0;
};
var append = curry(function (xs1, xs2) {
    return (isArray(xs1) ? concat : strConcat)(xs1, xs2);
});
var appendMany = curry2(function (x) {
    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
    }

    return (isArray(x) ? concat : strConcat).apply(undefined, [x].concat(args));
});
var head = function head(x) {
    return x[0];
};
var last = function last(functor) {
    return functor[lastIndex(functor)];
};
var tail = function tail(functor) {
    return sliceToEndFrom(1, functor);
};
var init = function init(functor) {
    return slice(0, lastIndex(functor), functor);
};
var uncons = function uncons(x) {
    var len = length(x);
    if (len === 0) {
        return undefined;
    }
    return [head(x), tail(x)];
};
var map$1 = curry(function (fn, xs) {
    var ind = -1,
        limit = length(xs),
        out = xs.constructor(),
        aggregate = aggregatorByType(xs);
    while (++ind < limit) {
        out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
    }
    return out;
});
var reverse$1 = function reverse$1(x) {
    return reduceRight$1(function (agg, item) {
        agg.push(item);
        return agg;
    }, x.constructor(), x);
};
var intersperse = curry(function (between, arr) {
    var limit = length(arr) - 1,
        aggregator = arr.constructor(),
        aggregatorOp = aggregatorByType(arr);
    return reduce$1(function (agg, item, ind) {
        if (ind === limit) {
            return aggregatorOp(agg, item);
        }
        return aggregatorOp(aggregatorOp(agg, item), between);
    }, aggregator, arr);
});
var intercalate = curry(function (xs, xss) {
    return concat$1(intersperse(xs, xss));
});
var transpose = function transpose(xss) {
    var orderedLengths = getOrderedLengths.apply(undefined, [DESC].concat(toConsumableArray(xss))),
        out = new Array(orderedLengths[0]);
    return reduce$1(function (agg, item) {
        return reduce$1(function (agg2, element, ind2) {
            agg2[ind2].push(element);
            return agg2;
        }, agg, item);
    }, out.map(function (_) {
        return [];
    }), xss);
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
var foldl1 = curry(function (op, xs) {
    var arr = sliceToEndFrom(0, xs);
    return reduce$1(op, arr.shift(), arr);
});
var foldr1 = curry(function (op, xs) {
    var arr = sliceToEndFrom(0, xs);
    return reduceRight$1(op, arr.pop(), arr);
});
var mapAccumL = curry(function (op, zero, xs) {
    var list = sliceToEndFrom(0, xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = 0,
        agg = zero,
        mapped = xs.constructor(),
        tuple = void 0;
    for (; ind < limit; ind++) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
});
var mapAccumR = curry(function (op, zero, xs) {
    var list = sliceToEndFrom(0, xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = limit - 1,
        agg = zero,
        mapped = xs.constructor(),
        tuple = void 0;
    for (; ind >= 0; ind--) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
});
var unfoldr = curry(function (op, x, zero) {
    var ind = 0,
        out = !isset(zero) ? [] : zero,
        aggregator = aggregatorByType(out),
        resultTuple = op(x, ind, out);
    while (isset(resultTuple[1])) {
        out = aggregator(out, resultTuple[0], ind);
        resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
});
var take = curry(function (limit, array) {
    return slice(0, limit, array);
});
var drop = curry(function (count, array) {
    return sliceToEndFrom(count, array);
});
var splitAt = curry(function (ind, arr) {
    return [slice(0, ind, arr), sliceToEndFrom(ind, arr)];
});
var takeWhile = curry(function (pred, arr) {
    var zero = arr.constructor();
    var operation = aggregatorByType(arr);
    return reduceUntil(negateP(pred), // predicate
    operation, // operation
    zero, // aggregator
    arr);
});
var dropWhile = curry(function (pred, arr) {
    var limit = length(arr),
        splitPoint = findIndexWhere(function (item, ind, arr2) {
        return !pred(arr[ind], ind, arr2);
    }, arr);

    return splitPoint === -1 ? slice(0, limit, arr) : slice(splitPoint, limit, arr);
});
var span = curry(function (pred, arr) {
    var splitPoint = findIndexWhere(negateP(pred), arr);
    return splitPoint === -1 ? splitAt(0, arr) : splitAt(splitPoint, arr);
});
var breakOnList = curry(function (pred, arr) {
    var splitPoint = findIndexWhere(pred, arr);
    return splitPoint === -1 ? splitAt(0, arr) : splitAt(splitPoint, arr);
});
var stripPrefix = curry(function (prefix, arr) {
    return isPrefixOf(prefix, arr) ? splitAt(prefix.length, arr)[1] : sliceToEndFrom(0, arr);
});
var at = prop;
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
var find = findWhere;
var filter$1 = curry(function (pred, xs) {
    var ind = 0,
        limit = length(xs),
        aggregator = aggregatorByType(xs),
        out = xs.constructor();
    if (!limit) {
        return out;
    }
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out = aggregator(out, xs[ind]);
        }
    }
    return out;
});
var partition = curry(function (pred, arr) {
    var limit = length(arr),
        receivedString = isString(arr),
        zero = receivedString ? '' : [];
    if (!limit) {
        return [zero, zero];
    }
    return [filter$1(pred, arr), filter$1(negateP(pred), arr)];
});
var elem = curry(function (elm, xs) {
    return indexOf(elm, xs) !== -1;
});
var notElem = curry(function (elm, xs) {
    return indexOf(elm, xs) === -1;
});
var lookup = curry(function (key, xs) {
    return hasOwnProperty(key, xs) ? xs[key] : undefined;
});
var findIndexWhere = curry(function (pred, arr) {
    var ind = -1,
        predicateFulfilled = false;
    var limit = length(arr);
    while (ind < limit && !predicateFulfilled) {
        predicateFulfilled = pred(arr[++ind], ind, arr);
    }
    return ind;
});
var findIndex = findIndexWhere;
var findIndicesWhere = curry(function (pred, xs) {
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
});
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
    var ind = limit2 - 1;
    for (; ind >= 0; ind--) {
        if (xs1[ind] !== xs2[ind]) {
            return false;
        }
    }
    return true;
});
var isInfixOf = curry(function (xs1, xs2) {
    var limit1 = length(xs1),
        limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
        return false;
    }
    var ind = limit2 - 1;
    for (; ind >= 0; ind--) {
        if (xs1[ind] !== xs2[ind]) {
            return false;
        }
    }
    return true;
});
var group = function group(xs) {
    return [xs];
};
var inits = function inits(xs) {
    return [xs];
};
var tails = function tails(xs) {
    return [xs];
};
var flatten = function flatten(arr) {
    return reduce$1(function (agg, elm) {
        if (isArray(elm)) {
            return append(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, [], arr);
};
var flattenMulti = curry2(function (arr0) {
    for (var _len7 = arguments.length, arrays = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        arrays[_key7 - 1] = arguments[_key7];
    }

    return reduce$1(function (agg, arr) {
        return append(agg, flatten(arr));
    }, flatten(arr0), arrays);
});
var zip = curry(function (arr1, arr2) {
    var _trimLengths = trimLengths(arr1, arr2),
        a1 = _trimLengths[0],
        a2 = _trimLengths[1];

    return reduce$1(function (agg, item, ind) {
        agg.push([item, a2[ind]]);
        return agg;
    }, [], a1);
});
var zipN = curry2(function () {
    for (var _len8 = arguments.length, arrs = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        arrs[_key8] = arguments[_key8];
    }

    var lists = apply(trimLengths, arrs);
    return reduce$1(function (agg, arr, ind) {
        if (!ind) {
            return zip(agg, arr);
        }
        return agg.map(function (arr2) {
            arr.forEach(function (elm) {
                arr2.push(elm);
            });
            return arr2;
        });
    }, lists.shift(), lists);
});
var zipWith = curry(function (combinator, xs1, xs2) {
    return [];
});
var unzip = function unzip(arr) {
    return reduce$1(function (agg, item) {
        agg[0].push(item[0]);
        agg[1].push(item[1]);
        return agg;
    }, [[], []], arr);
};
var unzipN = function unzipN() {
    for (var _len9 = arguments.length, arrs = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        arrs[_key9] = arguments[_key9];
    }

    return reduce$1(function (agg, item) {
        agg.push(unzip(item));
        return agg;
    }, [], arrs);
};
var concat$1 = function concat$1(foldableOfA) {
    return appendMany.apply(undefined, toConsumableArray(foldableOfA));
};
var concatMap = curry(function (fn, foldableOfA) {
    return concat$1(map$1(fn, foldableOfA));
});
var any = curry(function (p, xs) {
    return reduceUntil(p, function (_) {
        return true;
    }, false, xs);
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
var and$1 = all(isTruthy);
var or$1 = any(isTruthy);
var not$1 = all(isFalsy);
var equal$1 = curry2(function (arg0) {
    for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        args[_key10 - 1] = arguments[_key10];
    }

    return all(function (x) {
        return arg0 === x;
    }, args);
});
var sum = function sum(arr) {
    var parts = uncons(arr);
    return reduce$1(function (agg, x) {
        return agg + x;
    }, parts[0], parts[1]);
};
var product = function product(arr) {
    var parts = uncons(arr);
    return reduce$1(function (agg, x) {
        return agg * x;
    }, parts[0], parts[1]);
};
var maximum = function maximum(arr) {
    return apply(Math.max, arr);
};
var minimum = function minimum(arr) {
    return apply(Math.min, arr);
};
var arrayUnion = curry(function (arr1, arr2) {
    return append(arr1, filter$1(function (elm) {
        return indexOf(elm, arr1) === -1;
    }, arr2));
});
var arrayIntersect = curry(function (arr1, arr2) {
    return length(arr2) === 0 ? [] : filter$1(function (elm) {
        return indexOf(elm, arr2) > -1;
    }, arr1);
});
var arrayDifference = curry(function (array1, array2) {
    // augment this with max length and min length ordering on op
    var _sortDescByLength = sortDescByLength(array1, array2),
        _sortDescByLength2 = slicedToArray(_sortDescByLength, 2),
        arr1 = _sortDescByLength2[0],
        arr2 = _sortDescByLength2[1];

    if (!arr2 || length(arr2) === 0) {
        return slice(0, length(arr1), arr1);
    }
    return reduce$1(function (agg, elm) {
        if (indexOf(elm, arr2) === -1) {
            agg.push(elm);
        }
        return agg;
    }, [], arr1);
});
var arrayComplement = curry2(function (arr0) {
    for (var _len11 = arguments.length, arrays = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        arrays[_key11 - 1] = arguments[_key11];
    }

    return reduce$1(function (agg, arr) {
        return append(agg, arrayDifference(arr0, arr));
    }, [], arrays);
});

var complement = curry(function (functor) {
    for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        others[_key - 1] = arguments[_key];
    }

    switch (typeOf(functor)) {
        case 'Array':
            return arrayComplement.apply(undefined, [functor].concat(others));
        default:
            return objComplement.apply(undefined, [functor].concat(others));
    }
});
var difference = curry(function (functor1, functor2) {
    switch (typeOf(functor1)) {
        case 'Array':
            return arrayDifference(functor1, functor2);
        default:
            return objDifference(functor1, functor2);
    }
});
var union = curry(function (functor1, functor2) {
    switch (typeOf(functor1)) {
        case 'Array':
            return arrayUnion(functor1, functor2);
        default:
            return objUnion(functor1, functor2);
    }
});
var intersect = curry(function (functor1, functor2) {
    switch (typeOf(functor1)) {
        case 'Array':
            return arrayIntersect(functor1, functor2);
        default:
            return objIntersect(functor1, functor2);
    }
});

/**
 * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
 * Generated Sat Aug 12 2017 19:30:43 GMT-0400 (Eastern Daylight Time) 
 */

var version = '0.13.3';

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

exports.version = version;
exports.hasOwnProperty = hasOwnProperty;
exports.length = length;
exports.keys = keys;
exports.assign = assign;
exports.assignDeep = assignDeep;
exports.instanceOf = instanceOf;
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
exports.and = and;
exports.or = or;
exports.not = not;
exports.otherwise = otherwise;
exports.equal = equal;
exports.isTruthy = isTruthy;
exports.isFalsy = isFalsy;
exports.call = call;
exports.apply = apply;
exports.compose = compose;
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
exports.negateP = negateP;
exports.id = id;
exports.flip = flip;
exports.flipN = flipN;
exports.until = until;
exports.split = split;
exports.lines = lines;
exports.words = words;
exports.unwords = unwords;
exports.unlines = unlines;
exports.negate = negate;
exports.complement = complement;
exports.difference = difference;
exports.union = union;
exports.intersect = intersect;

}((this.fjl = this.fjl || {})));
//# sourceMappingURL=fjl.js.map
