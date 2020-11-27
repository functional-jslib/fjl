import {curry, CurryOf3} from './curry';
import {UnaryOf, UnaryPred} from "../types";

export const

    /**
     * Run `operation` until predicate returns `true` (like a functional
     *  version of a while loop).
     */
    until = curry(<T, RetT>(
        predicate: UnaryPred<T | RetT>,
        operation: UnaryOf<T | RetT, T | RetT>,
        startValue: T | RetT
    ): RetT => {
        let result: T | RetT = startValue;
        while (!predicate(result)) {
            result = operation(result);
        }
        return result as RetT;
    }) as CurryOf3<any, any, any, any>;
