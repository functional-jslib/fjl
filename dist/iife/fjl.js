(function (exports) {
'use strict';

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
var PlaceHolder = function PlaceHolder() {};
var placeHolderInstance = new PlaceHolder();

/**
 * Curries a function based on it's defined arity (argument's list expected length).
 * @function curry
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
 */
function isPlaceHolder(instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `array`.
 * @function replacePlaceHolder
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `array` with placeholders replaced by values in `args`.
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
 * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function curry_
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
 * Curries a function up to given arity also enforces arity via placeholder values (`__`).
 * @function curryN_
 * @param fn {Function}
 * @param executeArity {Number}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in function wrapped in a function for currying.
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
 * Curries a function up to a given arity.
 * @function curryN
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
var _undefined$1 = 'undefined';

/**
 * Returns the class name of an object from it's class string.
 * @note Returns 'NaN' if value type is 'Number' and value isNaN evaluates to true as of version 0.4.85.
 * @note If your type (constructor/class) overrides it's `toString` method use a named `toString` method to get the accurate constructor name out of `typeOf`;  E.g., If you do override `toString` on your class(es) and don't set them to named functions then `sjl.typeOf*` will use Object.prototype.toString to pull your classes type out.
 * @function module:fjl.typeOf
 * @param value {*}
 * @returns {string} - A string representation of the type of the value; E.g., 'Number' for `0`
 */
var typeOf = function typeOf(value) {
    var retVal = void 0;
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _undefined$1) {
        retVal = _Undefined$1;
    } else if (value === null) {
        retVal = _Null$1;
    } else {
        var constructorName = value.constructor.name;
        retVal = constructorName === _Number$1 && isNaN(value) ? _NaN : constructorName;
    }
    return retVal;
};
var typeOfIs = curry2(function (type, obj) {
    return typeOf(obj) === (type instanceof Function ? type.name : type);
});

/**
 * Created by elyde on 12/18/2016.
 */
/**
 * @author elyde
 * @created 12/10/2016.
 * @module is
 * @type {{isset: module:is.isset, issetAndOfType: module:is.issetAndOfType, isNumber: module:is.isNumber, isFunction: module:is.isFunction, isClass: module:is.isClass, isArray: module:is.isArray, isBoolean: module:is.isBoolean, isObject: module:is.isObject, isString: module:is.isString, isMap: module:is.isMap, isSet: module:is.isSet, isWeakMap: module:is.isWeakMap, isWeakSet: module:is.isWeakSet, isUndefined: module:is.isUndefined, isNull: module:is.isNull, isSymbol: module:is.isSymbol, isEmpty: module:is.isEmpty, instanceOf: Function, isConstructablePrimitive: isConstructablePrimitive, notEmptyAndOfType: module:is.notEmptyAndOfType}}
 */

var _String = String.name;
var _Function = Function.name;
var _Array = Array.name;
var _Number = Number.name;
var _Object = Object.name;
var _Boolean = Boolean.name;
var _Map = 'Map';
var _Set = 'Set';
var _WeakMap = 'WeakMap';
var _WeakSet = 'WeakSet';
var _Null = 'Null';
var _Undefined = 'Undefined';
var _undefined = 'undefined';

/**
 * Returns whether constructor has derived object.
 * @instanceConstructor {Function|Class}
 * @instance {*}
 * @returns {Boolean}
 */
var instanceOf = curry2(function (instanceConstructor, instance) {
    return instance instanceof instanceConstructor;
});

/**
 * Checks if `value` is an es2015 `class`.
 * @function module:is.isClass
 * @param value {*}
 * @returns {boolean}
 */
function isClass(value) {
    return value && /^\s{0,3}class\s{1,3}/.test(value.toString().substr(0, 10));
}

/**
 * Returns whether a value is a function or not.
 * @function module:is.isFunction
 * @param value {*}
 * @returns {Boolean}
 */
function isFunction(value) {
    return !isClass(value) && value instanceof Function;
}

/**
 * Checks to see if value passed in is set (not undefined and not null).
 * @function module:is.isset
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
function isset(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== _undefined && value !== null;
}

/**
 * Checks whether a value isset and if it's type is the same as the type name passed in.
 * @function module:is.issetAndOfType
 * @param value {*} - Value to check on.
 * @param type {String|Function} - Constructor name string or Constructor.  You can pass one or more types.
 * @returns {Boolean}
 */
function issetAndOfType(value, type) {
    return isset(value) && typeOfIs(type, value);
}

/**
 * Checks if value is an array.
 * @function module:is.isArray
 * @param value {*}
 * @returns {boolean}
 */
function isArray(value) {
    return typeOfIs(Array, value);
}

/**
 * Checks whether value is an object or not.
 * @function module:is.isObject
 * @param value
 * @returns {Boolean}
 */
function isObject(value) {
    return typeOfIs(_Object, value);
}

/**
 * Checks if value is a boolean.
 * @function module:is.isBoolean
 * @param value {*}
 * @returns {Boolean}
 */
function isBoolean(value) {
    return typeOfIs(_Boolean, value);
}

/**
 * Checks if value is a valid number (also checks if isNaN so that you don't have to).
 * @function module:is.isNumber
 * @param value {*}
 * @returns {Boolean}
 */
function isNumber(value) {
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
function isUndefined(value) {
    return typeOfIs(_Undefined, value);
}

/**
 * Checks if value is null.
 * @function module:is.isNull
 * @param value {*}
 * @returns {Boolean}
 */
function isNull(value) {
    return typeOfIs(_Null, value);
}

/**
 * Checks if value is a `Symbol`.
 * @function module:is.isSymbol
 * @param value {*}
 * @returns {Boolean}
 */
function isSymbol(value) {
    return typeOfIs('Symbol', value);
}

/**
 * Checks to see if passed in argument is empty.
 * @function module:is.empty
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
function isEmpty(value) {
    var typeOfValue = typeOf(value),
        retVal = void 0;

    if (typeOfValue === _Array || typeOfValue === _String || typeOfValue === _Function) {
        retVal = value.length === 0;
    } else if (typeOfValue === _Number && value !== 0) {
        retVal = false;
    } else if (typeOfValue === _Object) {
        retVal = Object.keys(value).length === 0;
    } else {
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
function notEmptyAndOfType(type, value) {
    return !isEmpty(value) && typeOfIs(type, value);
}

/**
 * Checks to see if value can be constructed from a constructor.
 * @param value {*}
 * @returns {Boolean}
 */
function isConstructablePrimitive(value) {
    return [isNumber, isBoolean, isString, isObject, isArray, isFunction, isMap, isSet, isWeakMap, isWeakSet].some(function (fn) {
        return fn(value);
    });
}

/**
 * Created by elyde on 12/25/2016.
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
            return Object.keys(obj).reduce(function (agg, key) {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    };
}

var assignDeep = function assignDeep(obj0) {
    for (var _len3 = arguments.length, objs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        objs[_key3 - 1] = arguments[_key3];
    }

    return objs.reduce(function (topAgg, obj) {
        return Object.keys(obj).reduce(function (agg, key) {
            var propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
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
};
var assign = defineAssign();

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
var compose = function compose() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (arg0) {
    return args.reduceRight(function (value, fn) {
      return fn(value);
    }, arg0);
  };
};

/**
 * @author edlc
 * @created 5/1/17.
 * @module fnOperators
 * @type {{call: Function, apply: Function, flip: Function, flipN: Function}}
 */
var call = function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return fn.call.apply(fn, [null].concat(args));
};
var apply = function apply(fn, args) {
  return fn.apply(null, args);
};

/**
 * Created by elyde on 12/10/2016.
 * Set functions for objects.
 */

/**
 * @returns {Function}
 */
function defineAssign$1() {
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
            return Object.keys(obj).reduce(function (agg, key) {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    };
}

var assignDeep$1 = function assignDeep$1(obj0) {
    for (var _len3 = arguments.length, objs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        objs[_key3 - 1] = arguments[_key3];
    }

    return objs.reduce(function (topAgg, obj) {
        return Object.keys(obj).reduce(function (agg, key) {
            var propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (agg.hasOwnProperty(key) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
                return agg;
            }
            if (isObject(agg[key]) && isObject(obj[key])) {
                assignDeep$1(agg[key], obj[key]);
            } else {
                agg[key] = obj[key];
            }
            return agg;
        }, topAgg);
    }, obj0);
};
var assign$2 = defineAssign$1();
var hasOwnProperty = curry2(function (x, propName) {
    return x.hasOwnProperty(propName);
});
var toString = function toString(obj) {
    return obj.toString();
};
var length$1 = function length$1(x) {
    return x.length;
};
var keys = function keys(x) {
    return Object.keys(x);
};
var union = curry2(function (obj1, obj2) {
    return assignDeep$1(obj1, obj2);
});
var intersect = curry2(function (obj1, obj2) {
    return Object.keys(obj1).reduce(function (agg, key) {
        if (hasOwnProperty(obj2, key)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {});
});
var difference = curry2(function (obj1, obj2) {
    return Object.keys(obj1).reduce(function (agg, key) {
        if (!hasOwnProperty(obj2, key)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {});
});
var complement = curry2(function (obj0) {
    for (var _len4 = arguments.length, objs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        objs[_key4 - 1] = arguments[_key4];
    }

    return objs.reduce(function (agg, obj) {
        return assignDeep$1(agg, difference(obj, obj0));
    }, {});
});

/**
 * Created by elyde on 7/15/2017.
 */

var negate = (function (x) {
  return isFunction(x) ? function (value) {
    return !x(value);
  } : x * -1;
});

/**
 * Array operators module.
 * @module arrayOperators
 * @type {{complement: Function, difference: Function, intersect: Function, union: Function, flatten: Function, flattenMulti: Function, filter: Function, map: Function, reduce: Function, reduceRight: Function, head: Function, tail: Function, init: Function, last: Function, reverse: Function}}
 */

/**
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

var ASC = 1;
var DESC = -1;
var not = curry2(function (p, elm) {
    return !p(elm);
});
var join = curry2(function (separator, arr) {
    return arr ? arr.join(separator) : '';
});
var concat = curry2(function (arr0) {
    for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arrays[_key - 1] = arguments[_key];
    }

    return arr0.concat.apply(arr0, arrays);
});
var onlyOneOrNegOne = function onlyOneOrNegOne(x) {
    return x === 1 || x === -1 ? x : 1;
};
var getSortByOrder = curry2(function (multiplier) {
    var valueFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (v) {
        return v;
    };

    var x = onlyOneOrNegOne(multiplier),
        ifGreaterThan = 1 * x,
        ifLessThan = -1 * x;
    return function () {
        for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            values[_key2] = arguments[_key2];
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
    return x.length;
});
var head = function head(functor) {
    return functor[0];
};
var tail = function tail(functor) {
    return functor.slice(1);
};
var init = function init(functor) {
    return functor.slice(0, functor.length - 1);
};
var last = function last(functor) {
    return functor[functor.length - 1];
};
var take = curry2(function (limit, array) {
    return array.slice(0, limit - 1);
});
var drop = curry2(function (count, array) {
    return array.slice(count, array.length - 1);
});
var splitStrAt = curry2(function (ind, str) {
    return [str.substring(0, ind), str.substring(ind, str.length)];
});
var splitArrayAt = curry2(function (ind, arr) {
    return [arr.slice(0, ind), arr.slice(ind, arr.length)];
});
var splitAt = curry2(function (ind, x) {
    return isString(x) ? splitStrAt(ind, x) : splitArrayAt(ind, x);
});
var rangeOnIterable = curry2(function (predicate, arr) {
    var ind = 0;
    while (predicate(arr[ind]) && ind < arr.length) {
        ind += 1;
    }return ind;
});
var takeWhile = curry2(function (predicate, arr) {
    return arr.slice(0, rangeOnIterable(predicate, arr));
});
var dropWhile = curry2(function (predicate, arr) {
    return arr.slice(rangeOnIterable(predicate, arr), arr.length - 1);
});
var span = curry2(function (predicate, arr) {
    return [takeWhile(predicate, arr), dropWhile(predicate, arr)];
});
var breakOnList = curry2(function (predicate, arr) {
    return [takeWhile(negate(predicate), arr), dropWhile(negate(predicate), arr)];
});
var lengths = curry2.apply(undefined, toConsumableArray(function (arrs) {
    return arrs.length ? arrs.map(function (arr) {
        return arr.length;
    }) : [];
}));
var orderedLengths = curry2(function (orderDir) {
    for (var _len3 = arguments.length, arrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        arrs[_key3 - 1] = arguments[_key3];
    }

    return length(arrs) ? (orderDir ? sortAsc : sortDesc)(lengths(arrs)) : [];
});
var trimLengths = function trimLengths() {
    for (var _len4 = arguments.length, arrays = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        arrays[_key4] = arguments[_key4];
    }

    var smallLen = orderedLengths(ASC, arrays)[0];
    return arrays.map(function (arr) {
        return arr.length > smallLen ? arr.slice(0, smallLen) : arr.slice(0);
    });
};
var reverse = defineReverse();
var map = curry2(function (fn, functor) {
    return functor.map(fn);
});
var filter = curry2(function (fn, arr) {
    return arr.filter(fn);
});
var reduce = curry2(function (fn, agg, arr) {
    return arr.reduce(fn, agg);
});
var reduceRight = curry3(function (fn, agg, functor) {
    return functor.reduceRight(fn, agg);
});
var flatten = function flatten(arr) {
    return arr.reduce(function (agg, elm) {
        if (Array.isArray(elm)) {
            return concat(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, []);
};
var flattenMulti = curry2(function (arr0) {
    for (var _len5 = arguments.length, arrays = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        arrays[_key5 - 1] = arguments[_key5];
    }

    return reduce(function (agg, arr) {
        return concat(agg, flatten(arr));
    }, flatten(arr0), arrays);
});
var zip = curry2(function (arr1, arr2) {
    var _trimLengths = trimLengths(arr1, arr2),
        a1 = _trimLengths[0],
        a2 = _trimLengths[1];

    return a1.reduce(function (agg, item, ind) {
        agg.push([item, a2[ind]]);
        return agg;
    }, []);
});
var zipN = curry2(function () {
    for (var _len6 = arguments.length, arrs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        arrs[_key6] = arguments[_key6];
    }

    var lists = apply(trimLengths, arrs);
    return lists.reduce(function (agg, arr, ind) {
        if (!ind) {
            return zip(agg, arr);
        }
        return agg.map(function (arr2) {
            arr.forEach(function (elm) {
                arr2.push(elm);
            });
            return arr2;
        });
    }, lists.shift());
});
var unzip = function unzip(arr) {
    return reduce(function (agg, item) {
        agg[0].push(item[0]);
        agg[1].push(item[1]);
        return agg;
    }, [[], []], arr);
};
var unzipN = function unzipN() {
    for (var _len7 = arguments.length, arrs = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        arrs[_key7] = arguments[_key7];
    }

    return reduce(function (agg, item) {
        agg.push(unzip(item));
        return agg;
    }, [], arrs);
};
var union$1 = curry2(function (arr1, arr2) {
    return concat(arr1, filter(function (elm) {
        return arr1.indexOf(elm) === -1;
    }, arr2));
});
var intersect$1 = curry2(function (arr1, arr2) {
    return arr2.length === 0 ? [] : filter(function (elm) {
        return arr2.indexOf(elm) > -1;
    }, arr1);
});
var difference$1 = curry2(function (array1, array2) {
    // augment this with max length and min length ordering on op
    var _sortDescByLength = sortDescByLength(array1, array2),
        _sortDescByLength2 = slicedToArray(_sortDescByLength, 2),
        arr1 = _sortDescByLength2[0],
        arr2 = _sortDescByLength2[1];

    if (!arr2 || arr2.length === 0) {
        return arr1.slice();
    }
    return reduce(function (agg, elm) {
        if (arr2.indexOf(elm) === -1) {
            agg.push(elm);
        }
        return agg;
    }, [], arr1);
});
var complement$1 = curry2(function (arr0) {
    for (var _len8 = arguments.length, arrays = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        arrays[_key8 - 1] = arguments[_key8];
    }

    return reduce(function (agg, arr) {
        return concat(agg, difference$1(arr, arr0));
    }, [], arrays);
});

/**
 * Created by elyde on 12/11/2016.
 * A place to put the common ops (ops that can split between array, object, and possibly other) here.
 */

var complement$2 = curry2(function (functor) {
    for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        others[_key - 1] = arguments[_key];
    }

    switch (typeOf(functor)) {
        case 'Array':
            return complement$1.apply(undefined, [functor].concat(others));
        default:
            return complement.apply(undefined, [functor].concat(others));
    }
});
var difference$2 = curry2(function (functor1, functor2) {
    switch (typeOf(functor1)) {
        case 'Array':
            return difference$1(functor1, functor2);
        default:
            return difference(functor1, functor2);
    }
});
var union$2 = curry2(function (functor1, functor2) {
    switch (typeOf(functor1)) {
        case 'Array':
            return union$1(functor1, functor2);
        default:
            return union(functor1, functor2);
    }
});
var intersect$2 = curry2(function (functor1, functor2) {
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

var split = curry2(function (separator, str) {
  return str ? str.split(separator) : [];
});
var lines = split(/[\n\r]/gm);
var words = split(/[\s\t]/gm);
var unwords = join('\s');
var unlines = join('\n');

/**
 * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
 * Generated Thu Jul 20 2017 17:14:18 GMT-0400 (EDT) 
 */

var version = '0.13.3';

/**
 * Created by elyde on 12/6/2016.
 * @todo Evaluate library for places where we can make it more functional; E.g.,
 *  - Make methods take the functor/monad values as last (where it makes sense)
 */

exports.assign = assign;
exports.assignDeep = assignDeep;
exports.compose = compose;
exports.__ = __;
exports.curry = curry;
exports.curryN = curryN;
exports.curry2 = curry2;
exports.curry3 = curry3;
exports.curry4 = curry4;
exports.curry5 = curry5;
exports.curry_ = curry_;
exports.curryN_ = curryN_;
exports.curry2_ = curry2_;
exports.curry3_ = curry3_;
exports.curry4_ = curry4_;
exports.curry5_ = curry5_;
exports.typeOf = typeOf;
exports.typeOfIs = typeOfIs;
exports.instanceOf = instanceOf;
exports.isset = isset;
exports.issetAndOfType = issetAndOfType;
exports.isNumber = isNumber;
exports.isFunction = isFunction;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isObject = isObject;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isSymbol = isSymbol;
exports.isEmpty = isEmpty;
exports.isMap = isMap;
exports.isSet = isSet;
exports.isWeakMap = isWeakMap;
exports.isWeakSet = isWeakSet;
exports.isConstructablePrimitive = isConstructablePrimitive;
exports.notEmptyAndOfType = notEmptyAndOfType;
exports.call = call;
exports.apply = apply;
exports.objComplement = complement;
exports.objDifference = difference;
exports.objUnion = union;
exports.objIntersect = intersect;
exports.arrayComplement = complement$1;
exports.arrayDifference = difference$1;
exports.arrayUnion = union$1;
exports.arrayIntersect = intersect$1;
exports.flatten = flatten;
exports.flattenMulti = flattenMulti;
exports.map = map;
exports.filter = filter;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.head = head;
exports.tail = tail;
exports.init = init;
exports.last = last;
exports.reverse = reverse;
exports.orderedLengths = orderedLengths;
exports.lengths = lengths;
exports.zip = zip;
exports.zipN = zipN;
exports.getSortByOrder = getSortByOrder;
exports.sortAsc = sortAsc;
exports.sortDesc = sortDesc;
exports.sortDescByLength = sortDescByLength;
exports.concat = concat;
exports.ASC = ASC;
exports.DESC = DESC;
exports.join = join;
exports.unzip = unzip;
exports.unzipN = unzipN;
exports.complement = complement$2;
exports.difference = difference$2;
exports.union = union$2;
exports.intersect = intersect$2;
exports.split = split;
exports.lines = lines;
exports.words = words;
exports.unlines = unlines;
exports.unwords = unwords;
exports.version = version;

}((this.fjl = this.fjl || {})));
//# sourceMappingURL=fjl.js.map
