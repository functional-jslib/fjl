/**
 * Created by elyde on 1/20/2017.
 */

import {typeOf, typeOfIs} from '../../src/typeOf';

const typesListToString = types => types.reduce((agg, Type, index) => {
    let typeName = Type instanceof Function ? Type.name : Type;
    return agg + '"' + typeName + '"' + ((index !== types.length - 1) ? ', ' : ']');
}, '[');

/**
 * A factory for attaching a context name to a function that checks if recieved value is of given type.
 * The factory allows you to attach the context name to the returned type checker function.
 * @module errorIfNotTypeFactory
 * @param [contextName] {String} - Name of the context you want attached to the error message.
 * @returns {Function} - Function{key {String, value {*}, ...types {Function|Constructor}>
 * @type {Function}
 */
function errorIfNotTypeFactory (contextName) {
    /**
     * Throws error if `value` is not of one of the 'types' ({...types{Function}}) passed in.  Else returns {void}.
     * @param [typePrefix] {String} - Prefix of the type to use in the error message if `value` doesn't
     *  match one of the `...types` passed in.
     * @param value {*}
     * @param types {...Function}
     * @throws {Error}
     * @returns {void}
     */
    return (typePrefix, value, ...types) => {
        if (types.some(Type => typeOfIs(Type, value))) {
            return;
        }
        throw new Error(`${contextName || ''}.${typePrefix || ''} is required to be of one of the types : ` +
            `${typesListToString(types)}.  Type received: ${typeOf(value)}`);
    };
}

errorIfNotTypeFactory.typeListToString = typesListToString;

export default errorIfNotTypeFactory;
