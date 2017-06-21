'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fjl = function () {
    'use strict';

    /**
     * Created by elyde on 12/6/2016.
     */

    /**
     * PlaceHolder (__) constructor.
     * @constructor PlaceHolder
     * @private
     */

    var PlaceHolder = function PlaceHolder() {};
    var placeHolderInstance = new PlaceHolder();

    /**
     * Checks to see if value is a `PlaceHolder`.
     * @param instance {*}
     * @returns {boolean}
     */
    function isPlaceHolder(instance) {
        return instance instanceof PlaceHolder;
    }

    /**
     * Replaces `placeholder` values in `array`.
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
     * Currys passed in function along with passed in arguments passed.
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {function(...[*]=)}
     */
    function curry(fn) {
        for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            argsToCurry[_key - 1] = arguments[_key];
        }

        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var concatedArgs = replacePlaceHolders(argsToCurry, args),
                placeHolders = concatedArgs.filter(isPlaceHolder),
                canBeCalled = placeHolders.length === 0;
            return canBeCalled ? fn.apply(null, concatedArgs) : curry.apply(null, [fn].concat(concatedArgs));
        };
    }

    /**
     * Pure curry.
     * @param fn
     * @param argsToCurry
     * @returns {function(...[*]=): *}
     */
    function pureCurry(fn) {
        for (var _len3 = arguments.length, argsToCurry = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            argsToCurry[_key3 - 1] = arguments[_key3];
        }

        return function () {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return fn.apply(null, argsToCurry.concat(args));
        };
    }

    /**
     * Curry's a function passed in `executeArity` also curries any arguments passed in from the `curriedArgs` arg and forward.
     * @param fn {Function}
     * @param executeArity {Number}
     * @param curriedArgs {...*}
     * @returns {function(...[*]=)} - Passed in function wrapped in a function for currying.
     */
    function pureCurryN(fn, executeArity) {
        for (var _len5 = arguments.length, curriedArgs = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
            curriedArgs[_key5 - 2] = arguments[_key5];
        }

        return function () {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
            }

            var concatedArgs = curriedArgs.concat(args),
                canBeCalled = concatedArgs.length >= executeArity || !executeArity;
            return !canBeCalled ? pureCurryN.apply(null, [fn, executeArity].concat(concatedArgs)) : fn.apply(null, concatedArgs);
        };
    }

    /**
     * Curry's a function passed in `executeArity` also curries any arguments passed in from the `curriedArgs` arg and forward.
     * @param fn {Function}
     * @param executeArity {Number}
     * @param curriedArgs {...*}
     * @returns {function(...[*]=)} - Passed in function wrapped in a function for currying.
     */
    function curryN(fn, executeArity) {
        for (var _len7 = arguments.length, curriedArgs = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
            curriedArgs[_key7 - 2] = arguments[_key7];
        }

        return function () {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            var concatedArgs = replacePlaceHolders(curriedArgs, args),
                placeHolders = concatedArgs.filter(isPlaceHolder),
                canBeCalled = concatedArgs.length - placeHolders.length >= executeArity || !executeArity;
            return !canBeCalled ? curryN.apply(null, [fn, executeArity].concat(concatedArgs)) : fn.apply(null, concatedArgs);
        };
    }

    /**
     * Place holder object (frozen) used by curry.
     * @type {PlaceHolder}
     */
    var __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
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
    var pureCurry2 = function pureCurry2(fn) {
        return pureCurryN(fn, 2);
    };
    var pureCurry3 = function pureCurry3(fn) {
        return pureCurryN(fn, 3);
    };
    var pureCurry4 = function pureCurry4(fn) {
        return pureCurryN(fn, 4);
    };
    var pureCurry5 = function pureCurry5(fn) {
        return pureCurryN(fn, 5);
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
     * @function module:sjl.typeOf
     * @param value {*}
     * @returns {string} - A string representation of the type of the value; E.g., 'Number' for `0`
     */
    function typeOf(value) {
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
    }

    /**
     * Checks to see if an object is of type 'constructor name'.
     * Note: If passing in constructors as your `type` to check, ensure they are *'named' constructors
     * as the `name` property is checked directly on them to use in the class/constructor-name comparison.
     * *'named' constructors - Not anonymous functions/constructors but ones having a name:  E.g.,
     * ```
     * (function Hello () {}) // Named function.
     * (function () {}) // Anonymous function.
     * ```
     * @function module:sjl.typeOfIs
     * @param obj {*} - Object to be checked.
     * @param type {String|Function} - Either a constructor name or an constructor itself.
     * @returns {Boolean} - Whether object matches class string or not.
     */
    function typeOfIs(obj, type) {
        return typeOf(obj) === (type instanceof Function ? type.name : type);
    }

    /**
     * Created by elyde on 12/18/2016.
     */
    /**
     * Created by elyde on 12/10/2016.
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
     * Returns whether object is an instance of constructor passed in parameter 1.
     * @instanceConstructor {Function|Class}
     * @instance {*}
     * @returns {Boolean}
     */

    /**
     * Returns whether a value is a function or not.
     * @function module:sjl.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    function isFunction(value) {
        return value instanceof Function;
    }

    /**
     * Checks to see if value passed in is set (not undefined and not null).
     * @function module:sjl.isset
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    function isset(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== _undefined && value !== null;
    }

    /**
     * Checks whether a value isset and if it's type is the same as the type name passed in.
     * @function module:sjl.issetAndOfType
     * @param value {*} - Value to check on.
     * @param type {String|Function} - Constructor name string or Constructor.  You can pass one or more types.
     * @returns {Boolean}
     */
    function issetAndOfType(value, type) {
        return isset(value) && typeOfIs(value, type);
    }

    /**
     * Checks if value is an array.
     * @function module:sjl.isArray
     * @param value {*}
     * @returns {boolean}
     */
    function isArray(value) {
        return Array.isArray(value);
    }

    /**
     * Checks whether value is an object or not.
     * @function module:sjl.isObject
     * @param value
     * @returns {Boolean}
     */
    function isObject(value) {
        return typeOfIs(value, _Object);
    }

    /**
     * Checks if value is a boolean.
     * @function module:sjl.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    function isBoolean(value) {
        return typeOfIs(value, _Boolean);
    }

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:sjl.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    function isNumber(value) {
        return typeOfIs(value, _Number);
    }

    /**
     * Checks whether value is a string or not.
     * @function module:sjl.isString
     * @param value {*}
     * @returns {Boolean}
     */
    function isString(value) {
        return typeOfIs(value, _String);
    }

    /**
     * Checks whether value is of `Map` or not.
     * @function module:sjl.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    function isMap(value) {
        return typeOfIs(value, _Map);
    }

    /**
     * Checks whether value is of `Set` or not.
     * @function module:sjl.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    function isSet(value) {
        return typeOfIs(value, _Set);
    }

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:sjl.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    function isWeakMap(value) {
        return typeOfIs(value, _WeakMap);
    }

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:sjl.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    function isWeakSet(value) {
        return typeOfIs(value, _WeakSet);
    }

    /**
     * Checks if value is undefined.
     * @function module:sjl.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    function isUndefined(value) {
        return typeOfIs(value, _Undefined);
    }

    /**
     * Checks if value is null.
     * @function module:sjl.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    function isNull(value) {
        return typeOfIs(value, _Null);
    }

    /**
     * Checks if value is a `Symbol`.
     * @function module:sjl.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    function isSymbol(value) {
        return typeOfIs(value, 'Symbol');
    }

    /**
     * Checks to see if passed in argument is empty.
     * @function module:sjl.empty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    function isEmpty(value) {
        var typeOfValue = typeOf(value);
        var retVal;

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

    function assignDeep(obj0) {
        for (var _len9 = arguments.length, objs = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
            objs[_key9 - 1] = arguments[_key9];
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
    }

    function assign(obj0) {
        for (var _len10 = arguments.length, objs = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
            objs[_key10 - 1] = arguments[_key10];
        }

        if (Object.assign) {
            return Object.assign.apply(Object, [obj0].concat(objs));
        }
        return objs.reduce(function (topAgg, obj) {
            return Object.keys(obj).reduce(function (agg, key) {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    }

    /**
     * Created by elyde on 12/6/2016.
     */

    /**
     * Compose combinator;  Allows to combine many functions into one;  Functions list gets reduced from right to left
     * and each function on receives the return value of the function that comes after it.
     * @param args {...Function}
     * @returns {function(*=): *}
     */
    function compose() {
        for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
            args[_key11] = arguments[_key11];
        }

        return function (arg0) {
            return args.reduceRight(function (value, fn) {
                return fn(value);
            }, arg0);
        };
    }

    /**
     * Created by elyde on 12/18/2016.
     */

    /**
     * Returns true if an element is not empty and is of type.
     * @function module:sjl.notEmptyAndOfType
     * @param value {*} - Value to check.
     * @param type {String|Function} - Type to check against (string name or actual constructor).
     * @returns {Boolean}
     */
    function notEmptyAndOfType(value, type) {
        return !isEmpty(value) && typeOfIs(value, type);
    }

    /**
     * Created by elyde on 12/10/2016.
     * Set functions for objects.
     */

    var hasOwnProperty = function hasOwnProperty(x, propName) {
        return Object.prototype.hasOwnProperty.call(x, propName);
    };
    var union = function union(obj1, obj2) {
        return assignDeep(obj1, obj2);
    };
    var intersect = function intersect(obj1, obj2) {
        return Object.keys(obj1).reduce(function (agg, key) {
            if (hasOwnProperty(obj2, key)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {});
    };
    var difference = function difference(obj1, obj2) {
        return Object.keys(obj1).reduce(function (agg, key) {
            if (!hasOwnProperty(obj2, key)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {});
    };
    var complement = function complement(obj0) {
        for (var _len12 = arguments.length, objs = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
            objs[_key12 - 1] = arguments[_key12];
        }

        return objs.reduce(function (agg, obj) {
            return assignDeep(agg, difference(obj, obj0));
        }, {});
    };

    /**
     * Created by elyde on 12/10/2016.
     */
    /**
     * Normalized the parameters required for `subClassPure` and `subClass` to operate.
     * @param superClass {Function} - Superclass to inherit from.
     * @param constructor {Function|Object} - Required.  Note:  If this param is an object, then other params shift over by 1 (`methods` becomes `statics` and this param becomes `methods` (constructor key expected else empty stand in constructor is used).
     * @param methods {Object|undefined} - Methods for prototype.  Optional.  Note:  If `constructor` param is an object, this param takes the place of the `statics` param.
     * @param statics {Object|undefined} - Constructor's static methods.  Optional.  Note:  If `constructor` param is an object, this param is not used.
     * @returns {{constructor: (Function|*), methods: *, statics: *, superClass: (*|Object)}}
     */
    function normalizeArgsForDefineSubClass(superClass, constructor, methods, statics) {
        var _extractedStatics = Object.keys(superClass).reduce(function (agg, key) {
            agg[key] = superClass[key];
            return agg;
        }, {}),
            isCtorAndMethods = !isFunction(constructor),
            _constructor = isCtorAndMethods ? constructor.constructor : constructor,
            _methods = isCtorAndMethods ? difference(constructor, { constructor: null }) : methods,
            _statics = assign(_extractedStatics, isCtorAndMethods ? methods : statics);

        return {
            constructor: _constructor,
            methods: _methods,
            statics: _statics,
            superClass: superClass
        };
    }

    /**
     * Same as `subClass` with out side-effect of `extend` method and `toString` method.
     * @function module:sjl.subClassPure
     * @param superClass {Function} - Superclass to inherit from.
     * @param constructor {Function|Object} - Required.  Note:  If this param is an object, then other params shift over by 1 (`methods` becomes `statics` and this param becomes `methods` (constructor key expected else empty stand in constructor is used).
     * @param [methods] {Object|undefined} - Methods for prototype.  Optional.  Note:  If `constructor` param is an object, this param takes the place of the `statics` param.
     * @param [statics] {Object|undefined} - Constructor's static methods.  Optional.  Note:  If `constructor` param is an object, this param is not used.
     * @returns {Function} - Constructor with extended prototype and added statics.
     */
    function subClass(superClass, constructor, methods, statics) {
        var normalizedArgs = normalizeArgsForDefineSubClass.call(null, superClass, constructor, methods, statics),
            _superClass = normalizedArgs.superClass,
            _statics = normalizedArgs.statics,
            _constructor = normalizedArgs.constructor,
            _methods = normalizedArgs.methods;

        // Set prototype
        _constructor.prototype = Object.create(_superClass.prototype);

        // Define constructor
        Object.defineProperty(_constructor.prototype, 'constructor', { value: _constructor });

        // Extend constructor
        assign(_constructor.prototype, _methods);
        assign(_constructor, _statics);

        // Return constructor
        return _constructor;
    }

    /**
     * Same as subClass multi but takes an array of Constructor or one constructor at position one.
     * @param ctorOrCtors {Function|Array<Function>} - SuperClass(es)
     * @param constructorOrMethods {Function|Object}
     * @param [methods] {Object|undefined}
     * @param [statics] {Object|undefined}
     * @returns {Function}
     */
    function subClassMulti(ctorOrCtors, constructorOrMethods, methods, statics) {
        if (notEmptyAndOfType(ctorOrCtors, Array)) {
            return ctorOrCtors.reduce(function (agg, Constructor) {
                return subClass(Constructor, agg);
            }, subClass(ctorOrCtors.shift(), constructorOrMethods, methods, statics));
        }
        return subClass(ctorOrCtors, constructorOrMethods, methods, statics);
    }

    /**
     * Created by elyde on 1/20/2017.
     */

    var typesListToString = function typesListToString(types) {
        return types.reduce(function (agg, Type, index) {
            var typeName = Type instanceof Function ? Type.name : Type;
            return agg + '"' + typeName + '"' + (index !== types.length - 1 ? ', ' : ']');
        }, '[');
    };

    function errorIfNotTypeFactory(contextName) {
        contextName = contextName || 'unNamedContext';
        return function (key, value) {
            for (var _len13 = arguments.length, types = Array(_len13 > 2 ? _len13 - 2 : 0), _key13 = 2; _key13 < _len13; _key13++) {
                types[_key13 - 2] = arguments[_key13];
            }

            if (types.some(function (Type) {
                return typeOfIs(value, Type);
            })) {
                return;
            }
            throw new Error(contextName + '.' + key + ' is required to be of one of the types : ' + typesListToString(types) + '.  Type received: ' + typeOf(value));
        };
    }

    errorIfNotTypeFactory.typeListToString = typesListToString;

    /**
     * Created by edlc on 5/1/17.
     */

    var call = function call(fn, x) {
        for (var _len14 = arguments.length, args = Array(_len14 > 2 ? _len14 - 2 : 0), _key14 = 2; _key14 < _len14; _key14++) {
            args[_key14 - 2] = arguments[_key14];
        }

        return fn.call.apply(fn, [x].concat(args));
    };
    var apply = function apply(fn, x, args) {
        return fn.apply(x, args);
    };

    /**
     * Created by elyde on 12/29/2016.
     */
    /**
     * Created by elyde on 12/10/2016.
     * Set functions for arrects.
     */

    var concat = pureCurry2(function (arr0) {
        for (var _len15 = arguments.length, arrays = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
            arrays[_key15 - 1] = arguments[_key15];
        }

        return arr0.concat.apply(arr0, arrays);
    });
    var filter$1 = pureCurry2(function (fn, arr) {
        return arr.filter(fn);
    });
    var reduce$1 = pureCurry2(function (fn, agg, arr) {
        return arr.reduce(fn, agg);
    });
    var sortAscByLength = function sortAscByLength(arr1, arr2) {
        return [arr1, arr2].sort(function (a, b) {
            var aLen = a.length,
                bLen = b.length;
            if (aLen > bLen) {
                return -1;
            } else if (bLen > aLen) {
                return 1;
            }
            return 0;
        });
    };

    var union$2 = pureCurry2(function (arr1, arr2) {
        var whereNotInArray1 = function whereNotInArray1(elm) {
            return arr1.indexOf(elm) === -1;
        };
        return concat(arr1, filter$1(whereNotInArray1, arr2));
    });
    var intersect$2 = pureCurry2(function (arr1, arr2) {
        return arr2.length === 0 ? [] : filter$1(function (elm) {
            return arr2.indexOf(elm) > -1;
        }, arr1);
    });
    var difference$2 = pureCurry2(function (array1, array2) {
        // augment this with max length and min length ordering on op
        var _sortAscByLength = sortAscByLength(array1, array2),
            _sortAscByLength2 = _slicedToArray(_sortAscByLength, 2),
            arr1 = _sortAscByLength2[0],
            arr2 = _sortAscByLength2[1];

        if (arr2.length === 0) {
            return arr1.slice();
        }
        return reduce$1(function (agg, elm) {
            if (arr2.indexOf(elm) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    });
    var complement$2 = pureCurry2(function (arr0) {
        for (var _len16 = arguments.length, arrays = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
            arrays[_key16 - 1] = arguments[_key16];
        }

        return reduce$1(function (agg, arr) {
            return concat(agg, difference$2(arr, arr0));
        }, [], arrays);
    });

    /**
     * Created by elyde on 12/11/2016.
     */
    var map = pureCurry2(function (fn, functor) {
        return functor.map(fn);
    });
    var filter = pureCurry2(function (fn, functor) {
        return functor.filter(fn);
    });
    var reduce = pureCurry3(function (fn, agg, functor) {
        return functor.reduce(fn, agg);
    });
    var reduceRight = pureCurry3(function (fn, agg, functor) {
        return functor.reduceRight(fn, agg);
    });
    var complement$1 = pureCurry2(function (functor) {
        for (var _len17 = arguments.length, others = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
            others[_key17 - 1] = arguments[_key17];
        }

        switch (typeOf(functor)) {
            case 'Array':
                return complement$2.apply(undefined, [functor].concat(others));
            default:
                return complement.apply(undefined, [functor].concat(others));
        }
    });
    var difference$1 = pureCurry2(function (functor1, functor2) {
        switch (typeOf(functor1)) {
            case 'Array':
                return difference$2(functor1, functor2);
            default:
                return difference(functor1, functor2);
        }
    });
    var union$1 = pureCurry2(function (functor1, functor2) {
        switch (typeOf(functor1)) {
            case 'Array':
                return union$2(functor1, functor2);
            default:
                return union(functor1, functor2);
        }
    });
    var intersect$1 = pureCurry2(function (functor1, functor2) {
        switch (typeOf(functor1)) {
            case 'Array':
                return intersect$2(functor1, functor2);
            default:
                return intersect(functor1, functor2);
        }
    });

    /**
     * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
     * Generated Wed Jun 21 2017 17:14:04 GMT-0400 (EDT) 
     */

    var version = '0.10.0';

    /**
     * Created by elyde on 12/6/2016.
     */

    var fjl = {
        __: __,
        apply: apply,
        arrayComplement: complement$2,
        arrayDifference: difference$2,
        arrayIntersect: intersect$2,
        arrayUnion: union$2,
        assign: assign,
        assignDeep: assignDeep,
        call: call,
        complement: complement$1,
        compose: compose,
        curry: curry,
        curryN: curryN,
        curry2: curry2,
        curry3: curry3,
        curry4: curry4,
        curry5: curry5,
        difference: difference$1,
        errorIfNotTypeFactory: errorIfNotTypeFactory,
        filter: filter,
        intersect: intersect$1,
        isset: isset,
        issetAndOfType: issetAndOfType,
        isNumber: isNumber,
        isFunction: isFunction,
        isArray: isArray,
        isBoolean: isBoolean,
        isObject: isObject,
        isString: isString,
        isMap: isMap,
        isSet: isSet,
        isWeakSet: isWeakSet,
        isWeakMap: isWeakMap,
        isUndefined: isUndefined,
        isNull: isNull,
        isSymbol: isSymbol,
        isEmpty: isEmpty,
        isConstructablePrimitive: isConstructablePrimitive,
        map: map,
        notEmptyAndOfType: notEmptyAndOfType,
        pureCurry: pureCurry,
        pureCurryN: pureCurryN,
        pureCurry2: pureCurry2,
        pureCurry3: pureCurry3,
        pureCurry4: pureCurry4,
        pureCurry5: pureCurry5,
        objComplement: complement,
        objDifference: difference,
        objIntersect: intersect,
        objUnion: union,
        reduce: reduce,
        reduceRight: reduceRight,
        subClass: subClass,
        subClassMulti: subClassMulti,
        typeOf: typeOf,
        typeOfIs: typeOfIs,
        union: union$1,
        version: version
    };

    return fjl;
}();