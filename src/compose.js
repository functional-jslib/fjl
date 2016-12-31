/**
 * Created by elyde on 12/6/2016.
 */

/**
 * Compose combinator;  Allows to combine many functions into one;  Functions list gets reduced from right to left
 * and each function on receives the return value of the function that comes after it.
 * @param args {...Function}
 * @returns {function(*=): *}
 */
export default function compose (...args) {
    return arg0 => args.reduceRight((value, fn) => fn(value), arg0);
}
