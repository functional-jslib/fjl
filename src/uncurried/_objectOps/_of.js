import {isFunction, isUsableImmutablePrimitive, isset} from './_is';
import {hasOwnProperty} from '../_jsPlatform/_object';
import {apply} from '../_jsPlatform/_function';

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
