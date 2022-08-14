import {genIterator, iterate} from "./iterate";
import {id} from "../function";

export const

  /**
   * Returns an array containing `x` repeated `n` number of times.
   */
  repeat = <T>(n: number, x: T): T[] => n <= 0 ? [] : iterate(n, a => a, x),

  $repeat = <T>(n: number) =>
    (x: T): T[] => repeat(n, x),

  genRepeater = <T>(x: T): Generator<T, void, T> => genIterator(id, x)();
