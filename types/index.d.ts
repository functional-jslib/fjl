// Top level types
declare type TypeRef = string | Function;

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

// function
declare type Predicate = (a: any) => boolean;
declare function compose (...fn: Function[]): Function;
declare function curry (fn: Function, ...prelimArgs: any[]): Function;
declare function curry2 (fn: Function): Function;
declare function curry3 (fn: Function): Function;
declare function curry4 (fn: Function): Function;
declare function curry5 (fn: Function): Function;
declare function curryN (executeArity: number, fn: Function): Function;
declare function flip (fn: Function): Function; // flips fn of `2`
declare function flipN (fn: Function): Function; // flips fn of `2` or more
declare function fnOrError (fn: Function): Function;
declare function id (x: any): any;
declare function negateF (fn: Function): Function;
declare function negateFN (fn: Function): Function;
declare function noop (): void;
declare function trampoline (fn: Function, fnNameRestrict?: string): any;
declare function until (fn: Predicate, operation: Function, startingPoint: any): any;

// list
declare interface List {
    concat (...fs: Array<any>[]): Array<any>;
    slice (startInd: number, endInd: number, list: Array<any>): Array<any>;
    includes (x: any, xs: (any[]|string|any)): boolean;
    indexOf (x: any, xs: (any[]|string|any)): number;
    lastIndexOf (x: any, xs: (any[]|string|any)): number;
}

declare type ListPredicate = (x: any, index: number, list: any[]) => boolean;

declare function map (fn: ListPredicate, list: any[]): any[];
declare function filter (fn: ListPredicate, list: any[]): any[];
declare function reverse (list: any[]): any[];
