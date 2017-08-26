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
const PlaceHolder = function PlaceHolder() {},

    /**
     * Placeholder instance.
     * @type {PlaceHolder}
     */
    placeHolderInstance = new PlaceHolder();

/**
 * Curries a functionOps based on it's defined arity (argument's arrayOps expected length).
 * @functionOps curry
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
export function curry (fn, ...argsToCurry) {
    return (...args) => {
        const concatedArgs = argsToCurry.concat(args);
        return concatedArgs.length < fn.length ?
            curry.apply(null, [fn].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Checks to see if value is a `PlaceHolder`.
 * @functionOps isPlaceHolder
 * @param instance {*}
 * @returns {boolean}
 */
function isPlaceHolder (instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `listOps`.
 * @functionOps replacePlaceHolder
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `listOps` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders (array, args) {
    let out = array.map(element => {
        if (!isPlaceHolder(element)) {
            return element;
        }
        else if (args.length > 0) {
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
export function curry_ (fn, ...argsToCurry) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(argsToCurry, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = placeHolders.length === 0 &&
                concatedArgs.length >= fn.length;
        return canBeCalled ? fn.apply(null, concatedArgs) :
            curry_.apply(null, [fn].concat(concatedArgs));
    };
}

/**
 * Curries a functionOps up to given arity also enforces arity via placeholder values (`__`).
 * @functionOps curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in functionOps wrapped in a functionOps for currying.
 */
export function curryN_ (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = (concatedArgs.length - placeHolders.length >= executeArity) || !executeArity;
        return !canBeCalled ? curryN_.apply(null, [executeArity, fn].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Curries a functionOps up to a given arity.
 * @functionOps curryN
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*}
 * @returns {Function}
 */
export function curryN (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = curriedArgs.concat(args),
            canBeCalled = (concatedArgs.length >= executeArity) || !executeArity;
        return !canBeCalled ? curryN.apply(null, [executeArity, fn].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @type {PlaceHolder}
 */
export let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,

    /**
     * Curries a functionOps up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 2 or more args).
     * @functionOps curry2_
     * @param fn {Function}
     * @returns {Function}
     */
    curry2_ = fn => curryN_(2, fn),

    /**
     * Curries a functionOps up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 3 or more args).
     * @functionOps curry3_
     * @param fn {Function}
     * @returns {Function}
     */
    curry3_ = fn => curryN_(3, fn),

    /**
     * Curries a functionOps up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 4 or more args).
     * @functionOps curry4_
     * @param fn {Function}
     * @returns {Function}
     */
    curry4_ = fn => curryN_(4, fn),

    /**
     * Curries a functionOps up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 5 or more args).
     * @functionOps curry5_
     * @param fn {Function}
     * @returns {Function}
     */
    curry5_ = fn => curryN_(5, fn),

    /**
     * Curries a functionOps up to an arity of 2 (won't call functionOps until 2 or more args).
     * @functionOps curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = fn => curryN(2, fn),

    /**
     * Curries a functionOps up to an arity of 3 (won't call functionOps until 3 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = fn => curryN(3, fn),

    /**
     * Curries a functionOps up to an arity of 4 (won't call functionOps until 4 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = fn => curryN(4, fn),

    /**
     * Curries a functionOps up to an arity of 5 (won't call functionOps until 5 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = fn => curryN(5, fn);
