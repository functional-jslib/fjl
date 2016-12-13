/**
 * Created by elyde on 12/10/2016.
 */
import {isFunction, isObject, isset, notEmptyAndOfType} from './type-checking';
import {objDiff} from './obj-math';


/**
 * Generates a 'stand-in' constructor that calls `superClass` internally.
 * Used in methods that require a super class or constructor as a parameter
 * and none is given.
 * @param superClass {Function} - Super class constructor.  Required.
 * @returns {Function}
 */
export function standInConstructor(superClass) {
    return function StandInConstructor() {
        console.warn(
            'An anonymous constructor was used!  Please ' +
            'replace it with a named constructor for best ' +
            'interoperability.'
        );
        superClass.apply(this, arguments);
    };
}

/**
 * Normalized the parameters required for `defineSubClassPure` and `defineSubClass` to operate.
 * @param superClass {Function} - Superclass to inherit from.
 * @param constructor {Function|Object} - Required.  Note:  If this param is an object, then other params shift over by 1 (`methods` becomes `statics` and this param becomes `methods` (constructor key expected else empty stand in constructor is used).
 * @param methods {Object|undefined} - Methods for prototype.  Optional.  Note:  If `constructor` param is an object, this param takes the place of the `statics` param.
 * @param statics {Object|undefined} - Constructor's static methods.  Optional.  Note:  If `constructor` param is an object, this param is not used.
 * @returns {{constructor: (Function|*), methods: *, statics: *, superClass: (*|Object)}}
 */
export function normalizeArgsForDefineSubClass (superClass, constructor, methods, statics) {
    // Snatched statics
    var _statics;

    // Should extract statics?
    if (isFunction(superClass)) {
        // Extract statics
        _statics = Object.keys(superClass).reduce(function (agg, key) {
            if (key === 'extend' || key === 'extendWith') { return agg; }
            agg[key] = superClass[key];
            return agg;
        }, {});
    }

    // Ensure constructor
    constructor = isset(constructor) ? constructor : standInConstructor(superClass);

    // Returned normalized args
    return {
        constructor: constructor,
        methods: methods,
        statics: Object.assign(_statics || {}, statics || {}),
        superClass: superClass
    };
}

export function defineSubClassMulti (ctorOrCtors, constructorOrMethods, methods, statics) {
    if (notEmptyAndOfType(ctorOrCtors, Array)) {
        return ctorOrCtors.reduce(function (agg, Constructor) {
            return defineSubClass(Constructor, agg);
        }, defineSubClass(ctorOrCtors.shift(), constructorOrMethods, methods, statics));
    }
    return defineSubClass.apply(null, arguments);
}

/**
 * Same as `defineSubClass` with out side-effect of `extend` method and `toString` method.
 * @function module:sjl.defineSubClassPure
 * @param superClass {Function} - Superclass to inherit from.
 * @param constructor {Function|Object} - Required.  Note:  If this param is an object, then other params shift over by 1 (`methods` becomes `statics` and this param becomes `methods` (constructor key expected else empty stand in constructor is used).
 * @param [methods] {Object|undefined} - Methods for prototype.  Optional.  Note:  If `constructor` param is an object, this param takes the place of the `statics` param.
 * @param [statics] {Object|undefined} - Constructor's static methods.  Optional.  Note:  If `constructor` param is an object, this param is not used.
 * @returns {Function} - Constructor with extended prototype and added statics.
 */
export function defineSubClass (superClass, constructor, methods, statics) {
    const normalizedArgs = normalizeArgsForDefineSubClass.apply(null, arguments),
        _superClass = normalizedArgs.superClass,
        _statics = normalizedArgs.statics,
        _constructor = normalizedArgs.constructor,
        _methods = normalizedArgs.methods;

    // Set prototype
    _constructor.prototype = Object.create(_superClass.prototype);

    // Define constructor
    Object.defineProperty(_constructor.prototype, 'constructor', {value: _constructor});

    // Extend constructor
    Object.assign(_constructor.prototype, _methods);
    Object.assign(_constructor, _statics);

    // Return constructor
    return _constructor;
}

export default {
    defineSubClass,
    defineSubClassMulti
}
