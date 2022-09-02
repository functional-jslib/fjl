export type Nullary<T = any, RetT = any> = (x?: T, ...args: T[]) => RetT;

export type Unary<T = any, RetT = any> = (x?: T, ...args: T[]) => RetT;

export type Binary<A = any, B = any, RetT = any> = (a?: A, b?: B) => RetT;

export type Ternary<A = any, B = any, C = any, RetT = any> = (a?: A, b?: B, c?: C) => RetT;

export type Quaternary<A = any, B = any, C = any, D = any, RetT = any> = (a?: A, b?: B, c?: C, d?: D) => RetT;

export type Quinary<A = any, B = any, C = any, D = any, E = any, RetT = any> = (a?: A, b?: B, c?: C, d?: D, e?: E) => RetT;

export type Variadic<T = any, RetT = any> = (...xs: T[]) => RetT;

export type Nary<T = any, RetT = any> = Variadic<T, RetT>;

export type UnitNary = (...params: any) => any;

export type Monadic<A = any, B = any, Ret = any> = (a?: A, ...bs: B[]) => Ret;

export type Polyadic<A = any, B = any, C = any, RetT = any> = (a?: A, b?: B, ...cs: C[]) => RetT;

export type UnaryPred<T = any> = (x: T) => boolean;

export type BinaryPred<A = any, B = any> = (a?: A, b?: B) => boolean;

export type TernaryPred<A = any, B = any, C = any> = (a?: A, b?: B, c?: C) => boolean;

export type NaryPred<T = any> = (...xs: T[]) => boolean;

export type PolyadicPred<A = any, B = any, C = any> = (a?: A, b?: B, ...cs: C[]) => boolean;
