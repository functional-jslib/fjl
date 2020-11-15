/**
 * Created by elydelacruz on 2/19/2017.
 * Io module - Contains `IO` class.
 * Fore more on io class
 * @see http://learnyouahaskell.com/input-and-output
 * @module io
 */

import {Monad, MonadBase, MonadConstructor, unwrapMonadByType} from './monad';
import {toFunction} from '../function/toFunction';
import {compose} from '../function/compose';

export type IOConstructor<T> = MonadConstructor<T>;

export class IO<T> extends MonadBase<T> implements Monad<T> {
    /**
     * Unwraps an `IO`.
     */
    static unWrapIO<X>(io: IO<X> | X): X {
        if (!IO.isIO(io)) {
            return io as unknown as X;
        }
        return unwrapMonadByType(IO, io);
    }

    /**
     * Applicative pure;  Same as `new IO(...)`.
     */
    static of<X>(fn?: X): IO<X> {
        return new IO(fn);
    }

    /**
     * Checks for `IO`.
     */
    static isIO(x): boolean {
        return x instanceof IO;
    }

    /**
     * Performs io.
     */
    static do<T = any>(io, ...args): IO<T> {
        const instance = !IO.isIO(io) ? new IO(io) : io;
        return compose(
            IO.of,
            IO.unWrapIO
        )(
            toFunction(instance.join())(...args)
        );
    }

    /**
     * Maps incoming function onto contained, innermost, value
     * and returns a new `IO` which will containe the result of calling incoming function on originally contained value - A.k.a - flat-map operation.
     */
    flatMap(fn) {
        return compose(
            (this.constructor as IOConstructor<T>).of,
            IO.unWrapIO, fn,
            IO.unWrapIO
        )(
            toFunction(this.join())()
        );
    }

    /**
     * Maps incoming function on contained value and returns
     * a new `IO` container containing result of unary operation (incoming-function's result).
     */
    map(fn) {
        return compose(
            (this.constructor as IOConstructor<T>).of,
            fn
        )(
            toFunction(this.valueOf())()
        );
    }
}
