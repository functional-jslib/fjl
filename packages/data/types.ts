import {BinaryOf} from "../types";

export type FunctorMapFn<RetT> = ((a?: any, b?: any, c?: any, ...args: any[]) => RetT) |
    ((a?: any, b?: any, ...args: any[]) => RetT) | ((a?: any, ...args: any[]) => RetT);

export interface FunctorConstructor<T = any> {
    new(x: T): Functor<T>;

    readonly prototype: Functor<T>;
}

export interface Functor<T = any> {
    valueOf(): T;

    map<MapRetT>(fn: FunctorMapFn<MapRetT>): Functor<MapRetT> | Functor;
}

export interface ApplyConstructor<T> extends FunctorConstructor<T> {
    new(x: T): Apply<T>;

    readonly prototype: Apply<T>;
}

export interface Apply<T> extends Functor<T> {
    ap<X, RetT>(f: Functor<X>): Apply<RetT>;
}

export interface ApplicativeConstructor<T> extends ApplyConstructor<T> {
    new(x: T): Applicative<T>;

    readonly prototype: Applicative<T>;

    of<X>(value: X): Applicative<X>;

    liftA2<A extends T, B, RetT>(
        fn: BinaryOf<A, B, RetT>,
        a: Applicative<A>,
        b: Applicative<B>
    ): Applicative<RetT>;

    apRight<A, B>(a: Applicative<A>, b: Applicative<B>): Applicative<B>;

    apLeft<A, B>(a: Applicative<A>, b: Applicative<B>): Applicative<A>;
}

export type Applicative<T> = Apply<T>;

export interface BifunctorConstructor<A, B> extends FunctorConstructor<A> {
    new(a: A, b: B): Bifunctor<A, B>;

    readonly prototype: Bifunctor<A, B>;
}

export interface Bifunctor<A, B> extends Functor<A> {
    value2Of(): B;

    first(fn: FunctorMapFn<A>): Bifunctor<A, B>;

    second(fn: FunctorMapFn<B>): Bifunctor<A, B>;

    bimap(fn1: FunctorMapFn<A>, fn2: FunctorMapFn<B>): Bifunctor<A, B>;
}

