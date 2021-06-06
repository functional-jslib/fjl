import {curry2} from "../function/curry";
import {iterate} from "./iterate";

export const

    /**
     * Returns a an array containing `x` repeated `n` number of times.
     */
    repeat = <T>(n: number, x: T): T[] => n <= 0 ? [] : iterate(n, a => a, x),

    $repeat = curry2(repeat);
