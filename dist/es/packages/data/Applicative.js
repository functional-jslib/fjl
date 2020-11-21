import { Apply } from './Apply';
import instanceOf from "../platform/object/instanceOf";
export class Applicative extends Apply {
    static of(value) {
        return isApplicative(value) ? new Applicative(value.valueOf()) : new Applicative(value);
    }
    static liftA2(fn, appA, appB) {
        return this.constructor.of(fn(appA.valueOf(), appB.valueOf));
    }
    static apRight(appA, appB) {
        return appB;
    }
    static apLeft(appA, appB) {
        return appA;
    }
}
export const isApplicative = instanceOf(Applicative), pureApp = Applicative.of, liftA2 = Applicative.liftA2, apLeft = Applicative.apLeft, apRight = Applicative.apRight;
//# sourceMappingURL=Applicative.js.map