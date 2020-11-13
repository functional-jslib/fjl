let NothingSingleton;
/**
 * Constructor and function for creating/fetching `Nothing`.
 * @note Nothing always returns a singleton instance of `Nothing` (whether calling `Nothing` with new or as a
 * function.
 * @function module:maybe.Nothing
 * @param [x=undefined]{*} - Ignored.
 * @returns {Nothing}
 * @constructor
 * @memberOf module:maybe
 */
export default class Nothing {
    /**
     * Applicative `pure` - Same as `new Nothing()`, `Nothing()`, and `nothing()`.
     * @memberOf module:maybe.Nothing
     * @function module:maybe.Nothing.of
     * @static
     * @returns {Nothing}
     */
    static of(x) {
        return new Nothing();
    }
    constructor(x) {
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
    valueOf() {
        return this;
    }
    /**
     * Returns `Nothing`.
     * @method module:maybe.Nothing#join
     * @returns {Nothing}
     */
    join() {
        return this;
    }
    /**
     * Returns `Nothing`.
     * @method module:maybe.Nothing#map
     * @returns {Nothing}
     */
    map(f) {
        return this;
    }
    /**
     * Returns `Nothing`.
     * @method module:maybe.Nothing#ap
     * @returns {Nothing}
     */
    ap(x) {
        return this;
    }
    /**
     * Returns `Nothing`.
     * @method module:maybe.Nothing#flatMap
     * @returns {Nothing}
     */
    flatMap(f) {
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
isNothing = (x) => x === NothingSingleton, 
/**
 * Returns `Nothing`.
 * @function module:maybe.nothing
 * @returns {Nothing}
 */
nothing = () => new Nothing();
export { isNothing, nothing };
//# sourceMappingURL=Nothing.js.map