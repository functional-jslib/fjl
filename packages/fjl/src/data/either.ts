/**
 * Contains `Either` constructs (`Right`, `Left`,  `either` etc.) and associated operations.
 * Created by elyde on 12/10/2016.
 */
import {isset} from '../object/isset';
import {id} from '../function/id';
import {MonadBase} from './monad';
import {FunctorMapFn} from "../types";

export type Either<A, B> = Left<A> | Right<B>;

/**
 * `Left` representation of `Either` construct.
 */
export class Left<T> extends MonadBase<T> {

  /**
   * Same as `new Left(...)`.
   */
  static of<X>(x?: X): Left<X> {
    return new Left(x);
  }

  map<RetT>(fn: FunctorMapFn<T, RetT>): Left<RetT> {
    return super.map(fn) as Left<RetT>;
  }
}

export class Right<T> extends MonadBase<T> {

  /**
   * Same as `new Right(...)`.
   */
  static of<X>(x?: X): Right<X> {
    return new Right(x);
  }

  map<RetT>(fn: FunctorMapFn<T, RetT>): Right<RetT> {
    return super.map(fn) as Right<RetT>;
  }
}

export const

  defaultLeftErrMsgTmpl = <T>(x: T | string = ''): string => `TypeError: Cannot operate on \`${x}\`.`,

  /**
   * Returns a new `Left`
   */
  left = Left.of,

  /**
   * Returns a `Right`.
   */
  right = Right.of,

  /**
   * Checks for instance of `Right` constructor.
   */
  isRight = <T>(x: T): boolean => isset(x) && x instanceof Right,

  /**
   * Checks for instance of `Left` constructor.
   */
  isLeft = <T>(x: T): boolean => isset(x) && x instanceof Left,

  /**
   * Returns a `Right` - if not a `Right` creates one from given, else returns given.
   */
  toRight = <T>(x?: T): Right<T> => (isRight(x) ? x : right(x)) as Right<T>,

  /**
   * Returns a `Left` - if not a `Left` creates one from given, else returns given.
   */
  toLeft = <T>(x?: T): Left<T> => (isLeft(x) ? x : left(x)) as Left<T>,

  /**
   * Converts given to an either (`Right`|`Left`)
   */
  toEither = <A, B>(x: A): Either<Right<A>, Left<B>> =>
    (isLeft(x) || isRight(x) ? x : (!isset(x) ? left(x) : right(x).map(id))) as Either<Right<A>, Left<B>>,

  /**
   * Calls matching callback on incoming `Either`;  If it's an `Left` type, calls left-callback on it,
   * If it's an `Right` type, calls the right-callback on it.
   * Returns value of the flat-mapped monad.
   */
  either = <A, B, C>(leftCallback: FunctorMapFn<A, C>, rightCallback: FunctorMapFn<B, C>, _either_: Left<A> | Right<B>): C => {
    let mapFn;
    if (isRight(_either_)) mapFn = rightCallback;
    else mapFn = leftCallback;
    return _either_.map(mapFn).join() as typeof mapFn;
  };

export type EitherFn = typeof either;

export type EitherFnParams = Parameters<EitherFn>;

/**
 * Curried version `either`.
 */
export const $either = <A, B, C>(leftCallback: FunctorMapFn<A, C>) =>
  (rightCallback: FunctorMapFn<B, C>) =>
    (_either_: Left<A> | Right<B>): C =>
      either(leftCallback, rightCallback, _either_);
