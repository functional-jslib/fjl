/**
 * @module errorThrowing
 *
 * Contains error throwing combinators for enforcing value types at runtime.
 *
 * **Notable mentions** `errorIfNotType`, and `errorIfNotTypes`.
 *
 * @todo move package to it's own standalone package.
 */
import {typeOf} from '../object/typeOf';
import {isArray, isOfType, toTypeRef, toTypeRefName} from '../object/is';
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

export type ErrorIfNotTypeThrowerCurried<T> = (type: TypeRef) =>
  (contextName: string) =>
    (valueName: string) =>
      (value: T, messageSuffix?: any) => T;

export type ErrorIfNotTypesThrower<T> = (
  types: TypeRef[], contextName: string,
  valueName: string, value: T, messageSuffix?: any) => T;

export type ErrorIfNotTypesThrowerCurried<T> = (types: TypeRef[]) =>
  (contextName: string) =>
    (valueName: string) =>
      (value: T, messageSuffix?: any) => T;

export type ErrorMessageCtxToString = (errorMessageCtx: ErrorMessageCtx) => string;

export type TypeCheckerPred<TRef extends TypeRef, T> = ((typeRef: TRef, x: T) => boolean);

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
  getErrorIfNotTypeThrower = <T>(
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

  getErrorIfNotTypeThrowerCurried = <T>(
    tmplStrCallback: ErrorMessageCtxToString,
    typeChecker: TypeCheckerPred<TypeRef, any> = isOfType
  ): ErrorIfNotTypeThrowerCurried<T> => {
    const method = getErrorIfNotTypeThrower(tmplStrCallback, typeChecker) as ErrorIfNotTypeThrower<T>;
    return (ValueType: TypeRef) =>
      (contextName: string) =>
        (valueName: string) =>
          (value: T, messageSuffix?: string): T =>
            method(ValueType, contextName, valueName, value, messageSuffix);
  },

  /**
   * Gets the error message thrower seeded with passed in errorMessage template call.
   */
  getErrorIfNotTypesThrower = <T>(
    tmplStrCallback: ErrorMessageCtxToString,
    typeChecker: TypeCheckerPred<TypeRef, any> = isOfType
  ): ErrorIfNotTypesThrower<T> =>
    (valueTypes: TypeRef[],
     contextName: string,
     valueName: string,
     value: T,
     messageSuffix = ''
    ): T => {
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

  getErrorIfNotTypesThrowerCurried = <T>(
    tmplStrCallback: ErrorMessageCtxToString,
    typeChecker: TypeCheckerPred<TypeRef, any> = isOfType
  ): ErrorIfNotTypesThrowerCurried<T> => {
    const method = getErrorIfNotTypesThrower(tmplStrCallback, typeChecker) as ErrorIfNotTypesThrower<T>;
    return (valueTypes: TypeRef[]) =>
      (contextName: string) =>
        (valueName: string) =>
          (value: T, messageSuffix = ''): T =>
            method(valueTypes, contextName, valueName, value, messageSuffix);
  },

  /**
   * Checks that passed in `value` is of given `type`.  Throws an error if value
   * is not of given `type`.  This is the un-curried version.  For the curried version
   * see `module:errorThrowing.errorIfNotType`.
   */
  errorIfNotType = getErrorIfNotTypeThrower(defaultErrorMessageCall) as ErrorIfNotTypeThrower<any>,

  /**
   * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
   *  is not of one of the given `types`.  This is the un-curried version.  For the curried version
   * see `module:errorThrowing.errorIfNotTypes`.
   */
  errorIfNotTypes = getErrorIfNotTypesThrower(defaultErrorMessageCall) as ErrorIfNotTypesThrower<any>,

  /**
   * Returns a function that can be used to ensure that values are of a given type.
   *   Also throws informative error messages containing the value types, names, expected type names,
   *   etc.
   * @returns {Function} - Returns curried version of `ErrorIfNotType` thrower.
   */
  $getErrorIfNotTypeThrower = <T>(tmplCtxToStrFunc: ErrorMessageCtxToString): ErrorIfNotTypeThrowerCurried<T> =>
    getErrorIfNotTypeThrowerCurried(tmplCtxToStrFunc),

  /**
   * Returns a function that can be used to ensure that a value is of one or more given types.
   *   The returned function is used in cases where informative error messages
   *   containing the value types, names, expected type names, are-required/should-be-used etc.
   * @returns {Function} - Returns curried version of `ErrorIfNotTypes` thrower.
   */
  $getErrorIfNotTypesThrower = <T>(tmplCtxToStrFunc: ErrorMessageCtxToString): ErrorIfNotTypesThrowerCurried<T> =>
    getErrorIfNotTypesThrowerCurried(tmplCtxToStrFunc),

  /**
   * Checks that passed in `value` is of given `type`.  Throws an error if value
   * is not of given `type`.  Curried.
   */
  $errorIfNotType = <T>(type: TypeRef) =>
    (contextName: string) =>
      (valueName: string) =>
        (value: T, messageSuffix?: any) =>
          errorIfNotType(type, contextName, valueName, value, messageSuffix),

  /**
   * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
   *  is not of one of the given `types`.  Curried.
   */
  $errorIfNotTypes = <T>(types: TypeRef[]) =>
    (contextName: string) =>
      (valueName: string) =>
        (value: T, messageSuffix?: any) =>
          errorIfNotTypes(types, contextName, valueName, value, messageSuffix)
;
