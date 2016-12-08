/**
 * Created by elyde on 12/6/2016.
 */
let PlaceHolder = function PlaceHolder() {},
    placeHolderInstance = new PlaceHolder();

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

export let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;

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

export let
    curry2 = fn => curryN(fn, 2),
    curry3 = fn => curryN(fn, 3),
    curry4 = fn => curryN(fn, 4),
    curry5 = fn => curryN(fn, 5);

export default {
    __,
    curry,
    curryN,
    curry2,
    curry3,
    curry4,
    curry5
};
