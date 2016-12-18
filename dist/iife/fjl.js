'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fjl = function () {
    'use strict';

    /**
     * Created by elyde on 12/6/2016.
     */

    /**
     * @param args {...Function}
     * @returns {function(*=): *}
     */

    function compose() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return function (arg0) {
            return args.reduceRight(function (value, arg) {
                return arg(value);
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
        for (var _len2 = arguments.length, argsToCurry = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            argsToCurry[_key2 - 1] = arguments[_key2];
        }

        return function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
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
        for (var _len4 = arguments.length, curriedArgs = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            curriedArgs[_key4 - 2] = arguments[_key4];
        }

        return function () {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
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
        var retVal;
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
     * Check if `value` is of one of the passed in types.
     * @function module:sjl.typeOfIsMulti
     * @param value {*}
     * @param types {...Function|...String} - Constructor or string.
     * @returns {boolean}
     */
    function typeOfIsMulti(value) {
        for (var _len6 = arguments.length, types = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            types[_key6 - 1] = arguments[_key6];
        }

        return types.some(function (_type) {
            return typeOfIs(value, _type);
        });
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
     * Checks if one or more parameters are set (not null and not undefined).
     * @function module:sjl.issetMulti
     * @params {*} - One or more values to check of any type.
     * @returns {Boolean} - True if all params passed in are not null or undefined.
     */
    function issetMulti() {
        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
        }

        return !args.some(function (value) {
            return !isset(value);
        });
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
     * Checks object's own properties to see if it is empty (Object.keys check).
     * @function module:sjl.isEmptyObj
     * @param obj object to be checked
     * @returns {Boolean}
     */
    function isEmptyObj(obj) {
        return Object.keys(obj).length === 0;
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
            retVal = isEmptyObj(value);
        } else {
            retVal = !value;
        }

        return retVal;
    }

    /**
     * Checks to see if any of the values passed in are empty (null, undefined, empty object, empty array, or empty string).
     * @function module:sjl.emptyMulti
     * @params {*} - One or more params of any type.
     * @returns {Boolean} - Returns true if any of the values passed in are empty (null, undefined, empty object, empty array, or empty string).
     */
    function isEmptyMulti() {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
        }

        return args.some(function (value) {
            return isEmpty(value);
        });
    }

    /**
     * Created by elyde on 12/18/2016.
     */

    /**
     * Retruns a boolean based on whether a key on an object has an empty value or is empty (not set, undefined, null)
     * @function module:sjl.notOfTypeOrEmpty
     * @param value {Object} - Object to search on.
     * @param type {String} - Optional. Type Name to check for match for;  E.g., 'Number', 'Array', 'HTMLMediaElement' etc..
     * @returns {Boolean}
     */
    function notOfTypeOrEmpty(value, type) {
        return isEmpty(value) || !typeOfIs(value, type);
    }

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
     */

    function subtractObj(obj1, obj2) {
        return Object.keys(obj1).reduce(function (agg, key) {
            if (!obj2.hasOwnProperty(key)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {});
    }

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
            if (key === 'extend' || key === 'extendWith') {
                return agg;
            }
            agg[key] = superClass[key];
            return agg;
        }, {}),
            isCtorAndMethods = !isFunction(constructor),
            _constructor = isCtorAndMethods ? constructor.constructor : constructor,
            _methods = isCtorAndMethods ? subtractObj(constructor, { constructor: null }) : methods,
            _statics = Object.assign(_extractedStatics, isCtorAndMethods ? methods : statics);

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
        Object.assign(_constructor.prototype, _methods);
        Object.assign(_constructor, _statics);

        // Return constructor
        return _constructor;
    }

    /**
     * Same as subClass multi but takes an array of Constructor or one constructor at position one.
     * @param ctorOrCtors {Function|Array<Function>} - SuperClass(es)
     * @param constructorOrMethods {Function|Object}
     * @param methods {Object|undefined}
     * @param statics {Object|undefined}
     * @returns {Function}
     */
    function subClassMulti(ctorOrCtors, constructorOrMethods, methods, statics) {
        if (notEmptyAndOfType(ctorOrCtors, Array)) {
            return ctorOrCtors.reduce(function (agg, Constructor) {
                return subClass(Constructor, agg);
            }, subClass(ctorOrCtors.shift(), constructorOrMethods, methods, statics));
        }
        return subClass.apply(null, arguments);
    }

    /**
     * Created by elyde on 12/6/2016.
     */
    var createSymbol = function createSymbol(value) {
        return Symbol ? Symbol(value) : value;
    };
    var createFjlSymbol = function createFjlSymbol(key) {
        return createSymbol('@@fjl/' + key);
    };

    var symbols = Object.freeze(['equals', 'concat', 'empty', 'map', 'ap', 'of', 'alt', 'zero', 'reduce', 'traverse', 'chain', 'chainRec', 'extend', 'extract', 'bimap', 'promap', 'placeholder'].reduce(function (agg, key) {
        Object.defineProperty(agg, key, {
            value: createFjlSymbol(key),
            enumerable: true
        });
        return agg;
    }, {
        createFjlSymbol: createFjlSymbol,
        createSymbol: createSymbol
    }));

    var symbols$1 = Object.freeze({
        default: symbols
    });

    /**
     * Created by edlc on 12/9/16.
     */

    function Functor(value) {
        if (!this) {
            return new Functor(value);
        }
        Object.defineProperty(this, 'value', {
            value: value,
            writable: true
        });
    }

    Functor.prototype.map = function (fn) {
        return new this.constructor(fn(this.value));
    };

    Object.defineProperty(Functor.prototype, 'constructor', { value: Functor });

    /**
     * Created by edlc on 12/9/16.
     */
    var BiFunctor = subClass(Functor, function Bifunctor(value1, value2) {
        if (!(this instanceof Bifunctor)) {
            return new Bifunctor(value1, value2);
        }
        Functor.call(this, value1);
        Object.defineProperty(this, 'value2', {
            value: value2,
            writable: true
        });
    }, {
        map1: function map1(fn) {
            return this.map(fn);
        },
        map2: function map2(fn) {
            return new this.constructor(this.value, fn(this.value2));
        },
        first: function first(fn) {
            return this.map1(fn);
        },
        second: function second(fn) {
            return this.map2(fn);
        },


        bimap: function bimap(fn1, fn2) {
            return new this.constructor(fn1(this.value), fn2(this.value2));
        }
    });

    /**
     * Created by edlc on 12/9/16.
     */
    var Applicable = subClass(Functor, function Applicable(value) {
        if (!this) {
            return new Applicable(value);
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
    var Applicative = subClass(Applicable, function Applicative(value) {
        if (!this) {
            return Applicative.of(value);
        }
        Applicable.call(this, value);
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
    var Chainable = subClass(Applicable, function Chainable(value) {
        if (!this) {
            return new Chainable(value);
        }
        Applicable.call(this, value);
    }, {
        join: function join() {
            return this.value instanceof this.constructor ? this.value : new this.constructor(this.value);
        },
        chain: function chain(fn) {
            return this.map(fn).join();
        }
    });

    /**
     * Created by edlc on 12/9/16.
     */
    var Monad = subClassMulti([Applicative, Chainable], function Monad(value) {
        if (!this) {
            return Monad.of(value);
        }
        Applicative.apply(this);
        Chainable.apply(this);
        this.value = value;
    }, null, {
        of: function of(value) {
            return new Monad(value);
        }
    });

    /**
     * Created by elyde on 12/11/2016.
     */
    var _map = curry2(function (fn, functor) {
        return functor.map(fn);
    });
    var _ap = curry2(function (obj1, obj2) {
        return obj1.ap(obj2);
    });
    var _chain = curry2(function (fn, functor) {
        return functor.map(fn).join();
    });
    var _join = function _join(monad) {
        var value = monad.value,
            constructor = monad.constructor;

        return value instanceof constructor ? value : constructor.of(value);
    };

    /**
     * Created by elyde on 12/10/2016.
     */
    var _protected = {
        NothingSingleton: null,
        NothingSingletonCreated: null
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
                _protected.NothingSingleton = Nothing.of();
                Object.freeze(_protected);
            } else if (!this.hasOwnProperty('value')) {
                Object.defineProperty(this, 'value', {
                    value: null
                });
            }
        },
        map: function map() {
            return this;
        },
        join: function join() {
            return this;
        },
        ap: function ap() {
            return this;
        },
        chain: function chain() {
            return this;
        }
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
        var subject = monad.chain(function (value) {
            return value;
        });
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
            return _join(this.value);
        },
        map: function map(fn) {
            return _map(fn, this.value);
        },
        ap: function ap(functor) {
            return _ap(this.value, functor);
        },
        chain: function chain(fn) {
            return _chain(fn, this.value);
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
    var Left = subClass(Just, {
        constructor: function Left(value) {
            if (!(this instanceof Left)) {
                return Left.of(value);
            }
            Just.call(this, value);
        },
        map: function map(fn) {
            _map(fn, this.value);
            return this;
        }
    });
    var Right = subClass(Just, {
        constructor: function Right(value) {
            if (!(this instanceof Right)) {
                return Right.of(value);
            }
            Just.call(this, value);
        }
    }, null, {
        counterConstructor: Left
    });
    var either = curry2(function (leftCallback, rightCallback, monad) {
        var identity = _map(function (value) {
            return value;
        }, monad),
            ctor = identity.constructor;
        if (ctor === Left) {
            return _map(leftCallback, identity);
        } else if (ctor === Right) {
            return _map(rightCallback, identity);
        }
    });
    var Either = subClassMulti([Monad, BiFunctor], {
        constructor: function Either(left, right) {
            if (!(this instanceof Either)) {
                return new Either(left, right);
            }
            BiFunctor.call(this, left, right);
            Monad.call(this);
        }
    }, null, {
        of: function of(value) {
            return new Maybe(value);
        },
        Left: Left,
        Right: Right,
        either: either
    });

    /**
     * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
     * Generated Sun Dec 18 2016 16:19:19 GMT-0500 (Eastern Standard Time) 
     */

    var version = '1.0.0';

    /**
     * Created by elyde on 12/6/2016.
     */
    var fjl = {
        compose: compose,
        curry: curry,
        curryN: curryN,
        curry2: curry2,
        curry3: curry3,
        curry4: curry4,
        curry5: curry5,
        subClass: subClass,
        subClassMulti: subClassMulti,
        subtractObj: subtractObj,
        isset: isset,
        issetMulti: issetMulti,
        issetAndOfType: issetAndOfType,
        typeOf: typeOf,
        typeOfIs: typeOfIs,
        typeOfIsMulti: typeOfIsMulti,
        isNumber: isNumber,
        isFunction: isFunction,
        isArray: isArray,
        isBoolean: isBoolean,
        isObject: isObject,
        isString: isString,
        isUndefined: isUndefined,
        isNull: isNull,
        isSymbol: isSymbol,
        isEmpty: isEmpty,
        isEmptyMulti: isEmptyMulti,
        isEmptyObj: isEmptyObj,
        notOfTypeOrEmpty: notOfTypeOrEmpty,
        notEmptyAndOfType: notEmptyAndOfType,
        symbols: symbols$1,
        Functor: Functor,
        Bifunctor: BiFunctor,
        Applicable: Applicable,
        Applicative: Applicative,
        Chainable: Chainable,
        Monad: Monad,
        Maybe: Maybe,
        Just: Just,
        Nothing: Nothing,
        maybe: maybe,
        Either: Either,
        Left: Left,
        Right: Right,
        either: either,
        version: version
    };

    return fjl;
}();