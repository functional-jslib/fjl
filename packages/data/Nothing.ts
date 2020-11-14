import {MapFunc} from "../types";

let NothingSingleton;

/**
 * Constructor and function for creating/fetching `Nothing`.
 * @note Nothing always returns a singleton instance of `Nothing` (whether calling `Nothing` with new or as a
 * function.
 * @param [x=undefined]{*} - Ignored.
 * @returns {Nothing}
 */
export default class Nothing {
    /**
     * Applicative `pure` - Same as `new Nothing()`, `Nothing()`, and `nothing()`.
     * @memberOf module:maybe.Nothing
     * @function module:maybe.Nothing.of
     * @static
     * @returns {Nothing}
     */
    static of(x?: any): Nothing {
        return new Nothing();
    }

    constructor(x?: any) {
        if (NothingSingleton) {
            return NothingSingleton;
        }
        NothingSingleton = this;
        Object.freeze(NothingSingleton);
    }

    /**
     * Returns `Nothing`.
     * @method module:maybe.Nothing#valueOf
     * @returns {Nothing}
     */
    valueOf(): this {
        return this;
    }

    /**
     * Returns `Nothing`.
     * @method module:maybe.Nothing#join
     * @returns {Nothing}
     */
    join(): this {
        return this;
    }

    /**
     * Returns `Nothing`.
     * @method module:maybe.Nothing#map
     * @returns {Nothing}
     */
    map(f: MapFunc<any, any, any, any>): this {
        return this;
    }

    /**
     * Returns `Nothing`.
     * @method module:maybe.Nothing#ap
     * @returns {Nothing}
     */
    ap(x: any): this {
        return this;
    }

    /**
     * Returns `Nothing`.
     * @method module:maybe.Nothing#flatMap
     * @returns {Nothing}
     */
    flatMap(f: MapFunc<any, any, any, any>): this {
        return this;
    }
}

const

    /**
     * Checks for `Nothing`.
     * @function module:maybe.isNothing
     * @param x {*}
     * @returns {boolean}
     */
    isNothing = <T>(x: T): boolean => x === NothingSingleton,

    /**
     * Returns `Nothing`.
     * @function module:maybe.nothing
     * @returns {Nothing}
     */
    nothing = (): Nothing => new Nothing()
;

export {isNothing, nothing};
