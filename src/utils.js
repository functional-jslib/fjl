import {typeOf} from './object/typeOf';
import {curry, curry2} from './function/curry';

export const

    fPureTakesOne = name => curry((arg, f) => f[name](arg)),

    fPureTakes2 = name => curry((arg1, arg2, f) => f[name](arg1, arg2)),

    fPureTakes3 = name => curry((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3)),

    fPureTakes4 = name => curry((arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4)),

    fPureTakes5 = name => curry((arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5)),

    fPureTakesOneOrMore = name => curry2((f, ...args) => f[name](...args)),

    fnOrError = (symbolName, f) => {
        if (!f || typeof f !== 'function') {
            throw new Error (`${symbolName} should be a function. ` +
                `Type received: ${typeOf(f)};  Value received: ${f}.`);
        }
        return f;
    };
