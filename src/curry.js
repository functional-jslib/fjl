/**
 * Created by elyde on 12/6/2016.
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
 * Checks to see if value is a `PlaceHolder`.
 * @param instance {*}
 * @returns {boolean}
 */
function isPlaceHolder (instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `array`.
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `array` with placeholders replaced by values in `args`.
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
 * Currys passed in function along with passed in arguments passed.
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {function(...[*]=)}
 */
export function curry (fn, ...argsToCurry) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(argsToCurry, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = placeHolders.length === 0;
        return canBeCalled ? fn.apply(null, concatedArgs) :
            curry.apply(null, [fn].concat(concatedArgs));
    };
}

/**
 * Pure curry.
 * @param fn
 * @param argsToCurry
 * @returns {function(...[*]=): *}
 */
export function pureCurry (fn, ...argsToCurry) {
    return (...args) => fn.apply(null, argsToCurry.concat(args));
}

/**
 * Curry's a function passed in `executeArity` also curries any arguments passed in from the `curriedArgs` arg and forward.
 * @param fn {Function}
 * @param executeArity {Number}
 * @param curriedArgs {...*}
 * @returns {function(...[*]=)} - Passed in function wrapped in a function for currying.
 */
export function pureCurryN (fn, executeArity, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = curriedArgs.concat(args),
            canBeCalled = (concatedArgs.length >= executeArity) || !executeArity;
        return !canBeCalled ? pureCurryN.apply(null, [fn, executeArity].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Curry's a function passed in `executeArity` also curries any arguments passed in from the `curriedArgs` arg and forward.
 * @param fn {Function}
 * @param executeArity {Number}
 * @param curriedArgs {...*}
 * @returns {function(...[*]=)} - Passed in function wrapped in a function for currying.
 */
export function curryN (fn, executeArity, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = (concatedArgs.length - placeHolders.length >= executeArity) || !executeArity;
        return !canBeCalled ? curryN.apply(null, [fn, executeArity].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @type {PlaceHolder}
 */
export let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,

    /**
     * Curry's a function up to an arity of 2 (won't call function until 2 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = fn => curryN(fn, 2),

    /**
     * Curry's a function up to an arity of 3 (won't call function until 3 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = fn => curryN(fn, 3),

    /**
     * Curry's a function up to an arity of 4 (won't call function until 4 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = fn => curryN(fn, 4),

    /**
     * Curry's a function up to an arity of 5 (won't call function until 5 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = fn => curryN(fn, 5),

    /**
     * Curry's a function up to an arity of 2 (won't call function until 2 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    pureCurry2 = fn => pureCurryN(fn, 2),

    /**
     * Curry's a function up to an arity of 3 (won't call function until 3 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    pureCurry3 = fn => pureCurryN(fn, 3),

    /**
     * Curry's a function up to an arity of 4 (won't call function until 4 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    pureCurry4 = fn => pureCurryN(fn, 4),

    /**
     * Curry's a function up to an arity of 5 (won't call function until 5 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    pureCurry5 = fn => pureCurryN(fn, 5);

export default {
    __,
    curry,
    curryN,
    curry2,
    curry3,
    curry4,
    curry5,
    pureCurry,
    pureCurryN,
    pureCurry2,
    pureCurry3,
    pureCurry4,
    pureCurry5
};
