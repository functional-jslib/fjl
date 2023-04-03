import {Binary, Ternary} from "fjl";

export type FunctorMapOp<T = any, RetT = any> =
  (a?: T, b?: keyof Functor<T>, c?: Functor<T>, ...rest: any[]) => RetT;

export interface FunctorConstructor<T> {
  new<Ret extends Functor<T>>(x: T): Ret

  readonly prototype: Functor<T>;
}

export interface Functor<T = any> {
  valueOf(): T;

  map<RetT = any, Ret = any>(fn: Ternary<T, keyof this, this, RetT>): Ret;

  readonly length?: number;
}

export interface ApplyConstructor<T> extends FunctorConstructor<T> {
  new<Ret extends Apply<T>>(x: T): Ret;

  readonly prototype: Functor<T> & Apply<T>;
}

export interface Apply<T = any> extends Functor<T> {
  ap<T, RetT>(f: Functor<T>): Apply<RetT>;
}

export interface ApplicativeConstructor<T = any> extends ApplyConstructor<T> {
  new(x: T): Apply<T>;

  readonly prototype: Apply<T>;

  of<X>(value: X): Apply<X>;

  liftA2<A extends T, B, RetT>(
    fn: Binary<A, B, RetT>,
    a: Applicative<A>,
    b: Applicative<B>
  ): Applicative<RetT>;

  apRight<A, B>(a: Applicative<A>, b: Applicative<B>): ThisType<B>;

  apLeft<A, B>(a: Applicative<A>, b: Applicative<B>): ThisType<A>;
}

export type Applicative<T = any> = Apply<T>;

export interface BifunctorConstructor<A = any, B = any> extends FunctorConstructor<A> {
  new(a: A, b: B): Bifunctor<A, B>;

  readonly prototype: Bifunctor<A, B>;
}

export interface Bifunctor<A = any, B = any> extends Functor<A> {
  value2Of(): B;

  first<RetT>(fn: FunctorMapOp<A, RetT>): Bifunctor<RetT, B>;

  second<RetT>(fn: FunctorMapOp<B, RetT>): Bifunctor<A, B>;

  bimap<RetA, RetB>(fn1: FunctorMapOp<A, RetA>, fn2: FunctorMapOp<B, RetB>): Bifunctor<RetA, RetB>;
}

export interface Monad<T = any> extends Applicative<T> {
  join(): T;

  flatMap<RetT>(fn: Ternary<T, keyof this, this, RetT>): ThisType<RetT>;
}

export type MonadConstructor<T = any> = ApplicativeConstructor<T>;
