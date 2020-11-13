/**
 * Contains `Either` constructs (`Right`, `Left`,  `either` etc.) and associated operations.
 * Created by elyde on 12/10/2016.
 */
import {isset} from '../object/isset';
import {curry} from '../function/curry';
import {id} from '../function/id';
import {toFunction} from '../function/toFunction';
import {Just} from './Maybe';
import {Monad} from './Monad';

/**
 * `Left` representation of `Either` construct.
 */
export class Left extends Monad {
    /**
     * Same as `new Left(...)`.
     */
    static of (x) { return new Left(x); }
}

export class Right extends Just {
    /**
     * Maps a function over contained value and returns result wrapped.
     */
    map (fn) {
        const value = this.valueOf();
        if (isLeft(value)) {
            return value;
        }
        else if (!isset(value)) {
            return Left.of(
                `TypeError: Cannot operate on \`${value}\`.`
            );
        }
        return Right.of(fn(value));
    }

    /**
     * Same as `new Right(...)`.
     */
    static of (x) { return new Right(x); }
}

export const

    /**
     * Returns a new `Left`
     */
    left = x => new Left(x),

    /**
     * Returns a `Right`.
     */
    right = x => new Right(x),

    /**
     * Checks for instance of `Right` constructor.
     */
    isRight = x => x instanceof Right,

    /**
     * Checks for instance of `Left` constructor.
     */
    isLeft = x => x instanceof Left,

    /**
     * Returns a `Right` - if not a `Right` creates one from given, else returns given.
     */
    toRight = x => isRight(x) ? x : right(x),

    /**
     * Returns a `Left` - if not a `Left` creates one from given, else returns given.
     */
    toLeft = x => isLeft(x) ? x : left(x),

    /**
     * Converts given to an either (`Right`|`Left`)
     */
    toEither = x => isLeft(x) || isRight(x) ? x : right(x).map(id),

    /**
     * Calls matching callback on incoming `Either`'s type;  If is a `Left`
     * (after mapping identity func on it) then calls left-callback and unwraps result
     * else calls right-callback and does the same.  Think of it like a functional
     * ternary statement (lol).
     * @function module:either.either
     * @param leftCallback {Function} - Mapped over value of `monad`'s identity.
     * @param rightCallback {Function} - "".
     * @param _either_ {Either|*}
     * @return {*} - Value of unwrapped resulting value of `flatMap`ped, passed-in callback's on passed in monad.
     * @example
     * expect(
         either(() => 404, () => 200, compose(right, right, right, right)(true))
       ).toEqual(undefined);
     */
    either = curry((leftCallback, rightCallback, _either_) => {
        const identity = toEither(_either_).flatMap(id),
            out = isRight(_either_) ?
                identity.flatMap(toFunction(rightCallback)) :
                identity.flatMap(leftCallback)
            ;
        return isset(out) ? out.join() : out;
    })

;
