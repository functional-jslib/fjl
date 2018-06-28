define(['exports', './typeOf', './is', '../function/curry'], function (exports, _typeOf, _is, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getErrorIfNotTypesThrower = exports.getErrorIfNotTypeThrower = exports.errorIfNotTypes = exports.errorIfNotType = exports.defaultTypeChecker = exports._errorIfNotTypes = exports._errorIfNotType = exports._getErrorIfNotTypesThrower = exports._getErrorIfNotTypeThrower = exports.defaultErrorMessageCall = exports.typeRefsToStringOrError = exports._defaultTypeChecker = exports.toTypeRef = exports.typeRefOrError = exports.isTypeRef = undefined;
  const

  /**
   * Checks if `type` is a string or a function (constructor or constructor name)
   * @function module:object.isTypeRef
   * @param type {TypeRef}
   * @returns {Boolean}
   * @private
   */
  isCheckableType = exports.isTypeRef = type => (0, _is.isString)(type) || (0, _is.isFunction)(type),


  /**
   * Throws an error if `type` is not a checkable type (can't be checked by the `TypeChecker` type)
   * @function module:object.typeRefOrError
   * @param contextName {String}
   * @param type {TypeRef}
   * @returns {TypeRef} - Type passed in if `type` is checkable
   * @private
   */
  errorIfNotCheckableType = exports.typeRefOrError = (contextName, type) => {
    if (!isCheckableType(type)) {
      throw new Error(`${contextName} expects \`type\` to be of type \`String\` or \`Function\`.` + `  Type received \`${(0, _typeOf.typeOf)(type)}\`.  Value \`${type}\`.`);
    }
    return type;
  },


  /**
   * Resolves/normalizes a type name from either a string or a constructor.
   * @function module:object.toTypeRef
   * @param type {Function|String} - String or function representing a type.
   * @returns {String}
   * @private
   */
  getTypeName = exports.toTypeRef = type => {
    errorIfNotCheckableType('toTypeRef', type);
    return type.name || type;
  },


  /**
   * Returns a boolean indicating whether given value matches given type.
   * @function module:object.defaultTypeChecker$
   * @param Type {String|Function} - Type name, constructor and/or class.
   * @param value {*}
   * @returns {Boolean}
   * @private
   */
  _defaultTypeChecker = exports._defaultTypeChecker = (Type, value) => (0, _is.isType)(getTypeName(Type), value) || (0, _is.isFunction)(Type) && (0, _is.isset)(value) && value instanceof Type,


  /**
   * Pretty prints an array of types/type-strings for use by error messages;
   * Outputs "`SomeTypeName`, ..." from [SomeType, 'SomeTypeName', etc...]
   * @function module:object.typeRefsToStringOrError
   * @param types {Array|TypesArray}
   * @return {String}
   * @private
   */
  multiTypesToString = exports.typeRefsToStringOrError = types => types.length ? types.map(type => `\`${getTypeName(type)}\``).join(', ') : '',


  /**
   * Prints a message from an object.  Object signature:
   * {contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix}
   * @function module:object.defaultErrorMessageCall
   * @param tmplContext {Object|TemplateContext} - Object to use in error template.
   * @returns {string}
   * @private
   */
  defaultErrorMessageCall = exports.defaultErrorMessageCall = tmplContext => {
    const {
      contextName, valueName, value, expectedTypeName,
      foundTypeName, messageSuffix
    } = tmplContext,
          isMultiTypeNames = (0, _is.isArray)(expectedTypeName),
          typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types',
          typesToMatchCopy = isMultiTypeNames ? multiTypesToString(expectedTypeName) : expectedTypeName;
    return (contextName ? `\`${contextName}.` : '`') + `${valueName}\` is not ${typesCopy}: ${typesToMatchCopy}.  ` + `Type received: ${foundTypeName}.  Value: ${value};` + `${messageSuffix ? '  ' + messageSuffix + ';' : ''}`;
  },


  /**
   * Gets the error message thrower seeded with passed in errorMessage template call.
   * @function module:object.getErrorIfNotTypeThrower$
   * @param errorMessageCall {Function|ErrorMessageCall}
   * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
   * @returns {Function|ErrorIfNotType}
   */
  _getErrorIfNotTypeThrower = exports._getErrorIfNotTypeThrower = (errorMessageCall, typeChecker = _defaultTypeChecker) => (ValueType, contextName, valueName, value, messageSuffix = null) => {
    const expectedTypeName = getTypeName(ValueType),
          foundTypeName = (0, _typeOf.typeOf)(value);
    if (typeChecker(ValueType, value)) {
      return value;
    } // Value matches type
    throw new Error(errorMessageCall({ contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix }));
  },


  /**
   * Gets the error message thrower seeded with passed in errorMessage template call.
   * @function module:object.getErrorIfNotTypesThrower$
   * @param errorMessageCall {Function|ErrorMessageCall}
   * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
   * @returns {Function|ErrorIfNotTypes}
   */
  _getErrorIfNotTypesThrower = exports._getErrorIfNotTypesThrower = (errorMessageCall, typeChecker = _defaultTypeChecker) => (valueTypes, contextName, valueName, value) => {
    const expectedTypeNames = valueTypes.map(getTypeName),
          matchFound = valueTypes.some(ValueType => typeChecker(ValueType, value)),
          foundTypeName = (0, _typeOf.typeOf)(value);
    if (matchFound) {
      return value;
    }
    throw new Error(errorMessageCall({
      contextName, valueName, value,
      expectedTypeName: expectedTypeNames, foundTypeName
    }));
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
   * @uncurried
   */
  _errorIfNotType = exports._errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall),


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
   * @uncurried
   */
  _errorIfNotTypes = exports._errorIfNotTypes = _getErrorIfNotTypesThrower(defaultErrorMessageCall),


  /**
   * Same as `defaultTypeChecker$` except curried:
   *  "Returns a boolean indicating whether given value matches given type".
   * @curried
   * @function module:object.defaultTypeChecker
   * @param Type {String|Function} - Type name, constructor and/or class.
   * @param value {*}
   * @returns {Boolean}
   */
  defaultTypeChecker = exports.defaultTypeChecker = (0, _curry.curry)(_defaultTypeChecker),


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
  errorIfNotType = exports.errorIfNotType = (0, _curry.curry)(_errorIfNotType),


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
  errorIfNotTypes = exports.errorIfNotTypes = (0, _curry.curry4)(_errorIfNotTypes),


  /**
   * Returns a function that can be used to ensure that values are of a given type.
   *   Also throws informative error messages containing the value types, names, expected type names,
   *   etc.
   * @function module:object.getErrorIfNotTypeThrower
   * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
   * @returns {Function|ErrorIfNotType} - Returns a function with the same signature as `errorIfNotType` though curried.
   */
  getErrorIfNotTypeThrower = exports.getErrorIfNotTypeThrower = errorMessageCall => (0, _curry.curry)(_getErrorIfNotTypeThrower(errorMessageCall)),


  /**
   * Returns a function that can be used to ensure that a value is of one or more given types.
   *   The returned function is used in cases where informative error messages
   *   containing the value types, names, expected type names, are-required/should-be-used etc.
   * @function module:object.getErrorIfNotTypesThrower
   * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
   * @returns {Function|ErrorIfNotTypes} - Returns a function with the same signature as `errorIfNotTypes` though curried.
   */
  getErrorIfNotTypesThrower = exports.getErrorIfNotTypesThrower = errorMessageCall => (0, _curry.curry4)(_getErrorIfNotTypesThrower(errorMessageCall));

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
   * @module object
   * @description Contains error throwing facilities for when a value doesn't match a type.
   *  In addition gives you curried and uncurried versions of the multi arity functions.
   */
});
