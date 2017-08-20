import {isFunction, isUsableImmutablePrimitive, isset} from './is';
import {hasOwnProperty} from './objectPrelude';
import {apply} from '../functionOps/apply';
import {typeOf} from './typeOf';

export const of = (x, ...args) => {
    if (!isset(x)) { return; }
    const constructor = x.constructor,
        typeOfX = typeOf(x);
    if (hasOwnProperty('of', constructor)) {
        return apply(constructor.of, args);
    }
    else if (isUsableImmutablePrimitive(typeOfX)) {
        return apply(constructor, args);
    }
    else if (isFunction(constructor)) {
        return new constructor(...args);
    }
    return undefined;
};
