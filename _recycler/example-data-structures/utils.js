/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import {typeOfIs, typeOf} from '../../src/typeOf';
import {isString, isFunction} from '../../src/is';

function constructorName (value) {
    let retVal;
    if (isString(value)) {
        retVal = value;
    }
    else if (isFunction(value)) {
        retVal = value.name;
    }
    else {
        retVal = (value).constructor.name;
    }
    return retVal;
}

export function errorIfNotType (contextName, propName, value, type, ErrorConstructor = TypeError) {
    if (!typeOfIs(value, type)) {
        throw new ErrorConstructor(
            `${contextName}.${propName} is not of type ${constructorName(type)}.` +
            `Type received: "${typeOf(value)}".  Value: ${value}`
        );
    }
}

export default {
    errorIfNotType
};
