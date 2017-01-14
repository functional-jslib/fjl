/**
 * Created by elyde on 1/20/2017.
 */

'use strict';

import {typeOf, typeOfIs} from './typeOf';

let typesListToString = types => types.reduce((agg, Type, index) => {
    let typeName = Type instanceof Function ? Type.name : Type;
    return agg + '"' + typeName + '"' + ((index !== types.length - 1) ? ', ' : ']');
}, '[');

function errorIfNotTypeFactory (contextName) {
    contextName = contextName || 'unNamedContext';
    return (key, value, ...types) => {
        if (types.some(Type => typeOfIs(value, Type))) {
            return;
        }
        throw new Error(contextName + '.' + key + ' is required to be of one of the types : ' +
            typesListToString(types) + '.  Type received: ' + typeOf(value));
    };
}

errorIfNotTypeFactory.typeListToString = typesListToString;

export default errorIfNotTypeFactory;
