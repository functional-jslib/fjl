/**
 * Contains `Just` constructor and associated methods.
 */
import Nothing, { isNothing } from './Nothing';
import Monad from './Monad';
import { isset } from 'fjl';
export const 
/**
 * Checks for `Just`.
 * @function module:maybe.isJust
 * @param x {*}
 * @returns {boolean}
 */
isJust = x => x instanceof Just, 
/**
 * Functional constructor (function that returns an instance) for `Just` -
 * Same as `new Just(...)` (just shorter and can be used as a function).
 * @function module:maybe.just
 * @param x {Just|*}
 * @returns {Just}
 */
just = x => new Just(x), 
/**
 * Ensures `Just`
 * @function module:maybe.toJust
 * @param x {Just|*}
 * @returns {Just}
 */
toJust = x => isJust(x) ? x : just(x);
/**
 * @class maybe.Just
 * @param x {*}
 * @property value {*}
 * @extends module:monad.Monad
 */
export default class Just extends Monad {
    /**
     * Maps incoming function over contained value and
     * returns result wrapped in `Just`.
     * @method module:maybe.Just#map
     * @param fn {Function} - Unary operation.
     * @returns {Just|Nothing}
     */
    map(fn) {
        const { constructor } = this, value = this.valueOf();
        return isset(value) && !isNothing(value) ? constructor.of(fn(value)) :
            constructor.counterConstructor.of(value);
    }
    /**
     * Applicative pure - Same as `new Just(...)`.
     * @method module:maybe.Just.of
     * @static
     * @param x {*}
     * @returns {Just}
     */
    static of(x) { return just(x); }
}
/**
 * @static
 * @member {Functor} module:maybe.Just.counterConstructor
 */
Just.counterConstructor = Nothing;
//# sourceMappingURL=Just.js.map