export const

    fPureTakesOne = name => (arg, f) => f[name](arg),

    fPureTakes2 = name => (arg1, arg2, f) => f[name](arg1, arg2),

    fPureTakesOneOrMore = name => (f, ...args) => f[name](...args);
