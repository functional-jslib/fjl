/**
 * Contains `Either` constructs (`Right`, `Left`,  `either` etc.) and associated operations.
 * Created by elyde on 12/10/2016.
 */
import {isset} from '../object/isset';
import {curry} from '../function/curry';
import {id} from '../function/id';
import {toFunction} from '../function/toFunction';
import {Monad} from './monad';
import {FunctorMapFn} from "./functor";
import {UnaryOf} from "../types";

export type Either<A, B> = A | B;

/**
 * `Left` representation of `Either` construct.
 */
export class Left<T> extends Monad<T> {

    /**
     * Same as `new Left(...)`.
     */
    static of<X>(x?: X): Left<X> {
        return new Left(x);
    }
}

export class Right<T> extends Monad<T> {

    /**
     * Maps a function over contained value and returns result wrapped.
     */
    map<Righty>(fn: FunctorMapFn<T, Right<T>, Righty>): Either<Right<Righty>, Left<unknown | string>> {
        const value = this.valueOf();
        if (isLeft(value)) {
            return value as unknown as Left<unknown>;
        } else if (!isset(value)) {
            return Left.of(
                `TypeError: Cannot operate on \`${value}\`.`
            );
        }
        return Right.of(fn(value));
    }

    /**
     * Same as `new Right(...)`.
     */
    static of<X>(x?: X): Right<X> {
        return new Right(x);
    }
}

export const

    /**
     * Returns a new `Left`
     */
    left = <T>(x?: T): Left<T> => new Left(x),

    /**
     * Returns a `Right`.
     */
    right = <T>(x: T): Right<T> => new Right(x),

    /**
     * Checks for instance of `Right` constructor.
     */
    isRight = <T>(x: T): boolean => x instanceof Right,

    /**
     * Checks for instance of `Left` constructor.
     */
    isLeft = <T>(x: T): boolean => x instanceof Left,

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
    toEither = <A, B>(x: unknown): Either<Right<A>, Left<B>> =>
        (isLeft(x) || isRight(x) ? x : right(x).map(id)) as Either<Right<A>, Left<B>>,

    /**
     * Calls matching callback on incoming `Either`;  If it's an `Left` type, calls left-callback on it,
     * If it's an `Right` type, calls the right-callback on it.
     * Returns value of the flat-mapped monad.
     */
    either = curry(<A, B, RetA>(leftCallback: UnaryOf<A, B>, rightCallback: UnaryOf<A, RetA>, _either_: Right<A> | Left<B>) => {
        const identity = toEither(_either_).flatMap(id),
            out = isRight(_either_) ?
                identity.flatMap(toFunction(rightCallback) as UnaryOf<A, RetA>) :
                identity.flatMap(leftCallback)
        ;
        return isset(out) ? out.join() : out;
    })

;
