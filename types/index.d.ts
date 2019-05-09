export as namespace fjl;

// boolean.d.ts
export function alwaysTrue(x: any): boolean;

export function alwaysFalse(x: any): boolean;

export function isTruthy(x: any): boolean;

export function isFalsy(x: any): boolean;

// utils.d.ts
export function fPureTakesOne(name): (arg: any, obj: any) => any;

export function fPureTakes2(name): (arg1: any, arg2: any, obj: any) => any;

export function fPureTakes3(name): (arg1: any, arg2: any, arg3: any, obj: any) => any;

export function fPureTakes4(name): (arg1: any, arg2: any, arg3: any, arg4: any, obj: any) => any;

export function fPureTakes5(name): (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, obj: any) => any;

export function fPureTakesOneOrMore(name): (obj: any, ...args: any[]) => any;

// object.d.ts
export function instanceOf(Constructor: Function, obj: any): boolean;

export function hasOwnProperty(property: string, obj: any): boolean;

export function keys(obj: any): string[];

export function assign(obj0: any, ...objs: any[]): string[];

export module native {
    export function defineProperties<T>(properties: PropertyDescriptorMap, target: T): T

    export function defineProperty<T>(propertyDescriptor: PropertyDescriptor, propertyName: string, target: T): T

    export function assign(obj0: any, ...objs: Array<any>): any;

    // @todo add the rest of the methods here
}

export function lookup(key: string, obj: any): any;

export function assign(obj0: any, ...objs: Array<any>): any;

export function typeOf(x: any): string;

export function copy(x: any): any;

export function toTypeRef(x: string | Function | any): string | Function;

export function toTypeRefName(x: string | Function | any): string;

export function toTypeRefNames(...types: Array<string | Function | any>): Array<string>;

export function isFunction(x: any): boolean;

export function isType(type: string | Function, x: any): boolean;

export function isStrictly(type: string | Function, x: any): boolean;

export function isOfType(type: string | Function, x: any): boolean;

export function isLoosely(type: string | Function, x: any): boolean;

export function isClass(x: any): boolean;

export function isCallable(x: any): boolean;

export function isArray(x: any): boolean;

export function isObject(x: any): boolean;

export function isBoolean(x: any): boolean;

export function isNumber(x: any): boolean;

export function isString(x: any): boolean;

export function isMap(x: any): boolean;

export function isSet(x: any): boolean;

export function isWeakMap(x: any): boolean;

export function isWeakSet(x: any): boolean;

export function isUndefined(x: any): boolean;

export function isNull(x: any): boolean;

export function isSymbol(x: any): boolean;

export function isUsableImmutablePrimitive(x: any): boolean;

export function isEmptyList(x: any): boolean;

export function isEmptyObject(x: any): boolean;

export function isEmptyCollection(x: any): boolean;

export function isEmpty(x: any): boolean;

export function isset(x: any): boolean;

export function isStrictlyOneOf(x: any, ...types: Function[] | string[]): boolean;

export function isLooselyOneOf(x: any, ...types: Function[] | string[]): boolean;

export function instanceOfOne(x: any, ...types: Function[] | string[]): boolean;

export function isFunctor(x: any, ...types: Function[] | string[]): boolean;

export function of(x: any, ...args: any[]): any;

export function searchObj(nsString: string, obj): any;

export function assignDeep(obj0: any, ...objs: any[]): any;

export function objUnion(obj1: object, obj2: object): object;

export function objIntersect(obj1: object, obj2: object): object;

export function objDifference(obj1: object, obj2: object): object;

export function objComplement(obj0: object, ...objs: object[]): object;

export function log(...xs: any[]): void;

export function error(...xs: any[]): void;

export function peek(...xs: any[]): void;

export function warn(...xs: any[]): void;

export function jsonClone(x: any): any;

export function toArray(x: any): any[];

export function toAssocList(x: any): Array<any[]>;

export function toAssocListDeep(x: any): Array<any[]>;

export function fromAssocList<T>(xs: Array<any[]>, OutType: Function): T;

export function fromAssocListDeep<T>(xs: Array<any[]>, OutType: Function): T;

// function.d.ts
export type Predicate = (a: any) => boolean;

export function compose(...fn: Function[]): Function;

export function curry(fn: Function, ...prelimArgs: any[]): Function;

export function curry2(fn: Function): Function;

export function curry3(fn: Function): Function;

export function curry4(fn: Function): Function;

export function curry5(fn: Function): Function;

export function curryN(executeArity: number, fn: Function): Function;

export function flip(fn: Function): Function;      // flips fn of `2`
export function flipN(fn: Function): Function;     // flips fn of `2` or more (returns a variadic function (`(...rest) => ...`))
export function fnOrError(fn: Function): Function; // Throws error if value is not a function
export function id(x: any): any;                   // Identity function
export function negateF(fn: Function): Function;   // Negate function of arity 1
export function negateFN(fn: Function): Function;  // Negate function of variable arity
export function noop(): void;                      // "No operation" function
export function trampoline(fn: Function, fnNameRestrict?: string): any;

export function until(fn: Predicate, operation: Function, startingPoint: any): any;


// errorThrowing.d.ts
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


// string.d.ts
export function lines(str: string): string[];

export function words(str: string): string[];

export function unwords(list: string[]): string;

export function unlines(list: string[]): string;

export function split(pattern: RegExp | string, str: string): string[];

export function lcaseFirst(str: string): string;

export function ucaseFirst(str: string): string;

export function camelCase(str: string, pattern?: RegExp): string;

export function classCase(str: string, pattern?: RegExp): string;


// list.d.ts
export type ListPredicate = (x: any, index: number, list: (any[] | string)) => boolean;

export type ListMapOperation = (x: any, index: number, list: (any[] | string)) => any;

export type ListFoldOperation = (agg: any, item: any, index: number, list: (any[] | string)) => any;

export type ListForEachOperation = (agg: any, item: any, index: number, list: (any[] | string)) => void;

export type OrderingFunction = (a: any, b: any) => number;

export interface List {
    concat(...fs: Array<Array<any> | string>): Array<any> | string;

    slice(startInd: number, endInd: number, list: Array<any> | string): Array<any> | string;

    includes(x: any, xs: (any[] | string | any)): boolean;

    indexOf(x: any, xs: (any[] | string | any)): number;

    lastIndexOf(x: any, xs: (any[] | string | any)): number;
}

export function slice(startInd: number, endInd: number, list: Array<any> | string): Array<any> | string;

export function includes(x: any, xs: (any[] | string | any)): boolean;

export function indexOf(x: any, xs: (any[] | string | any)): number;

export function lastIndexOf(x: any, xs: (any[] | string | any)): number;

export function append(...args: Array<any[] | string>): any[] | string;

export function head(list: any[] | string): any | string | undefined;

export function tail(list: any[] | string): any[] | string | undefined;

export function last(list: any[] | string): any | string | undefined;

export function init(list: any[] | string): any[] | string | undefined;

export function uncons(list: any[] | string): any[] | string | undefined;

export function unconsr(list: any[] | string): any[] | string | undefined;

export function concat(list: any[] | string[]): any[] | string;

export function concatMap(fn: ListPredicate, list: any[] | string[]): any[] | string;

export function reverse(list: any[] | string): any[] | string;

export function intersperse<T>(between: T, arr: T[] | T): T[] | T;

export function intercalate<T>(xs: T[] | T, xss: T[] | T): T[] | T;

export function transpose(xss: Array<any[] | string>): any[] | string[];

export function subsequences(xs: Array<any> | string): any[] | string[];

export function permutations(xs: Array<any> | string): any[] | string[];

export function foldl(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

export function foldl1(fn: ListFoldOperation, xs: any [] | string): any;

export function foldr(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

export function foldr1(fn: ListFoldOperation, xs: any [] | string): any;

export function mapAccumL(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

export function mapAccumR(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

export function iterate(limit: number, op: ListMapOperation, zero: any): any[];

export function cycle(limit: number, xs: any[]): any[];

export function findIndex(pred: ListPredicate, xs: any[]): number;

export function findIndices(pred: ListPredicate, xs: any[]): number[] | undefined;

export function elemIndex(x: any, xs: any[]): number | undefined;

export function elemIndices(pred: ListPredicate, xs: any[]): number[] | undefined;

export function take(n: number, xs: any[]): any[];

export function drop(n: number, xs: any[]): any[];

export function splitAt(n: number, xs: any[]): Array<any[]>;

export function takeWhile(fn: ListPredicate, xs: any[]): any[];

export function dropWhile(fn: ListPredicate, xs: any[]): any[];

export function dropWhileEnd(fn: ListPredicate, xs: any[]): any[];

export function span(fn: ListPredicate, xs: any[]): Array<any[]>;

export function breakOnList(fn: ListPredicate, xs: any[]): Array<any[]>;

export function at(index: number): any;

export function find(fn: ListPredicate, xs: any[]): any | undefined;

export function map(fn: ListMapOperation, list: any[]): any[];

export function forEach(fn: ListForEachOperation, xs: any[]): void;

export function filter(fn: ListPredicate, xs: any[]): any[];

export function partition(fn: ListPredicate, xs: any[]): Array<any[]>;

export function elem(x: any, xs: any[]): boolean;

export function notElem(x: any, xs: any[]): boolean;

export function isPrefixOf(xs1: any[], xs2: any[]): boolean;

export function isSuffixOf(xs1: any[], xs2: any[]): boolean;

export function isInfixOf(xs1: any[], xs2: any[]): boolean;

export function isSubsequenceOf(xs1: any[], xs2: any[]): boolean;

export function group(xs: any[]): Array<any[]>;

export function inits(xs: any[]): Array<any[]>;

export function tails(xs: any[]): Array<any[]>;

export function stripPrefix(prefix: any, xs: any[]): any[] | string;

export function zip(xs1: any[], xs2: any[]): Array<any[]>;

export function zipN(...lists: any[]): Array<any[]>;

export function zip3(xs1: any[], xs2: any[], xs3: any[]): Array<any[]>;

export function zip4(xs1: any[], xs2: any[], xs3: any[], xs4: any[]): Array<any[]>;

export function zip5(xs1: any[], xs2: any[], xs3: any[], xs4: any[], xs5: any[]): Array<any[]>;

export function zipWith(op: (a, b) => any[], xsA: any[], xsB: any[]): Array<any[]>;

export function zipWithN(op: (a, b) => any[], ...lists: any[]): Array<any[]>;

export function zipWith3(op: (a, b, c) => any[], xsA: any[], xsB: any[], xsC: any[]): Array<any[]>;

export function zipWith4(op: (a, b, c, d) => any[], xsA: any[], xsB: any[], xsC: any[], xsD: any[]): Array<any[]>;

export function zipWith5(op: (a, b, c, d) => any[], xsA: any[], xsB: any[], xsC: any[], xsD: any[], xsE: any[]): Array<any[]>;

export function unzip(zippedList: Array<any[]>): Array<any[]>;

export function unzipN(...zippedList: Array<any[]>): Array<any[]>;

export function any(fn: ListPredicate, xs: any[]): boolean;

export function all(fn: ListPredicate, xs: any[]): boolean;

export function and(xs: any[]): boolean;

export function or(xs: any[]): boolean;

export function not(xs: any[]): boolean;

export function sum(xs: any[]): number;

export function product(xs: any[]): number;

export function maximum(xs: any[]): number;

export function minimum(xs: any[]): number;

export function scanl(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

export function scanl1(fn: ListFoldOperation, xs: any [] | string): any;

export function scanr(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

export function scanr1(fn: ListFoldOperation, xs: any [] | string): any;

export function nub(xs: any [] | string): any[];

export function sort(xs: any [] | string): any[];

export function sortOn(fn: (x: any) => any, xs: any [] | string): any[];

export function sortBy(fn: OrderingFunction, xs: any [] | string): any[];

export function insert(x: any, xs: any[]): any[];

export function insertBy(fn: OrderingFunction, x: any, xs: any[]): any[];

export function nubBy(fn: ListPredicate, x: any, xs: any[]): any[];

export function removeBy(fn: ListPredicate, x: any, xs: any[]): any[];

export function removeFirstBy(fn: ListPredicate, x: any, xs: any[]): any[];

export function unionBy(fn: ListPredicate, xs1: any[], xs2: any[]): any[];

export function union(xs1: any[], xs2: any[]): any[];

export function intersect(xs1: any[], xs2: any[]): any[];

export function intersectBy(fn: ListPredicate, xs1: any[], xs2: any[]): any[];

export function difference(xs1: any[], xs2: any[]): any[];

export function complement(xs1: any[], ...xs2: any[]): any[];

export function range(min: number, max: number, step?: number): number[];

export function sliceFrom(startInd: number, xs: List): List;

export function sliceTo(endInd: number, xs: List): List;

export function sliceCopy(xs: List): List;

export function genericAscOrdering(a: any, b: any): number;

export function lengths(...xs: Array<any[]>): Array<number>;

export function toShortest(...xs: Array<any[]>): Array<any[]>;

export function reduceUntil(pred: ListPredicate, op: ListFoldOperation, agg: any, xs: Array<any> | string | any): any;

export function reduceUntilRight(pred: ListPredicate, op: ListFoldOperation, agg: any, xs: Array<any> | string | any): any;

export function reduce(pred: ListPredicate, op: ListFoldOperation, agg: any, xs: Array<any> | string | any): any;

export function reduceRight(pred: ListPredicate, op: ListFoldOperation, agg: any, xs: Array<any> | string | any): any;

export function lastIndex(x: any): number;

export function findIndexWhere(pred: ListPredicate, xs: Array<any> | string): number;

export function findIndexWhereRight(pred: ListPredicate, xs: Array<any> | string): number;

export function findIndicesWhere(pred: ListPredicate, xs: Array<any> | string): Array<number> | undefined;

export function findWhere(pred: ListPredicate, xs: Array<any> | string): any | undefined;

