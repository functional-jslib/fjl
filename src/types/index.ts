// generic-ops.d.ts
export type Unary<T> = (x: T) => T;

export type Binary<T> = (a: T, b: T) => T;

export type Ternary<T> = (a: T, b: T, c: T) => T;

export type Nary<T> = (...x: T[]) => T;

export type Polyadic<T> = (a: T, b: T, ...c: T[]) => T;

export type Poly<T> = Polyadic<T>;

export type UnaryOf<T, Ret> = (x: T) => Ret;

export type BinaryOf<A, B, Ret> = (a: A, b: B) => Ret;

export type TernaryOf<A, B, C, Ret> = (a: A, b: B, c: C) => Ret;

export type QuaternaryOf<A, B, C, D, Ret> = (a: A, b: B, c: C, d: D) => Ret;

export type QuinaryOf<A, B, C, D, E, Ret> = (a: A, b: B, c: C, d: D, e: E) => Ret;

export type NaryOf<T, Ret> = (...xs: T[]) => Ret;

export type PolyadicOf<A, B, C, Ret> = (a: A, b: B, ...c: C[]) => Ret;

export type PolyOf<A, B, C, Ret> = PolyadicOf<A, B, C, Ret>;

export type UnaryPred<T> = (x: T) => boolean;

export type BinaryPred<T> = (a: T, b: T) => boolean;

export type TernaryPred<T> = (a: T, b: T, c: T) => boolean;

export type NaryPred<T> = (...x: T[]) => boolean;

export type MultiaryPred<T> = (...x: T[]) => boolean;

export type PolyadicPred<A, B, C> = (a: A, b: B, ...c: C[]) => boolean;

export type PolyPred<A, B, C> = PolyadicPred<A, B, C>;

export type BinaryPredOf<A, B> = (a: A, b: B) => boolean;

export type TernaryPredOf<A, B, C> = (a: A, b: B, c: C) => boolean;

export type PolyadicPredOf<A, B, C> = (a: A, b: B, ...c: C[]) => boolean;

// data.d.ts
export type MapFunc<T, Ftr> = TernaryOf<T, number, Ftr, Ftr>;

export type FilterFunc<T, Ftr> = TernaryOf<T, number, Ftr, boolean>;

export type ReductionFunc<T, Ftr> = QuaternaryOf<T, T, number, Ftr, Ftr>;

export type PredicateFunc<T, Ftr> = TernaryPredOf<T, number, Ftr>;

export interface Functor<T> {
    value?: T;

    valueOf(): T;

    map(f: MapFunc<T, Functor<T>>): Functor<T>;

    // constructor(T): Functor<T>;
}

export interface Length {
    readonly length: number;
}

export interface Size {
    readonly size: number;
}

export interface Show {
    toString(): string;
}

export interface Read {
    fromString(s: string): void;
}

export interface Name {
    readonly name: string;
}

export type Lengthable = Length;

export type Nameable = Name;

export type Num = number;

export interface ListLike extends Lengthable {
    [index: number]: any;

    concat(...fs: Array<Array<any> | string>): Array<any> | string;

    slice(startInd: number, endInd: number, list: Array<any> | string): Array<any> | string;

    includes(x: any, xs: (any[] | string | any)): boolean;

    indexOf(x: any, xs: (any[] | string | any)): number;

    lastIndexOf(x: any, xs: (any[] | string | any)): number;
}

export type Pred = (a: any) => boolean;

export type Pred2 = (a: any, b: any) => boolean;

export type Pred3 = (a: any, b: any, c: any) => boolean;

export type Pred4 = (a: any, b: any, c: any, d: any) => boolean;

export type TypeRef =
    string | Function | ArrayBufferConstructor | ArrayConstructor |
    BooleanConstructor | StringConstructor |
    NumberConstructor | MapConstructor |
    SetConstructor | WeakMapConstructor |
    WeakSetConstructor | PromiseConstructorLike
    ;

export type TypeConstructor =
    Function | ArrayBufferConstructor | ArrayConstructor |
    BooleanConstructor | StringConstructor |
    NumberConstructor | MapConstructor |
    SetConstructor | WeakMapConstructor |
    WeakSetConstructor | PromiseConstructorLike |
    ObjectConstructor
    ;

export interface ErrorTemplateCtx {
    value: any;
    valueName: string;
    expectedTypeName: string;
    foundTypeName: string;
    messageSuffix?: string;
}

export type TypeCheckFunc = (typeRef: TypeRef, x: any) => boolean;

export type ErrorIfNotTypeThrower = (
    type: TypeRef, contextName: string,
    valueName: string, value: any, messageSuffix: any) => any;

export type ErrorIfNotTypesThrower = (
    types: TypeRef[], contextName: string,
    valueName: string, value: any) => any;

export type ErrorTemplateCtxToStringFn = (
    tmplCtx: ErrorTemplateCtx) => string;

export type ListPredicate = (x: any, index: number, list: (any[] | string)) => boolean;

export type ListMapOperation = (x: any, index: number, list: (any[] | string)) => any;

export type ListFoldOperation = (agg: any, item: any, index: number, list: (any[] | string)) => any;

export type ListForEachOperation = (agg: any, item: any, index: number, list: (any[] | string)) => void;

export type OrderingFunction = (a: any, b: any) => number;
