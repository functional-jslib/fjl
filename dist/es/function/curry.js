"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnCurried = (executeArity, unmetArityNum, fn, argsToCurry) => {
    switch (unmetArityNum) {
        case 1:
            return function func(x) {
                return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
            };
        case 2:
            return function func(a, b) {
                return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
            };
        case 3:
            return function func(a, b, c) {
                return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
            };
        case 4:
            return function func(a, b, c, d) {
                return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
            };
        case 5:
            return function func(a, b, c, d, e) {
                return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
            };
        default:
            return (...args) => executeAsCurriedFunc(fn, executeArity, unmetArityNum, args, argsToCurry);
    }
}, executeAsCurriedFunc = (fn, executeArity, unmetArity, args, argsToCurry) => {
    let concatedArgs = argsToCurry.concat(args), canBeCalled = (concatedArgs.length >= executeArity) || !executeArity, newExpectedArity = executeArity - concatedArgs.length;
    return !canBeCalled ?
        returnCurried(executeArity, newExpectedArity, fn, concatedArgs) :
        fn(...concatedArgs);
};
exports.curryN = (executeArity, fn, ...argsToCurry) => {
    if (!fn || !(fn instanceof Function)) {
        throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\` though received ${fn}?`);
    }
    return returnCurried(executeArity, executeArity - argsToCurry.length, fn, argsToCurry);
}, exports.curry = (fn, ...argsToCurry) => exports.curryN((fn || {}).length, fn, ...argsToCurry), exports.curry2 = fn => exports.curryN(2, fn), exports.curry3 = fn => exports.curryN(3, fn), exports.curry4 = fn => exports.curryN(4, fn), exports.curry5 = fn => exports.curryN(5, fn);
//# sourceMappingURL=curry.js.map