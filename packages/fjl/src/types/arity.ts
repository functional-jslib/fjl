export type Nullary<T> = (x?: T) => T;

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
