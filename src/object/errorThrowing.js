/**
 * @module object
 * @description Contains error throwing facilities for when a value doesn't match a type.
 *  In addition gives you curried and uncurried versions of the multi arity functions.
 */
import {typeOf} from './typeOf';
import {isArray, toTypeRef, toTypeRefName, isOfType} from './is';
import {curry, curry4} from '../function/curry';

export const

    /**
     * Pretty prints an array of types/type-strings for use by error messages;
     * Outputs "`SomeTypeName`, ..." from [SomeType, 'SomeTypeName', etc...]
     * @function module:object.typeRefsToStringOrError
     * @param types {Array|TypesArray}
     * @return {String}
     * @private
     */
    typeRefsToStringOrError = types => types.length ?
        types.map(type => `\`${toTypeRefName(type)}\``).join(', ') : '',

    /**
     * Prints a message from an object.  Object signature:
     * {contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix}
     * @function module:object.defaultErrorMessageCall
     * @param tmplContext {Object|TemplateContext} - Object to use in error template.
     * @returns {string}
     * @private
     */
    defaultErrorMessageCall = tmplContext => {
        const {
                contextName, valueName, value, expectedTypeName,
                foundTypeName, messageSuffix
            } = tmplContext,
            isMultiTypeNames = isArray(expectedTypeName),
            typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types',
            typesToMatchCopy = isMultiTypeNames ? typeRefsToStringOrError(expectedTypeName) : expectedTypeName;
        return (contextName ? `\`${contextName}.` : '`') +
            `${valueName}\` is not ${typesCopy}: ${typesToMatchCopy}.  ` +
            `Type received: ${foundTypeName}.  Value: ${value};` +
            `${messageSuffix ?  '  ' + messageSuffix + ';' : ''}`;
    },

    /**
     * Gets the error message thrower seeded with passed in errorMessage template call.
     * @function module:object.getErrorIfNotTypeThrower$
     * @param errorMessageCall {Function|ErrorMessageCall}
     * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
     * @returns {Function|ErrorIfNotType}
     * @private
     */
    _getErrorIfNotTypeThrower = (errorMessageCall, typeChecker = isOfType) =>
        (ValueType, contextName, valueName, value, messageSuffix = null) => {
            const expectedTypeName = toTypeRef(ValueType),
                foundTypeName = typeOf(value);
            if (typeChecker(ValueType, value)) { return value; } // Value matches type
            throw new Error(errorMessageCall(
                {contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix}
            ));
        },

    /**
     * Gets the error message thrower seeded with passed in errorMessage template call.
     * @function module:object.getErrorIfNotTypesThrower$
     * @param errorMessageCall {Function|ErrorMessageCall}
     * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
     * @returns {Function|ErrorIfNotTypes}
     * @private
     */
    _getErrorIfNotTypesThrower = (errorMessageCall, typeChecker = isOfType) =>
        (valueTypes, contextName, valueName, value) => {
            const expectedTypeNames = valueTypes.map(toTypeRef),
                matchFound = valueTypes.some(ValueType => typeChecker(ValueType, value)),
                foundTypeName = typeOf(value);
            if (matchFound) { return value; }
            throw new Error(
                errorMessageCall({
                    contextName, valueName, value,
                    expectedTypeName: expectedTypeNames, foundTypeName
                })
            );
        },

    /**
     * Checks that passed in `value` is of given `type`.  Throws an error if value
     * is not of given `type`.  This is the un-curried version.  For the curried version
     * see `module:object.errorIfNotType`.
     * @function module:object.errorIfNotType$
     * @param type {String|Function} - Type's name or type itself.
     * @param contextName {String} - Name of context to attribute errors if thrown.
     * @param valueName {String} - String rep of value.
     * @param value {*}
     * @param [messageSuffix=null] {String} - Optional.
     * @returns {undefined}
     * @private
     */
    _errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall),

    /**
     * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
     *  is not of one of the given `types`.  This is the un-curried version.  For the curried version
     * see `module:object.errorIfNotTypes`.
     * @type {Function|module:object.errorIfNotTypes}
     * @function module:object.errorIfNotTypes$
     * @param types {Array} - Array of one or more types or type names themselves.
     * @param contextName {String} - Name of context to attribute errors if thrown.
     * @param valueName {String} - String rep of value.
     * @param value {*}
     * @returns {undefined}
     * @private
     */
    _errorIfNotTypes = _getErrorIfNotTypesThrower(defaultErrorMessageCall),

    /**
     * Checks that passed in `value` is of given `type`.  Throws an error if value
     * is not of given `type`.  Curried.
     * @function module:object.errorIfNotType
     * @param type {String|Function} - Type's name or type itself.
     * @param contextName {String} - Name of context to attribute errors if thrown.
     * @param valueName {String} - String rep of value.
     * @param value {*}
     * @param [messageSuffix=null] {String} - Optional.
     * @returns {undefined}
     * @curried
     */
    errorIfNotType = curry(_errorIfNotType),

    /**
     * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
     *  is not of one of the given `types`.  Curried.
     * @function module:object.errorIfNotTypes
     * @param types {Array} - Array of one or more types or type names themselves.
     * @param contextName {String} - Name of context to attribute errors if thrown.
     * @param valueName {String} - String rep of value.
     * @param value {*}
     * @returns {undefined}
     * @curried
     */
    errorIfNotTypes = curry4(_errorIfNotTypes),

    /**
     * Returns a function that can be used to ensure that values are of a given type.
     *   Also throws informative error messages containing the value types, names, expected type names,
     *   etc.
     * @function module:object.getErrorIfNotTypeThrower
     * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
     * @returns {Function|ErrorIfNotType} - Returns a function with the same signature as `errorIfNotType` though curried.
     */
    getErrorIfNotTypeThrower = errorMessageCall => curry(_getErrorIfNotTypeThrower(errorMessageCall)),

    /**
     * Returns a function that can be used to ensure that a value is of one or more given types.
     *   The returned function is used in cases where informative error messages
     *   containing the value types, names, expected type names, are-required/should-be-used etc.
     * @function module:object.getErrorIfNotTypesThrower
     * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
     * @returns {Function|ErrorIfNotTypes} - Returns a function with the same signature as `errorIfNotTypes` though curried.
     */
    getErrorIfNotTypesThrower = errorMessageCall => curry4(_getErrorIfNotTypesThrower(errorMessageCall))
;

/**
 * @typedef {*} Any - Synonym for 'any value'.
 */

/**
 * @typedef {String|Function} TypeRef
 * @description Type reference.  Type itself or Type's name;  E.g., `Type.name`;
 */

/**
 * @typedef {Object<value, valueName, expectedTypeName, foundTypeName, messageSuffix>} TemplateContext
 * @description Template context used for error message renderers (functions that take a context obj and return a string).
 * @property value {*}
 * @property valueName {String}
 * @property expectedTypeName {String} - Expected name of constructor of `value`;  E.g., usually `SomeConstructor.name`;
 * @property foundTypeName {String} - Found types name;  E.g., `FoundConstructor.name`;
 * @property [messageSuffix=null] {*} - Message suffix (sometimes an extra hint or instructions for
 *  directing user to fix where his/her error has occurred).  Optional.
 */

/**
 * @typedef {Array<(String|Function)>} TypesArray
 */

/**
 * @typedef {Function} TypeChecker
 * @description Checks whether a value is of given type.
 * @param Type {TypeRef} - a Type or it's name;  E.g., `Type.name`.
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * @typedef {Function} ErrorMessageCall
 * @description Error message template function.
 * @param tmplContext {TemplateContext}
 * @returns {String}
 */

/**
 * @typedef {Function} ErrorIfNotType
 * @description Used to ensure value matches passed in type.
 * @param type {TypeRef} - Constructor name or constructor.
 * @param contextName {String}
 * @param valueName {String}
 * @param value {*}
 * @throws {Error} - If value doesn't match type.
 * @returns {*} - What ever value is.
 */

/**
 * @typedef {Function} ErrorIfNotTypes
 * @description Used to ensure a value matches one of one or more types passed in.
 * @param valueTypes {TypesArray} - Array of constructor names or constructors.
 * @param contextName {String}
 * @param valueName {String}
 * @param value {*}
 * @throws {Error} - If value doesn't match type.
 * @returns {*} - Whatever value is.
 */
