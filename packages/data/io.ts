/**
 * Created by elydelacruz on 2/19/2017.
 * Io module - Contains `IO` class.
 * Fore more on io class
 * @see http://learnyouahaskell.com/input-and-output
 * @module io
 */

import {Monad, unwrapMonadByType} from './monad';
import {toFunction} from '../function/toFunction';
import {compose} from '../function/compose';

/**
 * @class io.IO
 * @param fn {Function} - Operation to contain within `IO`
 * @property `value` {*} - `IO` however wraps non-function values to `function` on construction.
 * @extends module:monad.Monad
 */
export default class IO extends Monad {
    /**
     * Unwraps an `IO`.
     * @function module:io.IO.unWrapIO
     * @static
     * @param io {IO}
     * @returns {*}
     */
    static unWrapIO(io) {
        if (!IO.isIO(io)) {
            return io;
        }
        return unwrapMonadByType(IO, io);
    }

    /**
     * Applicative pure;  Same as `new IO(...)`.
     * @function module:io.IO.of
     * @static
     * @param fn {Function} - Unary operation.
     * @returns {IO}
     */
    static of(fn) {
        return new IO(fn);
    }

    /**
     * Checks for `IO`.
     * @function module:io.IO.isIO
     * @static
     * @param x {*}.
     * @returns {boolean}
     */
    static isIO(x) {
        return x instanceof IO;
    }

    /**
     * Performs io.
     * @function module:io.IO.isIO
     * @static
     * @param io {IO}.
     * @param args {...*} {IO}.
     * @returns {boolean}
     */
    static do(io, ...args) {
        const instance = !IO.isIO(io) ? new IO(io) : io;
        return compose(
            IO.of,
            IO.unWrapIO
        )(
            toFunction(instance.join())(...args)
        );
    }

    constructor(fn) {
        super(toFunction(fn));
    }

    /**
     * Maps incoming function onto contained, innermost, value
     * and returns a new `IO` which will containe the result of calling incoming function on originally contained value - A.k.a - flat-map operation.
     * @memberOf module:io.IO
     * @param fn {Function} - Unary operation.
     * @returns {IO}
     */
    flatMap(fn) {
        return compose(
            this.constructor.of,
            IO.unWrapIO, fn,
            IO.unWrapIO
        )(
            toFunction(this.join())()
        );
    }

    /**
     * Maps incoming function on contained value and returns
     * a new `IO` container containing result of unary operation (incoming-function's result).
     * @memberOf module:io.IO
     * @param fn {Function}
     * @returns {IO}
     */
    map(fn) {
        return compose(
            this.constructor.of,
            fn
        )(
            toFunction(this.valueOf())()
        );
    }
}
