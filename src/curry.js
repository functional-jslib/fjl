/**
 * Created by elyde on 12/6/2016.
 */
import {placeholder as _} from "symbols";

function PlaceHolder() {}

let ___ = new PlaceHolder();

export let __ = Object.freeze ? Object.freeze(___) : ___;

function replacePlaceHolders (array, args) {
    let out = array.map(element => {
        return ! isPlaceHolder(element) ? element :
            (args.length > 0 ? args.shift() : element);
    });
    return args.length > 0 ? out.concat(args) : out;
}

function isPlaceHolder (instance) {
    return instance instanceof PlaceHolder;
}

export function curry (fn, ...argsToCurry) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(argsToCurry, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = placeHolders.length === 0;
        return canBeCalled ? fn.apply(null, concatedArgs) :
            curry.apply(null, [fn].concat(concatedArgs));
    };
}

export function curryN (fn, executeArity, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = (concatedArgs.length - placeHolders.length >= executeArity) || !executeArity;
        return !canBeCalled ? curryN.apply(null, [fn, executeArity].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

const all = {
    [_]: __,
    curry,
    curryN,
};

// Add `fjl.curry[1-5]`
(function () {
    var count = 1;
    while (count <= 5) {
        (function (curryLen) { all['curry' + curryLen] = fn => curryN(fn, curryLen); }(count));
        count += 1;
    }
}());

/**
 * Curries a function up to arity/args-length 1.
 * @function module:fjl.curry1
 * @return {Function}
 */
/**
 * Curries a function up to arity/args-length 2.
 * @function module:fjl.curry2
 * @return {Function}
 */
/**
 * Curries a function up to arity/args-length 3.
 * @function module:fjl.curry3
 * @return {Function}
 */
/**
 * Curries a function up to arity/args-length 4.
 * @function module:fjl.curry4
 * @return {Function}
 */
/**
 * Curries a function up to arity/args-length 5.
 * @function module:fjl.curry5
 * @return {Function}
 */

export default all;
