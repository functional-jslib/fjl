import {Apply} from './Apply';
import instanceOf from "../jsPlatform/object/instanceOf";
import {CurryOf1} from "../function";

export interface ApplicativeConstructor<T> extends ObjectConstructor {
    new(x: T): Applicative<T>;

    readonly prototype: Applicative<T>;

    of<X>(value: X): Applicative<X>;
}

export class Applicative<T> extends Apply<T> {
    static of<X>(value: X): Applicative<X> {
        return isApplicative(value) ? new Applicative(value.valueOf() as X) : new Applicative(value);
    }

    static liftA2<T>(fn, appA: Applicative<T>, appB: Applicative<T>): Applicative<T> {
        return (this.constructor as ApplicativeConstructor<T>).of(
            fn(appA.valueOf(), appB.valueOf)
        );
    }

    static apRight<T>(appA: Applicative<T>, appB: Applicative<T>): Applicative<T> {
        return appB;
    }

    static apLeft<T>(appA: Applicative<T>, appB?: Applicative<T>): Applicative<T> {
        return appA;
    }
}

export const

    isApplicative = instanceOf(Applicative) as CurryOf1<any, boolean>,

    pureApp = Applicative.of,

    liftA2 = Applicative.liftA2,

    apLeft = Applicative.apLeft,

    apRight = Applicative.apRight

;

