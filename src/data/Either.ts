/**
 * Contains `Either` constructs (`Right`, `Left`,  `either` etc.) and associated operations.
 * Created by elyde on 12/10/2016.
 * @module either
 */
import {isset} from '../object/isset';
import {curry} from '../function/curry';
import {id} from '../function/id';
import {toFunction} from '../function/toFunction';
import {Just} from './Maybe';
import {Monad} from './Monad';

/**
 * `Left` representation of `Either` construct.
 * @class module:either.Left
 * @param x {*}
 * @property value {*}
 * @extends module:monad.Monad
 */
export class Left extends Monad {
    /**
     * Same as `new Left(...)`.
     * @method module:either.Left.of
     * @static
     * @param x {*}
     * @returns {Left}
     */
    static of (x) { return new Left(x); }
}

/**
 * @class module:either.Right
 * @param x {*}
 * @property value {*}
 * @extends module:maybe.Just
 */
export class Right extends Just {
    /**
     * Maps a function over contained value and returns result wrapped.
     * @method module:either.Right#map
     * @param fn {Function} - Unary operation.
     * @returns {Either}
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
     * @method module:either.Right.of
     * @static
     * @param x {*}
     * @returns {Right}
     */
    static of (x) { return new Right(x); }
}

export const

    /**
     * Returns a new `Left`
     * @function module:either.left
     * @param x {*}
     * @returns {Left}
     */
    left = x => new Left(x),

    /**
     * Returns a `Right`.
     * @function module:either.right
     * @param x {*}
     * @returns {Right}
     */
    right = x => new Right(x),

    /**
     * Checks for instance of `Right` constructor.
     * @function module:either.isRight
     * @param x {*}
     * @returns {boolean}
     */
    isRight = x => x instanceof Right,

    /**
     * Checks for instance of `Left` constructor.
     * @function module:either.isLeft
     * @param x {*}
     * @returns {boolean}
     */
    isLeft = x => x instanceof Left,

    /**
     * Returns a `Right` - if not a `Right` creates one from given, else returns given.
     * @function module:either.toRight
     * @param x {*}
     * @returns {Right}
     */
    toRight = x => isRight(x) ? x : right(x),

    /**
     * Returns a `Left` - if not a `Left` creates one from given, else returns given.
     * @function module:either.toLeft
     * @param x {*}
     * @returns {Left}
     */
    toLeft = x => isLeft(x) ? x : left(x),

    /**
     * Converts given to an either (`Right`|`Left`)
     * @function module:either.toEither
     * @param x {*}
     * @returns {Left|Right}
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
