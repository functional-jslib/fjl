// Top level types
declare type TypeRef = string | Function;

import './function';
import './list';
import './map';

// console
declare function peek(...x: any[]): any;
declare function log(...x: any[]): void;
declare function error(...x: any[]): void;

// boolean
declare function alwaysTrue (x: any): boolean;
declare function alwaysFalse (x: any): boolean;
declare function isTruthy (x: any): boolean;
declare function isFalsy (x: any): boolean;

// error-throwing
declare interface ErrorTemplateCtx {
    value: any,
    valueName: string,
    expectedTypeName: string,
    foundTypeName: string,
    messageSuffix?: string
}

declare type TypeChecker = (typeRef: TypeRef, x: any) => boolean;

declare type ErrorIfNotTypeThrower = (
    type: TypeRef, contextName: string,
    valueName: string, value: any, messageSuffix: any) => any;

declare type ErrorIfNotTypesThrower = (
    types: TypeRef[], contextName: string,
    valueName: string, value: any) => any;

declare type ErrorTemplateCtxToStringFn = (
    tmplCtx: ErrorTemplateCtx) => string;

declare function errorIfNotType (
    type: TypeRef, contextName: string,
    valueName: string, value: any, messageSuffix: any): any;

declare function errorIfNotTypes (
    types: TypeRef[], contextName: string,
    valueName: string, value: any): any;

declare function getErrorIfNotTypeThrower (
    errorMessageCall: ErrorTemplateCtxToStringFn): ErrorIfNotTypeThrower;

declare function getErrorIfNotTypesThrower (
    errorMessageCall: ErrorTemplateCtxToStringFn): ErrorIfNotTypesThrower;
