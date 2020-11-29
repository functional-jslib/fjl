export const cheapEmailValidate = x => {                                    // Invalid email error messages
    let result = false;
    if (!x || typeof x !== 'string') {
        return {result, messages: ['`email` should be a non-empty string']};
    }
    const atSym = '@',
        indexOfAt = x.indexOf(atSym);
    if (indexOfAt !== x.lastIndexOf(atSym)) {
        return {result, messages: ['Invalid email']};
    }
    return {result: true, messages: []};
};
