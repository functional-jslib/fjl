declare namespace fjl {
    export type TypeRef =
        string | Function | ArrayBufferConstructor | ArrayConstructor |
        BooleanConstructor | StringConstructor |
        NumberConstructor | MapConstructor |
        SetConstructor | WeakMapConstructor |
        WeakSetConstructor | PromiseConstructorLike
        ;

    export interface ErrorTemplateCtx {
        value: any,
        valueName: string,
        expectedTypeName: string,
        foundTypeName: string,
        messageSuffix?: string
    }

    export type TypeChecker = (typeRef: TypeRef, x: any) => boolean;

    export type ErrorIfNotTypeThrower = (
        type: TypeRef, contextName: string,
        valueName: string, value: any, messageSuffix: any) => any;

    export type ErrorIfNotTypesThrower = (
        types: TypeRef[], contextName: string,
        valueName: string, value: any) => any;

    export type ErrorTemplateCtxToStringFn = (
        tmplCtx: ErrorTemplateCtx) => string;

    export function errorIfNotType(
        type: TypeRef, contextName: string,
        valueName: string, value: any, messageSuffix: any): any;

    export function errorIfNotTypes(
        types: TypeRef[], contextName: string,
        valueName: string, value: any): any;

    export function getErrorIfNotTypeThrower(
        errorMessageCall: ErrorTemplateCtxToStringFn): ErrorIfNotTypeThrower;

    export function getErrorIfNotTypesThrower(
        errorMessageCall: ErrorTemplateCtxToStringFn): ErrorIfNotTypesThrower;

}
