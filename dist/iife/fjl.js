'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fjl = function () {
    'use strict';

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
    function isOfConstructable(value) {
        return [isNumber, isBoolean, isString, isObject, isArray, isFunction, isMap, isSet, isWeakMap, isWeakSet].some(function (fn) {
            return fn(value);
        });
    }

    /**
     * Created by elyde on 12/25/2016.
     */

    function assignDeep(obj0) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }

        return objs.reduce(function (topAgg, obj) {
            return Object.keys(obj).reduce(function (agg, key) {
                var propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if (Object.prototype.hasOwnProperty.call(agg, key) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
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
        for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            objs[_key2 - 1] = arguments[_key2];
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
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return function (arg0) {
            return args.reduceRight(function (value, fn) {
                return fn(value);
            }, arg0);
        };
    }

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
     * Curry's passed in function along with passed in arguments passed.
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {function(...[*]=)}
     */
    function curry(fn) {
        for (var _len4 = arguments.length, argsToCurry = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            argsToCurry[_key4 - 1] = arguments[_key4];
        }

        return function () {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            var concatedArgs = replacePlaceHolders(argsToCurry, args),
                placeHolders = concatedArgs.filter(isPlaceHolder),
                canBeCalled = placeHolders.length === 0;
            return canBeCalled ? fn.apply(null, concatedArgs) : curry.apply(null, [fn].concat(concatedArgs));
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
        for (var _len6 = arguments.length, curriedArgs = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
            curriedArgs[_key6 - 2] = arguments[_key6];
        }

        return function () {
            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                args[_key7] = arguments[_key7];
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

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var union = function union(obj1, obj2) {
        return assignDeep(obj1, obj2);
    };
    var intersect = function intersect(obj1, obj2) {
        return Object.keys(obj1).reduce(function (agg, key) {
            if (hasOwnProperty.call(obj2, key)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {});
    };
    var difference = function difference(obj1, obj2) {
        return Object.keys(obj1).reduce(function (agg, key) {
            if (!hasOwnProperty.call(obj2, key)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {});
    };
    var complement = function complement(obj0) {
        for (var _len8 = arguments.length, objs = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
            objs[_key8 - 1] = arguments[_key8];
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
     * Created by edlc on 12/9/16.
     */

    function Functor(value) {
        if (!(this instanceof Functor)) {
            return new Functor(value);
        }
        Functor.addValueProperty(this, value);
    }

    Functor.prototype.map = function (fn) {
        return new this.constructor(fn(this.value));
    };

    Functor.addValueProperty = function (instance, value) {
        if (!instance.hasOwnProperty('value')) {
            Object.defineProperty(instance, 'value', {
                value: value,
                writable: true
            });
        }
        return instance;
    };

    Object.defineProperty(Functor.prototype, 'constructor', { value: Functor });

    /**
     * Created by edlc on 12/9/16.
     */
    var Bifunctor = subClass(Functor, function Bifunctor(value1, value2) {
        if (!(this instanceof Bifunctor)) {
            return new Bifunctor(value1, value2);
        }
        Functor.call(this, value1);
        Bifunctor.addValue2Property(this, value2);
    }, {
        first: function first(fn) {
            return new this.constructor(fn(this.value), this.value2);
        },
        second: function second(fn) {
            return new this.constructor(this.value, fn(this.value2));
        },


        bimap: function bimap(fn1, fn2) {
            return new this.constructor(fn1(this.value), fn2(this.value2));
        }
    });

    Bifunctor.addValue2Property = function (instance, value) {
        if (!instance.hasOwnProperty('value2')) {
            Object.defineProperty(instance, 'value2', {
                value: value,
                writable: true
            });
        }
        return instance;
    };

    /**
     * Created by edlc on 12/9/16.
     */
    /**
     * Created by edlc on 12/9/16.
     */
    var Profunctor = subClass(Functor, function Profunctor(value1, value2) {
        if (!(this instanceof Profunctor)) {
            return new Profunctor(value1, value2);
        }
        Functor.call(this, value1);
        Profunctor.addValue2Property(this, value2);
    }, {
        first: function first(fn) {
            return new this.constructor(fn(this.value), this.value2);
        },
        second: function second(fn) {
            return new this.constructor(this.value, fn(this.value2));
        },


        promap: function promap(fn1, fn2) {
            return new this.constructor(fn1(this.value), fn2(this.value2));
        }
    });

    Profunctor.addValue2Property = function (instance, value) {
        if (!instance.hasOwnProperty('value2')) {
            Object.defineProperty(instance, 'value2', {
                value: value,
                writable: true
            });
        }
        return instance;
    };

    /**
     * Created by edlc on 12/9/16.
     */

    var Apply = subClass(Functor, function Apply(value) {
        if (!(this instanceof Apply)) {
            return new Apply(value);
        }
        Functor.call(this, value);
    }, {
        ap: function ap(functor) {
            return functor.map(this.value);
        }
    });

    /**
     * Created by edlc on 12/9/16.
     */
    var Applicative = subClass(Apply, function Applicative(value) {
        if (!(this instanceof Applicative)) {
            return Applicative.of(value);
        }
        Apply.call(this, value);
    }, null, {
        of: function of(value) {
            return new Applicative(value);
        }
    });

    /**
     * Created by edlc on 12/9/16.
     */
    /**
     * Created by edlc on 12/9/16.
     */
    var Chain = subClass(Apply, function Chain(value) {
        if (!(this instanceof Chain)) {
            return new Chain(value);
        }
        Apply.call(this, value);
    }, {
        join: function join() {
            return this.value instanceof this.constructor ? this.value : new this.constructor(this.value);
        },
        chain: function chain(fn) {
            return this.map(fn).join();
        },
        flatMap: function flatMap(fn) {
            return this.chain(fn);
        }
    });

    /**
     * Created by edlc on 12/9/16.
     */
    var Extend = subClass(Functor, function Extend(value) {
        if (!(this instanceof Extend)) {
            return new Extend(value);
        }
        Functor.call(this, value);
    }, {
        extend: function extend(fn) {
            return fn(this);
        }
    });

    /**
     * Created by edlc on 12/9/16.
     */
    /**
     * Created by edlc on 12/9/16.
     */
    var Comonad = subClass(Extend, function Comonad(value) {
        if (!(this instanceof Comonad)) {
            return new Comonad(value);
        }
        Extend.call(this, value);
    }, {
        extract: function extract() {
            return this.value;
        }
    });

    /**
     * Created by edlc on 12/9/16.
     */
    var Monad = subClassMulti([Applicative, Chain], function Monad(value) {
        if (!(this instanceof Monad)) {
            return Monad.of(value);
        }
        Applicative.apply(this);
        Chain.apply(this);
        this.value = value;
    }, null, {
        of: function of(value) {
            return new Monad(value);
        }
    });

    /**
     * Created by elyde on 12/29/2016.
     */
    /**
     * Created by elyde on 12/10/2016.
     * Set functions for arrects.
     */

    var concat$1 = curry2(function (arr0) {
        for (var _len9 = arguments.length, arrays = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
            arrays[_key9 - 1] = arguments[_key9];
        }

        return arr0.concat.apply(arr0, arrays);
    });
    var filter$1 = curry2(function (fn, arr) {
        return arr.filter(fn);
    });
    var reduce$1 = curry2(function (fn, agg, arr) {
        return arr.reduce(fn, agg);
    });
    var union$2 = curry2(function (arr1, arr2) {
        var whereNotInArray1 = function whereNotInArray1(elm) {
            return arr1.indexOf(elm) === -1;
        };
        return concat$1(arr1, filter$1(whereNotInArray1, arr2));
    });
    var intersect$2 = curry2(function (arr1, arr2) {
        return arr2.length === 0 ? [] : filter$1(function (elm) {
            return arr2.indexOf(elm) > -1;
        }, arr1);
    });
    var difference$2 = curry2(function (arr1, arr2) {
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
    var complement$2 = curry2(function (arr0) {
        for (var _len10 = arguments.length, arrays = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
            arrays[_key10 - 1] = arguments[_key10];
        }

        return reduce$1(function (agg, arr) {
            return concat$1(agg, difference$2(arr, arr0));
        }, [], arrays);
    });

    /**
     * Created by elyde on 12/11/2016.
     */
    var id = function id(value) {
        return value;
    };
    var length = function length(something) {
        return something.length;
    };
    var of = function of(functor, value) {
        var constructor = functor.constructor,
            retVal = void 0;
        if (constructor.of) {
            retVal = constructor.of(value);
        } else if (isOfConstructable(functor)) {
            retVal = new constructor(value);
        } else {
            retVal = constructor(value);
        }
        return retVal;
    };
    var _ap = curry2(function (obj1, obj2) {
        return obj1.ap ? obj1.ap(obj2) : obj1(obj2);
    });
    var map$$1 = curry2(function (fn, functor) {
        return functor.map(fn);
    });
    var join$$1 = function join$$1(monad) {
        return Object.prototype.hasOwnProperty.call(monad, 'value') ? monad.value : of(monad);
    };
    var _chain = curry2(function (fn, functor) {
        return join$$1(map$$1(fn, functor));
    });
    var complement$1 = curry2(function (functor) {
        for (var _len11 = arguments.length, others = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
            others[_key11 - 1] = arguments[_key11];
        }

        switch (typeOf(functor)) {
            case 'Object':
                return complement.apply(undefined, [functor].concat(others));
            case 'Array':
                return complement$2.apply(undefined, [functor].concat(others));
            default:
                return complement.apply(undefined, [functor].concat(others));
        }
    });
    var difference$1 = curry2(function (functor1, functor2) {
        switch (typeOf(functor1)) {
            case 'Object':
                return difference(functor1, functor2);
            case 'Array':
                return difference$2(functor1, functor2);
            default:
                return difference(functor1, functor2);
        }
    });
    var union$1 = curry2(function (functor1, functor2) {
        switch (typeOf(functor1)) {
            case 'Object':
                return union(functor1, functor2);
            case 'Array':
                return union$2(functor1, functor2);
            default:
                return union(functor1, functor2);
        }
    });
    var intersect$1 = curry2(function (functor1, functor2) {
        switch (typeOf(functor1)) {
            case 'Object':
                return intersect(functor1, functor2);
            case 'Array':
                return intersect$2(functor1, functor2);
            default:
                return intersect(functor1, functor2);
        }
    });

    /**
     * Created by elyde on 12/10/2016.
     */
    var _protected = {
        NothingSingleton: null,
        NothingSingletonCreated: null
    };
    var returnThis = function returnThis() {
        return this;
    };

    var Nothing = subClass(Monad, {
        constructor: function Nothing() {
            var NothingSingleton = _protected.NothingSingleton,
                NothingSingletonCreated = _protected.NothingSingletonCreated;

            if (NothingSingleton) {
                return NothingSingleton;
            } else if (!(this instanceof Nothing)) {
                return Nothing.of();
            } else if (!NothingSingletonCreated) {
                _protected.NothingSingletonCreated = true;
                _protected.NothingSingleton = this;
                Object.freeze(_protected);
            }
            if (!this.hasOwnProperty('value')) {
                Object.defineProperty(this, 'value', {
                    value: null
                });
            }
        },
        map: returnThis,
        join: returnThis,
        ap: returnThis,
        chain: returnThis
    }, {
        of: function of() {
            return new Nothing();
        }
    });
    var Just = subClass(Monad, {
        constructor: function Just(value) {
            if (!(this instanceof Just)) {
                return Just.of(value);
            }
            Monad.call(this, value);
        },
        map: function map(fn) {
            var constructor = this.constructor;
            return isset(this.value) ? constructor.of(fn(this.value)) : constructor.counterConstructor.of(this.value);
        }
    }, {
        of: function of(value) {
            return new Just(value);
        },
        counterConstructor: Nothing
    });
    var maybe = curry3(function (replacement, fn, monad) {
        var subject = typeOfIs(monad, 'Maybe') ? monad.value.map(id) : monad.map(id);
        return subject instanceof Nothing ? replacement : subject.map(fn).value;
    });
    var Maybe = subClass(Monad, {
        constructor: function Maybe(value) {
            if (!(this instanceof Maybe)) {
                return Maybe.of(value);
            }
            Monad.call(this, Just(value));
        },
        join: function join() {
            return compose(Maybe.of, join$$1, map$$1(id))(this.value);
        },
        map: function map(fn) {
            return compose(Maybe.of, fn, map$$1(id))(this.value);
        },
        ap: function ap(functor) {
            return compose(Maybe.of, _ap(__, functor), map$$1(id))(this.value);
        },
        chain: function chain(fn) {
            return compose(Maybe.of, _chain(fn), map$$1(id))(this.value);
        }
    }, {
        of: function of(value) {
            return new Maybe(value);
        },
        Just: Just,
        Nothing: Nothing,
        maybe: maybe
    });

    /**
     * Created by elyde on 12/10/2016.
     */

    var Left = subClass(Monad, {
        constructor: function Left(value) {
            if (!(this instanceof Left)) {
                return Left.of(value);
            }
            Monad.call(this, value);
        },
        map: function map(fn) {
            fn(this.value);
            return this;
        }
    }, {
        of: function of(value) {
            return new Left(value);
        }
    });
    var Right = subClass(Monad, {
        constructor: function Right(value) {
            if (!(this instanceof Right)) {
                return Right.of(value);
            }
            Monad.call(this, value);
        },
        map: function map(fn) {
            var constructor = this.constructor;
            return isset(this.value) ? constructor.of(fn(this.value)) : constructor.counterConstructor.of(this.value);
        }
    }, {
        of: function of(value) {
            return new Right(value);
        },
        counterConstructor: Left
    });
    var either = curry2(function (leftCallback, rightCallback, monad) {
        var identity = map$$1(function (value) {
            return value;
        }, monad),
            ctor = identity.constructor;
        if (ctor === Left) {
            return map$$1(leftCallback, identity);
        } else if (ctor === Right) {
            return map$$1(rightCallback, identity);
        }
    });
    var Either = subClassMulti([Monad, Bifunctor], {
        constructor: function Either(left, right) {
            if (!(this instanceof Either)) {
                return Either.of(left, right);
            }
            Bifunctor.call(this, left, right);
        }
    }, {
        of: function of(left, right) {
            return new Either(left, right);
        },
        Left: Left,
        Right: Right,
        either: either
    });

    /**
     * Created by elyde on 1/8/2017.
     */

    var DLLNode = subClass(Comonad, function DLLNode(id, value) {
        if (!(this instanceof DLLNode)) {
            return DLLNode.of(id, value);
        }
        Comonad.call(this, isset(value) ? value : null);
        this.id = !isset(id) ? null : id;
        this.prev = null;
        this.next = null;
    }, {
        toString: function toString() {
            return this.constructor.name + '(' + this.id + ', ' + this.value + ')';
        },
        map: function map(fn) {
            return DLLNode.of(this.id, fn(this.value));
        }
    }, {
        of: function of(id, value) {
            return new DLLNode(id, value);
        },
        isDLLNode: function isDLLNode(value) {
            return value instanceof DLLNode;
        }
    });
    var nodeHasValidPrev = function nodeHasValidPrev(node) {
        return isset(node.prev) && isset(node.prev.extract());
    };
    var nodeHasValidNext = function nodeHasValidNext(node) {
        return isset(node.next) && isset(node.next.extract());
    };
    var isDLLNode = DLLNode.isDLLNode;
    var DoublyLinkedList = subClass(Monad, function DoublyLinkedList() {
        if (!(this instanceof DoublyLinkedList)) {
            return DoublyLinkedList.of();
        }
        this.value = this.last = this.head = DLLNode();
    }, {
        insert: function insert(nodeOrId, valueIfId) {
            if (!isset(nodeOrId) || !isDLLNode(nodeOrId) && !isset(valueIfId)) {
                return this;
            }
            var node = isDLLNode(nodeOrId) ? nodeOrId : DLLNode(nodeOrId, valueIfId);
            this.head.prev = node;
            node.next = this.head;
            this.value = this.head = node;
            return this;
        },
        delete: function _delete(nodeOrId) {
            var filteredDll = this.filter(function (node) {
                return nodeOrId === node || node.id === nodeOrId;
            }),
                foundNode,
                nodeHasPrev,
                nodeHasNext;

            if (!nodeHasValidNext(filteredDll.head)) {
                return this;
            }

            foundNode = filteredDll.head.next;
            nodeHasNext = nodeHasValidNext(foundNode);
            nodeHasPrev = nodeHasValidPrev(foundNode);

            if (nodeHasPrev && nodeHasNext) {
                foundNode.prev.next = foundNode.next;
            } else if (nodeHasNext && !nodeHasPrev) {
                this.value = this.head = foundNode.next;
            }

            if (nodeHasValidNext(foundNode.next)) {
                this.delete(foundNode.next.next);
            }

            return this;
        },
        toString: function toString(separator) {
            separator = separator || ' -> ';
            return this.constructor.name + '(' + this.reduce(function (agg, node) {
                return separator + node;
            }, '') + ')';
        },
        filter: function filter(fn) {
            var node = this.head,
                list = DoublyLinkedList();
            while (node) {
                if (fn(node)) {
                    list.insert(node);
                }
                node = node.next;
            }
            return list;
        },
        map: function map(fn) {
            var node = this.head,
                list = DoublyLinkedList();
            while (node) {
                list.insert(fn(node));
                node = node.next;
            }
            return list;
        },
        reduce: function reduce(fn, agg) {
            var node = this.head;
            while (node && isset(node.extract())) {
                agg = fn(agg, node);
                node = node.next;
            }
            return agg;
        },
        reduceRight: function reduceRight(fn, agg) {
            var node = this.last.prev;
            while (node && isset(node.extract())) {
                agg = fn(agg, node);
                node = node.prev;
            }
            return agg;
        }
    }, {
        of: function of() {
            return new DoublyLinkedList();
        },
        DLLNode: DLLNode
    });

    /**
     * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
     * Generated Tue Jan 10 2017 21:53:29 GMT-0500 (Eastern Standard Time) 
     */

    var version = '0.5.1';

    /**
     * Created by elyde on 12/6/2016.
     */
    var fjl = {
        assign: assign,
        assignDeep: assignDeep,
        compose: compose,
        __: __,
        curry: curry,
        curryN: curryN,
        curry2: curry2,
        curry3: curry3,
        curry4: curry4,
        curry5: curry5,
        subClass: subClass,
        subClassMulti: subClassMulti,
        isset: isset,
        issetAndOfType: issetAndOfType,
        typeOf: typeOf,
        typeOfIs: typeOfIs,
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
        notEmptyAndOfType: notEmptyAndOfType,
        complement: complement$1,
        difference: difference$1,
        intersect: intersect$1,
        union: union$1,
        objComplement: complement,
        objDifference: difference,
        objIntersect: intersect,
        objUnion: union,
        arrayDifference: difference$2,
        arrayIntersect: intersect$2,
        arrayComplement: complement$2,
        arrayUnion: union$2,
        length: length,
        Functor: Functor,
        Bifunctor: Bifunctor,
        Profunctor: Profunctor,
        Apply: Apply,
        Applicative: Applicative,
        Chain: Chain,
        Extend: Extend,
        Comonad: Comonad,
        Monad: Monad,
        Maybe: Maybe,
        Just: Just,
        Nothing: Nothing,
        maybe: maybe,
        Either: Either,
        Left: Left,
        Right: Right,
        either: either,
        DoublyLinkedList: DoublyLinkedList,
        version: version
    };

    return fjl;
}();