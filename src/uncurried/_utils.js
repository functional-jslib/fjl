import {typeOf} from './_objectOps/_typeOf';

export const

    fPureTakesOne = name => (arg, f) => f[name](arg),

    fPureTakes2 = name => (arg1, arg2, f) => f[name](arg1, arg2),

    fPureTakes3 = name => (arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3),

    fPureTakes4 = name => (arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4),

    fPureTakes5 = name => (arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5),

    fPureTakesOneOrMore = name => (f, ...args) => f[name](...args),

    fnOrError = (symbolName, f) => {
        if (!f || f.constructor !== Function) {
            throw new Error (`${symbolName} should be a function. ` +
                `Type received: ${typeOf(f)};  Value received: ${f}.`)
        }
        return f;
    };
