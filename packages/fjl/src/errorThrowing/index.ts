/**
 * @module errorThrowing
 * @description Contains error throwing facilities for when a value doesn't match a type.
 */
import {curry, curry4, curry5, CurryOf4, CurryOf5, CurryPredOf2} from '../function/curry';
import {typeOf} from '../object/typeOf';
import {isArray, toTypeRef, toTypeRefName, isOfType} from '../object/is';
import {TypeRef} from "../types";


/**
 * An interface for facilitating more generic error messages from our library.
 */
export interface ErrorMessageCtx {
    contextName: string;
    value: any;
    valueName: string;
    expectedTypeName: string | TypeRef | TypeRef[];
    foundTypeName: string;
    messageSuffix?: string;
}

export type ErrorIfNotTypeThrower<T> = (
    type: TypeRef, contextName: string,
    valueName: string, value: T, messageSuffix?: any) => T;

export type ErrorIfNotTypesThrower<T> = (
    types: TypeRef[], contextName: string,
    valueName: string, value: T) => T;

export type ErrorMessageCtxToString = (errorMessageCtx: ErrorMessageCtx) => string;

export type TypeCheckerPred<TRef extends TypeRef, T> = ((typeRef: TRef, x: T) => boolean) | CurryPredOf2<TRef, T>;

export const

    /**
     * Pretty prints an array of types/type-strings for use by error messages;
     * Outputs "`SomeTypeName`, ..." from [SomeType, 'SomeTypeName', etc...]
     * @internal
     */
    typeRefsToStringOrError = (...typeRefs: TypeRef[]): string => typeRefs.length ?
        typeRefs.map(type => `\`${toTypeRefName(type)}\``).join(', ') : '',

    /**
     * Prints a message from an object.  Object signature:
     * {contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix}
     */
    defaultErrorMessageCall = (tmplContext: ErrorMessageCtx): string => {
        const {
                contextName, valueName, value, expectedTypeName,
                foundTypeName, messageSuffix
            } = tmplContext,
            isMultiTypeNames = isArray(expectedTypeName),
            typesStr = isMultiTypeNames ? 'of type' : 'one of',
            typesToMatchStr = isMultiTypeNames ?
                typeRefsToStringOrError(...(expectedTypeName as TypeRef[])) : expectedTypeName;

        // Return error message string
        return (contextName ? `\`${contextName}.` : '`') +
            `${valueName}\` is not ${typesStr}: ${typesToMatchStr}.  ` +
            `Type received: ${foundTypeName}.  Value: ${value};` +
            `${messageSuffix ? '  ' + messageSuffix + ';' : ''}`;
    },

    /**
     * Gets the error message thrower seeded with passed in errorMessage template call.
     */
    _getErrorIfNotTypeThrower = <T>(
        tmplStrCallback: ErrorMessageCtxToString,
        typeChecker: TypeCheckerPred<TypeRef, any> = isOfType
    ): ErrorIfNotTypeThrower<T> =>
        (ValueType: TypeRef,
         contextName: string,
         valueName: string,
         value: T,
         messageSuffix?: string
        ): T => {
            const expectedTypeName = toTypeRef(ValueType),
                foundTypeName = typeOf(value);
            // If value `Type` matches `ValueType` return it ...
            if (typeChecker(ValueType, value)) {
                return value;
            }
            // Else no match, throw error
            throw new Error(tmplStrCallback({
                    contextName, valueName, value,
                    expectedTypeName, foundTypeName, messageSuffix
                })
            );
        },

    /**
     * Gets the error message thrower seeded with passed in errorMessage template call.
     */
    _getErrorIfNotTypesThrower = <T>(
        tmplStrCallback: ErrorMessageCtxToString,
        typeChecker: TypeCheckerPred<TypeRef, any> = isOfType
    ): ErrorIfNotTypesThrower<T> =>
        (valueTypes: TypeRef[],
         contextName: string,
         valueName: string,
         value: T,
         messageSuffix = ''
        ): T  => {
            const expectedTypeNames = valueTypes.map(toTypeRef),
                matchFound = valueTypes.some(ValueType => typeChecker(ValueType, value)),
                foundTypeName = typeOf(value);
            if (matchFound) {
                return value;
            }
            throw new Error(tmplStrCallback({
                    contextName, valueName, value,
                    expectedTypeName: expectedTypeNames, foundTypeName,
                    messageSuffix
                })
            );
        },

    /**
     * Checks that passed in `value` is of given `type`.  Throws an error if value
     * is not of given `type`.  This is the un-curried version.  For the curried version
     * see `module:errorThrowing.errorIfNotType`.
     */
    _errorIfNotType = _getErrorIfNotTypeThrower(defaultErrorMessageCall) as ErrorIfNotTypeThrower<any>,

    /**
     * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
     *  is not of one of the given `types`.  This is the un-curried version.  For the curried version
     * see `module:errorThrowing.errorIfNotTypes`.
     */
    _errorIfNotTypes = _getErrorIfNotTypesThrower(defaultErrorMessageCall) as ErrorIfNotTypesThrower<any>,

    /**
     * Returns a function that can be used to ensure that values are of a given type.
     *   Also throws informative error messages containing the value types, names, expected type names,
     *   etc.
     */
    getErrorIfNotTypeThrower = (tmplCtxToStrFunc: ErrorMessageCtxToString):
        CurryOf4<TypeRef, string, string, any, any | void> => curry4(
        _getErrorIfNotTypeThrower(tmplCtxToStrFunc)
    ) as CurryOf4<TypeRef, string, string, any, any | void>,

    /**
     * Returns a function that can be used to ensure that a value is of one or more given types.
     *   The returned function is used in cases where informative error messages
     *   containing the value types, names, expected type names, are-required/should-be-used etc.
     */
    getErrorIfNotTypesThrower = (tmplCtxToStrFunc: ErrorMessageCtxToString):
        CurryOf4<TypeRef[], string, string, any, any | void> => curry4(
        _getErrorIfNotTypesThrower(tmplCtxToStrFunc)
    ) as CurryOf4<TypeRef[], string, string, any, any | void>,

    /**
     * Checks that passed in `value` is of given `type`.  Throws an error if value
     * is not of given `type`.  Curried.
     */
    errorIfNotType = curry4(_errorIfNotType),

    /**
     * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
     *  is not of one of the given `types`.  Curried.
     */
    errorIfNotTypes = curry4(_errorIfNotTypes)
;
