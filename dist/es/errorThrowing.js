"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeOf_1 = require("./object/typeOf");
const is_1 = require("./object/is");
const curry_1 = require("./function/curry");
exports.typeRefsToStringOrError = types => types.length ?
    types.map(type => `\`${is_1.toTypeRefName(type)}\``).join(', ') : '', exports.defaultErrorMessageCall = tmplContext => {
    const { contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix } = tmplContext, isMultiTypeNames = is_1.isArray(expectedTypeName), typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types', typesToMatchCopy = isMultiTypeNames ? exports.typeRefsToStringOrError(expectedTypeName) : expectedTypeName;
    return (contextName ? `\`${contextName}.` : '`') +
        `${valueName}\` is not ${typesCopy}: ${typesToMatchCopy}.  ` +
        `Type received: ${foundTypeName}.  Value: ${value};` +
        `${messageSuffix ? '  ' + messageSuffix + ';' : ''}`;
}, exports._getErrorIfNotTypeThrower = (errorMessageCall, typeChecker = is_1.isOfType) => (ValueType, contextName, valueName, value, messageSuffix = null) => {
    const expectedTypeName = is_1.toTypeRef(ValueType), foundTypeName = typeOf_1.typeOf(value);
    if (typeChecker(ValueType, value)) {
        return value;
    }
    throw new Error(errorMessageCall({ contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix }));
}, exports._getErrorIfNotTypesThrower = (errorMessageCall, typeChecker = is_1.isOfType) => (valueTypes, contextName, valueName, value, messageSuffix = null) => {
    const expectedTypeNames = valueTypes.map(is_1.toTypeRef), matchFound = valueTypes.some(ValueType => typeChecker(ValueType, value)), foundTypeName = typeOf_1.typeOf(value);
    if (matchFound) {
        return value;
    }
    throw new Error(errorMessageCall({
        contextName, valueName, value,
        expectedTypeName: expectedTypeNames, foundTypeName,
        messageSuffix
    }));
}, exports._errorIfNotType = exports._getErrorIfNotTypeThrower(exports.defaultErrorMessageCall), exports._errorIfNotTypes = exports._getErrorIfNotTypesThrower(exports.defaultErrorMessageCall), exports.getErrorIfNotTypeThrower = errorMessageCall => curry_1.curry(exports._getErrorIfNotTypeThrower(errorMessageCall)), exports.getErrorIfNotTypesThrower = errorMessageCall => curry_1.curry(exports._getErrorIfNotTypesThrower(errorMessageCall)), exports.errorIfNotType = curry_1.curry(exports._errorIfNotType), exports.errorIfNotTypes = curry_1.curry(exports._errorIfNotTypes);
//# sourceMappingURL=errorThrowing.js.map