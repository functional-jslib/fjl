/**
 * Created by elyde on 12/6/2016.
 */
import {placeholder as _} from "./symbols";

let PlaceHolder = function PlaceHolder() {},
    placeHolderInstance = new PlaceHolder(),
    __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;

export function replacePlaceHolders (array, args) {
    let out = array.map(element => {
        return ! isPlaceHolder(element) ? element :
            (args.length > 0 ? args.shift() : element);
    });
    return args.length > 0 ? out.concat(args) : out;
}

export function isPlaceHolder (instance) {
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

export let curry1 = fn => curryN(fn, 1);
export let curry2 = fn => curryN(fn, 2);
export let curry3 = fn => curryN(fn, 3);
export let curry4 = fn => curryN(fn, 4);
export let curry5 = fn => curryN(fn, 5);

export default {
    [_]: __,
    curry,
    curryN,
    curry2
};
