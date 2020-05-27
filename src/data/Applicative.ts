/**
 * Created by edlc on 12/9/16.
 * Applicative class module.
 * @memberOf module:functor
 */
import Apply from './Apply';

/**
 * @class module:functor.Applicative
 * @extends module:functor.Apply
 */
export default class Applicative extends Apply {
    /**
     * Constructs an applicative with given `value`.
     * @method module:functor.Applicative.of
     * @param value {*}
     * @returns {Applicative}
     * @static
     */
    static of (value) {
        return new Applicative(value);
    }

    static liftA2 (fn, appA, appB) {
        return appA.constructor.of(
            fn(appA.valueOf(), appB.valueOf)
        );
    }

    static apRight (appA, appB) {
        return appB;
    }

    static apLeft (appA, appB) {
        return appA;
    }
}

export const

    pureApp = Applicative.of,

    liftA2 = Applicative.liftA2,

    apLeft = Applicative.apLeft,

    apRight = Applicative.apRight

;

