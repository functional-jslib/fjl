// generic-ops.d.ts
export type Nullary<T> = () => T;

export type Unary<T> = (x: T) => T;

export type Binary<T> = (a: T, b: T) => T;

export type Ternary<T> = (a: T, b: T, c: T) => T;

export type Quaternary<T> = (a: T, b: T, c: T, d: T) => T;

export type Quinary<T> = (a: T, b: T, c: T, d: T, e: T) => T;

export type Variadic<T> = (...xs: T[]) => T;

export type Nary<T> = Variadic<T>;

export type Monadic<T> = (x: T, ...xs: T[]) => T;

export type Polyadic<T> = (x1: T, x2: T, ...xs: T[]) => T;

export type UnaryOf<T, Ret> = (x: T) => Ret;

export type BinaryOf<A, B, Ret> = (a: A, b: B) => Ret;

export type TernaryOf<A, B, C, Ret> = (a: A, b: B, c: C) => Ret;

export type QuaternaryOf<A, B, C, D, Ret> = (a: A, b: B, c: C, d: D) => Ret;

export type QuinaryOf<A, B, C, D, E, Ret> = (a: A, b: B, c: C, d: D, e: E) => Ret;

export type VariadicOf<T, Ret> = (...xs: T[]) => Ret;

export type NaryOf<T, Ret> = VariadicOf<T, Ret>;

export type MonadicOf<T, Ret> = (a: T, ...b: T[]) => Ret;

export type PolyadicOf<A, B, Ret> = (a: A, b: B, ...c: B[]) => Ret;

export type UnaryPred<T> = (x: T) => boolean;

export type BinaryPred<T> = (a: T, b: T) => boolean;

export type TernaryPred<T> = (a: T, b: T, c: T) => boolean;

export type NaryPred<T> = (...x: T[]) => boolean;

export type PolyadicPred<T> = (a: T, b: T, ...c: T[]) => boolean;

export type PolyPred<T> = PolyadicPred<T>;

export type BinaryPredOf<A, B> = (a: A, b: B) => boolean;

export type TernaryPredOf<A, B, C> = (a: A, b: B, c: C) => boolean;

export type PolyadicPredOf<A, B, C> = (a: A, b: B, ...c: C[]) => boolean;

// data.d.ts
export type MapFunc<T, Ftr, RetT> = (x?: T, i?: number, xs?: Ftr) => RetT;

export type FilterFunc<T, Ftr> = TernaryOf<T, number, Ftr, boolean>;

export type ReduceFunc<T, Ftr> = QuaternaryOf<T, T, number, Ftr, T>;

export type PredicateFunc<T, Ftr> = TernaryPredOf<T, number, Ftr>;

export interface Functor<T> {
    value?: T;

    valueOf(): T;

    map<T2>(f: MapFunc<T, Functor<T>, T2>): Functor<T2>;
}

export interface Length {
    readonly length: number;
}

export interface Size {
    readonly size: number;
}

export interface Name {
    readonly name: string;
}

export type Lengthable = Length;

export type Nameable = Name;

export type Num = number;

export interface Slice extends Lengthable {
    [index: number]: any;

    concat(...slices: Slice[]): Slice;

    slice(startIndex: number, endIndex?: number): Slice;

    includes(searchValue: any, fromIndex?: number): boolean;

    indexOf(searchValue: any, fromIndex?: number): number;

    lastIndexOf(searchValue: any, fromIndex?: number): number;
}

export interface Mappable<T, Ftr> extends Lengthable {
    map<T2>(fn: MapFunc<T, Ftr, T2>): Mappable<T2, Ftr>;
}

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
