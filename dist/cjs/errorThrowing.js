'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.errorIfNotTypes = exports.errorIfNotType = exports.getErrorIfNotTypesThrower = exports.getErrorIfNotTypeThrower = exports._errorIfNotTypes = exports._errorIfNotType = exports._getErrorIfNotTypesThrower = exports._getErrorIfNotTypeThrower = exports.defaultErrorMessageCall = exports.typeRefsToStringOrError = undefined;

var _typeOf = require('./object/typeOf');

var _is = require('./object/is');

var _curry = require('./function/curry');

var

/**
 * Pretty prints an array of types/type-strings for use by error messages;
 * Outputs "`SomeTypeName`, ..." from [SomeType, 'SomeTypeName', etc...]
 * @function module:errorThrowing.typeRefsToStringOrError
 * @param types {Array|TypesArray}
 * @return {String}
 * @private
 */
typeRefsToStringOrError = exports.typeRefsToStringOrError = function typeRefsToStringOrError(types) {
    return types.length ? types.map(function (type) {
        return '`' + (0, _is.toTypeRefName)(type) + '`';
    }).join(', ') : '';
},


/**
 * Prints a message from an object.  Object signature:
 * {contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix}
 * @function module:errorThrowing.defaultErrorMessageCall
 * @param tmplContext {Object|TemplateContext} - Object to use in error template.
 * @returns {string}
 * @private
 */
defaultErrorMessageCall = exports.defaultErrorMessageCall = function defaultErrorMessageCall(tmplContext) {
    var contextName = tmplContext.contextName,
        valueName = tmplContext.valueName,
        value = tmplContext.value,
        expectedTypeName = tmplContext.expectedTypeName,
        foundTypeName = tmplContext.foundTypeName,
        messageSuffix = tmplContext.messageSuffix,
        isMultiTypeNames = (0, _is.isArray)(expectedTypeName),
        typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types',
        typesToMatchCopy = isMultiTypeNames ? typeRefsToStringOrError(expectedTypeName) : expectedTypeName;

    return (contextName ? '`' + contextName + '.' : '`') + (valueName + '` is not ' + typesCopy + ': ' + typesToMatchCopy + '.  ') + ('Type received: ' + foundTypeName + '.  Value: ' + value + ';') + ('' + (messageSuffix ? '  ' + messageSuffix + ';' : ''));
},


/**
 * Gets the error message thrower seeded with passed in errorMessage template call.
 * @function module:errorThrowing.getErrorIfNotTypeThrower$
 * @param errorMessageCall {Function|ErrorMessageCall}
 * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
 * @returns {Function|ErrorIfNotType}
 * @private
 */
_getErrorIfNotTypeThrower = exports._getErrorIfNotTypeThrower = function _getErrorIfNotTypeThrower(errorMessageCall) {
    var typeChecker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _is.isOfType;
    return function (ValueType, contextName, valueName, value) {
        var messageSuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        var expectedTypeName = (0, _is.toTypeRef)(ValueType),
            foundTypeName = (0, _typeOf.typeOf)(value);
        if (typeChecker(ValueType, value)) {
            return value;
        } // Value matches type
        throw new Error(errorMessageCall({ contextName: contextName, valueName: valueName, value: value, expectedTypeName: expectedTypeName, foundTypeName: foundTypeName, messageSuffix: messageSuffix }));
    };
},


/**
 * Gets the error message thrower seeded with passed in errorMessage template call.
 * @function module:errorThrowing.getErrorIfNotTypesThrower$
 * @param errorMessageCall {Function|ErrorMessageCall}
 * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
 * @returns {Function|ErrorIfNotTypes}
 * @private
 */
_getErrorIfNotTypesThrower = exports._getErrorIfNotTypesThrower = function _getErrorIfNotTypesThrower(errorMessageCall) {
    var typeChecker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _is.isOfType;
    return function (valueTypes, contextName, valueName, value) {
        var messageSuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        var expectedTypeNames = valueTypes.map(_is.toTypeRef),
            matchFound = valueTypes.some(function (ValueType) {
            return typeChecker(ValueType, value);
        }),
            foundTypeName = (0, _typeOf.typeOf)(value);
        if (matchFound) {
            return value;
        }
        throw new Error(errorMessageCall({
            contextName: contextName, valueName: valueName, value: value,
            expectedTypeName: expectedTypeNames, foundTypeName: foundTypeName,
            messageSuffix: messageSuffix
        }));
    };
},


/**
 * Checks that passed in `value` is of given `type`.  Throws an error if value
 * is not of given `type`.  This is the un-curried version.  For the curried version
 * see `module:errorThrowing.errorIfNotType`.
 * @function module:errorThrowing.errorIfNotType$
 * @param type {String|Function} - Type's name or type itself.
 * @param contextName {String} - Name of context to attribute errors if thrown.
 * @param valueName {String} - String rep of value.
 * @param value {*}
 * @param [messageSuffix=null] {String} - Optional.
 * @returns {*} - Given `value` if `value` matches passed in type.
 * @private
 */
_errorIfNotType = exports._errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall),


/**
 * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
 *  is not of one of the given `types`.  This is the un-curried version.  For the curried version
 * see `module:errorThrowing.errorIfNotTypes`.
 * @type {Function|module:errorThrowing.errorIfNotTypes}
 * @function module:errorThrowing.errorIfNotTypes$
 * @param types {Array} - Array of one or more types or type names themselves.
 * @param contextName {String} - Name of context to attribute errors if thrown.
 * @param valueName {String} - String rep of value.
 * @param value {*}
 * @returns {*} - Given `value` if `value` matches passed in type.
 * @private
 */
_errorIfNotTypes = exports._errorIfNotTypes = _getErrorIfNotTypesThrower(defaultErrorMessageCall),


/**
 * Returns a function that can be used to ensure that values are of a given type.
 *   Also throws informative error messages containing the value types, names, expected type names,
 *   etc.
 * @function module:errorThrowing.getErrorIfNotTypeThrower
 * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
 * @returns {Function|ErrorIfNotType} - Returns a function with the same signature as `errorIfNotType` though curried.
 */
getErrorIfNotTypeThrower = exports.getErrorIfNotTypeThrower = function getErrorIfNotTypeThrower(errorMessageCall) {
    return (0, _curry.curry)(_getErrorIfNotTypeThrower(errorMessageCall));
},


/**
 * Returns a function that can be used to ensure that a value is of one or more given types.
 *   The returned function is used in cases where informative error messages
 *   containing the value types, names, expected type names, are-required/should-be-used etc.
 * @function module:errorThrowing.getErrorIfNotTypesThrower
 * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
 * @returns {Function|ErrorIfNotTypes} - Returns a function with the same signature as `errorIfNotTypes` though curried.
 */
getErrorIfNotTypesThrower = exports.getErrorIfNotTypesThrower = function getErrorIfNotTypesThrower(errorMessageCall) {
    return (0, _curry.curry)(_getErrorIfNotTypesThrower(errorMessageCall));
},


/**
 * Checks that passed in `value` is of given `type`.  Throws an error if value
 * is not of given `type`.  Curried.
 * @function module:errorThrowing.errorIfNotType
 * @param type {String|Function} - Type's name or type itself.
 * @param contextName {String} - Name of context to attribute errors if thrown.
 * @param valueName {String} - String rep of value.
 * @param value {*}
 * @param [messageSuffix=null] {String} - Optional.
 * @returns {*} - Given `value` if `value` matches passed in type.
 * @curried
 */
errorIfNotType = exports.errorIfNotType = (0, _curry.curry)(_errorIfNotType),


/**
 * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
 *  is not of one of the given `types`.  Curried.
 * @function module:errorThrowing.errorIfNotTypes
 * @param types {Array} - Array of one or more types or type names themselves.
 * @param contextName {String} - Name of context to attribute errors if thrown.
 * @param valueName {String} - String rep of value.
 * @param value {*}
 * @returns {*} - Given `value` if `value` matches passed in type.
 * @curried
 */
errorIfNotTypes = exports.errorIfNotTypes = (0, _curry.curry)(_errorIfNotTypes);

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
/**
 * @module errorThrowing
 * @description Contains error throwing facilities for when a value doesn't match a type.
 */