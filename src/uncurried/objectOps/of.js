import {isFunction, isUsableImmutablePrimitive, isset} from './is';
import {hasOwnProperty} from   '../jsPlatform/objectOpsUncurried';
import {apply} from   '../functionOps/apply';

export const of = (x, ...args) => {
    if (!isset(x)) { return undefined; }
    const constructor = x.constructor;
    if (hasOwnProperty('of', constructor)) {
        return apply(constructor.of, args);
    }
    else if (isUsableImmutablePrimitive(x)) {
        return apply(constructor, args);
    }
    else if (isFunction(constructor)) {
        return new constructor(...args);
    }
    return undefined;
};
