define(['exports', './is', './not', './math'], function (exports, _is, _not, _math) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.subClassOf = subClassOf;
    exports.subClassOfMulti = subClassOfMulti;


    /**
     * Normalized the parameters required for `subClassOfPure` and `subClassOf` to operate.
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
            isCtorAndMethods = !(0, _is.isFunction)(constructor),
            _constructor = isCtorAndMethods ? constructor.constructor : constructor,
            _methods = isCtorAndMethods ? (0, _math.subtractObj)(constructor, { constructor: null }) : methods,
            _statics = Object.assign(_extractedStatics, isCtorAndMethods ? methods : statics);

        return {
            constructor: _constructor,
            methods: _methods,
            statics: _statics,
            superClass: superClass
        };
    }

    /**
     * Same as `subClassOf` with out side-effect of `extend` method and `toString` method.
     * @function module:sjl.subClassOfPure
     * @param superClass {Function} - Superclass to inherit from.
     * @param constructor {Function|Object} - Required.  Note:  If this param is an object, then other params shift over by 1 (`methods` becomes `statics` and this param becomes `methods` (constructor key expected else empty stand in constructor is used).
     * @param [methods] {Object|undefined} - Methods for prototype.  Optional.  Note:  If `constructor` param is an object, this param takes the place of the `statics` param.
     * @param [statics] {Object|undefined} - Constructor's static methods.  Optional.  Note:  If `constructor` param is an object, this param is not used.
     * @returns {Function} - Constructor with extended prototype and added statics.
     */
    /**
     * Created by elyde on 12/10/2016.
     */
    function subClassOf(superClass, constructor, methods, statics) {
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
     * Same as subClassOf multi but takes an array of Constructor or one constructor at position one.
     * @param ctorOrCtors {Function|Array<Function>} - SuperClass(es)
     * @param constructorOrMethods {Function|Object}
     * @param methods {Object|undefined}
     * @param statics {Object|undefined}
     * @returns {Function}
     */
    function subClassOfMulti(ctorOrCtors, constructorOrMethods, methods, statics) {
        if ((0, _not.notEmptyAndOfType)(ctorOrCtors, Array)) {
            return ctorOrCtors.reduce(function (agg, Constructor) {
                return subClassOf(Constructor, agg);
            }, subClassOf(ctorOrCtors.shift(), constructorOrMethods, methods, statics));
        }
        return subClassOf.apply(null, arguments);
    }

    exports.default = {
        subClassOf: subClassOf,
        subClassOfMulti: subClassOfMulti
    };
});